import { useState, useEffect, useCallback, useRef, RefObject } from 'react';

/**
 * モバイル（特に iOS Safari）では Element.requestFullscreen() が使えないため、
 * ネイティブ全画面が使えない端末では CSS ベースの擬似全画面にフォールバックする。
 * どちらの場合も `fullscreenActive` が true になり、ビューアーは全画面レイアウトを描画する。
 */
export function useViewerFullscreen(viewerRef: RefObject<HTMLElement | null>) {
  const [nativeFs, setNativeFs] = useState(false);
  const [pseudoFs, setPseudoFs] = useState(false);

  useEffect(() => {
    const handler = () => setNativeFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const fullscreenActive = nativeFs || pseudoFs;

  const enter = useCallback(() => {
    const el = viewerRef.current as (HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    }) | null;
    const req = el?.requestFullscreen ?? el?.webkitRequestFullscreen;
    if (el && req) {
      Promise.resolve(req.call(el))
        .then(() => {
          // Android 等では横向きロックを試みる（失敗しても無視）
          const orientation = screen.orientation as ScreenOrientation & {
            lock?: (o: string) => Promise<void>;
          };
          orientation?.lock?.('landscape').catch(() => {});
        })
        .catch(() => setPseudoFs(true));
    } else {
      // Fullscreen API 非対応（iPhone Safari 等）→ 擬似全画面
      setPseudoFs(true);
    }
  }, [viewerRef]);

  const exit = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    const orientation = screen.orientation as ScreenOrientation & {
      unlock?: () => void;
    };
    orientation?.unlock?.();
    setPseudoFs(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (fullscreenActive) exit();
    else enter();
  }, [fullscreenActive, enter, exit]);

  return { fullscreenActive, toggleFullscreen, exitFullscreen: exit };
}

/**
 * スライド領域へ付与するタッチスワイプ用ハンドラ。
 * 横方向に一定以上スワイプしたら prev / next を呼び、直後の click を抑制する。
 * `suppressClickRef.current` が true の間はビューアー側の onClick ナビを無視する。
 */
export function useSwipeNav(onPrev: () => void, onNext: () => void) {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    startRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const start = startRef.current;
    startRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClickRef.current = true;
      // タップではないので click より先にフラグを立て、少し後に解除
      setTimeout(() => { suppressClickRef.current = false; }, 350);
      if (dx < 0) onNext();
      else onPrev();
    }
  }, [onPrev, onNext]);

  return { swipeHandlers: { onTouchStart, onTouchEnd }, suppressClickRef };
}

/** 端末の向き（縦持ち = portrait）を返す。 */
export function useIsPortrait(): boolean {
  const [portrait, setPortrait] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(orientation: portrait)').matches
      : false
  );
  useEffect(() => {
    const mql = window.matchMedia('(orientation: portrait)');
    const onChange = () => setPortrait(mql.matches);
    mql.addEventListener('change', onChange);
    onChange();
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return portrait;
}

/** タッチ主体の端末かどうか（粗いポインタ）。 */
export function useIsCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : false
  );
  useEffect(() => {
    const mql = window.matchMedia('(pointer: coarse)');
    const onChange = () => setCoarse(mql.matches);
    mql.addEventListener('change', onChange);
    onChange();
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return coarse;
}
