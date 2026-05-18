import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, Check } from 'lucide-react';

interface CropModalProps {
  imageSrc: string;
  onClose: () => void;
  onSave: (blob: Blob) => void;
}

async function getCroppedBlob(imageSrc: string, croppedAreaPixels: Area): Promise<Blob> {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
    image.src = imageSrc;
  });
  const canvas = document.createElement('canvas');
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(
    image,
    croppedAreaPixels.x, croppedAreaPixels.y,
    croppedAreaPixels.width, croppedAreaPixels.height,
    0, 0,
    croppedAreaPixels.width, croppedAreaPixels.height,
  );
  return new Promise(resolve => canvas.toBlob(blob => resolve(blob!), 'image/jpeg', 0.92));
}

export function CropModal({ imageSrc, onClose, onSave }: CropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [saving, setSaving] = useState(false);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    setSaving(true);
    try {
      const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);
      onSave(blob);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden" style={{ height: '580px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-bold text-gray-800">画像をトリミング</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cropper area */}
        <div className="relative flex-1 bg-gray-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={undefined}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={true}
            style={{
              containerStyle: { borderRadius: 0 },
            }}
          />
        </div>

        {/* Zoom controls */}
        <div className="px-5 py-3 border-t border-gray-100 flex-shrink-0 flex items-center gap-3">
          <button
            onClick={() => setZoom(z => Math.max(1, z - 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-gray-500" />
          </button>
          <input
            type="range"
            min={1}
            max={5}
            step={0.05}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            className="flex-1 accent-violet-500"
          />
          <button
            onClick={() => setZoom(z => Math.min(5, z + 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-gray-500" />
          </button>
          <span className="text-xs text-gray-400 w-10 text-right">{zoom.toFixed(1)}x</span>

          <div className="flex-1" />

          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all text-sm">
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 transition-all text-sm font-medium"
          >
            <Check className="w-4 h-4" />
            {saving ? '処理中…' : 'この範囲で保存'}
          </button>
        </div>
      </div>
    </div>
  );
}
