-- ============================================================
-- PresentHub — 生体認証ログイン (WebAuthn / Passkey) 用テーブル
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ── 登録済みクレデンシャル（公開鍵）─────────────────────────────
-- Web (WebAuthn/Passkey) で登録した公開鍵を保持する。
create table if not exists webauthn_credentials (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  credential_id text        not null unique,            -- base64url
  public_key    text        not null,                   -- base64url (COSE公開鍵)
  counter       bigint      not null default 0,
  transports    text[],
  device_label  text,
  created_at    timestamptz not null default now(),
  last_used_at  timestamptz
);

create index if not exists idx_webauthn_credentials_user on webauthn_credentials(user_id);

-- ── チャレンジの一時保管 ─────────────────────────────────────
-- options発行 → verify の2リクエスト間でチャレンジを照合するための短命ストア。
-- serverlessはステートレスなのでDBに置く。5分で失効。
create table if not exists webauthn_challenges (
  challenge   text        primary key,                  -- base64url
  expires_at  timestamptz not null default (now() + interval '5 minutes'),
  created_at  timestamptz not null default now()
);

-- ── RLS ────────────────────────────────────────────────────
-- 検証・発行はService Role（RLSバイパス）のAPI経由でのみ行う。
-- 念のためRLSは有効化し、一般クライアントからは自分の行のみ参照/削除可とする。
alter table webauthn_credentials enable row level security;
alter table webauthn_challenges  enable row level security;

drop policy if exists "own_select_webauthn_credentials" on webauthn_credentials;
create policy "own_select_webauthn_credentials" on webauthn_credentials
  for select using (auth.uid() = user_id);

drop policy if exists "own_delete_webauthn_credentials" on webauthn_credentials;
create policy "own_delete_webauthn_credentials" on webauthn_credentials
  for delete using (auth.uid() = user_id);

-- challenges の発行・照合はService Role API専用。
-- RLS有効＋ポリシー無し = anon/authenticated からは実質書込不可。
