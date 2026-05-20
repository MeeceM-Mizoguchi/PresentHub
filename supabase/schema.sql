CREATE TABLE IF NOT EXISTS public.folders (
  id          TEXT        PRIMARY KEY,
  name        TEXT        NOT NULL,
  parent_id   TEXT        REFERENCES public.folders(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.presentation_meta (
  id          TEXT        PRIMARY KEY,
  folder_id   TEXT        REFERENCES public.folders(id) ON DELETE SET NULL,
  starred     BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT        NOT NULL,
  name        TEXT        NOT NULL DEFAULT '',
  role        TEXT        NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.account_requests (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  company      TEXT,
  message      TEXT,
  status       TEXT        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at  TIMESTAMPTZ,
  reviewed_by  UUID        REFERENCES auth.users(id)
);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.folders           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentation_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_requests  ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "folders_all"       ON public.folders;
DROP POLICY IF EXISTS "meta_all"          ON public.presentation_meta;
DROP POLICY IF EXISTS "profiles_select"   ON public.user_profiles;
DROP POLICY IF EXISTS "profiles_update"   ON public.user_profiles;
DROP POLICY IF EXISTS "requests_insert"   ON public.account_requests;
DROP POLICY IF EXISTS "requests_select"   ON public.account_requests;
DROP POLICY IF EXISTS "requests_update"   ON public.account_requests;

CREATE POLICY "folders_all" ON public.folders
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "meta_all" ON public.presentation_meta
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "profiles_select" ON public.user_profiles
  FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "profiles_update" ON public.user_profiles
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "requests_insert" ON public.account_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "requests_select" ON public.account_requests
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "requests_update" ON public.account_requests
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ── スライドコメント ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.slide_comments (
  id               TEXT        PRIMARY KEY,
  presentation_id  TEXT        NOT NULL,
  slide_index      INTEGER     NOT NULL,
  text             TEXT        NOT NULL,
  x                FLOAT       NOT NULL,
  y                FLOAT       NOT NULL,
  resolved         BOOLEAN     NOT NULL DEFAULT FALSE,
  timestamp        TEXT        NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS slide_comments_lookup ON public.slide_comments (presentation_id, slide_index);

ALTER TABLE public.slide_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "comments_select" ON public.slide_comments;
DROP POLICY IF EXISTS "comments_insert" ON public.slide_comments;
DROP POLICY IF EXISTS "comments_update" ON public.slide_comments;
DROP POLICY IF EXISTS "comments_delete" ON public.slide_comments;

CREATE POLICY "comments_select" ON public.slide_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "comments_insert" ON public.slide_comments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "comments_update" ON public.slide_comments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "comments_delete" ON public.slide_comments FOR DELETE TO authenticated USING (true);

-- author カラム追加（既存テーブルへの追記）
ALTER TABLE public.slide_comments
  ADD COLUMN IF NOT EXISTS author_id   UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS author_name TEXT NOT NULL DEFAULT '外部ユーザー';

-- ── コメント返信 ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.slide_comment_replies (
  id          TEXT        PRIMARY KEY,
  comment_id  TEXT        NOT NULL REFERENCES public.slide_comments(id) ON DELETE CASCADE,
  text        TEXT        NOT NULL,
  author_id   UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT        NOT NULL DEFAULT '外部ユーザー',
  timestamp   TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.slide_comment_replies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "replies_select" ON public.slide_comment_replies;
DROP POLICY IF EXISTS "replies_insert" ON public.slide_comment_replies;
DROP POLICY IF EXISTS "replies_delete" ON public.slide_comment_replies;

CREATE POLICY "replies_select" ON public.slide_comment_replies FOR SELECT TO authenticated USING (true);
CREATE POLICY "replies_insert" ON public.slide_comment_replies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "replies_delete" ON public.slide_comment_replies FOR DELETE TO authenticated USING (true);
