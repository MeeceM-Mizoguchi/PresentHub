import { useState } from 'react';
import { User, Mail, Shield, Pencil, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from '../lib/toast';

export function AccountPage() {
  const { profile, user, updateProfile } = useAuth();
  const displayEmail = profile?.email || user?.email || '—';
  const [isEditing, setIsEditing] = useState(false);
  const [nameVal, setNameVal] = useState(profile?.name ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const trimmed = nameVal.trim();
    if (!trimmed || trimmed === profile?.name) { setIsEditing(false); return; }
    setIsSaving(true);
    const error = await updateProfile({ name: trimmed });
    setIsSaving(false);
    if (error) {
      toast.error('保存に失敗しました');
    } else {
      toast.rename('アカウント名を更新しました');
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNameVal(profile?.name ?? '');
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-md border border-violet-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-3xl font-bold mb-3">
            {profile?.name ? profile.name[0].toUpperCase() : <User className="w-10 h-10" />}
          </div>
          <div className="text-white font-semibold text-lg">{profile?.name || '—'}</div>
          <div className="text-white/70 text-sm">{displayEmail}</div>
        </div>

        {/* Fields */}
        <div className="p-6 space-y-5">
          {/* Display Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              表示名
            </label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameVal}
                  onChange={e => setNameVal(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
                  className="flex-1 border-2 border-violet-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
                  autoFocus
                  disabled={isSaving}
                />
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-800">{profile?.name || '—'}</span>
                </div>
                <button
                  onClick={() => { setNameVal(profile?.name ?? ''); setIsEditing(true); }}
                  className="p-1.5 hover:bg-violet-100 rounded-md transition-colors text-gray-500 hover:text-violet-600"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              メールアドレス
            </label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-800">{displayEmail}</span>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              権限
            </label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-gray-800">
                {profile?.role === 'admin' ? '管理者' : '一般ユーザー'}
              </span>
              {profile?.role === 'admin' && (
                <span className="ml-auto text-xs px-2 py-0.5 bg-violet-100 text-violet-600 rounded-full font-medium">
                  Admin
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
