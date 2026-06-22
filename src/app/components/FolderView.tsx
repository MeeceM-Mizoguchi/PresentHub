import { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  FileText, Calendar, User, Grid3x3, List, Star, MoreVertical,
  ChevronRight, Home, Folder as FolderIcon, UserPlus, FolderInput,
  Pencil, Trash2, Plus, Download, Loader2,
} from 'lucide-react';
import { exportPdf } from '../lib/exportPdf';
import { toast } from '../lib/toast';
import { useApp } from '../context/AppContext';
import { FolderItem, FileItem } from '../types';
import { PresentationViewer } from './PresentationViewer';
import { MoveToFolderDialog } from './MoveToFolderDialog';
import { presentationRegistry } from '../../presentations/registry';
import { DRAG_TYPE, DragItem } from '../dnd';
import { useConfirm } from './ConfirmDialog';

// ─────────────────────────────────────────────
// FolderCard
// ─────────────────────────────────────────────
interface FolderCardProps {
  folder: FolderItem;
  viewMode: 'grid' | 'list';
  onNavigate: (id: string) => void;
  onPermissionClick: (id: string) => void;
}

function FolderCard({ folder, viewMode, onNavigate, onPermissionClick }: FolderCardProps) {
  const { moveItemToFolder, deleteFolder, renameFolder, isDescendantOf } = useApp();
  const { confirm } = useConfirm();
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState(folder.name);
  const [openMenu, setOpenMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming) inputRef.current?.focus();
  }, [isRenaming]);

  // Drag source
  const [{ isDragging }, drag, dragPreview] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: DRAG_TYPE,
    item: { id: folder.id, itemType: 'folder', parentId: folder.parentId },
    collect: m => ({ isDragging: m.isDragging() }),
  });

  // Drop target (accepts items dropped onto this folder)
  const [{ isOver, canDrop }, drop] = useDrop<DragItem, void, { isOver: boolean; canDrop: boolean }>({
    accept: DRAG_TYPE,
    canDrop: (dragItem) => {
      if (dragItem.id === folder.id) return false;
      if (dragItem.parentId === folder.id) return false;
      if (dragItem.itemType === 'folder' && isDescendantOf(dragItem.id, folder.id)) return false;
      return true;
    },
    drop: (dragItem) => {
      moveItemToFolder(dragItem.id, dragItem.itemType, folder.id);
    },
    collect: m => ({ isOver: m.isOver(), canDrop: m.canDrop() }),
  });

  const handleRenameSubmit = async () => {
    const trimmed = renameVal.trim();
    if (trimmed && trimmed !== folder.name) {
      await renameFolder(folder.id, trimmed);
      toast.rename('名前を変更しました');
    }
    setIsRenaming(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenu(false);
    const ok = await confirm({
      title: 'フォルダを削除',
      message: `「${folder.name}」を削除しますか？\n中のフォルダ・アイテムもすべて削除されます。`,
      confirmLabel: '削除する',
      variant: 'danger',
    });
    if (ok) {
      await deleteFolder(folder.id);
      toast.delete('フォルダを削除しました');
    }
  };

  const highlight = isOver && canDrop;
  const opacity = isDragging ? 'opacity-40' : 'opacity-100';

  if (viewMode === 'grid') {
    return (
      <div
        ref={(node) => { drop(node); dragPreview(node); }}
        className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-200 border-2 cursor-pointer ${highlight ? 'border-violet-400 bg-violet-50 scale-[1.02]' : 'border-violet-100'} ${opacity}`}
      >
        <div
          ref={drag}
          onClick={() => { if (!isRenaming) onNavigate(folder.id); }}
          className="h-48 bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center relative"
        >
          <FolderIcon className={`w-20 h-20 transition-colors ${highlight ? 'text-violet-500' : 'text-violet-400'}`} />
          {highlight && (
            <div className="absolute inset-0 flex items-center justify-center bg-violet-500/10">
              <span className="text-violet-600 text-sm font-semibold bg-white/80 px-3 py-1 rounded-full">ここに移動</span>
            </div>
          )}
          <div className="absolute top-3 right-3 flex gap-1">
            <button onClick={(e) => { e.stopPropagation(); onPermissionClick(folder.id); }}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
              <UserPlus className="w-4 h-4 text-gray-600" />
            </button>
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setOpenMenu(p => !p); }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
              {openMenu && (
                <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-10 py-1"
                  onClick={e => e.stopPropagation()}>
                  <button onClick={(e) => { e.stopPropagation(); setIsRenaming(true); setRenameVal(folder.name); setOpenMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors">
                    <Pencil className="w-4 h-4 text-violet-500" />名前を変更
                  </button>
                  <button onClick={handleDelete}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />削除
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-5">
          {isRenaming ? (
            <input ref={inputRef} value={renameVal}
              onChange={e => setRenameVal(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={e => { if (e.key === 'Enter') handleRenameSubmit(); if (e.key === 'Escape') setIsRenaming(false); }}
              className="w-full text-gray-800 border-b-2 border-violet-400 outline-none bg-transparent"
              onClick={e => e.stopPropagation()} />
          ) : (
            <h3 className="mb-2 text-gray-800 truncate">{folder.name}</h3>
          )}
          <div className="text-sm text-gray-500">フォルダ</div>
        </div>
      </div>
    );
  }

  // List mode
  return (
    <div
      ref={(node) => { drop(node); dragPreview(node); }}
      className={`flex items-center gap-4 p-5 transition-colors border-b border-violet-50 ${highlight ? 'bg-violet-100' : 'hover:bg-violet-50'} ${opacity}`}
    >
      <div ref={drag} className="cursor-grab active:cursor-grabbing">
        <FolderIcon className={`w-10 h-10 flex-shrink-0 ${highlight ? 'text-violet-500' : 'text-violet-400'}`} />
      </div>
      <div className="flex-1 min-w-0" onClick={() => { if (!isRenaming) onNavigate(folder.id); }}>
        {isRenaming ? (
          <input ref={inputRef} value={renameVal}
            onChange={e => setRenameVal(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={e => { if (e.key === 'Enter') handleRenameSubmit(); if (e.key === 'Escape') setIsRenaming(false); }}
            className="w-full text-gray-800 border-b-2 border-violet-400 outline-none bg-transparent"
            onClick={e => e.stopPropagation()} />
        ) : (
          <h3 className="mb-1 text-gray-800 truncate cursor-pointer">{folder.name}</h3>
        )}
        <div className="text-sm text-gray-500">フォルダ</div>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => { setIsRenaming(true); setRenameVal(folder.name); }}
          className="p-2 hover:bg-violet-100 rounded-lg transition-colors" title="名前を変更">
          <Pencil className="w-4 h-4 text-gray-500" />
        </button>
        <button onClick={handleDelete}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="削除">
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onPermissionClick(folder.id); }}
          className="p-2 hover:bg-violet-100 rounded-lg transition-colors">
          <UserPlus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FileCard
// ─────────────────────────────────────────────
interface FileCardProps {
  file: FileItem;
  viewMode: 'grid' | 'list';
  onView: (id: string) => void;
  onMove: (file: FileItem) => void;
  onPermissionClick: (id: string) => void;
  onToggleStar: (id: string) => void;
}

function FileCard({ file, viewMode, onView, onMove, onPermissionClick, onToggleStar }: FileCardProps) {
  const { updateStaticTitle } = useApp();
  const [openMenu, setOpenMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState(file.name);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (isRenaming) renameInputRef.current?.focus(); }, [isRenaming]);

  const handleExportPdf = async () => {
    const pres = presentationRegistry.find(p => p.meta.id === file.id);
    if (!pres || isExportingPdf) return;
    setOpenMenu(false);
    setIsExportingPdf(true);
    try {
      await exportPdf(pres);
      toast.success('PDFをダウンロードしました');
    } catch {
      toast.error('PDF生成に失敗しました');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleRenameSubmit = () => {
    const trimmed = renameVal.trim();
    if (trimmed && trimmed !== file.name) updateStaticTitle(file.id, trimmed);
    else setRenameVal(file.name);
    setIsRenaming(false);
  };

  const [{ isDragging }, drag, dragPreview] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: DRAG_TYPE,
    item: { id: file.id, itemType: 'file', parentId: file.parentId },
    collect: m => ({ isDragging: m.isDragging() }),
  });

  const registryEntry = presentationRegistry.find(p => p.meta.id === file.id);
  const firstSlide = registryEntry?.slides?.[0];

  const thumbnailStyle: React.CSSProperties = firstSlide
    ? { background: '#000' }
    : file.thumbnail?.startsWith('http') || file.thumbnail?.startsWith('blob')
      ? { backgroundImage: `url(${file.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : { background: file.thumbnail || 'linear-gradient(135deg, #9D72FF, #FF5BAE)' };

  const menuItems = (
    <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-10 py-1"
      onClick={e => e.stopPropagation()}>
      <button onClick={() => { setIsRenaming(true); setRenameVal(file.name); setOpenMenu(false); }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors">
        <Pencil className="w-4 h-4 text-violet-500" />名前を変更
      </button>
      <button onClick={() => { onToggleStar(file.id); setOpenMenu(false); }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors">
        <Star className="w-4 h-4 text-yellow-500" />
        {file.starred ? 'お気に入り解除' : 'お気に入り'}
      </button>
      <button onClick={() => { onMove(file); setOpenMenu(false); }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors">
        <FolderInput className="w-4 h-4 text-violet-500" />フォルダに移動
      </button>
      {presentationRegistry.some(p => p.meta.id === file.id) && (
        <button onClick={handleExportPdf} disabled={isExportingPdf}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 transition-colors disabled:opacity-40">
          {isExportingPdf
            ? <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />
            : <Download className="w-4 h-4 text-violet-500" />
          }
          PDF出力
        </button>
      )}
    </div>
  );

  if (viewMode === 'grid') {
    return (
      <div
        ref={dragPreview}
        onClick={() => { if (!isRenaming) onView(file.id); }}
        className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] cursor-pointer border border-violet-100 ${isDragging ? 'opacity-40' : 'opacity-100'}`}
      >
        <div ref={drag} className="h-48 relative overflow-hidden" style={thumbnailStyle}>
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
          <div className="absolute top-3 right-3 flex gap-1">
            <button onClick={(e) => { e.stopPropagation(); onPermissionClick(file.id); }}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
              <UserPlus className="w-4 h-4 text-gray-600" />
            </button>
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setOpenMenu(p => !p); }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
              {openMenu && menuItems}
            </div>
          </div>
        </div>
        <div className="p-5">
          {isRenaming ? (
            <input
              ref={renameInputRef}
              value={renameVal}
              onChange={e => setRenameVal(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={e => { if (e.key === 'Enter') handleRenameSubmit(); if (e.key === 'Escape') { setRenameVal(file.name); setIsRenaming(false); } }}
              onClick={e => e.stopPropagation()}
              className="w-full text-gray-800 border-b-2 border-violet-400 outline-none bg-transparent mb-2 font-semibold"
            />
          ) : (
            <h3 className="mb-2 text-gray-800">{file.name}</h3>
          )}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{file.author}</span></div>
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{file.lastModified}</span></div>
          </div>
        </div>
      </div>
    );
  }

  // List mode
  return (
    <div
      ref={dragPreview}
      onClick={() => { if (!isRenaming) onView(file.id); }}
      className={`flex items-center gap-4 p-5 hover:bg-violet-50 transition-colors cursor-pointer border-b border-violet-50 ${isDragging ? 'opacity-40' : 'opacity-100'}`}
    >
      <div ref={drag} className="w-20 h-14 rounded-lg flex-shrink-0 cursor-grab active:cursor-grabbing overflow-hidden relative" style={thumbnailStyle}>
        {firstSlide && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div style={{ width: 'calc(100% / 0.0778)', height: '720px', transform: 'scale(0.0778)', transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
              {firstSlide}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        {isRenaming ? (
          <input
            ref={renameInputRef}
            value={renameVal}
            onChange={e => setRenameVal(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={e => { if (e.key === 'Enter') handleRenameSubmit(); if (e.key === 'Escape') { setRenameVal(file.name); setIsRenaming(false); } }}
            onClick={e => e.stopPropagation()}
            className="w-full text-gray-800 border-b-2 border-violet-400 outline-none bg-transparent mb-1 font-semibold"
          />
        ) : (
          <h3 className="mb-1 text-gray-800 truncate">{file.name}</h3>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1"><User className="w-4 h-4" /><span>{file.author}</span></div>
          <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{file.lastModified}</span></div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {file.starred && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
        <button onClick={(e) => { e.stopPropagation(); onPermissionClick(file.id); }}
          className="p-2 hover:bg-violet-100 rounded-lg transition-colors">
          <UserPlus className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setOpenMenu(p => !p); }}
            className="p-2 hover:bg-violet-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
          {openMenu && menuItems}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// BreadcrumbDropTarget
// ─────────────────────────────────────────────
interface BreadcrumbDropTargetProps {
  targetId: string | null;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}

function BreadcrumbDropTarget({ targetId, label, icon, isActive, onClick }: BreadcrumbDropTargetProps) {
  const { moveItemToFolder, isDescendantOf } = useApp();

  const [{ isOver, canDrop }, drop] = useDrop<DragItem, void, { isOver: boolean; canDrop: boolean }>({
    accept: DRAG_TYPE,
    canDrop: (dragItem) => {
      if (dragItem.parentId === targetId) return false;
      if (dragItem.itemType === 'folder') {
        if (dragItem.id === targetId) return false;
        if (targetId && isDescendantOf(dragItem.id, targetId)) return false;
      }
      return true;
    },
    drop: (dragItem) => {
      moveItemToFolder(dragItem.id, dragItem.itemType, targetId);
    },
    collect: m => ({ isOver: m.isOver(), canDrop: m.canDrop() }),
  });

  const highlight = isOver && canDrop;

  return (
    <button
      ref={drop}
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
        highlight ? 'bg-violet-200 text-violet-700 ring-2 ring-violet-400' :
        isActive ? 'text-violet-600' : 'text-gray-600 hover:text-violet-600 hover:bg-violet-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────
// FolderView
// ─────────────────────────────────────────────
interface FolderViewProps {
  onPermissionClick: (itemId: string) => void;
  onCreateFolder?: () => void;
}

export function FolderView({ onPermissionClick, onCreateFolder }: FolderViewProps) {
  const { items, currentFolderId, setCurrentFolder, getCurrentFolderPath, toggleStar } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [viewingFileId, setViewingFileId] = useState<string | null>(null);
  const [movingFile, setMovingFile] = useState<FileItem | null>(null);

  const currentItems = items.filter(item => item.parentId === currentFolderId);
  const files = currentItems.filter(item => item.type === 'file') as FileItem[];
  const folders = currentItems.filter(item => item.type === 'folder') as FolderItem[];
  const folderPath = getCurrentFolderPath();

  const viewingFile = viewingFileId ? files.find(f => f.id === viewingFileId) ?? null : null;
  const viewingPresentation = viewingFileId
    ? presentationRegistry.find(p => p.meta.id === viewingFileId) ?? null
    : null;

  return (
    <div onClick={() => {}}>
      {/* Breadcrumb (each item is a drop target) */}
      <div className="mb-6 flex items-center gap-1 text-sm flex-wrap">
        <BreadcrumbDropTarget
          targetId={null}
          label="ホーム"
          icon={<Home className="w-4 h-4" />}
          onClick={() => setCurrentFolder(null)}
        />
        {folderPath.map((folder, idx) => (
          <div key={folder.id} className="flex items-center gap-1">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <BreadcrumbDropTarget
              targetId={folder.id}
              label={folder.name}
              isActive={idx === folderPath.length - 1}
              icon={null}
              onClick={() => setCurrentFolder(folder.id)}
            />
          </div>
        ))}
      </div>

      {/* View Controls */}
      <div className="mb-6 flex items-center justify-between">
        {onCreateFolder && (
          <button
            onClick={onCreateFolder}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200 text-sm"
          >
            <Plus className="w-4 h-4" />
            フォルダを作成
          </button>
        )}
        <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-violet-100">
          <button onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.map(folder => (
            <FolderCard key={folder.id} folder={folder} viewMode="grid"
              onNavigate={setCurrentFolder} onPermissionClick={onPermissionClick} />
          ))}
          {files.map(file => (
            <FileCard key={file.id} file={file} viewMode="grid"
              onView={setViewingFileId} onMove={setMovingFile}
              onPermissionClick={onPermissionClick} onToggleStar={toggleStar} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-violet-100">
          {folders.map(folder => (
            <FolderCard key={folder.id} folder={folder} viewMode="list"
              onNavigate={setCurrentFolder} onPermissionClick={onPermissionClick} />
          ))}
          {files.map(file => (
            <FileCard key={file.id} file={file} viewMode="list"
              onView={setViewingFileId} onMove={setMovingFile}
              onPermissionClick={onPermissionClick} onToggleStar={toggleStar} />
          ))}
        </div>
      )}

      {currentItems.length === 0 && (
        <div className="text-center py-16">
          <FolderIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">このフォルダは空です</p>
          <p className="text-sm text-gray-400 mt-1">アイテムをここにドラッグして移動できます</p>
        </div>
      )}

      {viewingPresentation && (
        <PresentationViewer
          presentation={viewingPresentation}
          titleOverride={viewingFile?.name}
          onClose={() => setViewingFileId(null)}
        />
      )}
      {movingFile && (
        <MoveToFolderDialog fileId={movingFile.id} currentFolderId={movingFile.parentId} onClose={() => setMovingFile(null)} />
      )}
    </div>
  );
}
