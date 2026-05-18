-- =============================================
-- PresentHub - Supabase Schema
-- Run this in Supabase Dashboard > SQL Editor
-- =============================================

-- Folders table
CREATE TABLE IF NOT EXISTS folders (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  parent_id   TEXT REFERENCES folders(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Presentation metadata table
-- Actual slide content lives in src/presentations/registry.ts
-- This table tracks folder assignment and starred status per presentation
CREATE TABLE IF NOT EXISTS presentation_meta (
  id          TEXT PRIMARY KEY,   -- matches PresentationEntry.meta.id
  folder_id   TEXT REFERENCES folders(id) ON DELETE SET NULL,
  starred     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for development (enable + add policies for production)
ALTER TABLE folders DISABLE ROW LEVEL SECURITY;
ALTER TABLE presentation_meta DISABLE ROW LEVEL SECURITY;

-- =============================================
-- File Assets (Supabase Storage metadata)
-- =============================================
-- 1. Supabase Dashboard > Storage > New bucket
--    Bucket name: presentation-assets
--    Public bucket: ON
-- 2. Run the SQL below to track uploaded files

CREATE TABLE IF NOT EXISTS presentation_assets (
  id          TEXT PRIMARY KEY,                          -- uuid generated on upload
  name        TEXT NOT NULL,                             -- original filename
  storage_path TEXT NOT NULL,                            -- path in the bucket
  public_url  TEXT NOT NULL,                             -- full public URL
  mime_type   TEXT,
  size_bytes  BIGINT,
  related_id  TEXT,                                      -- optional: linked presentation id
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE presentation_assets DISABLE ROW LEVEL SECURITY;

-- Storage bucket RLS policies (run after creating the bucket)
-- Allow public read
-- INSERT INTO storage.buckets (id, name, public) VALUES ('presentation-assets', 'presentation-assets', true) ON CONFLICT DO NOTHING;

-- Allow all operations for anon key (development)
-- CREATE POLICY "allow_all" ON storage.objects FOR ALL TO anon USING (bucket_id = 'presentation-assets') WITH CHECK (bucket_id = 'presentation-assets');

-- Default folders (same as DEFAULT_FOLDERS in AppContext)
INSERT INTO folders (id, name, parent_id) VALUES
  ('folder-1', 'プロジェクト',   NULL),
  ('folder-2', 'Q1 2024',        'folder-1'),
  ('folder-3', 'マーケティング', 'folder-1'),
  ('folder-4', 'アーカイブ',     NULL)
ON CONFLICT (id) DO NOTHING;
