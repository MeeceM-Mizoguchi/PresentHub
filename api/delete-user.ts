import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.body as { userId: string };
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('[delete-user] Supabase service role key not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) {
    console.error('[delete-user] deleteUser error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}
