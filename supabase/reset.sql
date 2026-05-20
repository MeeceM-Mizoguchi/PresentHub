-- ══════════════════════════════════════════════════════════
-- STEP 1: DB完全リセット（Supabase SQL Editorで実行）
-- ══════════════════════════════════════════════════════════

-- 認証セッション・トークンを全削除
DELETE FROM auth.refresh_tokens;
DELETE FROM auth.sessions;

-- テーブルを依存順に削除
DROP TABLE IF EXISTS public.slide_comment_replies CASCADE;
DROP TABLE IF EXISTS public.slide_comments        CASCADE;
DROP TABLE IF EXISTS public.presentation_assets   CASCADE;
DROP TABLE IF EXISTS public.presentation_meta     CASCADE;
DROP TABLE IF EXISTS public.folders               CASCADE;
DROP TABLE IF EXISTS public.account_requests      CASCADE;
DROP TABLE IF EXISTS public.user_profiles         CASCADE;

-- 関数・トリガーを削除
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin()        CASCADE;

-- 認証ユーザーを全削除
DELETE FROM auth.users;
