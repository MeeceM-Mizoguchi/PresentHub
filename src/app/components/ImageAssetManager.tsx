import { useState, useRef, useEffect } from 'react';
import { Upload, Copy, Check, Trash2, Crop, ImageIcon, Loader2 } from 'lucide-react';
import { uploadAsset, deleteAsset, isSupabaseConfigured } from '../../lib/supabase';
import { CropModal } from './CropModal';

const LS_KEY = 'presenthub_slide_images';

export interface SlideImage {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

function loadImages(): SlideImage[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]'); } catch { return []; }
}

function fileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
function saveImages(imgs: SlideImage[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(imgs));
}

export function ImageAssetManager() {
  const [images, setImages] = useState<SlideImage[]>(loadImages);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<SlideImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Re-sync from localStorage when component mounts (another tab may have added)
  useEffect(() => { setImages(loadImages()); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setUploading(true);
    try {
      let url: string;
      if (isSupabaseConfigured) {
        const uploaded = await uploadAsset(file);
        // Fall back to data URL if bucket doesn't exist or upload fails
        url = uploaded ?? await fileToDataUrl(file);
      } else {
        url = await fileToDataUrl(file);
      }
      const entry: SlideImage = {
        id: `img-${Date.now()}`,
        name: file.name,
        url,
        createdAt: new Date().toISOString(),
      };
      const next = [entry, ...loadImages()];
      saveImages(next);
      setImages(next);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = async (img: SlideImage) => {
    await navigator.clipboard.writeText(img.url);
    setCopiedId(img.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (img: SlideImage) => {
    if (isSupabaseConfigured && img.url.startsWith('http')) {
      await deleteAsset(img.url);
    }
    const next = loadImages().filter(i => i.id !== img.id);
    saveImages(next);
    setImages(next);
  };

  const handleCropSave = async (blob: Blob) => {
    if (!cropTarget) return;
    setCropTarget(null);
    setUploading(true);
    try {
      const file = new File([blob], `cropped-${cropTarget.name}`, { type: 'image/jpeg' });
      let url: string;
      if (isSupabaseConfigured) {
        const uploaded = await uploadAsset(file);
        url = uploaded ?? await fileToDataUrl(blob);
      } else {
        url = await fileToDataUrl(blob);
      }
      const entry: SlideImage = {
        id: `img-${Date.now()}`,
        name: file.name,
        url,
        createdAt: new Date().toISOString(),
      };
      const next = [entry, ...loadImages()];
      saveImages(next);
      setImages(next);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="px-6 pt-3 pb-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-semibold text-gray-700">スライド用画像</span>
          </div>
          <div className="flex items-center gap-2">
            {!isSupabaseConfigured && (
              <span className="text-xs text-amber-500">※ Supabase未設定 — このブラウザのみ有効</span>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500 text-white text-xs font-medium rounded-lg hover:bg-violet-600 disabled:opacity-50 transition-all"
            >
              {uploading
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <Upload className="w-3.5 h-3.5" />}
              {uploading ? 'アップロード中…' : '画像を追加'}
            </button>
          </div>
        </div>

        {images.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl py-6 flex flex-col items-center gap-2 text-gray-400 cursor-pointer hover:border-violet-300 hover:text-violet-400 transition-all"
          >
            <Upload className="w-6 h-6" />
            <p className="text-xs">クリックして画像を追加</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-1">
            {images.map(img => (
              <div key={img.id} className="group relative rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                {/* Preview */}
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                {/* Name */}
                <div className="px-2 py-1.5">
                  <p className="text-xs text-gray-600 truncate" title={img.name}>{img.name}</p>
                </div>
                {/* Action buttons — visible on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 rounded-xl">
                  <button
                    onClick={() => handleCopy(img)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-all w-28 justify-center"
                  >
                    {copiedId === img.id
                      ? <><Check className="w-3 h-3 text-green-500" />コピー済み</>
                      : <><Copy className="w-3 h-3" />URLをコピー</>
                    }
                  </button>
                  <button
                    onClick={() => setCropTarget(img)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-violet-500 text-white rounded-lg text-xs font-medium hover:bg-violet-600 transition-all w-28 justify-center"
                  >
                    <Crop className="w-3 h-3" />
                    トリミング
                  </button>
                  <button
                    onClick={() => handleDelete(img)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-all w-28 justify-center"
                  >
                    <Trash2 className="w-3 h-3" />
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-400 mt-2">
          画像にカーソルを合わせて「URLをコピー」→ コード内の <code className="bg-gray-100 px-1 rounded">src="..."</code> に貼り付けてください
        </p>
      </div>

      {cropTarget && (
        <CropModal
          imageSrc={cropTarget.url}
          onClose={() => setCropTarget(null)}
          onSave={handleCropSave}
        />
      )}
    </>
  );
}
