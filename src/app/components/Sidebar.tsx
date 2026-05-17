import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import {
  LayoutDashboard, FolderOpen, Folder, FileText,
  Settings, LogOut, ChevronRight, ChevronDown, User, Users, UserPlus,
  FolderPlus, FilePlus, Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useConfirm } from './ConfirmDialog';
import { toast } from '../lib/toast';
import { Item, FolderItem } from '../types';
import { DRAG_TYPE, DragItem } from '../dnd';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onAddFolder: (parentFolderId: string | null) => void;
  onAddSlide: (parentFolderId: string | null) => void;
}

interface SidebarFolderRowProps {
  item: Item;
  depth: number;
  isExpanded: boolean;
  isActive: boolean;
  hasChildren: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

function SidebarFolderRow({ item, depth, isExpanded, isActive, hasChildren, onToggle, onClick, onContextMenu }: SidebarFolderRowProps) {
  const { moveItemToFolder, isDescendantOf } = useApp();

  const [{ isOver, canDrop }, drop] = useDrop<DragItem, void, { isOver: boolean; canDrop: boolean }>({
    accept: DRAG_TYPE,
    canDrop: (dragItem) => {
      if (dragItem.parentId === item.id) return false;
      if (dragItem.id === item.id) return false;
      if (dragItem.itemType === 'folder' && isDescendantOf(dragItem.id, item.id)) return false;
      return true;
    },
    drop: (dragItem) => {
      moveItemToFolder(dragItem.id, dragItem.itemType, item.id);
    },
    collect: m => ({ isOver: m.isOver(), canDrop: m.canDrop() }),
  });

  const highlight = isOver && canDrop;

  return (
    <div
      ref={drop}
      onContextMenu={onContextMenu}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        highlight ? 'bg-violet-200 ring-2 ring-violet-400 text-violet-700' :
        isActive ? 'bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700' :
        'text-gray-700 hover:bg-violet-50'
      }`}
      style={{ paddingLeft: `${12 + depth * 20}px` }}
    >
      {item.type === 'folder' && hasChildren && (
        <button onClick={onToggle} className="flex-shrink-0 p-0.5 hover:bg-violet-200 rounded">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      )}
      <button onClick={onClick} className="flex items-center gap-2 flex-1 text-left min-w-0">
        {item.type === 'folder' ? (
          highlight ? <FolderOpen className="w-4 h-4 flex-shrink-0 text-violet-600" /> :
          isExpanded ? <FolderOpen className="w-4 h-4 flex-shrink-0" /> :
          <Folder className="w-4 h-4 flex-shrink-0" />
        ) : (
          <FileText className="w-4 h-4 flex-shrink-0" />
        )}
        <span className="truncate text-sm">{item.name}</span>
      </button>
    </div>
  );
}

type ContextMenuState = {
  x: number;
  y: number;
  folderId: string;
  folderName: string;
} | null;

export function Sidebar({ currentView, onViewChange, onAddFolder, onAddSlide }: SidebarProps) {
  const { items, setCurrentFolder, currentFolderId, deleteFolder } = useApp();
  const { profile, isAdmin, signOut } = useAuth();
  const { confirm } = useConfirm();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);

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

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
    onViewChange('folder');
  };

  const handleContextMenu = (e: React.MouseEvent, item: Item) => {
    if (item.type !== 'folder') return;
    e.preventDefault();
    e.stopPropagation();
    const x = e.clientX + 192 > window.innerWidth ? e.clientX - 192 : e.clientX;
    const y = e.clientY + 148 > window.innerHeight ? e.clientY - 148 : e.clientY;
    setContextMenu({ x, y, folderId: item.id, folderName: item.name });
  };

  const handleDeleteFolder = async () => {
    if (!contextMenu) return;
    const { folderId, folderName } = contextMenu;
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

  const getChildItems = (parentId: string | null): Item[] =>
    items.filter(item => item.parentId === parentId);

  const renderFolderTree = (parentId: string | null, depth: number = 0): JSX.Element[] => {
    return getChildItems(parentId).map(item => {
      const isExpanded = expandedFolders.has(item.id);
      const isActive = item.type === 'folder' && currentFolderId === item.id;
      const hasChildren = item.type === 'folder' && getChildItems(item.id).length > 0;

      return (
        <div key={item.id}>
          <SidebarFolderRow
            item={item}
            depth={depth}
            isExpanded={isExpanded}
            isActive={isActive}
            hasChildren={hasChildren}
            onToggle={(e) => toggleFolder(e, item.id)}
            onClick={() => {
              if (item.type === 'folder') handleFolderClick(item.id);
            }}
            onContextMenu={(e) => handleContextMenu(e, item)}
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
      onClick={() => onViewChange(view)}
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

  return (
    <>
      <div className="w-64 h-full bg-white/80 backdrop-blur-md border-r border-violet-100 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-violet-100">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-violet-500 to-pink-500 p-2 rounded-xl">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-semibold">
              プレゼン管理
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItem('dashboard', <LayoutDashboard className="w-5 h-5" />, 'ダッシュボード')}
          {navItem('shared', <Users className="w-5 h-5" />, '共有管理')}

          {/* Folder tree */}
          <div className="pt-4">
            <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider">フォルダー</div>
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
            onClick={() => onViewChange('account')}
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

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 w-48"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 py-1.5 text-xs text-gray-400 truncate border-b border-gray-100 mb-1">
            {contextMenu.folderName}
          </div>
          <button
            onClick={() => { onAddSlide(contextMenu.folderId); setContextMenu(null); }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
          >
            <FilePlus className="w-4 h-4 text-violet-500" />
            プレゼン新規追加
          </button>
          <button
            onClick={() => { onAddFolder(contextMenu.folderId); setContextMenu(null); }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
          >
            <FolderPlus className="w-4 h-4 text-violet-500" />
            フォルダ新規作成
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={handleDeleteFolder}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            削除
          </button>
        </div>
      )}
    </>
  );
}
