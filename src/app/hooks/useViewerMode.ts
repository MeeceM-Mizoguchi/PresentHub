import { useState, useEffect, useCallback, useRef, RefObject, CSSProperties } from 'react';

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

  return {
    fullscreenActive,
    isPseudoFullscreen: pseudoFs,
    toggleFullscreen,
    exitFullscreen: exit,
  };
}

/**
 * 擬似全画面（iOS 等）のとき、ビューアー枠を「実際に見えている領域」に
 * ピッタリ合わせるための inline style を返す。
 *
 * iOS では `position: fixed; inset: 0` がアドレスバーの裏側まで含む
 * レイアウトビューポートを指すため、下端が見切れてしまう。
 * VisualViewport API で可視領域の幅・高さ・オフセットを測り、それに合わせる。
 * `active` が false のときは undefined を返し、通常の inset-0 をそのまま使う。
 */
export function useVisualViewportStyle(active: boolean): CSSProperties | undefined {
  const [vp, setVp] = useState<{ w: number; h: number; top: number; left: number } | null>(null);

  useEffect(() => {
    if (!active) { setVp(null); return; }
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setVp({ w: vv.width, h: vv.height, top: vv.offsetTop, left: vv.offsetLeft });
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    window.addEventListener('orientationchange', update);
    // 擬似全画面中は背面ページのスクロール（アドレスバー再出現の要因）を止める
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
      window.removeEventListener('orientationchange', update);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  if (!active || !vp) return undefined;
  return {
    top: 0,
    left: 0,
    right: 'auto',
    bottom: 'auto',
    width: vp.w,
    height: vp.h,
    transform: `translate(${vp.left}px, ${vp.top}px)`,
  };
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
