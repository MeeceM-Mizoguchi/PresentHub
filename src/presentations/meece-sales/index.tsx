import type { PresentationEntry } from '../registry';

/* ============================================================
   Meece株式会社 営業資料
   ご提案の進め方 ─ 商談とAIの使い方

   Design system : "MEECE ROUTE"
   ─ 路線図メタファ ＋ 自作SVGイラスト
     ・ライン上＝お客さまとの商談（駅）／ライン下＝AIが動く区間
     ・各駅に固有のイラスト（電話 / 対話 / 試作画面 / 提案書）
     ・AIの成果物はテキストではなく「アイコン付きチップ」で見せる
     ・lucide などのアイコンライブラリは使わず、全て自作インラインSVG
     ・上部ヘッダーバー／下部フッターバー／進捗バーを持たない
   ─ 出力前提：PDF（1280 x 720 / html-to-image → JPEG / pixelRatio 2）
      ・rAF 2フレームで撮影されるためアニメーション・トランジション不使用
      ・Webフォント／外部画像不使用（読み込み待ちができない）
      ・JPEGは透過を持てないため背景は必ず不透明
      ・filter / backdrop-filter / mix-blend-mode は不使用
      ・SVGはインライン（<img src>は使わない）
      ・全ブロックを絶対座標で固定。文字の行数が増えても衝突しないよう
        テキストには必ず lineHeight を明示する
   ============================================================ */

/* ---------------- ブランドトークン ---------------- */

const INK = '#0B1220';
const BODY = '#414A5C';
const SUB = '#6B7686';
const MUTE = '#99A2B0';
const WHITE = '#FFFFFF';
const LINE = '#E4E9EF';
const FILL = '#EDF1F5';

const CYAN = '#0AA3BE';
const CYAN_DEEP = '#06788C';
const CYAN_TINT = '#E7F7FA';
const CYAN_LINE = '#B4E0E9';

const VIOLET = '#7C4DFF';
const VIOLET_DEEP = '#5A2ED6';
const VIOLET_TINT = '#F4EFFF';
const VIOLET_LINE = '#DCCEFF';

const NEON = '#3FE0F0';
const MINT = '#7BF0D2'; // 「契約できた」明るい面のグラデ起点
const SKY = '#6EC8FF'; // 同・終点

const SANS =
  "-apple-system, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', 'Noto Sans JP', 'Meiryo', sans-serif";
const NUM = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const SLIDE = 'w-full h-[720px] relative overflow-hidden';

/* ---------------- ジオメトリ ---------------- */

const PAD = 56;
const CW = 1280 - PAD * 2; // 1168
const TOTAL = 2; // ページを足すたびに更新
const CX = [0, 1, 2, 3].map(i => PAD + 146 + 292 * i); // 202 / 494 / 786 / 1078
const MID = [0, 1, 2].map(i => (CX[i] + CX[i + 1]) / 2); // 348 / 640 / 932

const ART_W = 232; // 駅イラストカード幅
const ART_TOP = 182;
const ART_H = 100;

const STEP_TOP = 294;
const NAME_TOP = 317;
const DESC_TOP = 345;

const RAIL_TOP = 382;
const RAIL_H = 10;
const RAIL_CY = RAIL_TOP + RAIL_H / 2; // 387
const SEG_INSET = 30;

const AI_W = 268;
const AI_TOP = 440;
const AI_H = 150;

const BAR_TOP = 606;
const BAR_H = 48;

/* ============================================================
   自作SVG ── 駅のイラスト（viewBox 200 x 88）
   ============================================================ */

const ST = { fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

/** アポ：スマートフォン ＋ 声の波 ＋ メモ */
const ArtAppointment = (
  <svg width="200" height="88" viewBox="0 0 200 88">
    {/* メモ用紙 */}
    <rect x="122" y="12" width="62" height="64" rx="8" fill={WHITE} stroke={CYAN_LINE} strokeWidth="2" />
    <rect x="132" y="24" width="34" height="4" rx="2" fill={CYAN} />
    <rect x="132" y="36" width="42" height="3.5" rx="1.75" fill={FILL} />
    <rect x="132" y="46" width="36" height="3.5" rx="1.75" fill={FILL} />
    <rect x="132" y="56" width="40" height="3.5" rx="1.75" fill={FILL} />
    <rect x="132" y="66" width="26" height="3.5" rx="1.75" fill={FILL} />
    {/* 声の波 */}
    <path d="M76 32a15 15 0 0 1 0 24" {...ST} stroke={VIOLET} strokeWidth="2.6" />
    <path d="M87 24a26 26 0 0 1 0 40" {...ST} stroke={VIOLET} strokeWidth="2.4" opacity="0.55" />
    <path d="M98 16a37 37 0 0 1 0 56" {...ST} stroke={VIOLET} strokeWidth="2.2" opacity="0.28" />
    {/* スマートフォン */}
    <rect x="18" y="8" width="46" height="72" rx="9" fill={WHITE} stroke={CYAN} strokeWidth="2.6" />
    <rect x="24" y="20" width="34" height="48" rx="4" fill={CYAN_TINT} />
    <rect x="33" y="13" width="16" height="2.6" rx="1.3" fill={CYAN_LINE} />
    <circle cx="41" cy="44" r="9" fill={WHITE} stroke={CYAN} strokeWidth="2.2" />
    <path d="M37 40.5c1.5 5 4 7 8 8" {...ST} stroke={CYAN} strokeWidth="2.2" />
  </svg>
);

/** 商談1回目：吹き出し2つ（ヒアリング＋QA） */
const ArtMeeting1 = (
  <svg width="200" height="88" viewBox="0 0 200 88">
    {/* 左：お客さまの声 */}
    <rect x="8" y="6" width="98" height="46" rx="11" fill={WHITE} stroke={CYAN} strokeWidth="2.6" />
    <path d="M28 52v14l17-14" fill={WHITE} stroke={CYAN} strokeWidth="2.6" strokeLinejoin="round" />
    <rect x="22" y="20" width="60" height="4" rx="2" fill={CYAN_LINE} />
    <rect x="22" y="31" width="44" height="4" rx="2" fill={CYAN_LINE} />
    {/* 右：用意したQA */}
    <rect x="94" y="36" width="98" height="46" rx="11" fill={CYAN_TINT} stroke={CYAN} strokeWidth="2.6" />
    <path d="M172 36V22l-17 14" fill={CYAN_TINT} stroke={CYAN} strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M108 58l6 6 11-13" {...ST} stroke={CYAN_DEEP} strokeWidth="3" />
    <rect x="132" y="52" width="46" height="4" rx="2" fill={CYAN} opacity="0.5" />
    <rect x="132" y="63" width="34" height="4" rx="2" fill={CYAN} opacity="0.5" />
  </svg>
);

/** 商談2回目：試作画面に触れてもらう */
const ArtMeeting2 = (
  <svg width="200" height="88" viewBox="0 0 200 88">
    <rect x="10" y="4" width="156" height="76" rx="9" fill={WHITE} stroke={CYAN} strokeWidth="2.6" />
    <path d="M10 24h156" stroke={CYAN} strokeWidth="2" />
    <circle cx="22" cy="14" r="2.6" fill={CYAN_LINE} />
    <circle cx="31" cy="14" r="2.6" fill={CYAN_LINE} />
    <circle cx="40" cy="14" r="2.6" fill={CYAN_LINE} />
    {/* サイドバー */}
    <rect x="18" y="32" width="28" height="40" rx="5" fill={CYAN_TINT} />
    {/* コンテンツ */}
    <rect x="54" y="32" width="58" height="9" rx="3" fill={FILL} />
    <rect x="54" y="47" width="42" height="6" rx="3" fill={FILL} />
    <rect x="54" y="59" width="52" height="6" rx="3" fill={FILL} />
    {/* グラフ */}
    <rect x="122" y="56" width="9" height="16" rx="2.5" fill={CYAN_LINE} />
    <rect x="135" y="46" width="9" height="26" rx="2.5" fill={CYAN} opacity="0.55" />
    <rect x="148" y="34" width="9" height="38" rx="2.5" fill={CYAN} />
    {/* 触れているカーソル */}
    <path d="M150 60l30 12-12 3-4 12z" fill={VIOLET} stroke={WHITE} strokeWidth="2.4" strokeLinejoin="round" />
  </svg>
);

/** 最終提案：提案書 ＋ 見積（濃紺カード上に置くため白線） */
const ArtProposal = (
  <svg width="200" height="88" viewBox="0 0 200 88">
    {/* 提案資料 */}
    <rect x="16" y="4" width="86" height="80" rx="9" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.75)" strokeWidth="2.4" />
    <rect x="28" y="17" width="40" height="5" rx="2.5" fill={NEON} />
    <rect x="28" y="31" width="62" height="4" rx="2" fill="rgba(255,255,255,0.32)" />
    <rect x="28" y="42" width="54" height="4" rx="2" fill="rgba(255,255,255,0.32)" />
    <rect x="28" y="53" width="58" height="4" rx="2" fill="rgba(255,255,255,0.32)" />
    <rect x="28" y="64" width="36" height="4" rx="2" fill="rgba(255,255,255,0.32)" />
    {/* お見積 */}
    <rect x="110" y="18" width="76" height="58" rx="9" fill={WHITE} />
    <path d="M132 32l8 10 8-10M132 45h16M132 52h16M140 42v12" {...ST} stroke={INK} strokeWidth="2.6" />
    <rect x="122" y="63" width="52" height="4" rx="2" fill={FILL} />
  </svg>
);

/* ============================================================
   自作SVG ── AI成果物のミニアイコン（18px）
   ============================================================ */

function Ico({ name, color = VIOLET_DEEP }: { name: string; color?: string }) {
  const s = { ...ST, stroke: color, strokeWidth: 1.7 };
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
      {name === 'plan' && (
        <>
          <rect x="2.6" y="4.2" width="14.8" height="13.2" rx="2.4" {...s} />
          <path d="M2.6 8.4h14.8M6.8 2.6v3.2M13.2 2.6v3.2M7 12.6h2M11 12.6h2" {...s} />
        </>
      )}
      {name === 'table' && (
        <>
          <rect x="2.6" y="3.4" width="14.8" height="13.2" rx="2.4" {...s} />
          <path d="M2.6 8h14.8M8.4 8v8.6" {...s} />
        </>
      )}
      {name === 'list' && (
        <>
          <path d="M4 5.4h1.4M4 10h1.4M4 14.6h1.4" {...s} strokeWidth="2.2" />
          <path d="M8.4 5.4h7.6M8.4 10h7.6M8.4 14.6h5" {...s} />
        </>
      )}
      {name === 'layers' && (
        <>
          <path d="M10 2.6l7 3.6-7 3.6-7-3.6z" {...s} />
          <path d="M3 10.4l7 3.6 7-3.6M3 14.2l7 3.6 7-3.6" {...s} />
        </>
      )}
      {name === 'yen' && (
        <>
          <rect x="3" y="2.6" width="14" height="14.8" rx="2.4" {...s} />
          <path d="M7 6.4l3 3.6 3-3.6M7.2 11h5.6M7.2 13.4h5.6M10 10v4.6" {...s} />
        </>
      )}
      {name === 'blocks' && (
        <>
          <rect x="2.6" y="2.6" width="6.4" height="6.4" rx="1.8" {...s} />
          <rect x="11" y="2.6" width="6.4" height="6.4" rx="1.8" {...s} />
          <rect x="2.6" y="11" width="6.4" height="6.4" rx="1.8" {...s} />
          <path d="M14.2 11v6.4M11 14.2h6.4" {...s} />
        </>
      )}
      {name === 'window' && (
        <>
          <rect x="2.4" y="3.6" width="15.2" height="12.8" rx="2.4" {...s} />
          <path d="M2.4 7.6h15.2M5.4 5.6h.02" {...s} />
          <path d="M5.4 10.6h4.4M5.4 13.4h6.8" {...s} />
        </>
      )}
      {name === 'touch' && (
        <>
          <rect x="2.4" y="3" width="12" height="10" rx="2.2" {...s} />
          <path d="M2.4 6.6h12" {...s} />
          <path d="M9.6 10.6l7 3-2.8.8-1 2.8z" {...s} />
        </>
      )}
      {name === 'server' && (
        <>
          <rect x="2.6" y="3" width="14.8" height="5.6" rx="1.8" {...s} />
          <rect x="2.6" y="11.4" width="14.8" height="5.6" rx="1.8" {...s} />
          <path d="M5.8 5.8h.02M5.8 14.2h.02" {...s} strokeWidth="2.2" />
        </>
      )}
      {name === 'mic' && (
        <>
          <rect x="7.2" y="2.4" width="5.6" height="9.6" rx="2.8" {...s} />
          <path d="M4.4 9.4a5.6 5.6 0 0 0 11.2 0M10 15v2.6M7.4 17.6h5.2" {...s} />
        </>
      )}
      {name === 'doc' && (
        <>
          <path d="M4.4 2.6h6.6l4.6 4.4v10.4H4.4z" {...s} />
          <path d="M11 2.6V7h4.6M7.2 10.6h5.6M7.2 13.6h4" {...s} />
        </>
      )}
      {name === 'code' && (
        <>
          <path d="M6.8 6.6L3.2 10l3.6 3.4M13.2 6.6L16.8 10l-3.6 3.4M11.4 4.4l-2.8 11.2" {...s} />
        </>
      )}
      {name === 'check' && (
        <>
          <circle cx="10" cy="10" r="7.6" {...s} />
          <path d="M6.6 10.2l2.4 2.4 4.4-5" {...s} strokeWidth="2.1" />
        </>
      )}
    </svg>
  );
}

/* ---------------- 全ページ共通のクローム ---------------- */

/** 左上のデッキマーク */
const DeckMark = (
  <div
    style={{
      position: 'absolute',
      left: PAD,
      top: 38,
      display: 'inline-flex',
      alignItems: 'center',
      height: 24,
      boxSizing: 'border-box',
      padding: '0 12px',
      borderRadius: 12,
      background: CYAN_TINT,
      border: `1px solid ${CYAN_LINE}`,
    }}
  >
    <span style={{ width: 6, height: 6, borderRadius: 3, background: CYAN, flexShrink: 0 }} />
    <span
      style={{ fontFamily: NUM, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.22em', color: CYAN_DEEP, marginLeft: 8, lineHeight: 1 }}
    >
      MEECE SALES ROUTE
    </span>
  </div>
);

/** 右上のノンブル（デッキマークと同じ高さに揃える） */
function PageNo({ n }: { n: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        right: PAD,
        top: 43,
        display: 'flex',
        alignItems: 'baseline',
        fontFamily: NUM,
        lineHeight: 1,
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 700, color: '#8A94A2', letterSpacing: '0.04em' }}>{n}</span>
      <span style={{ fontSize: 11, fontWeight: 500, color: '#CBD3DC', margin: '0 5px' }}>/</span>
      <span style={{ fontSize: 11, fontWeight: 500, color: '#B3BCC7', letterSpacing: '0.04em' }}>{TOTAL}</span>
    </div>
  );
}

/** 足元：社名 ＋ 資料名（バー類は持たない） */
function Foot() {
  return (
    <div style={{ position: 'absolute', left: PAD, top: 678, display: 'flex', alignItems: 'center' }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: INK, letterSpacing: '0.04em', lineHeight: 1 }}>Meece株式会社</span>
      <span style={{ width: 1, height: 11, background: LINE, margin: '0 12px' }} />
      <span style={{ fontSize: 10.5, fontWeight: 600, color: MUTE, letterSpacing: '0.04em', lineHeight: 1 }}>
        ご提案の進め方 ─ 商談とAIの使い方
      </span>
    </div>
  );
}

/* ---------------- 帯の見出し ---------------- */

function BandLabel({ top, mark, text, color }: { top: number; mark: React.ReactNode; text: string; color: string }) {
  return (
    <div style={{ position: 'absolute', left: PAD, top, display: 'flex', alignItems: 'center' }}>
      {mark}
      <span style={{ marginLeft: 10, fontSize: 11.5, fontWeight: 800, color, letterSpacing: '0.05em', lineHeight: 1 }}>
        {text}
      </span>
    </div>
  );
}

/* ---------------- 駅（イラスト＋名前） ---------------- */

type StationData = { step: string; name: string; desc: string; art: React.ReactNode; terminal?: boolean };

const STATIONS: StationData[] = [
  { step: '01', name: 'アポ', desc: '日程とお困りごとを電話でヒアリング', art: ArtAppointment },
  { step: '02', name: '商談 1回目', desc: 'ヒアリングと事前QAの確認', art: ArtMeeting1 },
  { step: '03', name: '商談 2回目', desc: '開発と見積概算のご提案', art: ArtMeeting2 },
  { step: '04', name: '最終提案', desc: '提案資料と見積金額のご提示', art: ArtProposal, terminal: true },
];

function StationBlock({ s, cx }: { s: StationData; cx: number }) {
  const term = !!s.terminal;
  return (
    <>
      {/* イラストカード */}
      <div
        style={{
          position: 'absolute',
          left: cx - ART_W / 2,
          top: ART_TOP,
          width: ART_W,
          height: ART_H,
          boxSizing: 'border-box',
          borderRadius: 14,
          background: term ? INK : CYAN_TINT,
          border: `1px solid ${term ? INK : CYAN_LINE}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {s.art}
      </div>

      {/* STEP */}
      <div
        style={{
          position: 'absolute',
          left: cx - ART_W / 2,
          top: STEP_TOP,
          width: ART_W,
          textAlign: 'center',
          fontFamily: NUM,
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: '0.22em',
          lineHeight: 1,
          color: term ? INK : CYAN,
        }}
      >
        STEP {s.step}
      </div>

      {/* 駅名 */}
      <div
        style={{
          position: 'absolute',
          left: cx - ART_W / 2,
          top: NAME_TOP,
          width: ART_W,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: '0.02em',
          lineHeight: 1,
          color: INK,
        }}
      >
        {s.name}
      </div>

      {/* 一行説明 */}
      <div
        style={{
          position: 'absolute',
          left: cx - ART_W / 2,
          top: DESC_TOP,
          width: ART_W,
          textAlign: 'center',
          fontSize: 11,
          fontWeight: 600,
          lineHeight: 1.5,
          color: SUB,
        }}
      >
        {s.desc}
      </div>

      {/* 駅マーカー */}
      <div
        style={{
          position: 'absolute',
          left: cx - (term ? 17 : 15),
          top: RAIL_CY - (term ? 17 : 15),
          width: term ? 34 : 30,
          height: term ? 34 : 30,
          borderRadius: 17,
          boxSizing: 'border-box',
          background: term ? INK : WHITE,
          border: term ? `4px solid ${INK}` : `7px solid ${CYAN}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {term && (
          <span style={{ width: 16, height: 16, borderRadius: 8, boxSizing: 'border-box', border: `3px solid ${WHITE}` }} />
        )}
      </div>
    </>
  );
}

/* ---------------- 区間（AIがつくるもの） ---------------- */

type SegData = { items: [string, string][]; source: string };

const SEGMENTS: SegData[] = [
  {
    items: [
      ['plan', '段取り設計'],
      ['table', 'QA表'],
      ['list', 'ヒアリング項目'],
    ],
    source: '電話のメモ・録音',
  },
  {
    items: [
      ['layers', 'ご提案パターン'],
      ['yen', '概算見積'],
      ['blocks', '今後の開発要素'],
      ['window', '簡単な画面'],
    ],
    source: '商談1回目の文字起こし',
  },
  {
    items: [
      ['yen', '詳細見積'],
      ['touch', '触れる試作'],
      ['server', 'インフラ構築'],
    ],
    source: '商談2回目の文字起こし＋反応',
  },
];

function SegmentCard({ d, mx }: { d: SegData; mx: number }) {
  return (
    <>
      {/* 本線から降ろす引き出し線 */}
      <div style={{ position: 'absolute', left: mx - 1, top: RAIL_TOP + RAIL_H, width: 2, height: AI_TOP - RAIL_TOP - RAIL_H - 7, background: VIOLET_LINE }} />
      <div
        style={{
          position: 'absolute',
          left: mx - 5,
          top: AI_TOP - 8,
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `7px solid ${VIOLET}`,
        }}
      />

      {/* カード */}
      <div
        style={{
          position: 'absolute',
          left: mx - AI_W / 2,
          top: AI_TOP,
          width: AI_W,
          height: AI_H,
          boxSizing: 'border-box',
          borderRadius: 14,
          background: VIOLET_TINT,
          border: `1px solid ${VIOLET_LINE}`,
          padding: 14,
        }}
      >
        {/* 見出し */}
        <div style={{ display: 'flex', alignItems: 'center', height: 14 }}>
          <span style={{ width: 16, height: 5, borderRadius: 3, background: VIOLET, flexShrink: 0 }} />
          <span style={{ fontFamily: NUM, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.22em', color: VIOLET_DEEP, marginLeft: 8 }}>
            AI
          </span>
          <span style={{ fontSize: 10, fontWeight: 800, color: VIOLET_DEEP, marginLeft: 8, letterSpacing: '0.04em', lineHeight: 1 }}>
            この区間でつくるもの
          </span>
        </div>

        {/* 成果物チップ */}
        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {d.items.map(([ico, label]) => (
            <div
              key={label}
              style={{
                width: 114,
                height: 30,
                boxSizing: 'border-box',
                background: WHITE,
                border: `1px solid ${VIOLET_LINE}`,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
              }}
            >
              <Ico name={ico} />
              <span style={{ marginLeft: 6, fontSize: 10.5, fontWeight: 700, color: INK, lineHeight: 1, whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* 元ネタ */}
        <div style={{ position: 'absolute', left: 14, bottom: 12, display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: VIOLET, letterSpacing: '0.14em', lineHeight: 1 }}>元ネタ</span>
          <span style={{ width: 12, height: 1, background: VIOLET_LINE, margin: '0 7px' }} />
          <span style={{ fontSize: 10, fontWeight: 600, color: SUB, lineHeight: 1 }}>{d.source}</span>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   スライド 1
   ============================================================ */

const Slide1 = (
  <div className={SLIDE} style={{ background: WHITE, fontFamily: SANS }}>
    {/* ── 見出し ───────────────────────────── */}
    {DeckMark}

    <h1 style={{ position: 'absolute', left: PAD, top: 74, fontSize: 32, fontWeight: 900, color: INK, letterSpacing: '0.02em', lineHeight: 1 }}>
      商談とAIの使い方
    </h1>

    <p style={{ position: 'absolute', left: PAD, top: 118, width: 620, fontSize: 12.5, fontWeight: 600, color: SUB, lineHeight: 1.6, letterSpacing: '0.01em' }}>
      商談は3回。そのあいだをAIが埋めていきます。
    </p>

    {/* 右上：キーメッセージ */}
    <div style={{ position: 'absolute', right: PAD, top: 66, width: 420, textAlign: 'right' }}>
      <p style={{ fontSize: 17, fontWeight: 900, color: INK, lineHeight: 1.55, letterSpacing: '0.01em' }}>
        資料ではなく<span style={{ color: VIOLET_DEEP }}>“動くもの”</span>を見ながら、
        <br />
        決めていただけます。
      </p>
    </div>

    {/* ── 上の帯：商談 ─────────────────────── */}
    <BandLabel
      top={152}
      color={CYAN_DEEP}
      text="商談 ─ お客さまとお会いする場"
      mark={<span style={{ width: 13, height: 13, borderRadius: 7, boxSizing: 'border-box', border: `4px solid ${CYAN}`, background: WHITE }} />}
    />

    {/* ── 本線（駅まわり＝シアン） ───────────── */}
    <div style={{ position: 'absolute', left: CX[0], top: RAIL_TOP, width: CX[3] - CX[0], height: RAIL_H, borderRadius: RAIL_H / 2, background: CYAN }} />

    {/* ── 区間（あいだ＝AI／バイオレット） ───── */}
    {[0, 1, 2].map(i => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: CX[i] + SEG_INSET,
          top: RAIL_TOP,
          width: CX[i + 1] - CX[i] - SEG_INSET * 2,
          height: RAIL_H,
          borderRadius: RAIL_H / 2,
          background: VIOLET,
        }}
      />
    ))}

    {/* ── 駅 ───────────────────────────────── */}
    {STATIONS.map((s, i) => (
      <StationBlock key={s.step} s={s} cx={CX[i]} />
    ))}

    {/* ── 下の帯：AI ───────────────────────── */}
    <BandLabel
      top={414}
      color={VIOLET_DEEP}
      text="AI ─ 商談と商談の「あいだ」"
      mark={<span style={{ width: 18, height: 6, borderRadius: 3, background: VIOLET }} />}
    />

    {/* ── 区間カード ───────────────────────── */}
    {SEGMENTS.map((d, i) => (
      <SegmentCard key={i} d={d} mx={MID[i]} />
    ))}

    {/* ── 終着駅から結論バーへ ─────────────── */}
    <div style={{ position: 'absolute', left: CX[3] - 1, top: RAIL_CY + 17, width: 2, height: BAR_TOP - RAIL_CY - 17, background: LINE }} />
    <div style={{ position: 'absolute', left: CX[3] + 14, top: 496, width: 130, fontSize: 10.5, fontWeight: 700, color: MUTE, lineHeight: 1.6 }}>
      3回の商談が
      <br />
      そのまま提案になる
    </div>

    {/* ── 結論バー ─────────────────────────── */}
    <div
      style={{
        position: 'absolute',
        left: PAD,
        top: BAR_TOP,
        width: CW,
        height: BAR_H,
        boxSizing: 'border-box',
        borderRadius: 14,
        background: INK,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 22px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: 7, height: 7, borderRadius: 4, background: NEON, flexShrink: 0 }} />
        <span style={{ marginLeft: 12, fontSize: 14.5, fontWeight: 800, color: WHITE, letterSpacing: '0.02em', lineHeight: 1 }}>
          AIが商談のあいだを埋めるから、見積とプロトタイプが提案より先に出来上がる。
        </span>
      </div>
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 800,
          color: NEON,
          letterSpacing: '0.04em',
          lineHeight: 1,
          border: `1px solid rgba(63,224,240,0.4)`,
          borderRadius: 999,
          padding: '7px 14px',
          whiteSpace: 'nowrap',
        }}
      >
        最終提案の時点で、認識のズレがない
      </span>
    </div>

    {/* ── 足元 ─────────────────────────────── */}
    <PageNo n={1} />
    <Foot />
  </div>
);

/* ============================================================
   スライド 2 ── 受注までの流れ
   ・1ページ目の「路線」を、意向度が上がる「上昇ライン」に変える
   ・区間（駅と駅のあいだ）＝バイオレット＝AI というルールは共通
   ============================================================ */

const P2_PCT = [0, 40, 70, 90];
const P2_BASE = 276; // 0% の Y
const P2_TOP = 172; // 100% の Y
const P2_NY = P2_PCT.map(p => P2_BASE - (p / 100) * (P2_BASE - P2_TOP));

const CH_X = 56; // チャートSVGの左上
const CH_Y = 150;
const CH_W = 1168;
const CH_H = 150;

const P2_CARD_W = 260;
const P2_CARD_TOP = 300;
const P2_CARD_H = 274;
const P2_PANEL_H = 90;

const PT_TOP = 586; // ポイント行
const PT_H = 31;

/** 線分 a→b を両端から d だけ内側に詰めた座標 */
function insetSeg(ax: number, ay: number, bx: number, by: number, d: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const L = Math.hypot(dx, dy);
  const ux = (dx / L) * d;
  const uy = (dy / L) * d;
  return { x1: ax + ux, y1: ay + uy, x2: bx - ux, y2: by - uy };
}

/* ---------------- 人物グリフ ---------------- */

function Person({ x, y, s = 1, fill = INK }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <circle cx="0" cy="-30" r="8.4" fill={fill} />
      <path d="M-13,0 V-8 A13,13 0 0 1 13,-8 V0 Z" fill={fill} />
    </g>
  );
}

/** 会議テーブルの席（真上から見た人。r=0 でテーブルが上側にある想定） */
function Seat({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${r})`}>
      <rect x="-11" y="3" width="22" height="13" rx="6.5" fill={INK} />
      <circle cx="0" cy="-2" r="7.4" fill={INK} />
    </g>
  );
}

/* ---------------- 場面イラスト（viewBox 240 x 88） ---------------- */

/** 受話器グリフ（24x24 を塗りで描く。ダンベルに見えないよう本物の形にする） */
const PHONE_D =
  'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z';

/** 0%：電話でアポ（2人が電話でつながっている） */
const SceneCall = (
  <svg width="240" height="88" viewBox="0 0 240 88">
    {/* 通話の弧 */}
    <path d="M56 62 Q120 18 184 62" fill="none" stroke={CYAN} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 7" />
    {/* 吹き出し */}
    <g>
      <rect x="6" y="6" width="46" height="21" rx="10" fill={WHITE} stroke={CYAN} strokeWidth="2" />
      <path d="M20 27v8l9-8z" fill={WHITE} stroke={CYAN} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="19" cy="16.5" r="2.1" fill={CYAN} />
      <circle cx="29" cy="16.5" r="2.1" fill={CYAN} />
      <circle cx="39" cy="16.5" r="2.1" fill={CYAN} />
    </g>
    <g>
      <rect x="188" y="6" width="46" height="21" rx="10" fill={WHITE} stroke={CYAN} strokeWidth="2" />
      <path d="M220 27v8l-9-8z" fill={WHITE} stroke={CYAN} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="201" cy="16.5" r="2.1" fill={CYAN} />
      <circle cx="211" cy="16.5" r="2.1" fill={CYAN} />
      <circle cx="221" cy="16.5" r="2.1" fill={CYAN} />
    </g>
    {/* 話している2人 */}
    <Person x={40} y={86} s={0.8} />
    <Person x={200} y={86} s={0.8} />
    {/* 中央の受話器バッジ */}
    <circle cx="120" cy="44" r="19" fill={CYAN} />
    <g transform="translate(109.2,33.2) scale(0.9)">
      <path d={PHONE_D} fill={WHITE} />
    </g>
  </svg>
);

/** 40%：商談1回目（大人数でテーブルを囲む） */
const SceneMeeting = (
  <svg width="240" height="88" viewBox="0 0 240 88">
    {/* 発言の吹き出し */}
    <rect x="4" y="2" width="32" height="18" rx="9" fill={WHITE} stroke={CYAN} strokeWidth="2" />
    <circle cx="13" cy="11" r="1.9" fill={CYAN} />
    <circle cx="20" cy="11" r="1.9" fill={CYAN} />
    <circle cx="27" cy="11" r="1.9" fill={CYAN} />
    <rect x="204" y="2" width="32" height="18" rx="9" fill={WHITE} stroke={CYAN} strokeWidth="2" />
    <circle cx="213" cy="11" r="1.9" fill={CYAN} />
    <circle cx="220" cy="11" r="1.9" fill={CYAN} />
    <circle cx="227" cy="11" r="1.9" fill={CYAN} />
    {/* テーブル */}
    <rect x="66" y="30" width="108" height="26" rx="9" fill={CYAN_TINT} stroke={CYAN} strokeWidth="2.4" />
    <rect x="86" y="38" width="26" height="10" rx="2.5" fill={WHITE} stroke={CYAN_LINE} strokeWidth="1.6" />
    <rect x="128" y="38" width="26" height="10" rx="2.5" fill={WHITE} stroke={CYAN_LINE} strokeWidth="1.6" />
    {/* 8人 */}
    <Seat x={90} y={18} r={180} />
    <Seat x={120} y={18} r={180} />
    <Seat x={150} y={18} r={180} />
    <Seat x={90} y={70} r={0} />
    <Seat x={120} y={70} r={0} />
    <Seat x={150} y={70} r={0} />
    <Seat x={48} y={43} r={90} />
    <Seat x={192} y={43} r={-90} />
  </svg>
);

/** 70%：商談2回目（聴衆の前でプレゼンしている） */
const ScenePresent = (
  <svg width="240" height="88" viewBox="0 0 240 88">
    {/* スクリーン */}
    <rect x="104" y="2" width="132" height="64" rx="7" fill={WHITE} stroke={CYAN} strokeWidth="2.6" />
    <rect x="114" y="11" width="42" height="5" rx="2.5" fill={CYAN} />
    <rect x="114" y="22" width="60" height="3.4" rx="1.7" fill={FILL} />
    <rect x="114" y="30" width="48" height="3.4" rx="1.7" fill={FILL} />
    {/* 画面内のグラフ */}
    <rect x="116" y="48" width="9" height="9" rx="2" fill={CYAN_LINE} />
    <rect x="129" y="42" width="9" height="15" rx="2" fill={CYAN_LINE} />
    <rect x="142" y="35" width="9" height="22" rx="2" fill={CYAN} />
    <path d="M162 52l14-9 12 5 14-16" fill="none" stroke={VIOLET} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="202" cy="32" r="3.4" fill={VIOLET} />
    <path d="M114 57h112" stroke={CYAN_LINE} strokeWidth="1.4" strokeLinecap="round" />
    {/* スタンド */}
    <path d="M170 66v8M154 76h32" stroke={CYAN} strokeWidth="2.6" strokeLinecap="round" />
    {/* 説明する人（腕は胴体から少しだけ伸ばす。始点は胴に隠す） */}
    <path d="M88 69L108 55" stroke={INK} strokeWidth="4.4" strokeLinecap="round" />
    <Person x={86} y={80} s={0.86} />
    {/* 聞いている人（手前・後ろ姿） */}
    <Person x={12} y={88} s={0.8} fill="#AEB9C6" />
    <Person x={37} y={88} s={0.8} fill="#C2CBD6" />
    <Person x={62} y={88} s={0.8} fill="#AEB9C6" />
  </svg>
);

/** きらめき（4方向の星） */
function Spark({ x, y, s, o = 1 }: { x: number; y: number; s: number; o?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s}) translate(-7,-6)`} opacity={o}>
      <path d="M7 0.6l1.5 3.9 3.9 1.5-3.9 1.5L7 11.4 5.5 7.5 1.6 6l3.9-1.5z" fill={NEON} />
    </g>
  );
}

/** 90%：契約（押印済みの契約書。濃紺カード上のため白＋ネオン） */
const SceneContract = (
  <svg width="240" height="88" viewBox="0 0 240 88">
    {/* 契約書 */}
    <rect x="52" y="4" width="118" height="80" rx="7" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.62)" strokeWidth="2.2" />
    <rect x="66" y="16" width="50" height="5.5" rx="2.75" fill={NEON} />
    <rect x="66" y="32" width="46" height="3.6" rx="1.8" fill="rgba(255,255,255,0.32)" />
    <rect x="66" y="42" width="38" height="3.6" rx="1.8" fill="rgba(255,255,255,0.32)" />
    <rect x="66" y="52" width="42" height="3.6" rx="1.8" fill="rgba(255,255,255,0.32)" />
    {/* 署名 */}
    <path d="M68 70q7-9 14 0t14 0" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.2" strokeLinecap="round" />
    <rect x="66" y="76" width="44" height="1.6" rx="0.8" fill="rgba(255,255,255,0.28)" />
    {/* 印影 */}
    <g transform="translate(140,54) rotate(-13)">
      <circle cx="0" cy="0" r="22" fill="none" stroke={NEON} strokeWidth="3" />
      <circle cx="0" cy="0" r="17.4" fill="none" stroke={NEON} strokeWidth="1.5" />
      <rect x="-9.4" y="-9" width="8" height="3" rx="1.5" fill={NEON} />
      <rect x="-9.4" y="-1.5" width="8" height="3" rx="1.5" fill={NEON} />
      <rect x="-9.4" y="6" width="8" height="3" rx="1.5" fill={NEON} />
      <rect x="1.4" y="-9" width="8" height="3" rx="1.5" fill={NEON} />
      <rect x="1.4" y="-1.5" width="8" height="3" rx="1.5" fill={NEON} />
      <rect x="1.4" y="6" width="8" height="3" rx="1.5" fill={NEON} />
    </g>
    {/* 成立のきらめき */}
    <Spark x={22} y={20} s={1.4} />
    <Spark x={212} y={26} s={1.2} />
    <Spark x={28} y={64} s={0.8} o={0.65} />
    <Spark x={206} y={68} s={0.9} o={0.7} />
  </svg>
);

/* ---------------- 場面カード ---------------- */

type SceneData = {
  pct: number;
  name: string;
  desc: string;
  art: React.ReactNode;
  headEn: string;
  headJa: string;
  ai?: boolean;
  items: [string, string][];
  seal?: string;
  terminal?: boolean;
};

const SCENES: SceneData[] = [
  {
    pct: 0,
    name: '電話でアポ',
    desc: 'お客さまとの最初の接点',
    art: SceneCall,
    headEn: 'CALL',
    headJa: '電話で確認すること',
    items: [
      ['plan', '打ち合わせ日の相談'],
      ['list', '概要をヒアリング'],
      ['mic', '通話メモ・録音を取得'],
    ],
  },
  {
    pct: 40,
    name: '商談 1回目',
    desc: 'ヒアリングと事前QAの確認',
    art: SceneMeeting,
    headEn: 'AI',
    headJa: 'すべてAIで自動作成',
    ai: true,
    items: [
      ['layers', '開発のご提案策定'],
      ['window', 'ラフな画面実装'],
      ['doc', '仕様書の叩き台'],
    ],
  },
  {
    pct: 70,
    name: '商談 2回目',
    desc: 'ご提案内容・画面イメージ・予算をご説明',
    art: ScenePresent,
    headEn: 'AI',
    headJa: 'すべてAIで自動作成',
    ai: true,
    items: [
      ['doc', '最終提案資料の作成'],
      ['code', 'コーディング'],
      ['yen', '本見積もりの作成'],
    ],
  },
  {
    pct: 90,
    name: '契約',
    desc: '提案内容と見積内容にご納得いただく',
    art: SceneContract,
    headEn: 'AGREED',
    headJa: 'ご納得いただけたもの',
    items: [
      ['check', 'ご提案内容'],
      ['check', 'お見積内容'],
    ],
    seal: 'ご契約',
    terminal: true,
  },
];

function SceneCard({ d, cx }: { d: SceneData; cx: number }) {
  const term = !!d.terminal;
  const headColor = d.ai ? VIOLET_DEEP : term ? NEON : CYAN_DEEP;
  const left = cx - P2_CARD_W / 2;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: P2_CARD_TOP,
        width: P2_CARD_W,
        height: P2_CARD_H,
        boxSizing: 'border-box',
        borderRadius: 14,
        background: term ? INK : WHITE,
        border: `1px solid ${term ? INK : LINE}`,
        overflow: 'hidden',
      }}
    >
      {/* イラスト面 */}
      <div
        style={{
          height: P2_PANEL_H,
          background: term ? 'rgba(255,255,255,0.05)' : CYAN_TINT,
          borderBottom: `1px solid ${term ? 'rgba(255,255,255,0.12)' : CYAN_LINE}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {d.art}
      </div>

      {/* 場面名 */}
      <div
        style={{
          position: 'absolute',
          left: 14,
          top: 98,
          fontSize: 16,
          fontWeight: 900,
          color: term ? WHITE : INK,
          letterSpacing: '0.02em',
          lineHeight: 1,
        }}
      >
        {d.name}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 14,
          top: 119,
          width: P2_CARD_W - 28,
          fontSize: 10,
          fontWeight: 600,
          color: term ? 'rgba(255,255,255,0.62)' : SUB,
          lineHeight: 1.3,
        }}
      >
        {d.desc}
      </div>

      {/* 区切り */}
      <div
        style={{
          position: 'absolute',
          left: 14,
          top: 142,
          width: P2_CARD_W - 28,
          height: 1,
          background: term ? 'rgba(255,255,255,0.12)' : FILL,
        }}
      />

      {/* 小見出し */}
      <div style={{ position: 'absolute', left: 14, top: 151, display: 'flex', alignItems: 'center', height: 13 }}>
        <span style={{ width: 14, height: 5, borderRadius: 3, background: d.ai ? VIOLET : term ? NEON : CYAN, flexShrink: 0 }} />
        <span
          style={{ fontFamily: NUM, fontSize: 9, fontWeight: 800, letterSpacing: '0.20em', color: headColor, marginLeft: 8, lineHeight: 1 }}
        >
          {d.headEn}
        </span>
        <span style={{ fontSize: 9.5, fontWeight: 800, color: headColor, marginLeft: 8, letterSpacing: '0.04em', lineHeight: 1 }}>
          {d.headJa}
        </span>
      </div>

      {/* 成果物 */}
      <div
        style={{
          position: 'absolute',
          left: 14,
          top: 172,
          width: P2_CARD_W - 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {d.items.map(([ico, label]) => (
          <div
            key={label}
            style={{
              height: 26,
              boxSizing: 'border-box',
              background: term ? 'rgba(255,255,255,0.07)' : d.ai ? VIOLET_TINT : WHITE,
              border: `1px solid ${term ? 'rgba(255,255,255,0.2)' : d.ai ? VIOLET_LINE : LINE}`,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              padding: '0 9px',
            }}
          >
            <Ico name={ico} color={term ? NEON : d.ai ? VIOLET_DEEP : CYAN_DEEP} />
            <span
              style={{
                marginLeft: 7,
                fontSize: 11,
                fontWeight: 700,
                color: term ? WHITE : INK,
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          </div>
        ))}

        {d.seal && (
          <div
            style={{
              marginTop: 2,
              height: 30,
              boxSizing: 'border-box',
              backgroundImage: `linear-gradient(120deg, ${MINT} 0%, ${NEON} 55%, ${SKY} 100%)`,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14">
              <path d="M7 0.6l1.5 3.9 3.9 1.5-3.9 1.5L7 11.4 5.5 7.5 1.6 6l3.9-1.5z" fill={INK} opacity="0.75" />
            </svg>
            <span style={{ marginLeft: 8, fontSize: 13.5, fontWeight: 900, color: INK, letterSpacing: '0.12em', lineHeight: 1 }}>
              {d.seal}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- ポイント行 ---------------- */

function PointRow({ n, top, text, color, tint, line }: { n: number; top: number; text: string; color: string; tint: string; line: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: PAD,
        top,
        width: 944,
        height: PT_H,
        boxSizing: 'border-box',
        border: `1px solid ${line}`,
        borderRadius: 9,
        background: WHITE,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 92,
          height: '100%',
          background: tint,
          borderRight: `1px solid ${line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: NUM, fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', color, lineHeight: 1 }}>POINT</span>
        <span style={{ fontFamily: NUM, fontSize: 12.5, fontWeight: 900, color, marginLeft: 6, lineHeight: 1 }}>{n}</span>
      </div>
      <span style={{ marginLeft: 16, fontSize: 12.5, fontWeight: 700, color: INK, letterSpacing: '0.01em', lineHeight: 1 }}>{text}</span>
    </div>
  );
}

/* ---------------- スライド2 本体 ---------------- */

/* ============================================================
   表紙 ── 都市景色の全面写真 ＋ 左寄せのタイトル
   ・背景は会社紹介資料（meece-intro）の表紙と同じ都市景色を使用
     └ 本編2ページとは違い、この1枚だけ外部画像に依存する。
        PDF出力時は html-to-image が画像を data URI 化して埋め込むため
        Unsplash 側の CORS ヘッダに依存する（meece-intro と同条件）
   ・写真を見せるため図版は置かない。要素は資料名まわりと発行元のみ
   ・ページ番号は持たない（本編を 1/2・2/2 とする）
   ============================================================ */

const SlideCover = (
  <div className={SLIDE} style={{ background: '#000814', fontFamily: SANS }}>
    {/* ───── 背景：会社紹介資料（meece-intro）の表紙と同じ都市景色 ───── */}
    <img
      src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2044&auto=format&fit=crop"
      alt="City Background"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: 'brightness(1.1) contrast(1.05) saturate(1.2) hue-rotate(-5deg)' }}
    />
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, rgba(0,8,20,0.88) 0%, rgba(0,8,20,0.66) 50%, rgba(0,8,20,0.34) 100%)' }}
    />

    {/* ───── 左：タイトル（写真の上なので白抜き） ───── */}
    <div
      style={{
        position: 'absolute',
        left: PAD,
        top: 60,
        display: 'inline-flex',
        alignItems: 'center',
        height: 26,
        boxSizing: 'border-box',
        padding: '0 13px',
        borderRadius: 13,
        border: '1px solid rgba(255,255,255,0.28)',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 3, background: NEON, flexShrink: 0 }} />
      <span style={{ fontFamily: NUM, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.22em', color: '#8FEDF7', marginLeft: 9, lineHeight: 1 }}>
        MEECE SALES ROUTE
      </span>
    </div>

    <span
      style={{
        position: 'absolute',
        left: PAD,
        top: 252,
        fontFamily: NUM,
        fontSize: 11.5,
        fontWeight: 800,
        letterSpacing: '0.38em',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1,
      }}
    >
      SALES PROCESS
    </span>

    <h1
      style={{
        position: 'absolute',
        left: PAD,
        top: 284,
        fontSize: 72,
        fontWeight: 900,
        color: WHITE,
        letterSpacing: '0.02em',
        lineHeight: 1,
      }}
    >
      ご提案の進め方
    </h1>

    <div
      style={{
        position: 'absolute',
        left: PAD,
        top: 388,
        width: 88,
        height: 5,
        borderRadius: 2.5,
        backgroundImage: `linear-gradient(90deg, ${NEON} 0%, #9575FF 100%)`,
      }}
    />

    <p
      style={{
        position: 'absolute',
        left: PAD,
        top: 420,
        width: 620,
        fontSize: 18,
        fontWeight: 800,
        color: 'rgba(255,255,255,0.94)',
        letterSpacing: '0.05em',
        lineHeight: 1.5,
      }}
    >
      商談とAIの使い方 ／ 受注までの流れ
    </p>

    <p
      style={{
        position: 'absolute',
        left: PAD,
        top: 468,
        width: 620,
        fontSize: 13.5,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: '0.01em',
        lineHeight: 1.9,
      }}
    >
      アポから契約まで、商談と商談の「あいだ」をAIが埋めていきます。
      <br />
      お客さまは資料ではなく“動くもの”を見ながら、判断できます。
    </p>

    {/* 発行元 */}
    <div style={{ position: 'absolute', left: PAD, top: 618, width: CW, height: 1, background: 'rgba(255,255,255,0.18)' }} />
    <p style={{ position: 'absolute', left: PAD, top: 642, fontSize: 15, fontWeight: 900, color: WHITE, letterSpacing: '0.05em', lineHeight: 1 }}>
      Meece株式会社
    </p>
    <p
      style={{
        position: 'absolute',
        right: PAD,
        top: 644,
        fontFamily: NUM,
        fontSize: 12,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.48)',
        letterSpacing: '0.16em',
        lineHeight: 1,
      }}
    >
      2026.08
    </p>
  </div>
);

const Slide2 = (
  <div className={SLIDE} style={{ background: WHITE, fontFamily: SANS }}>
    {DeckMark}

    <h1 style={{ position: 'absolute', left: PAD, top: 74, fontSize: 32, fontWeight: 900, color: INK, letterSpacing: '0.02em', lineHeight: 1 }}>
      受注までの流れ
    </h1>

    <p style={{ position: 'absolute', left: PAD, top: 118, width: 620, fontSize: 12.5, fontWeight: 600, color: SUB, lineHeight: 1.6, letterSpacing: '0.01em' }}>
      商談を重ねるたびに、お客さまの意向度が上がっていきます。
    </p>

    <div style={{ position: 'absolute', right: PAD, top: 58, width: 420, textAlign: 'right' }}>
      <p style={{ fontSize: 17, fontWeight: 900, color: INK, lineHeight: 1.55, letterSpacing: '0.01em' }}>
        商談中に開発が進むから、
        <br />
        <span style={{ color: VIOLET_DEEP }}>ゴールが見えて</span>意向度が上がる。
      </p>
    </div>

    {/* ── 意向度カーブ ───────────────────────── */}
    <svg
      width={CH_W}
      height={CH_H}
      viewBox={`0 0 ${CH_W} ${CH_H}`}
      style={{ position: 'absolute', left: CH_X, top: CH_Y }}
    >
      <defs>
        <linearGradient id="meece-p2-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9F1F6" />
          <stop offset="100%" stopColor={WHITE} />
        </linearGradient>
      </defs>

      {/* 目盛り線（25 / 50 / 75%） */}
      {[25, 50, 75].map(p => {
        const y = P2_BASE - (p / 100) * (P2_BASE - P2_TOP) - CH_Y;
        return <path key={p} d={`M62 ${y}H${CH_W}`} stroke={LINE} strokeWidth="1" strokeDasharray="2 5" />;
      })}

      {/* 0% の基準線 */}
      <path d={`M62 ${P2_BASE - CH_Y}H${CH_W}`} stroke="#CBD4DE" strokeWidth="1.4" />

      {/* 面 */}
      <path
        d={
          `M${CX[0] - CH_X} ${P2_NY[0] - CH_Y}` +
          P2_NY.slice(1).map((y, i) => ` L${CX[i + 1] - CH_X} ${y - CH_Y}`).join('') +
          ` L${CX[3] - CH_X} ${P2_BASE - CH_Y} L${CX[0] - CH_X} ${P2_BASE - CH_Y} Z`
        }
        fill="url(#meece-p2-area)"
      />

      {/* 本線（シアン） */}
      <path
        d={
          `M${CX[0] - CH_X} ${P2_NY[0] - CH_Y}` +
          P2_NY.slice(1).map((y, i) => ` L${CX[i + 1] - CH_X} ${y - CH_Y}`).join('')
        }
        fill="none"
        stroke={CYAN}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 各点から基準線への垂線 */}
      {P2_NY.slice(1).map((y, i) => (
        <path
          key={i}
          d={`M${CX[i + 1] - CH_X} ${y - CH_Y}V${P2_BASE - CH_Y}`}
          stroke="#C9D8DE"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      ))}

      {/* 区間（AI＝バイオレット） */}
      {[0, 1, 2].map(i => {
        const g = insetSeg(CX[i] - CH_X, P2_NY[i] - CH_Y, CX[i + 1] - CH_X, P2_NY[i + 1] - CH_Y, 34);
        return (
          <path
            key={i}
            d={`M${g.x1} ${g.y1}L${g.x2} ${g.y2}`}
            stroke={VIOLET}
            strokeWidth="8"
            strokeLinecap="round"
          />
        );
      })}
    </svg>

    {/* 縦軸の目盛り */}
    {[0, 25, 50, 75].map(p => (
      <div
        key={p}
        style={{
          position: 'absolute',
          left: PAD,
          top: P2_BASE - (p / 100) * (P2_BASE - P2_TOP) - 5,
          width: 52,
          textAlign: 'right',
          fontFamily: NUM,
          fontSize: 9,
          fontWeight: 700,
          color: MUTE,
          lineHeight: 1,
        }}
      >
        {p}%
      </div>
    ))}

    {/* 軸タイトル */}
    <div style={{ position: 'absolute', left: PAD, top: 152, display: 'flex', alignItems: 'center' }}>
      <span style={{ width: 8, height: 8, borderRadius: 2, background: CYAN, flexShrink: 0 }} />
      <span style={{ marginLeft: 8, fontSize: 10.5, fontWeight: 800, color: SUB, letterSpacing: '0.08em', lineHeight: 1 }}>
        お客様意向度
      </span>
    </div>

    {/* 区間ごとの上昇幅 */}
    {[0, 1, 2].map(i => {
      const mx = (CX[i] + CX[i + 1]) / 2;
      const my = (P2_NY[i] + P2_NY[i + 1]) / 2;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: mx - 28,
            top: my - 34,
            width: 56,
            height: 22,
            boxSizing: 'border-box',
            borderRadius: 11,
            background: VIOLET,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: NUM, fontSize: 12, fontWeight: 900, color: WHITE, letterSpacing: '0.02em', lineHeight: 1 }}>
            +{P2_PCT[i + 1] - P2_PCT[i]}
          </span>
        </div>
      );
    })}

    {/* ノード ＋ ％ */}
    {SCENES.map((d, i) => {
      const term = !!d.terminal;
      const r = term ? 17 : 15;
      return (
        <div key={d.name}>
          <div
            style={{
              position: 'absolute',
              left: CX[i] - 60,
              top: P2_NY[i] - 46,
              width: 120,
              textAlign: 'center',
              fontFamily: NUM,
              fontSize: 24,
              fontWeight: 900,
              color: term ? INK : CYAN_DEEP,
              letterSpacing: '0.01em',
              lineHeight: 1,
            }}
          >
            {d.pct}%
          </div>
          <div
            style={{
              position: 'absolute',
              left: CX[i] - r,
              top: P2_NY[i] - r,
              width: r * 2,
              height: r * 2,
              borderRadius: r,
              boxSizing: 'border-box',
              background: term ? INK : WHITE,
              border: term ? `4px solid ${INK}` : `7px solid ${CYAN}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {term && (
              <span style={{ width: 16, height: 16, borderRadius: 8, boxSizing: 'border-box', border: `3px solid ${WHITE}` }} />
            )}
          </div>
        </div>
      );
    })}

    {/* ── 場面カード ───────────────────────── */}
    {SCENES.map((d, i) => (
      <SceneCard key={d.name} d={d} cx={CX[i]} />
    ))}

    {/* ── ポイント ─────────────────────────── */}
    <PointRow
      n={1}
      top={PT_TOP}
      text="商談のたび、都度録画・文字起こしを作成し、AIに材料を渡す"
      color={CYAN_DEEP}
      tint={CYAN_TINT}
      line={CYAN_LINE}
    />
    <PointRow
      n={2}
      top={PT_TOP + PT_H + 6}
      text="商談中に開発を進めることで、開発プロジェクトのゴールをイメージしやすくする"
      color={VIOLET_DEEP}
      tint={VIOLET_TINT}
      line={VIOLET_LINE}
    />

    {/* 矢印 */}
    <div
      style={{
        position: 'absolute',
        left: 1010,
        top: PT_TOP + PT_H - 6,
        width: 0,
        height: 0,
        borderTop: '9px solid transparent',
        borderBottom: '9px solid transparent',
        borderLeft: `13px solid ${INK}`,
      }}
    />

    {/* 契約率アップ */}
    <div
      style={{
        position: 'absolute',
        left: 1038,
        top: PT_TOP,
        width: 186,
        height: PT_H * 2 + 6,
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(120deg, ${MINT} 0%, ${NEON} 52%, ${SKY} 100%)`,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* きらめき */}
      <svg width="186" height="68" viewBox="0 0 186 68" style={{ position: 'absolute', left: 0, top: 0 }}>
        <path d="M17 12l1.8 4.6 4.6 1.8-4.6 1.8L17 24.8l-1.8-4.6-4.6-1.8 4.6-1.8z" fill="rgba(255,255,255,0.85)" />
        <path d="M167 44l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.4z" fill="rgba(255,255,255,0.8)" />
        <path d="M24 50l1.1 2.8 2.8 1.1-2.8 1.1L24 57.8l-1.1-2.8-2.8-1.1 2.8-1.1z" fill="rgba(255,255,255,0.7)" />
        <circle cx="160" cy="16" r="3" fill="rgba(255,255,255,0.6)" />
      </svg>
      <svg width="21" height="21" viewBox="0 0 20 20" style={{ position: 'relative' }}>
        <path d="M3.4 14.6L8 9.4l3.4 3 5.2-6.6" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.4 5.8h4.6v4.6" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        style={{
          position: 'relative',
          marginLeft: 10,
          fontSize: 16,
          fontWeight: 900,
          color: INK,
          letterSpacing: '0.04em',
          lineHeight: 1,
        }}
      >
        契約率アップ
      </span>
    </div>

    <PageNo n={2} />
    <Foot />
  </div>
);

export const meeceSalesPresentation: PresentationEntry = {
  meta: {
    id: 'meece-sales-2026',
    title: 'Meece 営業資料',
    description:
      'アポから最終提案までの進め方と、商談と商談のあいだでAIをどう使って見積・試作画面をつくるかを路線図で示した営業資料。作成：Meece株式会社。',
    thumbnail: `linear-gradient(135deg, ${WHITE} 0%, ${WHITE} 42%, ${CYAN} 56%, ${VIOLET} 78%, ${INK} 100%)`,
    author: 'Meece株式会社',
    createdAt: '2026-08-14',
  },
  slides: [
    SlideCover, // 表紙（ページ番号なし）
    Slide1, // 1 商談とAIの使い方（路線図）
    Slide2, // 2 受注までの流れ（意向度カーブ）
  ],
};
