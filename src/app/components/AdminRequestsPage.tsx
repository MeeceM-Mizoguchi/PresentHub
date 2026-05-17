import { useState, useEffect, useCallback } from 'react';
import { UserPlus, Check, X, Clock, Loader2, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useConfirm } from './ConfirmDialog';
import { toast } from '../lib/toast';

interface AccountRequest {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
}

type TabType = 'pending' | 'approved' | 'rejected';

// 管理者がアカウント作成する際に使用する一時クライアント
// persistSession: false により、管理者のセッションに影響しない
function createTempClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_ANON_KEY as string,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
  );
}

export function AdminRequestsPage() {
  const { user } = useAuth();
  const { confirm } = useConfirm();
  const [requests, setRequests] = useState<AccountRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('pending');

  // アカウント作成ダイアログ
  const [approving, setApproving] = useState<AccountRequest | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('account_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setRequests(data as AccountRequest[]);
    setIsLoading(false);
  }, []);

  useEffect(() => { loadRequests(); }, [loadRequests]);

  const handleReject = async (req: AccountRequest) => {
    const ok = await confirm({
      title: '申請を却下',
      message: `「${req.name}」さんの申請を却下しますか？`,
      confirmLabel: '却下する',
      variant: 'danger',
    });
    if (!ok) return;
    await supabase.from('account_requests').update({
      status: 'rejected',
      reviewed_at: new Date().toISOString(),
      reviewed_by: user?.id,
    }).eq('id', req.id);
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'rejected' } : r));
    toast.success('申請を却下しました');
  };

  const handleApprove = async () => {
    if (!approving || !password) return;
    setCreateError(null);
    setIsCreating(true);

    // 管理者セッションに影響しない一時クライアントでアカウント作成
    const tempClient = createTempClient();
    const { error: signUpError } = await tempClient.auth.signUp({
      email: approving.email,
      password,
      options: {
        data: { name: approving.name, role: 'user' },
      },
    });

    if (signUpError) {
      setCreateError(
        signUpError.message.includes('already registered')
          ? 'このメールアドレスは既に登録済みです。'
          : `アカウント作成に失敗しました: ${signUpError.message}`
      );
      setIsCreating(false);
      return;
    }

    await supabase.from('account_requests').update({
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      reviewed_by: user?.id,
    }).eq('id', approving.id);

    setRequests(prev => prev.map(r => r.id === approving.id ? { ...r, status: 'approved' } : r));
    setIsCreating(false);
    setApproving(null);
    setPassword('');
  };

  const tabs: { key: TabType; label: string; color: string }[] = [
    { key: 'pending', label: '未対応', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { key: 'approved', label: '承認済', color: 'text-green-600 bg-green-50 border-green-200' },
    { key: 'rejected', label: '却下', color: 'text-red-600 bg-red-50 border-red-200' },
  ];

  const filtered = requests.filter(r => r.status === activeTab);
  const counts = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-violet-500 to-pink-500 p-2.5 rounded-xl">
            <UserPlus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">アカウント申請</h2>
            <p className="text-sm text-gray-500">申請を確認し、アカウントを作成します</p>
          </div>
        </div>
        <button
          onClick={loadRequests}
          className="p-2 hover:bg-violet-100 rounded-lg transition-colors text-gray-500 hover:text-violet-600"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
              activeTab === tab.key
                ? tab.color
                : 'text-gray-500 bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === tab.key ? 'bg-white/60' : 'bg-gray-100'
            }`}>
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center text-gray-400">
          <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>
            {activeTab === 'pending' ? '未対応の申請はありません' :
             activeTab === 'approved' ? '承認済みの申請はありません' :
             '却下した申請はありません'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(req => (
            <div key={req.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {req.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{req.name}</p>
                      <p className="text-sm text-gray-500">{req.email}</p>
                    </div>
                  </div>
                  {req.company && (
                    <p className="text-sm text-gray-500 ml-12">🏢 {req.company}</p>
                  )}
                  {req.message && (
                    <p className="text-sm text-gray-600 mt-2 ml-12 bg-gray-50 rounded-lg px-3 py-2">
                      {req.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2 ml-12">
                    申請日: {new Date(req.created_at).toLocaleDateString('ja-JP')}
                  </p>
                </div>

                {req.status === 'pending' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setApproving(req); setPassword(''); setCreateError(null); }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      承認
                    </button>
                    <button
                      onClick={() => handleReject(req)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-medium transition-colors"
                    >
                      <X className="w-4 h-4" />
                      却下
                    </button>
                  </div>
                )}

                {req.status === 'approved' && (
                  <span className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-full font-medium flex-shrink-0">
                    ✓ 承認済
                  </span>
                )}
                {req.status === 'rejected' && (
                  <span className="text-xs px-3 py-1.5 bg-red-50 text-red-500 rounded-full font-medium flex-shrink-0">
                    × 却下
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* アカウント作成モーダル */}
      {approving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">アカウントを作成</h3>
              <p className="text-sm text-gray-500 mt-1">{approving.name}（{approving.email}）</p>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                初期パスワードを設定してアカウントを作成します。
                メールアドレス確認が有効な場合、ユーザーに確認メールが送信されます。
              </p>

              {createError && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {createError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  初期パスワード <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all"
                    placeholder="8文字以上"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => { setApproving(null); setPassword(''); }}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleApprove}
                disabled={!password || password.length < 8 || isCreating}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-violet-500 to-pink-500 hover:shadow-lg text-white rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                {isCreating ? '作成中...' : 'アカウントを作成'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
