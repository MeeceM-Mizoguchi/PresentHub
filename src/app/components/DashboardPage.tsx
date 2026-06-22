import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  FileText,
  Calendar,
  User,
  Grid3x3,
  List,
  Star,
  Clock,
  FolderOpen,
  MoreVertical,
  UserPlus,
  FolderInput,
  Loader2,
  Pencil,
  RefreshCw,
  Maximize2,
  X,
  Plus,
  Download,
} from 'lucide-react';
import { exportPdf } from '../lib/exportPdf';
import { Sidebar } from './Sidebar';
import { FolderView } from './FolderView';
import { SharedManagementPage } from './SharedManagementPage';
import { CreateFolderDialog } from './CreateFolderDialog';
import { PermissionDialog } from './PermissionDialog';
import { PresentationViewer } from './PresentationViewer';
import { MoveToFolderDialog } from './MoveToFolderDialog';
import { AdminRequestsPage } from './AdminRequestsPage';
import { AccountPage } from './AccountPage';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { FileItem } from '../types';
import { presentationRegistry } from '../../presentations/registry';
import { toast } from '../lib/toast';

function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase();
  if (!q) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length ? 30 : 0;
}

function viewFromPath(pathname: string): string {
  if (pathname === '/' || pathname === '') return 'dashboard';
  if (pathname.startsWith('/shared')) return 'shared';
  if (pathname.startsWith('/folder')) return 'folder';
  if (pathname.startsWith('/account')) return 'account';
  if (pathname.startsWith('/settings')) return 'settings';
  if (pathname.startsWith('/admin-requests')) return 'admin-requests';
  return 'dashboard';
}

export function DashboardPage() {
  const { items, currentFolderId, addFolder, setCurrentFolder, isLoading, isSlowLoading, loadError, retryLoad, toggleStar, updateStaticTitle } = useApp();
  const { isAdmin, isGuest, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = viewFromPath(location.pathname);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [headerSearch, setHeaderSearch] = useState('');
  const [showSearchDrop, setShowSearchDrop] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [createFolderParentId, setCreateFolderParentId] = useState<string | null>(null);
  const [permissionItemId, setPermissionItemId] = useState<string | null>(null);
  const [viewingFileId, setViewingFileId] = useState<string | null>(null);
  const [movingFile, setMovingFile] = useState<FileItem | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState('');
  const [pdfExportingId, setPdfExportingId] = useState<string | null>(null);

  const handleExportPdfFromMenu = async (fileId: string) => {
    const pres = presentationRegistry.find(p => p.meta.id === fileId);
    if (!pres || pdfExportingId) return;
    setOpenMenuId(null);
    setPdfExportingId(fileId);
    try {
      await exportPdf(pres);
      toast.success('PDFをダウンロードしました');
    } catch {
      toast.error('PDF生成に失敗しました');
    } finally {
      setPdfExportingId(null);
    }
  };
  const [filterMode, setFilterMode] = useState<'all' | 'starred' | 'recent'>('all');

  const allFilesFlat = items.filter(i => i.type === 'file') as FileItem[];
  const searchResults = headerSearch.trim()
    ? allFilesFlat
        .map(f => ({ file: f, score: fuzzyScore(headerSearch, f.name) }))
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDrop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const allFiles = items.filter(item => item.type === 'file') as FileItem[];
  const filteredFiles = allFiles
    .filter(file => filterMode === 'starred' ? !!file.starred : true)
    .sort((a, b) => {
      if (filterMode === 'recent') {
        return new Date(b.lastModified || '').getTime() - new Date(a.lastModified || '').getTime();
      }
      return 0;
    });

  const viewingFile = viewingFileId ? allFiles.find(f => f.id === viewingFileId) ?? null : null;
  const viewingPresentation = viewingFileId
    ? presentationRegistry.find(p => p.meta.id === viewingFileId) ?? null
    : null;

  const handleCreateFolder = async (name: string, sharedWith: string[], parentId: string | null) => {
    try {
      await addFolder({
        id: `folder-${Date.now()}`,
        name,
        type: 'folder',
        parentId,
        sharedWith,
      });
      toast.create('フォルダを作成しました');
    } catch {
      toast.error('フォルダの保存に失敗しました。再度お試しください。');
    }
  };

  const handleViewChange = (view: string) => {
    if (view === 'dashboard') { navigate('/'); setCurrentFolder(null); }
    else navigate(`/${view}`);
  };

  const handleCardClick = (file: FileItem) => {
    setViewingFileId(file.id);
  };

  const handleMenuToggle = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    setOpenMenuId(prev => prev === fileId ? null : fileId);
  };

  const renderFileCard = (file: FileItem) => {
    const registryEntry = presentationRegistry.find(p => p.meta.id === file.id);
    const firstSlide = registryEntry?.slides?.[0];
    return (
    <div
      key={file.id}
      onClick={() => handleCardClick(file)}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-violet-100 relative"
    >
      <div className="h-48 relative overflow-hidden" style={
        firstSlide
          ? { background: '#000' }
          : file.thumbnail?.startsWith('http') || file.thumbnail?.startsWith('blob')
            ? { backgroundImage: `url(${file.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: file.thumbnail || 'linear-gradient(135deg, #9D72FF, #FF5BAE)' }
      }>
        {firstSlide && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div style={{ width: 'calc(100% / 0.267)', height: '720px', transform: 'scale(0.267)', transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
              {firstSlide}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <FileText className="w-12 h-12 text-white" />
        </div>
        {file.starred && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); setPermissionItemId(file.id); }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <UserPlus className="w-4 h-4 text-gray-600" />
          </button>
          <div className="relative">
            <button
              onClick={(e) => handleMenuToggle(e, file.id)}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            {openMenuId === file.id && (
              <div
                className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-10 py-1"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => { setRenamingFileId(file.id); setRenameVal(file.name); setOpenMenuId(null); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                >
                  <Pencil className="w-4 h-4 text-violet-500" />名前を変更
                </button>
                <button
                  onClick={() => { toggleStar(file.id); setOpenMenuId(null); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                >
                  <Star className="w-4 h-4 text-yellow-500" />
                  {file.starred ? 'お気に入り解除' : 'お気に入り'}
                </button>
                <button
                  onClick={() => { setMovingFile(file); setOpenMenuId(null); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                >
                  <FolderInput className="w-4 h-4 text-violet-500" />フォルダに移動
                </button>
                {presentationRegistry.some(p => p.meta.id === file.id) && (
                  <button
                    onClick={() => handleExportPdfFromMenu(file.id)}
                    disabled={!!pdfExportingId}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors disabled:opacity-40"
                  >
                    {pdfExportingId === file.id
                      ? <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />
                      : <Download className="w-4 h-4 text-violet-500" />
                    }
                    PDF出力
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-5">
        {renamingFileId === file.id ? (
          <input
            autoFocus
            value={renameVal}
            onChange={e => setRenameVal(e.target.value)}
            onBlur={() => { const t = renameVal.trim(); if (t && t !== file.name) updateStaticTitle(file.id, t); setRenamingFileId(null); }}
            onKeyDown={e => { if (e.key === 'Enter') { const t = renameVal.trim(); if (t && t !== file.name) updateStaticTitle(file.id, t); setRenamingFileId(null); } if (e.key === 'Escape') setRenamingFileId(null); }}
            onClick={e => e.stopPropagation()}
            className="w-full text-gray-800 border-b-2 border-violet-400 outline-none bg-transparent mb-2 font-semibold"
          />
        ) : (
          <h3 className="mb-2 text-gray-800">{file.name}</h3>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{file.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{file.lastModified}</span>
          </div>
        </div>
      </div>
    </div>
    );
  };

  const renderFileRow = (file: FileItem) => {
    const registryEntry = presentationRegistry.find(p => p.meta.id === file.id);
    const firstSlide = registryEntry?.slides?.[0];
    return (
    <div
      key={file.id}
      onClick={() => handleCardClick(file)}
      className="p-5 hover:bg-violet-50 transition-colors cursor-pointer flex items-center gap-4"
    >
      <div className="w-20 h-14 rounded-lg flex-shrink-0 overflow-hidden relative" style={
        firstSlide
          ? { background: '#000' }
          : file.thumbnail?.startsWith('http') || file.thumbnail?.startsWith('blob')
            ? { backgroundImage: `url(${file.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: file.thumbnail || 'linear-gradient(135deg, #9D72FF, #FF5BAE)' }
      }>
        {firstSlide && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div style={{ width: 'calc(100% / 0.0778)', height: '720px', transform: 'scale(0.0778)', transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
              {firstSlide}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        {renamingFileId === file.id ? (
          <input
            autoFocus
            value={renameVal}
            onChange={e => setRenameVal(e.target.value)}
            onBlur={() => { const t = renameVal.trim(); if (t && t !== file.name) updateStaticTitle(file.id, t); setRenamingFileId(null); }}
            onKeyDown={e => { if (e.key === 'Enter') { const t = renameVal.trim(); if (t && t !== file.name) updateStaticTitle(file.id, t); setRenamingFileId(null); } if (e.key === 'Escape') setRenamingFileId(null); }}
            onClick={e => e.stopPropagation()}
            className="w-full text-gray-800 border-b-2 border-violet-400 outline-none bg-transparent mb-1 font-semibold"
          />
        ) : (
          <h3 className="mb-1 text-gray-800 truncate">{file.name}</h3>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{file.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{file.lastModified}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {file.starred && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
        <button
          onClick={(e) => { e.stopPropagation(); setPermissionItemId(file.id); }}
          className="p-2 hover:bg-violet-100 rounded-lg transition-colors"
        >
          <UserPlus className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative">
          <button
            onClick={(e) => handleMenuToggle(e, `list-${file.id}`)}
            className="p-2 hover:bg-violet-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
          {openMenuId === `list-${file.id}` && (
            <div
              className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-10 py-1"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => { setRenamingFileId(file.id); setRenameVal(file.name); setOpenMenuId(null); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
              >
                <Pencil className="w-4 h-4 text-violet-500" />名前を変更
              </button>
              <button
                onClick={() => { toggleStar(file.id); setOpenMenuId(null); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
              >
                <Star className="w-4 h-4 text-yellow-500" />
                {file.starred ? 'お気に入り解除' : 'お気に入り'}
              </button>
              <button
                onClick={() => { setMovingFile(file); setOpenMenuId(null); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
              >
                <FolderInput className="w-4 h-4 text-violet-500" />フォルダに移動
              </button>
              {presentationRegistry.some(p => p.meta.id === file.id) && (
                <button
                  onClick={() => handleExportPdfFromMenu(file.id)}
                  disabled={!!pdfExportingId}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors disabled:opacity-40"
                >
                  {pdfExportingId === file.id
                    ? <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />
                    : <Download className="w-4 h-4 text-violet-500" />
                  }
                  PDF出力
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    );
  };

  const renderDashboard = () => (
    <>
      {/* Actions Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-3">
          {([
            { key: 'starred', label: 'お気に入り', icon: Star },
            { key: 'recent',  label: '最近使用',   icon: Clock },
            { key: 'all',     label: 'すべて',      icon: FolderOpen },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilterMode(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors whitespace-nowrap ${
                filterMode === key
                  ? 'bg-violet-500 border-violet-500 text-white'
                  : 'bg-white border-violet-100 text-gray-600 hover:bg-violet-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateFolder(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            フォルダを作成
          </button>
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-violet-100">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading / error state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          {isSlowLoading && (
            <div className="text-center">
              <p className="text-sm text-gray-500">サーバーに接続しています...</p>
              <p className="text-xs text-gray-400 mt-1">初回起動時は1分ほどかかる場合があります</p>
            </div>
          )}
        </div>
      ) : loadError ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-red-400" />
          </div>
          <div className="text-center">
            <p className="text-gray-700 font-medium">サーバーへの接続がタイムアウトしました</p>
            <p className="text-sm text-gray-500 mt-1">ネットワーク接続を確認してから再試行してください</p>
          </div>
          <button
            onClick={retryLoad}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            再試行
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map(renderFileCard)}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-violet-100">
          <div className="divide-y divide-violet-50">
            {filteredFiles.map(renderFileRow)}
          </div>
        </div>
      )}
    </>
  );

  // ── ゲスト向けビュー（user_invites に登録済みの招待ユーザーのみ）──────────
  if (isGuest) {
    return (
      <div className="flex h-screen w-full bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 flex-col">
        <header className="bg-white/80 backdrop-blur-md border-b border-violet-100 flex-shrink-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              PresentHub
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              <span>{profile?.name || profile?.email}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            </div>
          ) : allFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="w-16 h-16 text-gray-200 mb-4" />
              <h2 className="text-lg font-semibold text-gray-500">閲覧できる資料がありません</h2>
              <p className="text-sm text-gray-400 mt-2">管理者からの閲覧許可をお待ちください</p>
            </div>
          ) : (
            <>
              <h2 className="text-base font-semibold text-gray-700 mb-6">あなたの資料 ({allFiles.length}件)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allFiles.map(file => {
                  const registryEntry = presentationRegistry.find(p => p.meta.id === file.id);
                  const firstSlide = registryEntry?.slides?.[0];
                  return (
                    <div
                      key={file.id}
                      onClick={() => setViewingFileId(file.id)}
                      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-violet-100 relative"
                    >
                      <div className="h-48 relative overflow-hidden" style={
                        firstSlide
                          ? { background: '#000' }
                          : file.thumbnail?.startsWith('http') || file.thumbnail?.startsWith('blob')
                            ? { backgroundImage: `url(${file.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                            : { background: file.thumbnail || 'linear-gradient(135deg, #9D72FF, #FF5BAE)' }
                      }>
                        {firstSlide && (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div style={{ width: 'calc(100% / 0.267)', height: '720px', transform: 'scale(0.267)', transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
                              {firstSlide}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                          <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
                            <Maximize2 className="w-4 h-4" />
                            開いて閲覧
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="mb-2 text-gray-800 font-semibold truncate">{file.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{file.author}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </main>

        {viewingPresentation && (
          <PresentationViewer
            presentation={viewingPresentation}
            titleOverride={viewingFile?.name}
            onClose={() => setViewingFileId(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="flex h-screen w-full bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50"
      onClick={() => setOpenMenuId(null)}
    >
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        onAddFolder={(parentId) => { setCreateFolderParentId(parentId); setShowCreateFolder(true); }}
        onFileClick={(fileId) => { setViewingFileId(fileId); }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md border-b border-violet-100">
          <div className="px-6 py-4 flex items-center gap-4">
            <h1 className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent flex-shrink-0">
              {currentView === 'dashboard' && 'ダッシュボード'}
              {currentView === 'folder' && 'フォルダ'}
              {currentView === 'shared' && '共有管理'}
              {currentView === 'settings' && '設定'}
              {currentView === 'account' && 'アカウント'}
              {currentView === 'admin-requests' && 'アカウント申請'}
            </h1>

            {/* グローバル検索 */}
            <div ref={searchRef} className="flex-1 max-w-md relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400 pointer-events-none" />
                <input
                  type="text"
                  value={headerSearch}
                  onChange={e => { setHeaderSearch(e.target.value); setShowSearchDrop(true); }}
                  onFocus={() => setShowSearchDrop(true)}
                  placeholder="資料名で検索..."
                  className="w-full pl-9 pr-8 py-2 bg-violet-50 border border-violet-200 rounded-xl text-sm outline-none focus:border-violet-400 focus:bg-white transition-all"
                />
                {headerSearch && (
                  <button onClick={() => { setHeaderSearch(''); setShowSearchDrop(false); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {showSearchDrop && headerSearch.trim() && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-xl border border-violet-100 overflow-hidden z-50">
                  {searchResults.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-400">「{headerSearch}」に一致する資料はありません</div>
                  ) : (
                    <div>
                      {searchResults.map(({ file, score }) => {
                        const entry = presentationRegistry.find(p => p.meta.id === file.id);
                        const firstSlide = entry?.slides?.[0];
                        return (
                          <button
                            key={file.id}
                            onClick={() => { setViewingFileId(file.id); setHeaderSearch(''); setShowSearchDrop(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-violet-50 transition-colors text-left"
                          >
                            <div className="w-10 h-7 rounded overflow-hidden bg-gray-100 flex-shrink-0 relative">
                              {firstSlide ? (
                                <div className="absolute inset-0 overflow-hidden pointer-events-none scale-[0.078] origin-top-left" style={{ width: '1280px', height: '720px' }}>
                                  {firstSlide}
                                </div>
                              ) : (
                                <FileText className="w-4 h-4 text-gray-400 m-auto mt-1.5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-800 truncate">{file.name}</div>
                              <div className="text-xs text-gray-400">{file.author}</div>
                            </div>
                            {score === 100 && <span className="text-xs text-violet-500 flex-shrink-0">完全一致</span>}
                            {score === 80 && <span className="text-xs text-violet-400 flex-shrink-0">前方一致</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-8">
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'folder' && (
            <FolderView
              onPermissionClick={(id) => setPermissionItemId(id)}
              onCreateFolder={() => setShowCreateFolder(true)}
            />
          )}
          {currentView === 'shared' && (
            <SharedManagementPage />
          )}
          {currentView === 'admin-requests' && <AdminRequestsPage />}
          {currentView === 'account' && <AccountPage />}
          {currentView === 'settings' && (
            <div className="text-center py-12">
              <p className="text-gray-500">設定画面（開発中）</p>
            </div>
          )}
        </main>
      </div>

      {showCreateFolder && (
        <CreateFolderDialog
          onClose={() => { setShowCreateFolder(false); setCreateFolderParentId(null); }}
          onCreate={handleCreateFolder}
          initialParentId={createFolderParentId ?? currentFolderId}
        />
      )}
      {permissionItemId && (
        <PermissionDialog itemId={permissionItemId} onClose={() => setPermissionItemId(null)} />
      )}
      {viewingPresentation && (
        <PresentationViewer
          presentation={viewingPresentation}
          titleOverride={viewingFile?.name}
          onClose={() => setViewingFileId(null)}
        />
      )}
      {movingFile && (
        <MoveToFolderDialog
          fileId={movingFile.id}
          currentFolderId={movingFile.parentId}
          onClose={() => setMovingFile(null)}
        />
      )}
    </div>
  );
}
