import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Presentation, Sparkles, Loader2, Fingerprint } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { biometricAuth } from '../../lib/biometricAuth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bioAvailable, setBioAvailable] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const { signIn, loginWithBiometric } = useAuth();
  const navigate = useNavigate();

  // この端末で生体認証が利用可能（対応 & 登録済み）かを判定
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [supported, registered] = await Promise.all([
        biometricAuth.isSupported(),
        biometricAuth.isRegisteredOnThisDevice(),
      ]);
      if (!cancelled) setBioAvailable(supported && registered);
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);
    if (error) {
      setError('メールアドレスまたはパスワードが正しくありません。');
    } else {
      navigate('/');
    }
  };

  const handleBioLogin = async () => {
    setError(null);
    setBioLoading(true);
    const { error } = await loginWithBiometric();
    setBioLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-300/30 to-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-violet-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Presentation className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-center text-2xl font-bold mb-2">プレゼンテーション管理</h1>
            <p className="text-center text-white/90 text-sm flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" />
              美しいプレゼンをもっと簡単に
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                placeholder="your@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || bioLoading}
              className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </button>

            {bioAvailable && (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">または</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <button
                  type="button"
                  onClick={handleBioLogin}
                  disabled={isLoading || bioLoading}
                  className="w-full bg-white border-2 border-violet-200 text-violet-700 py-3 rounded-xl hover:bg-violet-50 hover:border-violet-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  {bioLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Fingerprint className="w-5 h-5" />}
                  {bioLoading ? '認証中...' : '生体認証でログイン'}
                </button>
              </>
            )}

            <div className="text-center">
              <Link
                to="/admin/a9c2b7/forgot"
                className="text-violet-600 hover:text-violet-700 text-sm transition-colors"
              >
                ID・パスワードをお忘れですか？
              </Link>
            </div>
          </form>

          {/* Footer — アカウント申請 */}
          <div className="px-8 pb-8 pt-2 border-t border-gray-100 text-center text-sm text-gray-500">
            <p className="mb-2">アクセスをご希望の方は</p>
            <Link
              to="/admin/a9c2b7/request"
              className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              アカウント申請フォームへ →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
