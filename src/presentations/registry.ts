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
import { aiLabPresentation } from './ai-lab';
import { devticketPresentation } from './devticket';
import { smallProjectPresentation } from './small-project';
import { cadchangePresentation } from './cadchange';
import { wealthadvisorPresentation } from './wealthadvisor';
import { wealthadvisorV2Presentation } from './wealthadvisor-v2';
import { asahiKaseiTenantDxPresentation } from './asahi-kasei-tenant-dx';
import { mpCorePresentation } from './mp-core';
import { meeceSalesPresentation } from './meece-sales';

export const presentationRegistry: PresentationEntry[] = [
  meeceSalesPresentation,
  meeceIntroPresentation,
  maStatus2026Presentation,
  aiLabPresentation,
  devticketPresentation,
  smallProjectPresentation,
  cadchangePresentation,
  wealthadvisorPresentation,
  wealthadvisorV2Presentation,
  asahiKaseiTenantDxPresentation,
  mpCorePresentation,
];
