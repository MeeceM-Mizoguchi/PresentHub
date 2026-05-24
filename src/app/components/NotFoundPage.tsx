import { LinkIcon } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
      <div className="text-center max-w-md px-6">
        <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <LinkIcon className="w-10 h-10 text-violet-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          有効期限が切れました
        </h1>
        <p className="text-gray-500 mb-2 leading-relaxed">
          このプレゼン資料は表示できません。
        </p>
        <p className="text-gray-400 text-sm">
          リンクを共有してもらった方に再発行を依頼してください。
        </p>
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
