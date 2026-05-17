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

-- Default folders (same as DEFAULT_FOLDERS in AppContext)
INSERT INTO folders (id, name, parent_id) VALUES
  ('folder-1', 'プロジェクト',   NULL),
  ('folder-2', 'Q1 2024',        'folder-1'),
  ('folder-3', 'マーケティング', 'folder-1'),
  ('folder-4', 'アーカイブ',     NULL)
ON CONFLICT (id) DO NOTHING;
