import { useState } from 'react';
import {
  UserPlus,
  Mail,
  Check,
  X,
  MoreVertical,
  Edit,
  Trash2,
  FolderOpen,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SharedUser } from '../types';

interface SharedManagementPageProps {
  onInvite: (name: string, email: string) => void;
}

export function SharedManagementPage({ onInvite }: SharedManagementPageProps) {
  const { sharedUsers, items, updateItem } = useApp();
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const activeUsers = sharedUsers.filter(u => u.status !== 'deleted');

  const handleInvite = () => {
    if (inviteName && inviteEmail) {
      onInvite(inviteName, inviteEmail);
      setInviteName('');
      setInviteEmail('');
      setShowInviteForm(false);
    }
  };

  const getStatusBadge = (status: SharedUser['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            <Check className="w-3 h-3" />
            アクティブ
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
            <Mail className="w-3 h-3" />
            招待中
          </span>
        );
      case 'deleted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
            <X className="w-3 h-3" />
            削除済み
          </span>
        );
    }
  };

  const toggleItemPermission = (userId: string, itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const sharedWith = item.sharedWith || [];
    const hasAccess = sharedWith.includes(userId);

    if (hasAccess) {
      updateItem(itemId, {
        sharedWith: sharedWith.filter(id => id !== userId)
      });
    } else {
      updateItem(itemId, {
        sharedWith: [...sharedWith, userId]
      });
    }
  };

  const renderFolderTree = (parentId: string | null, depth: number = 0): JSX.Element[] => {
    const childItems = items.filter(item => {
      if (item.type === 'folder') {
        return item.parentId === parentId;
      } else {
        return item.parentId === parentId;
      }
    });

    return childItems.map((item) => {
      const hasAccess = selectedUser ? (item.sharedWith || []).includes(selectedUser) : false;

      return (
        <div key={item.id}>
          <div
            className="flex items-center gap-2 py-2 px-3 hover:bg-violet-50 rounded-lg"
            style={{ paddingLeft: `${12 + depth * 20}px` }}
          >
            <input
              type="checkbox"
              checked={hasAccess}
              onChange={() => selectedUser && toggleItemPermission(selectedUser, item.id)}
              disabled={!selectedUser}
              className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
            />
            {item.type === 'folder' ? (
              <FolderOpen className="w-4 h-4 text-violet-500" />
            ) : (
              <FileText className="w-4 h-4 text-gray-500" />
            )}
            <span className="text-sm text-gray-700">{item.name}</span>
          </div>
          {item.type === 'folder' && renderFolderTree(item.id, depth + 1)}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-1">共有管理</h2>
          <p className="text-gray-600">プレゼンテーションの共有者を管理します</p>
        </div>
        <button
          onClick={() => setShowInviteForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
        >
          <UserPlus className="w-5 h-5" />
          新規招待
        </button>
      </div>

      {/* Invite Modal */}
      {showInviteForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setShowInviteForm(false);
              setInviteName('');
              setInviteEmail('');
            }}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl mx-4">
            <div className="flex items-center justify-between mb-5">
              <h3>新しい共有者を招待</h3>
              <button
                onClick={() => {
                  setShowInviteForm(false);
                  setInviteName('');
                  setInviteEmail('');
                }}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">名前</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                  placeholder="山田太郎"
                  autoFocus
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">メールアドレス</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                  placeholder="yamada@example.com"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleInvite}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Mail className="w-5 h-5" />
                  招待メールを送信
                </button>
                <button
                  onClick={() => {
                    setShowInviteForm(false);
                    setInviteName('');
                    setInviteEmail('');
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-violet-100">
        <div className="p-6 border-b border-violet-100 bg-gradient-to-r from-violet-50 to-pink-50">
          <h3>共有者一覧 ({activeUsers.length})</h3>
        </div>
        <div className="divide-y divide-violet-50">
          {activeUsers.map((user) => (
            <div key={user.id} className="p-5 hover:bg-violet-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0">
                  <span>{user.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-gray-800">{user.name}</h4>
                    {getStatusBadge(user.status)}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{user.email}</p>
                  <p className="text-xs text-gray-400">
                    招待日: {user.invitedAt}
                    {user.activatedAt && ` / アクティブ化: ${user.activatedAt}`}
                  </p>
                  <button
                    onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                    className="mt-3 text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    {selectedUser === user.id ? '権限編集を閉じる' : '権限を編集'}
                  </button>
                </div>
              </div>

              {/* Permission Editor */}
              {selectedUser === user.id && (
                <div className="mt-4 p-4 bg-violet-50 rounded-xl">
                  <h4 className="mb-3 text-sm text-gray-700">アクセス権限</h4>
                  <div className="max-h-64 overflow-y-auto">
                    {renderFolderTree(null)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeUsers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">まだ共有者がいません</p>
          <button
            onClick={() => setShowInviteForm(true)}
            className="mt-4 text-violet-600 hover:text-violet-700"
          >
            最初の共有者を招待する
          </button>
        </div>
      )}
    </div>
  );
}
