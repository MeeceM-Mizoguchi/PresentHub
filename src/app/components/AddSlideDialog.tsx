import { useState } from 'react';
import { X, Code2, Eye, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../lib/toast';
import { DynamicPresentationViewer } from './DynamicPresentationViewer';

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

export function AddSlideDialog({ onClose, initialParentId }: AddSlideDialogProps) {
  const { addDynamicPresentation } = useApp();
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    if (!title.trim() || !code.trim()) return;
    addDynamicPresentation({
      title: title.trim(),
      thumbnail: 'linear-gradient(135deg, #9D72FF 0%, #FF5BAE 100%)',
      author: 'Claude',
      code,
      parentId: initialParentId,
    });
    toast.create('スライドを追加しました');
    onClose();
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
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

        {/* Code textarea */}
        <div className="flex-1 px-6 py-4 min-h-0 flex flex-col">
          <p className="text-xs text-gray-400 mb-2">
            TSXコードを貼り付けてください。import文は自動的に除去されます。
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
