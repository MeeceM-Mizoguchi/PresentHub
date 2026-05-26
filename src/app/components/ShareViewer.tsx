import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Maximize2, Minimize2,
  Crosshair, Users, Radio, X, Loader2, Clock,
} from 'lucide-react';
import { presentationRegistry } from '../../presentations/registry';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { NotFoundPage } from './NotFoundPage';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

function tokenToUuid(token: string): string | null {
  try {
    const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    if (binary.length !== 16) return null;
    const hex = Array.from(binary).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  } catch {
    return null;
  }
}

interface SharedLink {
  id: string;
  presentation_id: string;
  expires_at: string;
  is_revoked: boolean;
}

type Status = 'loading' | 'valid' | 'invalid';

export function ShareViewer() {
  const { token } = useParams<{ token: string }>();
  const [linkData, setLinkData] = useState<SharedLink | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  const viewerRef = useRef<HTMLDivElement>(null);
  const slideAreaRef = useRef<HTMLDivElement>(null);
  const syncChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  // stable viewer ID for presence
  const viewerId = useRef(
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `share-${Date.now()}`
  ).current;

  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLaser, setIsLaser] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const [isOverSlide, setIsOverSlide] = useState(false);
  const [slideScale, setSlideScale] = useState<number | null>(null);
  const [isExpiredWhileViewing, setIsExpiredWhileViewing] = useState(false);
  const [syncMode, setSyncMode] = useState<'off' | 'follower'>('off');
  const [syncLaser, setSyncLaser] = useState({ x: 0, y: 0, active: false });
  const [presentUsers, setPresentUsers] = useState<{ userId: string; name: string; isPresenting: boolean }[]>([]);
  const [showFollowPanel, setShowFollowPanel] = useState(false);

  // ── リンク検証 ──────────────────────────────────────────────────────────
  useEffect(() => {
    const uuid = token ? tokenToUuid(token) : null;
    if (!uuid) { setStatus('invalid'); return; }
    fetch(`${SUPABASE_URL}/rest/v1/shared_links?id=eq.${uuid}&select=id,presentation_id,expires_at,is_revoked`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Accept': 'application/json' },
    })
      .then(r => r.ok ? r.json() : [])
      .then((rows: SharedLink[]) => {
        if (rows.length === 0) { setStatus('invalid'); return; }
        const link = rows[0];
        if (link.is_revoked || new Date(link.expires_at) <= new Date()) {
          setStatus('invalid');
          return;
        }
        setLinkData(link);
        setStatus('valid');
      })
      .catch(() => setStatus('invalid'));
  }, [token]);

  // 視聴中に有効期限が切れたら自動でオーバーレイ表示
  useEffect(() => {
    if (!linkData) return;
    const remaining = new Date(linkData.expires_at).getTime() - Date.now();
    if (remaining <= 0) { setIsExpiredWhileViewing(true); return; }
    const timer = setTimeout(() => setIsExpiredWhileViewing(true), remaining);
    return () => clearTimeout(timer);
  }, [linkData]);

  const presentation = linkData
    ? presentationRegistry.find(p => p.meta.id === linkData.presentation_id) ?? null
    : null;

  const total = presentation?.slides?.length ?? 0;
  const presId = linkData?.presentation_id ?? '';

  // ── プレゼンス ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (status !== 'valid' || !presId || !isSupabaseConfigured) return;

    const ch = supabase.channel(`presentation-presence-${presId}`, {
      config: { presence: { key: viewerId } },
    })
      .on('presence', { event: 'sync' }, () => {
        const state = ch.presenceState<{ name: string; isPresenting: boolean }>();
        const users = Object.entries(state)
          .filter(([uid]) => uid !== viewerId)
          .map(([uid, presences]) => ({
            userId: uid,
            name: (presences[0] as { name: string; isPresenting: boolean }).name ?? '不明',
            isPresenting: (presences[0] as { name: string; isPresenting: boolean }).isPresenting ?? false,
          }));
        setPresentUsers(users);
      })
      .subscribe(async (s) => {
        if (s === 'SUBSCRIBED') {
          await ch.track({ name: '共有ユーザー', isPresenting: false });
        }
      });

    return () => {
      ch.unsubscribe();
      setPresentUsers([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, presId]);

  // ── ResizeObserver ───────────────────────────────────────────────────────
  useEffect(() => {
    const el = slideAreaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSlideScale(Math.min(width / 1280, height / 720));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isFullscreen, status]);

  // ── フルスクリーン ───────────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  useEffect(() => {
    if (!isFullscreen) setShowFollowPanel(false);
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) viewerRef.current?.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }, []);

  // ── ナビゲーション ───────────────────────────────────────────────────────
  const prev = useCallback(() => setCurrent(s => Math.max(0, s - 1)), []);
  const next = useCallback(() => setCurrent(s => Math.min(total - 1, s + 1)), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      else if (e.key === 'l' || e.key === 'L') setIsLaser(v => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, toggleFullscreen]);

  // ── 追従モード ───────────────────────────────────────────────────────────
  const startFollowing = useCallback((targetUserId: string) => {
    if (!isSupabaseConfigured || syncMode !== 'off') return;
    const ch = supabase
      .channel(`presentation-sync-${presId}-${targetUserId}`)
      .on('broadcast', { event: 'slide' }, ({ payload }) => {
        setCurrent((payload as { index: number }).index);
      })
      .on('broadcast', { event: 'laser' }, ({ payload }) => {
        const p = payload as { x: number; y: number; active: boolean };
        setSyncLaser({ x: p.x, y: p.y, active: p.active });
      })
      .subscribe();
    syncChannelRef.current = ch;
    setSyncMode('follower');
    setShowFollowPanel(false);
  }, [presId, syncMode]);

  const stopFollowing = useCallback(() => {
    syncChannelRef.current?.unsubscribe();
    syncChannelRef.current = null;
    setSyncMode('off');
    setSyncLaser({ x: 0, y: 0, active: false });
    setShowFollowPanel(false);
  }, []);

  // ── ローディング ─────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (status === 'invalid' || !presentation) {
    return <NotFoundPage />;
  }

  const S = slideScale ?? 0;
  const showLaser = isLaser && isOverSlide;
  const slideEl = presentation.slides[current];
  const presentingUsers = presentUsers.filter(u => u.isPresenting);
  const otherUsers = presentUsers.filter(u => !u.isPresenting);

  // ── 追従パネル ───────────────────────────────────────────────────────────
  const followPanel = isSupabaseConfigured && (
    <div className="relative">
      <button
        onClick={syncMode === 'follower' ? stopFollowing : () => setShowFollowPanel(v => !v)}
        title={syncMode === 'follower' ? '追従を停止' : 'プレゼン追従'}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-semibold ${
          syncMode === 'follower'
            ? 'bg-green-500 text-white'
            : showFollowPanel
              ? 'bg-white/20 text-white border border-white/30'
              : 'hover:bg-white/10 text-white/60 hover:text-white border border-white/20'
        }`}
      >
        <Users className="w-3.5 h-3.5" />
        {syncMode === 'follower' ? '追従中' : 'プレゼン追従'}
      </button>

      {showFollowPanel && syncMode === 'off' && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="text-white/85 text-sm font-semibold">追従する人を選択</div>
              <div className="text-white/35 text-xs mt-0.5">現在この資料を開いている人</div>
            </div>
            <button onClick={() => setShowFollowPanel(false)} className="p-1 hover:bg-white/10 rounded-lg">
              <X className="w-4 h-4 text-white/40" />
            </button>
          </div>
          <div className="max-h-56 overflow-y-auto">
            {presentUsers.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Users className="w-8 h-8 text-white/15 mx-auto mb-2" />
                <p className="text-white/35 text-xs">他に誰も開いていません</p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {[...presentingUsers, ...otherUsers].map(u => (
                  <div key={u.userId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${u.isPresenting ? 'bg-gradient-to-br from-violet-500 to-pink-500' : 'bg-gray-600'}`}>
                      {u.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white/80 text-sm font-medium truncate">{u.name}</div>
                      {u.isPresenting && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Radio className="w-2.5 h-2.5 text-red-400 animate-pulse" />
                          <span className="text-red-400 text-xs font-medium">プレゼン中</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => startFollowing(u.userId)}
                      className="px-2.5 py-1 bg-violet-500 hover:bg-violet-400 text-white text-xs rounded-lg font-semibold transition-colors flex-shrink-0"
                    >
                      追従
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // ── コントロールバー ─────────────────────────────────────────────────────
  const controlBar = (
    <div className="flex items-center gap-1">
      <span className="text-sm text-white/50 tabular-nums mr-3">{current + 1} / {total}</span>
      {syncMode === 'follower' && (
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full mr-1">
          <Radio className="w-3 h-3 animate-pulse" />
          追従中
        </span>
      )}
      {followPanel}
      <button
        onClick={() => setIsLaser(v => !v)}
        title="レーザーポインター (L)"
        className={`p-2 rounded-lg transition-colors ${isLaser ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-white/60 hover:text-white'}`}
      >
        <Crosshair className="w-5 h-5" />
      </button>
      <button onClick={toggleFullscreen} title="全画面 (F)" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white">
        {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
      </button>
    </div>
  );

  // ── 期限切れオーバーレイ ─────────────────────────────────────────────────
  const expiredOverlay = isExpiredWhileViewing && (
    <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-violet-300" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">有効期限が切れました</h1>
        <p className="text-white/60 leading-relaxed">
          この資料の共有リンクは有効期限が切れました。<br />
          引き続き閲覧する場合は、再度リンクの発行を依頼してください。
        </p>
      </div>
    </div>
  );

  // ── フルスクリーン表示 ───────────────────────────────────────────────────
  if (isFullscreen) {
    return (
      <div ref={viewerRef} className="fixed inset-0 z-50 bg-black flex flex-col">
        {showLaser && (
          <div style={{ position: 'fixed', left: laserPos.x - 8, top: laserPos.y - 8, width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,30,30,0.9)', boxShadow: '0 0 14px 5px rgba(255,30,30,0.45)', pointerEvents: 'none', zIndex: 9999 }} />
        )}
        <div className="flex items-center justify-between px-6 py-3 flex-shrink-0 bg-gradient-to-b from-black/60 to-transparent absolute inset-x-0 top-0 z-10">
          <h2 className="font-semibold text-white/80 text-base truncate max-w-sm">{presentation.meta.title}</h2>
          {controlBar}
        </div>
        <div className="flex-1 flex min-h-0">
          <div className="flex-1 flex items-center justify-center relative">
            <button onClick={prev} disabled={current === 0} className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div
              ref={slideAreaRef}
              onMouseMove={e => setLaserPos({ x: e.clientX, y: e.clientY })}
              onMouseEnter={() => setIsOverSlide(true)}
              onMouseLeave={() => setIsOverSlide(false)}
              onClick={e => { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX - r.left < r.width / 2) prev(); else next(); }}
              style={{ width: 'min(100%, calc(100vh * 16 / 9))', height: 'min(100%, calc(100vw * 9 / 16))', background: 'white', overflow: 'hidden', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: '1280px', height: '720px', transform: `translate(-50%, -50%) scale(${S})`, pointerEvents: 'none', visibility: slideScale === null ? 'hidden' : 'visible' }}>
                {slideEl}
              </div>
              {syncMode === 'follower' && syncLaser.active && (
                <div style={{ position: 'absolute', left: `${syncLaser.x * 100}%`, top: `${syncLaser.y * 100}%`, width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,30,30,0.9)', transform: 'translate(-50%,-50%)', boxShadow: '0 0 16px 6px rgba(255,30,30,0.45)', pointerEvents: 'none', zIndex: 100 }} />
              )}
            </div>
            <button onClick={next} disabled={current === total - 1} className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
        <div className="pb-4 flex items-center justify-center gap-2 flex-shrink-0 absolute bottom-0 inset-x-0">
          {presentation.slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-200 ${i === current ? 'w-6 h-3 bg-white' : 'w-3 h-3 bg-white/30 hover:bg-white/60'}`} />
          ))}
        </div>
        {expiredOverlay}
      </div>
    );
  }

  // ── 通常表示 ─────────────────────────────────────────────────────────────
  return (
    <div ref={viewerRef} className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      {showLaser && (
        <div style={{ position: 'fixed', left: laserPos.x - 8, top: laserPos.y - 8, width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,30,30,0.9)', boxShadow: '0 0 14px 5px rgba(255,30,30,0.45)', pointerEvents: 'none', zIndex: 9999 }} />
      )}
      <div className="flex items-center justify-between px-8 py-4 text-white flex-shrink-0">
        <div>
          <h2 className="font-semibold text-lg">{presentation.meta.title}</h2>
          <p className="text-sm text-white/50">{presentation.meta.author}</p>
        </div>
        {controlBar}
      </div>
      <div className="flex-1 flex min-h-0 px-8 pb-4 gap-6 items-center">
        <button onClick={prev} disabled={current === 0} className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed text-white flex-shrink-0">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <div className="flex-1 max-w-5xl min-w-0">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <div
              className="absolute inset-0 bg-white rounded-xl overflow-hidden shadow-2xl"
              ref={slideAreaRef}
              onMouseMove={e => setLaserPos({ x: e.clientX, y: e.clientY })}
              onMouseEnter={() => setIsOverSlide(true)}
              onMouseLeave={() => setIsOverSlide(false)}
              onClick={e => { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX - r.left < r.width / 2) prev(); else next(); }}
            >
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: '1280px', height: '720px', transform: `translate(-50%, -50%) scale(${S})`, pointerEvents: 'none', visibility: slideScale === null ? 'hidden' : 'visible' }}>
                {slideEl}
              </div>
              {syncMode === 'follower' && syncLaser.active && (
                <div style={{ position: 'absolute', left: `${syncLaser.x * 100}%`, top: `${syncLaser.y * 100}%`, width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,30,30,0.9)', transform: 'translate(-50%,-50%)', boxShadow: '0 0 16px 6px rgba(255,30,30,0.45)', pointerEvents: 'none', zIndex: 100 }} />
              )}
            </div>
          </div>
        </div>
        <button onClick={next} disabled={current === total - 1} className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed text-white flex-shrink-0">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
      <div className="pb-6 flex items-center justify-center gap-2 flex-shrink-0">
        {presentation.slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-200 ${i === current ? 'w-6 h-3 bg-white' : 'w-3 h-3 bg-white/30 hover:bg-white/60'}`} />
        ))}
      </div>
      {expiredOverlay}
    </div>
  );
}
