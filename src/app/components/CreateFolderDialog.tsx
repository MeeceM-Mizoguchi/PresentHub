import { useState } from 'react';
import { X, FolderPlus, Check, Folder, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CreateFolderDialogProps {
  onClose: () => void;
  onCreate: (name: string, sharedWith: string[], parentId: string | null) => void;
  initialParentId?: string | null;
}

export function CreateFolderDialog({ onClose, onCreate, initialParentId }: CreateFolderDialogProps) {
  const { sharedUsers, items, currentFolderId } = useApp();
  const [folderName, setFolderName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [parentId, setParentId] = useState<string | null>(initialParentId !== undefined ? initialParentId : currentFolderId);

  const activeUsers = sharedUsers.filter(u => u.status === 'active');
  const folders = items.filter(item => item.type === 'folder');

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreate = () => {
    if (folderName.trim()) {
      onCreate(folderName.trim(), selectedUsers, parentId);
      onClose();
    }
  };

  const renderFolderOptions = (pid: string | null = null, depth: number = 0): JSX.Element[] => {
    const children = folders.filter(f => (f.parentId ?? null) === pid);
    return children.flatMap(folder => [
      <button
        key={folder.id}
        onClick={() => setParentId(folder.id)}
        style={{ paddingLeft: `${12 + depth * 20}px` }}
        className={`w-full flex items-center gap-2 py-2 pr-3 rounded-xl transition-colors mb-0.5 border-2 ${
          parentId === folder.id
            ? 'bg-violet-50 border-violet-300'
            : 'border-transparent hover:bg-gray-50'
        }`}
      >
        <Folder className="w-4 h-4 text-violet-400 flex-shrink-0" />
        <span className="text-gray-700 text-sm truncate">{folder.name}</span>
      </button>,
      ...renderFolderOptions(folder.id, depth + 1),
    ]);
  };

  const parentLabel = parentId === null
    ? 'ルート（未分類）'
    : (folders.find(f => f.id === parentId)?.name ?? '');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FolderPlus className="w-6 h-6" />
              <h2>新規フォルダ作成</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Folder Name */}
          <div>
            <label className="block mb-2 text-gray-700">フォルダ名</label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
              placeholder="新しいフォルダ"
              autoFocus
            />
          </div>

          {/* Parent Folder Selection */}
          <div>
            <label className="block mb-2 text-gray-700">
              保存先フォルダ
              <span className="ml-2 text-sm font-normal text-violet-600">{parentLabel}</span>
            </label>
            <div className="border-2 border-gray-100 rounded-xl max-h-48 overflow-y-auto p-2">
              <button
                onClick={() => setParentId(null)}
                className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl transition-colors mb-0.5 border-2 ${
                  parentId === null
                    ? 'bg-violet-50 border-violet-300'
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="text-gray-700 text-sm">ルート（未分類）</span>
              </button>
              {renderFolderOptions(null)}
            </div>
          </div>

          {/* Shared Users Selection */}
          <div>
            <label className="block mb-3 text-gray-700">共有者を選択（オプション）</label>
            {activeUsers.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {activeUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => toggleUser(user.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      selectedUsers.includes(user.id)
                        ? 'border-violet-400 bg-violet-50'
                        : 'border-gray-200 hover:border-violet-200 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0">
                      <span className="text-sm">{user.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm text-gray-800 truncate">{user.name}</div>
                      <div className="text-xs text-gray-500 truncate">{user.email}</div>
                    </div>
                    {selectedUsers.includes(user.id) && (
                      <Check className="w-5 h-5 text-violet-600 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 py-4 text-center">
                共有できるユーザーがいません
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-violet-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
          >
            キャンセル
          </button>
          <button
            onClick={handleCreate}
            disabled={!folderName.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FolderPlus className="w-5 h-5" />
            作成
          </button>
        </div>
      </div>
    </div>
  );
}
