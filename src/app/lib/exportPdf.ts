import type { PresentationEntry } from '../../presentations/registry';

export async function exportPdf(
  presentation: PresentationEntry,
  onProgress?: (current: number, total: number) => void,
): Promise<void> {
  const total = presentation.slides.length;
  const [{ jsPDF }, { toJpeg }, { createRoot }] = await Promise.all([
    import('jspdf'),
    import('html-to-image'),
    import('react-dom/client'),
  ]);
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1280, 720], compress: true });

  for (let i = 0; i < total; i++) {
    onProgress?.(i, total);

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
}
