import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Item, FolderItem, FileItem, SharedUser } from '../types';
import { presentationRegistry } from '../../presentations/registry';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

const DEFAULT_FOLDERS: FolderItem[] = [
  { id: 'folder-1', name: 'プロジェクト', type: 'folder', parentId: null, sharedWith: [] },
  { id: 'folder-2', name: 'Q1 2024', type: 'folder', parentId: 'folder-1', sharedWith: [] },
  { id: 'folder-3', name: 'マーケティング', type: 'folder', parentId: 'folder-1', sharedWith: [] },
  { id: 'folder-4', name: 'アーカイブ', type: 'folder', parentId: null, sharedWith: [] },
];

const DEFAULT_SHARED_USERS: SharedUser[] = [];

function buildFileItems(metaMap: Record<string, { folderId: string | null; starred: boolean }>): FileItem[] {
  return presentationRegistry.map(entry => ({
    id: entry.meta.id,
    name: entry.meta.title,
    type: 'file' as const,
    parentId: metaMap[entry.meta.id]?.folderId ?? null,
    thumbnail: entry.meta.thumbnail,
    lastModified: entry.meta.createdAt,
    author: entry.meta.author,
    starred: metaMap[entry.meta.id]?.starred ?? false,
    sharedWith: [],
  }));
}

interface AppContextType {
  items: Item[];
  sharedUsers: SharedUser[];
  currentFolderId: string | null;
  isLoading: boolean;
  dynamicCodeMap: Record<string, string>;
  addFolder: (folder: FolderItem) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
  moveItemToFolder: (itemId: string, itemType: 'file' | 'folder', newParentId: string | null) => Promise<void>;
  moveToFolder: (fileId: string, folderId: string | null) => Promise<void>;
  toggleStar: (fileId: string) => Promise<void>;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  setCurrentFolder: (folderId: string | null) => void;
  addSharedUser: (user: SharedUser) => void;
  updateSharedUser: (id: string, updates: Partial<SharedUser>) => void;
  deleteSharedUser: (id: string) => void;
  getItemsByParent: (parentId: string | null) => Item[];
  getCurrentFolderPath: () => FolderItem[];
  isDescendantOf: (ancestorId: string, candidateId: string) => boolean;
  addDynamicPresentation: (entry: { title: string; thumbnail: string; author: string; code: string; parentId?: string | null }) => void;
  updateDynamicCode: (id: string, code: string) => void;
  updateDynamicMeta: (id: string, updates: { title?: string; thumbnail?: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LS_KEY = 'presenthub_dynamic_slides';

interface DynamicEntry {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  code: string;
  createdAt: string;
  parentId: string | null;
  starred: boolean;
}

function loadDynamicEntries(): DynamicEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveDynamicEntries(entries: DynamicEntry[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(entries));
}

function dynamicEntryToFileItem(e: DynamicEntry): FileItem {
  return {
    id: e.id, name: e.title, type: 'file', parentId: e.parentId,
    thumbnail: e.thumbnail, lastModified: e.createdAt, author: e.author,
    starred: e.starred, sharedWith: [], isDynamic: true,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<FolderItem[]>(DEFAULT_FOLDERS);
  const [files, setFiles] = useState<FileItem[]>(() => {
    const dynamic = loadDynamicEntries().map(dynamicEntryToFileItem);
    return [...buildFileItems({}), ...dynamic];
  });
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>(DEFAULT_SHARED_USERS);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [dynamicCodeMap, setDynamicCodeMap] = useState<Record<string, string>>(() =>
    Object.fromEntries(loadDynamicEntries().map(e => [e.id, e.code]))
  );

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    async function load() {
      setIsLoading(true);
      try {
        const [{ data: dbFolders }, { data: dbMeta }] = await Promise.all([
          supabase.from('folders').select('*').order('created_at'),
          supabase.from('presentation_meta').select('*'),
        ]);
        if (dbFolders) {
          setFolders(dbFolders.map(f => ({
            id: f.id, name: f.name, type: 'folder' as const, parentId: f.parent_id, sharedWith: [],
          })));
        }
        const metaMap: Record<string, { folderId: string | null; starred: boolean }> = {};
        if (dbMeta) {
          for (const row of dbMeta) metaMap[row.id] = { folderId: row.folder_id, starred: row.starred };
        }
        setFiles([...buildFileItems(metaMap), ...loadDynamicEntries().map(dynamicEntryToFileItem)]);
      } catch (err) {
        console.error('Supabase load error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const items: Item[] = [...folders, ...files];

  // Returns true if candidateId is inside ancestorId (at any depth)
  const isDescendantOf = useCallback((ancestorId: string, candidateId: string): boolean => {
    const visited = new Set<string>();
    let currentId: string | null = candidateId;
    while (currentId) {
      if (visited.has(currentId)) break;
      visited.add(currentId);
      const folder = folders.find(f => f.id === currentId);
      if (!folder) break;
      if (folder.parentId === ancestorId) return true;
      currentId = folder.parentId;
    }
    return false;
  }, [folders]);

  const addFolder = async (folder: FolderItem) => {
    setFolders(prev => [...prev, folder]);
    if (isSupabaseConfigured) {
      await supabase.from('folders').insert({ id: folder.id, name: folder.name, parent_id: folder.parentId });
    }
  };

  const deleteFolder = async (id: string) => {
    const collectDescendants = (folderId: string): string[] => {
      const result = [folderId];
      for (const f of folders) {
        if (f.parentId === folderId) result.push(...collectDescendants(f.id));
      }
      return result;
    };

    const folderIdsToDelete = collectDescendants(id);

    // Clean up dynamic presentations in those folders
    const dynamicToDelete = files
      .filter(f => f.isDynamic && f.parentId !== null && folderIdsToDelete.includes(f.parentId))
      .map(f => f.id);
    if (dynamicToDelete.length > 0) {
      saveDynamicEntries(loadDynamicEntries().filter(e => !dynamicToDelete.includes(e.id)));
      setDynamicCodeMap(prev => {
        const next = { ...prev };
        for (const did of dynamicToDelete) delete next[did];
        return next;
      });
    }

    setFolders(prev => prev.filter(f => !folderIdsToDelete.includes(f.id)));
    setFiles(prev => prev.filter(f => f.parentId === null || !folderIdsToDelete.includes(f.parentId)));

    if (isSupabaseConfigured) {
      await supabase.from('presentation_meta').delete().in('folder_id', folderIdsToDelete);
      await supabase.from('folders').delete().in('id', folderIdsToDelete);
    }
  };

  const renameFolder = async (id: string, name: string) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, name } : f));
    if (isSupabaseConfigured) {
      await supabase.from('folders').update({ name }).eq('id', id);
    }
  };

  const moveItemToFolder = async (itemId: string, itemType: 'file' | 'folder', newParentId: string | null) => {
    if (itemType === 'folder') {
      setFolders(prev => prev.map(f => f.id === itemId ? { ...f, parentId: newParentId } : f));
      if (isSupabaseConfigured) {
        await supabase.from('folders').update({ parent_id: newParentId }).eq('id', itemId);
      }
    } else {
      setFiles(prev => prev.map(f => f.id === itemId ? { ...f, parentId: newParentId } : f));
      if (isSupabaseConfigured) {
        await supabase.from('presentation_meta').upsert({ id: itemId, folder_id: newParentId });
      }
    }
  };

  // Alias kept for backward compatibility
  const moveToFolder = async (fileId: string, folderId: string | null) => {
    await moveItemToFolder(fileId, 'file', folderId);
  };

  const toggleStar = async (fileId: string) => {
    let newStarred = false;
    setFiles(prev => prev.map(f => {
      if (f.id === fileId) { newStarred = !f.starred; return { ...f, starred: newStarred }; }
      return f;
    }));
    if (isSupabaseConfigured) {
      await supabase.from('presentation_meta').upsert({ id: fileId, starred: newStarred });
    }
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, ...updates } as FolderItem : f));
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } as FileItem : f));
  };

  const deleteItem = (id: string) => {
    // Clean up localStorage if this is a dynamic presentation
    const target = files.find(f => f.id === id);
    if (target?.isDynamic) {
      saveDynamicEntries(loadDynamicEntries().filter(e => e.id !== id));
      setDynamicCodeMap(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
    setFolders(prev => prev.filter(f => f.id !== id));
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const addDynamicPresentation = ({ title, thumbnail, author, code, parentId = null }: { title: string; thumbnail: string; author: string; code: string; parentId?: string | null }) => {
    const entry: DynamicEntry = {
      id: `dynamic-${Date.now()}`,
      title, thumbnail, author, code,
      createdAt: new Date().toISOString().split('T')[0],
      parentId,
      starred: false,
    };
    const existing = loadDynamicEntries();
    saveDynamicEntries([...existing, entry]);
    setFiles(prev => [...prev, dynamicEntryToFileItem(entry)]);
    setDynamicCodeMap(prev => ({ ...prev, [entry.id]: code }));
  };

  const updateDynamicCode = (id: string, code: string) => {
    const updated = loadDynamicEntries().map(e => e.id === id ? { ...e, code } : e);
    saveDynamicEntries(updated);
    setDynamicCodeMap(prev => ({ ...prev, [id]: code }));
  };

  const updateDynamicMeta = (id: string, updates: { title?: string; thumbnail?: string }) => {
    const updated = loadDynamicEntries().map(e => e.id === id ? { ...e, ...updates } : e);
    saveDynamicEntries(updated);
    setFiles(prev => prev.map(f => f.id === id ? {
      ...f,
      ...(updates.title ? { name: updates.title } : {}),
      ...(updates.thumbnail ? { thumbnail: updates.thumbnail } : {}),
    } : f));
  };

  const setCurrentFolder = (folderId: string | null) => setCurrentFolderId(folderId);
  const addSharedUser = (user: SharedUser) => setSharedUsers(prev => [...prev, user]);
  const updateSharedUser = (id: string, updates: Partial<SharedUser>) =>
    setSharedUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  const deleteSharedUser = (id: string) =>
    setSharedUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'deleted' as const } : u));
  const getItemsByParent = (parentId: string | null) => items.filter(item => item.parentId === parentId);

  const getCurrentFolderPath = (): FolderItem[] => {
    if (!currentFolderId) return [];
    const path: FolderItem[] = [];
    let currentId: string | null = currentFolderId;
    while (currentId) {
      const folder = folders.find(f => f.id === currentId);
      if (folder) { path.unshift(folder); currentId = folder.parentId; } else break;
    }
    return path;
  };

  return (
    <AppContext.Provider value={{
      items, sharedUsers, currentFolderId, isLoading, dynamicCodeMap,
      addFolder, deleteFolder, renameFolder, moveItemToFolder, moveToFolder, toggleStar,
      updateItem, deleteItem, setCurrentFolder,
      addSharedUser, updateSharedUser, deleteSharedUser,
      getItemsByParent, getCurrentFolderPath, isDescendantOf,
      addDynamicPresentation, updateDynamicCode, updateDynamicMeta,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
}
