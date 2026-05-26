import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Loader2, CheckCircle, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function RequestAccessPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error } = await supabase.from('account_requests').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || null,
      message: form.message.trim() || null,
    });

    setIsLoading(false);
    if (error) {
      setError('送信に失敗しました。しばらく経ってから再度お試しください。');
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-300/30 to-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <FileText className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-center text-xl font-bold">アカウント申請フォーム</h1>
            <p className="text-center text-white/80 text-sm mt-2">
              内容を確認後、担当者よりご連絡いたします。
            </p>
          </div>

          <div className="p-8">
            {submitted ? (
              <div className="text-center space-y-4 py-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <p className="text-gray-700 font-medium text-lg">申請を受け付けました</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  申請内容を確認の上、<span className="font-medium text-gray-700">{form.email}</span> 宛にご連絡いたします。しばらくお待ちください。
                </p>
                <Link
                  to="/admin/a9c2b7"
                  className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 text-sm font-medium mt-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  ログイン画面に戻る
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                      placeholder="山田 太郎"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      会社名・組織名
                    </label>
                    <input
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                      placeholder="株式会社〇〇"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      申請理由・メッセージ
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all resize-none"
                      placeholder="利用目的や所属部署などをご記入ください"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {isLoading ? '送信中...' : '申請を送信する'}
                </button>

                <div className="text-center">
                  <Link
                    to="/admin/a9c2b7"
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
