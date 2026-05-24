import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body as { password: string };
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'パスワードは8文字以上で入力してください' });
  }

  const authHeader = req.headers['authorization'] as string | undefined;
  const userToken = authHeader?.replace('Bearer ', '');
  if (!userToken) {
    return res.status(401).json({ error: 'セッションが無効です' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // ユーザートークンを検証してユーザーIDを取得
  const { data: { user }, error: getUserError } = await supabaseAdmin.auth.getUser(userToken);
  if (getUserError || !user) {
    console.error('[set-password] getUser error:', getUserError?.message);
    return res.status(401).json({ error: 'セッションが無効です。招待メールのリンクを再度クリックしてください' });
  }

  // 管理者APIでパスワードを設定（招待セッションの権限制限を回避）
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, { password });
  if (updateError) {
    console.error('[set-password] updateUser error:', updateError.message);
    return res.status(400).json({ error: 'パスワードの設定に失敗しました' });
  }

  return res.status(200).json({ success: true, userId: user.id });
}
