import { useState, useEffect, useRef, ReactElement } from 'react';
import { MotionConfig } from 'motion/react';
import { compileCode } from '../utils/compileCode';

interface SlidePreviewThumbnailProps {
  code: string;
  className?: string;
}

export function SlidePreviewThumbnail({ code, className }: SlidePreviewThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstSlide, setFirstSlide] = useState<ReactElement | null>(null);
  const [scale, setScale] = useState(0.23);

  useEffect(() => {
    let cancelled = false;
    compileCode(code)
      .then(slides => { if (!cancelled && slides.length > 0) setFirstSlide(slides[0]); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [code]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 1280);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: '#f8fafc' }}
    >
      {firstSlide ? (
        <MotionConfig reducedMotion="always">
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1280px',
            height: '720px',
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            pointerEvents: 'none',
          }}>
            {firstSlide}
          </div>
        </MotionConfig>
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)',
        }} />
      )}
    </div>
  );
}
