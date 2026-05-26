import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, CheckCircle, AlertCircle, Eye, EyeOff, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

function translateAuthError(msg: string): string {
  if (msg.includes('New password should be different from the old password')) {
    return '以前と異なるパスワードを設定してください';
  }
  if (msg.includes('Password should be at least')) {
    return 'パスワードは8文字以上で入力してください';
  }
  if (msg.includes('session')) {
    return 'セッションが切れました。招待メールのリンクを再度クリックしてください';
  }
  return 'パスワードの設定に失敗しました。しばらくしてから再試行してください';
}

const BgDeco = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-300/30 to-pink-300/30 rounded-full blur-3xl" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full blur-3xl" />
  </div>
);

export function SetPasswordPage() {
  const { user, session, isLoading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center p-4 relative">
        <BgDeco />
        <div className="relative text-center">
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">招待を確認中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center p-4 relative">
        <BgDeco />
        <div className="relative w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">リンクが無効です</h2>
            <p className="text-gray-600">招待リンクの有効期限が切れているか、無効なリンクです。</p>
            <p className="text-gray-500 text-sm mt-3">管理者までお問い合わせください。</p>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center p-4 relative">
        <BgDeco />
        <div className="relative w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">パスワードを設定しました</h2>
            <p className="text-gray-600 mb-6">PresentHub へようこそ！</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all"
            >
              ダッシュボードへ
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) { setError('パスワードは8文字以上で入力してください'); return; }
    if (password !== confirm) { setError('パスワードが一致しません'); return; }
    setIsSubmitting(true);

    // 招待セッションは権限が制限されているため管理者APIを使ってパスワードを設定
    const token = session?.access_token;
    if (!token) {
      setError('セッションが無効です。招待メールのリンクを再度クリックしてください');
      setIsSubmitting(false);
      return;
    }

    const setRes = await fetch('/api/set-password', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    const setData = await setRes.json();
    if (!setRes.ok) {
      setError(setData.error ?? 'パスワードの設定に失敗しました');
      setIsSubmitting(false);
      return;
    }

    // 招待ステータスを承認済みに更新
    if (user.email && session?.access_token) {
      fetch(`${SUPABASE_URL}/rest/v1/user_invites?email=eq.${encodeURIComponent(user.email)}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ status: 'accepted', user_id: user.id }),
      }).catch(() => {});
    }

    setIsSubmitting(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center p-4 relative">
      <BgDeco />
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-8 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <FileText className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-xl font-bold">PresentHub</h1>
            <p className="text-white/80 text-sm mt-1">パスワードを設定してください</p>
          </div>

          <div className="p-8">
            <div className="mb-6 p-3 bg-violet-50 rounded-xl border border-violet-100">
              <p className="text-xs text-gray-500 mb-0.5">アカウント</p>
              <p className="text-sm font-medium text-gray-800">{user.email}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  新しいパスワード <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoFocus
                    placeholder="8文字以上"
                    className="w-full pl-10 pr-10 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  パスワードを確認 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                    placeholder="パスワードを再入力"
                    className="w-full pl-10 pr-10 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                  />
                  <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !password || !confirm}
                className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 flex items-center justify-center gap-2 font-medium mt-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                {isSubmitting ? '設定中...' : 'パスワードを設定する'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
