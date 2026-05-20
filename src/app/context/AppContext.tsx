import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { Item, FolderItem, FileItem, SharedUser } from '../types';
import { presentationRegistry } from '../../presentations/registry';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAuth } from './AuthContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Direct REST helpers that bypass supabase.from() → getSession() → auth lock chain.
// supabase.from() internally calls getSession() on every request, which waits for the
// JS-level token-refresh lock. If that refresh is retrying (3× 10s = 30s), every
// query hangs. Using the access token we already have from onAuthStateChange skips
// the lock entirely.
function makeRestHeaders(token: string, extra?: Record<string, string>): Record<string, string> {
  return {
    'Authorization': `Bearer ${token}`,
    'apikey': SUPABASE_ANON_KEY,
    'Accept': 'application/json',
    ...extra,
  };
}

async function restGet<T>(path: string, token: string): Promise<T[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: makeRestHeaders(token),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`REST ${res.status}: ${await res.text()}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function restMutate(
  path: string,
  token: string,
  method: 'POST' | 'PATCH' | 'DELETE',
  body?: Record<string, unknown>,
  prefer?: string
): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const extra: Record<string, string> = {};
    if (body !== undefined) extra['Content-Type'] = 'application/json';
    // DELETE needs no Prefer header; POST/PATCH default to return=minimal
    const resolvedPrefer = prefer ?? (method !== 'DELETE' ? 'return=minimal' : undefined);
    if (resolvedPrefer) extra['Prefer'] = resolvedPrefer;

    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      method,
      headers: makeRestHeaders(token, extra),
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`REST ${res.status}: ${await res.text()}`);
  } finally {
    clearTimeout(timer);
  }
}

const DEFAULT_SHARED_USERS: SharedUser[] = [];

const LS_TITLE_OVERRIDES_KEY = 'presenthub_title_overrides';

function loadTitleOverrides(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(LS_TITLE_OVERRIDES_KEY) ?? '{}'); } catch { return {}; }
}

function saveTitleOverrides(data: Record<string, string>) {
  localStorage.setItem(LS_TITLE_OVERRIDES_KEY, JSON.stringify(data));
}

function buildFileItems(
  metaMap: Record<string, { folderId: string | null; starred: boolean }>,
  titleOverrides: Record<string, string> = {}
): FileItem[] {
  return presentationRegistry.map(entry => ({
    id: entry.meta.id,
    name: titleOverrides[entry.meta.id] ?? entry.meta.title,
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
  isSlowLoading: boolean;
  loadError: boolean;
  retryLoad: () => void;
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
  updateStaticTitle: (id: string, title: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>(() =>
    buildFileItems({}, loadTitleOverrides())
  );
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>(DEFAULT_SHARED_USERS);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSlowLoading, setIsSlowLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [loadTrigger, setLoadTrigger] = useState(0);
  const slowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const retryLoad = useCallback(() => {
    setLoadError(false);
    setLoadTrigger(c => c + 1);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) { setIsLoading(false); return; }

    const accessToken = session?.access_token;
    if (!accessToken) { setIsLoading(false); return; }

    setIsLoading(true);
    setLoadError(false);
    let cancelled = false;
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    slowTimerRef.current = setTimeout(() => setIsSlowLoading(true), 8000);

    const hardTimeoutId = setTimeout(() => {
      if (cancelled) return;
      cancelled = true;
      console.error('[AppContext] Hard timeout after 15s');
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
      setIsSlowLoading(false);
      setIsLoading(false);
      setLoadError(true);
    }, 15_000);

    async function load() {
      try {
        // Use restGet (direct REST with access token) to bypass supabase.from()'s
        // internal getSession() call, which blocks on the token-refresh JS lock.
        const [dbFolders, dbMeta] = await Promise.all([
          restGet<{ id: string; name: string; parent_id: string | null }>('folders?order=created_at', accessToken),
          restGet<{ id: string; folder_id: string | null; starred: boolean }>('presentation_meta', accessToken),
        ]);
        if (cancelled) return;
        setFolders(dbFolders.map(f => ({
          id: f.id, name: f.name, type: 'folder' as const, parentId: f.parent_id, sharedWith: [],
        })));
        const metaMap: Record<string, { folderId: string | null; starred: boolean }> = {};
        for (const row of dbMeta) metaMap[row.id] = { folderId: row.folder_id, starred: row.starred };
        setFiles(buildFileItems(metaMap, loadTitleOverrides()));
      } catch (err) {
        if (cancelled) return;
        console.error('[AppContext] Load error:', err);
        setLoadError(true);
      } finally {
        clearTimeout(hardTimeoutId);
        if (!cancelled) {
          if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
          setIsSlowLoading(false);
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
      clearTimeout(hardTimeoutId);
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  // session.access_token が変わる（トークンリフレッシュ）ときだけ再フェッチ
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTrigger, session?.access_token]);

  const items: Item[] = [...folders, ...files];

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
      const token = session?.access_token;
      if (!token) { setFolders(prev => prev.filter(f => f.id !== folder.id)); throw new Error('Not authenticated'); }
      try {
        await restMutate('folders', token, 'POST', { id: folder.id, name: folder.name, parent_id: folder.parentId });
      } catch (err) {
        console.error('addFolder error:', err);
        setFolders(prev => prev.filter(f => f.id !== folder.id));
        throw err;
      }
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
    setFolders(prev => prev.filter(f => !folderIdsToDelete.includes(f.id)));
    setFiles(prev => prev.filter(f => f.parentId === null || !folderIdsToDelete.includes(f.parentId)));

    if (isSupabaseConfigured && folderIdsToDelete.length > 0) {
      const token = session?.access_token;
      if (!token) return;
      const ids = folderIdsToDelete.join(',');
      await restMutate(`presentation_meta?folder_id=in.(${ids})`, token, 'DELETE');
      await restMutate(`folders?id=in.(${ids})`, token, 'DELETE');
    }
  };

  const renameFolder = async (id: string, name: string) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, name } : f));
    if (isSupabaseConfigured) {
      const token = session?.access_token;
      if (token) await restMutate(`folders?id=eq.${id}`, token, 'PATCH', { name });
    }
  };

  const moveItemToFolder = async (itemId: string, itemType: 'file' | 'folder', newParentId: string | null) => {
    const token = isSupabaseConfigured ? (session?.access_token ?? null) : null;

    if (itemType === 'folder') {
      const prev_parent = folders.find(f => f.id === itemId)?.parentId;
      setFolders(prev => prev.map(f => f.id === itemId ? { ...f, parentId: newParentId } : f));
      if (token) {
        try {
          await restMutate(`folders?id=eq.${itemId}`, token, 'PATCH', { parent_id: newParentId });
        } catch (err) {
          console.error('moveFolder error:', err);
          setFolders(prev => prev.map(f => f.id === itemId ? { ...f, parentId: prev_parent ?? null } : f));
        }
      }
    } else {
      const prev_parent = files.find(f => f.id === itemId)?.parentId;
      setFiles(prev => prev.map(f => f.id === itemId ? { ...f, parentId: newParentId } : f));
      if (token) {
        try {
          await restMutate('presentation_meta', token, 'POST', { id: itemId, folder_id: newParentId }, 'resolution=merge-duplicates,return=minimal');
        } catch (err) {
          console.error('moveFile error:', err);
          setFiles(prev => prev.map(f => f.id === itemId ? { ...f, parentId: prev_parent ?? null } : f));
        }
      }
    }
  };

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
      const token = session?.access_token;
      if (token) await restMutate('presentation_meta', token, 'POST', { id: fileId, starred: newStarred }, 'resolution=merge-duplicates,return=minimal');
    }
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, ...updates } as FolderItem : f));
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } as FileItem : f));
  };

  const deleteItem = (id: string) => {
    setFolders(prev => prev.filter(f => f.id !== id));
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const updateStaticTitle = (id: string, title: string) => {
    const overrides = loadTitleOverrides();
    saveTitleOverrides({ ...overrides, [id]: title });
    setFiles(prev => prev.map(f => f.id === id ? { ...f, name: title } : f));
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
      items, sharedUsers, currentFolderId, isLoading, isSlowLoading, loadError, retryLoad,
      addFolder, deleteFolder, renameFolder, moveItemToFolder, moveToFolder, toggleStar,
      updateItem, deleteItem, setCurrentFolder,
      addSharedUser, updateSharedUser, deleteSharedUser,
      getItemsByParent, getCurrentFolderPath, isDescendantOf,
      updateStaticTitle,
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
