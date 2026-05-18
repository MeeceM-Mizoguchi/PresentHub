import { useState, useEffect, useCallback, useRef, ReactElement } from 'react';
import { X, ChevronLeft, ChevronRight, AlertTriangle, Maximize2, Minimize2, Crosshair, MessageSquare, Send, Trash2 } from 'lucide-react';
import { compileCode } from '../utils/compileCode';

interface SlideComment {
  id: string;
  text: string;
  timestamp: string;
}

const COMMENT_KEY = 'presenthub_slide_comments';

function loadAllComments(): Record<string, SlideComment[]> {
  try { return JSON.parse(localStorage.getItem(COMMENT_KEY) ?? '{}'); } catch { return {}; }
}

function saveAllComments(data: Record<string, SlideComment[]>) {
  localStorage.setItem(COMMENT_KEY, JSON.stringify(data));
}

interface DynamicPresentationViewerProps {
  title: string;
  code: string;
  id?: string;
  onClose: () => void;
}

export function DynamicPresentationViewer({ title, code, id, onClose }: DynamicPresentationViewerProps) {
  const [slides, setSlides] = useState<ReactElement[]>([]);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(true);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLaser, setIsLaser] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<SlideComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsCompiling(true);
    setError(null);
    compileCode(code)
      .then(result => { setSlides(result); setIsCompiling(false); })
      .catch(e => { setError(e.message ?? String(e)); setIsCompiling(false); });
  }, [code]);

  const total = slides.length;
  const prev = useCallback(() => setCurrent(s => Math.max(0, s - 1)), []);
  const next = useCallback(() => setCurrent(s => Math.min(total - 1, s + 1)), [total]);

  // Load comments for current slide
  useEffect(() => {
    if (!id) return;
    setComments(loadAllComments()[`${id}_${current}`] ?? []);
  }, [id, current]);

  // Fullscreen change listener
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const handleClose = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {}).finally(onClose);
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      else if (e.key === 'Escape') handleClose();
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      else if (e.key === 'l' || e.key === 'L') setIsLaser(v => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, handleClose, toggleFullscreen]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setLaserPos({ x: e.clientX, y: e.clientY });
  }, []);

  const addComment = () => {
    if (!id || !newComment.trim()) return;
    const comment: SlideComment = {
      id: `c-${Date.now()}`,
      text: newComment.trim(),
      timestamp: new Date().toLocaleString('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    const all = loadAllComments();
    const key = `${id}_${current}`;
    const updated = { ...all, [key]: [...(all[key] ?? []), comment] };
    saveAllComments(updated);
    setComments(updated[key]);
    setNewComment('');
    commentInputRef.current?.focus();
  };

  const deleteComment = (commentId: string) => {
    if (!id) return;
    const all = loadAllComments();
    const key = `${id}_${current}`;
    const updated = { ...all, [key]: (all[key] ?? []).filter(c => c.id !== commentId) };
    saveAllComments(updated);
    setComments(updated[key]);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex flex-col"
      onMouseMove={handleMouseMove}
      style={{ cursor: isLaser ? 'none' : undefined }}
    >
      {/* Laser dot */}
      {isLaser && (
        <div style={{
          position: 'fixed',
          left: laserPos.x - 8,
          top: laserPos.y - 8,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'rgba(255, 30, 30, 0.9)',
          boxShadow: '0 0 14px 5px rgba(255, 30, 30, 0.45)',
          pointerEvents: 'none',
          zIndex: 9999,
        }} />
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 text-white flex-shrink-0">
        <h2 className="font-semibold text-lg truncate max-w-md">{title}</h2>
        <div className="flex items-center gap-1">
          {!isCompiling && !error && (
            <span className="text-sm text-white/50 tabular-nums mr-3">{current + 1} / {total}</span>
          )}

          {/* Laser pointer toggle */}
          <button
            onClick={() => setIsLaser(v => !v)}
            title="レーザーポインター (L)"
            className={`p-2 rounded-lg transition-colors ${isLaser ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-white/60 hover:text-white'}`}
          >
            <Crosshair className="w-5 h-5" />
          </button>

          {/* Comments toggle */}
          {id && (
            <button
              onClick={() => setShowComments(v => !v)}
              title="コメント"
              className={`p-2 rounded-lg transition-colors relative ${showComments ? 'bg-violet-500 text-white' : 'hover:bg-white/10 text-white/60 hover:text-white'}`}
            >
              <MessageSquare className="w-5 h-5" />
              {comments.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-400 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                  {comments.length}
                </span>
              )}
            </button>
          )}

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? '全画面を終了 (F)' : '全画面表示 (F)'}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-1">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex min-h-0">
        {/* Slide area */}
        <div className="flex-1 flex items-center justify-center px-8 pb-4 gap-6 min-h-0">
          {isCompiling && (
            <div className="text-white/60 text-sm">コンパイル中...</div>
          )}

          {error && (
            <div className="bg-red-950/60 border border-red-500/40 rounded-2xl p-8 max-w-lg text-center">
              <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
              <p className="text-red-300 text-sm whitespace-pre-wrap">{error}</p>
            </div>
          )}

          {!isCompiling && !error && slides.length > 0 && (
            <>
              <button onClick={prev} disabled={current === 0}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-white flex-shrink-0">
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="flex-1 max-w-5xl min-w-0">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <div className="absolute inset-0 bg-white rounded-xl overflow-hidden shadow-2xl">
                    {slides[current]}
                  </div>
                </div>
              </div>

              <button onClick={next} disabled={current === total - 1}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-white flex-shrink-0">
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>

        {/* Comment panel */}
        {showComments && id && (
          <div className="w-80 bg-white flex flex-col flex-shrink-0 shadow-2xl" style={{ cursor: 'auto' }}>
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <h3 className="font-semibold text-gray-800 text-sm">スライド {current + 1} のコメント</h3>
              <button onClick={() => setShowComments(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {comments.length === 0 ? (
                <div className="text-center py-10">
                  <MessageSquare className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">コメントはまだありません</p>
                </div>
              ) : (
                comments.map(c => (
                  <div key={c.id} className="bg-gray-50 rounded-xl p-3 group">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs text-gray-400">{c.timestamp}</span>
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="p-0.5 hover:bg-red-100 rounded transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-100 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={commentInputRef}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addComment(); } }}
                  placeholder="コメントを追加..."
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-violet-400 transition-all"
                />
                <button
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  className="p-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dots */}
      {!isCompiling && !error && slides.length > 0 && (
        <div className="pb-6 flex items-center justify-center gap-2 flex-shrink-0">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-200 ${i === current ? 'w-6 h-3 bg-white' : 'w-3 h-3 bg-white/30 hover:bg-white/60'}`} />
          ))}
        </div>
      )}
    </div>
  );
}
