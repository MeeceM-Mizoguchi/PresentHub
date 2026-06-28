// 生体認証ログイン (Web / WebAuthn・Passkey) サービス層
// Face ID / Touch ID / Windows Hello などのプラットフォーム認証器を使い、
// Supabase の magiclink token_hash でセッションを確立する。
import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
  platformAuthenticatorIsAvailable,
} from "@simplewebauthn/browser";
import { supabase, isSupabaseConfigured } from "./supabase";

export interface BiometricResult {
  ok: boolean;
  error?: string;
}

// この端末で登録済みかの判定に使うローカルフラグ（値は credentialId）。
// セキュリティ境界ではなくUXヒント（ボタン出し分け等）。
const CRED_FLAG_KEY = "ph_biometric_cred";

async function accessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

async function readError(res: Response): Promise<string> {
  try { const j = await res.json(); return j?.error || "通信に失敗しました"; }
  catch { return "通信に失敗しました"; }
}

// WebAuthnのキャンセル/失敗を日本語化
function toMessage(e: any): string {
  const name = e?.name || "";
  if (name === "NotAllowedError") return "生体認証がキャンセルされました。";
  if (name === "InvalidStateError") return "この端末は既に登録されています。";
  return e?.message || "生体認証に失敗しました。";
}

export const biometricAuth = {
  /** この端末/ブラウザで生体認証（プラットフォーム認証器）が利用可能か */
  async isSupported(): Promise<boolean> {
    if (!browserSupportsWebAuthn()) return false;
    try { return await platformAuthenticatorIsAvailable(); }
    catch { return false; }
  },

  /** この端末で既に生体認証を登録済みか（ボタン出し分けに使用） */
  async isRegisteredOnThisDevice(): Promise<boolean> {
    return !!localStorage.getItem(CRED_FLAG_KEY);
  },

  /** 生体認証を登録する（要ログイン状態） */
  async register(): Promise<BiometricResult> {
    if (!isSupabaseConfigured) return { ok: false, error: "この環境では利用できません。" };
    const token = await accessToken();
    if (!token) return { ok: false, error: "ログインが必要です。" };

    const optRes = await fetch("/api/webauthn/register-options", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!optRes.ok) return { ok: false, error: await readError(optRes) };
    const optionsJSON = await optRes.json();

    let attResp;
    try { attResp = await startRegistration({ optionsJSON }); }
    catch (e: any) { return { ok: false, error: toMessage(e) }; }

    const verRes = await fetch("/api/webauthn/register-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ response: attResp, deviceLabel: navigator.userAgent.slice(0, 120) }),
    });
    if (!verRes.ok) return { ok: false, error: await readError(verRes) };
    const data = await verRes.json();
    if (data?.credentialId) localStorage.setItem(CRED_FLAG_KEY, data.credentialId);
    return { ok: true };
  },

  /** 生体認証でログインする（Supabaseセッションを確立） */
  async loginWithBiometric(): Promise<BiometricResult> {
    if (!isSupabaseConfigured) return { ok: false, error: "この環境では利用できません。" };

    const optRes = await fetch("/api/webauthn/login-options", { method: "POST" });
    if (!optRes.ok) return { ok: false, error: await readError(optRes) };
    const optionsJSON = await optRes.json();

    let asseResp;
    try { asseResp = await startAuthentication({ optionsJSON }); }
    catch (e: any) { return { ok: false, error: toMessage(e) }; }

    const verRes = await fetch("/api/webauthn/login-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: asseResp }),
    });
    if (!verRes.ok) return { ok: false, error: await readError(verRes) };
    const { tokenHash } = await verRes.json();

    const { error } = await supabase.auth.verifyOtp({ type: "magiclink", token_hash: tokenHash });
    if (error) return { ok: false, error: error.message };

    // 端末登録フラグを補完（別途クリアされていてもログイン成功なら登録済みとみなす）
    if (asseResp?.id) localStorage.setItem(CRED_FLAG_KEY, asseResp.id);
    return { ok: true };
  },

  /** この端末の生体データ（登録）を削除する */
  async removeCredential(): Promise<BiometricResult> {
    const token = await accessToken();
    const credentialId = localStorage.getItem(CRED_FLAG_KEY);
    if (token) {
      await fetch("/api/webauthn/delete-credential", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ credentialId }),
      }).catch(() => { /* ローカルフラグ削除は続行 */ });
    }
    localStorage.removeItem(CRED_FLAG_KEY);
    return { ok: true };
  },
};
