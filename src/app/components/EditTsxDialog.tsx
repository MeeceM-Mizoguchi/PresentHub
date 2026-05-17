import { useState, useEffect } from 'react';
import { X, Code2, Eye, Save, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../lib/toast';
import { FileItem } from '../types';
import { DynamicPresentationViewer } from './DynamicPresentationViewer';

interface EditTsxDialogProps {
  file: FileItem;
  onClose: () => void;
}

export function EditTsxDialog({ file, onClose }: EditTsxDialogProps) {
  const { dynamicCodeMap, updateDynamicCode } = useApp();
  const [code, setCode] = useState('');
  const [originalCode, setOriginalCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const isDynamic = !!file.isDynamic;
  const isDirty = code !== originalCode;

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

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isDynamic) {
        updateDynamicCode(file.id, code);
        toast.success('保存しました');
        setOriginalCode(code);
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
        title={file.name}
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
            <h3 className="font-bold text-gray-800">TSXを編集</h3>
            <span className="text-sm text-gray-400 font-normal truncate max-w-xs">{file.name}</span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Code area */}
        <div className="flex-1 px-6 py-4 min-h-0 flex flex-col">
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
