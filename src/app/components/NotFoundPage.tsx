import { useNavigate } from 'react-router-dom';
import { Home, LinkIcon } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
      <div className="text-center max-w-md px-6">
        <div className="text-9xl font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent mb-4 select-none">
          404
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          ページが見つかりません
        </h1>
        <p className="text-gray-500 mb-2 leading-relaxed">
          この共有リンクは有効期限が切れているか、<br />
          削除されました。
        </p>
        <p className="text-gray-400 text-sm mb-8">
          リンクを共有してもらった方に再発行を依頼してください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-medium"
          >
            <Home className="w-4 h-4" />
            ホームに戻る
          </button>
        </div>
        <div className="mt-10 flex items-center justify-center gap-2 text-violet-300">
          <LinkIcon className="w-4 h-4" />
          <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            PresentHub
          </span>
        </div>
      </div>
    </div>
  );
}
