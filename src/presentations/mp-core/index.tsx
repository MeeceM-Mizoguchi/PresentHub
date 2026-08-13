import {
  Users,
  Package,
  FileSignature,
  Smartphone,
  Receipt,
  TrendingDown,
  Rocket,
  Blocks,
  Brain,
  Unlock,
  TriangleAlert,
  Plus,
  LayoutDashboard,
  Network,
  Layers,
  ArrowRightLeft,
  UserRound,
  Info,
  Ban,
  Check,
  Flag,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { PresentationEntry } from '../registry';

/* ============================================================
   株式会社モバイル・プランニング 御中
   基幹システム「MP Core」フルスクラッチ開発プロジェクト
   ご提案元：Meece株式会社

   Design system : "MP BRAND"
   ─ mobile-p.co.jp のブランドトーンに準拠
     ・英語大見出し（ヘビーグロテスク）＋ 日本語小見出しの二段構え
     ・ブランド三角モチーフ（イエロー / ティール / ブルー）
     ・ホワイト × ライトグレー面 × 角丸 × 円形アイコンバッジ
     ・プライマリ＝MP ブルー、テキスト＝ニアブラック
   ─ 出力前提：PDF（1280 x 720 / html-to-image → JPEG）
      ・アニメーション/トランジション不使用（2frameで撮影されるため）
      ・Webフォント不使用（システムフォントのみ）
      ・背景は必ず不透明（JPEGは透過を持てない）
   ============================================================ */

/* ---------------- ブランドトークン ---------------- */

const INK = '#1A1A1A';
const BODY = '#3D3D3D';
const SUB = '#6E6E6E';
const MUTE = '#9A9A9A';
const WHITE = '#FFFFFF';
const SURFACE = '#F2F2F2'; // ライトグレー面
const LINE = '#E4E4E4';
const HAIR = '#EDEDED';

const BLUE = '#1466CC'; // MP ブルー（プライマリ）
const BLUE_DEEP = '#0F4E9C';
const BLUE_TINT = '#E9F1FC';
const BLUE_LINE = '#C6DAF4'; // ブルーティント上の罫
const YELLOW = '#F7E75E';
const TEAL = '#00C3BB';
const TEAL_INK = '#07897F'; // ティールの文字・面用（白文字が乗る濃度）
const TEAL_TINT = '#E1F5F3';
const TEAL_LINE = '#B6E2DC'; // ティールティント上の罫

const DISPLAY = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"; // 英語大見出し（900）
const SANS =
  "'Yu Gothic UI', 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Meiryo', sans-serif";

const SLIDE = 'w-full h-[720px] relative overflow-hidden';
const DECK_TAG = '基幹システム「MP Core」フルスクラッチ開発プロジェクト';
const PAD_X = 58;
const TOTAL = 8;

/* ---------------- 三角モチーフ ---------------- */

function TriUp({ w, h, color }: { w: number; h: number; color: string }) {
  return (
    <span
      style={{
        display: 'block',
        width: 0,
        height: 0,
        borderLeft: `${w / 2}px solid transparent`,
        borderRight: `${w / 2}px solid transparent`,
        borderBottom: `${h}px solid ${color}`,
      }}
    />
  );
}

function TriRight({ w, h, color }: { w: number; h: number; color: string }) {
  return (
    <span
      style={{
        display: 'block',
        width: 0,
        height: 0,
        borderTop: `${h / 2}px solid transparent`,
        borderBottom: `${h / 2}px solid transparent`,
        borderLeft: `${w}px solid ${color}`,
      }}
    />
  );
}

/* ---------------- 見出し右のメタ情報（要点の3項目） ---------------- */

function HeadMeta({ items }: { items: [string, string][] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      {items.map(([label, value], i) => (
        <div
          key={label}
          style={{
            paddingLeft: i === 0 ? 0 : 20,
            marginLeft: i === 0 ? 0 : 20,
            borderLeft: i === 0 ? 'none' : `1px solid ${LINE}`,
            textAlign: 'right',
          }}
        >
          <p style={{ fontSize: 9.5, fontWeight: 800, color: MUTE, letterSpacing: '0.14em' }}>{label}</p>
          <p style={{ fontSize: 13.5, fontWeight: 800, color: INK, marginTop: 6, whiteSpace: 'nowrap' }}>{value}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- ページ枠 ---------------- */

function Frame({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className={SLIDE} style={{ background: WHITE, fontFamily: SANS }}>
      {/* ヘッダー */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 54,
          padding: `0 ${PAD_X}px`,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderBottom: `1px solid ${HAIR}`,
          background: WHITE,
          zIndex: 3,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 800, color: BLUE, letterSpacing: '0.04em' }}>
            {String(n).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: DISPLAY, fontSize: 13, fontWeight: 600, color: LINE }}>/</span>
          <span style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 700, color: MUTE, letterSpacing: '0.04em' }}>
            {String(TOTAL).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* 本文 */}
      <div
        style={{
          position: 'absolute',
          top: 54,
          left: 0,
          right: 0,
          bottom: 46,
          padding: `34px ${PAD_X}px 0`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
        }}
      >
        {children}
      </div>

      {/* フッター */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 46,
          padding: `0 ${PAD_X}px`,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 3,
        }}
      >
        <span style={{ fontSize: 10.5, fontWeight: 600, color: MUTE, letterSpacing: '0.04em' }}>{DECK_TAG}</span>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: MUTE, letterSpacing: '0.04em' }}>Meece株式会社</span>
      </div>

      {/* 進捗バー（ブランド3色） */}
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 5, background: HAIR, zIndex: 4 }}>
        <div
          style={{
            width: `${(n / TOTAL) * 100}%`,
            height: '100%',
            backgroundImage: `linear-gradient(90deg, ${YELLOW} 0%, ${TEAL} 50%, ${BLUE} 100%)`,
          }}
        />
      </div>
    </div>
  );
}

/* ---------------- 見出し（英大＋和小のブランド様式） ---------------- */

function Head({ en, ja, aside, lead }: { en: string; ja: string; aside?: React.ReactNode; lead?: React.ReactNode }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 28 }}>
        <div style={{ flexShrink: 0 }}>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: 52,
              fontWeight: 900,
              color: INK,
              letterSpacing: '-0.015em',
              lineHeight: 1,
            }}
          >
            {en}
          </h2>
          <p style={{ fontSize: 14.5, fontWeight: 700, color: INK, letterSpacing: '0.06em', marginTop: 11 }}>{ja}</p>
        </div>
        {aside && <div style={{ paddingBottom: 2 }}>{aside}</div>}
      </div>

      {lead && <div style={{ marginTop: 26 }}>{lead}</div>}
    </div>
  );
}

/* ============================================================
   00 ／ 表紙（ページ番号なし）
   ============================================================ */

const CLIENT = '株式会社モバイル・プランニング';
const COVER_PAD = 72;

/** 表紙のブランドウェッジ（サムネイルと同じ イエロー→ティール→ブルー の対角3色） */
function CoverWedge() {
  return (
    <svg width={1280} height={720} viewBox="0 0 1280 720" style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}>
      <polygon points="1280,320 1280,380 940,720 880,720" fill={YELLOW} />
      <polygon points="1280,380 1280,480 1040,720 940,720" fill={TEAL} />
      <polygon points="1280,480 1280,720 1040,720" fill={BLUE} />
    </svg>
  );
}

const COVER_META: [string, string][] = [
  ['ご提案先', `${CLIENT} 御中`],
  ['ご提案元', 'Meece株式会社'],
  ['DATE', '2026年8月'],
];

const SlideCover = (
  <div className={SLIDE} style={{ background: WHITE, fontFamily: SANS }}>
    <CoverWedge />

    {/* 上部：ドキュメント種別 ／ 時期 */}
    <div
      style={{
        position: 'absolute',
        left: COVER_PAD,
        right: COVER_PAD,
        top: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <span style={{ width: 9, height: 9, background: BLUE }} />
        <span style={{ fontFamily: DISPLAY, fontSize: 11.5, fontWeight: 800, letterSpacing: '0.22em', color: BLUE }}>
          SYSTEM DEVELOPMENT PROPOSAL
        </span>
      </div>
      <span style={{ fontFamily: DISPLAY, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.14em', color: MUTE }}>2026.08</span>
    </div>
    <div style={{ position: 'absolute', left: COVER_PAD, top: 84, width: 1280 - COVER_PAD * 2, height: 1, background: HAIR, zIndex: 2 }} />

    {/* 宛先 */}
    <p
      style={{
        position: 'absolute',
        left: COVER_PAD,
        top: 194,
        fontSize: 17,
        fontWeight: 800,
        color: INK,
        letterSpacing: '0.04em',
        lineHeight: 1,
        zIndex: 2,
      }}
    >
      {CLIENT} 御中
    </p>

    {/* 主題 */}
    <h1
      style={{
        position: 'absolute',
        left: COVER_PAD,
        top: 238,
        fontFamily: DISPLAY,
        fontSize: 92,
        fontWeight: 900,
        color: INK,
        letterSpacing: '-0.025em',
        lineHeight: 1,
        zIndex: 2,
      }}
    >
      MP CORE
    </h1>

    <div
      style={{
        position: 'absolute',
        left: COVER_PAD,
        top: 358,
        width: 76,
        height: 4,
        backgroundImage: `linear-gradient(90deg, ${YELLOW} 0%, ${TEAL} 50%, ${BLUE} 100%)`,
        zIndex: 2,
      }}
    />

    <p
      style={{
        position: 'absolute',
        left: COVER_PAD,
        top: 388,
        fontSize: 25,
        fontWeight: 800,
        color: INK,
        letterSpacing: '-0.01em',
        lineHeight: 1.4,
        zIndex: 2,
      }}
    >
      基幹システム「MP Core」
      <span style={{ borderBottom: `3px solid ${YELLOW}` }}>フルスクラッチ開発</span>
      プロジェクト
    </p>

    <p
      style={{
        position: 'absolute',
        left: COVER_PAD,
        top: 438,
        fontSize: 14.5,
        fontWeight: 600,
        color: BODY,
        lineHeight: 1.8,
        zIndex: 2,
      }}
    >
      現行システム「G1」からの全面移行に向けたご提案
    </p>

    {/* 下部：提案先／提案元／時期 */}
    <div style={{ position: 'absolute', left: COVER_PAD, top: 588, width: 868, height: 1, background: LINE, zIndex: 2 }} />
    <div style={{ position: 'absolute', left: COVER_PAD, top: 610, display: 'flex', alignItems: 'stretch', zIndex: 2 }}>
      {COVER_META.map(([k, v], i) => (
        <div
          key={k}
          style={{
            paddingLeft: i === 0 ? 0 : 30,
            marginLeft: i === 0 ? 0 : 30,
            borderLeft: i === 0 ? 'none' : `1px solid ${LINE}`,
          }}
        >
          <p style={{ fontFamily: DISPLAY, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.20em', color: MUTE }}>{k}</p>
          <p style={{ fontSize: 14.5, fontWeight: 800, color: INK, marginTop: 7, whiteSpace: 'nowrap' }}>{v}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ============================================================
   01 ／ プロジェクト概要
   ============================================================ */

const DOMAINS = [
  { icon: Users, label: '顧客データ' },
  { icon: Package, label: '商品・料金データ' },
  { icon: FileSignature, label: '受注・契約データ' },
  { icon: Smartphone, label: '端末・在籍データ' },
  { icon: Receipt, label: '請求・入金データ' },
];

const Slide1 = (
  <Frame n={1}>
    <Head
      en="OVERVIEW"
      ja="プロジェクト概要"
      aside={
        <HeadMeta
          items={[
            ['METHOD', 'フルスクラッチ開発'],
            ['SCOPE', '基幹システム全領域'],
            ['FROM', '現行システム「G1」'],
          ]}
        />
      }
      lead={
        <p style={{ fontSize: 18.5, lineHeight: 1.9, color: BODY, fontWeight: 600 }}>
          モバイル・プランニング社としての基幹システムを
          <span style={{ color: INK, fontWeight: 800, borderBottom: `3px solid ${YELLOW}` }}>フルスクラッチで開発</span>
          し、
          <br />
          現行システム「<span style={{ color: INK, fontWeight: 800 }}>G1</span>」から乗り換えるプロジェクト。
        </p>
      }
    />

    {/* ── 移行図 ───────────────────────────── */}
    <div style={{ marginTop: 26, flex: 1, display: 'flex', alignItems: 'stretch', minHeight: 0, paddingBottom: 18 }}>
      {/* 現行 G1 */}
      <div
        style={{
          flex: 1,
          background: SURFACE,
          borderRadius: 14,
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', color: MUTE }}>
              CURRENT
            </span>
            <span style={{ fontSize: 15, fontWeight: 800, color: INK }}>現行</span>
          </div>
          <span
            style={{
              fontFamily: DISPLAY,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.10em',
              color: SUB,
              background: WHITE,
              borderRadius: 999,
              padding: '4px 12px',
            }}
          >
            G1
          </span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DOMAINS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              style={{
                flex: 1,
                background: WHITE,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '0 14px',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: SURFACE,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={14} color={SUB} strokeWidth={2} />
              </span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: BODY }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 移行 */}
      <div
        style={{
          width: 132,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontFamily: DISPLAY, fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', color: BLUE }}>
          MIGRATION
        </span>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            background: INK,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ marginLeft: 3 }}>
            <TriRight w={15} h={17} color={WHITE} />
          </span>
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: INK }}>全面移行</span>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: SUB, marginTop: -6 }}>データ＋業務</span>
      </div>

      {/* MP Core */}
      <div
        style={{
          flex: 1,
          background: BLUE,
          borderRadius: 14,
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 装飾三角 */}
        <div style={{ position: 'absolute', right: -14, bottom: -14, opacity: 0.5 }}>
          <TriUp w={110} h={96} color={BLUE_DEEP} />
        </div>
        <div style={{ position: 'absolute', right: 52, bottom: -10 }}>
          <TriUp w={44} h={38} color={TEAL} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span
              style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.72)' }}
            >
              NEXT
            </span>
            <span style={{ fontSize: 15, fontWeight: 800, color: WHITE }}>MP Core</span>
          </div>
          <span
            style={{
              fontFamily: DISPLAY,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.10em',
              color: INK,
              background: YELLOW,
              borderRadius: 999,
              padding: '4px 12px',
            }}
          >
            NEW
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            paddingBottom: 8,
          }}
        >
          <p style={{ fontSize: 30, fontWeight: 800, color: WHITE, letterSpacing: '0.01em', lineHeight: 1.3 }}>新規立ち上げ</p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.85,
              textAlign: 'center',
              marginTop: 12,
            }}
          >
            自社要件に最適化した
            <br />
            フルスクラッチ基幹システム
          </p>

          <div style={{ display: 'flex', gap: 7, marginTop: 20 }}>
            {['FULL SCRATCH', '自社最適化', '拡張性'].map(t => (
              <span
                key={t}
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: WHITE,
                  border: '1px solid rgba(255,255,255,0.45)',
                  borderRadius: 999,
                  padding: '5px 12px',
                  letterSpacing: '0.04em',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ============================================================
   02 ／ システム構成整理
   ============================================================ */

type SysType = 'SaaS' | 'IaaS' | 'PaaS';

const TYPE_STYLE: Record<SysType, { bg: string; fg: string }> = {
  SaaS: { bg: BLUE, fg: WHITE },
  IaaS: { bg: INK, fg: WHITE },
  PaaS: { bg: TEAL, fg: INK },
};

function TypePill({ type, note }: { type: SysType; note?: string }) {
  const s = TYPE_STYLE[type];
  return (
    <span
      style={{
        fontFamily: DISPLAY,
        fontSize: 9.5,
        fontWeight: 800,
        letterSpacing: '0.08em',
        color: s.fg,
        background: s.bg,
        borderRadius: 999,
        padding: '3px 9px',
        whiteSpace: 'nowrap',
      }}
    >
      {type}
      {note}
    </span>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: 9.5,
        fontWeight: 700,
        color: SUB,
        background: SURFACE,
        borderRadius: 999,
        padding: '3px 9px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

/** 構成図のノード（1280x720 固定キャンバス上の絶対座標で配置する） */
function Node({
  x,
  y,
  w,
  h,
  type,
  typeNote,
  platform,
  name,
  sub,
  chips = [],
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  type: SysType;
  typeNote?: string;
  platform?: string;
  name: string;
  sub?: string;
  chips?: string[];
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        boxSizing: 'border-box',
        background: WHITE,
        borderRadius: 10,
        padding: '8px 13px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <TypePill type={type} note={typeNote} />
        {platform && (
          <span style={{ fontFamily: DISPLAY, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', color: MUTE }}>
            {platform}
          </span>
        )}
      </div>
      <div>
        <p style={{ fontSize: 12.5, fontWeight: 800, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{name}</p>
        {sub && <p style={{ fontSize: 10.5, fontWeight: 600, color: SUB, marginTop: 2 }}>{sub}</p>}
      </div>
      {chips.length > 0 && (
        <div style={{ display: 'flex', gap: 5 }}>
          {chips.map(c => (
            <Chip key={c} label={c} />
          ))}
        </div>
      )}
    </div>
  );
}

/** 業務グループの見出しタグ（枠で囲わず、タグと近接でグルーピングする） */
function GroupTag({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <span
      style={{
        position: 'absolute',
        left: x,
        top: y,
        height: 22,
        display: 'inline-flex',
        alignItems: 'center',
        background: WHITE,
        borderRadius: 999,
        padding: '0 13px',
        fontSize: 11,
        fontWeight: 800,
        lineHeight: 1,
        color: INK,
        letterSpacing: '0.08em',
        zIndex: 2,
      }}
    >
      {label}
    </span>
  );
}

/** 構成図キャンバスの高さ（1164 x DH の固定座標系で組む） */
const DH = 406;

const Slide2 = (
  <Frame n={2}>
    <Head
      en="SYSTEM MAP"
      ja="システム構成整理"
      aside={
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {(
            [
              ['SaaS', '外部サービス'],
              ['IaaS', '自社構築'],
              ['PaaS', '基盤サービス'],
            ] as [SysType, string][]
          ).map(([t, desc]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: TYPE_STYLE[t].bg }} />
              <span style={{ fontFamily: DISPLAY, fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: INK }}>{t}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: MUTE }}>{desc}</span>
            </div>
          ))}
        </div>
      }
      lead={
        <p style={{ fontSize: 18.5, lineHeight: 1.9, color: BODY, fontWeight: 600 }}>
          既存サービスは変更せず、それらのデータが集約する
          <span style={{ color: INK, fontWeight: 800, borderBottom: `3px solid ${YELLOW}` }}>「G1」だけ</span>
          を MP Core に置き換える。
        </p>
      }
    />

    {/* ── 構成図：現在のシステム構成を1枚のパネルで示し、右のブラケットで流用／刷新を注釈する ── */}
    <div style={{ marginTop: 16, position: 'relative', width: '100%', height: DH, flexShrink: 0 }}>
      {/* パネル：現在のシステム構成 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 800,
          height: DH,
          background: SURFACE,
          borderRadius: 16,
        }}
      />
      <div style={{ position: 'absolute', left: 18, top: 15, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
        <span style={{ width: 8, height: 8, background: BLUE }} />
        <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.20em', color: BLUE }}>AS-IS</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: INK, letterSpacing: '0.04em' }}>現在のシステム構成</span>
      </div>
      <div style={{ position: 'absolute', left: 18, top: 44, width: 764, height: 1, background: '#E1E1E1' }} />

      {/* 業務グループ（枠なし・タグと近接でまとめる） */}
      <GroupTag x={18} y={52} label="申込受付" />
      <GroupTag x={18} y={182} label="決済" />
      <GroupTag x={206} y={182} label="管理" />

      {/* 各システム */}
      <Node x={18} y={82} w={244} h={82} type="IaaS" platform="AWS" name="netage" sub="自社EC" />
      <Node x={274} y={82} w={244} h={82} type="SaaS" name="Yahoo!ショッピング / 楽天市場" chips={['管理画面']} />
      <Node x={18} y={212} w={160} h={76} type="SaaS" name="ペイジェント" sub="決済代行" />
      <Node x={206} y={212} w={282} h={92} type="SaaS" name="CROSS MALL" sub="モール一元管理" chips={['管理画面']} />
      <Node x={500} y={212} w={282} h={92} type="PaaS" typeNote="等" platform="さくら" name="barn" sub="回線管理" chips={['データベース']} />

      {/* 刷新対象ゾーン（この範囲だけが MP Core に置き換わる） */}
      <div
        style={{
          position: 'absolute',
          left: 196,
          top: 322,
          width: 596,
          height: 74,
          boxSizing: 'border-box',
          background: '#E4EFFB',
          border: `2px solid ${BLUE}`,
          borderRadius: 14,
          boxShadow: '0 0 0 5px rgba(20,102,204,0.08)',
          zIndex: 1,
        }}
      />

      {/* G1（現行構成の一部。ここだけが刷新対象） */}
      <div
        style={{
          position: 'absolute',
          left: 206,
          top: 334,
          width: 576,
          height: 52,
          boxSizing: 'border-box',
          background: INK,
          borderRadius: 9,
          padding: '0 15px',
          display: 'flex',
          alignItems: 'center',
          gap: 13,
          zIndex: 2,
        }}
      >
        <p style={{ fontSize: 24, fontWeight: 900, color: WHITE, letterSpacing: '-0.01em', lineHeight: 1 }}>G1</p>
        <span style={{ fontFamily: DISPLAY, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', color: 'rgba(255,255,255,0.52)' }}>
          IaaS · AWS
        </span>
        <span style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.22)' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {['管理画面', 'データベース'].map(c => (
            <span
              key={c}
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.82)',
                border: '1px solid rgba(255,255,255,0.32)',
                borderRadius: 999,
                padding: '3px 9px',
                whiteSpace: 'nowrap',
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <span style={{ flex: 1 }} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: INK,
            background: YELLOW,
            borderRadius: 999,
            padding: '5px 12px',
            whiteSpace: 'nowrap',
          }}
        >
          ★ 刷新対象
        </span>
      </div>

      {/* データフロー ＋ 右側ブラケット注釈 */}
      <svg width="100%" height={DH} viewBox={`0 0 1164 ${DH}`} style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}>
        {/* システム間のデータフロー */}
        <g stroke="#B2B8C0" strokeWidth={1.4} fill="none">
          {/* netage → ペイジェント */}
          <polyline points="140,164 140,176 98,176 98,204" />
          {/* Yahoo!/楽天 → CROSS MALL */}
          <polyline points="396,164 396,176 347,176 347,204" />
          {/* ペイジェント → 刷新対象ゾーン */}
          <polyline points="98,288 98,359 188,359" />
          {/* CROSS MALL → 刷新対象ゾーン */}
          <polyline points="347,304 347,314" />
          {/* barn → 刷新対象ゾーン */}
          <polyline points="641,304 641,314" />
        </g>
        <g fill="#B2B8C0">
          <polygon points="93,204 103,204 98,212" />
          <polygon points="342,204 352,204 347,212" />
          <polygon points="188,354 188,364 196,359" />
          <polygon points="342,314 352,314 347,322" />
          <polygon points="636,314 646,314 641,322" />
        </g>

        {/* 流用ゾーンのブラケット */}
        <g fill="none" stroke="#B2B8C0" strokeWidth={1.6}>
          <path d="M808,52 L816,52 L816,304 L808,304" />
          <path d="M816,178 L850,178" />
        </g>
        <polygon points="850,173 850,183 858,178" fill="#B2B8C0" />

        {/* 刷新ゾーンのブラケット */}
        <g fill="none" stroke={BLUE} strokeWidth={1.8}>
          <path d="M808,322 L816,322 L816,396 L808,396" />
          <path d="M816,359 L850,359" />
        </g>
        <polygon points="850,354 850,364 858,359" fill={BLUE} />
      </svg>

      {/* 右：注釈ラベル */}
      <div style={{ position: 'absolute', left: 866, top: 178, transform: 'translateY(-50%)', width: 298 }}>
        <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.20em', color: MUTE }}>KEEP</span>
        <p style={{ fontSize: 21, fontWeight: 800, color: INK, letterSpacing: '-0.01em', marginTop: 7 }}>既存のまま、流用</p>
        <p style={{ fontSize: 12, fontWeight: 600, color: SUB, lineHeight: 1.75, marginTop: 8 }}>
          申込受付・決済・管理の各サービスは
          <br />
          今回のスコープ外。変更しない。
        </p>
      </div>

      <div style={{ position: 'absolute', left: 866, top: 359, transform: 'translateY(-50%)', width: 298 }}>
        <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.20em', color: BLUE }}>RENEW</span>
        <p style={{ fontSize: 21, fontWeight: 800, color: BLUE, letterSpacing: '-0.01em', marginTop: 7 }}>新システムへ刷新</p>
        <p style={{ fontSize: 12, fontWeight: 600, color: SUB, lineHeight: 1.75, marginTop: 8 }}>
          G1 のみをフルスクラッチで作り直し、
          <br />
          「MP Core」に置き換える。
        </p>
      </div>
    </div>
  </Frame>
);

/* ============================================================
   03 ／ プロジェクトの目的
   ============================================================ */

const DH3 = 410;

const MERITS = [
  { icon: TrendingDown, text: 'メンテナンスのコスト削減が見込める' },
  { icon: Rocket, text: '事業展開のスピードが加速する' },
  { icon: Blocks, text: 'UIや他システムとの接続が自由になる' },
  { icon: Brain, text: 'データ利活用やAIなどへの汎用性が高まる' },
  { icon: Unlock, text: 'ベンダー依存から脱却できる' },
];

/** 事業チップ（G1 から放射状に伸びる先）。current 以外は「これから足したい事業」＝破線 */
const BIZ = [
  { top: 48, label: 'レンタル', current: true },
  { top: 80, label: '販売' },
  { top: 108, label: '他事業' },
  { top: 136, label: '他事業' },
  { top: 164, label: '他事業' },
];

const Slide3 = (
  <Frame n={3}>
    <Head
      en="PURPOSE"
      ja="プロジェクトの目的"
      aside={
        <HeadMeta
          items={[
            ['ISSUE', '他事業への拡張コスト'],
            ['SOLUTION', 'フルスクラッチ開発'],
            ['MERIT', '5つの効果'],
          ]}
        />
      }
      lead={
        <p style={{ fontSize: 18.5, lineHeight: 1.9, color: BODY, fontWeight: 600 }}>
          G1 はレンタル事業向けの基幹システム。他事業へ広げるたびに
          <span style={{ color: INK, fontWeight: 800, borderBottom: `3px solid ${YELLOW}` }}>拡張コストが膨らむ</span>。
        </p>
      }
    />

    <div style={{ marginTop: 16, position: 'relative', width: '100%', height: DH3, flexShrink: 0 }}>
      {/* ── 上段左：現状の課題 ── */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 636, height: 206, background: SURFACE, borderRadius: 16 }} />
      <div style={{ position: 'absolute', left: 20, top: 15, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
        <span style={{ width: 8, height: 8, background: INK }} />
        <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.20em', color: INK }}>ISSUE</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: INK, letterSpacing: '0.04em' }}>現状の課題</span>
      </div>
      <div style={{ position: 'absolute', left: 20, top: 44, width: 596, height: 1, background: '#E1E1E1' }} />

      {/* G1（現行基幹システム） */}
      <div
        style={{
          position: 'absolute',
          left: 22,
          top: 88,
          width: 100,
          height: 60,
          background: INK,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          zIndex: 2,
        }}
      >
        <p style={{ fontSize: 22, fontWeight: 900, color: WHITE, letterSpacing: '-0.01em', lineHeight: 1 }}>G1</p>
        <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.55)', lineHeight: 1, letterSpacing: '0.02em' }}>
          現行基幹システム
        </p>
      </div>

      {/* 事業チップ */}
      {BIZ.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 200,
            top: b.top,
            width: 132,
            height: 24,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '0 11px',
            borderRadius: 999,
            background: b.current ? WHITE : 'transparent',
            border: b.current ? 'none' : '1.5px dashed #C4C8CE',
            zIndex: 2,
          }}
        >
          {b.current ? (
            <span style={{ width: 6, height: 6, borderRadius: 999, background: BLUE, flexShrink: 0 }} />
          ) : (
            <Plus size={11} color={MUTE} strokeWidth={2.8} />
          )}
          <span
            style={{
              fontSize: 12.5,
              fontWeight: b.current ? 800 : 700,
              color: b.current ? INK : BODY,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {b.label}
          </span>
          {b.current && (
            <>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: SUB, lineHeight: 1 }}>現在</span>
            </>
          )}
        </div>
      ))}

      {/* コスト警告（拡張の説明を1枚に集約） */}
      <div
        style={{
          position: 'absolute',
          left: 368,
          top: 95,
          width: 248,
          height: 78,
          boxSizing: 'border-box',
          background: YELLOW,
          borderRadius: 10,
          padding: '13px 15px',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <TriangleAlert size={15} color={INK} strokeWidth={2.5} />
          <span style={{ fontSize: 14, fontWeight: 900, color: INK, lineHeight: 1, letterSpacing: '0.02em' }}>コスト大</span>
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(26,26,26,0.72)', lineHeight: 1.6, marginTop: 7 }}>
          他事業に向けた拡張は、
          <br />
          事業ごとに個別改修が発生する
        </p>
      </div>

      {/* ── 上段右：解決策 ── */}
      <div style={{ position: 'absolute', left: 704, top: 0, width: 460, height: 206, background: BLUE, borderRadius: 16 }} />
      <div style={{ position: 'absolute', left: 726, top: 15, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
        <span style={{ width: 8, height: 8, background: YELLOW }} />
        <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.20em', color: YELLOW }}>SOLUTION</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: WHITE, letterSpacing: '0.04em' }}>解決策</span>
      </div>
      <div style={{ position: 'absolute', left: 726, top: 44, width: 416, height: 1, background: 'rgba(255,255,255,0.28)' }} />

      <p
        style={{
          position: 'absolute',
          left: 726,
          top: 72,
          width: 416,
          fontSize: 25,
          fontWeight: 800,
          color: WHITE,
          lineHeight: 1.5,
          letterSpacing: '-0.01em',
          zIndex: 2,
        }}
      >
        基幹システムを
        <br />
        <span style={{ borderBottom: `3px solid ${YELLOW}` }}>フルスクラッチ</span>で開発する
      </p>

      <div
        style={{
          position: 'absolute',
          left: 726,
          top: 160,
          height: 24,
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.16)',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: 999,
          padding: '0 12px',
          fontSize: 11,
          fontWeight: 800,
          color: WHITE,
          letterSpacing: '0.04em',
          lineHeight: 1,
          zIndex: 2,
        }}
      >
        新基幹システム「MP Core」
      </div>

      {/* ── 下段：メリット ── */}
      <div style={{ position: 'absolute', left: 0, top: 232, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
        <span style={{ width: 8, height: 8, background: BLUE }} />
        <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.20em', color: BLUE }}>MERIT</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: INK, letterSpacing: '0.04em' }}>フルスクラッチ開発で得られるもの</span>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 262, width: 1164, height: 1, background: '#E1E1E1' }} />

      {MERITS.map(({ icon: Icon, text }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: [0, 236, 471, 707, 942][i],
            top: 274,
            width: 222,
            height: 136,
            boxSizing: 'border-box',
            background: WHITE,
            border: `1px solid ${LINE}`,
            borderRadius: 12,
            padding: '16px 17px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: '#EBF2FC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={17} color={BLUE} strokeWidth={2.2} />
            </span>
            <span style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 800, color: '#C9CDD3', letterSpacing: '0.04em' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: 13.5, fontWeight: 800, color: INK, lineHeight: 1.65, letterSpacing: '-0.01em' }}>{text}</p>
          </div>
        </div>
      ))}

      {/* 放射線・ブラケット・遷移矢印 */}
      <svg width="100%" height={DH3} viewBox={`0 0 1164 ${DH3}`} style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}>
        {/* G1 → 各事業（現在＝実線 / 拡張＝破線） */}
        <g stroke="#9AA1AA" strokeWidth={1.4} fill="none">
          <path d="M122,118 L194,60" />
        </g>
        <g stroke="#BCC1C8" strokeWidth={1.4} fill="none" strokeDasharray="4 4">
          <path d="M122,118 L194,92" />
          <path d="M122,118 L194,120" />
          <path d="M122,118 L194,148" />
          <path d="M122,118 L194,176" />
        </g>

        {/* 拡張対象のブラケット（レンタル行の下から始める） */}
        <g stroke="#9AA1AA" strokeWidth={1.5} fill="none">
          <path d="M340,80 L348,80 L348,188 L340,188" />
          <path d="M348,134 L362,134" />
        </g>

        {/* 課題 → 解決策 */}
        <g fill={INK}>
          <circle cx="670" cy="103" r="23" />
          <polygon points="665,94 665,112 679,103" fill={WHITE} />
        </g>
      </svg>
    </div>
  </Frame>
);

/* ============================================================
   04 ／ 開発要素
   ============================================================ */

const DH4 = 410;

const SCOPE = [
  {
    icon: LayoutDashboard,
    title: '管理画面',
    items: ['顧客 / 受注 / 契約', '端末 / 在庫', '配送 / 返却検品', '問合せ'],
  },
  {
    icon: Network,
    title: 'データ連携（API）',
    items: ['フロントシステムからのデータ連携', 'CROSS MALL / netage / barn', 'APIキー管理'],
  },
  {
    icon: Layers,
    title: 'マスタ管理',
    items: ['各種マスタ'],
  },
  {
    icon: ArrowRightLeft,
    title: 'データ移行',
    items: ['全データのカラム設計', 'データ移行の仕組み'],
  },
];

const Slide4 = (
  <Frame n={4}>
    <Head
      en="SCOPE"
      ja="開発要素"
      aside={
        <HeadMeta
          items={[
            ['ELEMENTS', '4つの開発要素'],
            ['PREMISE', '拡張前提で構築'],
          ]}
        />
      }
      lead={
        <p style={{ fontSize: 18.5, lineHeight: 1.9, color: BODY, fontWeight: 600 }}>
          MP Core は
          <span style={{ color: INK, fontWeight: 800, borderBottom: `3px solid ${YELLOW}` }}>4つの開発要素</span>
          で構成する。
        </p>
      }
    />

    <div style={{ marginTop: 16, position: 'relative', width: '100%', height: DH4, flexShrink: 0 }}>
      {SCOPE.map(({ icon: Icon, title, items }, i) => (
        <div
          key={title}
          style={{
            position: 'absolute',
            left: [0, 295, 590, 885][i],
            top: 0,
            width: 279,
            height: 322,
            boxSizing: 'border-box',
            background: SURFACE,
            borderRadius: 16,
            padding: '20px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* アイコン ＋ 連番 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                background: WHITE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={19} color={BLUE} strokeWidth={2.2} />
            </span>
            <span style={{ fontFamily: DISPLAY, fontSize: 13, fontWeight: 800, color: '#C4C8CE', letterSpacing: '0.04em' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>

          <p style={{ fontSize: 19, fontWeight: 800, color: INK, letterSpacing: '-0.01em', lineHeight: 1.3, marginTop: 16 }}>
            {title}
          </p>

          <div style={{ height: 1, background: '#DFDFDF', marginTop: 14 }} />

          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(it => (
              <div key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: BLUE, marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: BODY, lineHeight: 1.6 }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 前提 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 346,
          width: 1164,
          height: 64,
          boxSizing: 'border-box',
          background: INK,
          borderRadius: 14,
          padding: '0 26px',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, background: YELLOW }} />
          <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.20em', color: YELLOW }}>PREMISE</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: WHITE, letterSpacing: '0.04em' }}>前提</span>
        </div>
        <span style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.22)', flexShrink: 0 }} />
        <p style={{ fontSize: 17.5, fontWeight: 800, color: WHITE, letterSpacing: '-0.01em' }}>
          さらなる
          <span style={{ borderBottom: `3px solid ${YELLOW}` }}>拡張機能の開発もできる前提</span>
          でシステム構築を行う
        </p>
      </div>
    </div>
  </Frame>
);

/* ============================================================
   05 ／ 体制図
   ============================================================ */

const DH5 = 410;

/** 役割カード（帯の色に関わらず白カードで統一する） */
function RoleCard({ x, y, w, label, line }: { x: number; y: number; w: number; label: string; line: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: 72,
        boxSizing: 'border-box',
        background: WHITE,
        border: `1px solid ${line}`,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 12px',
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 800, color: INK, letterSpacing: '-0.01em', textAlign: 'center', lineHeight: 1.45 }}>
        {label}
      </span>
    </div>
  );
}

/** 組織帯の見出し（左端の社名ブロック）。両社は同格、アクセント色だけで識別する */
function OrgLabel({ y, kicker, name, accent }: { y: number; kicker: string; name: string; accent: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 24,
        top: y,
        width: 250,
        height: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <span style={{ width: 8, height: 8, background: accent, flexShrink: 0 }} />
        <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.20em', color: accent }}>
          {kicker}
        </span>
      </div>
      <span style={{ fontSize: 15, fontWeight: 800, color: INK, letterSpacing: '-0.01em', lineHeight: 1.5 }}>{name}</span>
    </div>
  );
}

/** 代表窓口カード（各社のアクセント色でベタ塗り） */
function ContactCard({ x, org, name, accent }: { x: number; org: string; name: string; accent: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: 296,
        width: 570,
        height: 114,
        boxSizing: 'border-box',
        background: accent,
        borderRadius: 16,
        padding: '0 26px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <span
        style={{
          width: 54,
          height: 54,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <UserRound size={25} color={WHITE} strokeWidth={2.1} />
      </span>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 8, height: 8, background: YELLOW, flexShrink: 0 }} />
          <span style={{ fontFamily: DISPLAY, fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', color: YELLOW }}>
            CONTACT
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.78)' }}>{org}</span>
        </div>
        <p style={{ fontSize: 30, fontWeight: 900, color: WHITE, letterSpacing: '-0.01em', lineHeight: 1.1, marginTop: 8 }}>
          {name}
        </p>
      </div>
    </div>
  );
}

const Slide5 = (
  <Frame n={5}>
    <Head
      en="TEAM"
      ja="体制図"
      aside={
        <HeadMeta
          items={[
            ['CLIENT', 'モバイル・プランニング 様'],
            ['PARTNER', 'Meece株式会社'],
          ]}
        />
      }
      lead={
        <p style={{ fontSize: 18.5, lineHeight: 1.9, color: BODY, fontWeight: 600 }}>
          両社に
          <span style={{ color: INK, fontWeight: 800, borderBottom: `3px solid ${YELLOW}` }}>代表窓口を1名ずつ</span>
          置き、PM 同士の連携でプロジェクトを推進する。
        </p>
      }
    />

    <div style={{ marginTop: 16, position: 'relative', width: '100%', height: DH5, flexShrink: 0 }}>
      {/* 帯：モバイル・プランニング様 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1164,
          height: 130,
          boxSizing: 'border-box',
          background: BLUE_TINT,
          border: `1px solid ${BLUE_LINE}`,
          borderRadius: 16,
        }}
      />
      <OrgLabel y={0} kicker="CLIENT" name="株式会社モバイル・プランニング 様" accent={BLUE} />
      <RoleCard x={286} y={29} w={276} label="PM" line={BLUE_LINE} />
      <RoleCard x={576} y={29} w={276} label="開発" line={BLUE_LINE} />
      <RoleCard x={866} y={29} w={276} label="事務" line={BLUE_LINE} />

      {/* 帯：Meece */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 146,
          width: 1164,
          height: 130,
          boxSizing: 'border-box',
          background: TEAL_TINT,
          border: `1px solid ${TEAL_LINE}`,
          borderRadius: 16,
        }}
      />
      <OrgLabel y={146} kicker="DEVELOPMENT PARTNER" name="Meece株式会社" accent={TEAL_INK} />
      <RoleCard x={286} y={175} w={203} label="PM" line={TEAL_LINE} />
      <RoleCard x={503} y={175} w={203} label="フロントエンドエンジニア" line={TEAL_LINE} />
      <RoleCard x={720} y={175} w={203} label="バックエンドエンジニア" line={TEAL_LINE} />
      <RoleCard x={937} y={175} w={203} label="インフラエンジニア" line={TEAL_LINE} />

      {/* 代表窓口 */}
      <ContactCard x={0} org="モバイル・プランニング 代表窓口" name="渡辺 様" accent={BLUE} />
      <ContactCard x={594} org="Meece 代表窓口" name="溝口" accent={TEAL_INK} />
    </div>
  </Frame>
);

/* ============================================================
   06 ／ 全体スケジュール
   ============================================================ */

const DH6 = 410;

const MONTHS = ['9月', '10月', '11月', '12月', '27年1月'];
const COL_X = 304; // 月カラムの開始 x
const COL_W = 172; // 月カラム幅（5列で 860 ＝ 1164 - 304）
const ROW_TOP = 46;
const ROW_H = 96;

const PHASES = [
  {
    kicker: 'PHASE 1',
    name: 'フェーズ1',
    desc: '現在のシステム通りにトレース・入れ替え開発',
    period: '9月 〜 11月',
    barX: 312,
    barW: 500,
    color: BLUE,
  },
  {
    kicker: 'PHASE 1.5',
    name: 'フェーズ1.5',
    desc: '現在のデータを移行',
    period: '12月',
    barX: 828,
    barW: 156,
    color: TEAL_INK,
  },
  {
    kicker: 'PHASE 2',
    name: 'フェーズ2',
    desc: '汎用化開発',
    period: '27年1月 〜',
    barX: 1000,
    barW: 164,
    color: BLUE,
    planned: true, // 別途計画＝破線
  },
];

const Slide6 = (
  <Frame n={6}>
    <Head
      en="SCHEDULE"
      ja="全体スケジュール"
      aside={
        <HeadMeta
          items={[
            ['PHASE 1', '9月〜11月'],
            ['PHASE 1.5', '12月'],
            ['PHASE 2', '27年1月〜'],
          ]}
        />
      }
      lead={
        <p style={{ fontSize: 18.5, lineHeight: 1.9, color: BODY, fontWeight: 600 }}>
          現行のトレース開発 → データ移行 → 汎用化開発の
          <span style={{ color: INK, fontWeight: 800, borderBottom: `3px solid ${YELLOW}` }}>3フェーズ</span>
          で進める。
        </p>
      }
    />

    <div style={{ marginTop: 16, position: 'relative', width: '100%', height: DH6, flexShrink: 0 }}>
      {/* 月ヘッダー */}
      <div
        style={{
          position: 'absolute',
          left: COL_X,
          top: 0,
          width: COL_W * 5,
          height: 40,
          background: SURFACE,
          borderRadius: 10,
        }}
      />
      {MONTHS.map((m, i) => (
        <div
          key={m}
          style={{
            position: 'absolute',
            left: COL_X + i * COL_W,
            top: 0,
            width: COL_W,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span style={{ fontSize: 12.5, fontWeight: 800, color: INK, letterSpacing: '0.04em' }}>{m}</span>
        </div>
      ))}

      {/* 罫線（縦のガイド ＋ 行の区切り） */}
      <svg width="100%" height={DH6} viewBox={`0 0 1164 ${DH6}`} style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}>
        <g stroke="#E8E8E8" strokeWidth={1}>
          {[1, 2, 3, 4].map(i => (
            <path key={i} d={`M${COL_X + i * COL_W},${ROW_TOP} L${COL_X + i * COL_W},${ROW_TOP + ROW_H * 3}`} />
          ))}
        </g>
        <g stroke="#E1E1E1" strokeWidth={1}>
          <path d={`M0,${ROW_TOP} L1164,${ROW_TOP}`} />
          <path d={`M0,${ROW_TOP + ROW_H} L1164,${ROW_TOP + ROW_H}`} />
          <path d={`M0,${ROW_TOP + ROW_H * 2} L1164,${ROW_TOP + ROW_H * 2}`} />
          <path d={`M0,${ROW_TOP + ROW_H * 3} L1164,${ROW_TOP + ROW_H * 3}`} />
        </g>
      </svg>

      {/* 各フェーズ */}
      {PHASES.map((p, i) => {
        const top = ROW_TOP + i * ROW_H;
        return (
          <div key={p.name}>
            {/* 左：フェーズ名 */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top,
                width: 288,
                height: ROW_H,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 6,
                zIndex: 2,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 8, height: 8, background: p.color, flexShrink: 0 }} />
                <span style={{ fontFamily: DISPLAY, fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', color: p.color }}>
                  {p.kicker}
                </span>
              </div>
              <span style={{ fontSize: 17, fontWeight: 800, color: INK, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{p.name}</span>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: SUB, lineHeight: 1.5 }}>{p.desc}</span>
            </div>

            {/* 右：バー */}
            <div
              style={{
                position: 'absolute',
                left: p.barX,
                top: top + 28,
                width: p.barW,
                height: 40,
                boxSizing: 'border-box',
                background: p.planned ? BLUE_TINT : p.color,
                border: p.planned ? `2px dashed ${p.color}` : 'none',
                borderRadius: p.planned ? '10px 0 0 10px' : 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 800,
                  color: p.planned ? p.color : WHITE,
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {p.period}
              </span>
            </div>
          </div>
        );
      })}

      {/* 注記 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 354,
          width: 1164,
          height: 56,
          boxSizing: 'border-box',
          background: SURFACE,
          borderRadius: 14,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Info size={17} color={SUB} strokeWidth={2.2} />
        <p style={{ fontSize: 13.5, fontWeight: 700, color: BODY }}>
          <span style={{ fontWeight: 800, color: INK }}>フェーズ2（汎用化開発）</span>
          については、別途計画を策定する。
        </p>
      </div>
    </div>
  </Frame>
);

/* ============================================================
   07 ／ 前提
   ============================================================ */

const DH7 = 410;

const PANEL_W = 560; // 前提パネル（左右2枚）の幅
const PAD_IN = 22; // パネル内側の余白
const R_X = 604; // 右パネルの左端

/** パネル見出し（■ ＋ 英字キッカー ＋ 和文 ＋ 罫） */
function PanelHead({
  x,
  kicker,
  ja,
  accent,
  w = PANEL_W,
}: {
  x: number;
  kicker: string;
  ja: string;
  accent: string;
  w?: number;
}) {
  return (
    <>
      <div style={{ position: 'absolute', left: x + PAD_IN, top: 15, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
        <span style={{ width: 8, height: 8, background: accent }} />
        <span style={{ fontFamily: DISPLAY, fontSize: 10.5, fontWeight: 800, letterSpacing: '0.20em', color: accent }}>{kicker}</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: INK, letterSpacing: '0.04em' }}>{ja}</span>
      </div>
      <div style={{ position: 'absolute', left: x + PAD_IN, top: 44, width: w - PAD_IN * 2, height: 1, background: '#E1E1E1' }} />
    </>
  );
}

/** 制限量を示すゲージ（無料＝低い / 有料＝満たされている、を長さで対比する） */
function Meter({ label, pct, color, track }: { label: string; pct: number; color: string; track: string }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: SUB, lineHeight: 1 }}>{label}</span>
        <span style={{ fontSize: 10, fontWeight: 800, color, letterSpacing: '0.04em', lineHeight: 1 }}>
          {pct >= 100 ? '十分' : '不足'}
        </span>
      </div>
      <div style={{ marginTop: 7, width: '100%', height: 8, borderRadius: 999, background: track, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 999, background: color }} />
      </div>
    </div>
  );
}

/** 料金プランの比較カード */
function PlanCard({
  x,
  tag,
  name,
  icon,
  iconBg,
  accent,
  track,
  gauges,
  verdict,
  verdictColor,
  dim,
}: {
  x: number;
  tag: string;
  name: string;
  icon: React.ReactNode;
  iconBg: string;
  accent: string;
  track: string;
  gauges: [string, number][];
  verdict: string;
  verdictColor: string;
  dim?: boolean;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: 116,
        width: 250,
        height: 196,
        boxSizing: 'border-box',
        background: WHITE,
        border: dim ? `1px solid ${LINE}` : `2px solid ${accent}`,
        borderRadius: 12,
        padding: '15px 16px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        <div>
          <p style={{ fontFamily: DISPLAY, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.18em', color: accent, lineHeight: 1 }}>
            {tag}
          </p>
          <p style={{ fontSize: 14.5, fontWeight: 800, color: INK, letterSpacing: '-0.01em', lineHeight: 1, marginTop: 6 }}>{name}</p>
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 13 }}>
        {gauges.map(([label, pct]) => (
          <Meter key={label} label={label} pct={pct} color={accent} track={track} />
        ))}
      </div>

      <span style={{ flex: 1 }} />

      <div
        style={{
          height: 30,
          borderRadius: 8,
          background: dim ? SURFACE : BLUE_TINT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 11.5, fontWeight: 800, color: verdictColor, letterSpacing: '0.02em' }}>{verdict}</span>
      </div>
    </div>
  );
}

/** パネル下部の注記（白カード） */
function PanelNote({ x, icon, children }: { x: number; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x + PAD_IN,
        top: 332,
        width: PANEL_W - PAD_IN * 2,
        height: 56,
        boxSizing: 'border-box',
        background: WHITE,
        borderRadius: 10,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        zIndex: 2,
      }}
    >
      <span style={{ flexShrink: 0, display: 'flex' }}>{icon}</span>
      <p style={{ fontSize: 12.5, fontWeight: 700, color: BODY, lineHeight: 1.55 }}>{children}</p>
    </div>
  );
}

/* 並行運用タイムラインの座標（右パネル内の絶対座標） */
const TL_L = R_X + PAD_IN; // 626
const TL_R = R_X + PANEL_W - PAD_IN; // 1142
const TL_SWITCH = 1000; // 完全切替の位置
const TL_OVERLAP = 852; // 並行運用の開始位置

const Slide7 = (
  <Frame n={7}>
    <Head
      en="PREMISE"
      ja="前提"
      aside={
        <HeadMeta
          items={[
            ['INFRA', 'AWS 有料プラン'],
            ['SWITCHING', '数か月の並行運用'],
          ]}
        />
      }
      lead={
        <p style={{ fontSize: 18.5, lineHeight: 1.9, color: BODY, fontWeight: 600 }}>
          本プロジェクトは
          <span style={{ color: INK, fontWeight: 800, borderBottom: `3px solid ${YELLOW}` }}>2つの前提</span>
          のもとで進める。
        </p>
      }
    />

    <div style={{ marginTop: 16, position: 'relative', width: '100%', height: DH7, flexShrink: 0 }}>
      {/* ── 左：開発を進めるうえでの前提 ───────────────── */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: PANEL_W, height: DH7, background: SURFACE, borderRadius: 16 }} />
      <PanelHead x={0} kicker="PREMISE 01" ja="開発を進めるうえでの前提" accent={BLUE} />

      <p
        style={{
          position: 'absolute',
          left: PAD_IN,
          top: 66,
          width: PANEL_W - PAD_IN * 2,
          fontSize: 24,
          fontWeight: 800,
          color: INK,
          letterSpacing: '-0.01em',
          lineHeight: 1.25,
          zIndex: 2,
        }}
      >
        AWSアカウントは
        <span style={{ borderBottom: `3px solid ${YELLOW}` }}>有料プラン</span>
        が必要
      </p>

      {/* 無料プラン（不足）— 制限を長さで表現する */}
      <PlanCard
        x={PAD_IN}
        tag="FREE"
        name="無料プラン"
        icon={<Ban size={15} color={MUTE} strokeWidth={2.4} />}
        iconBg={SURFACE}
        accent={MUTE}
        track="#E4E4E4"
        gauges={[
          ['データ速度', 22],
          ['データ量', 15],
        ]}
        verdict="テスト段階ですら使えない"
        verdictColor={SUB}
        dim
      />

      {/* 有料プラン（十分） */}
      <PlanCard
        x={288}
        tag="PAID"
        name="有料プラン"
        icon={<Check size={16} color={BLUE} strokeWidth={3} />}
        iconBg={BLUE_TINT}
        accent={BLUE}
        track="#D8E6F8"
        gauges={[
          ['データ速度', 100],
          ['データ量', 100],
        ]}
        verdict="開発・テストに必要な性能"
        verdictColor={BLUE}
      />

      {/* 2枚のカードの間：対比を示す記号 */}
      <div
        style={{
          position: 'absolute',
          left: 262,
          top: 200,
          width: 26,
          height: 26,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
        }}
      >
        <span style={{ marginLeft: 2 }}>
          <TriRight w={11} h={13} color={'#C4C8CE'} />
        </span>
      </div>

      <PanelNote x={0} icon={<TriangleAlert size={16} color={SUB} strokeWidth={2.3} />}>
        無料プランは<span style={{ fontWeight: 800, color: INK }}>データ速度・データ量の制限が非常に厳しい</span>ため、有料プランを前提とする
      </PanelNote>

      {/* ── 右：乗り換えるうえでの前提 ───────────────── */}
      <div style={{ position: 'absolute', left: R_X, top: 0, width: PANEL_W, height: DH7, background: SURFACE, borderRadius: 16 }} />
      <PanelHead x={R_X} kicker="PREMISE 02" ja="乗り換えるうえでの前提" accent={BLUE} />

      <p
        style={{
          position: 'absolute',
          left: R_X + PAD_IN,
          top: 66,
          width: PANEL_W - PAD_IN * 2,
          fontSize: 24,
          fontWeight: 800,
          color: INK,
          letterSpacing: '-0.01em',
          lineHeight: 1.25,
          zIndex: 2,
        }}
      >
        一括切替ではなく
        <span style={{ borderBottom: `3px solid ${YELLOW}` }}>並行運用</span>
        を挟む
      </p>

      {/* 並行運用ゾーン（2レーンにまたがる帯） */}
      <div
        style={{
          position: 'absolute',
          left: TL_OVERLAP,
          top: 142,
          width: TL_SWITCH - TL_OVERLAP,
          height: 134,
          background: '#E4EFFB',
          borderRadius: 8,
          zIndex: 1,
        }}
      />

      {/* レーン1：G1（現行） */}
      <div
        style={{
          position: 'absolute',
          left: TL_L,
          top: 176,
          width: TL_SWITCH - TL_L,
          height: 42,
          boxSizing: 'border-box',
          background: INK,
          borderRadius: 8,
          padding: '0 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 900, color: WHITE, letterSpacing: '-0.01em', lineHeight: 1 }}>G1</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.72)', lineHeight: 1 }}>現行システム</span>
      </div>

      {/* レーン2：MP Core（新） */}
      <div
        style={{
          position: 'absolute',
          left: TL_OVERLAP,
          top: 228,
          width: TL_R - TL_OVERLAP,
          height: 42,
          boxSizing: 'border-box',
          background: BLUE,
          borderRadius: 8,
          padding: '0 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 900, color: WHITE, letterSpacing: '-0.01em', lineHeight: 1, whiteSpace: 'nowrap' }}>
          MP Core
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.78)', lineHeight: 1, whiteSpace: 'nowrap' }}>
          新システム
        </span>
      </div>

      {/* 並行運用ラベル */}
      <div
        style={{
          position: 'absolute',
          left: TL_OVERLAP - 24,
          top: 148,
          width: TL_SWITCH - TL_OVERLAP + 48,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 3,
        }}
      >
        <span
          style={{
            height: 22,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: BLUE,
            borderRadius: 999,
            padding: '0 11px',
            fontSize: 10.5,
            fontWeight: 800,
            color: WHITE,
            lineHeight: 1,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          並行運用（数か月）
        </span>
      </div>

      {/* 切替ポイント（破線の頭に置く） */}
      <div
        style={{
          position: 'absolute',
          left: TL_SWITCH - 60,
          top: 116,
          width: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          zIndex: 4,
        }}
      >
        <Flag size={13} color={INK} strokeWidth={2.6} />
        <span style={{ fontSize: 12.5, fontWeight: 800, color: INK, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>完全切替</span>
      </div>

      {/* 切替ライン（MP Core バーの上だけ白で抜き、レーンを跨いでも読めるようにする） */}
      <svg width="100%" height={DH7} viewBox={`0 0 1164 ${DH7}`} style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}>
        <circle cx={TL_SWITCH} cy={140} r={4} fill={INK} />
        <path d={`M${TL_SWITCH},140 L${TL_SWITCH},228`} stroke={INK} strokeWidth={1.6} strokeDasharray="5 4" fill="none" />
        <path d={`M${TL_SWITCH},228 L${TL_SWITCH},270`} stroke={WHITE} strokeWidth={1.6} strokeDasharray="5 4" fill="none" />
        <path d={`M${TL_SWITCH},270 L${TL_SWITCH},282`} stroke={INK} strokeWidth={1.6} strokeDasharray="5 4" fill="none" />
      </svg>

      {/* 期間キャプション */}
      {(
        [
          [TL_L, TL_OVERLAP, '現行のまま運用'],
          [TL_OVERLAP, TL_SWITCH, '両システムを運用'],
          [TL_SWITCH, TL_R, 'MP Core のみ'],
        ] as [number, number, string][]
      ).map(([from, to, label]) => (
        <div
          key={label}
          style={{
            position: 'absolute',
            left: from,
            top: 290,
            width: to - from,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span style={{ fontSize: 10.5, fontWeight: 700, color: SUB, whiteSpace: 'nowrap', lineHeight: 1 }}>{label}</span>
        </div>
      ))}

      <PanelNote x={R_X} icon={<ShieldCheck size={16} color={SUB} strokeWidth={2.3} />}>
        数か月間は両システムを並行運用し、<span style={{ fontWeight: 800, color: INK }}>問題がないことを確認できたら</span>完全に切り替える
      </PanelNote>
    </div>
  </Frame>
);

/* ============================================================
   08 ／ まとめ
   ============================================================ */

const DH8 = 410;

const L_W = 660; // 左パネル（開発系）
const C_X = 704; // 右パネル（コスト系）の左端
const C_W = 460;

/** まとめ図のノード。own=自社で持つ領域（ブルーの破線で囲って強調する） */
function SumNode({
  x,
  y,
  name,
  sub,
  own,
}: {
  x: number;
  y: number;
  name: string;
  sub: string;
  own?: boolean;
}) {
  return (
    <>
      {own && (
        <div
          style={{
            position: 'absolute',
            left: x - 9,
            top: y - 9,
            width: 118 + 18,
            height: 62 + 18,
            boxSizing: 'border-box',
            border: `2px dashed ${BLUE}`,
            borderRadius: 16,
            zIndex: 2,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 118,
          height: 62,
          boxSizing: 'border-box',
          background: own ? BLUE : WHITE,
          border: own ? 'none' : `1px solid ${LINE}`,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontSize: 12.5,
            fontWeight: 800,
            color: own ? WHITE : INK,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: own ? 'rgba(255,255,255,0.78)' : SUB,
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {sub}
        </span>
      </div>
    </>
  );
}

/** 右側の要点カード（図から引き出し線でつなぐ） */
function PointCard({ y, no, text }: { y: number; no: string; text: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 362,
        top: y,
        width: 276,
        height: 114,
        boxSizing: 'border-box',
        background: WHITE,
        borderRadius: 12,
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 3,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
        <span style={{ width: 7, height: 7, background: BLUE }} />
        <span style={{ fontFamily: DISPLAY, fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', color: BLUE }}>POINT {no}</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <p style={{ fontSize: 16.5, fontWeight: 800, color: INK, lineHeight: 1.6, letterSpacing: '-0.01em' }}>{text}</p>
      </div>
    </div>
  );
}

/** 解消されるコスト要因（取り消し線で「無くす」ことを示す） */
function KilledCost({ y, text }: { y: number; text: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: C_X + PAD_IN,
        top: y,
        width: C_W - PAD_IN * 2,
        height: 36,
        boxSizing: 'border-box',
        background: WHITE,
        borderRadius: 8,
        padding: '0 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        zIndex: 2,
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 999,
          background: SURFACE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <X size={12} color={MUTE} strokeWidth={3} />
      </span>
      <span style={{ fontSize: 12.5, fontWeight: 700, color: MUTE, textDecoration: 'line-through', textDecorationColor: MUTE }}>
        {text}
      </span>
    </div>
  );
}

/* コスト推移グラフ（右肩上がり＝放置すると膨らむ、を形で示す） */
const COST_BARS = [26, 38, 54, 72, 94];

const Slide8 = (
  <Frame n={8}>
    <Head
      en="SUMMARY"
      ja="まとめ"
      aside={
        <HeadMeta
          items={[
            ['DEVELOPMENT', 'コアを内製化'],
            ['COST', '膨張要因を解消'],
          ]}
        />
      }
      lead={
        <p style={{ fontSize: 18.5, lineHeight: 1.9, color: BODY, fontWeight: 600 }}>
          MP Core によって、
          <span style={{ color: INK, fontWeight: 800, borderBottom: `3px solid ${YELLOW}` }}>開発面とコスト面の両方</span>
          で効果が得られる。
        </p>
      }
    />

    <div style={{ marginTop: 16, position: 'relative', width: '100%', height: DH8, flexShrink: 0 }}>
      {/* ── 左：開発系 ───────────────────────────── */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: L_W, height: DH8, background: SURFACE, borderRadius: 16 }} />
      <PanelHead x={0} w={L_W} kicker="DEVELOPMENT" ja="開発系" accent={BLUE} />

      {/* 引き出し線・ノード間の結線 */}
      <svg width="100%" height={DH8} viewBox={`0 0 1164 ${DH8}`} style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}>
        <g stroke="#B2B8C0" strokeWidth={1.4} fill="none">
          {/* フロント → 外部サービス */}
          <path d="M152,107 L210,107" />
          {/* フロント → データ連携 → MP Core */}
          <path d="M93,138 L93,176" />
          <path d="M93,238 L93,267" />
          {/* MP Core → 新機能（拡張は基幹の上に載る） */}
          <path d="M146,267 L219,247" />
        </g>
        {/* 要点カードへの引き出し（強調枠の外側から出す） */}
        <g stroke={BLUE} strokeWidth={1.4} fill="none">
          <path d="M337,207 L349,207 L349,133 L362,133" />
          <path d="M161,307 L349,307 L349,271 L362,271" />
        </g>
        <g fill={BLUE}>
          <circle cx="337" cy="207" r="3" />
          <circle cx="161" cy="307" r="3" />
        </g>
      </svg>

      <SumNode x={34} y={76} name="フロント" sub="EC・モール" />
      <SumNode x={210} y={76} name="外部サービス" sub="決済・回線" />
      <SumNode x={34} y={176} name="データ連携" sub="API" />
      <SumNode x={210} y={176} name="新機能・拡張" sub="汎用化" own />
      <SumNode x={34} y={276} name="MP Core" sub="基幹システム" own />

      <PointCard
        y={76}
        no="01"
        text={
          <>
            新しい機能開発など
            <span style={{ borderBottom: `3px solid ${YELLOW}` }}>汎用化がスムーズ</span>
            に行える
          </>
        }
      />
      <PointCard
        y={214}
        no="02"
        text={
          <>
            事業を支えるコア部分のシステムを
            <span style={{ borderBottom: `3px solid ${YELLOW}` }}>完全に内製化</span>
          </>
        }
      />

      {/* ── 右：コスト系 ─────────────────────────── */}
      <div style={{ position: 'absolute', left: C_X, top: 0, width: C_W, height: DH8, background: SURFACE, borderRadius: 16 }} />
      <PanelHead x={C_X} w={C_W} kicker="COST" ja="コスト系" accent={BLUE} />

      {/* コスト推移グラフ */}
      <svg
        width={168}
        height={132}
        viewBox="0 0 168 132"
        style={{ position: 'absolute', left: C_X + PAD_IN, top: 74, zIndex: 2 }}
      >
        {/* 軸 */}
        <g stroke="#C4C8CE" strokeWidth={1.3} fill="none">
          <path d="M18,8 L18,112" />
          <path d="M18,112 L164,112" />
        </g>
        {/* 積み上がるコスト */}
        {COST_BARS.map((h, i) => (
          <rect key={i} x={30 + i * 28} y={112 - h} width={18} height={h} rx={2} fill={YELLOW} />
        ))}
        {/* 右肩上がりのトレンド */}
        <path d="M26,100 L145,20" stroke={INK} strokeWidth={2} fill="none" />
        <polygon points="154,14 147,25 141,17" fill={INK} />
        <text x={0} y={8} fontSize={9} fontWeight={700} fill={MUTE}>
          コスト
        </text>
        <text x={140} y={126} fontSize={9} fontWeight={700} fill={MUTE}>
          時間
        </text>
      </svg>

      {/* グラフの読み方 */}
      <div style={{ position: 'absolute', left: C_X + 208, top: 92, width: C_W - 208 - PAD_IN, zIndex: 2 }}>
        <p style={{ fontSize: 16.5, fontWeight: 800, color: INK, lineHeight: 1.6, letterSpacing: '-0.01em' }}>
          このままでは
          <br />
          コストが積み上がり続ける
        </p>
        <p style={{ fontSize: 11.5, fontWeight: 600, color: SUB, lineHeight: 1.7, marginTop: 10 }}>
          改修のたびに費用が発生し、
          <br />
          年を追うごとに膨らんでいく。
        </p>
      </div>

      {/* 無くすコスト要因 */}
      <KilledCost y={228} text="メンテナンスに一定のコストがかかる" />
      <KilledCost y={272} text="汎用開発にその都度コストがかかる" />

      {/* 結論 */}
      <div
        style={{
          position: 'absolute',
          left: C_X + PAD_IN,
          top: 326,
          width: C_W - PAD_IN * 2,
          height: 62,
          boxSizing: 'border-box',
          background: BLUE,
          borderRadius: 12,
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 8,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 7, height: 7, background: YELLOW, flexShrink: 0 }} />
          <span style={{ fontFamily: DISPLAY, fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', color: YELLOW }}>RESULT</span>
        </div>
        <p style={{ fontSize: 16.5, fontWeight: 800, color: WHITE, letterSpacing: '-0.01em', lineHeight: 1 }}>
          大きく膨れ上がるコスト要因を無くす
        </p>
      </div>
    </div>
  </Frame>
);

export const mpCorePresentation: PresentationEntry = {
  meta: {
    id: 'mp-core-2026',
    title: '基幹システム「MP Core」フルスクラッチ開発プロジェクト',
    description:
      '株式会社モバイル・プランニング 御中。基幹システムをフルスクラッチで開発し、現行システム「G1」から MP Core へ全面移行するプロジェクトのご提案資料。ご提案元：Meece株式会社。',
    thumbnail: `linear-gradient(135deg, ${WHITE} 0%, ${WHITE} 44%, ${YELLOW} 45%, ${TEAL} 62%, ${BLUE} 100%)`,
    author: 'Meece株式会社',
    createdAt: '2026-08-12',
  },
  slides: [
    SlideCover, // 表紙（ページ番号なし）
    Slide1, // 1 プロジェクト概要
    Slide2, // 2 システム構成整理
    Slide3, // 3 プロジェクトの目的
    Slide4, // 4 開発要素
    Slide5, // 5 体制図
    Slide6, // 6 全体スケジュール
    Slide7, // 7 前提
    Slide8, // 8 まとめ
  ],
};
