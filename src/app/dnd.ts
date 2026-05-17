export const DRAG_TYPE = 'PRESENTHUB_ITEM';

export interface DragItem {
  id: string;
  itemType: 'file' | 'folder';
  parentId: string | null;
}
