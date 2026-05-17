import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

type ConfirmOptions = {
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: 'danger' | 'default';
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

type Pending = ConfirmOptions & { resolve: (v: boolean) => void };

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<Pending | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> =>
    new Promise(resolve => setPending({ ...options, resolve }))
  , []);

  const handleConfirm = () => { pending?.resolve(true); setPending(null); };
  const handleCancel  = () => { pending?.resolve(false); setPending(null); };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {pending && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className={`px-6 py-5 flex items-center gap-3 ${
              pending.variant === 'danger'
                ? 'bg-gradient-to-r from-red-500 to-pink-500'
                : 'bg-gradient-to-r from-violet-500 to-pink-500'
            }`}>
              {pending.variant === 'danger'
                ? <Trash2 className="w-5 h-5 text-white flex-shrink-0" />
                : <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
              }
              <h3 className="text-white font-semibold">{pending.title}</h3>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{pending.message}</p>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 py-2.5 text-white rounded-xl text-sm font-medium transition-all hover:shadow-lg active:scale-95 ${
                  pending.variant === 'danger'
                    ? 'bg-gradient-to-r from-red-500 to-pink-500'
                    : 'bg-gradient-to-r from-violet-500 to-pink-500'
                }`}
              >
                {pending.confirmLabel ?? '確認'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider');
  return ctx;
}
