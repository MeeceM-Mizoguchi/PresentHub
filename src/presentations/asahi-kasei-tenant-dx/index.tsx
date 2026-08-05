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
const TOTAL = 12;
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
/* SLIDE 6 — 開発スケジュールイメージ                                     */
/* ===================================================================== */

const MONTHS = ['8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'];
const ROW_H = 28;

type GanttItem = { r: number; type: 'bar' | 'ms'; x: number; w?: number; label: string; strong?: boolean };

const GANTT: GanttItem[] = [
  { r: 0, type: 'ms', x: 1.5, label: '受注' },
  { r: 1, type: 'bar', x: 2, w: 11, label: 'AIモデル開発', strong: true },
  { r: 2, type: 'bar', x: 2, w: 11, label: 'システム側微修正' },
  { r: 3, type: 'bar', x: 9.5, w: 9.5, label: 'データ蓄積' },
  { r: 4, type: 'bar', x: 2, w: 17, label: '開発検証' },
  { r: 5, type: 'bar', x: 12.5, w: 25, label: 'インフラ構築' },
  { r: 6, type: 'bar', x: 37.5, w: 13, label: '旭化成ホームズ様検証', strong: true },
  { r: 7, type: 'bar', x: 38, w: 13, label: 'フィードバック対応' },
  { r: 8, type: 'ms', x: 51.5, label: '検証結果議論' },
  { r: 9, type: 'bar', x: 52.5, w: 7.5, label: '修正期間' },
  { r: 10, type: 'bar', x: 55.5, w: 7.5, label: '再確認期間' },
  { r: 11, type: 'ms', x: 63, label: 'リリース判定' },
  { r: 12, type: 'ms', x: 66, label: 'リリース' },
  { r: 13, type: 'bar', x: 66.5, w: 8.5, label: '本番環境動作確認' },
];

const Slide6 = (
  <Frame n={8}>
    <Head eyebrow="Schedule / 開発スケジュールイメージ" title="8月受注 → 11月に貴社検証 → 1月リリース、以降フェーズ2へ" />

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
          height: ROW_H * GANTT.length + 12,
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
            left: '75.2%',
            width: '23.5%',
            top: ROW_H * 11 + 6,
            height: ROW_H * 3 + 4,
            border: `1.5px solid ${LINE}`,
            borderRadius: 8,
            background: '#F7F8F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 800, color: GRAPHITE, letterSpacing: '0.04em' }}>以降、フェーズ2</span>
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
          { t: '8〜10月', d: 'AIモデル開発・開発検証と並行してインフラ構築を進める' },
          { t: '11〜12月', d: '旭化成ホームズ様に実データで検証いただき、随時反映' },
          { t: '12〜1月', d: '修正・再確認 → リリース判定 → リリース → 本番環境動作確認' },
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
  <Frame n={9}>
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
  <Frame n={11}>
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
    items={['システムでできること', 'AIでできること', '開発スケジュール']}
  />
);

const Section3 = (
  <SectionSlide
    key="sec3"
    n={10}
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
      '旭化成ホームズ株式会社 御中（全12枚）。AI開発による事業戦略立案。Overview（今回のミッション／現在の業務フローの課題整理と改善ポイント）／システムとAIの開発（システムでできること・AIでできること・8月受注〜1月リリースの開発スケジュール・PM1名＋エンジニア2名の開発体制）／DX×ITで事業を伸ばす（成長ファクターと事業成長イメージ）の3章構成。ご提案元：Meece株式会社。',
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
    Slide6, //   8  開発スケジュールイメージ
    Slide9, //   9  開発体制
    Section3, // 10 章扉 DX×ITで事業を伸ばす
    Slide7, //  11  叶えたいこと
    SlideEnd, // 12 END
  ],
};
