import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const isSupabaseConfigured =
  !!supabaseUrl &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !!supabaseAnonKey &&
  supabaseAnonKey !== 'your-anon-key-here';

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export interface DbFolder {
  id: string;
  name: string;
  parent_id: string | null;
  created_at: string;
}

export interface DbPresentationMeta {
  id: string;
  folder_id: string | null;
  starred: boolean;
  created_at: string;
}

export interface DbPresentationAsset {
  id: string;
  name: string;
  storage_path: string;
  public_url: string;
  mime_type: string | null;
  size_bytes: number | null;
  related_id: string | null;
  created_at: string;
}

const BUCKET = 'presentation-assets';

/** Upload a file to Supabase Storage. Returns the public URL, or null on failure. */
export async function uploadAsset(file: File, relatedId?: string): Promise<string | null> {
  if (!isSupabaseConfigured) return null;

  const ext = file.name.split('.').pop() ?? 'bin';
  const assetId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const path = `thumbnails/${assetId}.${ext}`;

  const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
  if (error) { console.error('[Storage] upload error:', error); return null; }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(data.path);

  // Store metadata (best-effort — ignore failure)
  await supabase.from('presentation_assets').insert({
    id: assetId,
    name: file.name,
    storage_path: data.path,
    public_url: publicUrl,
    mime_type: file.type || null,
    size_bytes: file.size || null,
    related_id: relatedId ?? null,
  });

  return publicUrl;
}

/** Delete a file from Supabase Storage by its public URL. */
export async function deleteAsset(publicUrl: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  const { data: row } = await supabase
    .from('presentation_assets')
    .select('storage_path, id')
    .eq('public_url', publicUrl)
    .single();
  if (!row) return;
  await Promise.all([
    supabase.storage.from(BUCKET).remove([row.storage_path]),
    supabase.from('presentation_assets').delete().eq('id', row.id),
  ]);
}

/** List all uploaded assets. */
export async function listAssets(): Promise<DbPresentationAsset[]> {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase.from('presentation_assets').select('*').order('created_at', { ascending: false });
  return (data ?? []) as DbPresentationAsset[];
}
