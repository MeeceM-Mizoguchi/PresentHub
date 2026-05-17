import { useState } from 'react';
import { X, UserPlus, Check, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PermissionDialogProps {
  itemId: string;
  onClose: () => void;
}

export function PermissionDialog({ itemId, onClose }: PermissionDialogProps) {
  const { items, sharedUsers, updateItem } = useApp();
  const item = items.find(i => i.id === itemId);

  if (!item) {
    onClose();
    return null;
  }

  const activeUsers = sharedUsers.filter(u => u.status === 'active');
  const itemSharedWith = item.sharedWith || [];

  const toggleUser = (userId: string) => {
    const hasAccess = itemSharedWith.includes(userId);
    if (hasAccess) {
      updateItem(itemId, {
        sharedWith: itemSharedWith.filter(id => id !== userId)
      });
    } else {
      updateItem(itemId, {
        sharedWith: [...itemSharedWith, userId]
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserPlus className="w-6 h-6" />
              <div>
                <h2>権限設定</h2>
                <p className="text-sm text-white/90 mt-1">{item.name}</p>
              </div>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <h3 className="mb-4 text-gray-700">アクセス権限を持つユーザー</h3>

          {activeUsers.length > 0 ? (
            <div className="space-y-2">
              {activeUsers.map((user) => {
                const hasAccess = itemSharedWith.includes(user.id);
                return (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      hasAccess
                        ? 'border-violet-400 bg-violet-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0">
                      <span>{user.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-800 truncate">{user.name}</div>
                      <div className="text-xs text-gray-500 truncate">{user.email}</div>
                    </div>
                    <button
                      onClick={() => toggleUser(user.id)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        hasAccess
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-violet-100 text-violet-600 hover:bg-violet-200'
                      }`}
                    >
                      {hasAccess ? (
                        <span className="flex items-center gap-1 text-xs">
                          <Trash2 className="w-3 h-3" />
                          削除
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs">
                          <Check className="w-3 h-3" />
                          追加
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">共有できるユーザーがいません</p>
            </div>
          )}

          {itemSharedWith.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-sm text-green-700">
                {itemSharedWith.length}人のユーザーがアクセスできます
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-violet-100">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all"
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
}
