import { useState, useRef } from 'react';
import { X, Code2, Eye, Save, Wand2, Copy, Check, Image, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../lib/toast';
import { DynamicPresentationViewer } from './DynamicPresentationViewer';
import { uploadAsset, isSupabaseConfigured } from '../../lib/supabase';

interface AddSlideDialogProps {
  onClose: () => void;
  initialParentId?: string | null;
}

const PLACEHOLDER = `// ================================
// import文は不要です（自動で利用可能）
// 利用可能: React, motion, useState, useEffect
// ================================

function TitleSlide() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: '#0D1B3E' }}>タイトル</h1>
    </div>
  );
}

function ContentSlide() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#F8FAFC',
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '1.5rem', color: '#64748b' }}>コンテンツ</p>
    </div>
  );
}

// 最後の行: slides配列を render() に渡す
render([
  <TitleSlide key="1" />,
  <ContentSlide key="2" />,
]);`;

function buildPrompt(content: string): string {
  return `以下の仕様でReact TSXコードを生成してください。

【フォーマット規則】
- import文は不要（React、motion、useState、useEffectは自動的に利用可能）
- スライドを関数コンポーネントで定義する（例: function TitleSlide() { ... }）
- 最後の行で render([<Slide1 key="1" />, <Slide2 key="2" />, ...]) を呼び出す
- 各スライドのルート要素に style={{ width: '100%', height: '100%' }} を設定
- スタイリングはTailwind CSSまたはインラインスタイルを使用
- コードブロック（\`\`\`tsx など）は含めず、コードのみを出力する

【作成する資料の内容】
${content}`;
}

const DEFAULT_GRADIENTS = [
  'linear-gradient(135deg, #9D72FF 0%, #FF5BAE 100%)',
  'linear-gradient(135deg, #0ABDE3 0%, #1D6FE8 100%)',
  'linear-gradient(135deg, #F72585 0%, #7B5FF5 100%)',
  'linear-gradient(135deg, #1D6FE8 0%, #0ABDE3 50%, #7B5FF5 100%)',
  'linear-gradient(135deg, #F5A623 0%, #F72585 100%)',
  'linear-gradient(135deg, #0D1B3E 0%, #7B5FF5 100%)',
];

export function AddSlideDialog({ onClose, initialParentId }: AddSlideDialogProps) {
  const { addDynamicPresentation } = useApp();
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [contentDescription, setContentDescription] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [thumbnail, setThumbnail] = useState(DEFAULT_GRADIENTS[0]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    const localUrl = URL.createObjectURL(file);
    setThumbnail(localUrl);

    if (isSupabaseConfigured) {
      setUploading(true);
      const url = await uploadAsset(file);
      setUploading(false);
      if (url) {
        URL.revokeObjectURL(localUrl);
        setThumbnail(url);
      }
    }
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  const handleSave = () => {
    if (!title.trim() || !code.trim()) return;
    addDynamicPresentation({
      title: title.trim(),
      thumbnail,
      author: 'Claude',
      code,
      parentId: initialParentId,
    });
    toast.create('スライドを追加しました');
    onClose();
  };

  const handleGeneratePrompt = () => {
    if (!contentDescription.trim()) return;
    setGeneratedPrompt(buildPrompt(contentDescription.trim()));
  };

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (showPreview) {
    return (
      <DynamicPresentationViewer
        title={title || 'プレビュー'}
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
            <h3 className="font-bold text-gray-800">スライドをコードで追加</h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Title input */}
        <div className="px-6 pt-4 flex-shrink-0">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="プレゼンテーションのタイトル"
            className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent focus:border-violet-400 rounded-xl outline-none transition-all text-gray-800"
            autoFocus
          />
        </div>

        {/* Thumbnail selector */}
        <div className="px-6 pt-3 pb-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Image className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-semibold text-gray-700">サムネイル</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Current thumbnail preview */}
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

            {/* Image upload */}
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
          </div>
        </div>

        {/* Prompt Generator Section */}
        <div className="px-6 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Wand2 className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-semibold text-gray-700">① AIへのプロンプトを生成</span>
          </div>
          <textarea
            value={contentDescription}
            onChange={e => setContentDescription(e.target.value)}
            placeholder="作成したい資料の内容を入力（例：React.jsの入門資料を10枚のスライドで。基本概念から実践まで）"
            rows={2}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm resize-none outline-none focus:border-violet-400 transition-all text-gray-800"
          />
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleGeneratePrompt}
              disabled={!contentDescription.trim()}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-violet-500 text-white rounded-lg text-sm font-medium hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Wand2 className="w-3.5 h-3.5" />
              プロンプトを生成
            </button>
            {generatedPrompt && (
              <span className="text-xs text-gray-400">生成完了 — コピーしてClaudeやChatGPTに貼り付けてください</span>
            )}
          </div>

          {generatedPrompt && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">生成されたプロンプト</span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'コピーしました' : 'コピー'}
                </button>
              </div>
              <pre className="bg-gray-900 text-gray-100 text-xs p-3 rounded-lg overflow-auto max-h-36 whitespace-pre-wrap leading-relaxed">
                {generatedPrompt}
              </pre>
            </div>
          )}
        </div>

        {/* Code textarea */}
        <div className="flex-1 px-6 py-4 min-h-0 flex flex-col">
          <p className="text-xs text-gray-400 mb-2">
            ② AIが生成したTSXコードを貼り付けてください。import文は自動的に除去されます。
          </p>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder={PLACEHOLDER}
            className="flex-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-violet-400 transition-all font-mono text-sm text-gray-800 resize-none"
            spellCheck={false}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          <button
            onClick={() => setShowPreview(true)}
            disabled={!code.trim()}
            className="flex items-center gap-2 px-5 py-2.5 border-2 border-violet-300 text-violet-600 rounded-xl hover:bg-violet-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            プレビュー
          </button>
          <div className="flex-1" />
          <button onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all text-sm">
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !code.trim()}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            保存して追加
          </button>
        </div>
      </div>
    </div>
  );
}
