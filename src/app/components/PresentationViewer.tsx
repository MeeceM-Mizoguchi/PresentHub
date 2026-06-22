import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Crosshair, MessageSquare, Trash2, Check, Pencil, CornerDownRight, Radio, Users, Share2, Download } from 'lucide-react';
import type { PresentationEntry } from '../../presentations/registry';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { ShareDialog } from './ShareDialog';

const REST_URL = import.meta.env.VITE_SUPABASE_URL as string;
const REST_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

async function commentRest<T = undefined>(
  path: string,
  token: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: object
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'apikey': REST_KEY,
      'Accept': 'application/json',
    };
    if (body) headers['Content-Type'] = 'application/json';
    if (method === 'POST' || method === 'PATCH') headers['Prefer'] = 'return=minimal';
    const res = await fetch(`${REST_URL}/rest/v1/${path}`, {
      method, headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    if (!res.ok) {
      const msg = await res.text().catch(() => String(res.status));
      console.error(`[comment REST] ${method} ${path} → ${res.status}:`, msg);
      throw new Error(`REST ${res.status}`);
    }
    if (method === 'GET') return res.json() as Promise<T>;
    return undefined as T;
  } finally {
    clearTimeout(timer);
  }
}

interface CommentReply {
  id: string;
  text: string;
  timestamp: string;
  authorName: string;
}

interface SlideComment {
  id: string;
  text: string;
  timestamp: string;
  x: number;
  y: number;
  resolved: boolean;
  authorName: string;
  replies: CommentReply[];
}

interface SlideCommentFull extends SlideComment {
  slideIndex: number;
}

type PanelFilter = 'all' | 'open' | 'resolved';

const COMMENT_KEY = 'presenthub_slide_comments';
const SPEECH_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='30' viewBox='0 0 26 30'%3E%3Crect x='1' y='1' width='24' height='20' rx='5' fill='%238B5CF6' stroke='white' stroke-width='1.5'/%3E%3Cpolygon points='4,21 4,29 12,21' fill='%238B5CF6'/%3E%3Ccircle cx='8' cy='11' r='2.2' fill='white'/%3E%3Ccircle cx='13' cy='11' r='2.2' fill='white'/%3E%3Ccircle cx='18' cy='11' r='2.2' fill='white'/%3E%3C/svg%3E") 4 29, crosshair`;

function loadAllComments(): Record<string, SlideComment[]> {
  try { return JSON.parse(localStorage.getItem(COMMENT_KEY) ?? '{}'); } catch { return {}; }
}
function saveAllComments(data: Record<string, SlideComment[]>) {
  localStorage.setItem(COMMENT_KEY, JSON.stringify(data));
}

function formatTs() {
  return new Date().toLocaleString('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

interface PresentationViewerProps {
  presentation: PresentationEntry;
  onClose: () => void;
  titleOverride?: string;
}


export function PresentationViewer({ presentation, onClose, titleOverride }: PresentationViewerProps) {
  const { session, profile, isAdmin, isGuest } = useAuth();
  const accessToken = session?.access_token ?? '';

  const viewerRef = useRef<HTMLDivElement>(null);
  const slideAreaRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);
  const total = presentation.slides.length;
  const presId = presentation.meta.id;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLaser, setIsLaser] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });

  // Sync mode: 'off' | 'host' (admin broadcasting) | 'follower' (guest following)
  const [syncMode, setSyncMode] = useState<'off' | 'host' | 'follower'>('off');
  const [syncLaser, setSyncLaser] = useState({ x: 0, y: 0, active: false });
  const syncChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const lastBroadcastRef = useRef(0);
  const presenceChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const [presentUsers, setPresentUsers] = useState<{ userId: string; name: string; isPresenting: boolean }[]>([]);
  const [showFollowPanel, setShowFollowPanel] = useState(false);
  const [isOverSlide, setIsOverSlide] = useState(false);
  const [slideScale, setSlideScale] = useState<number | null>(null);

  // Current user derived from AuthContext (no getSession() call)
  const currentUser = profile ? { id: profile.id, name: profile.name || '外部ユーザー' } : null;

  // All slides' comments (single source of truth)
  const [allSlideComments, setAllSlideComments] = useState<SlideCommentFull[]>([]);
  // Derived: current slide's comments for the overlay
  const comments: SlideComment[] = allSlideComments.filter(c => c.slideIndex === current);

  // Comment UI state
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isCommentMode, setIsCommentMode] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [panelFilter, setPanelFilter] = useState<PanelFilter>('all');
  const [pendingPos, setPendingPos] = useState<{ x: number; y: number } | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const prev = useCallback(() => setCurrent(s => Math.max(0, s - 1)), []);
  const next = useCallback(() => setCurrent(s => Math.min(total - 1, s + 1)), [total]);

  // ── PDF エクスポート ──────────────────────────────────────────────────
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number } | null>(null);

  const handleExportPdf = useCallback(async () => {
    if (pdfProgress) return;
    setPdfProgress({ current: 0, total });
    try {
      const [{ jsPDF }, { toJpeg }, { createRoot }] = await Promise.all([
        import('jspdf'),
        import('html-to-image'),
        import('react-dom/client'),
      ]);
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1280, 720], compress: true });

      for (let i = 0; i < total; i++) {
        setPdfProgress({ current: i, total });

        const container = document.createElement('div');
        container.style.cssText =
          'position:fixed;top:0;left:0;width:1280px;height:720px;overflow:hidden;' +
          'background:#ffffff;pointer-events:none;z-index:100;';
        document.body.appendChild(container);
        const root = createRoot(container);

        try {
          root.render(presentation.slides[i]);

          await new Promise<void>(resolve =>
            requestAnimationFrame(() => requestAnimationFrame(resolve))
          );

          const dataUrl = await toJpeg(container, {
            quality: 0.95,
            width: 1280,
            height: 720,
            pixelRatio: 2,
          });

          if (i > 0) pdf.addPage([1280, 720], 'landscape');
          pdf.addImage(dataUrl, 'JPEG', 0, 0, 1280, 720);
        } finally {
          root.unmount();
          document.body.removeChild(container);
        }
      }

      pdf.save(`${presentation.meta.title}.pdf`);
    } catch (e) {
      console.error('[PDF export]', e);
    } finally {
      setPdfProgress(null);
    }
  }, [pdfProgress, total, presentation]);

  // ── 全スライドのコメントを初期ロード（パネル表示用）────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured || !accessToken) return;
    let cancelled = false;
    (async () => {
      try {
        type CommentRow = { id: string; text: string; timestamp: string; x: number; y: number; resolved: boolean; author_name: string; slide_index: number };
        type ReplyRow = { id: string; comment_id: string; text: string; timestamp: string; author_name: string };
        const rows = await commentRest<CommentRow[]>(
          `slide_comments?presentation_id=eq.${presId}&order=slide_index.asc,created_at.asc`,
          accessToken, 'GET'
        );
        if (cancelled) return;
        let replyRows: ReplyRow[] = [];
        if (rows.length > 0) {
          const ids = rows.map(r => r.id).join(',');
          replyRows = await commentRest<ReplyRow[]>(
            `slide_comment_replies?comment_id=in.(${ids})&order=created_at.asc`,
            accessToken, 'GET'
          );
          if (cancelled) return;
        }
        const mapped: SlideCommentFull[] = rows.map(r => ({
          slideIndex: r.slide_index,
          id: r.id, text: r.text, timestamp: r.timestamp,
          x: r.x, y: r.y, resolved: r.resolved, authorName: r.author_name,
          replies: replyRows.filter(rp => rp.comment_id === r.id)
            .map(rp => ({ id: rp.id, text: rp.text, timestamp: rp.timestamp, authorName: rp.author_name })),
        }));
        setAllSlideComments(mapped);
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presId, accessToken]);

  // ── スライド切替時：現在スライドを最新データで更新 ───────────────────
  useEffect(() => {
    setPendingPos(null);
    setActiveCommentId(null);
    setNewCommentText('');
    setEditingId(null);
    setReplyingToId(null);

    if (!isSupabaseConfigured || !accessToken) {
      const local = (loadAllComments()[`${presId}_${current}`] ?? []) as SlideComment[];
      setAllSlideComments(prev => [
        ...prev.filter(c => c.slideIndex !== current),
        ...local.map(c => ({ ...c, slideIndex: current })),
      ]);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        type CommentRow = { id: string; text: string; timestamp: string; x: number; y: number; resolved: boolean; author_name: string };
        type ReplyRow = { id: string; comment_id: string; text: string; timestamp: string; author_name: string };
        const rows = await commentRest<CommentRow[]>(
          `slide_comments?presentation_id=eq.${presId}&slide_index=eq.${current}&order=created_at.asc`,
          accessToken, 'GET'
        );
        if (cancelled) return;
        let replyRows: ReplyRow[] = [];
        if (rows.length > 0) {
          const ids = rows.map(r => r.id).join(',');
          replyRows = await commentRest<ReplyRow[]>(
            `slide_comment_replies?comment_id=in.(${ids})&order=created_at.asc`,
            accessToken, 'GET'
          );
          if (cancelled) return;
        }
        const mapped: SlideCommentFull[] = rows.map(r => ({
          slideIndex: current,
          id: r.id, text: r.text, timestamp: r.timestamp,
          x: r.x, y: r.y, resolved: r.resolved, authorName: r.author_name,
          replies: replyRows.filter(rp => rp.comment_id === r.id)
            .map(rp => ({ id: rp.id, text: rp.text, timestamp: rp.timestamp, authorName: rp.author_name })),
        }));
        setAllSlideComments(prev => [
          ...prev.filter(c => c.slideIndex !== current),
          ...mapped,
        ]);
        saveAllComments({ ...loadAllComments(), [`${presId}_${current}`]: mapped });
      } catch {
        if (!cancelled) {
          const local = (loadAllComments()[`${presId}_${current}`] ?? []) as SlideComment[];
          setAllSlideComments(prev => [
            ...prev.filter(c => c.slideIndex !== current),
            ...local.map(c => ({ ...c, slideIndex: current })),
          ]);
        }
      }
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presId, current, accessToken]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) viewerRef.current?.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }, []);

  const handleClose = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {}).finally(onClose);
    else onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      else if (e.key === 'Escape') {
        if (pendingPos) { setPendingPos(null); setNewCommentText(''); return; }
        if (replyingToId) { setReplyingToId(null); setReplyText(''); return; }
        if (editingId) { setEditingId(null); return; }
        if (isCommentMode) { setIsCommentMode(false); return; }
        if (!document.fullscreenElement) handleClose();
      }
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      else if (e.key === 'l' || e.key === 'L') setIsLaser(v => !v);
      else if (e.key === 'c' || e.key === 'C') {
        setIsCommentMode(v => { if (!v) setShowPanel(true); return !v; });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, handleClose, toggleFullscreen, pendingPos, isCommentMode, editingId, replyingToId]);

  // ── プレゼンス: 視聴者リストを維持 ─────────────────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured || !session?.user?.id) return;
    const userId = session.user.id;
    const userName = profile?.name || '外部ユーザー';

    const ch = supabase.channel(`presentation-presence-${presId}`, {
      config: { presence: { key: userId } },
    })
    .on('presence', { event: 'sync' }, () => {
      const state = ch.presenceState<{ name: string; isPresenting: boolean }>();
      const users = Object.entries(state)
        .filter(([uid]) => uid !== userId)
        .map(([uid, presences]) => ({
          userId: uid,
          name: (presences[0] as { name: string; isPresenting: boolean }).name ?? '不明',
          isPresenting: (presences[0] as { name: string; isPresenting: boolean }).isPresenting ?? false,
        }));
      setPresentUsers(users);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await ch.track({ name: userName, isPresenting: false });
      }
    });

    presenceChannelRef.current = ch;
    return () => {
      ch.unsubscribe();
      presenceChannelRef.current = null;
      setPresentUsers([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presId, session?.user?.id]);

  // ── 全画面終了時にフォローパネルを閉じる ──────────────────────────────
  useEffect(() => {
    if (!isFullscreen) setShowFollowPanel(false);
  }, [isFullscreen]);

  // ── 同期モード: 非ゲスト（オーナー）が全画面になると自動でホストとして配信開始 ──
  useEffect(() => {
    const userId = session?.user?.id;
    const userName = profile?.name || '外部ユーザー';
    if (!isSupabaseConfigured || isGuest || !isFullscreen || !userId) {
      if (syncMode === 'host') {
        syncChannelRef.current?.unsubscribe();
        syncChannelRef.current = null;
        setSyncMode('off');
        presenceChannelRef.current?.track({ name: userName, isPresenting: false });
      }
      return;
    }
    const ch = supabase.channel(`presentation-sync-${presId}-${userId}`);
    ch.subscribe();
    syncChannelRef.current = ch;
    setSyncMode('host');
    presenceChannelRef.current?.track({ name: userName, isPresenting: true });
    return () => {
      ch.unsubscribe();
      syncChannelRef.current = null;
      setSyncMode('off');
      presenceChannelRef.current?.track({ name: userName, isPresenting: false });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, isFullscreen, presId, session?.user?.id]);

  // ── ホスト: スライド変更を配信 ──────────────────────────────────────────
  useEffect(() => {
    if (syncMode !== 'host' || !syncChannelRef.current) return;
    syncChannelRef.current.send({ type: 'broadcast', event: 'slide', payload: { index: current } });
  }, [current, syncMode]);

  // ── ホスト: レーザーがオフになったら追従側にも通知 ──────────────────
  useEffect(() => {
    if (syncMode === 'host' && !isLaser && syncChannelRef.current && !isGuest) {
      syncChannelRef.current.send({ type: 'broadcast', event: 'laser', payload: { x: 0, y: 0, active: false } });
    }
  }, [isLaser, syncMode]);

  // ── フォロワー管理 ──────────────────────────────────────────────────────
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

  useEffect(() => {
    const el = slideAreaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSlideScale(Math.min(width / 1280, height / 720));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isFullscreen]);

  const handleSlideMouseMove = useCallback((e: React.MouseEvent) => {
    setLaserPos({ x: e.clientX, y: e.clientY });
    if (syncMode === 'host' && isLaser && slideAreaRef.current) {
      const now = Date.now();
      if (now - lastBroadcastRef.current < 50) return;
      lastBroadcastRef.current = now;
      const rect = slideAreaRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      syncChannelRef.current?.send({ type: 'broadcast', event: 'laser', payload: { x: relX, y: relY, active: true } });
    }
  }, [syncMode, isLaser]);

  const handleSlideClick = useCallback((e: React.MouseEvent) => {
    if (isLaser) return;
    setActiveCommentId(null);
    if (isCommentMode) {
      const rect = e.currentTarget.getBoundingClientRect();
      const s = slideScale ?? 0;
      if (s === 0) return;
      const slideX = (e.clientX - rect.left - (rect.width - 1280 * s) / 2) / s;
      const slideY = (e.clientY - rect.top - (rect.height - 720 * s) / 2) / s;
      if (slideX < 0 || slideX > 1280 || slideY < 0 || slideY > 720) return;
      setPendingPos({ x: (slideX / 1280) * 100, y: (slideY / 720) * 100 });
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX - rect.left < rect.width / 2) prev(); else next();
  }, [isLaser, isCommentMode, slideScale, prev, next]);

  const authorName = currentUser?.name ?? '外部ユーザー';
  const authorId = currentUser?.id ?? null;

  const addComment = useCallback(() => {
    if (!newCommentText.trim() || !pendingPos) return;
    const comment: SlideComment = {
      id: `c-${Date.now()}`,
      text: newCommentText.trim(),
      timestamp: formatTs(),
      x: pendingPos.x, y: pendingPos.y,
      resolved: false,
      authorName,
      replies: [],
    };
    setAllSlideComments(prev => [...prev, { ...comment, slideIndex: current }]);
    saveAllComments({ ...loadAllComments(), [`${presId}_${current}`]: [...comments, comment] });
    if (isSupabaseConfigured && accessToken) {
      commentRest(`slide_comments`, accessToken, 'POST', {
        id: comment.id, presentation_id: presId, slide_index: current,
        text: comment.text, x: comment.x, y: comment.y,
        resolved: false, timestamp: comment.timestamp,
        author_id: authorId, author_name: authorName,
      }).catch(e => console.error('[comment] insert failed:', e));
    }
    setPendingPos(null);
    setNewCommentText('');
    setActiveCommentId(comment.id);
    setShowPanel(true);
  }, [newCommentText, pendingPos, presId, current, comments, authorName, authorId, accessToken]);

  const deleteComment = useCallback((commentId: string) => {
    const slideIdx = allSlideComments.find(c => c.id === commentId)?.slideIndex ?? current;
    setAllSlideComments(prev => prev.filter(c => c.id !== commentId));
    const newSlideList = allSlideComments.filter(c => c.slideIndex === slideIdx && c.id !== commentId);
    saveAllComments({ ...loadAllComments(), [`${presId}_${slideIdx}`]: newSlideList });
    if (isSupabaseConfigured && accessToken) {
      commentRest(`slide_comments?id=eq.${commentId}`, accessToken, 'DELETE')
        .catch(e => console.error('[comment] delete failed:', e));
    }
    setActiveCommentId(null);
    if (editingId === commentId) setEditingId(null);
  }, [presId, current, allSlideComments, editingId, accessToken]);

  const resolveComment = useCallback((commentId: string) => {
    const resolved = !(allSlideComments.find(c => c.id === commentId)?.resolved ?? true);
    const slideIdx = allSlideComments.find(c => c.id === commentId)?.slideIndex ?? current;
    setAllSlideComments(prev => prev.map(c => c.id === commentId ? { ...c, resolved } : c));
    const newSlideList = allSlideComments.filter(c => c.slideIndex === slideIdx).map(c => c.id === commentId ? { ...c, resolved } : c);
    saveAllComments({ ...loadAllComments(), [`${presId}_${slideIdx}`]: newSlideList });
    if (isSupabaseConfigured && accessToken) {
      commentRest(`slide_comments?id=eq.${commentId}`, accessToken, 'PATCH', { resolved })
        .catch(e => console.error('[comment] resolve failed:', e));
    }
  }, [presId, current, allSlideComments, accessToken]);

  const saveEdit = useCallback(() => {
    if (!editingId || !editText.trim()) return;
    const slideIdx = allSlideComments.find(c => c.id === editingId)?.slideIndex ?? current;
    setAllSlideComments(prev => prev.map(c => c.id === editingId ? { ...c, text: editText.trim() } : c));
    const newSlideList = allSlideComments.filter(c => c.slideIndex === slideIdx).map(c => c.id === editingId ? { ...c, text: editText.trim() } : c);
    saveAllComments({ ...loadAllComments(), [`${presId}_${slideIdx}`]: newSlideList });
    if (isSupabaseConfigured && accessToken) {
      commentRest(`slide_comments?id=eq.${editingId}`, accessToken, 'PATCH', { text: editText.trim() })
        .catch(e => console.error('[comment] edit failed:', e));
    }
    setEditingId(null);
    setEditText('');
  }, [editingId, editText, presId, current, allSlideComments, accessToken]);

  const addReply = useCallback(() => {
    if (!replyingToId || !replyText.trim()) return;
    const reply: CommentReply = {
      id: `r-${Date.now()}`,
      text: replyText.trim(),
      timestamp: formatTs(),
      authorName,
    };
    const slideIdx = allSlideComments.find(c => c.id === replyingToId)?.slideIndex ?? current;
    setAllSlideComments(prev => prev.map(c => c.id === replyingToId ? { ...c, replies: [...c.replies, reply] } : c));
    const newSlideList = allSlideComments.filter(c => c.slideIndex === slideIdx).map(c => c.id === replyingToId ? { ...c, replies: [...c.replies, reply] } : c);
    saveAllComments({ ...loadAllComments(), [`${presId}_${slideIdx}`]: newSlideList });
    if (isSupabaseConfigured && accessToken) {
      commentRest(`slide_comment_replies`, accessToken, 'POST', {
        id: reply.id, comment_id: replyingToId,
        text: reply.text, timestamp: reply.timestamp,
        author_id: authorId, author_name: authorName,
      }).catch(e => console.error('[comment] reply insert failed:', e));
    }
    setReplyingToId(null);
    setReplyText('');
  }, [replyingToId, replyText, presId, current, allSlideComments, authorName, authorId, accessToken]);

  const deleteReply = useCallback((commentId: string, replyId: string) => {
    const slideIdx = allSlideComments.find(c => c.id === commentId)?.slideIndex ?? current;
    setAllSlideComments(prev => prev.map(c => c.id === commentId ? { ...c, replies: c.replies.filter(r => r.id !== replyId) } : c));
    const newSlideList = allSlideComments.filter(c => c.slideIndex === slideIdx).map(c => c.id === commentId ? { ...c, replies: c.replies.filter(r => r.id !== replyId) } : c);
    saveAllComments({ ...loadAllComments(), [`${presId}_${slideIdx}`]: newSlideList });
    if (isSupabaseConfigured && accessToken) {
      commentRest(`slide_comment_replies?id=eq.${replyId}`, accessToken, 'DELETE')
        .catch(e => console.error('[comment] reply delete failed:', e));
    }
  }, [presId, current, allSlideComments, accessToken]);

  const showLaser = isLaser && isOverSlide;
  const S = slideScale ?? 0;
  const counterScale = S > 0 ? 1 / S : 1;
  const openCount = allSlideComments.filter(c => !c.resolved).length;
  const totalCount = allSlideComments.length;
  const filteredAll = allSlideComments.filter(c =>
    panelFilter === 'open' ? !c.resolved : panelFilter === 'resolved' ? c.resolved : true
  );
  const slideGroups = [...new Set(filteredAll.map(c => c.slideIndex))].sort((a, b) => a - b)
    .map(idx => ({ idx, items: filteredAll.filter(c => c.slideIndex === idx) }));

  // ── Comment overlay ───────────────────────────────────────────────────
  const commentOverlay = (
    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '1280px', height: '720px', transform: `translate(-50%, -50%) scale(${S})`, pointerEvents: 'none', visibility: slideScale === null ? 'hidden' : 'visible', zIndex: 2 }}>
      {comments.filter(c => !c.resolved).map((c, idx) => (
        <div key={c.id} style={{ position: 'absolute', left: `${c.x}%`, top: `${c.y}%`, transform: `translate(-50%, -50%) scale(${counterScale})`, transformOrigin: 'center center', pointerEvents: 'auto', zIndex: 3 }}>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveCommentId(c.id === activeCommentId ? null : c.id); setPendingPos(null); setShowPanel(true); }}
            style={{ width: 28, height: 28, borderRadius: c.resolved ? '50%' : '50% 50% 0 50%', background: c.resolved ? '#10b981' : (activeCommentId === c.id ? '#6D28D9' : '#8B5CF6'), color: 'white', border: '2.5px solid white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.35)', cursor: 'pointer', transition: 'all 0.15s' }}
          >
            {c.resolved ? '✓' : idx + 1}
          </button>
          {activeCommentId === c.id && (
            <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: 12, padding: '10px 12px', boxShadow: '0 6px 24px rgba(0,0,0,0.2)', minWidth: 200, maxWidth: 280, pointerEvents: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>{c.authorName}</span>
                  <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 6 }}>{c.timestamp}</span>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  <button onClick={() => resolveComment(c.id)} title={c.resolved ? '未解決に戻す' : '解決済みにする'} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 6, color: c.resolved ? '#10b981' : '#94a3b8' }}><Check size={13} /></button>
                  <button onClick={() => deleteComment(c.id)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 6 }}><Trash2 size={13} color="#f87171" /></button>
                </div>
              </div>
              {c.resolved && <div style={{ fontSize: 10, color: '#10b981', fontWeight: 600, marginBottom: 4 }}>✓ 解決済み</div>}
              <p style={{ fontSize: 13, color: c.resolved ? '#94a3b8' : '#1e293b', whiteSpace: 'pre-wrap', lineHeight: 1.5, margin: 0 }}>{c.text}</p>
              {c.replies.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #f1f5f9' }}>
                  {c.replies.map(r => (
                    <div key={r.id} style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                      <CornerDownRight size={11} color="#94a3b8" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <span style={{ fontSize: 10, fontWeight: 600, color: '#475569' }}>{r.authorName}</span>
                        <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 4 }}>{r.timestamp}</span>
                        <p style={{ fontSize: 12, color: '#334155', margin: '2px 0 0', lineHeight: 1.4 }}>{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {pendingPos && (
        <div style={{ position: 'absolute', left: `${pendingPos.x}%`, top: `${pendingPos.y}%`, transform: `translate(6px, 6px) scale(${counterScale})`, transformOrigin: 'top left', pointerEvents: 'auto', zIndex: 10 }} onClick={e => e.stopPropagation()}>
          <div style={{ width: 14, height: 14, borderRadius: '50% 50% 0 50%', background: '#8B5CF6', border: '2px solid white', position: 'absolute', top: -22, left: -12, boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
          <div style={{ background: 'white', borderRadius: 12, padding: '10px 12px', boxShadow: '0 6px 24px rgba(0,0,0,0.2)', width: 240 }}>
            <div style={{ fontSize: 11, color: '#8B5CF6', fontWeight: 600, marginBottom: 6 }}>{authorName}</div>
            <textarea autoFocus value={newCommentText} onChange={e => setNewCommentText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addComment(); } if (e.key === 'Escape') { e.stopPropagation(); setPendingPos(null); setNewCommentText(''); } }}
              placeholder="コメントを入力... (Enter で送信)"
              style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', fontSize: 13, color: '#1e293b', lineHeight: 1.5, minHeight: 64, fontFamily: 'inherit', background: 'transparent', boxSizing: 'border-box' }}
              rows={3}
            />
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 4 }}>
              <button onClick={() => { setPendingPos(null); setNewCommentText(''); }} style={{ padding: '4px 10px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'none', fontSize: 12, cursor: 'pointer', color: '#64748b' }}>キャンセル</button>
              <button onClick={addComment} disabled={!newCommentText.trim()} style={{ padding: '4px 10px', borderRadius: 8, fontSize: 12, cursor: newCommentText.trim() ? 'pointer' : 'not-allowed', background: '#8B5CF6', color: 'white', border: 'none', opacity: newCommentText.trim() ? 1 : 0.4 }}>送信</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── Comment panel ─────────────────────────────────────────────────────
  const commentPanel = showPanel ? (
    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 300, background: 'rgba(12, 16, 28, 0.97)', borderLeft: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', zIndex: 20, backdropFilter: 'blur(12px)' }}>
      {/* Header */}
      <div style={{ padding: '14px 14px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <MessageSquare size={14} color="rgba(167,139,250,0.9)" />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>コメント</span>
            {totalCount > 0 && <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{openCount > 0 ? `未解決 ${openCount}` : '全て解決済み'}</span>}
          </div>
          <button onClick={() => setShowPanel(false)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', borderRadius: 6, lineHeight: 1, display: 'flex' }}><X size={15} /></button>
        </div>
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {(['all', 'open', 'resolved'] as PanelFilter[]).map(f => {
            const labels: Record<PanelFilter, string> = { all: '全て', open: '未解決', resolved: '解決済み' };
            const active = panelFilter === f;
            return (
              <button key={f} onClick={() => setPanelFilter(f)} style={{ flex: 1, padding: '6px 0', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', color: active ? '#a78bfa' : 'rgba(255,255,255,0.3)', fontWeight: active ? 700 : 400, borderBottom: active ? '2px solid #a78bfa' : '2px solid transparent', transition: 'all 0.15s', marginBottom: -1 }}>
                {labels[f]}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
        {filteredAll.length === 0 ? (
          <div style={{ paddingTop: 36, textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 12, lineHeight: 2 }}>
            {panelFilter === 'resolved' ? '解決済みのコメントはありません' : panelFilter === 'open' ? '未解決のコメントはありません' : 'コメントはありません\nスライドをクリックして追加'}
          </div>
        ) : slideGroups.map((group, groupIdx) => {
          const slideAllComments = allSlideComments.filter(c => c.slideIndex === group.idx);
          return (
            <div key={group.idx}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: groupIdx > 0 ? 14 : 4, marginBottom: 6 }}>
                <button
                  onClick={() => setCurrent(group.idx)}
                  style={{ fontSize: 10, fontWeight: 700, color: group.idx === current ? '#a78bfa' : 'rgba(167,139,250,0.5)', whiteSpace: 'nowrap', letterSpacing: '0.05em', background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}
                >
                  P.{group.idx + 1}
                </button>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
              </div>
              {group.items.map(c => {
                const origIdx = slideAllComments.findIndex(sc => sc.id === c.id);
                const isEditing = editingId === c.id;
                const isActive = activeCommentId === c.id;
                const isReplying = replyingToId === c.id;
                return (
                  <div key={c.id} style={{ borderRadius: 10, marginBottom: 6, background: isActive ? 'rgba(167,139,250,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? 'rgba(167,139,250,0.25)' : 'rgba(255,255,255,0.06)'}`, opacity: c.resolved && !isActive ? 0.5 : 1, overflow: 'hidden' }}>
              {/* Comment header */}
              <div style={{ padding: '9px 10px 0' }} onClick={() => { if (!isEditing) { if (c.slideIndex !== current) setCurrent(c.slideIndex); setActiveCommentId(isActive ? null : c.id); } }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, cursor: isEditing ? 'default' : 'pointer' }}>
                  <div style={{ width: 20, height: 20, flexShrink: 0, borderRadius: c.resolved ? '50%' : '50% 50% 0 50%', background: c.resolved ? '#10b981' : '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white' }}>
                    {c.resolved ? '✓' : origIdx + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{c.authorName}</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginLeft: 5 }}>{c.timestamp}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 1 }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => resolveComment(c.id)} title={c.resolved ? '未解決に戻す' : '解決済みにする'} style={{ width: 24, height: 24, borderRadius: 5, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.resolved ? '#10b981' : 'rgba(255,255,255,0.25)' }}><Check size={12} /></button>
                    {!isEditing && <button onClick={() => { setEditingId(c.id); setEditText(c.text); }} style={{ width: 24, height: 24, borderRadius: 5, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.25)' }}><Pencil size={12} /></button>}
                    <button onClick={() => deleteComment(c.id)} style={{ width: 24, height: 24, borderRadius: 5, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(248,113,113,0.45)' }}><Trash2 size={12} /></button>
                  </div>
                </div>

                {isEditing ? (
                  <div onClick={e => e.stopPropagation()} style={{ paddingBottom: 8 }}>
                    <textarea autoFocus value={editText} onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveEdit(); } if (e.key === 'Escape') { e.stopPropagation(); setEditingId(null); } }}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(167,139,250,0.4)', borderRadius: 6, padding: '6px 8px', fontSize: 12, color: 'white', resize: 'none', outline: 'none', lineHeight: 1.5, fontFamily: 'inherit', boxSizing: 'border-box' }}
                      rows={3}
                    />
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 6 }}>
                      <button onClick={() => setEditingId(null)} style={{ padding: '3px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', background: 'none', fontSize: 11, cursor: 'pointer', color: 'rgba(255,255,255,0.45)' }}>キャンセル</button>
                      <button onClick={saveEdit} disabled={!editText.trim()} style={{ padding: '3px 10px', borderRadius: 6, background: '#8B5CF6', color: 'white', border: 'none', fontSize: 11, cursor: editText.trim() ? 'pointer' : 'not-allowed', opacity: editText.trim() ? 1 : 0.4 }}>保存</button>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: 12, color: c.resolved ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.72)', whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: '0 0 6px', textDecoration: c.resolved ? 'line-through' : 'none', cursor: 'pointer' }}>{c.text}</p>
                )}
              </div>

              {/* Replies */}
              {c.replies.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '6px 10px 4px 28px' }}>
                  {c.replies.map(r => (
                    <div key={r.id} style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'flex-start' }}>
                      <CornerDownRight size={10} color="rgba(255,255,255,0.2)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                          <div>
                            <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{r.authorName}</span>
                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginLeft: 4 }}>{r.timestamp}</span>
                          </div>
                          <button onClick={() => deleteReply(c.id, r.id)} style={{ width: 18, height: 18, borderRadius: 4, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(248,113,113,0.4)' }}><Trash2 size={10} /></button>
                        </div>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply input */}
              {isReplying ? (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '8px 10px' }} onClick={e => e.stopPropagation()}>
                  <div style={{ fontSize: 10, color: '#a78bfa', fontWeight: 600, marginBottom: 4 }}>{authorName} として返信</div>
                  <textarea autoFocus value={replyText} onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addReply(); } if (e.key === 'Escape') { e.stopPropagation(); setReplyingToId(null); setReplyText(''); } }}
                    placeholder="返信を入力... (Enter で送信)"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(167,139,250,0.35)', borderRadius: 6, padding: '6px 8px', fontSize: 12, color: 'white', resize: 'none', outline: 'none', lineHeight: 1.5, fontFamily: 'inherit', boxSizing: 'border-box' }}
                    rows={2}
                  />
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 5 }}>
                    <button onClick={() => { setReplyingToId(null); setReplyText(''); }} style={{ padding: '3px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', background: 'none', fontSize: 11, cursor: 'pointer', color: 'rgba(255,255,255,0.45)' }}>キャンセル</button>
                    <button onClick={addReply} disabled={!replyText.trim()} style={{ padding: '3px 10px', borderRadius: 6, background: '#8B5CF6', color: 'white', border: 'none', fontSize: 11, cursor: replyText.trim() ? 'pointer' : 'not-allowed', opacity: replyText.trim() ? 1 : 0.4 }}>送信</button>
                  </div>
                </div>
              ) : (
                <button onClick={e => { e.stopPropagation(); setReplyingToId(c.id); setReplyText(''); }}
                  style={{ width: '100%', padding: '5px 10px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 11, color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 5, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <CornerDownRight size={11} />返信
                </button>
              )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        {currentUser && (
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 6, paddingLeft: 2 }}>
            ログイン中：<span style={{ color: 'rgba(167,139,250,0.7)' }}>{currentUser.name}</span>
          </div>
        )}
        <button
          onClick={() => { setIsCommentMode(true); if (isLaser) setIsLaser(false); }}
          style={{ width: '100%', padding: '8px', borderRadius: 8, background: isCommentMode ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.1)', border: `1px dashed ${isCommentMode ? 'rgba(139,92,246,0.7)' : 'rgba(139,92,246,0.35)'}`, color: '#a78bfa', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
          {isCommentMode ? 'スライドをクリックして配置' : '＋ コメントを追加'}
        </button>
      </div>
    </div>
  ) : null;

  const slideCursor = showLaser ? 'none' : isCommentMode ? SPEECH_CURSOR : 'default';

  // ── Control bar ───────────────────────────────────────────────────────
  const controlBar = (
    <div className="flex items-center gap-1">
      <span className="text-sm text-white/50 tabular-nums mr-3">{current + 1} / {total}</span>

      {/* ホスト配信中バッジ */}
      {syncMode === 'host' && (
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/90 text-white text-xs font-semibold rounded-full mr-1">
          <Radio className="w-3 h-3 animate-pulse" />
          配信中
        </span>
      )}

      {/* プレゼン追従ボタン（招待ゲスト向け、全画面時のみ表示） */}
      {isGuest && isFullscreen && isSupabaseConfigured && (
        <div className="relative mr-1">
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
                <button onClick={() => setShowFollowPanel(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
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
                    {presentUsers.map(u => (
                      <div key={u.userId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
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
      )}

      {/* 共有URLボタン（管理者のみ） */}
      {!isGuest && (
        <button
          onClick={() => setShowShareDialog(true)}
          title="共有URL"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/10 text-white/60 hover:text-white border border-white/20 text-xs font-semibold"
        >
          <Share2 className="w-3.5 h-3.5" />
          共有
        </button>
      )}
      {/* PDFエクスポートボタン */}
      <button
        onClick={handleExportPdf}
        disabled={!!pdfProgress}
        title="PDFエクスポート"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/10 text-white/60 hover:text-white border border-white/20 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Download className="w-3.5 h-3.5" />
        PDF
      </button>
      <button onClick={() => { setIsLaser(v => !v); if (isCommentMode) setIsCommentMode(false); }} title="レーザーポインター (L)" className={`p-2 rounded-lg transition-colors ${isLaser ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-white/60 hover:text-white'}`}><Crosshair className="w-5 h-5" /></button>
      <button
        onClick={() => { if (isCommentMode) { setIsCommentMode(false); setPendingPos(null); setActiveCommentId(null); } else { setIsCommentMode(true); setShowPanel(true); if (isLaser) setIsLaser(false); } }}
        title={isCommentMode ? 'コメントモードを終了 (C)' : 'コメントを追加 (C)'}
        className={`p-2 rounded-lg transition-colors relative ${isCommentMode ? 'bg-violet-500 text-white' : 'hover:bg-white/10 text-white/60 hover:text-white'}`}
      >
        <MessageSquare className="w-5 h-5" />
        {totalCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-400 rounded-full text-[10px] flex items-center justify-center text-white font-bold">{openCount > 0 ? openCount : '✓'}</span>}
      </button>
      {totalCount > 0 && !isCommentMode && <button onClick={() => setShowPanel(v => !v)} title={showPanel ? 'コメント一覧を閉じる' : 'コメント一覧を開く'} className={`px-2 py-1.5 rounded-lg transition-colors text-xs font-semibold ${showPanel ? 'bg-violet-500/30 text-violet-300' : 'hover:bg-white/10 text-white/40 hover:text-white/70'}`}>一覧</button>}
      <button onClick={toggleFullscreen} title={isFullscreen ? '全画面を終了 (F)' : '全画面表示 (F)'} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
      <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-1"><X className="w-6 h-6" /></button>
    </div>
  );

  const slideEl = presentation.slides[current];

  // ── 共有ダイアログ ────────────────────────────────────────────────────
  const shareDialogEl = showShareDialog && (
    <ShareDialog
      presentationId={presId}
      presentationTitle={titleOverride ?? presentation.meta.title}
      onClose={() => setShowShareDialog(false)}
    />
  );

  // ── PDF プログレスオーバーレイ ────────────────────────────────────────
  const pdfExportOverlay = pdfProgress && (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0,0,0,0.75)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16,
    }}>
      <Download style={{ width: 32, height: 32, color: '#a78bfa', marginBottom: 4 }} />
      <div style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>
        PDFを生成中...
      </div>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
        {pdfProgress.current + 1} / {pdfProgress.total} スライド
      </div>
      <div style={{ width: 240, height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          width: `${((pdfProgress.current + 1) / pdfProgress.total) * 100}%`,
          height: '100%', background: '#8B5CF6', borderRadius: 3,
          transition: 'width 0.2s ease',
        }} />
      </div>
    </div>
  );

  // ── Fullscreen ────────────────────────────────────────────────────────
  if (isFullscreen) {
    return (
      <div ref={viewerRef} className="fixed inset-0 z-50 bg-black flex flex-col">
        {showLaser && <div style={{ position: 'fixed', left: laserPos.x - 8, top: laserPos.y - 8, width: 16, height: 16, borderRadius: '50%', background: 'rgba(255, 30, 30, 0.9)', boxShadow: '0 0 14px 5px rgba(255, 30, 30, 0.45)', pointerEvents: 'none', zIndex: 9999 }} />}
        <div className="flex items-center justify-between px-6 py-3 flex-shrink-0 bg-gradient-to-b from-black/60 to-transparent absolute inset-x-0 top-0 z-10">
          <h2 className="font-semibold text-white/80 text-base truncate max-w-sm">{titleOverride ?? presentation.meta.title}</h2>
          {controlBar}
        </div>
        {isCommentMode && <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 bg-violet-500/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">スライドをクリックしてコメントを配置</div>}
        <div className="flex-1 flex min-h-0 relative">
          <div className="flex-1 flex items-center justify-center min-h-0 relative">
            <button onClick={prev} disabled={current === 0} className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-white"><ChevronLeft className="w-8 h-8" /></button>
            <div ref={slideAreaRef} onMouseMove={handleSlideMouseMove} onMouseEnter={() => setIsOverSlide(true)} onMouseLeave={() => setIsOverSlide(false)} onClick={handleSlideClick} style={{ width: 'min(100%, calc(100vh * 16 / 9))', height: 'min(100%, calc(100vw * 9 / 16))', background: 'white', overflow: 'hidden', cursor: slideCursor, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: '1280px', height: '720px', transform: `translate(-50%, -50%) scale(${S})`, pointerEvents: 'none', visibility: slideScale === null ? 'hidden' : 'visible' }}>{slideEl}</div>
              {commentOverlay}
              {syncMode === 'follower' && syncLaser.active && (
                <div style={{ position: 'absolute', left: `${syncLaser.x * 100}%`, top: `${syncLaser.y * 100}%`, width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,30,30,0.9)', transform: 'translate(-50%,-50%)', boxShadow: '0 0 16px 6px rgba(255,30,30,0.45)', pointerEvents: 'none', zIndex: 100 }} />
              )}
            </div>
            <button onClick={next} disabled={current === total - 1} className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-white"><ChevronRight className="w-8 h-8" /></button>
          </div>
          {commentPanel}
        </div>
        <div className="pb-4 flex items-center justify-center gap-2 flex-shrink-0 absolute bottom-0 inset-x-0">
          {presentation.slides.map((_, i) => <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-200 ${i === current ? 'w-6 h-3 bg-white' : 'w-3 h-3 bg-white/30 hover:bg-white/60'}`} />)}
        </div>
        {shareDialogEl}
        {pdfExportOverlay}
      </div>
    );
  }

  // ── Normal ────────────────────────────────────────────────────────────
  return (
    <div ref={viewerRef} className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      {showLaser && <div style={{ position: 'fixed', left: laserPos.x - 8, top: laserPos.y - 8, width: 16, height: 16, borderRadius: '50%', background: 'rgba(255, 30, 30, 0.9)', boxShadow: '0 0 14px 5px rgba(255, 30, 30, 0.45)', pointerEvents: 'none', zIndex: 9999 }} />}
      <div className="flex items-center justify-between px-8 py-4 text-white flex-shrink-0">
        <div>
          <h2 className="font-semibold text-lg">{titleOverride ?? presentation.meta.title}</h2>
          <p className="text-sm text-white/50">{presentation.meta.author} · {presentation.meta.createdAt}</p>
        </div>
        {controlBar}
      </div>
      {isCommentMode && <div className="flex justify-center mb-2 flex-shrink-0"><span className="bg-violet-500/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">スライドをクリックしてコメントを配置 · Esc でキャンセル</span></div>}
      <div className="flex-1 flex min-h-0 relative">
        <div className="flex-1 flex items-center justify-center px-8 pb-4 gap-6 min-h-0">
          <button onClick={prev} disabled={current === 0} className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-white flex-shrink-0"><ChevronLeft className="w-8 h-8" /></button>
          <div className="flex-1 max-w-5xl min-w-0">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <div className="absolute inset-0 bg-white rounded-xl overflow-hidden shadow-2xl" ref={slideAreaRef} onMouseMove={handleSlideMouseMove} onMouseEnter={() => setIsOverSlide(true)} onMouseLeave={() => setIsOverSlide(false)} onClick={handleSlideClick} style={{ cursor: slideCursor }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '1280px', height: '720px', transform: `translate(-50%, -50%) scale(${S})`, pointerEvents: 'none', visibility: slideScale === null ? 'hidden' : 'visible' }}>{slideEl}</div>
                {commentOverlay}
                {syncMode === 'follower' && syncLaser.active && (
                  <div style={{ position: 'absolute', left: `${syncLaser.x * 100}%`, top: `${syncLaser.y * 100}%`, width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,30,30,0.9)', transform: 'translate(-50%,-50%)', boxShadow: '0 0 16px 6px rgba(255,30,30,0.45)', pointerEvents: 'none', zIndex: 100 }} />
                )}
              </div>
            </div>
          </div>
          <button onClick={next} disabled={current === total - 1} className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-white flex-shrink-0"><ChevronRight className="w-8 h-8" /></button>
        </div>
        {commentPanel}
      </div>
      <div className="pb-6 flex items-center justify-center gap-2 flex-shrink-0">
        {presentation.slides.map((_, i) => <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-200 ${i === current ? 'w-6 h-3 bg-white' : 'w-3 h-3 bg-white/30 hover:bg-white/60'}`} />)}
      </div>
      {shareDialogEl}
      {pdfExportOverlay}
    </div>
  );
}

