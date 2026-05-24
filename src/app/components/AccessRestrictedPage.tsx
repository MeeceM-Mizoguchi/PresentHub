import { LockIcon } from 'lucide-react';

export function AccessRestrictedPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
      <div className="text-center max-w-md px-6">
        <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <LockIcon className="w-10 h-10 text-violet-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          アクセスが制限されています
        </h1>
        <p className="text-gray-500 leading-relaxed">
          このサービスはご招待されたユーザーのみご利用いただけます。
        </p>
      </div>
    </div>
  );
}
