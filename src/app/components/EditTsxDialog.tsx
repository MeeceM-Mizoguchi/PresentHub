import { useState, useEffect, useRef } from 'react';
import { X, Code2, Eye, Save, Loader2, Image, Check, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../lib/toast';
import { FileItem } from '../types';
import { DynamicPresentationViewer } from './DynamicPresentationViewer';
import { uploadAsset, isSupabaseConfigured } from '../../lib/supabase';
import { ImageAssetManager } from './ImageAssetManager';

interface EditTsxDialogProps {
  file: FileItem;
  onClose: () => void;
}

const DEFAULT_GRADIENTS = [
  'linear-gradient(135deg, #9D72FF 0%, #FF5BAE 100%)',
  'linear-gradient(135deg, #0ABDE3 0%, #1D6FE8 100%)',
  'linear-gradient(135deg, #F72585 0%, #7B5FF5 100%)',
  'linear-gradient(135deg, #1D6FE8 0%, #0ABDE3 50%, #7B5FF5 100%)',
  'linear-gradient(135deg, #F5A623 0%, #F72585 100%)',
  'linear-gradient(135deg, #0D1B3E 0%, #7B5FF5 100%)',
];

export function EditTsxDialog({ file, onClose }: EditTsxDialogProps) {
  const { dynamicCodeMap, updateDynamicCode, updateDynamicMeta } = useApp();

  const isDynamic = !!file.isDynamic;

  // code state
  const [code, setCode] = useState('');
  const [originalCode, setOriginalCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // meta state (dynamic only)
  const [title, setTitle] = useState(file.name);
  const [thumbnail, setThumbnail] = useState(file.thumbnail ?? DEFAULT_GRADIENTS[0]);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCodeDirty = code !== originalCode;
  const isMetaDirty = isDynamic && (title !== file.name || thumbnail !== (file.thumbnail ?? DEFAULT_GRADIENTS[0]));
  const isDirty = isCodeDirty || isMetaDirty;

  useEffect(() => {
    if (isDynamic) {
      const c = dynamicCodeMap[file.id] ?? '';
      setCode(c);
      setOriginalCode(c);
      setLoading(false);
    } else {
      fetch(`/api/presentation-source?id=${encodeURIComponent(file.id)}`)
        .then(r => {
          if (!r.ok) throw new Error(`${r.status}`);
          return r.text();
        })
        .then(text => {
          setCode(text);
          setOriginalCode(text);
        })
        .catch(() => setCode('// ソースファイルが見つかりません'))
        .finally(() => setLoading(false));
    }
  }, [file.id, isDynamic]);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const localUrl = URL.createObjectURL(f);
    setThumbnail(localUrl);
    if (isSupabaseConfigured) {
      setUploading(true);
      const url = await uploadAsset(f);
      setUploading(false);
      if (url) {
        URL.revokeObjectURL(localUrl);
        setThumbnail(url);
      }
    }
    e.target.value = '';
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(thumbnail);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isDynamic) {
        if (isCodeDirty) {
          updateDynamicCode(file.id, code);
          setOriginalCode(code);
        }
        if (isMetaDirty) {
          updateDynamicMeta(file.id, { title: title.trim() || file.name, thumbnail });
        }
        toast.success('保存しました');
      } else {
        const res = await fetch('/api/presentation-source', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: file.id, content: code }),
        });
        if (res.ok) {
          toast.success('保存しました（HMRで自動反映されます）');
          setOriginalCode(code);
        } else {
          toast.error('保存に失敗しました');
        }
      }
    } finally {
      setSaving(false);
    }
  };

  if (showPreview && isDynamic) {
    return (
      <DynamicPresentationViewer
        title={title || file.name}
        code={code}
        onClose={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-violet-500" />
            <h3 className="font-bold text-gray-800">スライドを編集</h3>
            {!isDynamic && (
              <span className="text-sm text-gray-400 font-normal truncate max-w-xs">{file.name}</span>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Dynamic-only: Title + Thumbnail */}
        {isDynamic && (
          <>
            {/* Title */}
            <div className="px-6 pt-4 flex-shrink-0">
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="プレゼンテーションのタイトル"
                className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all text-gray-800"
              />
            </div>

            {/* Thumbnail */}
            <div className="px-6 pt-3 pb-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Image className="w-4 h-4 text-violet-500" />
                <span className="text-sm font-semibold text-gray-700">サムネイル</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Preview */}
                <div
                  className="w-20 h-12 rounded-lg flex-shrink-0 border border-gray-200 overflow-hidden relative"
                  style={thumbnail.startsWith('http') || thumbnail.startsWith('blob')
                    ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : { background: thumbnail }}
                >
                  {uploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    </div>
                  )}
                </div>

                {/* Gradient presets */}
                <div className="flex gap-1.5">
                  {DEFAULT_GRADIENTS.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setThumbnail(g)}
                      className={`w-8 h-8 rounded-md border-2 transition-all ${thumbnail === g ? 'border-violet-500 scale-110' : 'border-transparent hover:border-gray-300'}`}
                      style={{ background: g }}
                    />
                  ))}
                </div>

                {/* Upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all"
                >
                  <Image className="w-3.5 h-3.5" />
                  画像をアップロード
                </button>

                {/* Copy URL */}
                {thumbnail.startsWith('http') && (
                  <button
                    onClick={handleCopyUrl}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedUrl ? 'コピーしました' : '画像URLをコピー'}
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Image Asset Manager */}
        <ImageAssetManager />

        {/* Code area */}
        <div className="flex-1 px-6 py-4 min-h-0 flex flex-col">
          <p className="text-xs text-gray-400 mb-2">TSXコード</p>
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
            </div>
          ) : (
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="flex-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-violet-400 transition-all font-mono text-sm text-gray-800 resize-none"
              spellCheck={false}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0 items-center">
          {isDynamic && (
            <button
              onClick={() => setShowPreview(true)}
              disabled={!code.trim() || loading}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-violet-300 text-violet-600 rounded-xl hover:bg-violet-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              プレビュー
            </button>
          )}
          {isDirty && (
            <span className="text-xs text-amber-500 font-medium">未保存の変更があります</span>
          )}
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all text-sm"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty || saving || loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
