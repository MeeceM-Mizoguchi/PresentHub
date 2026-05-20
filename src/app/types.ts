export type UserStatus = 'pending' | 'active' | 'deleted';

export interface SharedUser {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  invitedAt: string;
  activatedAt?: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'file';
  parentId: string | null;
  thumbnail: string;
  lastModified: string;
  author: string;
  starred: boolean;
  sharedWith: string[]; // SharedUser IDs
}

export interface FolderItem {
  id: string;
  name: string;
  type: 'folder';
  parentId: string | null; // null for root folders
  sharedWith: string[]; // SharedUser IDs
}

export type Item = FileItem | FolderItem;
