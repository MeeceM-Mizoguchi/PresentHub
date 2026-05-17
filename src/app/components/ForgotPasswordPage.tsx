import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const { error } = await resetPassword(email);
    setIsLoading(false);
    if (error) {
      setError('送信に失敗しました。メールアドレスを確認してください。');
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-300/30 to-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Mail className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-center text-xl font-bold">パスワードのリセット</h1>
          </div>

          <div className="p-8">
            {sent ? (
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <p className="text-gray-700 font-medium">メールを送信しました</p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">{email}</span> にパスワードリセット用のリンクを送信しました。メールをご確認ください。
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 text-sm font-medium mt-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  ログイン画面に戻る
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-sm text-gray-600">
                  登録済みのメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。
                </p>

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
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                  {isLoading ? '送信中...' : 'リセットリンクを送信'}
                </button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    ログイン画面に戻る
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
