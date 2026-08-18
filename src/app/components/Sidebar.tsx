import { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  LayoutDashboard, FolderOpen, Folder, FileText,
  Settings, LogOut, ChevronRight, ChevronDown, User, Users, UserPlus,
  FolderPlus, Trash2, Pencil, X, Star, FolderInput, Download, Loader2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useConfirm } from './ConfirmDialog';
import { MoveToFolderDialog } from './MoveToFolderDialog';
import { exportPdf } from '../lib/exportPdf';
import { toast } from '../lib/toast';
import { Item, FileItem } from '../types';
import { presentationRegistry } from '../../presentations/registry';
import { DRAG_TYPE, DragItem } from '../dnd';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onAddFolder: (parentFolderId: string | null) => void;
  onFileClick?: (fileId: string) => void;
  /** モバイルドロワーの開閉状態（デスクトップでは無視される） */
  isOpen?: boolean;
  /** ドロワーを閉じる（モバイルのナビ操作後などに呼ぶ） */
  onClose?: () => void;
}

interface SidebarRowProps {
  item: Item;
  depth: number;
  isExpanded: boolean;
  isActive: boolean;
  hasChildren: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onExpand: () => void;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onLongPress: (x: number, y: number) => void;
}

function SidebarRow({
  item, depth, isExpanded, isActive, hasChildren,
  onToggle, onExpand, onClick, onContextMenu, onLongPress,
}: SidebarRowProps) {
  const { moveItemToFolder, isDescendantOf } = useApp();
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);

  // ドラッグ元（ファイル・フォルダどちらも掴める）
  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: DRAG_TYPE,
    item: { id: item.id, itemType: item.type, parentId: item.parentId },
    collect: m => ({ isDragging: m.isDragging() }),
  }, [item.id, item.type, item.parentId]);

  // ドロップ先（フォルダのみ受け付ける）
  const [{ isOver, canDrop }, drop] = useDrop<DragItem, void, { isOver: boolean; canDrop: boolean }>({
    accept: DRAG_TYPE,
    canDrop: (dragItem) => {
      if (item.type !== 'folder') return false;
      if (dragItem.parentId === item.id) return false;
      if (dragItem.id === item.id) return false;
      if (dragItem.itemType === 'folder' && isDescendantOf(dragItem.id, item.id)) return false;
      return true;
    },
    drop: (dragItem) => {
      moveItemToFolder(dragItem.id, dragItem.itemType, item.id);
      toast.move('移動しました');
    },
    collect: m => ({ isOver: m.isOver(), canDrop: m.canDrop() }),
  }, [item.id, item.type, isDescendantOf]);

  const highlight = isOver && canDrop;

  // 閉じたフォルダの上でホバーし続けたら自動で開く（深い階層へドロップできるように）
  useEffect(() => {
    if (!isOver || !canDrop || isExpanded || !hasChildren) return;
    const timer = setTimeout(onExpand, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver, canDrop, isExpanded, hasChildren]);

  // モバイル: 長押しでコンテキストメニュー
  const clearLongPress = () => {
    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    longPressFired.current = false;
    const { clientX, clientY } = touch;
    longPressTimer.current = setTimeout(() => {
      longPressFired.current = true;
      onLongPress(clientX, clientY);
    }, 500);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    clearLongPress();
    // 長押しで開いたメニューが直後の click で閉じないように合成クリックを抑止
    if (longPressFired.current) e.preventDefault();
  };

  return (
    <div
      ref={(node) => { drag(drop(node)); }}
      onContextMenu={onContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={clearLongPress}
      onTouchCancel={clearLongPress}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer active:cursor-grabbing ${
        highlight ? 'bg-violet-200 ring-2 ring-violet-400 text-violet-700' :
        isActive ? 'bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700' :
        'text-gray-700 hover:bg-violet-50'
      } ${isDragging ? 'opacity-40' : 'opacity-100'}`}
      style={{ paddingLeft: `${12 + depth * 20}px` }}
    >
      {item.type === 'folder' && hasChildren && (
        <button onClick={onToggle} className="flex-shrink-0 p-0.5 hover:bg-violet-200 rounded">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      )}
      {/* <button> だと HTML5 バックエンドのドラッグ開始を奪われるため div で実装 */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (longPressFired.current) { longPressFired.current = false; return; }
          onClick();
        }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
        className="flex items-center gap-2 flex-1 text-left min-w-0"
      >
        {item.type === 'folder' ? (
          highlight ? <FolderOpen className="w-4 h-4 flex-shrink-0 text-violet-600" /> :
          isExpanded ? <FolderOpen className="w-4 h-4 flex-shrink-0" /> :
          <Folder className="w-4 h-4 flex-shrink-0" />
        ) : (
          <FileText className="w-4 h-4 flex-shrink-0" />
        )}
        <span className="truncate text-sm">{item.name}</span>
      </div>
    </div>
  );
}

/** 「フォルダー」見出し自体をルート（未分類）へのドロップ先にする */
function RootDropZone() {
  const { moveItemToFolder } = useApp();

  const [{ isOver, canDrop }, drop] = useDrop<DragItem, void, { isOver: boolean; canDrop: boolean }>({
    accept: DRAG_TYPE,
    canDrop: (dragItem) => dragItem.parentId !== null,
    drop: (dragItem) => {
      moveItemToFolder(dragItem.id, dragItem.itemType, null);
      toast.move('ルートに移動しました');
    },
    collect: m => ({ isOver: m.isOver(), canDrop: m.canDrop() }),
  });

  const highlight = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={`px-3 py-2 text-xs uppercase tracking-wider rounded-lg transition-colors ${
        highlight ? 'bg-violet-200 text-violet-700 ring-2 ring-violet-400' : 'text-gray-500'
      }`}
    >
      {highlight ? 'ルートに移動' : 'フォルダー'}
    </div>
  );
}

type ContextMenuState = {
  x: number;
  y: number;
  item: Item;
} | null;

type RenamingState = { id: string; name: string; type: 'file' | 'folder' } | null;

export function Sidebar({ currentView, onViewChange, onAddFolder, onFileClick, isOpen = false, onClose }: SidebarProps) {
  const {
    items, setCurrentFolder, currentFolderId,
    deleteFolder, renameFolder, updateStaticTitle, toggleStar,
  } = useApp();
  const { profile, isAdmin, signOut } = useAuth();
  const { confirm } = useConfirm();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const [renaming, setRenaming] = useState<RenamingState>(null);
  const [renameVal, setRenameVal] = useState('');
  const [movingFile, setMovingFile] = useState<FileItem | null>(null);
  const [pdfExportingId, setPdfExportingId] = useState<string | null>(null);

  useEffect(() => {
    const close = () => setContextMenu(null);
    window.addEventListener('click', close);
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setContextMenu(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const toggleFolder = (e: React.MouseEvent, folderId: string) => {
    e.stopPropagation();
    setExpandedFolders(prev => {
      const next = new Set(prev);
      next.has(folderId) ? next.delete(folderId) : next.add(folderId);
      return next;
    });
  };

  const expandFolder = (folderId: string) => {
    setExpandedFolders(prev => prev.has(folderId) ? prev : new Set(prev).add(folderId));
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
    onViewChange('folder');
    onClose?.();
  };

  // ナビ操作したらモバイルドロワーを閉じる
  const go = (view: string) => { onViewChange(view); onClose?.(); };

  const menuHeightFor = (item: Item) => {
    const rows = item.type === 'folder'
      ? 3
      : 3 + (presentationRegistry.some(p => p.meta.id === item.id) ? 1 : 0);
    return rows * 42 + 40; // 見出し + 余白込みの概算
  };

  const openContextMenu = (clientX: number, clientY: number, item: Item) => {
    const height = menuHeightFor(item);
    const x = clientX + 192 > window.innerWidth ? Math.max(8, clientX - 192) : clientX;
    const y = clientY + height > window.innerHeight ? Math.max(8, window.innerHeight - height - 8) : clientY;
    setContextMenu({ x, y, item });
  };

  const handleContextMenu = (e: React.MouseEvent, item: Item) => {
    e.preventDefault();
    e.stopPropagation();
    openContextMenu(e.clientX, e.clientY, item);
  };

  const handleStartRename = (item: Item) => {
    setRenaming({ id: item.id, name: item.name, type: item.type });
    setRenameVal(item.name);
    setContextMenu(null);
  };

  const handleRenameSubmit = async () => {
    if (!renaming) return;
    const trimmed = renameVal.trim();
    if (trimmed && trimmed !== renaming.name) {
      if (renaming.type === 'folder') {
        await renameFolder(renaming.id, trimmed);
        toast.rename('フォルダ名を変更しました');
      } else {
        updateStaticTitle(renaming.id, trimmed);
        toast.rename('名前を変更しました');
      }
    }
    setRenaming(null);
  };

  const handleDeleteFolder = async (folderId: string, folderName: string) => {
    setContextMenu(null);
    const ok = await confirm({
      title: 'フォルダを削除',
      message: `「${folderName}」を削除しますか？\n中のフォルダ・アイテムもすべて削除されます。`,
      confirmLabel: '削除する',
      variant: 'danger',
    });
    if (ok) {
      await deleteFolder(folderId);
      toast.delete('フォルダを削除しました');
    }
  };

  const handleExportPdf = async (fileId: string) => {
    const pres = presentationRegistry.find(p => p.meta.id === fileId);
    if (!pres || pdfExportingId) return;
    setContextMenu(null);
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

  const getChildItems = (parentId: string | null): Item[] =>
    items.filter(item => item.parentId === parentId);

  const renderFolderTree = (parentId: string | null, depth: number = 0): JSX.Element[] => {
    return getChildItems(parentId).map(item => {
      const isExpanded = expandedFolders.has(item.id);
      const isActive = item.type === 'folder' && currentFolderId === item.id;
      const hasChildren = item.type === 'folder' && getChildItems(item.id).length > 0;

      return (
        <div key={item.id}>
          <SidebarRow
            item={item}
            depth={depth}
            isExpanded={isExpanded}
            isActive={isActive}
            hasChildren={hasChildren}
            onToggle={(e) => toggleFolder(e, item.id)}
            onExpand={() => expandFolder(item.id)}
            onClick={() => {
              if (item.type === 'folder') handleFolderClick(item.id);
              else if (item.type === 'file') { onFileClick?.(item.id); onClose?.(); }
            }}
            onContextMenu={(e) => handleContextMenu(e, item)}
            onLongPress={(x, y) => openContextMenu(x, y, item)}
          />
          {item.type === 'folder' && isExpanded && (
            <div>{renderFolderTree(item.id, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  const navItem = (view: string, icon: React.ReactNode, label: string) => (
    <button
      key={view}
      onClick={() => go(view)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        currentView === view
          ? 'bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700'
          : 'text-gray-700 hover:bg-violet-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const renderContextMenu = () => {
    if (!contextMenu) return null;
    const { item } = contextMenu;
    const isFile = item.type === 'file';
    const file = isFile ? (item as FileItem) : null;
    const hasPdf = isFile && presentationRegistry.some(p => p.meta.id === item.id);

    return (
      <div
        className="fixed z-[60] bg-white rounded-xl shadow-2xl border border-gray-100 py-1 w-48"
        style={{ top: contextMenu.y, left: contextMenu.x }}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
      >
        <div className="px-4 py-1.5 text-xs text-gray-400 truncate border-b border-gray-100 mb-1">
          {item.name}
        </div>

        {isFile ? (
          <>
            <button
              onClick={() => handleStartRename(item)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
            >
              <Pencil className="w-4 h-4 text-violet-500" />
              名前を変更
            </button>
            <button
              onClick={() => { toggleStar(item.id); setContextMenu(null); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
            >
              <Star className="w-4 h-4 text-yellow-500" />
              {file?.starred ? 'お気に入り解除' : 'お気に入り'}
            </button>
            <button
              onClick={() => { setMovingFile(file); setContextMenu(null); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
            >
              <FolderInput className="w-4 h-4 text-violet-500" />
              フォルダに移動
            </button>
            {hasPdf && (
              <button
                onClick={() => handleExportPdf(item.id)}
                disabled={!!pdfExportingId}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors disabled:opacity-40"
              >
                {pdfExportingId === item.id
                  ? <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />
                  : <Download className="w-4 h-4 text-violet-500" />
                }
                PDF出力
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => { onAddFolder(item.id); setContextMenu(null); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
            >
              <FolderPlus className="w-4 h-4 text-violet-500" />
              フォルダ新規作成
            </button>
            <button
              onClick={() => handleStartRename(item)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
            >
              <Pencil className="w-4 h-4 text-violet-500" />
              名前を変更
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={() => handleDeleteFolder(item.id, item.name)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              削除
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      {/* モバイル: 背景オーバーレイ */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}
      <div
        className={`w-64 h-full bg-white/95 lg:bg-white/80 backdrop-blur-md border-r border-violet-100 flex flex-col
          fixed lg:static inset-y-0 left-0 z-50 max-w-[80vw]
          transition-transform duration-300 lg:transition-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-violet-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-violet-500 to-pink-500 p-2 rounded-xl">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-semibold">
              プレゼン管理
            </span>
          </div>
          {/* モバイル: 閉じるボタン */}
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-violet-50 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItem('dashboard', <LayoutDashboard className="w-5 h-5" />, 'ダッシュボード')}
          {navItem('shared', <Users className="w-5 h-5" />, '共有管理')}

          {/* Folder tree */}
          <div className="pt-4">
            <RootDropZone />
            {renderFolderTree(null)}
          </div>

          {/* Admin only */}
          {isAdmin && (
            <div className="pt-4">
              <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider">管理者</div>
              {navItem('admin-requests', <UserPlus className="w-5 h-5" />, 'アカウント申請')}
            </div>
          )}

          <div className="pt-4">
            {navItem('settings', <Settings className="w-5 h-5" />, '設定')}
          </div>
        </div>

        {/* User profile + logout */}
        <div className="border-t border-violet-200 p-3 space-y-1">
          <button
            onClick={() => go('account')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              currentView === 'account' ? 'bg-gradient-to-r from-violet-100 to-pink-100' : 'hover:bg-violet-50'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0">
              {profile?.name ? (
                <span className="text-sm font-bold">{profile.name[0]}</span>
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm text-gray-800 truncate">{profile?.name || '—'}</div>
              <div className="text-xs text-gray-500 truncate">{profile?.email || ''}</div>
            </div>
            {isAdmin && (
              <span className="text-xs px-1.5 py-0.5 bg-violet-100 text-violet-600 rounded-md font-medium flex-shrink-0">
                管理者
              </span>
            )}
          </button>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>ログアウト</span>
          </button>
        </div>
      </div>

      {/* Rename Dialog */}
      {renaming && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4" onClick={() => setRenaming(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              {renaming.type === 'folder' ? 'フォルダ名を変更' : '資料名を変更'}
            </h3>
            <input
              type="text"
              value={renameVal}
              onChange={e => setRenameVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleRenameSubmit(); if (e.key === 'Escape') setRenaming(null); }}
              className="w-full border border-violet-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRenaming(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleRenameSubmit}
                className="px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move to folder */}
      {movingFile && (
        <MoveToFolderDialog
          fileId={movingFile.id}
          currentFolderId={movingFile.parentId}
          onClose={() => setMovingFile(null)}
        />
      )}

      {/* Context Menu */}
      {renderContextMenu()}
    </>
  );
}
