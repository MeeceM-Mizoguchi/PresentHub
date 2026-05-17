import { useState, useRef, useEffect } from 'react';
import {
  Plus,
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
  FolderPlus,
  Code2,
  Trash2,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { FolderView } from './FolderView';
import { SharedManagementPage } from './SharedManagementPage';
import { CreateFolderDialog } from './CreateFolderDialog';
import { PermissionDialog } from './PermissionDialog';
import { PresentationViewer } from './PresentationViewer';
import { MoveToFolderDialog } from './MoveToFolderDialog';
import { AddSlideDialog } from './AddSlideDialog';
import { EditTsxDialog } from './EditTsxDialog';
import { DynamicPresentationViewer } from './DynamicPresentationViewer';
import { AdminRequestsPage } from './AdminRequestsPage';
import { useApp } from '../context/AppContext';
import { useConfirm } from './ConfirmDialog';
import { toast } from '../lib/toast';
import { FileItem } from '../types';
import { presentationRegistry } from '../../presentations/registry';

export function DashboardPage() {
  const { items, currentFolderId, addFolder, addSharedUser, setCurrentFolder, isLoading, toggleStar, dynamicCodeMap, deleteItem } = useApp();
  const { confirm } = useConfirm();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showAddSlide, setShowAddSlide] = useState(false);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [permissionItemId, setPermissionItemId] = useState<string | null>(null);
  const [viewingFileId, setViewingFileId] = useState<string | null>(null);
  const [movingFile, setMovingFile] = useState<FileItem | null>(null);
  const [editingFile, setEditingFile] = useState<FileItem | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [dialogParentId, setDialogParentId] = useState<string | null | undefined>(undefined);
  const newMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (newMenuRef.current && !newMenuRef.current.contains(e.target as Node)) {
        setShowNewMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const allFiles = items.filter(item => item.type === 'file') as FileItem[];
  const filteredFiles = allFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewingFile = viewingFileId ? allFiles.find(f => f.id === viewingFileId) ?? null : null;
  const viewingPresentation = viewingFileId
    ? presentationRegistry.find(p => p.meta.id === viewingFileId) ?? null
    : null;
  const viewingDynamicCode = viewingFile?.isDynamic ? (dynamicCodeMap[viewingFileId!] ?? null) : null;

  const handleCreateFolder = async (name: string, sharedWith: string[], parentId: string | null) => {
    await addFolder({
      id: `folder-${Date.now()}`,
      name,
      type: 'folder',
      parentId,
      sharedWith,
    });
    toast.create('フォルダを作成しました');
  };

  const handleInviteUser = (name: string, email: string) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      status: 'pending' as const,
      invitedAt: new Date().toISOString().split('T')[0],
    };
    addSharedUser(newUser);
    const inviteToken = btoa(`${newUser.id}-${Date.now()}`);
    const inviteUrl = `${window.location.origin}${window.location.pathname}?invite=${inviteToken}`;
    navigator.clipboard.writeText(inviteUrl).catch(() => {});
    toast.success(`${email} に招待リンクをコピーしました`);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    if (view === 'dashboard') setCurrentFolder(null);
  };

  const handleCardClick = (file: FileItem) => {
    setViewingFileId(file.id);
  };

  const handleMenuToggle = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    setOpenMenuId(prev => prev === fileId ? null : fileId);
  };

  const renderFileCard = (file: FileItem) => (
    <div
      key={file.id}
      onClick={() => handleCardClick(file)}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-violet-100 relative"
    >
      <div className="h-48 relative" style={{ background: file.thumbnail }}>
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
                  <FolderInput className="w-4 h-4 text-violet-500" />
                  フォルダに移動
                </button>
                <button
                  onClick={() => { setEditingFile(file); setOpenMenuId(null); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                >
                  <Code2 className="w-4 h-4 text-violet-500" />
                  TSXを編集
                </button>
                <button
                  onClick={async () => {
                    setOpenMenuId(null);
                    const ok = await confirm({ title: 'ファイルを削除', message: `「${file.name}」を削除しますか？`, confirmLabel: '削除する', variant: 'danger' });
                    if (ok) { deleteItem(file.id); toast.delete('削除しました'); }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />削除
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-gray-800">{file.name}</h3>
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

  const renderFileRow = (file: FileItem) => (
    <div
      key={file.id}
      onClick={() => handleCardClick(file)}
      className="p-5 hover:bg-violet-50 transition-colors cursor-pointer flex items-center gap-4"
    >
      <div className="w-20 h-14 rounded-lg flex-shrink-0" style={{ background: file.thumbnail }} />
      <div className="flex-1 min-w-0">
        <h3 className="mb-1 text-gray-800 truncate">{file.name}</h3>
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
                <FolderInput className="w-4 h-4 text-violet-500" />
                フォルダに移動
              </button>
              <button
                onClick={() => { setEditingFile(file); setOpenMenuId(null); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
              >
                <Code2 className="w-4 h-4 text-violet-500" />
                TSXを編集
              </button>
              <button
                onClick={async () => {
                    setOpenMenuId(null);
                    const ok = await confirm({ title: 'ファイルを削除', message: `「${file.name}」を削除しますか？`, confirmLabel: '削除する', variant: 'danger' });
                    if (ok) { deleteItem(file.id); toast.delete('削除しました'); }
                  }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />削除
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <>
      {/* Search and Actions Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="プレゼンテーションを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-violet-100 rounded-xl outline-none focus:border-violet-400 transition-colors"
          />
        </div>
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

      {/* Quick Filters */}
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-violet-200 text-violet-600 rounded-lg hover:bg-violet-50 transition-colors whitespace-nowrap">
          <Star className="w-4 h-4" />
          お気に入り
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-violet-100 text-gray-600 rounded-lg hover:bg-violet-50 transition-colors whitespace-nowrap">
          <Clock className="w-4 h-4" />
          最近使用
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-violet-100 text-gray-600 rounded-lg hover:bg-violet-50 transition-colors whitespace-nowrap">
          <FolderOpen className="w-4 h-4" />
          すべて
        </button>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
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

  return (
    <div
      className="flex h-screen w-full bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50"
      onClick={() => setOpenMenuId(null)}
    >
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        onAddFolder={(parentId) => { setDialogParentId(parentId); setShowCreateFolder(true); }}
        onAddSlide={(parentId) => { setDialogParentId(parentId); setShowAddSlide(true); }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md border-b border-violet-100">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              {currentView === 'dashboard' && 'ダッシュボード'}
              {currentView === 'folder' && 'フォルダ'}
              {currentView === 'shared' && '共有管理'}
              {currentView === 'settings' && '設定'}
              {currentView === 'account' && 'アカウント'}
              {currentView === 'admin-requests' && 'アカウント申請'}
            </h1>
            <div className="flex items-center gap-3">
              <div className="relative" ref={newMenuRef}>
                <button
                  onClick={() => setShowNewMenu(v => !v)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  新規作成
                </button>
                {showNewMenu && (
                  <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20">
                    <button
                      onClick={() => { setShowCreateFolder(true); setShowNewMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                    >
                      <FolderPlus className="w-4 h-4 text-violet-500" />
                      フォルダを作成
                    </button>
                    <button
                      onClick={() => { setShowAddSlide(true); setShowNewMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                    >
                      <Code2 className="w-4 h-4 text-pink-500" />
                      スライドをコードで追加
                    </button>
                  </div>
                )}
              </div>
              <button className="p-2 hover:bg-violet-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-8">
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'folder' && (
            <FolderView onPermissionClick={(id) => setPermissionItemId(id)} />
          )}
          {currentView === 'shared' && (
            <SharedManagementPage onInvite={handleInviteUser} />
          )}
          {currentView === 'admin-requests' && <AdminRequestsPage />}
          {(currentView === 'settings' || currentView === 'account') && (
            <div className="text-center py-12">
              <p className="text-gray-500">{currentView === 'settings' ? '設定' : 'アカウント'}画面（開発中）</p>
            </div>
          )}
        </main>
      </div>

      {showCreateFolder && (
        <CreateFolderDialog
          onClose={() => { setShowCreateFolder(false); setDialogParentId(undefined); }}
          onCreate={handleCreateFolder}
          initialParentId={dialogParentId}
        />
      )}
      {showAddSlide && (
        <AddSlideDialog
          onClose={() => { setShowAddSlide(false); setDialogParentId(undefined); }}
          initialParentId={dialogParentId}
        />
      )}
      {permissionItemId && (
        <PermissionDialog itemId={permissionItemId} onClose={() => setPermissionItemId(null)} />
      )}
      {viewingPresentation && (
        <PresentationViewer presentation={viewingPresentation} onClose={() => setViewingFileId(null)} />
      )}
      {viewingDynamicCode && viewingFile && (
        <DynamicPresentationViewer
          title={viewingFile.name}
          code={viewingDynamicCode}
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
      {editingFile && (
        <EditTsxDialog file={editingFile} onClose={() => setEditingFile(null)} />
      )}
    </div>
  );
}
