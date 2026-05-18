import React, { ReactElement } from 'react';
import { motion } from 'motion/react';

export async function compileCode(code: string): Promise<ReactElement[]> {
  const { transform } = await import('@babel/standalone');

  const cleaned = code
    .replace(/^import\s+type\s+.+$/gm, '')
    .replace(/^import\s+.+$/gm, '')
    .trim();

  let intermediate: string;
  try {
    intermediate = transform(cleaned, {
      filename: 'presentation.tsx',
      presets: [
        ['typescript', { allExtensions: true, isTSX: true }],
        ['react', { runtime: 'classic' }],
      ],
    }).code ?? '';
  } catch (e) {
    throw new Error(`コンパイルエラー: ${(e as Error).message}`);
  }

  const capturable = intermediate
    .replace(/export\s+const\s+(\w+)\s*=/g, '__capture.$1 =')
    .replace(/export\s+default\s+/g, '__capture.__default = ')
    .replace(/export\s+\{[^}]*\}/g, '')
    .replace(/export\s+function\s+(\w+)/g, 'function $1')
    .replace(/export\s+class\s+(\w+)/g, 'class $1');

  const capture: Record<string, unknown> = {};
  const capturedSlides: ReactElement[] = [];

  const scope: Record<string, unknown> = {
    React,
    motion,
    useState: React.useState,
    useEffect: React.useEffect,
    useRef: React.useRef,
    useCallback: React.useCallback,
    render: (slides: ReactElement[]) => capturedSlides.push(...slides),
    __capture: capture,
  };

  try {
    // eslint-disable-next-line no-new-func
    new Function(...Object.keys(scope), capturable)(...Object.values(scope));
  } catch (e) {
    throw new Error(`実行エラー: ${(e as Error).message}`);
  }

  if (capturedSlides.length > 0) return capturedSlides;

  for (const value of Object.values(capture)) {
    if (
      value &&
      typeof value === 'object' &&
      'slides' in (value as object) &&
      Array.isArray((value as { slides: unknown }).slides)
    ) {
      return (value as { slides: ReactElement[] }).slides;
    }
  }

  throw new Error('スライドが見つかりません。');
}
