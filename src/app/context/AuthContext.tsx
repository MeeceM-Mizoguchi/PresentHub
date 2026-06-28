import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { biometricAuth } from '../../lib/biometricAuth';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAdmin: boolean;
  isGuest: boolean;  // true = invited user (sees guest view)
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  loginWithBiometric: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<Pick<UserProfile, 'name'>>) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Direct REST helpers (bypass supabase.from() → getSession() → JS lock) ──

function isJwtExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // 30s buffer to avoid edge-case expiry during in-flight requests
    return payload.exp * 1000 < Date.now() + 30_000;
  } catch { return true; }
}

async function refreshTokenDirect(refreshToken: string): Promise<{ access_token: string; refresh_token: string } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token
      ? { access_token: data.access_token, refresh_token: data.refresh_token ?? refreshToken }
      : null;
  } catch { return null; } finally { clearTimeout(timer); }
}

async function fetchProfileDirect(userId: string, accessToken: string): Promise<UserProfile | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/user_profiles?id=eq.${userId}&select=*`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'apikey': SUPABASE_ANON_KEY,
          'Accept': 'application/json',
        },
        signal: controller.signal,
      }
    );
    if (!res.ok) return null;
    const rows = await res.json() as UserProfile[];
    return rows[0] ?? null;
  } catch { return null; } finally { clearTimeout(timer); }
}

async function upsertProfileDirect(profile: Omit<UserProfile, 'role'> & { role: string }, accessToken: string): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/user_profiles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(profile),
      signal: controller.signal,
    });
  } catch { /* ignore */ } finally { clearTimeout(timer); }
}

async function ensureProfileDirect(user: User, accessToken: string): Promise<UserProfile | null> {
  let profile = await fetchProfileDirect(user.id, accessToken);
  if (!profile) {
    await upsertProfileDirect({
      id: user.id,
      email: user.email ?? '',
      name: (user.user_metadata?.name as string) ?? '',
      role: 'user',
    }, accessToken);
    profile = await fetchProfileDirect(user.id, accessToken);
  }
  if (profile && !profile.email && user.email) {
    profile = { ...profile, email: user.email };
  }
  return profile;
}

// ─────────────────────────────────────────────────────────────────────────────

async function checkIsInvited(email: string, accessToken: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/user_invites?email=eq.${encodeURIComponent(email)}&select=id&limit=1`,
      { headers: { 'Authorization': `Bearer ${accessToken}`, 'apikey': SUPABASE_ANON_KEY, 'Accept': 'application/json' } }
    );
    if (!res.ok) return false;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch { return false; }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let fetchSeq = 0;
    let manualRefreshInProgress = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // INITIAL_SESSION with an expired token: bypass the JS lock by refreshing directly.
      // Without this, supabase-js retries token refresh through a cross-tab lock that can
      // hang for 30s+, ultimately firing SIGNED_OUT and redirecting to the login page.
      if (event === 'INITIAL_SESSION' && session && isJwtExpired(session.access_token) && !manualRefreshInProgress) {
        manualRefreshInProgress = true;
        const tokens = await refreshTokenDirect(session.refresh_token);
        manualRefreshInProgress = false;
        if (tokens) {
          // setSession fires TOKEN_REFRESHED, re-entering this handler with a valid session.
          await supabase.auth.setSession(tokens);
          return;
        }
        // Manual refresh failed; fall through and let Supabase handle the error path.
      }

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const seq = ++fetchSeq;
        try {
          const p = await ensureProfileDirect(session.user, session.access_token);
          if (seq === fetchSeq) setProfile(p);
          // ゲスト判定: user_invites に登録されているか
          if (session.user.email) {
            const invited = await checkIsInvited(session.user.email, session.access_token);
            if (seq === fetchSeq) setIsGuest(invited);
          }
        } catch {
          if (seq === fetchSeq) { setProfile(null); setIsGuest(false); }
        }
      } else {
        fetchSeq++;
        setProfile(null);
        setIsGuest(false);
      }

      setIsLoading(false);
    });

    // Fallback: stop loading if the event never fires (e.g. no network)
    const timer = setTimeout(() => setIsLoading(false), 5000);

    return () => { fetchSeq++; clearTimeout(timer); subscription.unsubscribe(); };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const loginWithBiometric = async () => {
    const r = await biometricAuth.loginWithBiometric();
    // verifyOtp 成功時は onAuthStateChange が発火し、プロフィール/権限が自動反映される
    return { error: r.ok ? null : (r.error ?? '生体認証に失敗しました。') };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error?.message ?? null };
  };

  const updateProfile = async (updates: Partial<Pick<UserProfile, 'name'>>) => {
    if (!user || !session) return 'Not authenticated';
    const current = profile ?? { id: user.id, email: user.email ?? '', name: '', role: 'user' as const };
    const merged = { ...current, ...updates };
    await upsertProfileDirect(merged, session.access_token);
    setProfile(prev => prev ? { ...prev, ...updates } : merged);
    return null;
  };

  return (
    <AuthContext.Provider value={{
      user, profile, session,
      isAdmin: profile?.role === 'admin',
      isGuest,
      isLoading,
      signIn, loginWithBiometric, signOut, resetPassword, updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
