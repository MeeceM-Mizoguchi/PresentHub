import { useState, useEffect, useCallback } from 'react';
import { X, UserPlus, Check, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

async function permRest(
  path: string,
  token: string,
  method: 'GET' | 'POST' | 'DELETE'
): Promise<Response> {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'apikey': SUPABASE_ANON_KEY,
      'Accept': 'application/json',
      ...(method === 'POST' ? { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' } : {}),
    },
  });
}

interface InvitedUser {
  id: string;
  email: string;
  name: string;
  user_id: string | null;
  status: string;
}

interface PermissionDialogProps {
  itemId: string;
  onClose: () => void;
}

export function PermissionDialog({ itemId, onClose }: PermissionDialogProps) {
  const { session, user } = useAuth();
  const { items } = useApp();
  const token = session?.access_token ?? '';
  const item = items.find(i => i.id === itemId);

  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [grantedUserIds, setGrantedUserIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const [usersRes, permsRes] = await Promise.all([
        permRest('user_invites?order=created_at.asc', token, 'GET'),
        permRest(`presentation_permissions?presentation_id=eq.${itemId}&select=user_id`, token, 'GET'),
      ]);
      const users: InvitedUser[] = usersRes.ok ? await usersRes.json() : [];
      const perms: { user_id: string }[] = permsRes.ok ? await permsRes.json() : [];
      setInvitedUsers(users);
      setGrantedUserIds(new Set(perms.map(p => p.user_id)));
    } catch { /* ignore */ } finally {
      setIsLoading(false);
    }
  }, [token, itemId]);

  useEffect(() => { load(); }, [load]);

  const toggleUser = async (inviteUser: InvitedUser) => {
    const uid = inviteUser.user_id;
    if (!uid) return;
    setTogglingId(uid);
    const hasAccess = grantedUserIds.has(uid);
    try {
      if (hasAccess) {
        await permRest(
          `presentation_permissions?presentation_id=eq.${itemId}&user_id=eq.${uid}`,
          token,
          'DELETE'
        );
        setGrantedUserIds(prev => { const next = new Set(prev); next.delete(uid); return next; });
      } else {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/presentation_permissions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'apikey': SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates,return=minimal',
          },
          body: JSON.stringify({
            presentation_id: itemId,
            user_id: uid,
            granted_by: user?.id ?? null,
          }),
        });
        if (res.ok) setGrantedUserIds(prev => new Set([...prev, uid]));
      }
    } catch { /* ignore */ } finally {
      setTogglingId(null);
    }
  };

  if (!item) { onClose(); return null; }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-violet-500 to-pink-500 p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserPlus className="w-6 h-6" />
              <div>
                <h2 className="font-bold">閲覧権限設定</h2>
                <p className="text-sm text-white/90 mt-0.5">{item.name}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            </div>
          ) : invitedUsers.length === 0 ? (
            <div className="text-center py-8">
              <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">招待済みユーザーがいません</p>
              <p className="text-gray-400 text-xs mt-1">「ユーザーを招待」から招待してください</p>
            </div>
          ) : (
            <div className="space-y-2">
              {invitedUsers.map(u => {
                const uid = u.user_id;
                const hasAccess = uid ? grantedUserIds.has(uid) : false;
                const isToggling = togglingId === uid;
                const noAccount = !uid;
                return (
                  <div
                    key={u.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      hasAccess ? 'border-violet-400 bg-violet-50' : 'border-gray-200 bg-white'
                    } ${noAccount ? 'opacity-50' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {u.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">{u.name}</div>
                      <div className="text-xs text-gray-500 truncate">{u.email}</div>
                      {noAccount && <div className="text-xs text-amber-500">招待メール未確認</div>}
                    </div>
                    <button
                      onClick={() => toggleUser(u)}
                      disabled={noAccount || isToggling}
                      className={`px-3 py-1.5 rounded-lg transition-all text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 ${
                        hasAccess
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-violet-100 text-violet-600 hover:bg-violet-200'
                      }`}
                    >
                      {isToggling ? <Loader2 className="w-3 h-3 animate-spin" /> : hasAccess ? <><Trash2 className="w-3 h-3" />削除</> : <><Check className="w-3 h-3" />追加</>}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {grantedUserIds.size > 0 && (
            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
              <p className="text-sm text-green-700">{grantedUserIds.size} 人がこの資料を閲覧できます</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-violet-100 flex-shrink-0">
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
