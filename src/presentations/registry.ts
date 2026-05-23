import type { ReactElement } from 'react';

export interface PresentationMeta {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  createdAt: string;
}

export interface PresentationEntry {
  meta: PresentationMeta;
  slides: ReactElement[];
}

import { meeceIntroPresentation } from './meece-intro';
import { maStatus2026Presentation } from './ma-status-2026';

export const presentationRegistry: PresentationEntry[] = [
  meeceIntroPresentation,
  maStatus2026Presentation,
];
