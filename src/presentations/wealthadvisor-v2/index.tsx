import {
  Search,
  PenLine,
  ShieldCheck,
  UserCheck,
  Send,
  Users,
  Star,
  Menu,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Repeat,
  Eye,
  User,
  Database,
  ScanText,
  TrendingUp,
  Plus,
  Code2,
  LayoutDashboard,
} from 'lucide-react';
import type { PresentationEntry } from '../registry';

/* ============================================================
   ウェルスアドバイザー社 ご提案
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
const SIGNAL = '#FF4A24';
const NEUTRAL_BAR = '#B4B8C1';

const MONO = "'SF Mono', ui-monospace, 'Menlo', 'Roboto Mono', monospace";
const SANS = "-apple-system, 'Helvetica Neue', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

const SLIDE = 'w-full h-[720px] relative overflow-hidden';
const DECK_TAG = '投信レポート AI自動生成システム ご提案';
const TOTAL = 10;

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

/* 列見出し：タグ ＋ 見出し ＋ 右端ステータス（罫線で締める） */
function ColHead({ tag, title, status, statusColor = MUTE, tagOn = false, mb = 15 }: { tag: string; title: string; status?: string; statusColor?: string; tagOn?: boolean; mb?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${LINE}`, paddingBottom: 9, marginBottom: mb }}>
      <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 700, borderRadius: 3, padding: '3px 8px', color: tagOn ? '#fff' : MUTE, background: tagOn ? ACCENT : '#EAEBEE' }}>{tag}</span>
      <span style={{ fontSize: 14.5, fontWeight: 800, color: INK, flex: 1 }}>{title}</span>
      {status && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', color: statusColor, fontWeight: 700 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: statusColor }} />
          {status}
        </span>
      )}
    </div>
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

/* ===================================================================== */
/* SLIDE 1 — 表紙                                                         */
/* ===================================================================== */
const Slide1 = (
  <div key="s1" className={SLIDE} style={{ background: PAPER, fontFamily: SANS }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 92% 4%, rgba(59,55,255,0.07), transparent 46%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 2% 96%, rgba(59,55,255,0.05), transparent 44%)' }} />

    <div style={{ position: 'absolute', top: 40, left: 76, right: 76, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', zIndex: 2 }}>
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

    <div style={{ position: 'absolute', bottom: 34, left: 76, right: 76, display: 'flex', justifyContent: 'flex-end', zIndex: 2 }}>
      <p style={{ fontSize: 14, fontWeight: 800, color: INK }}>Meece株式会社</p>
    </div>
    <Rail n={1} />
  </div>
);

/* ===================================================================== */
/* SLIDE 2 — 概要（As-Is：人手のレポート作成 → To-Be：AIで自動化）        */
/* ===================================================================== */

/* 現在のレポート＝記事ページのブラウザモック */
function ArticleMock() {
  const bodyLines = [98, 100, 94, 100, 88];
  return (
    <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, boxShadow: '0 18px 44px rgba(15,17,21,0.07)', overflow: 'hidden' }}>
      {/* ブラウザクローム */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 14px', borderBottom: `1px solid ${HAIR}`, background: '#FBFBFC' }}>
        {[0, 1, 2].map((i) => <span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: '#E4E6EA' }} />)}
        <span style={{ fontFamily: MONO, fontSize: 9.5, color: FAINT, marginLeft: 8 }}>wealthadvisor.co.jp / fundnews</span>
      </div>

      {/* サイトヘッダー */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: `1px solid ${HAIR}` }}>
        <Star style={{ width: 13, height: 13, color: ACCENT_INK, fill: ACCENT_INK, flexShrink: 0 }} />
        <span style={{ fontSize: 10.5, fontWeight: 800, color: INK, letterSpacing: '0.06em' }}>WEALTH ADVISOR</span>
        <span style={{ flex: 1, height: 15, borderRadius: 999, border: `1px solid ${HAIR}`, marginLeft: 6 }} />
        <Menu style={{ width: 13, height: 13, color: FAINT, flexShrink: 0 }} />
      </div>

      {/* 記事本体 */}
      <div style={{ padding: '14px 16px 16px' }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: INK, lineHeight: 1.55 }}>
          国内長期金利回り年３％時代が接近、日本国債ファンドが
          <br />
          ＮＩＳＡ利用者を爆発的に拡大させる可能性
        </p>
        <p style={{ fontFamily: MONO, fontSize: 8.5, color: FAINT, marginTop: 7 }}>公開日時：2026/07/16 15:30</p>

        {/* 記事画像 */}
        <div style={{ height: 82, background: '#F1F2F5', borderRadius: 4, marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: '#D8DAE0', letterSpacing: '0.04em' }}>¥</span>
        </div>

        {/* 本文（ダミー行） */}
        <div style={{ marginTop: 12 }}>
          {bodyLines.map((w, i) => (
            <div key={i} style={{ height: 5, background: '#EDEFF2', borderRadius: 3, marginBottom: 7, width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* AIボックス内のステップ */
const aiSteps = [
  { icon: Search, t: '情報を収集' },
  { icon: PenLine, t: 'レポートを作成' },
  { icon: ShieldCheck, t: 'チェック' },
];

const Slide2 = (
  <Frame n={2}>
    <Head
      eyebrow="Overview / 概要"
      title={<>いま<span style={{ color: ACCENT }}>人の手</span>で作っているレポートを、AIで自動化したい</>}
    />

    {/* 見出し行と本文行をグリッドで揃える（左右の列見出しが必ず同じ高さに乗る） */}
    <div style={{ display: 'grid', gridTemplateColumns: '1.02fr 84px 1.08fr', gridTemplateRows: 'auto auto', alignContent: 'center', columnGap: 0, marginTop: 20, flex: 1 }}>
      {/* --- 見出し行 --- */}
      <ColHead tag="AS-IS" title="現在のレポート" status="ALL MANUAL" statusColor={SIGNAL} />
      <span />
      <ColHead tag="TO-BE" title="AIによる自動生成" status="AUTOMATED" statusColor={ACCENT_INK} tagOn />

      {/* --- 本文行：LEFT 現在のレポート --- */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 記事モック（背面に重ね紙） */}
        <div style={{ position: 'relative', paddingBottom: 11, paddingRight: 11 }}>
          <div style={{ position: 'absolute', top: 11, left: 11, right: 0, bottom: 0, background: CARD, border: `1px solid ${LINE}`, borderRadius: 8 }} />
          <div style={{ position: 'relative', zIndex: 1 }}><ArticleMock /></div>
        </div>

        {/* 吹き出し：現在人の手でレポートを作成している */}
        <div style={{ position: 'relative', marginTop: 16, background: CARD, border: `1px solid ${LINE}`, borderLeft: `3px solid ${NEUTRAL_BAR}`, borderRadius: 4, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 11 }}>
          <span style={{ position: 'absolute', top: -7, left: 46, width: 12, height: 12, background: CARD, borderLeft: `1px solid ${LINE}`, borderTop: `1px solid ${LINE}`, transform: 'rotate(45deg)' }} />
          <Users style={{ width: 17, height: 17, color: GRAPHITE, strokeWidth: 1.8, flexShrink: 0 }} />
          <p style={{ fontSize: 13, fontWeight: 700, color: GRAPHITE, lineHeight: 1.6 }}>
            現在、<strong style={{ color: INK }}>人の手</strong>でレポートを作成している
          </p>
        </div>
      </div>

      {/* --- 本文行：中央のブロック矢印 --- */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 100 110" style={{ width: 50, height: 55 }}>
          <path d="M0,34 L52,34 L52,2 L98,55 L52,108 L52,76 L0,76 Z" fill={ACCENT} />
        </svg>
      </div>

      {/* --- 本文行：RIGHT AIで自動化 --- */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* AIコンテナ */}
        <div style={{ background: CARD, border: `1.5px solid ${LINE}`, borderRadius: 24, padding: '24px 24px 28px', boxShadow: '0 18px 44px rgba(15,17,21,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(59,55,255,0.06), transparent 60%)' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, color: ACCENT, letterSpacing: '0.06em', lineHeight: 1, marginBottom: 22 }}>AI</p>

            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              {aiSteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.t} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, borderRadius: 10, padding: '16px 8px', textAlign: 'center' }}>
                      <Icon style={{ width: 20, height: 20, color: ACCENT_INK, strokeWidth: 1.7, margin: '0 auto 10px', display: 'block' }} />
                      <p style={{ fontSize: 12.5, fontWeight: 800, color: ACCENT_INK, lineHeight: 1.4 }}>{s.t}</p>
                    </div>
                    {i < aiSteps.length - 1 && <ArrowRight style={{ width: 16, height: 16, color: FAINT, flexShrink: 0, margin: '0 6px' }} />}
                  </div>
                );
              })}
            </div>

            <p style={{ fontSize: 11.5, color: MUTE, fontWeight: 600, textAlign: 'center', marginTop: 18, lineHeight: 1.6 }}>
              収集からチェックまでを一続きの処理として自動実行
            </p>
          </div>
        </div>

        {/* ゴール */}
        <div style={{ marginTop: 16, background: CARD, border: `1.5px solid ${SIGNAL}`, borderRadius: 6, padding: '15px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: SIGNAL, flexShrink: 0 }} />
          <p style={{ fontSize: 16, fontWeight: 800, color: SIGNAL, letterSpacing: '0.01em' }}>AIで自動化したい</p>
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 3 — 現状と課題解決（いまの記事制作フロー → 自動化したい範囲）    */
/* ===================================================================== */

const BADGE = 26; // 番号バッジ径
const STEP_CARD = 280; // ステップカード幅

/* ステップ行：番号バッジ ＋ カード ＋ 右側の補足 */
function Step({ n, icon: Icon, label, note }: { n: number; icon: any; label: string; note?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      {/* 番号 */}
      <div style={{ width: BADGE, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ width: BADGE, height: BADGE, borderRadius: 999, background: CARD, border: `1.5px solid ${FAINT}`, color: GRAPHITE, fontFamily: MONO, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</span>
      </div>
      {/* カード */}
      <div style={{ width: STEP_CARD, height: 64, flexShrink: 0, background: CARD, border: `1px solid ${LINE}`, borderRadius: 9, boxShadow: '0 2px 8px rgba(15,17,21,0.045)', display: 'flex', alignItems: 'center', gap: 13, padding: '0 16px', boxSizing: 'border-box' }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: '#F5F6F8', border: `1px solid ${HAIR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon style={{ width: 16, height: 16, color: GRAPHITE, strokeWidth: 1.8 }} />
        </div>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: INK, lineHeight: 1.35 }}>{label}</span>
      </div>
      {/* 補足 */}
      {note && <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>{note}</div>}
    </div>
  );
}

/* ステップ間のコネクタ（番号バッジ列に揃える） */
function Gap() {
  return (
    <div style={{ width: BADGE, height: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
      <span style={{ width: 1.5, height: 11, background: LINE }} />
      <ArrowDown style={{ width: 13, height: 13, color: FAINT, strokeWidth: 2 }} />
    </div>
  );
}

/* 吹き出し（上向きの尾） */
function Note({ icon: Icon, children }: { icon?: any; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: '8px 13px', marginTop: 10 }}>
      <span style={{ position: 'absolute', top: -5, left: 18, width: 9, height: 9, background: CARD, borderLeft: `1px solid ${LINE}`, borderTop: `1px solid ${LINE}`, transform: 'rotate(45deg)' }} />
      {Icon && <Icon style={{ width: 12.5, height: 12.5, color: MUTE, strokeWidth: 2, flexShrink: 0 }} />}
      <span style={{ fontSize: 11.5, fontWeight: 700, color: GRAPHITE, lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

/* 自動化後の担い手マップ */
const ownerMap = [
  { no: '① ② ③', label: '情報収集・記事作成・チェック', owner: 'AI', color: ACCENT },
  { no: '④', label: '承認', owner: '人', color: INK },
  { no: '⑤', label: '公開', owner: 'システム', color: '#8A8F99' },
];

const Slide3 = (
  <Frame n={3}>
    <Head eyebrow="As-Is / 現状と課題解決" title={<>いまの記事制作は、<span style={{ color: ACCENT }}>5工程すべてが人手</span></>} />

    <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, marginTop: 28, flex: 1 }}>
      {/* ---------- LEFT：現行フロー ---------- */}
      <div style={{ flex: 1.45, display: 'flex', flexDirection: 'column' }}>
        {/* セクションヘッダ */}
        <div style={{ paddingRight: 12 }}>
          <ColHead tag="AS-IS" title="現在の記事制作フロー" status="ALL MANUAL" statusColor={SIGNAL} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Step
            n={1}
            icon={Search}
            label="担当者が情報を集める"
            note={
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <ArrowRight style={{ width: 14, height: 14, color: FAINT, strokeWidth: 2, flexShrink: 0 }} />
                  {['サイトA', 'サイトB', 'サイトC'].map((s) => (
                    <span key={s} style={{ fontSize: 11, fontWeight: 700, color: GRAPHITE, background: CARD, border: `1px solid ${LINE}`, borderRadius: 999, padding: '4px 10px' }}>{s}</span>
                  ))}
                </div>
                <Note icon={Users}>様々な情報を見に行く</Note>
              </div>
            }
          />
          <Gap />

          <Step n={2} icon={PenLine} label="集めた情報を記事にまとめる" />
          <Gap />

          <Step
            n={3}
            icon={Eye}
            label="作成した記事を確認"
            note={
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0 }}>
                    <ArrowLeft style={{ width: 13, height: 13, color: FAINT, strokeWidth: 2 }} />
                    <ArrowRight style={{ width: 13, height: 13, color: FAINT, strokeWidth: 2 }} />
                  </div>
                  <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: '10px 13px' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: GRAPHITE }}>誤字脱字、内容に間違いがあれば修正</span>
                  </div>
                </div>
                <Note icon={Repeat}>修正したら再度チェック</Note>
              </div>
            }
          />
          <Gap />

          <Step n={4} icon={UserCheck} label="承認" note={<Note icon={ShieldCheck}>承認者のチェックを踏まえ、承認される</Note>} />
          <Gap />

          <Step n={5} icon={Send} label="公開" />
        </div>
      </div>

      {/* ---------- 中央：ブロック矢印 ---------- */}
      <div style={{ width: 92, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 100 110" style={{ width: 58, height: 64 }}>
          <path d="M0,34 L52,34 L52,2 L98,55 L52,108 L52,76 L0,76 Z" fill={ACCENT} />
        </svg>
      </div>

      {/* ---------- RIGHT：ゴール ---------- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 12, boxShadow: '0 20px 50px rgba(15,17,21,0.07)', padding: '28px 28px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 64, height: 4, background: ACCENT }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 100% 0%, rgba(59,55,255,0.06), transparent 55%)' }} />

          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', color: ACCENT_INK, fontWeight: 700, marginBottom: 16 }}>GOAL</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.55, letterSpacing: '-0.02em' }}>
              AIで自動化できるところは
              <br />
              <span style={{ color: ACCENT }}>自動化したい</span>
            </p>

            <div style={{ marginTop: 24, paddingTop: 4 }}>
              <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.16em', color: MUTE, fontWeight: 700, marginBottom: 4 }}>WHO DOES WHAT</p>
              {ownerMap.map((r) => (
                <div key={r.no} style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${HAIR}`, padding: '10px 0' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: MUTE, fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0 }}>{r.no}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: GRAPHITE, flex: 1, minWidth: 0 }}>{r.label}</span>
                  <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: r.color, background: r.color === ACCENT ? ACCENT_SOFT : '#F2F3F5', borderRadius: 3, padding: '3px 8px', flexShrink: 0 }}>{r.owner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 4 — その他AIを活用した開発                                       */
/*   品質チェック／細かい数値のデータ抽出／機械学習（改善ループ）         */
/* ===================================================================== */

/* 小さな書類モック（赤破線＝AIが見る箇所） */
function MiniDoc({ width, height, blocks, showTitle = true }: { width: number; height: number; blocks: { lines: number; mark?: boolean }[]; showTitle?: boolean }) {
  return (
    <div style={{ width, height, flexShrink: 0, background: CARD, border: `1px solid ${LINE}`, borderRadius: 5, padding: 9, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 7 }}>
      {showTitle && <div style={{ width: '46%', height: 3, background: FAINT, borderRadius: 2, flexShrink: 0 }} />}
      {blocks.map((b, i) => (
        <div key={i} style={{ flex: 1, minHeight: 0, border: `1px dashed ${b.mark ? SIGNAL : 'transparent'}`, borderRadius: 3, padding: '5px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
          {Array.from({ length: b.lines }).map((_, j) => (
            <div key={j} style={{ height: 2.5, background: '#E7E9ED', borderRadius: 2, width: j === b.lines - 1 ? '70%' : '100%' }} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ラベル付きブロック矢印 */
function FlowArrow({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, flexShrink: 0 }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: ACCENT_INK, background: ACCENT_SOFT, borderRadius: 999, padding: '4px 12px', whiteSpace: 'nowrap' }}>{label}</span>
      <svg viewBox="0 0 100 110" style={{ width: 40, height: 44 }}>
        <path d="M0,34 L52,34 L52,2 L98,55 L52,108 L52,76 L0,76 Z" fill={ACCENT} />
      </svg>
    </div>
  );
}

/* 細い矢印（レイアウト内の接続用） */
function Tick({ w = 20 }: { w?: number }) {
  return <ArrowRight style={{ width: 15, height: 15, color: FAINT, strokeWidth: 2, flexShrink: 0, margin: `0 ${(w - 15) / 2}px` }} />;
}

/* OCRが抽出した数値グリッド */
const ocrCells = [
  { v: '100万', mark: true },
  { v: '500' },
  { v: '1,000', mark: true },
  { v: '1年' },
  { v: '90', mark: true },
  { v: '100' },
];

/* 機械学習ブロックの指摘ラベル */
const mlFindings = ['添削', '誤字・脱字', '数字違い'];

/* 学習後に精度が上がる処理 */
const mlOutputs = ['情報収集', 'レポート作成', '内容チェック'];

const Slide4 = (
  <Frame n={4}>
    <Head eyebrow="Solution / その他AIを活用した開発" title={<>品質チェック・数値抽出・<span style={{ color: ACCENT }}>機械学習</span>にもAIを活用</>} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20, flex: 1 }}>
      {/* ============ 上段：品質チェック ／ 細かい数値のデータ抽出 ============ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* ---- 01 品質チェック ---- */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '18px 20px 20px' }}>
          <ColHead tag="01" title="品質チェック" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <MiniDoc width={98} height={120} blocks={[{ lines: 3, mark: true }, { lines: 3, mark: true }]} />
            <Tick w={26} />
            {/* 人 → AI */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 50, height: 50, borderRadius: 13, background: '#F5F6F8', border: `1px solid ${HAIR}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User style={{ width: 22, height: 22, color: MUTE, strokeWidth: 1.7 }} />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: MUTE }}>人が目視</span>
              </div>
              <Tick w={22} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 50, height: 50, borderRadius: 13, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: ACCENT_INK, letterSpacing: '0.04em' }}>AI</span>
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: ACCENT_INK }}>AIが代替</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 12 }} />
            <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
              <div style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: INK, lineHeight: 1.6 }}>AIで内容チェック</p>
                <p style={{ fontSize: 11, color: MUTE, fontWeight: 600, lineHeight: 1.6, marginTop: 5 }}>
                  目視に頼っていた
                  <br />
                  確認をAIが一次実施
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- 02 細かい数値のデータ抽出 ---- */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '18px 20px 20px' }}>
          <ColHead tag="02" title="細かい数値のデータ抽出" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <MiniDoc width={90} height={120} blocks={[{ lines: 7, mark: true }]} />
            <Tick w={24} />
            {/* AIコンテナ */}
            <div style={{ flex: 1, background: '#FBFBFD', border: `1.5px solid ${ACCENT}`, borderRadius: 10, padding: '12px 14px' }}>
              <p style={{ fontSize: 11.5, fontWeight: 800, color: ACCENT_INK, letterSpacing: '0.06em', marginBottom: 10 }}>AI</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, background: CARD, border: `1px solid ${LINE}`, borderRadius: 7, padding: '9px 10px' }}>
                  <ScanText style={{ width: 17, height: 17, color: GRAPHITE, strokeWidth: 1.7 }} />
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: INK, whiteSpace: 'nowrap' }}>OCR読み取り</span>
                </div>
                <Tick w={20} />
                {/* 抽出された数値 */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
                  {ocrCells.map((c, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        fontWeight: 700,
                        textAlign: 'center',
                        padding: '6px 2px',
                        borderRadius: 4,
                        color: c.mark ? SIGNAL : GRAPHITE,
                        border: `1px dashed ${c.mark ? SIGNAL : 'transparent'}`,
                        background: c.mark ? '#FFF4F1' : '#F5F6F8',
                      }}
                    >
                      {c.v}
                    </span>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: 11, color: MUTE, fontWeight: 600, marginTop: 11, lineHeight: 1.6 }}>文章を読み取り、必要な数値を取得</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ 下段：機械学習 ============ */}
      <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '18px 22px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ColHead tag="03" title="機械学習" status="ACCURACY ↑" statusColor={ACCENT_INK} />

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          {/* ① 過去レポート群 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 50px)', gap: 7 }}>
              {[0, 1, 2, 3].map((i) => <MiniDoc key={i} width={50} height={58} blocks={[{ lines: 3 }]} />)}
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: MUTE }}>収集した情報</span>
          </div>

          <FlowArrow label="レポートを作成" />

          {/* ② ドラフト＋指摘 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}>
            <MiniDoc width={82} height={110} blocks={[{ lines: 3, mark: true }, { lines: 3, mark: true }]} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {mlFindings.map((f) => (
                <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 700, color: GRAPHITE, background: '#FFF4F1', border: `1px solid #FFD9CF`, borderRadius: 999, padding: '4px 10px', whiteSpace: 'nowrap' }}>
                  <span style={{ width: 5, height: 5, borderRadius: 999, background: SIGNAL }} />
                  {f}
                </span>
              ))}
            </div>
          </div>

          <FlowArrow label="内容チェック" />

          {/* ③ 結果 → DB → AI が学習 → 精度向上 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['結果 1', '結果 2', '結果 3'].map((r) => (
                <span key={r} style={{ fontSize: 10.5, fontWeight: 700, color: GRAPHITE, background: CARD, border: `1px solid ${LINE}`, borderRadius: 5, padding: '5px 10px', whiteSpace: 'nowrap' }}>{r}</span>
              ))}
            </div>
            <Tick w={22} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: '#F5F6F8', border: `1px solid ${HAIR}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Database style={{ width: 20, height: 20, color: GRAPHITE, strokeWidth: 1.7 }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: MUTE, whiteSpace: 'nowrap' }}>DBに保存</span>
            </div>
            <Tick w={22} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: ACCENT_INK, letterSpacing: '0.04em' }}>AI</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 800, color: ACCENT_INK, whiteSpace: 'nowrap' }}>学習</span>
            </div>
            <Tick w={22} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {mlOutputs.map((o) => (
                <span key={o} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 800, color: ACCENT_INK, background: ACCENT_SOFT, borderRadius: 5, padding: '5px 10px', whiteSpace: 'nowrap' }}>
                  <TrendingUp style={{ width: 11, height: 11, strokeWidth: 2.2 }} />
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 学習ループの説明 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${HAIR}`, paddingTop: 12, marginTop: 6 }}>
          <Repeat style={{ width: 15, height: 15, color: ACCENT, strokeWidth: 2, flexShrink: 0 }} />
          <p style={{ fontSize: 12.5, fontWeight: 700, color: GRAPHITE, lineHeight: 1.6 }}>
            AIの学習した結果をもとに、<strong style={{ color: INK }}>次のAIでの処理の精度が上がっていく</strong>
          </p>
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 5 — 機械学習についてのまとめ                                     */
/*   ① 学習材料 ／ ② 学習データの使い先 ／ ③ 効果イメージ                */
/* ===================================================================== */

type Col = { label: string; w: string };

/* 表：見出し行に濃い罫線、本文行はヘアライン。最終列＝効果はアクセント色 */
function DataTable({ cols, rows, cell = 11 }: { cols: Col[]; rows: React.ReactNode[][]; cell?: number }) {
  const last = cols.length - 1;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols.map((c) => c.w).join(' ') }}>
      {cols.map((c) => (
        <div key={c.label} style={{ fontSize: 10, fontWeight: 700, color: MUTE, letterSpacing: '0.06em', padding: '0 9px 8px', borderBottom: `1.5px solid ${INK}` }}>
          {c.label}
        </div>
      ))}
      {rows.map((r, i) =>
        r.map((v, j) => (
          <div
            key={`${i}-${j}`}
            style={{
              fontSize: cell,
              lineHeight: 1.55,
              padding: '6px 9px',
              borderTop: i === 0 ? 'none' : `1px solid ${HAIR}`,
              fontWeight: j === 0 ? 800 : j === last ? 700 : 600,
              color: j === 0 ? INK : j === last ? ACCENT_INK : GRAPHITE,
            }}
          >
            {v}
          </div>
        ))
      )}
    </div>
  );
}

/* 段階インジケータ（●○○ → ●●○ → ●●●） */
function Stage({ n }: { n: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, marginRight: 9, verticalAlign: 'middle' }}>
      {[1, 2, 3].map((i) => (
        <span key={i} style={{ width: 5, height: 5, borderRadius: 1.5, background: i <= n ? ACCENT : LINE }} />
      ))}
    </span>
  );
}

const learnMaterial: React.ReactNode[][] = [
  ['修正の Before→After', 'AIが書いた文 と 人が直した文 のペア', '次から同じ書き方のミスをしなくなる'],
  ['差し戻しの理由', '「数値が違う」「表現が不適切」など', 'どこを直すべきかAIが学び、指摘精度が上がる'],
  ['よく直される表記', '毎回同じ形に直される言い回し', '表記ブレが減り、文体が自社仕様にそろう'],
  ['数値ミスの箇所', 'どの帳票のどの数字を読み間違えやすいか', '危ない数字を先回りで「要確認」にできる'],
  ['公開された良い記事', 'お手本として使える完成記事', '良い記事に近い品質で書けるようになる'],
];

const learnUsage: React.ReactNode[][] = [
  ['修正の Before→After', '次の生成時にお手本として渡す', '同じミスを繰り返さない'],
  ['よく直される表記', 'ルールに昇格させる', '最初から正しい表記で書く'],
  ['差し戻しの理由', 'チェックAIが重点的に確認', '見逃しが減る'],
  ['数値ミスの箇所', '「要確認」フラグを強める', '危ない数字を人に回す'],
  ['大量の修正データ', '定期的にモデルを再学習', '全体の精度が底上げ'],
];

const effectRows: React.ReactNode[][] = [
  [<><Stage n={1} />導入直後</>, '70〜80%', '修正が多め', 'まずは人がしっかり支えて品質を担保'],
  [<><Stage n={2} />数ヶ月後</>, '徐々に向上', '修正が減る', '一人あたりの処理量が増え、余力が生まれる'],
  [<><Stage n={3} />運用が進むと</>, 'さらに向上', '承認だけで済むように', '工数が大きく削減され、費用対効果が上がり続ける'],
];

/* カードの外枠 */
function Panel({ tag, title, status, children }: { tag: string; title: string; status?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '16px 20px 14px', display: 'flex', flexDirection: 'column' }}>
      <ColHead tag={tag} title={title} status={status} statusColor={ACCENT_INK} mb={11} />
      {children}
    </div>
  );
}

const Slide5 = (
  <Frame n={5}>
    <Head eyebrow="Summary / 機械学習についてのまとめ" title={<>何を溜めて、どう使うと、<span style={{ color: ACCENT }}>どう効いてくるのか</span></>} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18, flex: 1 }}>
      {/* ---- 上段：学習材料 ／ 学習データの使い先 ---- */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.12fr 0.88fr', gap: 16 }}>
        <Panel tag="01" title="学習材料" status="WHAT TO STORE">
          <DataTable
            cols={[
              { label: '溜めるデータ', w: '128px' },
              { label: '中身の例', w: '1.06fr' },
              { label: '効果', w: '1fr' },
            ]}
            rows={learnMaterial}
          />
        </Panel>

        <Panel tag="02" title="学習データの使い先" status="HOW TO USE">
          <DataTable
            cols={[
              { label: '溜めたデータ', w: '126px' },
              { label: '使い方', w: '1fr' },
              { label: '効果', w: '0.94fr' },
            ]}
            rows={learnUsage}
          />
        </Panel>
      </div>

      {/* ---- 下段：効果イメージ（表は左に寄せ、右に改善ループの要約） ---- */}
      <Panel tag="03" title="効果イメージ" status="OVER TIME">
        <div style={{ display: 'grid', gridTemplateColumns: '1.62fr 1fr', gap: 24, alignItems: 'start' }}>
          <DataTable
            cols={[
              { label: '時期', w: '132px' },
              { label: 'AIの精度', w: '92px' },
              { label: '人の作業', w: '142px' },
              { label: '効果', w: '1fr' },
            ]}
            rows={effectRows}
            cell={11.5}
          />

          {/* 右：なぜ精度が上がり続けるのか（01→02→03 の循環） */}
          <div style={{ borderLeft: `1px solid ${HAIR}`, paddingLeft: 24 }}>
            <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.16em', color: MUTE, fontWeight: 700, marginBottom: 10 }}>WHY IT IMPROVES</p>

            {/* 01 → 02 → 03 */}
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 4 }}>
              {[
                { no: '01', t: '溜める' },
                { no: '02', t: '使う' },
                { no: '03', t: '効く' },
              ].map((s, i, arr) => (
                <div key={s.no} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: 1, background: ACCENT_SOFT, border: `1px solid ${ACCENT}`, borderRadius: 7, padding: '7px 2px', textAlign: 'center' }}>
                    <p style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '0.1em', color: ACCENT, fontWeight: 700, lineHeight: 1 }}>{s.no}</p>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: ACCENT_INK, marginTop: 4, lineHeight: 1.2 }}>{s.t}</p>
                  </div>
                  {i < arr.length - 1 && <ArrowRight style={{ width: 12, height: 12, color: FAINT, strokeWidth: 2, flexShrink: 0, margin: '0 3px' }} />}
                </div>
              ))}
            </div>

            {/* 03 → 01 へ戻る（ラベルで線を抜く） */}
            <div style={{ position: 'relative', height: 20, margin: '0 24px' }}>
              <div style={{ position: 'absolute', inset: 0, borderLeft: `1.5px solid ${LINE}`, borderRight: `1.5px solid ${LINE}`, borderBottom: `1.5px solid ${LINE}`, borderRadius: '0 0 8px 8px' }} />
              <ArrowUp style={{ position: 'absolute', top: -6, left: -6.5, width: 12, height: 12, color: FAINT, strokeWidth: 2.4 }} />
              <span style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)', background: CARD, padding: '0 8px', fontSize: 10, color: MUTE, fontWeight: 700, whiteSpace: 'nowrap' }}>
                修正データがまた溜まる
              </span>
            </div>

            {/* 結論 */}
            <div style={{ marginTop: 16, borderLeft: `3px solid ${ACCENT}`, paddingLeft: 11 }}>
              <p style={{ fontSize: 11.5, fontWeight: 800, color: INK, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                使うほど溜まり、溜まるほど<span style={{ color: ACCENT }}>精度が上がる</span>
              </p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 6 — 開発スケジュール（ガントチャート）                           */
/* ===================================================================== */

/* フェーズ配色：3系列のカテゴリカル。
   validate_palette.js（light / --pairs all）で全チェックPASS 済み
   #B0741A ↔ #3B37FF ↔ #0E9F6E : CVD ΔE 8.7 / 通常視 ΔE 18.4 / 対背景 3:1 以上 */
const PH_PREP = '#B0741A';
const PH_DEV = ACCENT; // #3B37FF
const PH_SHIP = '#0E9F6E';
/* サマリーバー（フェーズ全体の期間）用の淡色 */
const PH_PREP_SUM = '#E3C79F';
const PH_DEV_SUM = '#B5B3FF';
const PH_SHIP_SUM = '#9BDAC3';
/* 行の帯（フェーズのまとまりを示す最小限のトーン） */
const PH_PREP_BAND = '#FCFAF6';
const PH_DEV_BAND = '#FAFAFF';
const PH_SHIP_BAND = '#F7FCFA';
/* チップ用 */
const PH_PREP_BG = '#F8EFE1';
const PH_DEV_BG = ACCENT_SOFT;
const PH_SHIP_BG = '#E2F5EE';

const WEEKS = 8; // 8月1週 〜 9月4週
const LABEL_W = 190;
const ROW_H = 23;
const GROUP_H = 21;
const BAR_H = 13;
const SUM_H = 5; // フェーズ サマリーバー

type GanttRow = {
  label: string;
  group?: boolean;
  s: number;
  e: number;
  color: string;
  sum?: string; // グループ行のサマリーバー色
  band: string;
};

const ganttRows: GanttRow[] = [
  { group: true, label: '① 準備', s: 0, e: 2, color: PH_PREP, sum: PH_PREP_SUM, band: PH_PREP_BAND },
  { label: '要件確定・環境準備', s: 0, e: 2, color: PH_PREP, band: PH_PREP_BAND },

  { group: true, label: '② 開発', s: 1, e: 7, color: PH_DEV, sum: PH_DEV_SUM, band: PH_DEV_BAND },
  { label: 'データ収集・前処理', s: 1, e: 4, color: PH_DEV, band: PH_DEV_BAND },
  { label: '記事生成・文体統一', s: 2, e: 5, color: PH_DEV, band: PH_DEV_BAND },
  { label: 'ファクトチェック', s: 3, e: 6, color: PH_DEV, band: PH_DEV_BAND },
  { label: 'レビューUI（承認画面）', s: 4, e: 7, color: PH_DEV, band: PH_DEV_BAND },
  { label: 'テスト', s: 5, e: 7, color: PH_DEV, band: PH_DEV_BAND },

  { group: true, label: '③ 納品', s: 6, e: 8, color: PH_SHIP, sum: PH_SHIP_SUM, band: PH_SHIP_BAND },
  { label: 'UAT', s: 6, e: 7, color: PH_SHIP, band: PH_SHIP_BAND },
  { label: 'リリース判定', s: 7, e: 7.35, color: PH_SHIP, band: PH_SHIP_BAND },
  { label: '本番リリース', s: 7.32, e: 7.66, color: PH_SHIP, band: PH_SHIP_BAND },
  { label: '本番動作確認', s: 7.66, e: 8, color: PH_SHIP, band: PH_SHIP_BAND },
];

/* 行の縦位置を先に確定させ、帯・目盛り・バーを別レイヤーで重ねる */
const ganttLayout = (() => {
  let y = 0;
  const rows = ganttRows.map((r) => {
    const h = r.group ? GROUP_H : ROW_H;
    const laid = { ...r, y, h };
    y += h;
    return laid;
  });
  return { rows, height: y };
})();

const phaseNotes = [
  { no: '①', name: '準備', color: PH_PREP, bg: PH_PREP_BG, d: '仕様決めを行う' },
  { no: '②', name: '開発', color: PH_DEV, bg: PH_DEV_BG, d: '各機能を開発・テスト' },
  { no: '③', name: '納品', color: PH_SHIP, bg: PH_SHIP_BG, d: '受入テストを行い、リリース判定を経て本番リリースを行う' },
];

const pct = (v: number) => `${(v / WEEKS) * 100}%`;

const Slide6 = (
  <Frame n={6}>
    <Head eyebrow="Schedule / 開発スケジュール" title={<>8月着手、<span style={{ color: ACCENT }}>9月末</span>に本番リリース</>} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20, flex: 1 }}>
      {/* ============ ガントチャート ============ */}
      <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '16px 20px 14px' }}>
        <ColHead tag="GANTT" title="開発スケジュール" status="9月末リリース" statusColor={PH_SHIP} mb={10} />

        {/* --- 時間軸ヘッダ --- */}
        <div style={{ display: 'flex' }}>
          <div style={{ width: LABEL_W, flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[
              { m: '8月', weeks: ['1週', '2週', '3週', '4週'] },
              { m: '9月', weeks: ['1週', '2週', '3週', '4週'] },
            ].map((mo, mi) => (
              <div key={mo.m} style={{ borderLeft: mi === 1 ? `1px solid ${LINE}` : 'none' }}>
                <div style={{ textAlign: 'center', fontSize: 11.5, fontWeight: 800, color: INK, letterSpacing: '0.04em', paddingBottom: 5 }}>{mo.m}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${LINE}`, paddingTop: 5, paddingBottom: 6 }}>
                  {mo.weeks.map((w, i) => (
                    <div key={i} style={{ textAlign: 'center', fontSize: 9.5, fontWeight: 700, color: MUTE }}>{w}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 本体 --- */}
        <div style={{ display: 'flex' }}>
          {/* 行ラベル */}
          <div style={{ width: LABEL_W, flexShrink: 0 }}>
            {ganttLayout.rows.map((r) => (
              <div key={r.label} style={{ height: r.h, background: r.band, display: 'flex', alignItems: 'center', paddingRight: 12, boxSizing: 'border-box' }}>
                {r.group ? (
                  <>
                    <span style={{ width: 9, height: 9, borderRadius: 2, background: r.color, flexShrink: 0, marginRight: 9 }} />
                    <span style={{ fontSize: 12, fontWeight: 800, color: INK }}>{r.label}</span>
                  </>
                ) : (
                  <>
                    {/* フェーズと紐づける縦ガイド */}
                    <span style={{ width: 1, height: '100%', background: LINE, marginLeft: 4, marginRight: 14, flexShrink: 0 }} />
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: GRAPHITE }}>{r.label}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* プロット領域（帯 → 目盛り → バー の順に重ねる） */}
          <div style={{ flex: 1, position: 'relative', height: ganttLayout.height }}>
            {/* 1. フェーズの帯 */}
            {ganttLayout.rows.map((r) => (
              <span key={`b-${r.label}`} style={{ position: 'absolute', left: 0, right: 0, top: r.y, height: r.h, background: r.band }} />
            ))}

            {/* 2. 週の目盛り */}
            {Array.from({ length: WEEKS + 1 }).map((_, i) => (
              <span key={`g-${i}`} style={{ position: 'absolute', left: pct(i), top: 0, bottom: 0, width: 1, background: i === 4 ? LINE : HAIR, transform: i === WEEKS ? 'translateX(-1px)' : undefined }} />
            ))}

            {/* 3. マイルストーン：9月末 */}
            <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 2, background: PH_SHIP }} />
            <span style={{ position: 'absolute', right: -3, top: -4, width: 8, height: 8, background: PH_SHIP, transform: 'rotate(45deg)', borderRadius: 1 }} />

            {/* 4. バー */}
            {ganttLayout.rows.map((r) => {
              const weeks = r.e - r.s;
              if (r.group) {
                /* フェーズ全体の期間を示すサマリーバー */
                return (
                  <span
                    key={`s-${r.label}`}
                    style={{ position: 'absolute', left: pct(r.s), width: pct(weeks), top: r.y + (r.h - SUM_H) / 2, height: SUM_H, background: r.sum, borderRadius: 2.5 }}
                  />
                );
              }
              return (
                <div key={`t-${r.label}`}>
                  <span style={{ position: 'absolute', left: pct(r.s), width: pct(weeks), top: r.y + (r.h - BAR_H) / 2, height: BAR_H, background: r.color, borderRadius: 4 }} />
                  {weeks >= 1 && (
                    <span
                      style={{
                        position: 'absolute',
                        left: pct(r.e),
                        marginLeft: 8,
                        top: r.y + (r.h - 12) / 2,
                        fontFamily: MONO,
                        fontSize: 9.5,
                        fontWeight: 700,
                        color: MUTE,
                        lineHeight: '12px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {weeks}週
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 軸の締め＋前提の注記／マイルストーン注記 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, borderTop: `1px solid ${LINE}`, paddingTop: 8, marginTop: 0 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: MUTE, lineHeight: 1.5 }}>
            ※ 仮に<strong style={{ color: GRAPHITE, fontWeight: 800 }}>8月1週目からの着手</strong>として作成しています。着手時期が前後すると、本番リリースの目安も同じだけ前後します。
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 800, color: PH_SHIP, flexShrink: 0 }}>
            <span style={{ width: 7, height: 7, background: PH_SHIP, transform: 'rotate(45deg)', borderRadius: 1 }} />
            9月末：本番リリース
          </span>
        </div>
      </div>

      {/* ============ フェーズの説明 ============ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.55fr', gap: 14 }}>
        {phaseNotes.map((p) => (
          <div key={p.no} style={{ background: CARD, border: `1px solid ${LINE}`, borderLeft: `3px solid ${p.color}`, borderRadius: 6, padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: p.color, background: p.bg, borderRadius: 3, padding: '2px 7px' }}>{p.no}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: INK }}>{p.name}</span>
            </div>
            <p style={{ fontSize: 11.5, color: GRAPHITE, fontWeight: 600, lineHeight: 1.55 }}>{p.d}</p>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 7 — 9月リリース以降（フェーズ1〜3のロードマップ）                */
/* ===================================================================== */

const roadmapPhases = [
  {
    ph: 'フェーズ1',
    name: '今回の開発',
    color: PH_DEV,
    bg: PH_DEV_BG,
    now: true,
    items: ['一気通貫で自動化', '単一ソースから開始', '9月末まで'],
  },
  {
    ph: 'フェーズ2',
    name: 'チューニング・修正',
    color: PH_SHIP,
    bg: PH_SHIP_BG,
    items: ['学習で精度を向上', '誤検知を低減', '継続（軽い運用）'],
  },
  {
    ph: 'フェーズ3',
    name: 'エンハンス開発',
    color: PH_PREP,
    bg: PH_PREP_BG,
    items: ['CMS自動公開', '情報ソース拡張', 'ネタ自動検知 ほか'],
  },
];

const roadmapPoints = [
  {
    no: 'ポイント 1',
    color: PH_DEV,
    bg: PH_DEV_BG,
    title: 'フェーズ1：今回の開発',
    period: '8月〜9月末',
    kind: 'pipeline' as const,
    items: ['収集', '生成', 'チェック', '承認'],
    note: '＝ 前ページの詳細ガント全体',
    lead: '単一ソースで一気通貫に通す第一弾。',
    strong: 'ゴールは9月末の本番リリース。',
  },
  {
    no: 'ポイント 2',
    color: PH_SHIP,
    bg: PH_SHIP_BG,
    title: 'フェーズ2：チューニング・修正',
    period: 'リリース後〜継続',
    kind: 'up' as const,
    items: ['修正データを溜めて再学習', 'ファクトチェックの誤検知を低減', '文体・表記ルールの精緻化', '精度のモニタリング'],
    lead: '新機能ではなく、動き出した後の運用・改善。',
    strong: 'リリース直後から継続的に走ります。',
  },
  {
    no: 'ポイント 3',
    color: PH_PREP,
    bg: PH_PREP_BG,
    title: 'フェーズ3：エンハンス開発',
    period: '順次〜継続',
    kind: 'plus' as const,
    items: ['CMS自動公開', '情報ソースの拡張', 'ネタの自動検知', '定型レポートの完全自動化'],
    lead: '機能を足して広げていく開発。',
    strong: '優先度と予算に応じて順次追加。',
  },
];

/* フェーズ間の矢印幅（マイルストーン線の位置計算に使う）。
   絶対配置の 100% はパネルのパディングボックスなので、左右パディング分を差し引く */
const GAP_W = 46;
const PANEL_PAD = 20;
/* フェーズ1の右端＝本番リリース。矢印は隙間の中央なので線と重ならない。
   パネル直下の絶対配置用（基準＝パディングボックス） */
const MILESTONE_X_ABS = `calc((100% - ${PANEL_PAD * 2 + GAP_W * 2}px) / 3 + ${PANEL_PAD + 7}px)`;
/* コンテンツ行の中での配置用（基準＝コンテンツ幅） */
const MILESTONE_X_REL = `calc((100% - ${GAP_W * 2}px) / 3 + 7px)`;
/* フェーズ1カードの中央（「今回」バッジ用） */
const PHASE1_CENTER_X = `calc((100% - ${GAP_W * 2}px) / 6)`;

const Slide7 = (
  <Frame n={7}>
    <Head eyebrow="Roadmap / 9月リリース以降" title={<>リリース後は、<span style={{ color: ACCENT }}>精度向上と機能拡張</span>を継続</>} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20, flex: 1 }}>
      {/* ============ ロードマップ図 ============ */}
      <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '16px 20px 14px', position: 'relative' }}>
        {/* 本番リリースの区切り線（フェーズ1とフェーズ2の間） */}
        <div style={{ position: 'absolute', left: MILESTONE_X_ABS, top: 62, bottom: 52, borderLeft: `1.5px dashed ${PH_SHIP}` }} />

        {/* --- マーカー行：今回 ／ 本番リリース --- */}
        <div style={{ position: 'relative', height: 30 }}>
          {/* 今回（フェーズ1カードの中央に配置） */}
          <div style={{ position: 'absolute', left: PHASE1_CENTER_X, top: 0, transform: 'translateX(-50%)' }}>
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', background: CARD, border: `1.5px solid ${ACCENT}`, color: ACCENT_INK, borderRadius: 999, padding: '4px 14px', fontSize: 11.5, fontWeight: 800 }}>
              今回
              <span style={{ position: 'absolute', bottom: -5, left: 'calc(50% - 4px)', width: 8, height: 8, background: CARD, borderRight: `1.5px solid ${ACCENT}`, borderBottom: `1.5px solid ${ACCENT}`, transform: 'rotate(45deg)' }} />
            </span>
          </div>
          {/* 本番リリース（菱形マーカーの中心を破線の真上に乗せる） */}
          <div style={{ position: 'absolute', left: MILESTONE_X_REL, marginLeft: -4, top: 3 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 800, color: PH_SHIP, whiteSpace: 'nowrap' }}>
              <span style={{ width: 8, height: 8, background: PH_SHIP, transform: 'rotate(45deg)', borderRadius: 1 }} />
              本番リリース（9月末）
            </span>
          </div>
        </div>

        {/* --- フェーズカード --- */}
        {/* 矢印は独立した flex 子にする（カードに内包すると3枚の幅が揃わない） */}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          {roadmapPhases.flatMap((p, i) => {
            const card = (
              <div key={p.ph} style={{ flex: 1, minWidth: 0, background: p.bg, border: `1.5px solid ${p.color}`, borderRadius: 12, padding: '15px 18px 16px' }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: p.color, letterSpacing: '0.04em' }}>{p.ph}</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: INK, marginTop: 5, marginBottom: 12 }}>{p.name}</p>
                {p.items.map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2.5px 0' }}>
                    <span style={{ width: 4, height: 4, borderRadius: 999, background: p.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: GRAPHITE }}>{t}</span>
                  </div>
                ))}
              </div>
            );
            if (i === 0) return [card];
            const arrow = (
              <div key={`gap-${i}`} style={{ width: GAP_W, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowRight style={{ width: 18, height: 18, color: FAINT, strokeWidth: 2 }} />
              </div>
            );
            return [arrow, card];
          })}
        </div>

        {/* --- 時間の流れ --- */}
        <div style={{ marginTop: 16 }}>
          <div style={{ position: 'relative', height: 1.5, background: FAINT }}>
            <span style={{ position: 'absolute', right: -1, top: -4, width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `8px solid ${FAINT}` }} />
          </div>
          <p style={{ textAlign: 'center', fontSize: 11.5, fontWeight: 700, color: MUTE, marginTop: 8 }}>
            フェーズ2以降、<strong style={{ color: GRAPHITE }}>AIモデルのチューニング</strong>と<strong style={{ color: GRAPHITE }}>エンハンス開発</strong>を継続
          </p>
        </div>
      </div>

      {/* ============ ポイント（要点＋図解） ============ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, flex: 1, minHeight: 0 }}>
        {roadmapPoints.map((p) => (
          <div key={p.no} style={{ background: CARD, border: `1px solid ${LINE}`, borderTop: `3px solid ${p.color}`, borderRadius: 8, padding: '13px 16px 14px', display: 'flex', flexDirection: 'column' }}>
            {/* 見出し */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: p.color, background: p.bg, borderRadius: 3, padding: '3px 8px', whiteSpace: 'nowrap' }}>{p.no}</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: MUTE, whiteSpace: 'nowrap' }}>{p.period}</span>
            </div>
            <p style={{ fontSize: 13.5, fontWeight: 800, color: INK, marginBottom: 11 }}>{p.title}</p>

            {/* 図解 */}
            <div style={{ borderTop: `1px solid ${HAIR}`, paddingTop: 11 }}>
              {p.kind === 'pipeline' ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {p.items.map((t, i, arr) => (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 800, color: p.color, background: p.bg, border: `1px solid ${p.color}`, borderRadius: 5, padding: '5px 7px', whiteSpace: 'nowrap' }}>{t}</span>
                        {i < arr.length - 1 && <ArrowRight style={{ width: 11, height: 11, color: FAINT, strokeWidth: 2.4, flexShrink: 0, margin: '0 3px' }} />}
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 10.5, color: MUTE, fontWeight: 700, marginTop: 10 }}>{p.note}</p>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {p.items.map((t) => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {p.kind === 'plus' ? (
                        <Plus style={{ width: 11, height: 11, color: p.color, strokeWidth: 3, flexShrink: 0 }} />
                      ) : (
                        <TrendingUp style={{ width: 11, height: 11, color: p.color, strokeWidth: 2.6, flexShrink: 0 }} />
                      )}
                      <span style={{ fontSize: 11, fontWeight: 700, color: GRAPHITE }}>{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 要点 */}
            <div style={{ marginTop: 'auto', paddingTop: 12 }}>
              <p style={{ fontSize: 11, color: MUTE, fontWeight: 600, lineHeight: 1.6 }}>{p.lead}</p>
              <p style={{ fontSize: 11.5, color: INK, fontWeight: 800, lineHeight: 1.6, marginTop: 2 }}>{p.strong}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 8 — フェーズ分けスケジュールイメージ                             */
/*   月次のフェーズ帯 ＋ フェーズ2の中身（学習・チューニングのループ）    */
/* ===================================================================== */

const MONTHS = ['8月', '9月', '10月', '11月', '12月', '以降'];
const MONTH_N = MONTHS.length;
const PLABEL_W = 148;
const PROW_H = 47;
const PBAR_H = 20;
const ARROW_W = 13;

const mpct = (v: number) => `${(v / MONTH_N) * 100}%`;

type PhaseBar = {
  ph: string;
  name: string;
  s: number;
  e: number;
  color: string;
  bg: string;
  open?: boolean; // 継続（開いた矢尻）
  caption: string;
  hint: string; // 詳細をどこで説明しているか
  hintOn?: boolean; // このページで詳しく触れるフェーズ
};

const phaseBars: PhaseBar[] = [
  { ph: 'フェーズ1', name: '今回の開発', s: 0, e: 2, color: PH_DEV, bg: PH_DEV_BG, caption: '収集 → 生成 → チェック → 承認 を一気通貫', hint: '詳細は前ページの開発スケジュール' },
  { ph: 'フェーズ2', name: 'チューニング・修正', s: 2, e: 6, color: PH_SHIP, bg: PH_SHIP_BG, open: true, caption: '学習・再学習／誤検知の低減／精度モニタリング', hint: 'この下で先出し ↓', hintOn: true },
  { ph: 'フェーズ3', name: 'エンハンス開発', s: 3, e: 6, color: PH_PREP, bg: PH_PREP_BG, open: true, caption: 'CMS自動公開・情報ソース拡張・ネタ自動検知 ほか', hint: '案件ごとに個別ご相談' },
];

/* 学習ループ：AIが担う処理 */
const loopOutputs = ['情報収集', 'レポート作成', '内容チェック'];

/* 「▽」付きの小見出し */
function DropLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <span style={{ fontSize: 10.5, fontWeight: 800, color: GRAPHITE, whiteSpace: 'nowrap' }}>{children}</span>
      <span style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `6px solid ${FAINT}` }} />
    </div>
  );
}

const Slide8 = (
  <Frame n={8}>
    <Head eyebrow="Schedule / フェーズ分けスケジュールイメージ" title={<>リリース後は<span style={{ color: ACCENT }}>フェーズ2・3</span>が並走します</>} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 18, flex: 1 }}>
      {/* ============ フェーズ帯 ============ */}
      <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '15px 20px 13px' }}>
        <ColHead tag="PHASES" title="フェーズ分けスケジュール" status="フェーズ2・3は継続" statusColor={PH_SHIP} mb={9} />

        {/* 月ヘッダ */}
        <div style={{ display: 'flex', paddingBottom: 6, borderBottom: `1px solid ${LINE}` }}>
          <div style={{ width: PLABEL_W, flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${MONTH_N}, 1fr)` }}>
            {MONTHS.map((m) => (
              <div key={m} style={{ textAlign: 'center', fontSize: 11.5, fontWeight: 800, color: m === '以降' ? MUTE : INK }}>{m}</div>
            ))}
          </div>
        </div>

        {/* 行（上に「本番リリース」ラベルの逃げを取る） */}
        <div style={{ position: 'relative', marginTop: 18 }}>
          {/* 月の目盛り */}
          <div style={{ position: 'absolute', left: PLABEL_W, right: 0, top: 0, bottom: 0 }}>
            {Array.from({ length: MONTH_N + 1 }).map((_, i) => (
              <span key={i} style={{ position: 'absolute', left: mpct(i), top: 0, bottom: 0, width: 1, background: HAIR }} />
            ))}
          </div>

          {/* フェーズ2 のハイライト（下のパネルと対応。色もフェーズ2に揃える） */}
          <div style={{ position: 'absolute', left: -6, right: -6, top: PROW_H - 4, height: PROW_H, border: `1.5px dashed ${PH_SHIP}`, borderRadius: 6 }} />

          {phaseBars.map((p) => (
            <div key={p.ph} style={{ display: 'flex', height: PROW_H }}>
              <div style={{ width: PLABEL_W, flexShrink: 0, paddingRight: 12 }}>
                <p style={{ fontSize: 10.5, fontWeight: 800, color: p.color }}>{p.ph}</p>
                <p style={{ fontSize: 13.5, fontWeight: 800, color: INK, marginTop: 2 }}>{p.name}</p>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                {/* バー */}
                <span
                  style={{
                    position: 'absolute',
                    left: mpct(p.s),
                    width: `calc(${mpct(p.e - p.s)} - ${ARROW_W}px)`,
                    top: 2,
                    height: PBAR_H,
                    background: p.bg,
                    border: `1.5px solid ${p.color}`,
                    borderRight: 'none',
                    borderRadius: '5px 0 0 5px',
                    boxSizing: 'border-box',
                  }}
                />
                {/* 矢尻：完了＝塗り、継続＝抜き */}
                <svg
                  width={ARROW_W}
                  height={PBAR_H}
                  viewBox={`0 0 ${ARROW_W} ${PBAR_H}`}
                  style={{ position: 'absolute', left: `calc(${mpct(p.e)} - ${ARROW_W}px)`, top: 2 }}
                >
                  <polygon
                    points={`0,0 ${ARROW_W},${PBAR_H / 2} 0,${PBAR_H}`}
                    fill={p.open ? p.bg : p.color}
                    stroke={p.color}
                    strokeWidth={1.5}
                    strokeLinejoin="round"
                  />
                </svg>
                {/* キャプション */}
                <p style={{ position: 'absolute', left: mpct(p.s), top: PBAR_H + 7, fontSize: 10.5, fontWeight: 600, color: MUTE, whiteSpace: 'nowrap' }}>
                  {p.caption}
                  <span style={{ color: FAINT, margin: '0 8px' }}>｜</span>
                  <span style={{ color: p.hintOn ? PH_SHIP : MUTE, fontWeight: p.hintOn ? 800 : 700 }}>{p.hint}</span>
                </p>
                {/* 本番リリース */}
                {p.ph === 'フェーズ1' && (
                  <span style={{ position: 'absolute', left: `calc(${mpct(p.e)} - ${ARROW_W}px)`, top: -15, transform: 'translateX(-50%)', fontSize: 10.5, fontWeight: 800, color: PH_SHIP, whiteSpace: 'nowrap' }}>
                    本番リリース
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ フェーズ2の中身：学習ループ ============
           上のカードと差をつけるため、フェーズ2色（グリーン）の面で構成する ============ */}
      <div style={{ background: PH_SHIP_BAND, border: `1px solid #CFEADF`, borderTop: `3px solid ${PH_SHIP}`, borderRadius: 10, padding: '14px 20px 12px', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid #D9EDE5`, paddingBottom: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 700, borderRadius: 3, padding: '3px 8px', color: '#fff', background: PH_SHIP }}>NEXT STEP</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: INK, flex: 1 }}>
            リリース後すぐ始まる<span style={{ color: PH_SHIP }}>フェーズ2</span>を少しだけ先出し：溜めたデータで学習し、精度を上げ続ける
          </span>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: MUTE }}>
            フェーズ1は前ページ ／ フェーズ3は案件ごとに個別ご相談
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flex: 1, minHeight: 0 }}>
          {/* --- 左：学習ループ（図の実寸に合わせる。flex:1 にすると余り幅が空白になる） --- */}
          <div style={{ flexShrink: 0 }}>
            <div>
              {/* 見出し（DB / AI の真上） */}
              <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 6 }}>
                <span style={{ width: 78, flexShrink: 0 }} />
                <span style={{ width: 26, flexShrink: 0 }} />
                <div style={{ width: 56, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  <DropLabel>結果をDBに保存</DropLabel>
                </div>
                <span style={{ width: 54, flexShrink: 0 }} />
                {/* AIタイルの中心（枠線1.5 + パディング14 + タイル半径26）に合わせる */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ width: 83, display: 'flex', justifyContent: 'center' }}>
                    <DropLabel>AIで保存したデータを学習</DropLabel>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* 結果 1〜3 */}
                <div style={{ width: 78, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['結果 1', '結果 2', '結果 3'].map((r) => (
                    <span key={r} style={{ fontSize: 10.5, fontWeight: 700, color: GRAPHITE, background: CARD, border: `1px solid ${LINE}`, borderRadius: 5, padding: '5px 9px', textAlign: 'center' }}>{r}</span>
                  ))}
                </div>
                <div style={{ width: 26, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  <ArrowRight style={{ width: 15, height: 15, color: FAINT, strokeWidth: 2 }} />
                </div>
                {/* DB */}
                <div style={{ width: 56, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: CARD, border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Database style={{ width: 21, height: 21, color: GRAPHITE, strokeWidth: 1.7 }} />
                  </div>
                </div>
                {/* 双方向 */}
                <div style={{ width: 54, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <ArrowLeft style={{ width: 15, height: 15, color: FAINT, strokeWidth: 2 }} />
                  <ArrowRight style={{ width: 15, height: 15, color: FAINT, strokeWidth: 2 }} />
                </div>
                {/* AI ＋ 担当処理 */}
                <div style={{ flexShrink: 0, background: CARD, border: `1.5px dashed ${PH_SHIP}`, borderRadius: 8, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 13, background: ACCENT_SOFT, border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: ACCENT_INK, letterSpacing: '0.04em' }}>AI</span>
                  </div>
                  <ArrowRight style={{ width: 15, height: 15, color: FAINT, strokeWidth: 2, flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {loopOutputs.map((o) => (
                      <span key={o} style={{ fontSize: 10.5, fontWeight: 800, color: ACCENT_INK, background: ACCENT_SOFT, borderRadius: 4, padding: '4px 10px', whiteSpace: 'nowrap' }}>{o}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 処理結果がまた「結果」として溜まる（ループを閉じる） */}
              <div style={{ position: 'relative', height: 20, margin: '10px 34px 0' }}>
                <div style={{ position: 'absolute', inset: 0, borderLeft: `1.5px solid ${PH_SHIP}`, borderRight: `1.5px solid ${PH_SHIP}`, borderBottom: `1.5px solid ${PH_SHIP}`, borderRadius: '0 0 8px 8px' }} />
                <ArrowUp style={{ position: 'absolute', top: -6, left: -6.5, width: 12, height: 12, color: PH_SHIP, strokeWidth: 2.4 }} />
                <span style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)', background: PH_SHIP_BAND, padding: '0 9px', fontSize: 10, color: PH_SHIP, fontWeight: 800, whiteSpace: 'nowrap' }}>
                  処理結果がまた「結果」として溜まる
                </span>
              </div>
            </div>
          </div>

          {/* --- 右：チューニングの中身（残り幅をすべて使う） --- */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            <div style={{ background: CARD, border: `1px solid #CFEADF`, borderLeft: `3px solid ${PH_SHIP}`, borderRadius: 6, padding: '12px 15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Repeat style={{ width: 13, height: 13, color: PH_SHIP, strokeWidth: 2.4 }} />
                <span style={{ fontSize: 10.5, fontWeight: 800, color: PH_SHIP, letterSpacing: '0.06em' }}>チューニングとは</span>
              </div>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: INK, lineHeight: 1.65 }}>
                AIの処理結果の精度を見て、<strong style={{ color: PH_SHIP }}>モデルのロジック</strong>および<strong style={{ color: PH_SHIP }}>学習データ</strong>について見直し・チューニングを施す
              </p>
            </div>

            <div style={{ background: CARD, border: `1px solid #CFEADF`, borderRadius: 6, padding: '11px 15px 12px' }}>
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: MUTE, fontWeight: 700, marginBottom: 9 }}>WHAT WE TUNE</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 7, columnGap: 10 }}>
                {['修正データを溜めて再学習', 'ファクトチェックの誤検知を低減', '文体・表記ルールの精緻化', '精度のモニタリング'].map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <TrendingUp style={{ width: 11, height: 11, color: PH_SHIP, strokeWidth: 2.6, flexShrink: 0 }} />
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: GRAPHITE }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 9 — 概算見積（金額 ／ 体制図 ／ 役割）                            */
/* ===================================================================== */

const roles = [
  { name: 'PM', icon: UserCheck, lead: true, duty: '全体統括・お客様窓口。スケジュール／スコープ／予算の管理と調整' },
  { name: 'テックリード', icon: Code2, lead: true, duty: '技術責任者。全体設計（AWS・Bedrock・精度方針）と技術判断、コードレビュー' },
  { name: 'フロントエンジニア', icon: LayoutDashboard, duty: 'レビューUI（承認画面）とダッシュボードなど画面まわりの開発' },
  { name: 'バックエンドエンジニア', icon: Database, duty: 'データ収集・前処理・AI連携（生成／チェック／RAG）など裏側の開発' },
];

/* 体制図のノード */
function OrgNode({ icon: Icon, label, on = false, wide = false }: { icon: any; label: React.ReactNode; on?: boolean; wide?: boolean }) {
  return (
    <div
      style={{
        width: wide ? '100%' : 190,
        background: on ? ACCENT_SOFT : CARD,
        border: `1.5px solid ${on ? ACCENT : LINE}`,
        borderRadius: 9,
        padding: '14px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        boxSizing: 'border-box',
      }}
    >
      <Icon style={{ width: 15, height: 15, color: on ? ACCENT_INK : GRAPHITE, strokeWidth: 1.9, flexShrink: 0 }} />
      <span style={{ fontSize: 12.5, fontWeight: 800, color: on ? ACCENT_INK : INK, textAlign: 'center', lineHeight: 1.35 }}>{label}</span>
    </div>
  );
}

function OrgLink({ h = 34 }: { h?: number }) {
  return <span style={{ width: 1.5, height: h, background: LINE }} />;
}

const Slide9 = (
  <Frame n={9}>
    <Head eyebrow="Estimate / 概算見積" title={<>概算費用と<span style={{ color: ACCENT }}>開発体制</span></>} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20, flex: 1 }}>
      {/* ============ 金額 ============ */}
      <div style={{ background: CARD, border: `1px solid ${LINE}`, borderLeft: `4px solid ${ACCENT}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.045)', padding: '16px 26px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: ACCENT_INK, fontWeight: 700, marginBottom: 8 }}>ESTIMATE / 概算見積金額</p>
          <p style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 42, fontWeight: 800, color: INK, letterSpacing: '-0.03em', lineHeight: 1 }}>850</span>
            <span style={{ fontSize: 21, fontWeight: 800, color: INK }}>万円</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: MUTE }}>（税別）</span>
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: MUTE }}>体制</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: INK }}>4名</span>
          <span style={{ width: 1, height: 16, background: LINE }} />
          {['PM', 'テックリード', 'フロント', 'バックエンド'].map((t) => (
            <span key={t} style={{ fontSize: 10.5, fontWeight: 700, color: GRAPHITE, background: '#F5F6F8', border: `1px solid ${HAIR}`, borderRadius: 999, padding: '4px 10px' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ============ 体制図 ／ 役割 ============ */}
      <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 14, flex: 1, minHeight: 0 }}>
        {/* --- 体制図 --- */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '15px 20px 16px', display: 'flex', flexDirection: 'column' }}>
          <ColHead tag="TEAM" title="開発体制" mb={12} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <OrgNode icon={UserCheck} label="PM" on />
            <OrgLink />
            <OrgNode icon={Code2} label="テックリード" on />
            <OrgLink h={20} />
            {/* 分岐（下段2枚の中心＝(100% - gap)/4 に垂線を落とす） */}
            <div style={{ position: 'relative', width: '100%', height: 26 }}>
              <span style={{ position: 'absolute', left: 'calc((100% - 14px) / 4)', right: 'calc((100% - 14px) / 4)', top: 0, height: 1.5, background: LINE }} />
              <span style={{ position: 'absolute', left: 'calc((100% - 14px) / 4)', top: 0, width: 1.5, height: 26, background: LINE }} />
              <span style={{ position: 'absolute', right: 'calc((100% - 14px) / 4)', top: 0, width: 1.5, height: 26, background: LINE }} />
            </div>
            <div style={{ display: 'flex', width: '100%', gap: 14 }}>
              <div style={{ flex: 1, display: 'flex' }}>
                <OrgNode icon={LayoutDashboard} label={<>フロント<br />エンジニア</>} wide />
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <OrgNode icon={Database} label={<>バックエンド<br />エンジニア</>} wide />
              </div>
            </div>
          </div>
        </div>

        {/* --- 役割 --- */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '15px 20px 14px', display: 'flex', flexDirection: 'column' }}>
          <ColHead tag="ROLES" title="役割と主な担当" mb={10} />
          {/* 4行で高さを等分し、パネル内に余白を残さない */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {roles.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={r.name} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, borderTop: i === 0 ? 'none' : `1px solid ${HAIR}` }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: r.lead ? ACCENT_SOFT : '#F5F6F8', border: `1px solid ${r.lead ? ACCENT : HAIR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: 14, height: 14, color: r.lead ? ACCENT_INK : GRAPHITE, strokeWidth: 1.9 }} />
                  </div>
                  <span style={{ width: 132, flexShrink: 0, fontSize: 12, fontWeight: 800, color: INK }}>{r.name}</span>
                  <span style={{ flex: 1, minWidth: 0, fontSize: 11.5, fontWeight: 500, color: GRAPHITE, lineHeight: 1.65 }}>{r.duty}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ===================================================================== */
/* SLIDE 10 — まとめ                                                      */
/*   本編（P2〜P9）で示した内容のみで構成。新しい前提は足していない        */
/* ===================================================================== */

/* ポイント1：担い手の整理（P3 の WHO DOES WHAT より） */
const summaryOwners = [
  { no: '① ② ③', label: '情報収集・記事作成・チェック', owner: 'AI', color: ACCENT },
  { no: '④', label: '承認', owner: '人', color: INK },
  { no: '⑤', label: '公開', owner: 'システム', color: '#8A8F99' },
];

/* ポイント2：改善ループ（P5 より） */
const summaryLoop = ['溜める', '使う', '効く'];

/* ポイント3：フェーズ（P7・P8 より） */
const summaryPhases = [
  { ph: 'フェーズ1', name: '今回の開発', color: PH_DEV, bg: PH_DEV_BG, now: true },
  { ph: 'フェーズ2', name: 'チューニング', color: PH_SHIP, bg: PH_SHIP_BG },
  { ph: 'フェーズ3', name: 'エンハンス', color: PH_PREP, bg: PH_PREP_BG },
];

const summaryKpis = [
  { en: 'RELEASE', label: '本番リリース', value: '9月末', unit: '', note: '8月1週目の着手を前提', color: PH_SHIP },
  { en: 'COST', label: '概算費用', value: '850', unit: '万円', note: '税別', color: ACCENT },
  { en: 'TEAM', label: '開発体制', value: '4', unit: '名', note: 'PM／テックリード／フロント／バックエンド', color: INK },
];

const Slide10 = (
  <Frame n={10}>
    <Head eyebrow="Summary / まとめ" title={<>収集から承認までを自動化し、<span style={{ color: ACCENT }}>9月末</span>に本番リリース</>} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20, flex: 1 }}>
      {/* ============ 3つのポイント ============ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, flex: 1, minHeight: 0 }}>
        {/* --- 01 一気通貫で自動化 --- */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderTop: `3px solid ${ACCENT}`, borderRadius: 9, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '15px 18px 16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
            <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', fontWeight: 700, color: ACCENT_INK, background: ACCENT_SOFT, borderRadius: 3, padding: '3px 8px' }}>01</span>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: INK }}>一気通貫で自動化</span>
          </div>
          <p style={{ fontSize: 11.5, color: GRAPHITE, fontWeight: 500, lineHeight: 1.7 }}>
            人手に依存していた5工程のうち、<strong style={{ color: INK, fontWeight: 800 }}>収集・作成・チェックをAI</strong>が担い、
            <strong style={{ color: INK, fontWeight: 800 }}>承認は人</strong>が行って品質を担保します。
          </p>
          {/* 3行で残り高さを等分し、カード内に空白を残さない */}
          <div style={{ flex: 1, minHeight: 0, marginTop: 13, display: 'flex', flexDirection: 'column' }}>
            {summaryOwners.map((r) => (
              <div key={r.no} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 9, borderTop: `1px solid ${HAIR}` }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                <span style={{ fontSize: 10, color: MUTE, fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0 }}>{r.no}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: GRAPHITE, flex: 1, minWidth: 0 }}>{r.label}</span>
                <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 700, color: r.color, background: r.color === ACCENT ? ACCENT_SOFT : '#F2F3F5', borderRadius: 3, padding: '3px 7px', flexShrink: 0 }}>{r.owner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- 02 使うほど精度が上がる --- */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderTop: `3px solid ${PH_SHIP}`, borderRadius: 9, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '15px 18px 16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
            <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', fontWeight: 700, color: PH_SHIP, background: PH_SHIP_BG, borderRadius: 3, padding: '3px 8px' }}>02</span>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: INK }}>使うほど精度が上がる</span>
          </div>
          <p style={{ fontSize: 11.5, color: GRAPHITE, fontWeight: 500, lineHeight: 1.7 }}>
            人の<strong style={{ color: INK, fontWeight: 800 }}>修正データを溜めて再学習</strong>。誤検知の低減や文体・表記ルールの精緻化を続け、人の作業は修正から承認へ寄っていきます。
          </p>
          <div style={{ flex: 1, minHeight: 0, marginTop: 13, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {summaryLoop.map((t, i, arr) => (
                <div key={t} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: 1, background: PH_SHIP_BG, border: `1px solid ${PH_SHIP}`, borderRadius: 6, padding: '13px 2px', textAlign: 'center' }}>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: PH_SHIP }}>{t}</span>
                  </div>
                  {i < arr.length - 1 && <ArrowRight style={{ width: 12, height: 12, color: FAINT, strokeWidth: 2, flexShrink: 0, margin: '0 3px' }} />}
                </div>
              ))}
            </div>
            {/* 03 → 01 に戻る */}
            <div style={{ position: 'relative', height: 16, margin: '0 22px' }}>
              <div style={{ position: 'absolute', inset: 0, borderLeft: `1.5px solid ${LINE}`, borderRight: `1.5px solid ${LINE}`, borderBottom: `1.5px solid ${LINE}`, borderRadius: '0 0 7px 7px' }} />
              <ArrowUp style={{ position: 'absolute', top: -6, left: -6.5, width: 12, height: 12, color: FAINT, strokeWidth: 2.4 }} />
              <span style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)', background: CARD, padding: '0 8px', fontSize: 9.5, color: MUTE, fontWeight: 700, whiteSpace: 'nowrap' }}>
                修正データがまた溜まる
              </span>
            </div>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, fontSize: 11.5, fontWeight: 800, color: INK }}>
              人の作業は
              <span style={{ fontSize: 11, fontWeight: 700, color: MUTE, background: '#F5F6F8', borderRadius: 4, padding: '4px 10px' }}>修正</span>
              <ArrowRight style={{ width: 12, height: 12, color: FAINT, strokeWidth: 2.4 }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: PH_SHIP, background: PH_SHIP_BG, borderRadius: 4, padding: '4px 10px' }}>承認</span>
              へ
            </p>
          </div>
        </div>

        {/* --- 03 段階的に広げる --- */}
        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderTop: `3px solid ${PH_PREP}`, borderRadius: 9, boxShadow: '0 2px 8px rgba(15,17,21,0.04)', padding: '15px 18px 16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
            <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', fontWeight: 700, color: PH_PREP, background: PH_PREP_BG, borderRadius: 3, padding: '3px 8px' }}>03</span>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: INK }}>段階的に広げる</span>
          </div>
          <p style={{ fontSize: 11.5, color: GRAPHITE, fontWeight: 500, lineHeight: 1.7 }}>
            まずは<strong style={{ color: INK, fontWeight: 800 }}>フェーズ1で単一ソースの一気通貫</strong>を作り、9月末に本番リリース。以降はチューニングとエンハンス開発を継続します。
          </p>
          <div style={{ flex: 1, minHeight: 0, marginTop: 13, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {summaryPhases.map((p) => (
              <div key={p.ph} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 9, background: p.now ? p.bg : CARD, border: `1px solid ${p.now ? p.color : LINE}`, borderRadius: 6, padding: '0 12px' }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: p.color, flexShrink: 0 }} />
                <span style={{ fontSize: 10.5, fontWeight: 800, color: p.color, flexShrink: 0 }}>{p.ph}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: GRAPHITE, flex: 1, minWidth: 0 }}>{p.name}</span>
                {p.now && <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, color: '#fff', background: ACCENT, borderRadius: 3, padding: '2px 7px', flexShrink: 0 }}>今回</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ 要点（数字） ============ */}
      <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 2px 8px rgba(15,17,21,0.045)', padding: '20px 8px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', flexShrink: 0 }}>
        {summaryKpis.map((k, i) => (
          <div key={k.en} style={{ padding: '0 22px', borderLeft: i === 0 ? 'none' : `1px solid ${HAIR}` }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: MUTE, fontWeight: 700 }}>{k.en}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: GRAPHITE }}>{k.label}</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: k.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</span>
              {k.unit && <span style={{ fontSize: 15, fontWeight: 800, color: k.color }}>{k.unit}</span>}
            </p>
            <p style={{ fontSize: 10.5, color: MUTE, fontWeight: 600, marginTop: 7, lineHeight: 1.5 }}>{k.note}</p>
          </div>
        ))}
      </div>

      {/* ============ 締め ============ */}
      <div style={{ background: CARD, border: `1px solid ${LINE}`, borderLeft: `3px solid ${ACCENT}`, borderRadius: 6, padding: '13px 20px', flexShrink: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: GRAPHITE, lineHeight: 1.6 }}>
          AIが<strong style={{ color: INK, fontWeight: 800 }}>収集・作成・チェック</strong>を担い、人は<strong style={{ color: INK, fontWeight: 800 }}>承認に集中</strong>。
          運用のなかで<strong style={{ color: ACCENT, fontWeight: 800 }}>精度が上がり続ける仕組み</strong>を、フェーズ1から順に作っていきます。
        </p>
      </div>
    </div>
  </Frame>
);

export const wealthadvisorV2Presentation: PresentationEntry = {
  meta: {
    id: 'wealthadvisor-ai-2026-v2',
    title: '投資信託レポート／ニュース記事 AI自動生成システム ご提案',
    description:
      'ウェルスアドバイザー社向け（全10枚）。収集・生成・チェックをAIで自動化し、承認は人が担保する仕組みのご提案。現状の課題／機械学習による精度向上／開発スケジュール（9月末リリース）／フェーズ1〜3のロードマップ／概算見積850万円・4名体制 まで収録。',
    thumbnail: `linear-gradient(135deg, ${PAPER} 0%, ${ACCENT_SOFT} 55%, ${ACCENT} 130%)`,
    author: 'Meece株式会社',
    createdAt: '2026-07-26',
  },
  slides: [
    Slide1, // 1  表紙
    Slide2, // 2  概要
    Slide3, // 3  現状と課題解決
    Slide4, // 4  その他AIを活用した開発
    Slide5, // 5  機械学習についてのまとめ
    Slide6, // 6  開発スケジュール（ガントチャート）
    Slide7, // 7  9月リリース以降（ロードマップ）
    Slide8, // 8  フェーズ分けスケジュールイメージ
    Slide9,  // 9  概算見積
    Slide10, // 10 まとめ
  ],
};
