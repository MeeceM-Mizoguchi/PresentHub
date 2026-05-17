import { useState } from 'react';
import { X, Folder, Home, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../lib/toast';

interface MoveToFolderDialogProps {
  fileId: string;
  currentFolderId: string | null;
  onClose: () => void;
}

export function MoveToFolderDialog({ fileId, currentFolderId, onClose }: MoveToFolderDialogProps) {
  const { items, moveToFolder } = useApp();
  const folders = items.filter(item => item.type === 'folder');
  const [selected, setSelected] = useState<string | null>(currentFolderId);

  const handleMove = () => {
    moveToFolder(fileId, selected);
    toast.move('移動しました');
    onClose();
  };

  const renderFolderTree = (parentId: string | null = null, depth: number = 0): JSX.Element[] => {
    const children = folders.filter(f => (f.parentId ?? null) === parentId);
    return children.flatMap(folder => {
      const hasChildren = folders.some(f => f.parentId === folder.id);
      return [
        <button
          key={folder.id}
          onClick={() => setSelected(folder.id)}
          className={`w-full flex items-center gap-2 py-2.5 pr-3 rounded-xl transition-colors mb-0.5 border-2 ${
            selected === folder.id
              ? 'bg-violet-50 border-violet-300'
              : 'border-transparent hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${12 + depth * 20}px` }}
        >
          {depth > 0 && (
            <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
          )}
          <Folder className="w-5 h-5 text-violet-400 flex-shrink-0" />
          <span className="text-gray-700 text-sm truncate">{folder.name}</span>
          {hasChildren && (
            <span className="ml-auto text-xs text-gray-400 flex-shrink-0">▾</span>
          )}
        </button>,
        ...renderFolderTree(folder.id, depth + 1),
      ];
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">フォルダに移動</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-3 max-h-72 overflow-y-auto">
          <button
            onClick={() => setSelected(null)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors mb-1 border-2 ${
              selected === null
                ? 'bg-violet-50 border-violet-300'
                : 'border-transparent hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5 text-violet-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm">未分類（ルート）</span>
          </button>

          {renderFolderTree(null)}
        </div>

        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm"
          >
            キャンセル
          </button>
          <button
            onClick={handleMove}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl hover:shadow-md transition-all text-sm font-medium"
          >
            移動する
          </button>
        </div>
      </div>
    </div>
  );
}
