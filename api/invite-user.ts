import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, origin } = req.body as {
    email: string;
    name: string;
    origin: string;
  };

  if (!email || !name || !origin) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('[invite-user] Supabase service role key not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 招待リンクを生成（メールは送らない）
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'invite',
    email,
    options: {
      emailRedirectTo: `${origin}/set-password`,
      data: { name, role: 'user' },
    },
  });

  let inviteUrl: string | null = null;
  const userId: string | null = data?.user?.id ?? null;

  if (error) {
    // getUserByEmail はSDKに存在しないため admin REST APIで直接検索
    try {
      const userListRes = await fetch(
        `${supabaseUrl}/auth/v1/admin/users?email=${encodeURIComponent(email)}`,
        { headers: { 'apikey': serviceRoleKey, 'Authorization': `Bearer ${serviceRoleKey}` } }
      );
      const userListData = await userListRes.json();
      const existingUser = userListData?.users?.[0];
      if (existingUser) {
        return res.status(200).json({ userId: existingUser.id, isExisting: true });
      }
    } catch { /* fallthrough */ }
    console.error('[invite-user] generateLink error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  inviteUrl = (data as any)?.properties?.action_link ?? null;

  // Resendでメール送信
  if (resendApiKey && inviteUrl) {
    const html = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8f5ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#7C3AED,#EC4899);padding:32px 28px;border-radius:20px 20px 0 0;text-align:center;">
      <div style="font-size:13px;color:rgba(255,255,255,0.7);font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">PresentHub</div>
      <h1 style="color:white;margin:0;font-size:22px;font-weight:700;">プレゼン管理ツールへご招待します</h1>
    </div>

    <div style="background:white;padding:32px 28px;border-radius:0 0 20px 20px;box-shadow:0 4px 24px rgba(124,58,237,0.08);">
      <p style="color:#374151;margin:0 0 8px;font-size:16px;font-weight:600;">${name} 様</p>
      <p style="color:#6b7280;margin:0 0 28px;font-size:14px;line-height:1.6;">
        PresentHub にご招待しました。<br>
        以下のボタンからパスワードを設定してご利用ください。
      </p>

      <div style="text-align:center;margin-bottom:28px;">
        <a href="${inviteUrl}"
          style="display:inline-block;background:linear-gradient(135deg,#7C3AED,#EC4899);color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 12px rgba(124,58,237,0.35);">
          パスワードを設定する
        </a>
      </div>

      <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:12px;padding:16px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="font-size:16px;">⚠️</span>
          <span style="font-size:13px;font-weight:600;color:#7c3aed;">ご注意</span>
        </div>
        <p style="margin:0;color:#374151;font-size:13px;">このリンクは1時間有効です。期限を過ぎた場合は管理者に再発行を依頼してください。</p>
      </div>

      <p style="margin:0;color:#d1d5db;font-size:11px;text-align:center;border-top:1px solid #f3f4f6;padding-top:16px;">
        このメールは PresentHub から自動送信されています。心当たりのない場合は無視してください。
      </p>
    </div>
  </div>
</body>
</html>`;

    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'PresentHub <noreply@meece.io>',
          to: [email],
          subject: '【PresentHub】プレゼン管理ツールへご招待します',
          html,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error('[invite-user] Resend error:', errText);
      }
    } catch (err) {
      console.error('[invite-user] Email send error:', err);
    }
  }

  return res.status(200).json({ userId, isExisting: false });
}
