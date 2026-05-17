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

import { demoPresentation } from './demo';
import { meeceIntroPresentation } from './meece-intro';

/**
 * Registry of all presentations.
 * When Claude creates a new presentation, import it here and add to this array.
 */
export const presentationRegistry: PresentationEntry[] = [
  demoPresentation,
  meeceIntroPresentation,
];
