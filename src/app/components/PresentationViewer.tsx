import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PresentationEntry } from '../../presentations/registry';

interface PresentationViewerProps {
  presentation: PresentationEntry;
  onClose: () => void;
}

export function PresentationViewer({ presentation, onClose }: PresentationViewerProps) {
  const [current, setCurrent] = useState(0);
  const total = presentation.slides.length;

  const prev = useCallback(() => setCurrent(s => Math.max(0, s - 1)), []);
  const next = useCallback(() => setCurrent(s => Math.min(total - 1, s + 1)), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 text-white flex-shrink-0">
        <div>
          <h2 className="font-semibold text-lg">{presentation.meta.title}</h2>
          <p className="text-sm text-white/50">{presentation.meta.author} · {presentation.meta.createdAt}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/50 tabular-nums">{current + 1} / {total}</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="閉じる"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center px-8 pb-4 gap-6 min-h-0">
        <button
          onClick={prev}
          disabled={current === 0}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-white flex-shrink-0"
          aria-label="前のスライド"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* 16:9 slide container */}
        <div className="flex-1 max-w-5xl min-w-0">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0 bg-white rounded-xl overflow-hidden shadow-2xl">
              {presentation.slides[current]}
            </div>
          </div>
        </div>

        <button
          onClick={next}
          disabled={current === total - 1}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-white flex-shrink-0"
          aria-label="次のスライド"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Dot navigation */}
      <div className="pb-6 flex items-center justify-center gap-2 flex-shrink-0">
        {presentation.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-200 ${
              i === current ? 'w-6 h-3 bg-white' : 'w-3 h-3 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`スライド ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
