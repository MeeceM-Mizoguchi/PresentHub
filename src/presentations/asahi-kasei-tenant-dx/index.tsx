import {
  MapPin,
  Coins,
  Send,
  Repeat,
  Network,
  Database,
  Search,
  Mail,
  Sparkles,
  Bot,
  Brain,
  TrendingUp,
  Handshake,
  ArrowDown,
  ArrowRight,
  TriangleAlert,
  Users,
  Footprints,
  Target,
  ScanText,
  ClipboardList,
  Server,
  Building2,
  Workflow,
  Siren,
} from 'lucide-react';
import type { PresentationEntry } from '../registry';

/* ============================================================
   旭化成ホームズ株式会社 御中
   テナント事業 DX ／ 経営ご提案
   テナントマッチング AIプラットフォーム構築のご提案
   ご提案元：Meece株式会社

   Design : "Light × Advanced Editorial" ＋ 図解主体
   ─ オフホワイト紙面 × インク × 単一ディープグリーン
   ============================================================ */

const PAPER = '#F4F5F7';
const CARD = '#FFFFFF';
const INK = '#0F1115';
const GRAPHITE = '#3A3E46';
const MUTE = '#83878F';
const FAINT = '#C3C6CD';
const LINE = '#E4E6EA';
const HAIR = '#EDEEF1';
const ACCENT = '#0B7C6A';
const ACCENT_INK = '#08604F';
const ACCENT_SOFT = '#E2F1ED';
const SIGNAL = '#DD5730';
const SIGNAL_SOFT = '#FCEDE7';
const GOLD = '#E8B44A';

const MONO = "'SF Mono', ui-monospace, 'Menlo', 'Roboto Mono', monospace";
const SANS = "-apple-system, 'Helvetica Neue', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

const SLIDE = 'w-full h-[720px] relative overflow-hidden';
const DECK_TAG = 'テナントマッチング AIプラットフォーム構築のご提案';
const TOTAL = 15;
const MINT = '#5FE0BE';
const SECTION_BG = '#07312A';

/* ---------------- 共通クロム ---------------- */

function Eyebrow({ label, color = ACCENT_INK }: { label: string; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 24, height: 2, background: color, flexShrink: 0 }} />
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', color, fontWeight: 700, textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

function Rail({ n }: { n: number }) {
  return (
    <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 3, background: HAIR, zIndex: 6 }}>
      <div style={{ width: `${(n / TOTAL) * 100}%`, height: '100%', background: ACCENT }} />
    </div>
  );
}

function Frame({ n, children, pad = '58px 64px 34px' }: { n: number; children: React.ReactNode; pad?: string }) {
  return (
    <div className={SLIDE} style={{ background: PAPER, fontFamily: SANS }}>
      <div style={{ position: 'absolute', top: 22, left: 64, right: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 4 }}>
        <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: MUTE }}>{DECK_TAG}</span>
        <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: MUTE }}>
          <span style={{ color: INK, fontWeight: 700 }}>{String(n).padStart(2, '0')}</span> / {TOTAL}
        </span>
      </div>
      <div style={{ position: 'absolute', inset: 0, padding: pad, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>{children}</div>
      <Rail n={n} />
    </div>
  );
}

function Head({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <Eyebrow label={eyebrow} />
      <h2 style={{ fontSize: 30, fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.3, marginTop: 14 }}>{title}</h2>
      {sub && <p style={{ fontSize: 13, color: MUTE, fontWeight: 600, marginTop: 9, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

/* パネル（見出し付きカード） */
function Panel({
  tag,
  title,
  children,
  accent = false,
}: {
  tag: string;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${LINE}`,
        borderRadius: 12,
        padding: '14px 16px 15px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 10px 28px rgba(15,17,21,0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, borderBottom: `1px solid ${HAIR}`, paddingBottom: 9, marginBottom: 12, flexShrink: 0 }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            letterSpacing: '0.14em',
            fontWeight: 700,
            borderRadius: 3,
            padding: '3px 7px',
            color: accent ? '#fff' : MUTE,
            background: accent ? ACCENT : '#EAEBEE',
          }}
        >
          {tag}
        </span>
        <span style={{ fontSize: 14, fontWeight: 800, color: INK }}>{title}</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>{children}</div>
    </div>
  );
}

/* ---------------- 章扉（セクションスライド） ---------------- */

function SectionSlide({ n, num, en, jp, lead, items }: { n: number; num: string; en: string; jp: string; lead: string; items: string[] }) {
  return (
    <div className={SLIDE} style={{ background: SECTION_BG, fontFamily: SANS }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 88% 10%, rgba(11,124,106,0.55), transparent 55%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 2% 94%, rgba(11,124,106,0.3), transparent 50%)' }} />

      <div style={{ position: 'absolute', top: 22, left: 64, right: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 4 }}>
        <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)' }}>{DECK_TAG}</span>
        <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)' }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>{String(n).padStart(2, '0')}</span> / {TOTAL}
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', padding: '0 64px', boxSizing: 'border-box', gap: 56 }}>
        {/* 章番号 */}
        <div style={{ flexShrink: 0 }}>
          <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>CHAPTER</p>
          <p style={{ fontFamily: MONO, fontSize: 104, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.05em', marginTop: 4 }}>{num}</p>
          <div style={{ width: 58, height: 3, background: MINT, marginTop: 20 }} />
        </div>

        {/* タイトル */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.24em', color: MINT, fontWeight: 700 }}>{en}</p>
          <h2 style={{ fontSize: 46, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.26, marginTop: 15 }}>{jp}</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 600, lineHeight: 1.85, marginTop: 16, maxWidth: 620 }}>{lead}</p>

          <div style={{ display: 'flex', gap: 8, marginTop: 26, flexWrap: 'wrap' }}>
            {items.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(255,255,255,0.26)',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 999,
                  padding: '6px 14px',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 3, background: 'rgba(255,255,255,0.14)', zIndex: 6 }}>
        <div style={{ width: `${(n / TOTAL) * 100}%`, height: '100%', background: MINT }} />
      </div>
    </div>
  );
}

/* 小さなラベルチップ */
function Chip({ text, tone = 'line' }: { text: string; tone?: 'line' | 'accent' | 'signal' | 'gold' }) {
  const map = {
    line: { bg: '#F3F4F6', bd: LINE, fg: GRAPHITE },
    accent: { bg: ACCENT_SOFT, bd: ACCENT, fg: ACCENT_INK },
    signal: { bg: SIGNAL_SOFT, bd: SIGNAL, fg: SIGNAL },
    gold: { bg: '#FDF4E1', bd: GOLD, fg: '#9A6B10' },
  }[tone];
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10.5,
        fontWeight: 700,
        color: map.fg,
        background: map.bg,
        border: `1px solid ${map.bd}`,
        borderRadius: 999,
        padding: '3px 9px',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
}


/* ===================================================================== */
/* SLIDE 1 — 表紙                                                         */
/* ===================================================================== */

const COVER_CAPS = [
  { icon: MapPin, t: '立地分析AI', en: 'LOCATION AI' },
  { icon: Coins, t: '賃料推定', en: 'RENT ESTIMATE' },
  { icon: Send, t: 'リーシング自動化', en: 'LEASING AUTOMATION' },
  { icon: Repeat, t: 'フィードバック学習', en: 'FEEDBACK LOOP' },
  { icon: Network, t: '暗黙知の形式知化', en: 'KNOWLEDGE ASSET' },
];

const Slide1 = (
  <div key="s1" className={SLIDE} style={{ background: PAPER, fontFamily: SANS }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 92% 6%, rgba(11,124,106,0.09), transparent 46%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 2% 96%, rgba(11,124,106,0.06), transparent 44%)' }} />

    <div style={{ position: 'absolute', top: 38, left: 72, right: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: ACCENT_INK, fontWeight: 700 }}>TENANT BUSINESS DX</span>
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: MUTE }}>PROPOSAL / 2026.07</span>
    </div>
    <div style={{ position: 'absolute', top: 62, left: 72, right: 72, height: 1, background: LINE, zIndex: 2 }} />

    <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', padding: '0 72px', boxSizing: 'border-box', gap: 44 }}>
      {/* 左：タイトル */}
      <div style={{ flex: 1.32 }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: GRAPHITE, letterSpacing: '0.04em', marginBottom: 18 }}>テナント事業 DX ／ 経営ご提案</p>
        <h1 style={{ fontSize: 47, fontWeight: 800, color: INK, letterSpacing: '-0.03em', lineHeight: 1.24 }}>
          AI開発による
          <br />
          <span style={{ color: ACCENT }}>事業戦略立案</span>
        </h1>
        <div style={{ width: 64, height: 3, background: ACCENT, margin: '26px 0 22px' }} />
        <p style={{ fontSize: 18, fontWeight: 800, color: INK, lineHeight: 1.6 }}>テナントマッチング AIプラットフォーム構築のご提案</p>
        <p style={{ fontSize: 13.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.75, marginTop: 8 }}>
          立地分析AI・賃料推定・リーシング自動化で、テナント事業を<strong style={{ color: ACCENT_INK, fontWeight: 800 }}>収益の柱</strong>に
        </p>
      </div>

      {/* 右：提供ケイパビリティ */}
      <div style={{ flex: 0.9 }}>
        <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: MUTE, marginBottom: 14 }}>CAPABILITIES — 05</p>
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 16, padding: '10px 18px', boxShadow: '0 18px 44px rgba(15,17,21,0.06)' }}>
          {COVER_CAPS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.t}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '13px 0',
                  borderBottom: i < COVER_CAPS.length - 1 ? `1px solid ${HAIR}` : 'none',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: i < 3 ? ACCENT_SOFT : '#F3F4F6',
                    border: `1.5px solid ${i < 3 ? ACCENT : LINE}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: 17, height: 17, color: i < 3 ? ACCENT_INK : GRAPHITE, strokeWidth: 1.8 }} />
                </div>
                <div>
                  <p style={{ fontSize: 14.5, fontWeight: 800, color: INK }}>{c.t}</p>
                  <p style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '0.16em', color: MUTE, marginTop: 2 }}>{c.en}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* 提案先／提案元／日付 */}
    <div style={{ position: 'absolute', bottom: 34, left: 72, right: 72, display: 'flex', gap: 46, zIndex: 2, borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
      {[
        { k: 'ご提案先', v: '旭化成ホームズ株式会社 御中' },
        { k: 'ご提案元', v: 'Meece株式会社' },
        { k: 'DATE', v: '2026年7月' },
      ].map((b) => (
        <div key={b.k}>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: MUTE, fontWeight: 700, marginBottom: 5 }}>{b.k}</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: INK }}>{b.v}</p>
        </div>
      ))}
    </div>
    <Rail n={1} />
  </div>
);

/* ===================================================================== */
/* SLIDE 2 — 今回のミッション                                             */
/* ===================================================================== */

/* 中央：システム／AIの同心円 ＋ 四方向コネクタ */
function MissionCore() {
  return (
    <svg viewBox="0 0 320 300" style={{ width: 320, height: 300, flexShrink: 0 }}>
      {/* コネクタ */}
      <line x1="0" y1="62" x2="118" y2="134" stroke={FAINT} strokeWidth="1.4" />
      <line x1="0" y1="238" x2="118" y2="166" stroke={FAINT} strokeWidth="1.4" />
      <line x1="320" y1="62" x2="202" y2="134" stroke={FAINT} strokeWidth="1.4" />
      <line x1="320" y1="238" x2="202" y2="166" stroke={FAINT} strokeWidth="1.4" />

      {/* システム（外円） */}
      <circle cx="160" cy="150" r="118" fill={CARD} stroke={LINE} strokeWidth="1.6" />
      <text x="160" y="60" textAnchor="middle" fontSize="14" fontWeight="800" fill={GRAPHITE} fontFamily={SANS}>
        システム
      </text>

      {/* AI（内円） */}
      <circle cx="160" cy="150" r="54" fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth="1.8" />
      <text x="160" y="160" textAnchor="middle" fontSize="30" fontWeight="800" fill={ACCENT_INK} fontFamily={SANS} letterSpacing="2">
        AI
      </text>
      <text x="160" y="182" textAnchor="middle" fontSize="9" fontWeight="700" fill={ACCENT_INK} fontFamily={MONO} letterSpacing="1.6">
        CORE
      </text>
    </svg>
  );
}

function CoreBox({ label, tag, side, icon: Icon }: { label: string; tag: string; side: 'left' | 'right'; icon: any }) {
  const tagEl = (
    <span
      style={{
        fontSize: 10.5,
        fontWeight: 800,
        color: ACCENT_INK,
        background: ACCENT_SOFT,
        borderLeft: side === 'left' ? `1px solid ${LINE}` : 'none',
        borderRight: side === 'right' ? `1px solid ${LINE}` : 'none',
        padding: '0 11px',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        lineHeight: 1.3,
        textAlign: 'center',
        whiteSpace: 'pre-line',
        flexShrink: 0,
      }}
    >
      {tag}
    </span>
  );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        background: CARD,
        border: `1.5px solid ${LINE}`,
        borderRadius: 8,
        overflow: 'hidden',
        height: 56,
        boxShadow: '0 8px 20px rgba(15,17,21,0.04)',
      }}
    >
      {side === 'right' && tagEl}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', justifyContent: side === 'left' ? 'flex-end' : 'flex-start' }}>
        {side === 'right' && <Icon style={{ width: 16, height: 16, color: GRAPHITE, strokeWidth: 1.8, flexShrink: 0 }} />}
        <span style={{ fontSize: 13.5, fontWeight: 800, color: INK }}>{label}</span>
        {side === 'left' && <Icon style={{ width: 16, height: 16, color: GRAPHITE, strokeWidth: 1.8, flexShrink: 0 }} />}
      </div>
      {side === 'left' && tagEl}
    </div>
  );
}

const Slide2 = (
  <Frame n={3}>
    <Head
      eyebrow="Mission / 今回のミッション"
      title={
        <>
          <span style={{ color: SIGNAL }}>属人的</span>になっている業務を、システムとAIで置き換える
        </>
      }
    />

    {/* ミッションステートメント */}
    <div
      style={{
        marginTop: 16,
        background: CARD,
        border: `1px solid ${LINE}`,
        borderLeft: `3px solid ${ACCENT}`,
        borderRadius: 6,
        padding: '13px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
      }}
    >
      <Target style={{ width: 17, height: 17, color: ACCENT, strokeWidth: 2, flexShrink: 0 }} />
      <p style={{ fontSize: 14, fontWeight: 700, color: GRAPHITE, lineHeight: 1.65 }}>
        属人的になっている業務をシステムやAIで構築し、
        <strong style={{ color: INK, fontWeight: 800 }}>損失を限りなく少なく</strong>、
        <strong style={{ color: ACCENT, fontWeight: 800 }}>売上を底上げする</strong>こと
      </p>
    </div>

    {/* 中核ダイアグラム */}
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginTop: 4 }}>
      {/* 左：AI機能 */}
      <div style={{ flex: 1, position: 'relative', height: 300, maxWidth: 300 }}>
        <div style={{ position: 'absolute', top: 34, left: 0, right: 0 }}>
          <CoreBox label="レコメンド" tag={'AI\n機能'} side="left" icon={Sparkles} />
        </div>
        <div style={{ position: 'absolute', top: 210, left: 0, right: 0 }}>
          <CoreBox label="データチェック" tag={'AI\n機能'} side="left" icon={ScanText} />
        </div>
        <p style={{ position: 'absolute', top: 0, left: 0, fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.18em', color: MUTE, fontWeight: 700 }}>AI FUNCTIONS</p>
      </div>

      <MissionCore />

      {/* 右：学習機能 */}
      <div style={{ flex: 1, position: 'relative', height: 300, maxWidth: 300 }}>
        <div style={{ position: 'absolute', top: 34, left: 0, right: 0 }}>
          <CoreBox label="機械学習" tag={'学習\n機能'} side="right" icon={Brain} />
        </div>
        <div style={{ position: 'absolute', top: 210, left: 0, right: 0 }}>
          <CoreBox label="オペレーション学習" tag={'学習\n機能'} side="right" icon={Workflow} />
        </div>
        <p style={{ position: 'absolute', top: 0, right: 0, fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.18em', color: MUTE, fontWeight: 700 }}>LEARNING</p>
      </div>
    </div>

    <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
      {[
        { t: 'システムが業務を「回す」', d: '土地・テナント・打診履歴を1つの器で管理' },
        { t: 'AIが判断を「支える」', d: 'レコメンドとデータチェックで抜け漏れを防ぐ' },
        { t: '学習で「賢くなる」', d: '結果とオペレーションを学習し精度が上がり続ける' },
      ].map((c) => (
        <div key={c.t} style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '10px 14px' }}>
          <p style={{ fontSize: 12.5, fontWeight: 800, color: INK }}>{c.t}</p>
          <p style={{ fontSize: 10.5, color: MUTE, fontWeight: 600, marginTop: 4, lineHeight: 1.5 }}>{c.d}</p>
        </div>
      ))}
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 3 — 課題整理                                                     */
/* ===================================================================== */

type AsIsStep = { n: string; t: string; d?: string; pain?: string; sub?: { t: string; icon: any }[] };

const ASIS_STEPS: AsIsStep[] = [
  { n: '01', t: '膨大な土地のデータを整理', d: '土地情報は担当者ごとのスプレッドシートに散在', pain: 'スプレッドシート管理' },
  {
    n: '02',
    t: '対象の土地に合うテナントをピックアップ',
    pain: '属人化している',
    sub: [
      { t: '土地周辺を調査', icon: Search },
      { t: 'テナントを出したい企業へ聞き込み', icon: Users },
      { t: '現地へ向かって周辺確認', icon: Footprints },
    ],
  },
  { n: '03', t: 'テナントへ提案', d: '候補ごとに個別のメール・電話で打診' },
  { n: '04', t: '交渉', d: 'やり取りの記録は担当者の手元にしか残らない' },
  { n: '05', t: '手続き', d: '案件の進捗は担当者本人しか把握できない' },
];

const KAIZEN = [
  { no: '1', p: 'データの一元管理', sub: '（脱スプレッドシート）', e: '土地・テナント・打診履歴を1システムで管理', icon: Database },
  { no: '2', p: 'テナント抽出の自動化', sub: '（属人化の解消）', e: '適合度スコアで候補を自動抽出・自動ランキング', icon: Sparkles },
  { no: '3', p: '打診業務のデジタル化', sub: '', e: '候補企業へ提案を一括送信、回答はWebフォームで受領', icon: Mail },
  { no: '4', p: '進捗の見える化', sub: '', e: '全案件をステータス管理し、放置案件を自動アラート', icon: Siren },
];

const Slide3 = (
  <Frame n={4}>
    <Head
      eyebrow="Issue / 課題整理"
      title={
        <>
          現在の業務は<span style={{ color: SIGNAL }}>すべてアナログ</span>。担当者の経験値に依存している
        </>
      }
    />

    <div style={{ flex: 1, display: 'flex', gap: 30, marginTop: 18, minHeight: 0 }}>
      {/* ============ 左：AS-IS フロー ============ */}
      <div style={{ flex: 0.92, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, borderBottom: `1px solid ${LINE}`, paddingBottom: 8, marginBottom: 14 }}>
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', fontWeight: 700, borderRadius: 3, padding: '3px 7px', color: SIGNAL, background: SIGNAL_SOFT }}>AS-IS</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: INK, flex: 1 }}>現在の業務フロー</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', color: SIGNAL, fontWeight: 700 }}>
            <TriangleAlert style={{ width: 11, height: 11 }} />
            ALL ANALOG
          </span>
        </div>

        <div style={{ flex: 1, border: `1.5px dashed ${SIGNAL}`, borderRadius: 10, background: 'rgba(221,87,48,0.03)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
          {ASIS_STEPS.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', gap: 11, flex: s.sub ? 1.85 : 1, minHeight: 0 }}>
              {/* 番号レール */}
              <div style={{ width: 24, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 999,
                    background: CARD,
                    border: `1.5px solid ${LINE}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: MONO,
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: MUTE,
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </span>
                {i < ASIS_STEPS.length - 1 && <span style={{ flex: 1, width: 1.5, background: LINE, marginTop: 4, marginBottom: -8 }} />}
              </div>

              {/* ステップカード */}
              <div style={{ flex: 1, minWidth: 0, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '10px 13px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <p style={{ flex: 1, fontSize: 12.5, fontWeight: 800, color: INK, lineHeight: 1.4 }}>{s.t}</p>
                  {s.pain && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: SIGNAL_SOFT, border: `1px solid ${SIGNAL}`, borderRadius: 999, padding: '3px 9px', flexShrink: 0 }}>
                      <TriangleAlert style={{ width: 10, height: 10, color: SIGNAL, strokeWidth: 2.2 }} />
                      <span style={{ fontSize: 10, fontWeight: 800, color: SIGNAL, whiteSpace: 'nowrap' }}>{s.pain}</span>
                    </span>
                  )}
                </div>

                {s.d && <p style={{ fontSize: 10.5, color: MUTE, fontWeight: 600, marginTop: 4, lineHeight: 1.5 }}>{s.d}</p>}

                {s.sub && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 9 }}>
                    {s.sub.map((b, j) => {
                      const Icon = b.icon;
                      return (
                        <div key={b.t} style={{ display: 'contents' }}>
                          {j > 0 && <ArrowRight style={{ width: 11, height: 11, color: FAINT, strokeWidth: 2.2, flexShrink: 0 }} />}
                          <div style={{ flex: 1, minWidth: 0, background: '#F7F8F9', border: `1px solid ${HAIR}`, borderRadius: 5, padding: '7px 5px', textAlign: 'center' }}>
                            <Icon style={{ width: 12, height: 12, color: MUTE, strokeWidth: 1.9, margin: '0 auto 3px' }} />
                            <p style={{ fontSize: 9.5, fontWeight: 700, color: GRAPHITE, lineHeight: 1.4 }}>{b.t}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ 右：改善のポイント ============ */}
      <div style={{ flex: 1.08, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, borderBottom: `1px solid ${LINE}`, paddingBottom: 8, marginBottom: 14 }}>
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', fontWeight: 700, borderRadius: 3, padding: '3px 7px', color: '#fff', background: ACCENT }}>TO-BE</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: INK, flex: 1 }}>改善のポイント</span>
          <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', color: ACCENT_INK, fontWeight: 700 }}>04 POINTS</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {KAIZEN.map((k) => {
            const Icon = k.icon;
            return (
              <div
                key={k.no}
                style={{
                  flex: 1,
                  background: CARD,
                  border: `1px solid ${LINE}`,
                  borderRadius: 10,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  boxShadow: '0 8px 20px rgba(15,17,21,0.03)',
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: FAINT, width: 22, flexShrink: 0 }}>{k.no}</span>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon style={{ width: 16, height: 16, color: ACCENT_INK, strokeWidth: 1.8 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 800, color: INK, lineHeight: 1.4 }}>
                    {k.p}
                    {k.sub && <span style={{ fontSize: 11, fontWeight: 700, color: MUTE }}>{k.sub}</span>}
                  </p>
                  <p style={{ fontSize: 11.5, color: GRAPHITE, fontWeight: 600, marginTop: 4, lineHeight: 1.5 }}>{k.e}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 4 — システムでできること                                         */
/* ===================================================================== */

const DB_ITEMS = ['物件情報', 'テナント情報', 'マッチング情報', '打診履歴', '結果情報'];
const MATCH_COND = ['住所', '家賃', '面積', '駅からの距離', '業種'];
const TENANTS = [
  { n: 'テナントA', hit: true },
  { n: 'テナントB', hit: false },
  { n: 'テナントC', hit: true },
  { n: 'テナントD', hit: false },
];
const HISTORY = [
  { d: '2026/07/01 15:30', s: '打診完了', tone: 'line' as const },
  { d: '2026/07/04 13:00', s: '興味ありと回答', tone: 'accent' as const },
  { d: '2026/07/05 17:30', s: '交渉中', tone: 'gold' as const },
];

const Slide4 = (
  <Frame n={6}>
    <Head eyebrow="System / システムでできること" title="情報を1か所に集め、探す・送る・記録するを仕組みにする" />

    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14, marginTop: 16, minHeight: 0 }}>
      {/* ---------- 1. 情報の一元管理 ---------- */}
      <Panel tag="01" title="情報の一元管理" accent>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* DBシリンダー */}
          <svg viewBox="0 0 90 110" style={{ width: 78, height: 96, flexShrink: 0 }}>
            <ellipse cx="45" cy="20" rx="38" ry="13" fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth="1.6" />
            <path d="M7,20 L7,88 A38,13 0 0 0 83,88 L83,20" fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth="1.6" />
            <ellipse cx="45" cy="88" rx="38" ry="13" fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.5" />
            <ellipse cx="45" cy="48" rx="38" ry="13" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.35" />
            <text x="45" y="72" textAnchor="middle" fontSize="9" fontWeight="700" fill={ACCENT_INK} fontFamily={MONO} letterSpacing="1">
              DB
            </text>
          </svg>

          {/* 収容データ */}
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', left: -14, top: 10, bottom: 10, width: 12, borderLeft: `1.4px solid ${LINE}`, borderTop: `1.4px solid ${LINE}`, borderBottom: `1.4px solid ${LINE}`, borderRadius: '4px 0 0 4px' }} />
            {DB_ITEMS.map((d) => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4.5px 0' }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: ACCENT, flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: INK }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 10.5, color: MUTE, fontWeight: 600, marginTop: 6 }}>すべての情報を1つのシステムに集約し、探す手間をなくす</p>
      </Panel>

      {/* ---------- 2. マッチング ---------- */}
      <Panel tag="02" title="マッチング（条件抽出）">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* 条件 */}
          <div style={{ width: 108, flexShrink: 0 }}>
            <div style={{ background: CARD, border: `1.5px solid ${ACCENT}`, borderRadius: 6, padding: '7px 8px', textAlign: 'center', marginBottom: 8, position: 'relative' }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: INK }}>物件A</span>
              <span style={{ position: 'absolute', top: -9, right: -12, fontSize: 8.5, fontWeight: 800, color: '#8A5B00', background: '#FDF0CF', border: `1px solid ${GOLD}`, borderRadius: 3, padding: '1.5px 5px' }}>マッチ！</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {MATCH_COND.map((c) => (
                <div key={c} style={{ background: '#F5F6F7', border: `1px solid ${HAIR}`, borderRadius: 4, padding: '3.5px 7px', fontSize: 9.5, fontWeight: 700, color: GRAPHITE }}>
                  {c}？
                </div>
              ))}
            </div>
          </div>

          <ArrowRight style={{ width: 18, height: 18, color: ACCENT, strokeWidth: 2, flexShrink: 0 }} />

          {/* 抽出結果 */}
          <div style={{ flex: 1, border: `1px solid ${LINE}`, borderRadius: 8, background: '#FBFBFC', padding: 9 }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: MUTE, textAlign: 'center', marginBottom: 7, fontFamily: MONO, letterSpacing: '0.12em' }}>抽出結果</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {TENANTS.map((t) => (
                <div
                  key={t.n}
                  style={{
                    background: CARD,
                    border: `1px solid ${t.hit ? ACCENT : LINE}`,
                    borderRadius: 5,
                    padding: '5.5px 9px',
                    fontSize: 11,
                    fontWeight: 700,
                    color: t.hit ? ACCENT_INK : GRAPHITE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {t.n}
                  {t.hit && <span style={{ fontSize: 8.5, fontWeight: 800, color: '#8A5B00', background: '#FDF0CF', border: `1px solid ${GOLD}`, borderRadius: 3, padding: '1px 5px' }}>マッチ！</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontSize: 10.5, color: MUTE, fontWeight: 600, marginTop: 6 }}>条件に合うテナントを自動抽出（担当者の記憶に依存しない）</p>
      </Panel>

      {/* ---------- 3. 打診回答自動化 ---------- */}
      <Panel tag="03" title="打診・回答の自動化">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* 送受信 */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ flex: 1, background: CARD, border: `1.5px solid ${LINE}`, borderRadius: 6, padding: '9px 6px', textAlign: 'center', fontSize: 10.5, fontWeight: 800, color: INK, lineHeight: 1.4 }}>
                旭化成
                <br />
                ホームズ
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
                  <span style={{ flex: 1, height: 1.4, background: ACCENT }} />
                  <ArrowRight style={{ width: 11, height: 11, color: ACCENT, strokeWidth: 2.4, flexShrink: 0 }} />
                </div>
                <div style={{ border: `1.5px dashed ${SIGNAL}`, borderRadius: 5, padding: '4px 7px' }}>
                  <Mail style={{ width: 15, height: 15, color: INK, strokeWidth: 1.8 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
                  <ArrowRight style={{ width: 11, height: 11, color: FAINT, strokeWidth: 2.4, transform: 'rotate(180deg)', flexShrink: 0 }} />
                  <span style={{ flex: 1, height: 1.4, background: LINE }} />
                </div>
                <span style={{ fontSize: 8.5, color: MUTE, fontWeight: 700 }}>回答</span>
              </div>
              <div style={{ flex: 1, background: CARD, border: `1.5px solid ${LINE}`, borderRadius: 6, padding: '9px 6px', textAlign: 'center', fontSize: 10.5, fontWeight: 800, color: INK }}>
                テナント
              </div>
            </div>
          </div>

          {/* 回答フォーム */}
          <div style={{ width: 118, flexShrink: 0 }}>
            <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: '8px 9px', boxShadow: '0 8px 18px rgba(15,17,21,0.05)' }}>
              <p style={{ fontSize: 9.5, fontWeight: 800, color: INK, marginBottom: 6 }}>回答フォーム</p>
              {[100, 100, 72].map((w, i) => (
                <div key={i} style={{ height: 9, border: `1px solid ${HAIR}`, borderRadius: 2, marginBottom: 5, width: `${w}%`, background: '#FAFAFB' }} />
              ))}
              <div style={{ height: 12, borderRadius: 2, background: ACCENT_SOFT, border: `1px solid ${ACCENT}`, marginTop: 6 }} />
            </div>
          </div>
        </div>
        <div style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT}`, borderRadius: 5, padding: '6px 10px', marginTop: 8 }}>
          <p style={{ fontSize: 10.5, fontWeight: 800, color: ACCENT_INK }}>ログイン無しで回答できるフォームを提供</p>
        </div>
      </Panel>

      {/* ---------- 4. 打診履歴記録 ---------- */}
      <Panel tag="04" title="打診・交渉履歴の記録">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* 一覧モック */}
          <div style={{ flex: 0.86, background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: 7 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 4,
                  padding: '4px 3px',
                  borderRadius: 3,
                  border: i === 1 || i === 2 ? `1px dashed ${SIGNAL}` : '1px solid transparent',
                  background: i === 0 ? '#F3F4F6' : 'transparent',
                  marginBottom: 3,
                }}
              >
                {[34, 26, 22, 18].map((w, j) => (
                  <div key={j} style={{ height: 5, borderRadius: 2, background: i === 0 ? '#D6D9DE' : '#EDEFF2', width: `${w}%` }} />
                ))}
              </div>
            ))}
          </div>

          {/* タイムライン */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {HISTORY.map((h) => (
              <div key={h.d} style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 5, padding: '5px 8px' }}>
                <p style={{ fontFamily: MONO, fontSize: 8, color: MUTE, marginBottom: 3 }}>{h.d}</p>
                <Chip text={h.s} tone={h.tone} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, background: CARD, border: `1px solid ${LINE}`, borderLeft: `3px solid ${ACCENT}`, borderRadius: 4, padding: '6px 10px' }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: '#fff', background: ACCENT, borderRadius: 3, padding: '2px 6px', flexShrink: 0 }}>ポイント</span>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: GRAPHITE }}>蓄積したデータをAIに活かすことが可能</p>
        </div>
      </Panel>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 5 — AIでできること                                               */
/* ===================================================================== */

/* 自動マッチング：複数の土地 × 複数のテナント企業を一括で突き合わせる */
function CrossMatch() {
  const LANDS = ['土地A', '土地B', '土地C'];
  const TENANT_CO = ['テナントA社', 'テナントB社', 'テナントC社'];
  const cy = [38, 68, 98]; // 各行の中心Y
  const GY = 126; // 「ほか多数」行
  const LX = 118; // 左カードの右端
  const RX = 214; // 右カードの左端
  const MATCHED: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];
  const curve = (i: number, j: number) => `M${LX},${cy[i]} C${LX + 40},${cy[i]} ${RX - 40},${cy[j]} ${RX},${cy[j]}`;

  const box = (x: number, y: number, label: string, ghost = false) => (
    <g key={`${x}-${y}-${label}`}>
      <rect
        x={x}
        y={y - (ghost ? 10 : 12)}
        width="118"
        height={ghost ? 20 : 24}
        rx="5"
        fill={ghost ? '#F5F6F8' : CARD}
        stroke={LINE}
        strokeWidth="1"
        strokeDasharray={ghost ? '4 3' : undefined}
      />
      <text x={x + 59} y={y + 4} textAnchor="middle" fontSize={ghost ? 9.5 : 11.5} fontWeight="700" fill={ghost ? MUTE : INK} fontFamily={SANS}>
        {label}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 332 142" style={{ width: '100%', height: 138 }}>
      {/* 列見出し */}
      <text x="59" y="12" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={ACCENT_INK} fontFamily={MONO} letterSpacing="1.4">
        LANDS
      </text>
      <text x="59" y="24" textAnchor="middle" fontSize="10" fontWeight="800" fill={GRAPHITE} fontFamily={SANS}>
        複数の土地
      </text>
      <text x="273" y="12" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={ACCENT_INK} fontFamily={MONO} letterSpacing="1.4">
        TENANTS
      </text>
      <text x="273" y="24" textAnchor="middle" fontSize="10" fontWeight="800" fill={GRAPHITE} fontFamily={SANS}>
        複数のテナント企業
      </text>

      {/* 成立したマッチ */}
      {MATCHED.map(([i, j]) => (
        <path key={`m${i}${j}`} d={curve(i, j)} fill="none" stroke={ACCENT} strokeWidth="1.9" />
      ))}
      {MATCHED.map(([i, j]) => (
        <circle key={`d${i}${j}`} cx={(LX + RX) / 2} cy={(cy[i] + cy[j]) / 2} r="2.6" fill={ACCENT} />
      ))}

      {/* カード */}
      {LANDS.map((l, i) => box(0, cy[i], l))}
      {TENANT_CO.map((t, i) => box(214, cy[i], t))}
      {box(0, GY, 'ほか多数の土地', true)}
      {box(214, GY, 'ほか多数の企業', true)}
    </svg>
  );
}

/* 周辺地図モック */
function MapMock() {
  const dots = [
    { x: 34, y: 30, c: '#B9BDC5', l: '住宅' },
    { x: 96, y: 40, c: SIGNAL, l: '飲食' },
    { x: 150, y: 34, c: '#4C8DF6', l: 'コンビニ' },
    { x: 62, y: 92, c: '#8B5CF6', l: 'オフィス' },
    { x: 176, y: 96, c: '#B9BDC5', l: '物流' },
    { x: 122, y: 118, c: SIGNAL, l: '飲食' },
    { x: 46, y: 128, c: '#B9BDC5', l: '住宅' },
    { x: 186, y: 132, c: '#4C8DF6', l: '駅' },
  ];
  return (
    <svg viewBox="0 0 220 160" style={{ width: '100%', height: 140 }}>
      <rect x="0" y="0" width="220" height="160" rx="6" fill="#F0F2F5" />
      {[30, 70, 110, 150, 190].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="160" stroke="#FFFFFF" strokeWidth="5" />
      ))}
      {[28, 66, 104, 142].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="220" y2={y} stroke="#FFFFFF" strokeWidth="5" />
      ))}
      <circle cx="110" cy="82" r="58" fill="rgba(11,124,106,0.07)" stroke={ACCENT} strokeWidth="1" strokeDasharray="4 3" />
      <text x="110" y="30" textAnchor="middle" fontSize="7" fill={ACCENT_INK} fontFamily={MONO} fontWeight="700">
        半径500m
      </text>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="5" fill={d.c} />
      ))}
      {/* 対象地 */}
      <rect x="96" y="68" width="28" height="28" rx="3" fill="#FDECE6" stroke={SIGNAL} strokeWidth="1.6" strokeDasharray="3 2" />
      <path d="M110,72 l3.2,6.6 7.3,1 -5.3,5.2 1.3,7.2 -6.5,-3.4 -6.5,3.4 1.3,-7.2 -5.3,-5.2 7.3,-1 Z" fill={SIGNAL} />
      <text x="110" y="106" textAnchor="middle" fontSize="7.5" fill={SIGNAL} fontWeight="800" fontFamily={SANS}>
        対象地
      </text>
    </svg>
  );
}

const SCORE = [
  { k: '駅からの距離：徒歩5分', v: '+10', good: true },
  { k: '障害物：前面に歩道あり', v: '-2', good: false },
  { k: '交通量：多い', v: '+5', good: true },
];

const Slide5 = (
  <Frame n={7}>
    <Head eyebrow="AI / AIでできること" title="立地・相場・実績を学習し、候補と価格を“根拠つき”で提示する" />

    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14, marginTop: 16, minHeight: 0 }}>
      {/* ---------- 1. 自動マッチング ---------- */}
      <Panel tag="AI 01" title="複数の土地 × 複数のテナント企業を一括マッチング" accent>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <CrossMatch />
          </div>
          <div style={{ width: 122, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
            <div style={{ background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, borderRadius: 10, padding: '9px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bot style={{ width: 16, height: 16, color: ACCENT_INK, strokeWidth: 1.9 }} />
              <span style={{ fontSize: 17, fontWeight: 800, color: ACCENT_INK, letterSpacing: '0.04em' }}>AI</span>
            </div>
            <p style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: INK, letterSpacing: '0.04em' }}>N × M 件</p>
            <p style={{ fontSize: 10, fontWeight: 700, color: GRAPHITE, textAlign: 'center', lineHeight: 1.5 }}>
              全組み合わせを
              <br />
              一括で評価し、
              <br />
              機会損失をなくす
            </p>
          </div>
        </div>

        {/* 凡例 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, color: GRAPHITE, flexShrink: 0 }}>
            <span style={{ width: 18, height: 2, background: ACCENT, borderRadius: 999 }} />
            マッチ成立
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, color: MUTE }}>／ 全組み合わせをAIが評価し、成立した組み合わせだけを提示</span>
        </div>
      </Panel>

      {/* ---------- 2. 周辺情報の抽出 ---------- */}
      <Panel tag="AI 02" title="周辺情報を地図データから抽出">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1.05 }}>
            <MapMock />
          </div>
          <div style={{ flex: 0.95 }}>
            <div style={{ background: CARD, border: `1px solid ${ACCENT}`, borderRadius: 6, padding: '7px 9px', marginBottom: 8 }}>
              <p style={{ fontSize: 9.5, fontWeight: 800, color: ACCENT_INK, marginBottom: 4 }}>【レコメンド結果】</p>
              {['ドラッグストア', 'コンビニ', 'ファストフード'].map((r) => (
                <p key={r} style={{ fontSize: 10.5, fontWeight: 700, color: INK, lineHeight: 1.6 }}>
                  ・{r}
                </p>
              ))}
            </div>
            {['地図データから周辺データを抽出', '抽出結果をAIが分析', 'どんなテナントがベストかをレコメンド'].map((t) => (
              <p key={t} style={{ fontSize: 10, color: GRAPHITE, fontWeight: 600, lineHeight: 1.65 }}>
                ・{t}
              </p>
            ))}
          </div>
        </div>
      </Panel>

      {/* ---------- 3. 想定賃料を自動生成 ---------- */}
      <Panel tag="AI 03" title="想定賃料を自動生成">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* 入力 */}
          <div style={{ width: 92, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: '100%', background: CARD, border: `1px solid ${LINE}`, borderRadius: 5, padding: '6px 4px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: INK }}>
              土地の情報
            </div>
            <ArrowDown style={{ width: 12, height: 12, color: FAINT, strokeWidth: 2.2 }} />
            <div style={{ width: '100%', background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, borderRadius: 6, padding: '6px 4px', textAlign: 'center', fontSize: 13, fontWeight: 800, color: ACCENT_INK }}>
              AI
            </div>
            <ArrowDown style={{ width: 12, height: 12, color: FAINT, strokeWidth: 2.2, transform: 'rotate(180deg)' }} />
            <div style={{ width: '100%', background: CARD, border: `1px solid ${LINE}`, borderRadius: 5, padding: '6px 4px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: GRAPHITE }}>
              過去のデータ
            </div>
          </div>

          <ArrowRight style={{ width: 16, height: 16, color: ACCENT, strokeWidth: 2, flexShrink: 0 }} />

          {/* 賃料推定UI */}
          <div style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 7, overflow: 'hidden', boxShadow: '0 10px 24px rgba(15,17,21,0.06)' }}>
            <div style={{ background: '#1B1E24', padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 5 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                <span key={c} style={{ width: 6, height: 6, borderRadius: 999, background: c }} />
              ))}
              <span style={{ fontFamily: MONO, fontSize: 8, color: '#9CA0A8', marginLeft: 5 }}>賃料推定</span>
            </div>
            <div style={{ padding: '8px 11px 10px' }}>
              <p style={{ fontSize: 8.5, color: MUTE, fontWeight: 600 }}>対象地：豊島区○○町1-2-3（120坪）</p>
              <p style={{ fontSize: 8, color: FAINT, fontWeight: 600, marginTop: 5 }}>推定賃料レンジ（坪／月）</p>
              <p style={{ fontSize: 17, fontWeight: 800, color: INK, marginTop: 2 }}>
                ¥18,000 – ¥23,000
                <span style={{ fontSize: 9, color: MUTE, fontWeight: 700 }}>／坪・月</span>
              </p>
              {/* レンジバー */}
              <div style={{ position: 'relative', marginTop: 10 }}>
                <div style={{ display: 'flex', height: 7, borderRadius: 999, overflow: 'hidden' }}>
                  <span style={{ flex: 1, background: '#9BB7E8' }} />
                  <span style={{ flex: 1.3, background: '#F0A56A' }} />
                </div>
                <div style={{ position: 'absolute', left: '72%', top: -12, transform: 'translateX(-50%)', textAlign: 'center' }}>
                  <span style={{ fontSize: 8, fontWeight: 800, color: ACCENT }}>提示額 ¥22,000</span>
                  <div style={{ width: 1.6, height: 13, background: ACCENT, margin: '0 auto' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 12, flexWrap: 'wrap' }}>
                {['駅徒歩5分', '日当たり良好', '人通り○', '周辺に競合少'].map((t) => (
                  <span key={t} style={{ fontSize: 8, fontWeight: 700, color: ACCENT_INK, background: ACCENT_SOFT, borderRadius: 3, padding: '2px 5px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 10.5, color: MUTE, fontWeight: 600, marginTop: 6 }}>想定賃料と根拠をAIが自動生成 → 交渉資料にそのまま使える</p>
      </Panel>

      {/* ---------- 4. スコアリングと学習 ---------- */}
      <Panel tag="AI 04" title="評価をスコア化し、AIが学習する">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* 土地データ */}
          <div style={{ width: 86, flexShrink: 0 }}>
            <div style={{ position: 'relative', height: 52 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: i * 5,
                    left: i * 5,
                    right: 10 - i * 5,
                    height: 40,
                    background: CARD,
                    border: `1px solid ${LINE}`,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    color: INK,
                  }}
                >
                  {i === 2 ? '土地データ' : ''}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              {['駅からの距離', '周りの障害物', '交通量'].map((t) => (
                <p key={t} style={{ fontSize: 9, color: MUTE, fontWeight: 700, lineHeight: 1.6 }}>
                  ・{t}
                </p>
              ))}
            </div>
          </div>

          <ArrowRight style={{ width: 15, height: 15, color: FAINT, strokeWidth: 2, flexShrink: 0 }} />

          {/* 点数結果 */}
          <div style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '8px 11px' }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: MUTE, fontFamily: MONO, letterSpacing: '0.1em', marginBottom: 6 }}>点数結果</p>
            {SCORE.map((s) => (
              <div key={s.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', borderBottom: `1px solid ${HAIR}` }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: GRAPHITE }}>{s.k}</span>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, color: s.good ? ACCENT : SIGNAL }}>{s.v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: INK }}>合計</span>
              <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800, color: INK }}>13点</span>
            </div>
          </div>

          <ArrowRight style={{ width: 15, height: 15, color: ACCENT, strokeWidth: 2, flexShrink: 0 }} />

          {/* 学習 */}
          <div style={{ width: 74, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain style={{ width: 20, height: 20, color: ACCENT_INK, strokeWidth: 1.8 }} />
            </div>
            <p style={{ fontSize: 9, fontWeight: 700, color: GRAPHITE, textAlign: 'center', lineHeight: 1.5 }}>
              評価結果を学習し
              <br />
              レコメンドに反映
            </p>
          </div>
        </div>
        <p style={{ fontSize: 10.5, color: MUTE, fontWeight: 600, marginTop: 6 }}>理由：駅から近く、交通量が多いため多くの流入が見込める</p>
      </Panel>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 5B — インフラ構成イメージ（AWS）                                  */
/* ===================================================================== */

/* サービス種別カラー */
const C_NET = '#8B5CF6';
const C_APP = '#DD5730';
const C_DATA = '#4C8DF6';
const C_SEC = '#D64545';
const C_OPS = '#E8B44A';
const C_AI = ACCENT;

/* 通信フローカラー */
const F_USER = '#4C8DF6';
const F_APP = '#D9971C';
const F_DEPLOY = '#D64545';
const F_LOG = '#0B7C6A';
const F_ALERT = '#8B5CF6';

const FLOWS: { c: string; t: string }[] = [
  { c: F_USER, t: 'システム利用者の通信' },
  { c: F_APP, t: 'Fargate起点の通信' },
  { c: F_DEPLOY, t: 'デプロイの流れ' },
  { c: F_LOG, t: 'ログ／メトリクスの流れ' },
  { c: F_ALERT, t: 'アラートの流れ' },
];

/* 構成図ノード */
function ANode({
  x,
  y,
  w,
  h,
  label,
  sub,
  color,
  ghost,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  color?: string;
  ghost?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="7"
        fill={ghost ? '#F2F3F6' : CARD}
        stroke={ghost ? FAINT : LINE}
        strokeWidth="1"
        strokeDasharray={ghost ? '4 3' : undefined}
      />
      {!ghost && color && <rect x={x} y={y + 1} width="4" height={h - 2} rx="2" fill={color} />}
      <text x={x + 14} y={sub ? y + h / 2 - 1 : y + h / 2 + 4} fontSize="11.5" fontWeight="800" fill={ghost ? MUTE : INK} fontFamily={SANS}>
        {label}
      </text>
      {sub && (
        <text x={x + 14} y={y + h / 2 + 13} fontSize="9" fontWeight="600" fill={MUTE} fontFamily={SANS}>
          {sub}
        </text>
      )}
    </g>
  );
}

/* エンドポイント等のピル */
function APill({ x, y, w, h, label, color }: { x: number; y: number; w: number; h: number; label: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#FFFFFF" stroke={color} strokeWidth="1.2" />
      <text x={x + w / 2} y={y + h / 2 + 3.6} textAnchor="middle" fontSize="10" fontWeight="800" fill={color} fontFamily={MONO} letterSpacing="0.02em">
        {label}
      </text>
    </g>
  );
}

/* 人物・外部サービスのチップ */
function AActor({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="14" fill={INK} />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF" fontFamily={SANS}>
        {label}
      </text>
    </g>
  );
}

/* サブネット枠 */
function ASubnet({ x, y, w, h, label, tone }: { x: number; y: number; w: number; h: number; label: string; tone: 'public' | 'private' }) {
  const c = tone === 'public' ? { bg: '#F1F8F2', bd: '#8CC194', fg: '#3F7F4C' } : { bg: '#EFF3FA', bd: '#93B4E0', fg: '#3C6198' };
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={c.bg} stroke={c.bd} strokeWidth="1" strokeDasharray="3 2.5" />
      <rect x={x + 8} y={y + 7} width="8" height="8" rx="2" fill={c.bd} />
      <text x={x + 21} y={y + 14.5} fontSize="9" fontWeight="800" fill={c.fg} fontFamily={MONO} letterSpacing="0.06em">
        {label}
      </text>
    </g>
  );
}

/* フロー矢印 */
function AFlow({ d, c, marker, dash }: { d: string; c: string; marker: string; dash?: boolean }) {
  return <path d={d} fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeDasharray={dash ? '4 3' : undefined} markerEnd={`url(#${marker})`} />;
}

const MARKERS: [string, string][] = [
  ['u', F_USER],
  ['a', F_APP],
  ['d', F_DEPLOY],
  ['l', F_LOG],
  ['t', F_ALERT],
  ['g', '#A9AEB7'],
];

function AwsArchitecture() {
  return (
    <svg viewBox="0 0 1152 500" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        {MARKERS.map(([id, c]) => (
          <marker key={id} id={`arw-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M0,1.2 L9,5 L0,8.8 Z" fill={c} />
          </marker>
        ))}
      </defs>

      {/* ===== 外部アクター ===== */}
      <AActor x={628} y={2} w={120} label="システム利用者" />
      <AActor x={6} y={246} w={80} label="開発者" />
      <AActor x={110} y={456} w={88} label="運用者" />
      <AActor x={249} y={456} w={120} label="Slack など" />

      {/* ===== AWS Cloud 枠 ===== */}
      <rect x={96} y={44} width={1052} height={400} rx="10" fill="none" stroke="#BFC4CC" strokeWidth="1.2" />
      <rect x={110} y={53} width={9} height={9} rx="2" fill="#F0902B" />
      <text x={124} y={62} fontSize="10.5" fontWeight="800" fill={GRAPHITE} fontFamily={MONO} letterSpacing="0.08em">
        AWS Cloud
      </text>

      {/* ===== 左カラムA ===== */}
      <ANode x={112} y={76} w={126} h={44} label="CloudFront" sub="エッジ配信・高速化" color={C_NET} />
      <ANode x={112} y={130} w={126} h={44} label="S3" sub="静的コンテンツ" color={C_DATA} />
      <ANode x={112} y={184} w={126} h={44} label="Certificate Mgr" sub="TLS証明書" color={C_SEC} />
      <ANode x={112} y={238} w={126} h={44} label="ECR" sub="コンテナイメージ" color={C_APP} />
      <ANode x={112} y={310} w={126} h={44} label="CW metrics" sub="メトリクス集約" color={C_OPS} />
      <ANode x={112} y={364} w={126} h={44} label="CW Alarm" sub="しきい値監視" color={C_OPS} />

      {/* ===== 左カラムB ===== */}
      <ANode x={246} y={76} w={126} h={44} label="WAF" sub="不正アクセス防御" color={C_SEC} />
      <ANode x={246} y={130} w={126} h={44} label="Secrets Manager" sub="接続情報の保管" color={C_SEC} />
      <ANode x={246} y={184} w={126} h={44} label="Systems Manager" sub="アプリ変数の管理" color={C_SEC} />
      <ANode x={246} y={238} w={126} h={44} label="CodeDeploy" sub="無停止デプロイ" color={C_APP} />
      <ANode x={246} y={310} w={126} h={44} label="CW Logs" sub="ログ収集" color={C_OPS} />
      <ANode x={246} y={364} w={126} h={44} label="Chatbot" sub="Slack通知連携" color={C_OPS} />

      {/* ===== VPC ===== */}
      <rect x={390} y={64} width={596} height={366} rx="9" fill="none" stroke="#8FA9CF" strokeWidth="1.2" />
      <rect x={404} y={72} width={9} height={9} rx="2" fill="#5F82B8" />
      <text x={418} y={81} fontSize="10.5" fontWeight="800" fill="#4A6193" fontFamily={MONO} letterSpacing="0.08em">
        VPC
      </text>

      {/* AZ 枠 */}
      {[
        { x: 402, n: 'Availability Zone 1' },
        { x: 597, n: 'Availability Zone 2' },
        { x: 792, n: 'Availability Zone 3' },
      ].map((az) => (
        <g key={az.n}>
          <rect x={az.x} y={90} width={182} height={334} rx="6" fill="none" stroke="#C2CFE2" strokeWidth="1" strokeDasharray="3 3" />
          <text x={az.x + 91} y={104} textAnchor="middle" fontSize="9" fontWeight="800" fill="#7C8FA9" fontFamily={MONO} letterSpacing="0.04em">
            {az.n}
          </text>
        </g>
      ))}

      {/* サブネット */}
      {[410, 605, 800].map((x) => (
        <ASubnet key={`pub${x}`} x={x} y={110} w={166} h={80} label="Public subnet" tone="public" />
      ))}
      {[410, 605, 800].map((x) => (
        <ASubnet key={`pri1${x}`} x={x} y={200} w={166} h={88} label="Private subnet" tone="private" />
      ))}
      {[410, 605, 800].map((x) => (
        <ASubnet key={`pri2${x}`} x={x} y={300} w={166} h={120} label="Private subnet" tone="private" />
      ))}

      {/* Internet Gateway（VPC境界） */}
      <rect x={632} y={51} width={112} height={26} rx="13" fill={CARD} stroke={C_NET} strokeWidth="1.4" />
      <text x={688} y={68} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={C_NET} fontFamily={SANS}>
        Internet Gateway
      </text>

      {/* Public 層 */}
      <ANode x={418} y={136} w={150} h={44} label="（予備）" sub="マルチAZ冗長" ghost />
      <ANode x={613} y={136} w={150} h={44} label="ALB" sub="負荷分散・WAF連携" color={C_NET} />
      <ANode x={808} y={136} w={150} h={44} label="NAT Gateway" sub="外部通信の出口" color={C_NET} />

      {/* アプリ層 */}
      <ANode x={418} y={228} w={150} h={44} label="ECS / Fargate" sub="アプリ実行（AZ1）" color={C_APP} />
      <ANode x={613} y={228} w={150} h={44} label="ECS / Fargate" sub="アプリ実行（AZ2）" color={C_APP} />
      <ANode x={808} y={228} w={150} h={44} label="VPC Endpoint" sub="閉域でAWS接続" color={C_NET} />

      {/* データ層 */}
      <APill x={418} y={326} w={150} h={26} label="ReadWrite Endpoint" color={C_DATA} />
      <APill x={613} y={326} w={150} h={26} label="ReadOnly Endpoint" color={C_DATA} />
      <ANode x={418} y={364} w={150} h={44} label="Aurora Writer" sub="書き込み用インスタンス" color={C_DATA} />
      <ANode x={613} y={364} w={150} h={44} label="Aurora Reader" sub="読み取り・分析用" color={C_DATA} />
      <ANode x={808} y={364} w={150} h={44} label="Standby" sub="自動フェイルオーバー" ghost />

      {/* ===== 右カラム（AI・外部サービス） ===== */}
      <ANode x={1002} y={200} w={140} h={44} label="Bedrock" sub="生成AI・推論基盤" color={C_AI} />
      <ANode x={1002} y={254} w={140} h={44} label="Location Service" sub="地図・周辺データ" color={C_AI} />
      <ANode x={1002} y={308} w={140} h={44} label="SNS" sub="通知配信" color={C_AI} />

      {/* ===================== フロー ===================== */}
      {/* 利用者の通信 */}
      <AFlow d="M628,16 H175 V76" c={F_USER} marker="arw-u" />
      <AFlow d="M175,120 V130" c={F_USER} marker="arw-u" />
      <AFlow d="M688,30 V51" c={F_USER} marker="arw-u" />
      <AFlow d="M688,77 V136" c={F_USER} marker="arw-u" />
      <AFlow d="M688,180 V228" c={F_USER} marker="arw-u" />

      {/* Fargate起点の通信 */}
      <AFlow d="M763,240 H785 V158 H808" c={F_APP} marker="arw-a" />
      <AFlow d="M958,158 H978 V86 H730 V77" c={F_APP} marker="arw-a" />
      <AFlow d="M763,258 H808" c={F_APP} marker="arw-a" />
      <AFlow d="M958,250 H994 V222 H1002" c={F_APP} marker="arw-a" />
      <AFlow d="M994,250 V276 H1002" c={F_APP} marker="arw-a" />
      <AFlow d="M994,250 V330 H1002" c={F_APP} marker="arw-a" />
      <AFlow d="M670,272 V294 H493 V326" c={F_APP} marker="arw-a" />
      <AFlow d="M706,272 V326" c={F_APP} marker="arw-a" />

      {/* DB 内部 */}
      <AFlow d="M493,352 V364" c="#A9AEB7" marker="arw-g" />
      <AFlow d="M688,352 V364" c="#A9AEB7" marker="arw-g" />
      <AFlow d="M763,386 H808" c="#A9AEB7" marker="arw-g" dash />

      {/* デプロイ */}
      <AFlow d="M86,260 H112" c={F_DEPLOY} marker="arw-d" />
      <AFlow d="M238,260 H246" c={F_DEPLOY} marker="arw-d" />
      <AFlow d="M372,260 H396 V248 H418" c={F_DEPLOY} marker="arw-d" />

      {/* ログ／メトリクス */}
      <AFlow d="M418,268 H381 V332 H372" c={F_LOG} marker="arw-l" />
      <AFlow d="M246,332 H238" c={F_LOG} marker="arw-l" />
      <AFlow d="M175,354 V364" c={F_LOG} marker="arw-l" />

      {/* アラート */}
      <AFlow d="M238,386 H246" c={F_ALERT} marker="arw-t" />
      <AFlow d="M309,408 V456" c={F_ALERT} marker="arw-t" />
      <AFlow d="M249,470 H198" c={F_ALERT} marker="arw-t" />
    </svg>
  );
}

const SlideInfra = (
  <Frame n={8}>
    <Head
      eyebrow="Infrastructure / インフラ構成イメージ"
      title="AWSのマネージドサービスで、止まらない・伸ばせる基盤をつくる"
      sub="マルチAZ構成による可用性、Fargateによる自動スケール、閉域からのAI連携。運用者を増やさずに拡張できる構成です。"
    />

    {/* 凡例 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12, flexShrink: 0, flexWrap: 'wrap' }}>
      {FLOWS.map((f) => (
        <span key={f.t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, color: GRAPHITE }}>
          <span style={{ width: 18, height: 2.5, background: f.c, borderRadius: 999 }} />
          {f.t}
        </span>
      ))}
    </div>

    <div style={{ flex: 1, marginTop: 8, minHeight: 0 }}>
      <AwsArchitecture />
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 5C — データとマッチングの仕組み                                   */
/* ===================================================================== */

/* 工程の見出し（01 INPUT など） */
function StepHead({ n, en, jp }: { n: string; en: string; jp: string }) {
  return (
    <div style={{ flexShrink: 0, marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 800, color: '#fff', background: ACCENT, borderRadius: 4, padding: '2px 6px' }}>{n}</span>
        <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.16em', color: ACCENT_INK, fontWeight: 800 }}>{en}</span>
      </div>
      <p style={{ fontSize: 12, fontWeight: 800, color: INK, marginTop: 6, lineHeight: 1.35 }}>{jp}</p>
    </div>
  );
}

/* 工程間の矢印 */
function FlowArrow() {
  return (
    <div style={{ flexShrink: 0, width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ArrowRight style={{ width: 17, height: 17, color: ACCENT, strokeWidth: 2.4 }} />
    </div>
  );
}

/* INPUT 側の小カード */
function MiniCard({ icon: Icon, title, items, accent }: { icon: any; title: string; items: string[]; accent?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        background: CARD,
        border: `1px solid ${accent ? ACCENT : LINE}`,
        borderRadius: 10,
        padding: '10px 12px 11px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        boxShadow: '0 8px 20px rgba(15,17,21,0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: accent ? ACCENT : '#EDEFF2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon style={{ width: 12.5, height: 12.5, color: accent ? '#fff' : GRAPHITE, strokeWidth: 2 }} />
        </span>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: INK, lineHeight: 1.25 }}>{title}</span>
      </div>
      {items.map((t) => (
        <p key={t} style={{ fontSize: 10, color: GRAPHITE, fontWeight: 600, lineHeight: 1.75 }}>
          ・{t}
        </p>
      ))}
    </div>
  );
}

/* データ取得元の行 */
function SourceRow({ icon: Icon, t, d }: { icon: any; t: string; d: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '7px 9px' }}>
      <Icon style={{ width: 13, height: 13, color: ACCENT, strokeWidth: 2, flexShrink: 0, marginTop: 1 }} />
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 10.5, fontWeight: 800, color: INK, lineHeight: 1.3 }}>{t}</p>
        <p style={{ fontSize: 9.5, fontWeight: 600, color: MUTE, lineHeight: 1.45, marginTop: 2 }}>{d}</p>
      </div>
    </div>
  );
}

const PROFILE_ROWS: [string, string][] = [
  ['500m', '飲食 23 ／ コンビニ 4 ／ ドラッグストア 1'],
  ['1km', 'スーパー 2 ／ 学校 3 ／ 医療機関 8'],
  ['3km', '競合チェーン 12 店舗'],
];

const MATCH_STEPS = [
  { n: '①', t: 'ハードフィルタ', d: '用途地域NG・面積不足・エリア外を機械的に除外', tag: 'SQL' },
  { n: '②', t: 'スコアリング', d: '商圏プロファイル × 出店条件で適合度を算出。似た商圏の成約実績をベクトル検索', tag: 'pgvector' },
  { n: '③', t: '根拠の生成', d: '「なぜこの土地にこのテナントか」を日本語で文章化', tag: 'Bedrock' },
];

const RESULT_RANK = [
  { r: '1', t: 'ドラッグストア A社', s: 92 },
  { r: '2', t: 'コンビニ B社', s: 85 },
  { r: '3', t: '飲食チェーン C社', s: 78 },
];

const SlideMatching = (
  <Frame n={9}>
    <Head
      eyebrow="Mechanism / データとマッチングの仕組み"
      title="土地を「商圏プロファイル」に変換し、保有テナント情報と突き合わせる"
      sub="土地側の周辺環境はAWSと公的オープンデータから自動取得。テナント側は貴社がお持ちの情報資産をそのまま活かします。"
    />

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: 14, minHeight: 0, gap: 12 }}>
      {/* ===== メインフロー ===== */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', minHeight: 0 }}>
        {/* --- 01 INPUT --- */}
        <div style={{ flex: 0.92, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <StepHead n="01" en="INPUT" jp="手元にある情報" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
            <MiniCard icon={MapPin} title="地主様の土地情報" items={['所在地・面積・形状', '前面道路・接道条件', '地主様のご意向']} />
            <MiniCard icon={Building2} title="貴社の保有テナント情報" items={['業種・希望坪数', '希望賃料・希望エリア', '出店条件・過去の成約実績']} accent />
          </div>
        </div>

        <FlowArrow />

        {/* --- 02 ENRICH --- */}
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <StepHead n="02" en="ENRICH" jp="周辺データを取得し、数値に変換" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7, minHeight: 0 }}>
            <SourceRow icon={Search} t="Amazon Location Service" d="半径500m／1km／3km の店舗・施設をカテゴリ別に取得" />
            <SourceRow icon={Database} t="公的オープンデータ" d="用途地域・駅別乗降客数・人口メッシュ（国交省／e-Stat）" />

            {/* 商圏プロファイル */}
            <div style={{ flex: 1, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, borderRadius: 10, padding: '9px 11px 10px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', fontWeight: 800, color: ACCENT_INK }}>商圏プロファイル（特徴量）</p>
              <div style={{ marginTop: 7 }}>
                {PROFILE_ROWS.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 8, alignItems: 'baseline', padding: '2.5px 0' }}>
                    <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 800, color: ACCENT_INK, width: 32, flexShrink: 0 }}>{k}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: INK, lineHeight: 1.4 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid rgba(11,124,106,0.25)`, marginTop: 7, paddingTop: 7 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT_INK, lineHeight: 1.5 }}>用途地域：近隣商業／駅乗降 4.2万人・日</p>
              </div>
            </div>
          </div>
        </div>

        <FlowArrow />

        {/* --- 03 MATCH --- */}
        <div style={{ flex: 1.24, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <StepHead n="03" en="MATCH" jp="3段構えでAIが突き合わせる" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
            {MATCH_STEPS.map((s) => (
              <div key={s.n} style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, padding: '9px 11px 10px', display: 'flex', flexDirection: 'column', minHeight: 0, boxShadow: '0 8px 20px rgba(15,17,21,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: ACCENT }}>{s.n}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 800, color: INK }}>{s.t}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 8.5, fontWeight: 800, color: MUTE, background: '#EFF0F3', borderRadius: 3, padding: '2px 5px', flexShrink: 0 }}>{s.tag}</span>
                </div>
                <p style={{ fontSize: 10, color: GRAPHITE, fontWeight: 600, lineHeight: 1.55, marginTop: 5 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        <FlowArrow />

        {/* --- 04 OUTPUT --- */}
        <div style={{ flex: 0.86, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <StepHead n="04" en="OUTPUT" jp="根拠つきの候補提示" />
          <div style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0, boxShadow: '0 10px 24px rgba(15,17,21,0.06)' }}>
            <div style={{ background: '#1B1E24', padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                <span key={c} style={{ width: 6, height: 6, borderRadius: 999, background: c }} />
              ))}
              <span style={{ fontFamily: MONO, fontSize: 8, color: '#9CA0A8', marginLeft: 5 }}>テナント候補</span>
            </div>
            <div style={{ flex: 1, padding: '9px 11px 10px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              {RESULT_RANK.map((x) => (
                <div key={x.r} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 0', borderBottom: `1px solid ${HAIR}` }}>
                  <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 800, color: x.r === '1' ? ACCENT : MUTE, flexShrink: 0 }}>{x.r}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: INK, flex: 1, minWidth: 0, lineHeight: 1.3 }}>{x.t}</span>
                  <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: x.r === '1' ? ACCENT : GRAPHITE, flexShrink: 0 }}>{x.s}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, background: '#F6F7F8', borderRadius: 6, padding: '7px 8px' }}>
                <p style={{ fontSize: 8.5, fontWeight: 800, color: MUTE, fontFamily: MONO, letterSpacing: '0.08em' }}>提案根拠</p>
                <p style={{ fontSize: 9.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.55, marginTop: 3 }}>住宅密集エリアかつ半径1km内に競合なし。駅乗降4.2万人で来店が見込める。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 学習ループ ===== */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'stretch', gap: 10, background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, padding: '10px 13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, paddingRight: 13, borderRight: `1px solid ${HAIR}` }}>
          <span style={{ width: 26, height: 26, borderRadius: 8, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Repeat style={{ width: 13, height: 13, color: ACCENT_INK, strokeWidth: 2 }} />
          </span>
          <div>
            <p style={{ fontSize: 11.5, fontWeight: 800, color: INK }}>学習ループ</p>
            <p style={{ fontSize: 9.5, fontWeight: 600, color: MUTE, marginTop: 1 }}>成約／非成約の結果をスコアに反映</p>
          </div>
        </div>
        {[
          { p: 'フェーズ 1', n: '〜数十件', d: '営業担当の暗黙知をルール化し、AIが根拠を補完（データが少なくても動く）' },
          { p: 'フェーズ 2', n: '数百件〜', d: '成約フィードバックでスコアの重みを自動学習し、案件が増えるほど精度が上がる' },
        ].map((x) => (
          <div key={x.p} style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 800, color: ACCENT_INK, letterSpacing: '0.08em' }}>{x.p}</span>
              <Chip text={x.n} tone="accent" />
            </div>
            <p style={{ fontSize: 10, color: GRAPHITE, fontWeight: 600, lineHeight: 1.5, marginTop: 4 }}>{x.d}</p>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 5D — 処理の流れ（インフラ構成図上のデータフロー）                  */
/* ===================================================================== */

const F_STEP_GRAY = '#9AA0A9';

/* 手順番号バッジ */
function StepBadge({ x, y, n, c }: { x: number; y: number; n: string; c: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10.5" fill={c} stroke="#FFFFFF" strokeWidth="2.2" />
      <text x={x} y={y + 3.9} textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF" fontFamily={MONO}>
        {n}
      </text>
    </g>
  );
}

const FLOW_MARKERS: [string, string][] = [
  ['fu', F_USER],
  ['fa', F_APP],
  ['fg', F_STEP_GRAY],
];

const FLOW_STEPS = [
  { n: '1', c: F_USER, t: '土地情報を入力する', d: '担当者が対象地の住所・面積を入力。画面はCloudFront＋S3から配信され、リクエストはALB経由でFargateへ' },
  { n: '2', c: F_APP, t: '周辺施設の情報を取得する', d: 'FargateがVPC Endpoint経由でLocation Serviceを呼び、半径500m／1km／3kmの店舗・施設をカテゴリ別に収集' },
  { n: '3', c: F_APP, t: '公的データを取得する', d: 'NAT Gateway経由で国交省・e-StatのAPIへ。用途地域・駅別乗降客数・人口メッシュを取得' },
  { n: '4', c: F_APP, t: '商圏プロファイル化して照合する', d: 'Auroraへ保存し、保有テナント情報を読み出してハードフィルタ＋スコアリングを実行' },
  { n: '5', c: F_APP, t: 'AIが判定し、根拠を生成する', d: 'VPC Endpoint経由でBedrockへ。適合度スコアの根拠を日本語の文章として生成' },
  { n: '6', c: F_USER, t: '結果を画面に返す', d: 'ALB経由で、テナント候補のランキングと提案根拠を担当者の画面へ返却' },
  { n: '7', c: F_STEP_GRAY, t: '成約結果を蓄積し、学習する', d: '成約／非成約の結果をAuroraに記録。次回以降のスコアリングに反映される' },
];

function AwsDataFlow() {
  return (
    <svg viewBox="0 0 740 470" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        {FLOW_MARKERS.map(([id, c]) => (
          <marker key={id} id={`arw-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,1.2 L9,5 L0,8.8 Z" fill={c} />
          </marker>
        ))}
      </defs>

      {/* ===== 外部 ===== */}
      <AActor x={21} y={4} w={140} label="担当者（システム利用者）" />
      <ANode x={480} y={2} w={244} h={40} label="外部オープンデータAPI" sub="国土交通省 不動産情報ライブラリ／e-Stat" color={C_DATA} />

      {/* ===== AWS Cloud ===== */}
      <rect x={8} y={50} width={724} height={400} rx="10" fill="none" stroke="#BFC4CC" strokeWidth="1.2" />
      <rect x={22} y={59} width={9} height={9} rx="2" fill="#F0902B" />
      <text x={36} y={68} fontSize="10.5" fontWeight="800" fill={GRAPHITE} fontFamily={MONO} letterSpacing="0.08em">
        AWS Cloud
      </text>

      {/* 配信 */}
      <ANode x={26} y={92} w={130} h={48} label="CloudFront" sub="画面の配信" color={C_NET} />
      <ANode x={26} y={152} w={130} h={48} label="S3" sub="静的コンテンツ" color={C_DATA} />

      {/* ===== VPC ===== */}
      <rect x={180} y={78} width={390} height={352} rx="9" fill="none" stroke="#8FA9CF" strokeWidth="1.2" />
      <rect x={192} y={84} width={9} height={9} rx="2" fill="#5F82B8" />
      <text x={206} y={93} fontSize="10.5" fontWeight="800" fill="#4A6193" fontFamily={MONO} letterSpacing="0.08em">
        VPC
      </text>

      <ASubnet x={192} y={104} w={366} h={76} label="Public subnet" tone="public" />
      <ASubnet x={192} y={200} w={366} h={82} label="Private subnet" tone="private" />
      <ASubnet x={192} y={326} w={366} h={84} label="Private subnet" tone="private" />

      {/* Internet Gateway */}
      <rect x={230} y={65} width={110} height={26} rx="13" fill={CARD} stroke={C_NET} strokeWidth="1.4" />
      <text x={285} y={82} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={C_NET} fontFamily={SANS}>
        Internet Gateway
      </text>

      <ANode x={202} y={124} w={166} h={48} label="ALB" sub="負荷分散" color={C_NET} />
      <ANode x={384} y={124} w={164} h={48} label="NAT Gateway" sub="外部通信の出口" color={C_NET} />
      <ANode x={202} y={220} w={180} h={54} label="ECS / Fargate" sub="アプリ処理の中心" color={C_APP} />
      <ANode x={420} y={220} w={128} h={54} label="VPC Endpoint" sub="閉域でAWS接続" color={C_NET} />
      <ANode x={202} y={344} w={346} h={50} label="Aurora（MySQL互換）" sub="保有テナント情報・商圏プロファイル・成約実績" color={C_DATA} />

      {/* ===== AI・地図サービス ===== */}
      <ANode x={590} y={206} w={134} h={52} label="Location Service" sub="周辺の店舗・施設" color={C_AI} />
      <ANode x={590} y={270} w={134} h={52} label="Bedrock" sub="判定・根拠の生成" color={C_AI} />

      {/* ===================== フロー ===================== */}
      {/* 1 入力 */}
      <AFlow d="M91,32 V92" c={F_USER} marker="arw-fu" />
      <AFlow d="M91,140 V152" c={F_USER} marker="arw-fu" />
      <AFlow d="M161,18 H260 V65" c={F_USER} marker="arw-fu" />
      <AFlow d="M285,91 V124" c={F_USER} marker="arw-fu" />
      <AFlow d="M285,172 V220" c={F_USER} marker="arw-fu" />

      {/* 2 周辺施設の取得 */}
      <AFlow d="M382,252 H420" c={F_APP} marker="arw-fa" />
      <AFlow d="M548,232 H590" c={F_APP} marker="arw-fa" />

      {/* 3 公的データの取得 */}
      <AFlow d="M382,234 H401 V172" c={F_APP} marker="arw-fa" />
      <AFlow d="M466,124 V100 H330 V91" c={F_APP} marker="arw-fa" />
      <AFlow d="M310,65 V22 H480" c={F_APP} marker="arw-fa" />

      {/* 4 蓄積・照合 */}
      <AFlow d="M240,274 V344" c={F_APP} marker="arw-fa" />
      <AFlow d="M300,344 V274" c={F_APP} marker="arw-fa" />

      {/* 5 AI判定 */}
      <AFlow d="M548,262 H576 V296 H590" c={F_APP} marker="arw-fa" />

      {/* 6 返却 */}
      <AFlow d="M320,220 V172" c={F_USER} marker="arw-fu" />
      <AFlow d="M202,148 H168 V18 H161" c={F_USER} marker="arw-fu" />

      {/* 7 学習 */}
      <AFlow d="M355,274 V344" c={F_STEP_GRAY} marker="arw-fg" dash />

      {/* ===================== 番号バッジ ===================== */}
      <StepBadge x={215} y={18} n="1" c={F_USER} />
      <StepBadge x={401} y={252} n="2" c={F_APP} />
      <StepBadge x={401} y={200} n="3" c={F_APP} />
      <StepBadge x={270} y={310} n="4" c={F_APP} />
      <StepBadge x={576} y={279} n="5" c={F_APP} />
      <StepBadge x={168} y={85} n="6" c={F_USER} />
      <StepBadge x={355} y={310} n="7" c={F_STEP_GRAY} />
    </svg>
  );
}

const SlideFlow = (
  <Frame n={10}>
    <Head
      eyebrow="Data Flow / 処理の流れ"
      title="1件の土地査定で、どこが周辺情報を取り、どこがAIで判定するか"
      sub="8ページのインフラ構成の上を、① 〜 ⑦ の順にデータが流れます。"
    />

    <div style={{ flex: 1, display: 'flex', gap: 16, marginTop: 12, minHeight: 0 }}>
      {/* 構成図 */}
      <div style={{ flex: 1.95, minWidth: 0 }}>
        <AwsDataFlow />
      </div>

      {/* 手順リスト */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, gap: 6 }}>
        {FLOW_STEPS.map((s) => (
          <div key={s.n} style={{ flex: 1, display: 'flex', gap: 9, alignItems: 'flex-start', background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '7px 10px 8px', minHeight: 0 }}>
            <span
              style={{
                width: 19,
                height: 19,
                borderRadius: 999,
                background: s.c,
                color: '#fff',
                fontFamily: MONO,
                fontSize: 10.5,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {s.n}
            </span>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 11.5, fontWeight: 800, color: INK, lineHeight: 1.3 }}>{s.t}</p>
              <p style={{ fontSize: 9.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.55, marginTop: 2 }}>{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 6 — 開発スケジュールイメージ                                     */
/* ===================================================================== */

const MONTHS = ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月'];
const ROW_H = 28;
const GANTT_ROWS = 13;

type GanttItem = { r: number; type: 'bar' | 'ms'; x: number; w?: number; label: string; strong?: boolean };

const GANTT: GanttItem[] = [
  { r: 0, type: 'ms', x: 1, label: '受注' },
  { r: 1, type: 'bar', x: 0.8, w: 14, label: 'AIモデル開発（Map検証）', strong: true },
  { r: 2, type: 'bar', x: 1.5, w: 12.5, label: 'システム側微修正' },
  { r: 3, type: 'bar', x: 12.5, w: 10, label: 'データ蓄積' },
  { r: 4, type: 'bar', x: 12, w: 37.5, label: 'システム構築', strong: true },
  { r: 5, type: 'bar', x: 2, w: 24.5, label: '本番インフラ構築' },
  { r: 6, type: 'bar', x: 13, w: 13.5, label: '環境載せ替え', strong: true },
  { r: 7, type: 'bar', x: 25, w: 25, label: 'AI検証・チューニング', strong: true },
  { r: 8, type: 'bar', x: 50, w: 12, label: 'テスト', strong: true },
  { r: 9, type: 'bar', x: 62.5, w: 12, label: '旭化成ホームズ様確認', strong: true },
  { r: 10, type: 'bar', x: 63, w: 15, label: '指摘事項修正' },
  { r: 10, type: 'bar', x: 87.7, w: 12, label: '検証インフラ構築' },
  { r: 11, type: 'ms', x: 78.5, label: 'リリース判定' },
  { r: 12, type: 'ms', x: 80.5, label: 'リリース' },
];

const Slide6 = (
  <Frame n={11}>
    <Head eyebrow="Schedule / 開発スケジュールイメージ" title="9月受注 → 2月に貴社ご確認 → 3月リリース、以降フェーズ2へ" />

    <div style={{ flex: 1, marginTop: 16, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* 月ヘッダー */}
      <div style={{ display: 'flex', border: `1px solid ${LINE}`, borderBottom: 'none', background: '#F0F1F3', borderRadius: '8px 8px 0 0', overflow: 'hidden', flexShrink: 0 }}>
        {MONTHS.map((m, i) => (
          <div
            key={m}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '7px 0',
              fontSize: 12,
              fontWeight: 800,
              color: INK,
              borderRight: i < MONTHS.length - 1 ? `1px solid ${LINE}` : 'none',
            }}
          >
            {m}
          </div>
        ))}
      </div>

      {/* ガント本体 */}
      <div
        style={{
          position: 'relative',
          height: ROW_H * GANTT_ROWS + 12,
          border: `1px solid ${LINE}`,
          borderRadius: '0 0 8px 8px',
          background: CARD,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* 月の縦罫 */}
        {MONTHS.map((_, i) =>
          i === 0 ? null : (
            <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${(i / MONTHS.length) * 100}%`, width: 1, background: HAIR }} />
          ),
        )}

        {/* フェーズ2 ブロック */}
        <div
          style={{
            position: 'absolute',
            left: '87.7%',
            width: '12%',
            top: ROW_H * 11 + 6,
            height: ROW_H * 2 + 4,
            border: `1.5px solid ${LINE}`,
            borderRadius: 8,
            background: '#F7F8F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 800, color: GRAPHITE, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>以降、フェーズ2</span>
        </div>

        {/* バー・マイルストーン */}
        {GANTT.map((g) => {
          const top = g.r * ROW_H + 6;
          if (g.type === 'ms') {
            return (
              <div key={g.label} style={{ position: 'absolute', top, left: `${g.x}%`, height: ROW_H - 8, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ width: 13, height: 13, background: GOLD, border: `1px solid #C9922B`, transform: 'rotate(45deg)', flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, fontWeight: 800, color: INK, whiteSpace: 'nowrap' }}>{g.label}</span>
              </div>
            );
          }
          return (
            <div
              key={g.label}
              style={{
                position: 'absolute',
                top,
                left: `${g.x}%`,
                width: `${g.w}%`,
                height: ROW_H - 10,
                background: g.strong ? ACCENT : ACCENT_SOFT,
                border: `1.5px solid ${ACCENT}`,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 800, color: g.strong ? '#fff' : ACCENT_INK, whiteSpace: 'nowrap' }}>{g.label}</span>
            </div>
          );
        })}
      </div>

      {/* 凡例＋補足 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 14, flexShrink: 0 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10.5, fontWeight: 700, color: MUTE }}>
          <span style={{ width: 22, height: 8, borderRadius: 999, background: ACCENT }} />
          主要工程
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10.5, fontWeight: 700, color: MUTE }}>
          <span style={{ width: 22, height: 8, borderRadius: 999, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}` }} />
          付随工程
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10.5, fontWeight: 700, color: MUTE }}>
          <span style={{ width: 11, height: 11, background: GOLD, border: '1px solid #C9922B', transform: 'rotate(45deg)' }} />
          マイルストーン
        </span>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        {[
          { t: '9〜10月', d: 'AIモデル開発（Map検証）と本番インフラ構築を並行、10月からデータ蓄積を開始' },
          { t: '11〜12月', d: 'システム構築と並行してAI検証・チューニングを行い、精度を作り込む' },
          { t: '1〜4月', d: 'テスト → 旭化成ホームズ様確認・指摘事項修正 → 3月リリース → 検証インフラ構築' },
        ].map((c) => (
          <div key={c.t} style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '9px 13px' }}>
            <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', color: ACCENT_INK, fontWeight: 800 }}>{c.t}</p>
            <p style={{ fontSize: 11, color: GRAPHITE, fontWeight: 600, marginTop: 4, lineHeight: 1.5 }}>{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 9 — 開発体制                                                     */
/* ===================================================================== */

const TEAM = [
  {
    icon: Brain,
    role: 'AIエンジニア',
    en: 'AI ENGINEER',
    d: 'AIモデルの構築、学習モデルの構築などの開発を担います',
  },
  {
    icon: Server,
    role: 'バックエンド / インフラエンジニア',
    en: 'BACKEND / INFRA ENGINEER',
    d: 'サーバー、データベース、その他裏側の仕組みの開発を担います',
  },
];

/* 人数バッジ */
function HeadCount({ n = 1 }: { n?: number }) {
  return (
    <span
      style={{
        fontSize: 10.5,
        fontWeight: 800,
        color: '#fff',
        background: ACCENT,
        borderRadius: 999,
        padding: '3px 10px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {n}名
    </span>
  );
}

const Slide9 = (
  <Frame n={12}>
    <Head eyebrow="Team / 開発体制" title="PM 1名・エンジニア 2名。窓口を一本化した少数精鋭体制で進めます" />

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 14, minHeight: 0 }}>
      <div style={{ width: '100%', maxWidth: 880, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 0 }}>
        {/* ===== 発注元 ===== */}
        <div
          style={{
            width: '100%',
            background: `linear-gradient(118deg, ${SECTION_BG} 0%, #0C5A49 100%)`,
            borderRadius: 16,
            padding: '21px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            boxShadow: '0 18px 38px rgba(7,49,42,0.24)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 15,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Building2 style={{ width: 25, height: 25, color: '#fff', strokeWidth: 1.7 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.22em', color: MINT, fontWeight: 800 }}>CLIENT</p>
            <p style={{ fontSize: 23, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginTop: 5 }}>旭化成ホームズ株式会社 様</p>
          </div>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.72)', flexShrink: 0 }}>プロジェクトオーナー</span>
        </div>

        {/* ===== 窓口コネクタ ===== */}
        <div style={{ position: 'relative', width: '100%', flex: '0.8 1 0', minHeight: 44 }}>
          <span style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1.5, background: LINE, transform: 'translateX(-50%)' }} />
          <span
            style={{
              position: 'absolute',
              left: 'calc(50% + 16px)',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 10.5,
              fontWeight: 800,
              color: ACCENT_INK,
              background: ACCENT_SOFT,
              border: `1px solid ${ACCENT}`,
              borderRadius: 999,
              padding: '3px 11px',
              whiteSpace: 'nowrap',
            }}
          >
            窓口・進捗報告
          </span>
        </div>

        {/* ===== PM ===== */}
        <div
          style={{
            width: 580,
            background: CARD,
            border: `1.5px solid ${LINE}`,
            borderRadius: 14,
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: '0 10px 24px rgba(15,17,21,0.04)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ClipboardList style={{ width: 21, height: 21, color: ACCENT_INK, strokeWidth: 1.8 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: INK, lineHeight: 1.3 }}>PM（プロジェクトマネージャー）</p>
                <HeadCount />
              </div>
              <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.14em', color: MUTE, fontWeight: 700, marginTop: 4 }}>PROJECT MANAGER</p>
            </div>
          </div>
          <div style={{ height: 1, background: HAIR, margin: '14px 0 13px' }} />
          <p style={{ fontSize: 12.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.75 }}>
            プロジェクトを円滑に進めるため、<strong style={{ color: INK, fontWeight: 800 }}>お客様の窓口</strong>及び<strong style={{ color: INK, fontWeight: 800 }}>開発の進捗管理</strong>を担います
          </p>
        </div>

        {/* ===== 分岐コネクタ ===== */}
        <div style={{ position: 'relative', width: '100%', flex: '0.7 1 0', minHeight: 38 }}>
          <span style={{ position: 'absolute', left: '50%', top: 0, height: '50%', width: 1.5, background: LINE, transform: 'translateX(-50%)' }} />
          <span style={{ position: 'absolute', left: '24.4%', right: '24.4%', top: '50%', height: 1.5, background: LINE }} />
          <span style={{ position: 'absolute', left: '24.4%', top: '50%', bottom: 0, width: 1.5, background: LINE }} />
          <span style={{ position: 'absolute', left: '75.6%', top: '50%', bottom: 0, width: 1.5, background: LINE }} />
        </div>

        {/* ===== エンジニア ===== */}
        <div style={{ width: '100%', display: 'flex', gap: 20, flex: '2.6 1 0', minHeight: 140 }}>
          {TEAM.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.role}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: CARD,
                  border: `1.5px solid ${LINE}`,
                  borderRadius: 14,
                  padding: '18px 20px',
                  boxShadow: '0 10px 24px rgba(15,17,21,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: 21, height: 21, color: ACCENT_INK, strokeWidth: 1.8 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <p style={{ fontSize: 15, fontWeight: 800, color: INK, lineHeight: 1.3 }}>{m.role}</p>
                      <HeadCount />
                    </div>
                    <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.14em', color: MUTE, fontWeight: 700, marginTop: 4 }}>{m.en}</p>
                  </div>
                </div>
                <div style={{ height: 1, background: HAIR, margin: '14px 0 13px' }} />
                <p style={{ fontSize: 12.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.75 }}>{m.d}</p>
              </div>
            );
          })}
        </div>

        {/* ===== 補足 ===== */}
        <div style={{ width: '100%', display: 'flex', gap: 10, paddingTop: 18, flexShrink: 0 }}>
          {[
            { t: '体制 計3名', d: 'PM 1名 ＋ エンジニア 2名の専任チーム' },
            { t: '窓口は一本化', d: 'ご連絡・ご確認はPMが受け、開発チームへ展開' },
            { t: '役割を分担', d: 'AIモデルとシステム基盤をそれぞれ専任で開発' },
          ].map((c) => (
            <div key={c.t} style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '9px 13px' }}>
              <p style={{ fontSize: 11.5, fontWeight: 800, color: ACCENT_INK }}>{c.t}</p>
              <p style={{ fontSize: 10.5, color: MUTE, fontWeight: 600, marginTop: 3, lineHeight: 1.5 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 7 — 叶えたいこと                                                 */
/* ===================================================================== */

/* セクション見出し */
function SecLabel({ en, jp }: { en: string; jp: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexShrink: 0 }}>
      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', color: ACCENT_INK, fontWeight: 800 }}>{en}</span>
      <span style={{ fontSize: 12.5, fontWeight: 800, color: INK }}>{jp}</span>
      <span style={{ flex: 1, height: 1, background: HAIR }} />
    </div>
  );
}

/* 演算子バッジ（× / ＝） */
function OpBadge({ op }: { op: string }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 44,
        height: 44,
        borderRadius: 999,
        background: CARD,
        border: `1.5px solid ${ACCENT}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 16px rgba(11,124,106,0.14)',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 20, fontWeight: 800, color: ACCENT, lineHeight: 1 }}>{op}</span>
    </div>
  );
}

/* 成長ファクターのカード */
function FactorCard({ icon: Icon, title, desc, items }: { icon: any; title: string; desc: React.ReactNode; items: { icon: any; t: string; d: string }[] }) {
  return (
    <div style={{ flex: 1, minHeight: 0, background: CARD, border: `1.5px solid ${LINE}`, borderRadius: 14, padding: '13px 15px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon style={{ width: 16, height: 16, color: ACCENT_INK, strokeWidth: 1.8 }} />
        </div>
        <p style={{ fontSize: 18, fontWeight: 800, color: INK }}>{title}</p>
      </div>
      <p style={{ fontSize: 12, fontWeight: 700, color: GRAPHITE, lineHeight: 1.6, marginTop: 8, flexShrink: 0 }}>{desc}</p>

      <div style={{ flex: 1, display: 'flex', gap: 8, marginTop: 10, minHeight: 0 }}>
        {items.map((it) => {
          const I = it.icon;
          return (
            <div
              key={it.t}
              style={{
                flex: 1,
                minWidth: 0,
                background: '#FAFBFB',
                border: `1px solid ${HAIR}`,
                borderRadius: 9,
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <I style={{ width: 15, height: 15, color: ACCENT, strokeWidth: 1.9, marginBottom: 7 }} />
              <p style={{ fontSize: 11.5, fontWeight: 800, color: INK, lineHeight: 1.3 }}>{it.t}</p>
              <p style={{ fontSize: 9.5, color: MUTE, fontWeight: 600, lineHeight: 1.45, marginTop: 3 }}>{it.d}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const GOAL_MATCH = [
  { icon: Network, t: '一括マッチング', d: '複数の土地 × 複数の企業を自動で突合' },
  { icon: Send, t: '打診の自動化', d: '一括送信し、回答はフォームで集約' },
  { icon: Siren, t: '放置案件アラート', d: '止まった案件を検知して通知' },
];

const GOAL_REVENUE = [
  { icon: Coins, t: '想定賃料の自動生成', d: '周辺相場と過去実績からレンジ算出' },
  { icon: Target, t: '根拠のスコア化', d: '立地条件を点数化して交渉材料に' },
  { icon: Repeat, t: '実績の学習', d: '成約結果を学習し精度が上がり続ける' },
];

/* 事業成長のイメージグラフ（売上＝成約件数 × 1件あたり収益 の積み上げ） */
function GrowthChart() {
  const BASE = 214; // X軸
  const FLAT = 176; // 現状の売上水準
  const XS = [60, 200, 340];

  /* 上端＝売上全体（件数増 ＋ 単価増） */
  const TOTAL = 'M60,176 C112,168 152,140 200,112 C262,78 302,64 340,40';
  /* 中間＝成約件数の増加分だけ乗せた水準 */
  const COUNT = 'M60,176 C112,172 152,158 200,140 C258,120 300,112 340,104';
  /* 全体カーブの終点（40）／件数カーブの終点（104） */
  const TOP_END = 40;
  const MID_END = 104;

  return (
    <svg viewBox="0 0 470 252" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="bandCount" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="bandRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.42" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.16" />
        </linearGradient>
      </defs>

      {/* 目盛 */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="24" y1={y} x2="344" y2={y} stroke={HAIR} strokeWidth="1" />
      ))}
      <text x="24" y="22" fontSize="10" fill={MUTE} fontWeight="700" fontFamily={SANS}>
        売上
      </text>

      {/* 現状の売上（土台） */}
      <path d={`M60,${FLAT} L340,${FLAT} L340,${BASE} L60,${BASE} Z`} fill="#EDEFF2" />
      <text x="200" y="199" textAnchor="middle" fontSize="9.5" fill={MUTE} fontWeight="700" fontFamily={SANS}>
        現状の売上
      </text>

      {/* ① 成約件数の増加分 */}
      <path d={`${COUNT} L340,${FLAT} L60,${FLAT} Z`} fill="url(#bandCount)" />
      {/* ② 1件あたり収益の増加分 */}
      <path d={`${TOTAL} L340,${MID_END} C300,112 258,120 200,140 C152,158 112,172 60,176 Z`} fill="url(#bandRevenue)" />

      {/* 現状維持ライン */}
      <line x1="60" y1={FLAT} x2="344" y2={FLAT} stroke={FAINT} strokeWidth="1.5" strokeDasharray="6 5" />

      {/* 境界カーブ */}
      <path d={COUNT} fill="none" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.75" />
      <path d={TOTAL} fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />

      {/* 補助線 */}
      {XS.map((x) => (
        <line key={`g${x}`} x1={x} y1="30" x2={x} y2={BASE} stroke={HAIR} strokeWidth="1" strokeDasharray="3 3" />
      ))}

      {/* X軸 */}
      <line x1="24" y1={BASE} x2="344" y2={BASE} stroke={LINE} strokeWidth="1.6" />

      {/* ポイント */}
      {[
        [60, 176],
        [200, 112],
        [340, 40],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="6" fill={CARD} stroke={ACCENT} strokeWidth="2.6" />
      ))}

      {/* ===== 右：伸びの内訳ブラケット ===== */}
      {/* ② 1件あたり収益 */}
      <path d={`M348,${TOP_END} L356,${TOP_END} L356,${MID_END} L348,${MID_END}`} fill="none" stroke={ACCENT} strokeWidth="1.6" />
      <text x="362" y={(TOP_END + MID_END) / 2 - 3} fontSize="11" fill={ACCENT_INK} fontWeight="800" fontFamily={SANS}>
        1件あたり収益
      </text>
      <text x="362" y={(TOP_END + MID_END) / 2 + 11} fontSize="9" fill={MUTE} fontWeight="700" fontFamily={SANS}>
        AIが引き上げる
      </text>

      {/* ① 成約件数 */}
      <path d={`M348,${MID_END} L356,${MID_END} L356,${FLAT} L348,${FLAT}`} fill="none" stroke={ACCENT} strokeWidth="1.6" opacity="0.6" />
      <text x="362" y={(MID_END + FLAT) / 2 - 3} fontSize="11" fill={ACCENT_INK} fontWeight="800" fontFamily={SANS}>
        成約件数
      </text>
      <text x="362" y={(MID_END + FLAT) / 2 + 11} fontSize="9" fill={MUTE} fontWeight="700" fontFamily={SANS}>
        システムが増やす
      </text>

      {/* 現状 */}
      <path d={`M348,${FLAT} L356,${FLAT} L356,${BASE} L348,${BASE}`} fill="none" stroke={FAINT} strokeWidth="1.4" />
      <text x="362" y={(FLAT + BASE) / 2 + 3} fontSize="9.5" fill={MUTE} fontWeight="700" fontFamily={SANS}>
        現状
      </text>

      {/* X軸ラベル */}
      <text x="60" y="234" textAnchor="middle" fontSize="11" fill={MUTE} fontWeight="700" fontFamily={SANS}>
        現在
      </text>
      <text x="60" y="247" textAnchor="middle" fontSize="9" fill={FAINT} fontWeight="700" fontFamily={SANS}>
        属人運用
      </text>
      <text x="200" y="234" textAnchor="middle" fontSize="11" fill={GRAPHITE} fontWeight="800" fontFamily={SANS}>
        システム導入
      </text>
      <text x="200" y="247" textAnchor="middle" fontSize="9" fill={FAINT} fontWeight="700" fontFamily={SANS}>
        機会損失を回収
      </text>
      <text x="340" y="234" textAnchor="middle" fontSize="11" fill={ACCENT_INK} fontWeight="800" fontFamily={SANS}>
        AI学習
      </text>
      <text x="340" y="247" textAnchor="middle" fontSize="9" fill={FAINT} fontWeight="700" fontFamily={SANS}>
        精度が上がり続ける
      </text>
    </svg>
  );
}

const Slide7 = (
  <Frame n={14}>
    <Head eyebrow="Goal / 叶えたいこと" title="成約率と1件あたり収益、その両輪で売上を伸ばす" />

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: 16, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', gap: 14, minHeight: 0 }}>
        {/* ============ 左：成長ファクター ============ */}
        <div style={{ flex: 1.02, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <SecLabel en="GROWTH FACTORS" jp="成長ファクター" />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <FactorCard
              icon={Handshake}
              title="成約率"
              desc={
                <>
                  システムとAIの力で<strong style={{ color: ACCENT_INK, fontWeight: 800 }}>マッチング率</strong>を上げ、
                  <strong style={{ color: INK, fontWeight: 800 }}>機会損失を埋める</strong>
                </>
              }
              items={GOAL_MATCH}
            />

            <div style={{ height: 42, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <span style={{ flex: 1, height: 1, background: HAIR }} />
              <OpBadge op="×" />
              <span style={{ flex: 1, height: 1, background: HAIR }} />
            </div>

            <FactorCard
              icon={Coins}
              title="収益アップ"
              desc={
                <>
                  AIの力で<strong style={{ color: ACCENT_INK, fontWeight: 800 }}>相場分析</strong>を行い、
                  <strong style={{ color: INK, fontWeight: 800 }}>1件あたりの収益</strong>を増やしていく
                </>
              }
              items={GOAL_REVENUE}
            />
          </div>
        </div>

        {/* ============ ＝ ============ */}
        <div style={{ width: 46, flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ position: 'absolute', top: 34, bottom: 8, width: 1.5, background: HAIR }} />
          <OpBadge op="=" />
        </div>

        {/* ============ 右：事業成長グラフ ============ */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <SecLabel en="SALES GROWTH" jp="事業成長イメージ" />

          <div
            style={{
              flex: 1,
              minHeight: 0,
              background: CARD,
              border: `1.5px solid ${ACCENT}`,
              borderRadius: 16,
              padding: '15px 18px 13px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 14px 32px rgba(11,124,106,0.10)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TrendingUp style={{ width: 18, height: 18, color: '#fff', strokeWidth: 2.2 }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 17, fontWeight: 800, color: INK, lineHeight: 1.25 }}>売上</p>
                <p style={{ fontSize: 10, fontWeight: 700, color: MUTE, marginTop: 2 }}>
                  成約件数 <span style={{ color: ACCENT, fontWeight: 800 }}>×</span> 1件あたり収益 <span style={{ color: ACCENT, fontWeight: 800 }}>=</span> 売上
                </p>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '0.14em', color: MUTE, fontWeight: 700, border: `1px solid ${LINE}`, borderRadius: 3, padding: '3px 7px', flexShrink: 0 }}>IMAGE</span>
            </div>

            {/* グラフ本体 */}
            <div style={{ flex: 1, minHeight: 0, marginTop: 8 }}>
              <GrowthChart />
            </div>

            <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginTop: 6 }}>
              {[
                {
                  sw: 'rgba(11,124,106,0.16)',
                  k: '成約件数',
                  by: 'システムが増やす',
                  d: '打診できる件数を最大化し、取りこぼしをなくす',
                },
                {
                  sw: 'rgba(11,124,106,0.42)',
                  k: '1件あたり収益',
                  by: 'AIが引き上げる',
                  d: '相場と実績から、根拠のある賃料で成約する',
                },
              ].map((r) => (
                <div key={r.k} style={{ flex: 1, minWidth: 0, background: '#FAFBFB', border: `1px solid ${HAIR}`, borderRadius: 8, padding: '7px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 11, height: 11, borderRadius: 3, background: r.sw, border: `1px solid ${ACCENT}`, flexShrink: 0 }} />
                    <p style={{ fontSize: 11, fontWeight: 800, color: INK }}>
                      {r.k}
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: ACCENT_INK }}> ／ {r.by}</span>
                    </p>
                  </div>
                  <p style={{ fontSize: 9.5, fontWeight: 600, color: MUTE, marginTop: 3, lineHeight: 1.5 }}>{r.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 締め */}
      <div
        style={{
          marginTop: 14,
          background: ACCENT,
          borderRadius: 14,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          flexShrink: 0,
        }}
      >
        <Sparkles style={{ width: 19, height: 19, color: '#fff', strokeWidth: 2, flexShrink: 0 }} />
        <p style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>システムとAIで事業成長を促す</p>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* 章扉（02 / 05 / 09）                                                    */
/* ===================================================================== */

const Section1 = (
  <SectionSlide
    key="sec1"
    n={2}
    num="01"
    en="OVERVIEW"
    jp="Overview"
    lead="属人化している現在の業務を整理し、今回のミッションと改善のポイントを共有します。"
    items={['今回のミッション', '現在の業務フローと課題', '改善のポイント']}
  />
);

const Section2 = (
  <SectionSlide
    key="sec2"
    n={5}
    num="02"
    en="SYSTEM & AI DEVELOPMENT"
    jp="システムとAIの開発"
    lead="業務を回すシステムと、判断を支えるAI。それぞれで何ができるのか、そしてどのように開発を進めるのかをご説明します。"
    items={['システムでできること', 'AIでできること', 'インフラ構成', 'マッチングの仕組み', '開発スケジュール']}
  />
);

const Section3 = (
  <SectionSlide
    key="sec3"
    n={13}
    num="03"
    en="GROWTH WITH DX × IT"
    jp="DX×ITで事業を伸ばす"
    lead="システムとAIの導入が、成約件数と1件あたり収益をどのように押し上げ、事業成長につながるのかをご説明します。"
    items={['成長ファクター', '成約件数 × 1件あたり収益', '事業成長イメージ']}
  />
);

/* ===================================================================== */
/* SLIDE 11 — END                                                         */
/* ===================================================================== */

const SlideEnd = (
  <div key="end" className={SLIDE} style={{ background: SECTION_BG, fontFamily: SANS }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(11,124,106,0.5), transparent 58%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 6% 96%, rgba(11,124,106,0.24), transparent 48%)' }} />

    <div style={{ position: 'absolute', top: 22, left: 64, right: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 4 }}>
      <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)' }}>{DECK_TAG}</span>
      <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)' }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>{String(TOTAL).padStart(2, '0')}</span> / {TOTAL}
      </span>
    </div>

    <div
      style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 64px',
        boxSizing: 'border-box',
      }}
    >
      <p style={{ fontFamily: MONO, fontSize: 78, fontWeight: 800, color: '#fff', letterSpacing: '0.3em', lineHeight: 1, textIndent: '0.3em' }}>END</p>
      <div style={{ width: 72, height: 3, background: MINT, margin: '30px 0 26px' }} />
      <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, textAlign: 'center' }}>
        テナントマッチング AIプラットフォーム構築のご提案
        <br />
        ご不明点・ご要望は、あらためてお打ち合わせにてご相談させてください。
      </p>
    </div>

    <div style={{ position: 'absolute', bottom: 34, left: 64, right: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: 16 }}>
      <div>
        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)', fontWeight: 700, marginBottom: 5 }}>ご提案先</p>
        <p style={{ fontSize: 13.5, fontWeight: 800, color: 'rgba(255,255,255,0.92)' }}>旭化成ホームズ株式会社 御中</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)', fontWeight: 700, marginBottom: 5 }}>ご提案元 / 2026.07</p>
        <p style={{ fontSize: 13.5, fontWeight: 800, color: 'rgba(255,255,255,0.92)' }}>Meece株式会社</p>
        <a
          href="https://meece-jp.com/"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginTop: 5, textDecoration: 'none' }}
        >
          https://meece-jp.com/
        </a>
      </div>
    </div>

    <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 3, background: 'rgba(255,255,255,0.14)', zIndex: 6 }}>
      <div style={{ width: '100%', height: '100%', background: MINT }} />
    </div>
  </div>
);

export const asahiKaseiTenantDxPresentation: PresentationEntry = {
  meta: {
    id: 'asahi-kasei-tenant-dx-2026',
    title: 'テナント事業DX ／ テナントマッチング AIプラットフォーム構築のご提案',
    description:
      '旭化成ホームズ株式会社 御中（全15枚）。AI開発による事業戦略立案。Overview（今回のミッション／現在の業務フローの課題整理と改善ポイント）／システムとAIの開発（システムでできること・AIでできること・AWSマネージドサービスによるインフラ構成イメージ・土地を商圏プロファイル化して保有テナント情報と突き合わせるマッチングの仕組み・構成図上を①〜⑦で追う処理の流れ・9月受注〜3月リリースの開発スケジュール・PM1名＋エンジニア2名の開発体制）／DX×ITで事業を伸ばす（成長ファクターと事業成長イメージ）の3章構成。ご提案元：Meece株式会社。',
    thumbnail: `linear-gradient(135deg, ${PAPER} 0%, ${ACCENT_SOFT} 55%, ${ACCENT} 130%)`,
    author: 'Meece株式会社',
    createdAt: '2026-07-30',
  },
  slides: [
    Slide1, //   1  表紙
    Section1, // 2  章扉 Overview
    Slide2, //   3  今回のミッション
    Slide3, //   4  課題整理
    Section2, // 5  章扉 システムとAIの開発
    Slide4, //   6  システムでできること
    Slide5, //   7  AIでできること
    SlideInfra, // 8 インフラ構成イメージ（AWS）
    SlideMatching, // 9 データとマッチングの仕組み
    SlideFlow, // 10 処理の流れ（構成図上のデータフロー）
    Slide6, //  11  開発スケジュールイメージ
    Slide9, //  12  開発体制
    Section3, // 13 章扉 DX×ITで事業を伸ばす
    Slide7, //  14  叶えたいこと
    SlideEnd, // 15 END
  ],
};
