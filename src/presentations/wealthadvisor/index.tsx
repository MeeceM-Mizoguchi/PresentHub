import {
  Search,
  PenLine,
  ShieldCheck,
  UserCheck,
  Send,
  FileText,
  Bot,
  Database,
  Cloud,
  Server,
  Cpu,
  Layers,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  Users,
  Bell,
  BookOpen,
  ScanText,
  Newspaper,
  Repeat,
  Coins,
  Calendar,
  Wallet,
  Handshake,
  Target,
  ClipboardCheck,
  Image as ImageIcon,
  Check,
  Minus,
  CornerDownLeft,
  Pencil,
  Plus,
  ArrowRight,
  ArrowDown,
  ListChecks,
  Braces,
  Rocket,
  Workflow,
  FileCheck2,
  LayoutDashboard,
  Eye,
  Sliders,
  History,
  KeyRound,
  MousePointerClick,
} from 'lucide-react';
import type { PresentationEntry } from '../registry';

/* ============================================================
   ウェルスアドバイザー社 ご提案（全15枚）
   投資信託レポート／ニュース記事 AI自動生成システム
   Meece株式会社 ＝ AK+ アライアンスパートナー（開発会社）

   Design : "Light × Advanced Editorial" ＋ 図解主体
   ─ クールなオフホワイト紙面 × インク × 単一インディゴ
   ─ ピクトグラム・フロー図・グラフを主役に、文字は短句へ
   ============================================================ */

const PAPER = '#F4F5F7';
const CARD = '#FFFFFF';
const INK = '#0F1115';
const GRAPHITE = '#3A3E46';
const MUTE = '#83878F';
const FAINT = '#C3C6CD';
const LINE = '#E4E6EA';
const HAIR = '#EDEEF1';
const ACCENT = '#3B37FF';
const ACCENT_INK = '#2A27C7';
const ACCENT_SOFT = '#ECEBFF';
const ACCENT_2 = '#8A87FF'; // 明るいインディゴ（sequential 2段目）
const NEUTRAL = '#B4B8C1'; // 「人手」など muted カテゴリ
const SIGNAL = '#FF4A24';
const POSITIVE = '#0E9F6E';

const MONO = "'SF Mono', ui-monospace, 'Menlo', 'Roboto Mono', monospace";
const SANS = "-apple-system, 'Helvetica Neue', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

const SLIDE = 'w-full h-[720px] relative overflow-hidden';
const DECK_TAG = '投信レポート AI自動生成システム ご提案';
const TOTAL = 18;

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

function Frame({ n, children, pad = '62px 76px 40px' }: { n: number; children: React.ReactNode; pad?: string }) {
  return (
    <div className={SLIDE} style={{ background: PAPER, fontFamily: SANS }}>
      <div style={{ position: 'absolute', top: 24, left: 76, right: 76, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 4 }}>
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

function Head({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <div>
      <Eyebrow label={eyebrow} />
      <h2 style={{ fontSize: 33, fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.28, marginTop: 16 }}>{title}</h2>
    </div>
  );
}

function Ghost({ children, right = 72, top = 40 }: { children: React.ReactNode; right?: number; top?: number }) {
  return (
    <span style={{ position: 'absolute', top, right, fontFamily: MONO, fontSize: 150, fontWeight: 700, color: '#EBECEF', letterSpacing: '-0.04em', lineHeight: 1, zIndex: 0, userSelect: 'none' }}>
      {children}
    </span>
  );
}

/* アイコンタイル */
function Tile({ icon: Icon, on = false, size = 52 }: { icon: any; on?: boolean; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 14, background: on ? ACCENT_SOFT : CARD, border: `1.5px solid ${on ? ACCENT : LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon style={{ width: size * 0.42, height: size * 0.42, color: on ? ACCENT_INK : INK, strokeWidth: 1.7 }} />
    </div>
  );
}

/* 水平パイプライン（アイコンノード） */
const PIPE = [
  { label: '収集', en: 'COLLECT', icon: Search },
  { label: '生成', en: 'GENERATE', icon: PenLine },
  { label: 'ファクトチェック', en: 'FACT-CHECK', icon: ShieldCheck },
  { label: '人の承認', en: 'APPROVE', icon: UserCheck },
  { label: '公開', en: 'PUBLISH', icon: Send },
];
function Track({ accent = [] as number[], captions = false }: { accent?: number[]; captions?: boolean }) {
  const caps = ['プログラム／RPA', '記事テンプレ＋RAG', 'AIが一次点検', '人が最終判断', 'CMS連携'];
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingTop: 6 }}>
      <div style={{ position: 'absolute', top: 32, left: 26, right: 26, height: 1.5, background: LINE }} />
      {PIPE.map((s, i) => {
        const on = accent.includes(i);
        return (
          <div key={s.label} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 1, flex: 1 }}>
            <Tile icon={s.icon} on={on} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: on ? ACCENT_INK : INK }}>{s.label}</p>
              {captions && <p style={{ fontSize: 11, color: MUTE, fontWeight: 600, marginTop: 5 }}>{caps[i]}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* 横棒（1系列） */
function Bar({ pct, color = ACCENT, h = 14 }: { pct: number; color?: string; h?: number }) {
  return (
    <div style={{ flex: 1, height: h, background: HAIR, borderRadius: h / 2 }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: h / 2 }} />
    </div>
  );
}

/* 精度の推移（ミニ折れ線） */
function AccuracyChart() {
  const W = 380, H = 168, padX = 10, top = 14, base = H - 26;
  const real = [61, 69, 76, 82, 86, 89];
  const future = [89, 91, 93];
  const n = real.length;
  const stepAll = (W - 2 * padX) / (n - 1 + future.length - 1);
  const x = (i: number) => padX + i * stepAll;
  const y = (v: number) => base - ((v - 55) / (96 - 55)) * (base - top);
  const line = real.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(n - 1).toFixed(1)},${base} L${x(0).toFixed(1)},${base} Z`;
  const fLine = future.map((v, i) => `${i ? 'L' : 'M'}${x(n - 1 + i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {[60, 75, 90].map((g) => (
        <g key={g}>
          <line x1={padX} y1={y(g)} x2={W - padX} y2={y(g)} stroke={HAIR} strokeWidth={1} />
          <text x={0} y={y(g) + 3} fontFamily={MONO} fontSize={8.5} fill={MUTE}>{g}</text>
        </g>
      ))}
      <line x1={padX} y1={base} x2={W - padX} y2={base} stroke={LINE} strokeWidth={1} />
      <path d={area} fill={ACCENT} opacity={0.08} />
      <path d={line} fill="none" stroke={ACCENT} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={fLine} fill="none" stroke={NEUTRAL} strokeWidth={2} strokeDasharray="4 4" strokeLinecap="round" />
      {real.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={3.2} fill={CARD} stroke={ACCENT} strokeWidth={2} />)}
      <circle cx={x(n - 1 + future.length - 1)} cy={y(future[future.length - 1])} r={3.2} fill={NEUTRAL} />
      {/* stage divider */}
      <line x1={x(n - 1)} y1={top} x2={x(n - 1)} y2={base} stroke={FAINT} strokeWidth={1} strokeDasharray="3 3" />
      <text x={x(2)} y={H - 8} textAnchor="middle" fontFamily={MONO} fontSize={9} fill={ACCENT_INK} fontWeight={700}>STAGE 1</text>
      <text x={x(n - 0.2)} y={H - 8} textAnchor="middle" fontFamily={MONO} fontSize={9} fill={MUTE}>STAGE 2</text>
    </svg>
  );
}

/* ===================================================================== */
/* SLIDE 1 — 表紙                                                         */
/* ===================================================================== */
const Slide1 = (
  <div key="s1" className={SLIDE} style={{ background: PAPER, fontFamily: SANS }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 92% 4%, rgba(59,55,255,0.07), transparent 46%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 2% 96%, rgba(59,55,255,0.05), transparent 44%)' }} />

    <div style={{ position: 'absolute', top: 40, left: 76, right: 76, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: ACCENT_INK, fontWeight: 700 }}>MEECE × AK+ ALLIANCE</span>
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: MUTE }}>PROPOSAL / 2026.07</span>
    </div>
    <div style={{ position: 'absolute', top: 64, left: 76, right: 76, height: 1, background: LINE, zIndex: 2 }} />

    <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', padding: '0 76px', boxSizing: 'border-box', gap: 48 }}>
      <div style={{ flex: 1.3 }}>
        <p style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', color: ACCENT_INK, fontWeight: 700, marginBottom: 22 }}>AI CONTENT AUTOMATION</p>
        <h1 style={{ fontSize: 50, fontWeight: 800, color: INK, letterSpacing: '-0.03em', lineHeight: 1.22 }}>
          投資信託レポート／
          <br />
          ニュース記事
          <br />
          <span style={{ color: ACCENT }}>AI自動生成システム</span>
          <span style={{ fontSize: 29, fontWeight: 700, color: GRAPHITE }}>　ご提案</span>
        </h1>
        <div style={{ width: 64, height: 3, background: ACCENT, margin: '28px 0 24px' }} />
        <p style={{ fontSize: 16.5, color: GRAPHITE, lineHeight: 1.85, maxWidth: 540, fontWeight: 500 }}>
          収集・生成・校正を<strong style={{ color: INK, fontWeight: 800 }}>AIで自動化</strong>し、
          <br />
          <strong style={{ color: INK, fontWeight: 800 }}>品質は人が担保</strong>する仕組み。
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 28, padding: '11px 18px', background: CARD, border: `1px solid ${LINE}`, borderLeft: `3px solid ${ACCENT}`, borderRadius: 4 }}>
          <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.16em', color: ACCENT_INK, fontWeight: 700, background: ACCENT_SOFT, padding: '3px 7px', borderRadius: 3 }}>CORE</span>
          <span style={{ fontSize: 13, color: GRAPHITE, fontWeight: 600 }}>中核は、人が最終承認する<strong style={{ color: INK }}>レビュー画面</strong></span>
        </div>
      </div>

      <div style={{ flex: 0.92 }}>
        <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: MUTE, marginBottom: 16 }}>THE PIPELINE — 05 STEPS</p>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 26, bottom: 26, left: 25, width: 1.5, background: LINE }} />
          {PIPE.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 18, padding: '9px 0' }}>
                <div style={{ position: 'relative', zIndex: 1 }}><Tile icon={Icon} on={i < 3} size={50} /></div>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 800, color: INK }}>{s.label}</p>
                  <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.16em', color: MUTE, marginTop: 3 }}>{s.en}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <div style={{ position: 'absolute', bottom: 34, left: 76, right: 76, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
      <div>
        <div style={{ width: '100%', height: 1, background: LINE, marginBottom: 14 }} />
        <p style={{ fontSize: 15, fontWeight: 800, color: INK }}>株式会社ウェルスアドバイザー　御中</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: INK }}>Meece株式会社</p>
        <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.1em', color: ACCENT_INK, marginTop: 4, fontWeight: 700 }}>AK+ アライアンスパートナー（開発）</p>
      </div>
    </div>
    <Rail n={1} />
  </div>
);

/* ===================================================================== */
/* SLIDE 2 — 目次                                                         */
/* ===================================================================== */
const tocItems: { no: string; title: string; page?: string; sub?: [string, string][] }[] = [
  { no: '01', title: '現状の課題（As-Is）', page: 'P3' },
  { no: '02', title: '目指す姿と全体像（To-Be）', page: 'P4' },
  { no: '03', title: 'ソリューション概要', sub: [['3-1  情報収集と記事生成', 'P5'], ['3-2  ファクトチェックと人の承認（中核）', 'P6'], ['3-3  使い方フロー（ユーザー操作）', 'P7'], ['3-4  画面一覧（必要な画面）', 'P8'], ['3-5  機能一覧（必要な機能）', 'P9'], ['3-6  システム構成（AWS / Bedrock）', 'P10']] },
  { no: '04', title: '品質担保とAIが育つ仕組み', sub: [['4-1  品質担保の考え方', 'P11'], ['4-2  AIが育つ仕組み（改善ループ）', 'P12']] },
  { no: '05', title: '私たちの強み・開発実績', page: 'P13' },
  { no: '06', title: 'ご提案の進め方', sub: [['6-1  なぜ外注が有利か', 'P14'], ['6-2  進め方とスケジュール', 'P15'], ['6-3  体制', 'P16'], ['6-4  概算費用とお支払い', 'P17']] },
  { no: '07', title: 'ご確認事項とネクストステップ', page: 'P18' },
];
const Slide2 = (
  <Frame n={2}>
    <Ghost>02</Ghost>
    <Head eyebrow="Contents / 目次" title={<>本日ご提案の構成</>} />
    <div style={{ display: 'flex', gap: 56, marginTop: 20, flex: 1 }}>
      <div style={{ flex: 1.7, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {tocItems.map((it) => (
          <div key={it.no} style={{ borderTop: `1px solid ${LINE}`, padding: '7px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: ACCENT_INK, width: 26, flexShrink: 0 }}>{it.no}</span>
              <span style={{ fontSize: 15.5, fontWeight: 800, color: INK, flex: 1 }}>{it.title}</span>
              {it.page && <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: MUTE }}>{it.page}</span>}
            </div>
            {it.sub && (
              <div style={{ paddingLeft: 44, marginTop: 2 }}>
                {it.sub.map(([t, p]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '1.5px 0' }}>
                    <span style={{ fontSize: 12.5, color: GRAPHITE, fontWeight: 600 }}>{t}</span>
                    <span style={{ flex: 1, borderBottom: `1px dotted ${FAINT}`, transform: 'translateY(-3px)' }} />
                    <span style={{ fontFamily: MONO, fontSize: 11, color: MUTE }}>{p}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${LINE}` }} />
      </div>

      <div style={{ flex: 0.95, background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: '26px 26px', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: MUTE }}>THE FLOW</p>
        <p style={{ fontSize: 15, fontWeight: 800, color: INK, marginTop: 8, marginBottom: 14 }}>話の芯は、一本のパイプライン</p>
        <div style={{ position: 'relative', flex: 1 }}>
          <div style={{ position: 'absolute', top: 20, bottom: 20, left: 21, width: 1.5, background: LINE }} />
          {PIPE.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, padding: '7px 0' }}>
                <div style={{ position: 'relative', zIndex: 1 }}><Tile icon={Icon} on={i < 3} size={42} /></div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: INK }}>{s.label}</p>
                  <p style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '0.14em', color: MUTE }}>{s.en}</p>
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
/* SLIDE 3 — 現状課題（As-Is）ピクトグラム＋手作業フロー                  */
/* ===================================================================== */
const asIs = [
  { icon: Search, t: '情報収集が手作業', d: '検索とDLを人手で。' },
  { icon: Users, t: '属人化・表記ブレ', d: '担当ごとに品質が変動。' },
  { icon: PenLine, t: '生成〜公開まで人手', d: '校正・公開も手作業。' },
  { icon: AlertTriangle, t: '見えないコスト', d: '価格転記・特殊PDF処理。' },
];
const Slide3 = (
  <Frame n={3}>
    <Ghost>03</Ghost>
    <Head eyebrow="As-Is / 現状の課題" title={<>いまは、多くが<span style={{ color: ACCENT }}>人手</span>に依存しています</>} />

    {/* 現状フロー：全工程が人手 */}
    <div style={{ marginTop: 26, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', color: MUTE, fontWeight: 700 }}>現状の記事フロー</span>
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: SIGNAL, fontWeight: 700 }}>ALL MANUAL</span>
      </div>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
        <div style={{ position: 'absolute', top: 19, left: 30, right: 30, height: 1.5, background: LINE }} />
        {PIPE.map((s) => (
          <div key={s.label} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, flex: 1 }}>
            <div style={{ width: 38, height: 38, borderRadius: 999, background: '#F2F3F5', border: `1.5px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users style={{ width: 17, height: 17, color: MUTE, strokeWidth: 1.7 }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: GRAPHITE }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* 課題ピクトグラム 4 */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 22, flex: 1, alignContent: 'center' }}>
      {asIs.map((r, i) => (
        <div key={r.t} style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
            <Tile icon={r.icon} size={50} />
            <span style={{ fontFamily: MONO, fontSize: 24, fontWeight: 700, color: '#EAEBEE' }}>{String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 10, lineHeight: 1.4 }}>{r.t}</h3>
          <p style={{ fontSize: 12.5, color: MUTE, lineHeight: 1.75, fontWeight: 500 }}>{r.d}</p>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
      <span style={{ width: 24, height: 2, background: ACCENT }} />
      <p style={{ fontSize: 15, fontWeight: 700, color: INK }}>いずれも<span style={{ color: ACCENT }}>品質を保ちながら効率化できる</span>領域です。</p>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 4 — To-Be：作業構成の変化（グラフ）＋パイプライン               */
/* ===================================================================== */
function ShiftBar({ label, segs }: { label: string; segs: { pct: number; color: string; text: string; dark?: boolean }[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ width: 74, fontSize: 13, fontWeight: 800, color: INK, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, display: 'flex', gap: 3, height: 34 }}>
        {segs.map((s, i) => (
          <div key={i} style={{ width: `${s.pct}%`, background: s.color, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: s.dark ? '#fff' : INK }}>{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
const Slide4 = (
  <Frame n={4}>
    <Head eyebrow="To-Be / 目指す姿" title={<>人の作業を、<span style={{ color: ACCENT }}>承認業務</span>へ寄せる</>} />

    {/* 作業構成グラフ */}
    <div style={{ marginTop: 26, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '20px 26px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', color: MUTE, fontWeight: 700 }}>作業構成の変化</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {[['AI', ACCENT], ['人（承認・判断）', NEUTRAL]].map(([t, c]) => (
            <span key={t as string} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: GRAPHITE }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: c as string }} /> {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ShiftBar label="現状" segs={[{ pct: 95, color: NEUTRAL, text: '人手 95%' }, { pct: 5, color: ACCENT, text: '', dark: true }]} />
        <ShiftBar label="導入後" segs={[{ pct: 75, color: ACCENT, text: 'AI 75%', dark: true }, { pct: 25, color: NEUTRAL, text: '人 25%' }]} />
      </div>
    </div>

    {/* パイプライン */}
    <div style={{ marginTop: 22, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.2em', color: MUTE, marginBottom: 8 }}>PIPELINE / 収集はAI、承認は人</p>
      <Track accent={[0, 1, 2]} captions />
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
      <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: ACCENT_INK, fontWeight: 700, flexShrink: 0 }}>TRIGGER</span>
      {[['①', '人の指示', Bell], ['②', '開示・発表の検知', Newspaper], ['③', '定型の定期実行', Repeat]].map(([no, t, Icon]) => (
        <span key={t as string} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: GRAPHITE, fontWeight: 700, marginRight: 8 }}>
          {/* @ts-ignore */}
          <Icon style={{ width: 15, height: 15, color: ACCENT, strokeWidth: 1.8 }} /> {no} {t}
        </span>
      ))}
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 5 — 情報収集と記事生成：トリガー→記事テンプレート→AI 図解        */
/* ===================================================================== */
const Slide5 = (
  <Frame n={5}>
    <Head eyebrow="Solution 3-1 / 情報収集と記事生成" title={<>AIが暴走しない、<span style={{ color: ACCENT }}>“記事テンプレート”</span>に沿った生成</>} />

    {/* 3ステップ図 */}
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, marginTop: 26 }}>
      {[
        { icon: Bell, tag: 'TRIGGER', t: '記事化のきっかけ', d: '人の指示／開示検知／定期実行' },
        { icon: BookOpen, tag: 'TEMPLATE', t: '“記事テンプレート”を事前登録', d: 'ソース・記事化条件・構成を型に' },
        { icon: Bot, tag: 'AI', t: 'AIが型を埋める', d: '過去記事を参照（RAG）して生成', on: true },
      ].map((s, i, arr) => (
        <div key={s.tag} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, background: CARD, border: `1.5px solid ${s.on ? ACCENT : LINE}`, borderRadius: 10, padding: '18px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Tile icon={s.icon} on={s.on} size={40} />
              <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', color: s.on ? ACCENT_INK : MUTE, fontWeight: 700 }}>{s.tag}</span>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 6 }}>{s.t}</h3>
            <p style={{ fontSize: 12, color: MUTE, lineHeight: 1.65, fontWeight: 500 }}>{s.d}</p>
          </div>
          {i < arr.length - 1 && <ArrowRight style={{ width: 22, height: 22, color: FAINT, flexShrink: 0, margin: '0 8px' }} />}
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', gap: 40, marginTop: 24, flex: 1 }}>
      {/* 役割分担 図 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', color: MUTE, marginBottom: 16 }}>ROLE / 役割分担</p>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 14 }}>
          <div style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, padding: '18px 16px', textAlign: 'center' }}>
            <Database style={{ width: 26, height: 26, color: GRAPHITE, strokeWidth: 1.6, margin: '0 auto 10px' }} />
            <p style={{ fontSize: 14, fontWeight: 800, color: INK }}>集める</p>
            <p style={{ fontFamily: MONO, fontSize: 9, color: MUTE, marginTop: 4 }}>PROGRAM / RPA → S3</p>
          </div>
          <div style={{ flex: 1, background: ACCENT_SOFT, border: `1px solid ${ACCENT}`, borderRadius: 10, padding: '18px 16px', textAlign: 'center' }}>
            <PenLine style={{ width: 26, height: 26, color: ACCENT_INK, strokeWidth: 1.6, margin: '0 auto 10px' }} />
            <p style={{ fontSize: 14, fontWeight: 800, color: ACCENT_INK }}>読む・書く</p>
            <p style={{ fontFamily: MONO, fontSize: 9, color: ACCENT, marginTop: 4 }}>AI (Bedrock)</p>
          </div>
        </div>
        <p style={{ fontSize: 12, color: GRAPHITE, fontWeight: 600, lineHeight: 1.7, marginTop: 14 }}>収集はAIではなく<strong style={{ color: INK }}>プログラム</strong>が実行。AIは “読む・書く” に専念します。</p>
      </div>

      {/* 記事テンプレート spec */}
      <div style={{ flex: 0.95, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '18px 22px', alignSelf: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: ACCENT_INK, fontWeight: 700 }}><Braces style={{ width: 13, height: 13 }} /> TEMPLATE.yml</span>
          <span style={{ fontFamily: MONO, fontSize: 9.5, color: MUTE }}># 編集判断=貴社</span>
        </div>
        {[
          ['source', '適時開示 / 運用会社レポート'],
          ['trigger', '第2報以降 / 割安株を検知'],
          ['style', '深掘り・自社文体（RAG）'],
          ['format', '見出し＋要点＋根拠'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 14, borderTop: `1px solid ${HAIR}`, padding: '10px 0' }}>
            <span style={{ fontFamily: MONO, fontSize: 11.5, color: ACCENT_INK, width: 60, flexShrink: 0 }}>{k}</span>
            <span style={{ fontSize: 12.5, color: GRAPHITE, fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 6 — ファクトチェックと人の承認（中核・ライトUIモック）           */
/* ===================================================================== */
const Slide6 = (
  <Frame n={6}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Head eyebrow="Solution 3-2 / 中核" title={<>ファクトチェックと、<span style={{ color: ACCENT }}>人の承認</span></>} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: '#fff', background: ACCENT, fontWeight: 700, padding: '6px 12px', borderRadius: 4, marginTop: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: '#fff' }} /> この画面が中核 — 品質担保の要
      </span>
    </div>

    <div style={{ display: 'flex', gap: 26, marginTop: 24, flex: 1 }}>
      <div style={{ flex: 1.4, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, boxShadow: '0 20px 50px rgba(15,17,21,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderBottom: `1px solid ${LINE}`, background: '#FBFBFC' }}>
          {[0, 1, 2].map((i) => <span key={i} style={{ width: 9, height: 9, borderRadius: 999, background: '#E4E6EA' }} />)}
          <span style={{ fontFamily: MONO, fontSize: 10.5, color: MUTE, marginLeft: 10 }}>review / draft #1042 — 割安株フック 第2報</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', flex: 1 }}>
          <div style={{ padding: '14px 14px', borderRight: `1px solid ${HAIR}` }}>
            <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', color: ACCENT_INK, fontWeight: 700, marginBottom: 12 }}>AIドラフト</p>
            <div style={{ height: 8, background: '#EEF0F3', borderRadius: 3, marginBottom: 8, width: '92%' }} />
            <div style={{ height: 8, background: '#EEF0F3', borderRadius: 3, marginBottom: 12, width: '70%' }} />
            {[95, 100, 78, 100, 62].map((w, i) => <div key={i} style={{ height: 6, background: '#F1F2F5', borderRadius: 3, marginBottom: 8, width: `${w}%` }} />)}
          </div>
          <div style={{ padding: '14px 14px', borderRight: `1px solid ${HAIR}` }}>
            <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', color: SIGNAL, fontWeight: 700, marginBottom: 12 }}>AIの指摘</p>
            {[['数値の整合性', '前期比 +12% → 要確認'], ['表記揺れ', '「割安株」に統一']].map(([a, b]) => (
              <div key={a} style={{ borderLeft: `2px solid ${SIGNAL}`, paddingLeft: 9, marginBottom: 12 }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: INK }}>{a}</p>
                <p style={{ fontSize: 10, color: GRAPHITE, marginTop: 3, lineHeight: 1.5 }}>{b}</p>
              </div>
            ))}
            <span style={{ fontFamily: MONO, fontSize: 9, color: SIGNAL, fontWeight: 700 }}>2 flags</span>
          </div>
          <div style={{ padding: '14px 14px' }}>
            <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', color: MUTE, fontWeight: 700, marginBottom: 12 }}>根拠データ</p>
            {[['売上高', '1,204'], ['営業益', '186'], ['PER', '9.2x'], ['出典', '適時開示']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${HAIR}`, padding: '7px 0' }}>
                <span style={{ fontSize: 10.5, color: MUTE }}>{k}</span>
                <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 700, color: INK }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '12px 16px', borderTop: `1px solid ${LINE}`, background: '#FBFBFC' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#fff', background: ACCENT, borderRadius: 4, padding: '8px 16px' }}><Check style={{ width: 14, height: 14 }} /> 承認</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: GRAPHITE, border: `1px solid ${LINE}`, borderRadius: 4, padding: '8px 14px' }}><CornerDownLeft style={{ width: 13, height: 13 }} /> 差し戻し</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: GRAPHITE, border: `1px solid ${LINE}`, borderRadius: 4, padding: '8px 14px' }}><Pencil style={{ width: 13, height: 13 }} /> 手動修正</span>
        </div>
      </div>

      <div style={{ flex: 0.82, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {[
          { icon: ShieldCheck, t: 'AIが一次チェック', d: '数値・表記・違和感を検知し「要確認」。' },
          { icon: Layers, t: '3画面を横並び', d: 'ドラフト／指摘／根拠を並べて即判断。' },
          { icon: TrendingUp, t: '差し戻し理由が蓄積', d: '精度が継続的に向上。' },
        ].map((r) => (
          <div key={r.t} style={{ borderTop: `1px solid ${LINE}`, padding: '14px 0', display: 'flex', gap: 13 }}>
            <Tile icon={r.icon} size={40} />
            <div>
              <h3 style={{ fontSize: 14.5, fontWeight: 800, color: INK }}>{r.t}</h3>
              <p style={{ fontSize: 11.5, color: MUTE, lineHeight: 1.65, marginTop: 5, fontWeight: 500 }}>{r.d}</p>
            </div>
          </div>
        ))}
        <div style={{ borderLeft: `3px solid ${ACCENT}`, background: CARD, border: `1px solid ${LINE}`, borderLeftWidth: 3, borderLeftColor: ACCENT, borderRadius: 4, padding: '14px 16px' }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: INK, lineHeight: 1.7 }}>人の判断を<span style={{ color: ACCENT }}>速く・正確に</span>する道具です。</p>
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 7 — 使い方フロー（ユーザー操作の全体像）                         */
/* ===================================================================== */
const flowSteps = [
  { n: '1', icon: Bell, t: '起票', d: '指示 or 開示検知', actor: '人 / 検知', kind: 'human' },
  { n: '2', icon: Bot, t: 'ドラフト生成', d: '記事テンプレ＋RAG', actor: 'AI', kind: 'ai' },
  { n: '3', icon: ShieldCheck, t: '一次チェック', d: '数値・表記を指摘', actor: 'AI', kind: 'ai' },
  { n: '4', icon: Eye, t: 'レビュー', d: '3画面で確認', actor: '人', kind: 'human' },
  { n: '5', icon: UserCheck, t: '承認 / 差戻し', d: '承認 or 修正指示', actor: '人', kind: 'human' },
  { n: '6', icon: Send, t: '公開', d: 'CMSへ配信', actor: 'システム', kind: 'sys' },
];
const SYS_C = '#8A8F99';
const actorColor = (k: string) => (k === 'ai' ? ACCENT : k === 'sys' ? SYS_C : INK);
const SlideFlow = (
  <Frame n={7}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Head eyebrow="Solution 3-3 / 使い方フロー" title={<>編集者は<span style={{ color: ACCENT }}>「確認と承認」</span>だけ。日々の操作フロー</>} />
      <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
        {[['人', INK], ['AI', ACCENT], ['システム', SYS_C]].map(([t, c]) => (
          <span key={t as string} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: GRAPHITE }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: c as string }} /> {t}
          </span>
        ))}
      </div>
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ position: 'absolute', top: 32, left: 30, right: 30, height: 1.5, background: LINE }} />
        {flowSteps.map((s, i, arr) => {
          const Icon = s.icon; const c = actorColor(s.kind); const on = s.kind === 'ai';
          return (
            <div key={s.n} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ position: 'relative', width: 64, height: 64, borderRadius: 16, background: on ? ACCENT_SOFT : CARD, border: `1.5px solid ${on ? ACCENT : LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon style={{ width: 26, height: 26, color: c, strokeWidth: 1.7 }} />
                <span style={{ position: 'absolute', top: -8, left: -8, fontFamily: MONO, fontSize: 10, fontWeight: 700, color: '#fff', background: c, borderRadius: 999, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.n}</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 800, color: INK, marginTop: 12 }}>{s.t}</p>
              <p style={{ fontSize: 11, color: MUTE, fontWeight: 600, marginTop: 4, textAlign: 'center' }}>{s.d}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, fontFamily: MONO, fontSize: 9, fontWeight: 700, color: c }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: c }} /> {s.actor}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 26, color: ACCENT_INK }}>
        <Repeat style={{ width: 15, height: 15 }} />
        <span style={{ fontSize: 12, fontWeight: 700 }}>差し戻しの理由は学習データへ蓄積 → 次回の生成・チェックに反映（P12）</span>
      </div>
    </div>

    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ flex: 1, borderLeft: `3px solid ${ACCENT}`, background: CARD, border: `1px solid ${LINE}`, borderLeftWidth: 3, borderLeftColor: ACCENT, borderRadius: 4, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <MousePointerClick style={{ width: 18, height: 18, color: ACCENT, flexShrink: 0 }} />
        <p style={{ fontSize: 12.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.6 }}>編集者が触るのは主に <strong style={{ color: INK }}>④レビュー・⑤承認</strong>。収集〜生成〜公開は自動。</p>
      </div>
      <div style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 4, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Bell style={{ width: 18, height: 18, color: SYS_C, flexShrink: 0 }} />
        <p style={{ fontSize: 12.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.6 }}>起票のきっかけは <strong style={{ color: INK }}>①指示 ②開示検知 ③定期実行</strong>。</p>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 8 — 画面一覧（必要な画面）＋ワイヤーフレーム                     */
/* ===================================================================== */
function Wire({ kind, on = false }: { kind: string; on?: boolean }) {
  const bg = on ? '#F3F2FF' : '#FAFBFC';
  const bar = on ? '#C9C7FF' : '#E1E3E8';
  const bar2 = on ? '#B7B5FF' : '#D3D6DC';
  const R = (w: any, h: number, c = bar, extra: any = {}) => <div style={{ width: w, height: h, background: c, borderRadius: 2, ...extra }} />;
  let inner: React.ReactNode = null;
  if (kind === 'dashboard') inner = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {R('40%', 6, bar2)}
      {[0, 1, 2].map((i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{R(10, 10)}{R('70%', 6)}{R(14, 6, bar2, { marginLeft: 'auto' })}</div>)}
    </div>
  );
  else if (kind === 'recipe') inner = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{R(24, 6, bar2)}{R('100%', 9)}</div>)}
    </div>
  );
  else if (kind === 'review') inner = (
    <div style={{ display: 'flex', gap: 6, height: '100%' }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ flex: 1, background: i === 1 ? bar2 : bar, borderRadius: 3, opacity: i === 1 ? 1 : 0.8 }} />)}
    </div>
  );
  else if (kind === 'edit') inner = (
    <div style={{ display: 'flex', gap: 8, height: '100%' }}>
      <div style={{ flex: 1.8, background: bar, borderRadius: 3 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>{[0, 1, 2].map((i) => R('100%', 6))}</div>
    </div>
  );
  else if (kind === 'publish') inner = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: '100%' }}>
      <div style={{ flex: 1, height: '80%', background: bar, borderRadius: 3 }} />
      <ArrowRight style={{ width: 14, height: 14, color: bar2, flexShrink: 0 }} />
      <div style={{ flex: 1, height: '60%', background: bar2, borderRadius: 3 }} />
    </div>
  );
  else inner = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{R('64%', 6)}<div style={{ width: 16, height: 9, borderRadius: 999, background: bar2, marginLeft: 'auto', position: 'relative' }}><div style={{ position: 'absolute', top: 1, right: 1, width: 7, height: 7, borderRadius: 999, background: '#fff' }} /></div></div>)}
    </div>
  );
  return <div style={{ height: 78, background: bg, border: `1px solid ${on ? ACCENT : LINE}`, borderRadius: 8, padding: 12, boxSizing: 'border-box' }}>{inner}</div>;
}
const screens = [
  { icon: LayoutDashboard, kind: 'dashboard', name: 'ダッシュボード', d: '記事キュー・進捗を一覧管理', tag: '一覧' },
  { icon: Sliders, kind: 'recipe', name: 'テンプレート管理', d: 'ソース・記事化条件・構成を登録', tag: '設定' },
  { icon: Eye, kind: 'review', name: 'レビュー画面', d: 'ドラフト／指摘／根拠で承認', tag: '★ 中核', core: true },
  { icon: Pencil, kind: 'edit', name: '記事編集', d: '手動修正・プレビュー', tag: '編集' },
  { icon: Send, kind: 'publish', name: '公開・CMS連携', d: '配信・PDF出力', tag: '出力' },
  { icon: History, kind: 'history', name: '履歴・設定', d: '差戻し履歴・改善設定・権限', tag: '管理' },
];
const SlideScreens = (
  <Frame n={8}>
    <Head eyebrow="Solution 3-4 / 画面一覧" title={<>編集者が使う画面は<span style={{ color: ACCENT }}>6つ</span>。中心はレビュー画面</>} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 24, flex: 1, alignContent: 'center' }}>
      {screens.map((s) => (
        <div key={s.name} style={{ background: CARD, border: `1.5px solid ${s.core ? ACCENT : LINE}`, borderRadius: 10, padding: '16px 16px' }}>
          <Wire kind={s.kind} on={s.core} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
            <s.icon style={{ width: 18, height: 18, color: s.core ? ACCENT_INK : INK, strokeWidth: 1.7 }} />
            <h3 style={{ fontSize: 15, fontWeight: 800, color: INK, flex: 1 }}>{s.name}</h3>
            <span style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em', color: s.core ? '#fff' : MUTE, background: s.core ? ACCENT : '#F1F2F5', border: s.core ? 'none' : `1px solid ${LINE}`, borderRadius: 3, padding: '3px 7px' }}>{s.tag}</span>
          </div>
          <p style={{ fontSize: 12, color: MUTE, fontWeight: 500, lineHeight: 1.6, marginTop: 8 }}>{s.d}</p>
        </div>
      ))}
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 9 — 機能一覧（必要な機能）＋スコープ                             */
/* ===================================================================== */
const pipe5 = [
  { icon: Search, name: '収集', items: [['ソース管理', 1], ['スケジュール実行', 1], ['既存RPA連携', 1], ['S3蓄積', 1]] },
  { icon: PenLine, name: '生成', items: [['ドラフト生成', 1], ['テンプレート管理', 1], ['RAG参照', 2]] },
  { icon: ShieldCheck, name: 'チェック', items: [['数値整合', 1], ['表記統一', 1], ['指摘提示', 1], ['違和感検知', 2]] },
  { icon: UserCheck, name: '承認', items: [['レビューUI', 1], ['承認・差戻し', 1], ['手動修正', 1], ['履歴', 2]] },
  { icon: Send, name: '公開', items: [['CMS連携', 2], ['PDF出力', 1]] },
];
const crosscut = { icon: Sliders, name: '学習・管理', items: [['差戻し蓄積', 1], ['Few-shot反映', 2], ['権限', 1], ['ログ', 1]] };
function ScopeTag({ s }: { s: number }) {
  const on = s === 1;
  return <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 700, color: on ? '#fff' : ACCENT_INK, background: on ? ACCENT : 'transparent', border: `1px solid ${ACCENT}`, borderRadius: 3, padding: '1.5px 4px', flexShrink: 0, lineHeight: 1 }}>{on ? 'MVP' : 'P2'}</span>;
}
const SlideFeatures = (
  <Frame n={9}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Head eyebrow="Solution 3-5 / 機能一覧" title={<><span style={{ color: ACCENT }}>パイプライン</span>に沿った機能と着手スコープ</>} />
      <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: GRAPHITE }}><ScopeTag s={1} /> まず着手</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: GRAPHITE }}><ScopeTag s={2} /> 品質強化</span>
      </div>
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* パイプライン見出し（番号＋矢印） */}
      <div style={{ position: 'relative', display: 'flex' }}>
        <div style={{ position: 'absolute', top: 23, left: '10%', right: '10%', height: 1.5, background: LINE }} />
        {[20, 40, 60, 80].map((p) => (
          <span key={p} style={{ position: 'absolute', top: 23, left: `${p}%`, transform: 'translate(-50%,-50%)', background: PAPER, padding: '2px 3px', zIndex: 1, lineHeight: 0 }}>
            <ArrowRight style={{ width: 15, height: 15, color: FAINT }} />
          </span>
        ))}
        {pipe5.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: CARD, border: `1.5px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon style={{ width: 20, height: 20, color: INK, strokeWidth: 1.7 }} />
              </div>
              <p style={{ fontSize: 13.5, fontWeight: 800, color: INK, marginTop: 10 }}>
                <span style={{ color: ACCENT_INK }}>{i + 1}.</span> {s.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* 各段の機能（上ぞろえ・列区切り） */}
      <div style={{ display: 'flex', marginTop: 22 }}>
        {pipe5.map((s, i) => (
          <div key={s.name} style={{ flex: 1, padding: '0 16px', borderLeft: i ? `1px solid ${HAIR}` : 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
            {s.items.map(([t, sc]) => (
              <div key={t as string} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ScopeTag s={sc as number} />
                <span style={{ fontSize: 12, color: GRAPHITE, fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 横断機能（パイプライン全体を支える） */}
      <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 20, background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, padding: '14px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, paddingRight: 20, borderRight: `1px solid ${LINE}` }}>
          <Tile icon={crosscut.icon} size={40} />
          <div>
            <p style={{ fontSize: 13.5, fontWeight: 800, color: INK }}>{crosscut.name}</p>
            <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', color: MUTE, marginTop: 3 }}>全工程を支える</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap' }}>
          {crosscut.items.map(([t, sc]) => (
            <span key={t as string} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <ScopeTag s={sc as number} />
              <span style={{ fontSize: 12.5, color: GRAPHITE, fontWeight: 600 }}>{t}</span>
            </span>
          ))}
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
      <span style={{ width: 24, height: 2, background: ACCENT }} />
      <p style={{ fontSize: 13, fontWeight: 700, color: INK }}>まず <span style={{ color: ACCENT }}>MVP</span> で一気通貫を動かし、<span style={{ color: ACCENT }}>Phase 2</span> で品質機能を拡張します。</p>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 10 — システム構成（AWS / Bedrock）                               */
/* ===================================================================== */
const archLayers = [
  {
    tag: '取り込み', note: 'システムで自動', boxes: [
      { name: '外部ソース', svc: '適時開示 / レポート', icon: Newspaper, ext: true },
      { name: '収集', svc: 'Lambda / 既存RPA', icon: Cloud },
      { name: '蓄積', svc: 'S3 データレイク', icon: Database },
    ],
  },
  {
    tag: 'AI処理', note: 'Amazon Bedrock', boxes: [
      { name: '記事生成', svc: 'Bedrock', icon: Bot, ai: true },
      { name: 'ファクトチェック', svc: 'Bedrock', icon: ShieldCheck, ai: true },
    ],
  },
  {
    tag: '承認・公開', note: '人 ＋ システム', boxes: [
      { name: '人の承認', svc: 'レビューUI', icon: UserCheck },
      { name: '公開', svc: 'CMS 連携', icon: Send },
    ],
  },
];
function ArchBox({ b }: { b: any }) {
  const ai = b.ai;
  const Icon = b.icon;
  return (
    <div style={{ position: 'relative', background: ai ? ACCENT_SOFT : b.ext ? '#F1F2F5' : CARD, border: `1.5px ${b.ext ? 'dashed' : 'solid'} ${ai ? ACCENT : b.ext ? FAINT : LINE}`, borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 11 }}>
      <Icon style={{ width: 20, height: 20, color: ai ? ACCENT_INK : b.ext ? MUTE : INK, strokeWidth: 1.7, flexShrink: 0 }} />
      <div>
        <p style={{ fontSize: 13, fontWeight: 800, color: ai ? ACCENT_INK : INK, whiteSpace: 'nowrap' }}>{b.name}</p>
        <p style={{ fontFamily: MONO, fontSize: 9, color: MUTE, marginTop: 2, whiteSpace: 'nowrap' }}>{b.svc}</p>
      </div>
      {ai && <span style={{ position: 'absolute', top: -8, right: -8, fontFamily: MONO, fontSize: 8.5, fontWeight: 700, color: '#fff', background: ACCENT, borderRadius: 999, padding: '2px 6px' }}>AI</span>}
    </div>
  );
}
const Slide7 = (
  <Frame n={10}>
    <Head eyebrow="Solution 3-6 / システム構成" title={<>全面<span style={{ color: ACCENT }}>AWS</span>上に構築。AIは<span style={{ color: ACCENT }}>Bedrock</span>だけ</>} />

    {/* AWS 構成図（層構造） */}
    <div style={{ position: 'relative', marginTop: 26, border: `1.5px solid ${LINE}`, borderRadius: 14, padding: '24px 26px 20px', background: 'rgba(255,255,255,0.45)' }}>
      <span style={{ position: 'absolute', top: -9, left: 22, background: PAPER, padding: '0 8px', fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', color: MUTE, fontWeight: 700 }}>AWS CLOUD</span>
      {archLayers.map((L, li) => (
        <div key={L.tag}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 96, flexShrink: 0 }}>
              <p style={{ fontSize: 12.5, fontWeight: 800, color: INK }}>{L.tag}</p>
              <p style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '0.04em', color: MUTE, marginTop: 3 }}>{L.note}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              {L.boxes.map((b, bi) => (
                <div key={b.name} style={{ display: 'flex', alignItems: 'center' }}>
                  <ArchBox b={b} />
                  {bi < L.boxes.length - 1 && <ArrowRight style={{ width: 18, height: 18, color: FAINT, margin: '0 10px', flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </div>
          {li < archLayers.length - 1 && (
            <div style={{ paddingLeft: 130, margin: '7px 0' }}>
              <ArrowDown style={{ width: 18, height: 18, color: FAINT }} />
            </div>
          )}
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', marginTop: 22, flex: 1 }}>
      <div style={{ flex: 1, paddingRight: 44, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', color: '#fff', background: ACCENT, fontWeight: 700, padding: '3px 8px', borderRadius: 3 }}>AI</span>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: INK }}>Bedrock が担う</h3>
        </div>
        {['記事生成', 'ファクトチェック', 'コピーガードPDF・画面価格を“画像として読む”'].map((t) => (
          <div key={t} style={{ display: 'flex', gap: 11, borderTop: `1px solid ${HAIR}`, padding: '11px 0' }}>
            <Plus style={{ width: 15, height: 15, color: ACCENT, flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 13, color: GRAPHITE, fontWeight: 600, lineHeight: 1.6 }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ width: 1, background: LINE }} />
      <div style={{ flex: 1, paddingLeft: 44, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', color: MUTE, border: `1px solid ${LINE}`, fontWeight: 700, padding: '3px 8px', borderRadius: 3 }}>SYS</span>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: INK }}>システムだけでできる</h3>
        </div>
        {['普通のPDF / HTML の読み取り', '情報の収集・蓄積', 'PDFレポートの出力'].map((t) => (
          <div key={t} style={{ display: 'flex', gap: 11, borderTop: `1px solid ${HAIR}`, padding: '11px 0' }}>
            <Check style={{ width: 15, height: 15, color: MUTE, flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 13, color: GRAPHITE, fontWeight: 600, lineHeight: 1.6 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>

    <p style={{ fontSize: 13, fontWeight: 700, color: INK, textAlign: 'center', marginTop: 6 }}>
      “意味を読む・文章を書く” 所にだけAIを使う、<span style={{ color: ACCENT }}>現実的な設計</span>です。
    </p>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 8 — 品質担保：3つのゲート図＋残る誤りの減衰                       */
/* ===================================================================== */
const Slide8 = (
  <Frame n={11}>
    <Head eyebrow="Quality 4-1 / 品質担保の考え方" title={<><span style={{ color: ACCENT }}>三層</span>のゲートで品質を担保</>} />

    <div style={{ borderLeft: `3px solid ${INK}`, paddingLeft: 16, margin: '22px 0 4px' }}>
      <p style={{ fontSize: 14.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.7 }}>
        AIに<strong style={{ color: INK }}>100%の保証はない</strong>前提を率直に共有。だからこそ三層で守ります。
      </p>
    </div>

    {/* 3ゲート図 */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[
          { icon: PenLine, no: '①', t: '一次生成の精度', d: '記事テンプレ＋RAGで高精度ドラフト', on: false },
          { icon: ShieldCheck, no: '②', t: 'AIが指摘', d: '誤りやすい箇所を自動検知', on: false },
          { icon: UserCheck, no: '③', t: '人が最終承認', d: '公開前に必ず人が判断', on: true },
        ].map((s, i, arr) => (
          <div key={s.no} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, background: CARD, border: `1.5px solid ${s.on ? ACCENT : LINE}`, borderRadius: 12, padding: '22px 20px', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: 56, height: 56, margin: '0 auto 14px' }}>
                <Tile icon={s.icon} on={s.on} size={56} />
              </div>
              <p style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: s.on ? ACCENT_INK : FAINT, marginBottom: 6 }}>{s.no}</p>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 8 }}>{s.t}</h3>
              <p style={{ fontSize: 12, color: MUTE, lineHeight: 1.6, fontWeight: 500 }}>{s.d}</p>
            </div>
            {i < arr.length - 1 && (
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 6px' }}>
                <ArrowRight style={{ width: 22, height: 22, color: FAINT }} />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* 残る誤りの減衰 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 22, padding: '0 4px' }}>
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: MUTE, fontWeight: 700, width: 74, flexShrink: 0 }}>残る誤り</span>
        {[100, 45, 12].map((v, i, arr) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 10, background: HAIR, borderRadius: 5 }}>
              <div style={{ width: `${v}%`, height: '100%', background: i === 2 ? POSITIVE : NEUTRAL, borderRadius: 5 }} />
            </div>
            {i < arr.length - 1 && <ArrowRight style={{ width: 14, height: 14, color: FAINT, flexShrink: 0 }} />}
          </div>
        ))}
        <span style={{ fontSize: 12, fontWeight: 800, color: POSITIVE, flexShrink: 0 }}>ほぼゼロへ</span>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: INK }}>品質最優先のご意向に、責任ある形で応えます。</p>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11, color: ACCENT_INK, fontWeight: 700 }}>使うほど賢くなる <ArrowRight style={{ width: 14, height: 14 }} /> P12</span>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 9 — AIが育つ仕組み：円環ループ ＋ 精度グラフ                     */
/* ===================================================================== */
const loopNodes = [
  { n: '1', icon: Bot, label: 'AIが下書き＋指摘', pos: { top: 0, left: '50%', tx: '-50%', ty: '0' }, lbl: { top: -30, left: '50%', tx: '-50%', ta: 'center' } },
  { n: '2', icon: UserCheck, label: '人がチェック', pos: { top: '50%', left: '100%', tx: '-100%', ty: '-50%' }, lbl: { top: '50%', left: 'calc(100% + 12px)', tx: '0', ty: '-50%', ta: 'left' } },
  { n: '3', icon: Database, label: '学習データ蓄積', pos: { top: '100%', left: '50%', tx: '-50%', ty: '-100%' }, lbl: { top: 'calc(100% + 8px)', left: '50%', tx: '-50%', ta: 'center' } },
  { n: '4', icon: RefreshCw, label: '次に反映', pos: { top: '50%', left: 0, tx: '0', ty: '-50%' }, lbl: { top: '50%', left: -12, tx: '-100%', ty: '-50%', ta: 'right' } },
];
const Slide9 = (
  <Frame n={12}>
    <Head eyebrow="Quality 4-2 / AIが育つ仕組み" title={<>使うほど、御社らしく・正確に。<span style={{ color: ACCENT }}>段階的に</span></>} />

    <div style={{ display: 'flex', gap: 40, marginTop: 20, flex: 1 }}>
      {/* 円環ループ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', color: MUTE, alignSelf: 'flex-start' }}>IMPROVEMENT LOOP</p>
        <div style={{ position: 'relative', width: 230, height: 230, marginTop: 10 }}>
          <div style={{ position: 'absolute', inset: 26, borderRadius: 999, border: `2px dashed ${FAINT}` }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <RefreshCw style={{ width: 30, height: 30, color: ACCENT, strokeWidth: 1.7, margin: '0 auto' }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: ACCENT_INK, marginTop: 6 }}>精度 ↑</p>
          </div>
          {loopNodes.map((nd) => {
            const Icon = nd.icon;
            return (
              <div key={nd.n}>
                <div style={{ position: 'absolute', top: nd.pos.top as any, left: nd.pos.left as any, transform: `translate(${nd.pos.tx}, ${nd.pos.ty})`, width: 46, height: 46, borderRadius: 999, background: CARD, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  <Icon style={{ width: 20, height: 20, color: ACCENT_INK, strokeWidth: 1.7 }} />
                  <span style={{ position: 'absolute', top: -6, right: -6, fontFamily: MONO, fontSize: 9, fontWeight: 700, color: '#fff', background: ACCENT, borderRadius: 999, width: 15, height: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{nd.n}</span>
                </div>
                <span style={{ position: 'absolute', top: nd.lbl.top as any, left: nd.lbl.left as any, transform: `translate(${nd.lbl.tx || '0'}, ${nd.lbl.ty || '0'})`, textAlign: nd.lbl.ta as any, fontSize: 11.5, fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>{nd.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 精度グラフ ＋ 2段階 */}
      <div style={{ flex: 1.05, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', color: MUTE, marginBottom: 6 }}>ACCURACY / 精度の推移（イメージ）</p>
        <AccuracyChart />
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <div style={{ flex: 1, borderLeft: `3px solid ${ACCENT}`, background: CARD, border: `1px solid ${LINE}`, borderLeftWidth: 3, borderLeftColor: ACCENT, borderRadius: 4, padding: '12px 14px' }}>
            <p style={{ fontFamily: MONO, fontSize: 9.5, color: ACCENT_INK, fontWeight: 700, marginBottom: 6 }}>STAGE 1 / MVP</p>
            <p style={{ fontSize: 11.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.6 }}>蓄積を “チェック観点／お手本” に反映し着実に向上。</p>
          </div>
          <div style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 4, padding: '12px 14px' }}>
            <p style={{ fontFamily: MONO, fontSize: 9.5, color: MUTE, fontWeight: 700, marginBottom: 6 }}>STAGE 2 / 将来</p>
            <p style={{ fontSize: 11.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.6 }}>データ充足後に本格的なモデル最適化を検討。</p>
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 10 — 強み・開発実績（カテゴリアイコン）                          */
/* ===================================================================== */
const works = [
  { icon: Coins, t: '複数EC 在庫一括管理 ＋ AI価格提案', tag: 'E-COMMERCE' },
  { icon: Bot, t: '電気事業者向け コールセンター支援', tag: 'CALL CENTER' },
  { icon: ClipboardCheck, t: '書類チェックAI', tag: 'DOCUMENT' },
  { icon: ScanText, t: '自治体PDFをAIでクローリング → 案件抽出', tag: 'PUBLIC / OCR' },
  { icon: FileText, t: '自社でAI資料自動生成システムを内製・運用', tag: 'INTERNAL' },
];
const Slide10 = (
  <Frame n={13}>
    <Ghost>13</Ghost>
    <Head eyebrow="Strengths / 私たちの強み・開発実績" title={<><span style={{ color: ACCENT }}>AI開発</span>を多数、いずれも<span style={{ color: ACCENT }}>短期</span>で納品</>} />

    <div style={{ display: 'flex', gap: 44, marginTop: 24, flex: 1 }}>
      <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.18em', color: MUTE, marginBottom: 10 }}>SELECTED WORKS</p>
        {works.map((r) => (
          <div key={r.t} style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: `1px solid ${LINE}`, padding: '14px 0' }}>
            <Tile icon={r.icon} size={44} />
            <span style={{ fontSize: 14.5, fontWeight: 700, color: INK, flex: 1 }}>{r.t}</span>
            <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', color: ACCENT_INK }}>{r.tag}</span>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${LINE}` }} />
      </div>

      <div style={{ flex: 0.85, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
        <div style={{ borderLeft: `3px solid ${ACCENT}`, background: CARD, border: `1px solid ${LINE}`, borderLeftWidth: 3, borderLeftColor: ACCENT, borderRadius: 4, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
            <FileCheck2 style={{ width: 17, height: 17, color: ACCENT }} />
            <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: ACCENT_INK, fontWeight: 700 }}>DOMAIN</p>
          </div>
          <p style={{ fontSize: 13.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.75 }}><strong style={{ color: INK }}>「AIで文書を作る」</strong>領域が得意分野。自社でも内製・運用中。</p>
        </div>
        <div style={{ borderLeft: `3px solid ${ACCENT}`, background: CARD, border: `1px solid ${LINE}`, borderLeftWidth: 3, borderLeftColor: ACCENT, borderRadius: 4, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
            <Rocket style={{ width: 17, height: 17, color: ACCENT }} />
            <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: ACCENT_INK, fontWeight: 700 }}>SPEED</p>
          </div>
          <p style={{ fontSize: 13.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.75 }}>いずれも<strong style={{ color: INK }}>短期で納品</strong>。要件定義〜運用まで一括で立ち上げます。</p>
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 11 — なぜ外注が有利か：比較グラフ                                */
/* ===================================================================== */
const compare = [
  { m: '総コスト', inhouse: 100, out: 68 },
  { m: 'リードタイム', inhouse: 100, out: 42 },
  { m: '立ち上げリスク', inhouse: 90, out: 22 },
];
const Slide11 = (
  <Frame n={14}>
    <Head eyebrow="Proposal 6-1 / なぜ外注が有利か" title={<>外部に任せる方が、<span style={{ color: ACCENT }}>総コストと確実性</span>で優れる</>} />

    <div style={{ display: 'flex', gap: 44, marginTop: 26, flex: 1 }}>
      {/* 比較グラフ */}
      <div style={{ flex: 1.15, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '22px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: MUTE, fontWeight: 700 }}>相対比較（内製=100）</span>
          <div style={{ display: 'flex', gap: 16 }}>
            {[['内製', NEUTRAL], ['外注（当社）', ACCENT]].map(([t, c]) => (
              <span key={t as string} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: GRAPHITE }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: c as string }} /> {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {compare.map((r) => (
            <div key={r.m}>
              <p style={{ fontSize: 13, fontWeight: 800, color: INK, marginBottom: 8 }}>{r.m}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <Bar pct={r.inhouse} color={NEUTRAL} h={13} />
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: MUTE, width: 32, textAlign: 'right' }}>{r.inhouse}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Bar pct={r.out} color={ACCENT} h={13} />
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: ACCENT_INK, width: 32, textAlign: 'right' }}>{r.out}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 要点 */}
      <div style={{ flex: 0.85, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
        {[
          { icon: Handshake, t: '要件定義〜PMまで一括', d: '貴社の工数を最小化。' },
          { icon: Rocket, t: '実績で短期立ち上げ', d: 'AI開発の知見で確実。' },
          { icon: Target, t: '“作れるか” のリスクなし', d: '未知の技術獲得が不要。' },
        ].map((r) => (
          <div key={r.t} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
            <Tile icon={r.icon} size={44} />
            <div>
              <h3 style={{ fontSize: 14.5, fontWeight: 800, color: INK }}>{r.t}</h3>
              <p style={{ fontSize: 12, color: MUTE, fontWeight: 500, marginTop: 4 }}>{r.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
      <span style={{ width: 24, height: 2, background: ACCENT }} />
      <p style={{ fontSize: 14.5, fontWeight: 700, color: INK }}>内製の “一見安い” は、知見獲得とリードタイムを含めると<span style={{ color: ACCENT }}>逆転</span>します。</p>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 12 — 進め方とスケジュール                                        */
/* ===================================================================== */
const gantt = [
  { label: '準備', detail: '要件確定・AWS準備', start: 0, span: 2, tone: 0 },
  { label: 'MVP', detail: '収集→生成→校正→承認', start: 1, span: 3, tone: 1 },
  { label: '品質強化', detail: 'RAG・育つ仕組み・特殊PDF', start: 3, span: 3, tone: 2 },
  { label: '拡張', detail: 'ソース拡張・公開連携', start: 5, span: 3, tone: 3 },
];
const toneColor = ['#C7C6FF', ACCENT_2, ACCENT, ACCENT_INK];
const Slide12 = (
  <Frame n={15}>
    <Head eyebrow="Proposal 6-2 / 進め方とスケジュール" title={<><span style={{ color: ACCENT }}>9月末</span>までに “動く形”。まずMVP最優先</>} />

    <div style={{ marginTop: 30, position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '150px repeat(6, 1fr)', marginBottom: 10 }}>
        <span />
        {['来月 →', '', 'MVP提示', '', '', '9月末'].map((c, i) => (
          <span key={i} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textAlign: 'center', color: i === 0 ? ACCENT_INK : i === 5 ? SIGNAL : MUTE, fontWeight: i === 0 || i === 5 ? 700 : 500 }}>{c}</span>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 26, bottom: 0, left: 150, right: 0, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
        {Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ borderLeft: `1px solid ${HAIR}` }} />)}
      </div>
      <div style={{ position: 'absolute', top: 20, bottom: -4, right: 0, width: 0, borderLeft: `1.5px dashed ${SIGNAL}` }} />

      {gantt.map((g) => (
        <div key={g.label} style={{ display: 'grid', gridTemplateColumns: '150px repeat(6, 1fr)', alignItems: 'center', padding: '17px 0', position: 'relative' }}>
          <div>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: INK }}>{g.label}</span>
            <p style={{ fontFamily: MONO, fontSize: 9, color: MUTE, marginTop: 4 }}>{g.detail}</p>
          </div>
          <div style={{ gridColumn: `${g.start + 2} / span ${g.span}`, height: 34, borderRadius: 4, background: toneColor[g.tone], display: 'flex', alignItems: 'center', paddingLeft: 12 }}>
            <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 700, color: g.tone < 2 ? INK : '#fff' }}>{g.label}</span>
          </div>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 'auto', paddingTop: 20 }}>
      {[
        { icon: Rocket, h: 'スタートダッシュが速い', d: '設計方針が明確で早期に着手。' },
        { icon: Workflow, h: '画面・設計を先行', d: 'AI処理はAWS準備と並行。' },
        { icon: Calendar, h: '来月から着手', d: '9月末に “動く形” を提示。' },
      ].map((r) => (
        <div key={r.h} style={{ display: 'grid', gridTemplateColumns: '44px 250px 1fr', alignItems: 'center', gap: 16, borderTop: `1px solid ${LINE}`, padding: '13px 0' }}>
          <Tile icon={r.icon} size={40} />
          <span style={{ fontSize: 14, fontWeight: 800, color: INK }}>{r.h}</span>
          <span style={{ fontSize: 12.5, color: MUTE, fontWeight: 500 }}>{r.d}</span>
        </div>
      ))}
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 13 — 体制：ロールカード＋稼働バー                                */
/* ===================================================================== */
const team = [
  { icon: Target, role: 'プロジェクトリード / PM', task: '要件定義・進行管理・顧客窓口', strength: '要件定義〜納品を一括管理', load: 40, loadT: '兼任・軽め' },
  { icon: Cpu, role: 'AI／バックエンド', task: 'Bedrock・収集・AWS構築', strength: 'Bedrock／RAG構築の実績', load: 100, loadT: 'フル稼働' },
  { icon: Layers, role: 'フロントエンド', task: 'レビューUI・CMS連携', strength: 'レビューUI・CMS連携の実装経験', load: 75, loadT: 'フル〜中' },
];
const Slide13 = (
  <Frame n={16}>
    <Head eyebrow="Proposal 6-3 / 体制" title={<>PM＋エンジニア2名の<span style={{ color: ACCENT }}>少人数専任</span></>} />

    <div style={{ display: 'flex', marginTop: 26, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      {[[Users, '3名', 'PM＋Eng2名', 'TEAM'], [Calendar, '約2ヶ月', '着手〜納品', 'DURATION'], [ClipboardCheck, '4.5〜5', '実質 人月', 'EFFORT']].map(([Icon, v, k, en], i) => (
        <div key={en as string} style={{ flex: 1, padding: '18px 0 18px 22px', borderLeft: i === 0 ? 'none' : `1px solid ${LINE}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* @ts-ignore */}
          <Tile icon={Icon} size={44} />
          <div>
            <p style={{ fontSize: 24, fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</p>
            <p style={{ fontSize: 11.5, color: MUTE, fontWeight: 600, marginTop: 4 }}>{k}</p>
          </div>
        </div>
      ))}
    </div>

    {/* ロールカード */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 24, flex: 1 }}>
      {team.map((r) => (
        <div key={r.role} style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, padding: '22px 22px', display: 'flex', flexDirection: 'column' }}>
          <Tile icon={r.icon} size={50} />
          <h3 style={{ fontSize: 15.5, fontWeight: 800, color: INK, marginTop: 16, lineHeight: 1.4 }}>{r.role}</h3>
          <p style={{ fontSize: 12, color: GRAPHITE, fontWeight: 600, lineHeight: 1.7, marginTop: 8 }}>{r.task}</p>
          <p style={{ fontSize: 11.5, color: MUTE, lineHeight: 1.6, marginTop: 8, flex: 1 }}>{r.strength}</p>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: MONO, fontSize: 9.5, color: MUTE, fontWeight: 700 }}>稼働</span>
              <span style={{ fontFamily: MONO, fontSize: 9.5, color: ACCENT_INK, fontWeight: 700 }}>{r.loadT}</span>
            </div>
            <Bar pct={r.load} color={ACCENT} h={8} />
          </div>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: MUTE, fontWeight: 700 }}>OPTION</span>
      <p style={{ fontSize: 12.5, color: GRAPHITE, fontWeight: 600 }}>貴社エンジニアと<strong style={{ color: INK }}>協働</strong>する形もご用意できます。</p>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 14 — 概算費用：構成バー＋支払いタイムライン                      */
/* ===================================================================== */
const Slide14 = (
  <Frame n={17}>
    <Head eyebrow="Proposal 6-4 / 概算費用とお支払い" title={<>開発費 総額 <span style={{ color: ACCENT }}>850万円</span>（税別）。段階着手が可能</>} />

    <div style={{ display: 'flex', gap: 44, marginTop: 26, flex: 1 }}>
      {/* 費用構成 */}
      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', color: MUTE, marginBottom: 16 }}>ESTIMATE / 開発費の構成</p>
        {/* 積み上げバー */}
        <div style={{ display: 'flex', gap: 4, height: 128, marginBottom: 12 }}>
          <div style={{ flex: 500, background: ACCENT, borderRadius: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 18 }}>
            <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>PHASE 1 / MVP</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>500<span style={{ fontSize: 12 }}>万円</span></span>
          </div>
          <div style={{ flex: 350, background: ACCENT_2, borderRadius: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 18 }}>
            <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>PHASE 2 / 品質強化</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>350<span style={{ fontSize: 12 }}>万円</span></span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11.5, color: MUTE, fontWeight: 600 }}>収集→生成→校正→承認 一気通貫</span>
          <span style={{ fontSize: 11.5, color: MUTE, fontWeight: 600 }}>RAG・育つ仕組み・特殊PDF</span>
        </div>
        {/* 合計 */}
        <div style={{ borderTop: `2px solid ${INK}`, marginTop: 30, paddingTop: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: INK }}>開発費 合計</p>
            <p style={{ fontFamily: MONO, fontSize: 9.5, color: MUTE, marginTop: 5 }}>※Phase 1 のみの着手も可能</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            <span style={{ fontSize: 46, fontWeight: 800, color: ACCENT, letterSpacing: '-0.03em', lineHeight: 0.9 }}>850</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: INK, paddingBottom: 4 }}>万円</span>
            <span style={{ fontSize: 12, color: MUTE, paddingBottom: 6 }}>（税別）</span>
          </div>
        </div>
      </div>

      {/* 切り分け ＋ 支払い */}
      <div style={{ flex: 0.85, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30 }}>
        <div style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Wallet style={{ width: 16, height: 16, color: ACCENT }} />
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: ACCENT_INK, fontWeight: 700 }}>SCOPE</span>
          </div>
          <p style={{ fontSize: 12.5, color: GRAPHITE, lineHeight: 1.7, fontWeight: 500 }}>
            上記は<strong style={{ color: INK }}>開発費</strong>。AWS/Bedrock 利用料は<strong style={{ color: INK }}>別枠・実費</strong>（貴社課金／使った分）。
          </p>
        </div>
        <div>
          <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: MUTE, marginBottom: 10, fontWeight: 700 }}>PAYMENT / 準委任・分割</p>
          <div style={{ display: 'flex', gap: 4, height: 42, marginBottom: 8 }}>
            {[['40', '着手時'], ['30', 'MVP完成'], ['30', '完了時']].map(([v], i) => (
              <div key={i} style={{ flex: Number(v), background: [ACCENT, ACCENT_2, '#B7B5FF'][i], borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{v}%</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['着手時', 'MVP完成', '完了時'].map((k, i) => (
              <span key={k} style={{ flex: [40, 30, 30][i], fontFamily: MONO, fontSize: 9.5, color: MUTE, textAlign: 'center' }}>{k}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 15 — ご確認事項とネクストステップ                                */
/* ===================================================================== */
const Slide15 = (
  <Frame n={18}>
    <Head eyebrow="Next Step / ご確認事項とネクストステップ" title={<>一緒に詰めたい論点と、<span style={{ color: ACCENT }}>最短ルート</span></>} />

    <div style={{ display: 'flex', gap: 44, marginTop: 24, flex: 1 }}>
      <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', color: MUTE }}>CHECKLIST / 一緒に確定したい点</p>
        {[
          { icon: ListChecks, t: '収集対象ソースの具体リスト', q: 'Q4', hint: '' },
          { icon: BookOpen, t: '過去記事データの提供', q: 'Q5', hint: '文体統一（RAG）がすぐ効く' },
          { icon: TrendingUp, t: '過去の誤り・添削と受入基準', q: 'Q11', hint: 'AI改善（学習）がすぐ効く' },
          { icon: Cloud, t: 'AWS/Bedrock・連携CMS・著作権', q: '—', hint: '' },
        ].map((r) => (
          <div key={r.t} style={{ display: 'flex', gap: 14, borderTop: `1px solid ${LINE}`, padding: '13px 0', alignItems: 'center' }}>
            <Tile icon={r.icon} size={42} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: INK }}>{r.t}</span>
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: ACCENT_INK, background: ACCENT_SOFT, padding: '2px 6px', borderRadius: 3 }}>{r.q}</span>
              </div>
              {r.hint && <p style={{ fontSize: 11.5, color: ACCENT_INK, fontWeight: 600, marginTop: 4 }}>→ {r.hint}</p>}
            </div>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${LINE}` }} />
      </div>

      <div style={{ flex: 0.85, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', color: MUTE, marginBottom: 8 }}>NEXT STEP</p>
          {[
            { n: '1', icon: FileText, t: 'フィードバックを反映した詳細見積・要件整理' },
            { n: '2', icon: Check, t: '次回で、開発着手のご判断' },
          ].map((r) => (
            <div key={r.n} style={{ display: 'flex', gap: 14, alignItems: 'center', borderTop: `1px solid ${LINE}`, padding: '18px 0' }}>
              <span style={{ width: 34, height: 34, borderRadius: 999, background: ACCENT, color: '#fff', fontFamily: MONO, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.n}</span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: INK, lineHeight: 1.5 }}>{r.t}</span>
            </div>
          ))}
        </div>
        <div style={{ borderLeft: `3px solid ${ACCENT}`, background: CARD, border: `1px solid ${LINE}`, borderLeftWidth: 3, borderLeftColor: ACCENT, borderRadius: 4, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Calendar style={{ width: 15, height: 15, color: SIGNAL }} />
            <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', color: SIGNAL, fontWeight: 700 }}>DEADLINE — 9月末</p>
          </div>
          <p style={{ fontSize: 13, color: GRAPHITE, fontWeight: 600, lineHeight: 1.75 }}>
            来月着手 → 9月末に “動く形”。まずは<strong style={{ color: INK }}>Phase 1（MVP）</strong>から。
          </p>
        </div>
      </div>
    </div>
  </Frame>
);

export const wealthadvisorPresentation: PresentationEntry = {
  meta: {
    id: 'wealthadvisor-ai-2026',
    title: '投資信託レポート／ニュース記事 AI自動生成システム ご提案',
    description:
      'ウェルスアドバイザー社向け。情報収集から記事生成・校正までをAIで自動化し、品質は人が担保する仕組みのご提案（全18枚）。AK+アライアンスパートナーとして提案。',
    thumbnail: `linear-gradient(135deg, ${PAPER} 0%, ${ACCENT_SOFT} 55%, ${ACCENT} 130%)`,
    author: 'Meece株式会社',
    createdAt: '2026-07-25',
  },
  slides: [
    Slide1,       // 1  表紙
    Slide2,       // 2  目次
    Slide3,       // 3  課題（As-Is）
    Slide4,       // 4  To-Be
    Slide5,       // 5  3-1 情報収集と記事生成
    Slide6,       // 6  3-2 ファクトチェックと人の承認（中核）
    SlideFlow,    // 7  3-3 使い方フロー
    SlideScreens, // 8  3-4 画面一覧
    SlideFeatures,// 9  3-5 機能一覧
    Slide7,       // 10 3-6 システム構成
    Slide8,       // 11 4-1 品質担保
    Slide9,       // 12 4-2 AIが育つ仕組み
    Slide10,      // 13 5 実績
    Slide11,      // 14 6-1 なぜ外注
    Slide12,      // 15 6-2 スケジュール
    Slide13,      // 16 6-3 体制
    Slide14,      // 17 6-4 費用
    Slide15,      // 18 7 確認事項
  ],
};
