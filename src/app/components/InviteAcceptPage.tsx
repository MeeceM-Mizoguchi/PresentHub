import { useEffect, useState } from 'react';
import { Check, Mail, Loader } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InviteAcceptPageProps {
  inviteToken: string;
  onComplete: () => void;
}

export function InviteAcceptPage({ inviteToken, onComplete }: InviteAcceptPageProps) {
  const { sharedUsers, updateSharedUser } = useApp();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Simulate processing the invite token
    setTimeout(() => {
      // In a real app, this would validate the token with the backend
      // For now, we'll find a pending user and activate them
      const pendingUser = sharedUsers.find(u => u.status === 'pending');

      if (pendingUser) {
        updateSharedUser(pendingUser.id, {
          status: 'active',
          activatedAt: new Date().toISOString().split('T')[0]
        });
        setUserName(pendingUser.name);
        setStatus('success');

        // Auto-redirect after 3 seconds
        setTimeout(() => {
          onComplete();
        }, 3000);
      } else {
        setStatus('error');
      }
    }, 2000);
  }, [inviteToken, sharedUsers, updateSharedUser, onComplete]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-300/30 to-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50 p-8">
          {status === 'processing' && (
            <div className="text-center py-8">
              <div className="mb-6 flex justify-center">
                <Loader className="w-16 h-16 text-violet-500 animate-spin" />
              </div>
              <h2 className="mb-2">招待を確認中...</h2>
              <p className="text-gray-600">少々お待ちください</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-8">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="mb-2">アクセス完了!</h2>
              <p className="text-gray-600 mb-4">
                ようこそ、{userName}さん
              </p>
              <p className="text-sm text-gray-500">
                プレゼンテーション管理システムへのアクセスが有効になりました。
                <br />
                まもなくダッシュボードに移動します...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-8">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Mail className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="mb-2">招待が見つかりません</h2>
              <p className="text-gray-600 mb-6">
                この招待リンクは無効または期限切れです
              </p>
              <button
                onClick={onComplete}
                className="px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all"
              >
                ログイン画面に戻る
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
