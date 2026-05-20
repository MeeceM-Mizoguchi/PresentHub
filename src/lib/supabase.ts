import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const isSupabaseConfigured =
  !!supabaseUrl &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !!supabaseAnonKey &&
  supabaseAnonKey !== 'your-anon-key-here';

// All Supabase network calls (including auth token refresh) get a hard 10-second
// timeout. Without this, a slow auth endpoint causes getSession() to hang
// forever, blocking every data query that internally calls getSession().
const fetchWithTimeout: typeof fetch = (url, options) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
};

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  { global: { fetch: fetchWithTimeout } }
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

// ── Slide comments ──────────────────────────────────────────────────────

export interface DbSlideComment {
  id: string;
  presentation_id: string;
  slide_index: number;
  text: string;
  x: number;
  y: number;
  resolved: boolean;
  timestamp: string;
  author_id?: string | null;
  author_name: string;
}

export interface DbCommentReply {
  id: string;
  comment_id: string;
  text: string;
  author_id?: string | null;
  author_name: string;
  timestamp: string;
}

export async function fetchSlideCommentsWithReplies(
  presentationId: string,
  slideIndex: number
): Promise<(DbSlideComment & { replies: DbCommentReply[] })[]> {
  if (!isSupabaseConfigured) return [];
  const { data: comments, error } = await supabase
    .from('slide_comments')
    .select('*')
    .eq('presentation_id', presentationId)
    .eq('slide_index', slideIndex)
    .order('created_at', { ascending: true });
  if (error) { console.error('[DB] fetchSlideComments:', error); return []; }
  if (!comments || comments.length === 0) return [];

  const ids = comments.map((c: DbSlideComment) => c.id);
  const { data: replies } = await supabase
    .from('slide_comment_replies')
    .select('*')
    .in('comment_id', ids)
    .order('created_at', { ascending: true });

  return comments.map((c: DbSlideComment) => ({
    ...c,
    replies: ((replies ?? []) as DbCommentReply[]).filter(r => r.comment_id === c.id),
  }));
}

export async function insertSlideComment(comment: DbSlideComment): Promise<void> {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('slide_comments').insert(comment);
  if (error) console.error('[DB] insertSlideComment:', error);
}

export async function updateSlideComment(id: string, updates: { text?: string; resolved?: boolean }): Promise<void> {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('slide_comments').update(updates).eq('id', id);
  if (error) console.error('[DB] updateSlideComment:', error);
}

export async function deleteSlideComment(id: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('slide_comments').delete().eq('id', id);
  if (error) console.error('[DB] deleteSlideComment:', error);
}

export async function insertCommentReply(reply: DbCommentReply): Promise<void> {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('slide_comment_replies').insert(reply);
  if (error) console.error('[DB] insertCommentReply:', error);
}

export async function deleteCommentReply(id: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('slide_comment_replies').delete().eq('id', id);
  if (error) console.error('[DB] deleteCommentReply:', error);
}

/** ログイン中ユーザーの表示名を返す。未ログインは null。 */
export async function getCurrentUserName(): Promise<{ id: string; name: string } | null> {
  if (!isSupabaseConfigured) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from('user_profiles').select('name').eq('id', user.id).single();
  const name = profile?.name || user.email?.split('@')[0] || '不明';
  return { id: user.id, name };
}
