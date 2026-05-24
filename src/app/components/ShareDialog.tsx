import { useState, useEffect, useCallback } from 'react';
import { X, Link, Mail, Clock, Copy, Trash2, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from '../lib/toast';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

function makeHeaders(token: string): Record<string, string> {
  return {
    'Authorization': `Bearer ${token}`,
    'apikey': SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

interface SharedLink {
  id: string;
  presentation_id: string;
  expires_at: string;
  recipient_email: string | null;
  is_revoked: boolean;
  created_at: string;
}

interface ShareDialogProps {
  presentationId: string;
  presentationTitle: string;
  onClose: () => void;
}

function formatExpiry(expiresAt: string): { label: string; urgent: boolean } {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return { label: '期限切れ', urgent: true };
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h >= 24) return { label: `残り${Math.floor(h / 24)}日${h % 24}時間`, urgent: false };
  if (h > 0) return { label: `残り${h}時間${m}分`, urgent: h < 2 };
  return { label: `残り${m}分`, urgent: true };
}

export function ShareDialog({ presentationId, presentationTitle, onClose }: ShareDialogProps) {
  const { session, user } = useAuth();
  const token = session?.access_token ?? '';

  const [tab, setTab] = useState<'url' | 'email'>('url');

  // URL share
  const [urlHours, setUrlHours] = useState('');
  const [urlError, setUrlError] = useState('');
  const [urlLinks, setUrlLinks] = useState<SharedLink[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  // Email share
  const [emailAddr, setEmailAddr] = useState('');
  const [emailHours, setEmailHours] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailLinks, setEmailLinks] = useState<SharedLink[]>([]);
  const [isSending, setIsSending] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const loadLinks = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/shared_links?presentation_id=eq.${presentationId}&is_revoked=eq.false&order=created_at.desc`,
        { headers: makeHeaders(token) }
      );
      if (res.ok) {
        const all: SharedLink[] = await res.json();
        const now = new Date().toISOString();
        const active = all.filter(l => l.expires_at > now);
        setUrlLinks(active.filter(l => !l.recipient_email));
        setEmailLinks(active.filter(l => !!l.recipient_email));
      }
    } catch { /* ignore */ } finally {
      setIsLoading(false);
    }
  }, [token, presentationId]);

  useEffect(() => { loadLinks(); }, [loadLinks]);

  const validateHours = (val: string): string | null => {
    if (!val.trim()) return '有効期限（時間）を入力してください';
    const h = parseFloat(val);
    if (isNaN(h) || h <= 0) return '1以上の数値を入力してください';
    if (h > 720) return '有効期限は720時間（30日）以内で設定してください';
    return null;
  };

  const generateUrl = async () => {
    const err = validateHours(urlHours);
    if (err) { setUrlError(err); return; }
    setUrlError('');
    setIsGenerating(true);
    try {
      const h = parseFloat(urlHours);
      const expiresAt = new Date(Date.now() + h * 3600000).toISOString();
      const res = await fetch(`${SUPABASE_URL}/rest/v1/shared_links`, {
        method: 'POST',
        headers: { ...makeHeaders(token), 'Prefer': 'return=representation' },
        body: JSON.stringify({ presentation_id: presentationId, expires_at: expiresAt, created_by: user?.id ?? null }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const [newLink]: SharedLink[] = await res.json();
      setUrlLinks(prev => [newLink, ...prev]);
      setUrlHours('');
      toast.success('共有URLを発行しました');
    } catch {
      toast.error('URLの発行に失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };

  const sendEmail = async () => {
    const addrErr = !emailAddr.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddr.trim())
      ? '正しいメールアドレスを入力してください'
      : null;
    const hoursErr = validateHours(emailHours);
    if (addrErr || hoursErr) { setEmailError(addrErr ?? hoursErr!); return; }
    setEmailError('');
    setIsSending(true);
    try {
      const h = parseFloat(emailHours);
      const expiresAt = new Date(Date.now() + h * 3600000).toISOString();
      const res = await fetch(`${SUPABASE_URL}/rest/v1/shared_links`, {
        method: 'POST',
        headers: { ...makeHeaders(token), 'Prefer': 'return=representation' },
        body: JSON.stringify({ presentation_id: presentationId, expires_at: expiresAt, recipient_email: emailAddr.trim(), created_by: user?.id ?? null }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const [newLink]: SharedLink[] = await res.json();
      const shareUrl = `${window.location.origin}/share/${newLink.id}`;
      await fetch('/api/send-share-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: emailAddr.trim(), shareUrl, presentationTitle, expiresAt }),
      });
      setEmailLinks(prev => [newLink, ...prev]);
      setEmailAddr('');
      setEmailHours('');
      toast.success(`${emailAddr.trim()} に共有URLを送信しました`);
    } catch {
      toast.error('メールの送信に失敗しました');
    } finally {
      setIsSending(false);
    }
  };

  const revoke = async (id: string) => {
    setRevokingId(id);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/shared_links?id=eq.${id}`, {
        method: 'PATCH',
        headers: { ...makeHeaders(token), 'Prefer': 'return=minimal' },
        body: JSON.stringify({ is_revoked: true }),
      });
      setUrlLinks(prev => prev.filter(l => l.id !== id));
      setEmailLinks(prev => prev.filter(l => l.id !== id));
      toast.success('共有を削除しました');
    } catch {
      toast.error('削除に失敗しました');
    } finally {
      setRevokingId(null);
    }
  };

  const copyUrl = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/share/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const HoursInput = ({ value, onChange, error, onClear }: { value: string; onChange: (v: string) => void; error: string; onClear: () => void }) => (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Clock className="w-4 h-4 text-violet-500" />
        有効期限 <span className="text-red-500">*</span>
        <span className="text-gray-400 font-normal text-xs">（1〜720時間）</span>
      </label>
      <div className="relative">
        <input
          type="number"
          min="1"
          max="720"
          value={value}
          onChange={e => { onChange(e.target.value); onClear(); }}
          placeholder="例: 24"
          className={`w-full px-4 py-2.5 pr-14 border-2 rounded-xl outline-none text-sm transition-colors ${error ? 'border-red-300 focus:border-red-400' : 'border-violet-100 focus:border-violet-400'}`}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">時間</span>
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-red-500 text-xs">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );

  const LinkCard = ({ link, isEmail }: { link: SharedLink; isEmail: boolean }) => {
    const expiry = formatExpiry(link.expires_at);
    return (
      <div className="flex items-center gap-2 p-3 bg-violet-50 rounded-xl border border-violet-100">
        <div className="flex-1 min-w-0">
          {isEmail
            ? <p className="text-sm font-medium text-gray-700 truncate">{link.recipient_email}</p>
            : <p className="text-xs font-mono text-gray-500 truncate">/share/{link.id.slice(0, 8)}…</p>
          }
          <p className={`text-xs mt-0.5 font-medium ${expiry.urgent ? 'text-orange-500' : 'text-violet-600'}`}>
            {expiry.label}
          </p>
        </div>
        <button onClick={() => copyUrl(link.id)} className="p-1.5 hover:bg-violet-100 rounded-lg transition-colors flex-shrink-0" title="URLをコピー">
          {copiedId === link.id
            ? <CheckCircle className="w-4 h-4 text-green-500" />
            : <Copy className="w-4 h-4 text-violet-500" />}
        </button>
        <button onClick={() => revoke(link.id)} disabled={revokingId === link.id} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0" title="共有解除">
          {revokingId === link.id
            ? <Loader2 className="w-4 h-4 animate-spin text-red-400" />
            : <Trash2 className="w-4 h-4 text-red-400" />}
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-5 text-white flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-base">共有設定</h2>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/70 text-xs truncate mb-3">{presentationTitle}</p>
          <div className="flex gap-1">
            {([['url', '🔗 URLで共有'], ['email', '✉️ メールで共有']] as const).map(([t, label]) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  tab === t ? 'bg-white text-violet-600' : 'text-white/70 hover:text-white hover:bg-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {tab === 'url' ? (
            <>
              <div className="space-y-3">
                <HoursInput
                  value={urlHours}
                  onChange={setUrlHours}
                  error={urlError}
                  onClear={() => setUrlError('')}
                />
                <button
                  onClick={generateUrl}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:scale-[1.01] disabled:opacity-60 disabled:scale-100 transition-all"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link className="w-4 h-4" />}
                  {isGenerating ? '発行中...' : '共有URLを発行'}
                </button>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  有効な共有URL
                  <span className="bg-violet-100 text-violet-700 text-xs px-2 py-0.5 rounded-full font-medium">{urlLinks.length}</span>
                </h3>
                {isLoading
                  ? <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-violet-400" /></div>
                  : urlLinks.length === 0
                    ? <p className="text-sm text-gray-400 text-center py-6 bg-gray-50 rounded-xl">発行済みの共有URLはありません</p>
                    : <div className="space-y-2">{urlLinks.map(l => <LinkCard key={l.id} link={l} isEmail={false} />)}</div>
                }
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Mail className="w-4 h-4 text-violet-500" />
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={emailAddr}
                    onChange={e => { setEmailAddr(e.target.value); setEmailError(''); }}
                    placeholder="user@example.com"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl outline-none text-sm transition-colors ${emailError ? 'border-red-300 focus:border-red-400' : 'border-violet-100 focus:border-violet-400'}`}
                  />
                </div>
                <HoursInput
                  value={emailHours}
                  onChange={setEmailHours}
                  error={emailError}
                  onClear={() => setEmailError('')}
                />
                <button
                  onClick={sendEmail}
                  disabled={isSending}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:scale-[1.01] disabled:opacity-60 disabled:scale-100 transition-all"
                >
                  {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  {isSending ? '送信中...' : '共有URLをメールで送信'}
                </button>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  メール共有一覧
                  <span className="bg-violet-100 text-violet-700 text-xs px-2 py-0.5 rounded-full font-medium">{emailLinks.length}</span>
                </h3>
                {isLoading
                  ? <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-violet-400" /></div>
                  : emailLinks.length === 0
                    ? <p className="text-sm text-gray-400 text-center py-6 bg-gray-50 rounded-xl">メール共有はありません</p>
                    : <div className="space-y-2">{emailLinks.map(l => <LinkCard key={l.id} link={l} isEmail={true} />)}</div>
                }
              </div>
            </>
          )}
        </div>

        <div className="px-5 py-4 border-t border-violet-50 flex-shrink-0">
          <button onClick={onClose} className="w-full py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
