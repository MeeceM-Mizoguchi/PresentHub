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

export const presentationRegistry: PresentationEntry[] = [
  meeceIntroPresentation,
];
