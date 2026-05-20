import { useState, useRef } from 'react';
import { X, FileText, Upload, Trash2, Eye } from 'lucide-react';
import { toast } from '../lib/toast';

interface CreatePresentationDialogProps {
  onClose: () => void;
  onCreate: (data: PresentationCreationData) => Promise<void>;
}

export interface PresentationCreationData {
  title: string;
  description: string;
  images: { url: string; name: string }[];
  code: string;
  prompt: string;
}

export function CreatePresentationDialog({ onClose, onCreate }: CreatePresentationDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const [code, setCode] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewCode, setPreviewCode] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setImages(prev => [...prev, { url, name: file.name }]);
      };
      reader.readAsDataURL(file);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const generatePrompt = () => {
    if (!title || !description) {
      alert('タイトルと説明を入力してください');
      return;
    }

    const promptText = `以下の要件でHTML/CSS/JavaScriptコードを生成してください：

【タイトル】
${title}

【説明】
${description}

【画像情報】
${images.length > 0 ? `${images.length}個の画像が提供されています` : 'なし'}

以下のHTMLコードテンプレートを使用してください：
\`\`\`html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    /* ここにCSSを記述 */
  </style>
</head>
<body>
  <!-- ここにHTMLを記述 -->
  <script>
    // ここにJavaScriptを記述
  </script>
</body>
</html>
\`\`\`

生成したコードのみを出力してください。`;

    setPrompt(promptText);
  };

  const handlePreview = () => {
    if (!code.trim()) {
      alert('コードを入力してください');
      return;
    }
    setPreviewCode(code);
    setShowPreview(true);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('タイトルを入力してください');
      return;
    }
    if (!code.trim()) {
      alert('コードを入力してください');
      return;
    }

    setIsLoading(true);
    try {
      await onCreate({
        title: title.trim(),
        description: description.trim(),
        images,
        code,
        prompt,
      });
      toast.success(`「${title}」を作成しました`);
      onClose();
    } catch (error) {
      console.error('Error creating presentation:', error);
      toast.error('プレゼン作成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-500 to-pink-500 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <h2 className="text-xl font-bold">プレゼン新規作成</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                プレゼン資料のタイトル
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例：会社紹介資料"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                画像アップロード
              </label>
              <div className="mb-4 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-violet-400 transition-colors cursor-pointer bg-gray-50 hover:bg-violet-50"
                onClick={() => fileInputRef.current?.click()}>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Upload className="w-5 h-5" />
                  <span className="text-sm">画像をドラッグ＆ドロップまたはクリック</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Image List */}
              {images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative flex-shrink-0 group">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="h-20 w-20 rounded-lg object-cover border border-gray-300"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <div className="text-xs text-gray-500 mt-1 truncate w-20 text-center">{img.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                作りたい資料の内容を入力
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="例：当社の事業内容、強み、ビジョンを含めた会社紹介資料を作成してください..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none"
              />
            </div>

            {/* Generate Prompt */}
            <button
              onClick={generatePrompt}
              className="w-full px-4 py-3 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              プロンプト文作成
            </button>

            {/* Generated Prompt */}
            {prompt && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  AIに貼り付けるプロンプト
                </label>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none bg-slate-50 text-xs font-mono"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(prompt)}
                    className="absolute top-2 right-2 px-2 py-1 text-xs bg-violet-100 text-violet-700 rounded hover:bg-violet-200 transition-colors"
                  >
                    コピー
                  </button>
                </div>
              </div>
            )}

            {/* Code Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                コード入力テキストエリア
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder='HTML/CSS/JavaScriptコードをここに貼り付けてください...'
                rows={8}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none font-mono text-sm"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              キャンセル
            </button>
            <button
              onClick={handlePreview}
              disabled={isLoading || !code.trim()}
              className="px-6 py-3 rounded-xl border border-violet-300 bg-white text-violet-600 font-semibold hover:bg-violet-50 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              プレビュー
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading || !title.trim() || !code.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? '保存中...' : '保存'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">プレビュー</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <iframe
              srcDoc={previewCode}
              className="flex-1 w-full rounded-b-xl border-0"
              sandbox="allow-scripts allow-same-origin"
              title="Code Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}
