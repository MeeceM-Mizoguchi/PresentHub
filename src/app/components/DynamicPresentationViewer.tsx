import { useState, useEffect, useCallback, ReactElement } from 'react';
import React from 'react';
import { X, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface DynamicPresentationViewerProps {
  title: string;
  code: string;
  onClose: () => void;
}

async function compileCode(code: string): Promise<ReactElement[]> {
  const { transform } = await import('@babel/standalone');

  // Strip import statements
  const cleaned = code
    .replace(/^import\s+type\s+.+$/gm, '')
    .replace(/^import\s+.+$/gm, '')
    .trim();

  // Step 1: strip TypeScript types + compile JSX → plain JS
  // (no module transform plugin needed)
  let intermediate: string;
  try {
    intermediate = transform(cleaned, {
      filename: 'presentation.tsx',
      presets: [
        ['typescript', { allExtensions: true, isTSX: true }],
        ['react', { runtime: 'classic' }],
      ],
    }).code ?? '';
  } catch (e) {
    throw new Error(`コンパイルエラー: ${(e as Error).message}`);
  }

  // Step 2: replace export declarations with __capture.xxx = ...
  // (Babel has already stripped type annotations, so regex is safe)
  const capturable = intermediate
    .replace(/export\s+const\s+(\w+)\s*=/g, '__capture.$1 =')
    .replace(/export\s+default\s+/g, '__capture.__default = ')
    .replace(/export\s+\{[^}]*\}/g, '')
    .replace(/export\s+function\s+(\w+)/g, 'function $1')
    .replace(/export\s+class\s+(\w+)/g, 'class $1');

  const capture: Record<string, unknown> = {};
  const capturedSlides: ReactElement[] = [];

  const scope: Record<string, unknown> = {
    React,
    motion,
    useState: React.useState,
    useEffect: React.useEffect,
    useRef: React.useRef,
    useCallback: React.useCallback,
    render: (slides: ReactElement[]) => capturedSlides.push(...slides),
    __capture: capture,
  };

  try {
    // eslint-disable-next-line no-new-func
    new Function(...Object.keys(scope), capturable)(...Object.values(scope));
  } catch (e) {
    throw new Error(`実行エラー: ${(e as Error).message}`);
  }

  // Format 1: render([...]) was called
  if (capturedSlides.length > 0) return capturedSlides;

  // Format 2: export const xxx = { slides: [...], meta: {...} }
  for (const value of Object.values(capture)) {
    if (
      value &&
      typeof value === 'object' &&
      'slides' in (value as object) &&
      Array.isArray((value as { slides: unknown }).slides)
    ) {
      return (value as { slides: ReactElement[] }).slides;
    }
  }

  throw new Error(
    'スライドが見つかりません。\nexport const xxx = { slides: [...] } か render([...]) で終わるコードを貼り付けてください。'
  );
}

export function DynamicPresentationViewer({ title, code, onClose }: DynamicPresentationViewerProps) {
  const [slides, setSlides] = useState<ReactElement[]>([]);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(true);

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
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="flex items-center gap-4">
          {!isCompiling && !error && (
            <span className="text-sm text-white/50 tabular-nums">{current + 1} / {total}</span>
          )}
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Body */}
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
