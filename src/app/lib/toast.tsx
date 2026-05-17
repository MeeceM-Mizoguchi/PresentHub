import { toast as sonner } from 'sonner';
import { CheckCircle2, Trash2, FolderPlus, FolderInput, Pencil, AlertCircle } from 'lucide-react';

type Variant = 'success' | 'delete' | 'create' | 'move' | 'rename' | 'error';

const icons: Record<Variant, React.ReactNode> = {
  success: <CheckCircle2 className="w-4 h-4 text-white" />,
  delete:  <Trash2       className="w-4 h-4 text-white" />,
  create:  <FolderPlus   className="w-4 h-4 text-white" />,
  move:    <FolderInput  className="w-4 h-4 text-white" />,
  rename:  <Pencil       className="w-4 h-4 text-white" />,
  error:   <AlertCircle  className="w-4 h-4 text-white" />,
};

const gradients: Record<Variant, string> = {
  success: 'from-violet-500 to-pink-500',
  delete:  'from-red-500 to-pink-500',
  create:  'from-violet-500 to-pink-500',
  move:    'from-blue-500 to-violet-500',
  rename:  'from-violet-500 to-pink-500',
  error:   'from-red-500 to-orange-500',
};

function ToastContent({ message, variant }: { message: string; variant: Variant }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-violet-100 rounded-2xl shadow-[0_8px_32px_rgba(109,40,217,0.15)] px-4 py-3 min-w-[240px] max-w-[320px]">
      <div className={`bg-gradient-to-br ${gradients[variant]} p-1.5 rounded-lg flex-shrink-0`}>
        {icons[variant]}
      </div>
      <span className="text-gray-800 text-sm font-medium leading-snug">{message}</span>
    </div>
  );
}

function show(message: string, variant: Variant, duration = 3000) {
  sonner.custom(() => <ToastContent message={message} variant={variant} />, { duration });
}

export const toast = {
  success: (msg: string) => show(msg, 'success'),
  delete:  (msg: string) => show(msg, 'delete'),
  create:  (msg: string) => show(msg, 'create'),
  move:    (msg: string) => show(msg, 'move'),
  rename:  (msg: string) => show(msg, 'rename'),
  error:   (msg: string) => show(msg, 'error'),
};
