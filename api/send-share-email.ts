export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, shareUrl, presentationTitle, expiresAt } = req.body as {
    to: string;
    shareUrl: string;
    presentationTitle: string;
    expiresAt: string;
  };

  if (!to || !shareUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[send-share-email] RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const expiryStr = new Date(expiresAt).toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Tokyo',
  });

  const html = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8f5ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#7C3AED,#EC4899);padding:32px 28px;border-radius:20px 20px 0 0;text-align:center;">
      <div style="font-size:13px;color:rgba(255,255,255,0.7);font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">PresentHub</div>
      <h1 style="color:white;margin:0;font-size:22px;font-weight:700;">プレゼン資料が共有されました</h1>
    </div>

    <div style="background:white;padding:32px 28px;border-radius:0 0 20px 20px;box-shadow:0 4px 24px rgba(124,58,237,0.08);">
      <h2 style="margin:0 0 8px;color:#1e1b4b;font-size:18px;font-weight:700;">${presentationTitle}</h2>
      <p style="color:#6b7280;margin:0 0 28px;font-size:14px;line-height:1.6;">
        以下のリンクから資料を閲覧できます。アカウント登録は不要です。
      </p>

      <div style="text-align:center;margin-bottom:28px;">
        <a href="${shareUrl}"
          style="display:inline-block;background:linear-gradient(135deg,#7C3AED,#EC4899);color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 12px rgba(124,58,237,0.35);">
          資料を開く
        </a>
      </div>

      <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:12px;padding:16px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="font-size:16px;">⏰</span>
          <span style="font-size:13px;font-weight:600;color:#7c3aed;">有効期限</span>
        </div>
        <p style="margin:0;color:#374151;font-size:13px;">${expiryStr}（日本時間）</p>
        <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;">期限を過ぎるとリンクにアクセスできなくなります。</p>
      </div>

      <p style="margin:0;color:#d1d5db;font-size:11px;text-align:center;border-top:1px solid #f3f4f6;padding-top:16px;">
        このメールは PresentHub から自動送信されています。
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PresentHub <noreply@meece.io>',
        to: [to],
        subject: `【PresentHub】「${presentationTitle}」が共有されました`,
        html,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('[send-share-email] Resend error:', errText);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[send-share-email] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
