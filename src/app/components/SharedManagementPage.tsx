import { useState, useEffect, useCallback } from 'react';
import { UserPlus, Mail, Check, Trash2, Loader2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { InviteDialog } from './InviteDialog';
import { toast } from '../lib/toast';
import { isSupabaseConfigured } from '../../lib/supabase';
import { presentationRegistry } from '../../presentations/registry';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

interface InvitedUser {
  id: string;
  email: string;
  name: string;
  user_id: string | null;
  status: string;
  created_at: string;
}

function restHead(token: string): Record<string, string> {
  return { 'Authorization': `Bearer ${token}`, 'apikey': SUPABASE_ANON_KEY, 'Accept': 'application/json' };
}

// ── ユーザーごとの資料権限パネル ──────────────────────────────────────────
function UserPermissionPanel({ userId, token }: { userId: string; token: string }) {
  const [grantedIds, setGrantedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);
    fetch(`${SUPABASE_URL}/rest/v1/presentation_permissions?user_id=eq.${userId}&select=presentation_id`, {
      headers: restHead(token),
    })
      .then(r => r.ok ? r.json() : [])
      .then((rows: { presentation_id: string }[]) => setGrantedIds(new Set(rows.map(r => r.presentation_id))))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [userId, token]);

  const toggle = async (presId: string) => {
    setTogglingId(presId);
    const has = grantedIds.has(presId);
    try {
      if (has) {
        await fetch(`${SUPABASE_URL}/rest/v1/presentation_permissions?presentation_id=eq.${presId}&user_id=eq.${userId}`, {
          method: 'DELETE',
          headers: restHead(token),
        });
        setGrantedIds(prev => { const n = new Set(prev); n.delete(presId); return n; });
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/presentation_permissions`, {
          method: 'POST',
          headers: { ...restHead(token), 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates,return=minimal' },
          body: JSON.stringify({ presentation_id: presId, user_id: userId }),
        });
        setGrantedIds(prev => new Set([...prev, presId]));
      }
    } catch {
      toast.error('権限の更新に失敗しました');
    } finally {
      setTogglingId(null);
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-4">
      <Loader2 className="w-5 h-5 text-violet-500 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-1">
      {presentationRegistry.map(entry => {
        const has = grantedIds.has(entry.meta.id);
        const toggling = togglingId === entry.meta.id;
        return (
          <label
            key={entry.meta.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-violet-50 cursor-pointer transition-colors"
          >
            <div className="relative flex-shrink-0">
              {toggling
                ? <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />
                : <input
                    type="checkbox"
                    checked={has}
                    onChange={() => toggle(entry.meta.id)}
                    className="w-4 h-4 accent-violet-500 cursor-pointer"
                  />
              }
            </div>
            <span className="text-sm text-gray-700 flex-1">{entry.meta.title}</span>
            {has && <Check className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />}
          </label>
        );
      })}
      {presentationRegistry.length === 0 && (
        <p className="text-sm text-gray-400 px-3 py-2">資料がありません</p>
      )}
    </div>
  );
}

// ── メインコンポーネント ──────────────────────────────────────────────────
export function SharedManagementPage() {
  const { session } = useAuth();
  const token = session?.access_token ?? '';

  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    if (!token || !isSupabaseConfigured) { setIsLoading(false); return; }
    setIsLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/user_invites?order=created_at.desc`, {
        headers: restHead(token),
      });
      if (res.ok) setInvitedUsers(await res.json());
    } catch { /* ignore */ } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const handleDelete = async (invite: InvitedUser) => {
    setDeletingId(invite.id);
    try {
      if (invite.user_id) {
        await fetch(`${SUPABASE_URL}/rest/v1/presentation_permissions?user_id=eq.${invite.user_id}`, {
          method: 'DELETE',
          headers: restHead(token),
        });
      }
      await fetch(`${SUPABASE_URL}/rest/v1/user_invites?id=eq.${invite.id}`, {
        method: 'DELETE',
        headers: restHead(token),
      });
      setInvitedUsers(prev => prev.filter(u => u.id !== invite.id));
      if (expandedUserId === invite.user_id) setExpandedUserId(null);
      toast.success('招待を削除しました');
    } catch {
      toast.error('削除に失敗しました');
    } finally {
      setDeletingId(null);
    }
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
          onClick={() => setShowInviteDialog(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
        >
          <UserPlus className="w-5 h-5" />
          新規招待
        </button>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-violet-100">
        <div className="p-6 border-b border-violet-100 bg-gradient-to-r from-violet-50 to-pink-50">
          <h3>共有者一覧 ({invitedUsers.length})</h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          </div>
        ) : invitedUsers.length === 0 ? (
          <div className="text-center py-12">
            <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">まだ共有者がいません</p>
            <button
              onClick={() => setShowInviteDialog(true)}
              className="mt-4 text-violet-600 hover:text-violet-700"
            >
              最初の共有者を招待する
            </button>
          </div>
        ) : (
          <div className="divide-y divide-violet-50">
            {invitedUsers.map(u => {
              const isExpanded = expandedUserId === u.user_id;
              return (
                <div key={u.id}>
                  <div className="p-5 hover:bg-violet-50/50 transition-colors flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white font-bold flex-shrink-0 text-lg">
                      {u.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-gray-800">{u.name}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          u.status === 'accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {u.status === 'accepted'
                            ? <><Check className="w-3 h-3" />承認済</>
                            : <><Mail className="w-3 h-3" />招待中</>}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{u.email}</p>
                      <p className="text-xs text-gray-400 mt-0.5">招待日: {u.created_at.split('T')[0]}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {u.user_id ? (
                        <button
                          onClick={() => setExpandedUserId(isExpanded ? null : u.user_id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-violet-600 hover:bg-violet-100 rounded-lg border border-violet-200 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          権限を編集
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      ) : (
                        <span className="text-xs text-amber-500 px-2">メール未確認</span>
                      )}
                      <button
                        onClick={() => handleDelete(u)}
                        disabled={deletingId === u.id}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        {deletingId === u.id
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* 権限編集パネル */}
                  {isExpanded && u.user_id && (
                    <div className="px-5 pb-4 bg-violet-50/40 border-t border-violet-100">
                      <p className="text-xs text-gray-500 py-3 font-medium">閲覧を許可する資料</p>
                      <UserPermissionPanel userId={u.user_id} token={token} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showInviteDialog && (
        <InviteDialog onClose={() => { setShowInviteDialog(false); loadUsers(); }} />
      )}
    </div>
  );
}
