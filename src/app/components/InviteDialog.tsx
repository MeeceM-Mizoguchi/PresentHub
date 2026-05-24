import { useState, useEffect, useCallback } from 'react';
import { X, UserPlus, Mail, Loader2, Check, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { presentationRegistry } from '../../presentations/registry';
import { toast } from '../lib/toast';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

async function restReq(
  path: string,
  token: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: object,
  prefer?: string
): Promise<Response> {
  const defaultPrefer = method === 'POST' ? 'resolution=merge-duplicates,return=minimal' : method !== 'GET' && method !== 'DELETE' ? 'return=minimal' : undefined;
  const resolvedPrefer = prefer ?? defaultPrefer;
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'apikey': SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(resolvedPrefer ? { 'Prefer': resolvedPrefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

interface InvitedUser {
  id: string;
  email: string;
  name: string;
  user_id: string | null;
  status: string;
  created_at: string;
}

interface InviteDialogProps {
  onClose: () => void;
}

export function InviteDialog({ onClose }: InviteDialogProps) {
  const { session, user } = useAuth();
  const token = session?.access_token ?? '';

  const [tab, setTab] = useState<'invite' | 'list'>('invite');

  // Invite form
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPresentations, setSelectedPresentations] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPresSelect, setShowPresSelect] = useState(false);

  // Invited users list
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadInvitedUsers = useCallback(async () => {
    if (!token) return;
    setIsLoadingUsers(true);
    try {
      const res = await restReq('user_invites?order=created_at.desc', token, 'GET');
      if (res.ok) setInvitedUsers(await res.json());
    } catch { /* ignore */ } finally {
      setIsLoadingUsers(false);
    }
  }, [token]);

  useEffect(() => {
    if (tab === 'list') loadInvitedUsers();
  }, [tab, loadInvitedUsers]);

  const togglePresentation = (id: string) => {
    setSelectedPresentations(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!email.trim() || !name.trim()) { setFormError('名前とメールアドレスを入力してください'); return; }

    setIsSubmitting(true);

    // 1. Vercel関数経由でアカウント作成 & Resendで招待メール送信
    let newUserId: string | null = null;
    let isExistingUser = false;
    try {
      const inviteRes = await fetch('/api/invite-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), origin: window.location.origin }),
      });
      const inviteData = await inviteRes.json();
      if (!inviteRes.ok) {
        setFormError(inviteData.error ?? 'アカウント作成に失敗しました');
        setIsSubmitting(false);
        return;
      }
      newUserId = inviteData.userId ?? null;
      isExistingUser = inviteData.isExisting ?? false;
    } catch {
      setFormError('招待処理に失敗しました。しばらくしてから再試行してください');
      setIsSubmitting(false);
      return;
    }

    // 2. Insert user_invites record
    await restReq('user_invites', token, 'POST', {
      email: email.trim(),
      name: name.trim(),
      user_id: newUserId ?? null,
      invited_by: user?.id ?? null,
      status: 'pending',
    });

    // 3. Create profile for new user
    if (newUserId) {
      await restReq('user_profiles', token, 'POST', {
        id: newUserId,
        email: email.trim(),
        name: name.trim(),
        role: 'user',
      }).catch(() => {});
    }

    // 4. Grant presentation permissions
    if (newUserId && selectedPresentations.size > 0) {
      await Promise.all(
        [...selectedPresentations].map(presId =>
          restReq('presentation_permissions', token, 'POST', {
            presentation_id: presId,
            user_id: newUserId,
            granted_by: user?.id ?? null,
          })
        )
      );
    }

    toast.success(isExistingUser
      ? `${email.trim()} を共有者に追加しました`
      : `${email.trim()} に招待メールを送信しました`
    );
    setEmail('');
    setName('');
    setSelectedPresentations(new Set());
    setIsSubmitting(false);
    setTab('list');
    loadInvitedUsers();
  };

  const handleDelete = async (invite: InvitedUser) => {
    setDeletingId(invite.id);
    try {
      if (invite.user_id) {
        await restReq(`presentation_permissions?user_id=eq.${invite.user_id}`, token, 'DELETE');
        await restReq(`user_profiles?id=eq.${invite.user_id}`, token, 'DELETE');
        // auth.users からも削除（再招待時の旧パスワード残留を防ぐ）
        await fetch('/api/delete-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: invite.user_id }),
        }).catch(err => console.error('[delete] auth user delete failed:', err));
      }
      await restReq(`user_invites?id=eq.${invite.id}`, token, 'DELETE');
      setInvitedUsers(prev => prev.filter(u => u.id !== invite.id));
      toast.success('招待を削除しました');
    } catch {
      toast.error('削除に失敗しました');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-pink-500 p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserPlus className="w-6 h-6" />
              <h2 className="text-lg font-bold">ユーザーを招待</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex gap-1 mt-4">
            {(['invite', 'list'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  tab === t ? 'bg-white text-violet-600' : 'text-white/70 hover:text-white hover:bg-white/20'
                }`}
              >
                {t === 'invite' ? '新規招待' : '招待済み一覧'}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {tab === 'invite' ? (
            <form onSubmit={handleInvite} className="p-6 space-y-5">
              {formError && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {formError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  autoFocus
                  placeholder="山田 太郎"
                  className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="user@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                  />
                </div>
              </div>

              {/* Presentation selector */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  閲覧を許可する資料
                </label>
                <button
                  type="button"
                  onClick={() => setShowPresSelect(v => !v)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all text-left flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">
                    {selectedPresentations.size === 0
                      ? '資料を選択...'
                      : `${selectedPresentations.size} 件選択中`}
                  </span>
                  {showPresSelect ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {showPresSelect && (
                  <div className="border border-violet-100 rounded-xl overflow-hidden bg-white shadow-sm max-h-48 overflow-y-auto">
                    {presentationRegistry.map(entry => {
                      const checked = selectedPresentations.has(entry.meta.id);
                      return (
                        <label
                          key={entry.meta.id}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-violet-50 cursor-pointer border-b border-violet-50 last:border-0"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => togglePresentation(entry.meta.id)}
                            className="accent-violet-500"
                          />
                          <span className="text-sm text-gray-700">{entry.meta.title}</span>
                          {checked && <Check className="w-4 h-4 text-violet-500 ml-auto" />}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                  {isSubmitting ? '招待中...' : '招待メールを送信'}
                </button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  招待メールにパスワード設定リンクが含まれます
                </p>
              </div>
            </form>
          ) : (
            <div className="p-6">
              {isLoadingUsers ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                </div>
              ) : invitedUsers.length === 0 ? (
                <div className="text-center py-12">
                  <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">招待済みユーザーはいません</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {invitedUsers.map(u => (
                    <div key={u.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-800 truncate">{u.name}</div>
                        <div className="text-xs text-gray-500 truncate">{u.email}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                        u.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {u.status === 'accepted' ? '承認済' : '招待中'}
                      </span>
                      <button
                        onClick={() => handleDelete(u)}
                        disabled={deletingId === u.id}
                        className="p-1.5 hover:bg-red-100 rounded-lg text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        {deletingId === u.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-violet-50 flex-shrink-0">
          <button onClick={onClose} className="w-full px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
