import {
  FileUp,
  FileText,
  Copy,
  ClipboardPaste,
  Download,
  RefreshCw,
  Sparkles,
  Bot,
  Brain,
  Ruler,
  DraftingCompass,
  Layers,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ImagePlus,
  MapPin,
  Wallet,
  AlertTriangle,
  Repeat,
  Gauge,
  ThumbsUp,
  ThumbsDown,
  Star,
  Zap,
  ShieldCheck,
  TrendingDown,
  Settings2,
  Cpu,
  MousePointerClick,
  ScanLine,
  Paperclip,
  Plus,
  Send,
  ZoomIn,
  Maximize2,
  Lightbulb,
} from 'lucide-react';
import type { PresentationEntry } from '../registry';

/* ============================================================
   CADCHANGE — サービス紹介プレゼン（全15枚）
   PDF図面 → DXF変換アプリ / AI連携方式のご提案を含む
   配色は Meece ブランド（ネイビー × シアン）に準拠し、
   CAD／設計図面らしい "ブループリント" 表現を採用
   ============================================================ */

const NAVY = '#0D1B3E';
const NAVY_2 = '#142a5c';
const BLUE = '#3182CE';
const CYAN = '#00FBFF';
const CYAN_T = '#0891B2';
const PURPLE = '#9D72FF';
const PINK = '#FF5BAE';
const TEAL = '#14B8A6';
const AMBER = '#E0A400';
const INK = '#0D1B3E';
const SUB = '#6B7280';
const BODY = '#4B5563';
const LINE = '#F0F2F5';

const SLIDE = 'w-full h-[720px] relative overflow-hidden';

/* ---------- 共通パーツ ---------- */

const Underline = () => (
  <div style={{ width: 60, height: 4, background: `linear-gradient(to right, ${CYAN}, ${PURPLE})`, borderRadius: 2 }} />
);

function Header({
  kicker,
  kickerColor = CYAN_T,
  title,
  center = false,
  mb = 32,
}: {
  kicker: string;
  kickerColor?: string;
  title: React.ReactNode;
  center?: boolean;
  mb?: number;
}) {
  return (
    <div style={{ marginBottom: mb, textAlign: center ? 'center' : 'left' }}>
      <p style={{ color: kickerColor, fontSize: 12, fontWeight: 900, letterSpacing: '0.3em', marginBottom: 12 }}>{kicker}</p>
      <h2 style={{ fontSize: 38, fontWeight: 900, color: INK, marginBottom: 16, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{title}</h2>
      <div style={{ display: 'flex', justifyContent: center ? 'center' : 'flex-start' }}>
        <Underline />
      </div>
    </div>
  );
}

/* ---------- 図面モック ---------- */

/** L字曲げ板金部品の展開図モック（実図面の読み取り例に準拠）
    mode: pdf（紙）/ dxf（CADビュワー）、simple: 基本変換のみ（外形と穴だけ） */
function DrawingSvg({ mode, simple, width = '100%', height = '100%' }: { mode: 'pdf' | 'dxf'; simple?: boolean; width?: number | string; height?: number | string }) {
  const stroke = mode === 'pdf' ? '#334155' : CYAN;
  const thin = mode === 'pdf' ? '#94A3B8' : 'rgba(0,251,255,0.5)';
  const dim = mode === 'pdf' ? '#64748B' : '#7DD3FC';
  const bend = mode === 'pdf' ? '#B45309' : '#FBBF24';

  // 実寸(mm) → px。展開全長 34.4 × 高さ 102、板厚 t1.0
  const PX = 150;
  const PY = 22;
  const PH = 160;
  const k = PH / 102;
  const PW = 34.4 * k;
  const bx = PX + 16 * k; // 左フランジ16幅 ／ 右フランジ20幅 の境界＝曲げ線
  const mx = (x: number) => PX + x * k;
  const my = (y: number) => PY + PH - y * k;
  const holes = [
    { x: 12, y: 86.75 },
    { x: 12, y: 15.25 },
    { x: 29.4, y: 94 },
    { x: 29.4, y: 8 },
  ];

  return (
    <svg viewBox="0 0 360 220" style={{ width, height, display: 'block' }} preserveAspectRatio="xMidYMid meet">
      {/* 外形（展開ブランク） */}
      <rect x={PX} y={PY} width={PW} height={PH} rx="5" fill="none" stroke={stroke} strokeWidth="2" />
      {/* 穴 4-φ4.8 */}
      {holes.map((h, i) => (
        <circle key={i} cx={mx(h.x)} cy={my(h.y)} r="3.6" fill="none" stroke={stroke} strokeWidth="1.6" />
      ))}

      {simple ? null : (
        <>
          {/* 曲げ線（BENDレイヤー） */}
          <line x1={bx} y1={PY} x2={bx} y2={PY + PH} stroke={bend} strokeWidth="1.4" strokeDasharray="9 3 2 3" />
          <line x1={bx} y1="118" x2="238" y2="132" stroke={dim} strokeWidth="0.8" />
          <text x="240" y="135" fontSize="8" fill={bend} fontWeight="700">曲げ 90°</text>

          {/* 穴の中心線 */}
          {holes.map((h, i) => (
            <g key={`c${i}`}>
              <line x1={mx(h.x) - 7} y1={my(h.y)} x2={mx(h.x) + 7} y2={my(h.y)} stroke={thin} strokeWidth="0.7" strokeDasharray="5 2 1 2" />
              <line x1={mx(h.x)} y1={my(h.y) - 7} x2={mx(h.x)} y2={my(h.y) + 7} stroke={thin} strokeWidth="0.7" strokeDasharray="5 2 1 2" />
            </g>
          ))}

          {/* 全幅 34.4（上） */}
          <line x1={PX} y1="12" x2={PX + PW} y2="12" stroke={dim} strokeWidth="1" />
          <path d={`M${PX} 12 l6 -2.5 v5 z`} fill={dim} />
          <path d={`M${PX + PW} 12 l-6 -2.5 v5 z`} fill={dim} />
          <line x1={PX} y1="8" x2={PX} y2={PY} stroke={dim} strokeWidth="0.7" />
          <line x1={PX + PW} y1="8" x2={PX + PW} y2={PY} stroke={dim} strokeWidth="0.7" />
          <text x={PX + PW / 2} y="8" textAnchor="middle" fontSize="8.5" fill={dim} fontWeight="700">34.4</text>

          {/* 全高 102（左） */}
          <line x1="134" y1={PY} x2="134" y2={PY + PH} stroke={dim} strokeWidth="1" />
          <path d={`M134 ${PY} l-2.5 6 h5 z`} fill={dim} />
          <path d={`M134 ${PY + PH} l-2.5 -6 h5 z`} fill={dim} />
          <line x1="130" y1={PY} x2={PX} y2={PY} stroke={dim} strokeWidth="0.7" />
          <line x1="130" y1={PY + PH} x2={PX} y2={PY + PH} stroke={dim} strokeWidth="0.7" />
          <text x="128" y="102" textAnchor="middle" fontSize="8.5" fill={dim} fontWeight="700" transform="rotate(-90 128 102)">102</text>

          {/* フランジ幅 16 / 20（下） */}
          <line x1={PX} y1="192" x2={bx} y2="192" stroke={dim} strokeWidth="0.9" />
          <line x1={bx} y1="192" x2={PX + PW} y2="192" stroke={dim} strokeWidth="0.9" />
          {[PX, bx, PX + PW].map((x) => (
            <line key={x} x1={x} y1={PY + PH} x2={x} y2="196" stroke={dim} strokeWidth="0.7" />
          ))}
          <text x={(PX + bx) / 2} y="202" textAnchor="middle" fontSize="7.5" fill={dim} fontWeight="700">16</text>
          <text x={(bx + PX + PW) / 2} y="202" textAnchor="middle" fontSize="7.5" fill={dim} fontWeight="700">20</text>

          {/* 穴の引出線 */}
          <line x1={mx(29.4) + 4} y1={my(94)} x2="256" y2="40" stroke={dim} strokeWidth="0.8" />
          <text x="258" y="38" fontSize="8.5" fill={dim} fontWeight="700">4-φ4.8</text>

          {/* 注記 */}
          <text x="16" y="40" fontSize="8" fill={dim} fontWeight="700">板厚  t1.0</text>
          <text x="16" y="55" fontSize="8" fill={dim} fontWeight="700">曲げ  90° × 1</text>
          <text x="16" y="70" fontSize="8" fill={dim} fontWeight="700">展開  34.4 × 102</text>
          <text x="16" y="85" fontSize="8" fill={dim} fontWeight="700">穴    4-φ4.8</text>

          {/* 表題欄 */}
          <rect x="248" y="160" width="98" height="34" fill="none" stroke={thin} strokeWidth="1" />
          <line x1="248" y1="177" x2="346" y2="177" stroke={thin} strokeWidth="0.8" />
          <line x1="308" y1="160" x2="308" y2="194" stroke={thin} strokeWidth="0.8" />
          <text x="253" y="172" fontSize="7" fill={dim}>L-BRACKET</text>
          <text x="253" y="189" fontSize="7" fill={dim}>SCALE 1:2</text>
          <text x="313" y="172" fontSize="7" fill={dim}>A3</text>
          <text x="313" y="189" fontSize="7" fill={dim}>REV.02</text>
        </>
      )}
    </svg>
  );
}

/* ---------- AIプロンプト文 / AI出力（実際の書式に準拠） ---------- */

/** CADCHANGEが自動生成するプロンプト文 */
const PROMPT_LINES: { t: string; head?: boolean; accent?: boolean }[] = [
  { t: '# 役割', head: true },
  { t: 'あなたは板金図面の読み取りの専門家です。' },
  { t: '# 依頼', head: true },
  { t: '添付の図面PDFを解析し、DXF展開図を作成する' },
  { t: 'ための設定値を、下記の書式で出力してください。' },
  { t: '# 出力書式', head: true },
  { t: '形状分類 / 板厚 / 明示外形 / 曲げ展開', accent: true },
  { t: '穴: x=, y=, φ=   ← 1行につき1穴', accent: true },
  { t: '確定できない項目は末尾に # 要確認 を付ける', accent: true },
];

/** AIが返してくる設定値（JSONではなく、行単位の構造化テキスト） */
const AI_OUTPUT_LINES: string[] = [
  '形状分類: L（曲げ1本）',
  '板厚: 1.0',
  '明示外形: 全高=102, 全幅=20',
  '穴総数: 4 / 開口総数: 0',
  '曲げ展開: 軸=X, フランジ=16;20, 角度=90, 幅=102',
  '展開全長 = 16 + 20 − 1.6(t1.0伸びしろ) = 34.4',
  '穴: x=12,   y=86.75, φ=4.8   # 左フランジ上穴',
  '穴: x=12,   y=15.25, φ=4.8   # 左フランジ下穴',
  '穴: x=29.4, y=94,    φ=4.8   # 右フランジ上穴',
  '穴: x=29.4, y=8,     φ=4.8   # 右フランジ下穴',
  '2-R3=左フランジ上部タブ隅 / 3-R3=右フランジ隅',
  '曲げ方向は矢視/断面で確定できず   # 要確認',
];

/** 行内の「# コメント」を淡色で描き分ける1行 */
function CodeLine({ t, size = 8, dark = true }: { t: string; size?: number; dark?: boolean }) {
  const i = t.indexOf('#');
  const main = i >= 0 ? t.slice(0, i) : t;
  const note = i >= 0 ? t.slice(i) : '';
  return (
    <p style={{ fontSize: size, lineHeight: 1.62, fontFamily: 'ui-monospace, monospace', whiteSpace: 'pre' }}>
      <span style={{ color: dark ? 'rgba(0,251,255,0.85)' : '#475569' }}>{main}</span>
      {note && <span style={{ color: dark ? 'rgba(255,255,255,0.4)' : '#A9B2BF' }}>{note}</span>}
    </p>
  );
}

/** PDF図面プレビュー（紙のカード表現） */
function PdfPreview({ h = 190 }: { h?: number }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #E2E8F0', height: h, padding: 10, boxShadow: '0 8px 24px rgba(13,27,62,0.08)' }}>
      <DrawingSvg mode="pdf" />
    </div>
  );
}

/** DXFビュワー（CADらしい黒背景） */
function DxfViewer({ h = 190, markers, simple }: { h?: number | string; markers?: { x: number; y: number; n: number }[]; simple?: boolean }) {
  return (
    <div style={{ position: 'relative', background: '#0B1220', borderRadius: 10, border: '1px solid rgba(0,251,255,0.22)', height: h, padding: 10, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '100%' }}>
        <DrawingSvg mode="dxf" simple={simple} />
      </div>
      {markers?.map((m) => (
        <div
          key={m.n}
          style={{
            position: 'absolute',
            left: `${m.x}%`,
            top: `${m.y}%`,
            transform: 'translate(-50%, -50%)',
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: PINK,
            border: '2px solid #fff',
            boxShadow: '0 4px 12px rgba(255,91,174,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 900,
            color: '#fff',
          }}
        >
          {m.n}
        </div>
      ))}
    </div>
  );
}

/* ---------- アプリ画面モック ---------- */

type HL = 'import' | 'prompt' | 'apply' | 'download' | 'review' | 'reset' | null;

const ring = (on: boolean, color = CYAN_T) =>
  on
    ? { boxShadow: `0 0 0 3px ${color}55, 0 12px 30px rgba(13,27,62,0.12)`, borderColor: color }
    : {};

function ToolbarBtn({ icon: Icon, label, tone = 'ghost', active = false }: { icon: typeof Download; label: string; tone?: 'ghost' | 'primary' | 'danger'; active?: boolean }) {
  const base =
    tone === 'primary'
      ? { background: BLUE, color: '#fff', border: `1px solid ${BLUE}` }
      : tone === 'danger'
        ? { background: '#fff', color: '#9CA3AF', border: '1px solid #E5E7EB' }
        : { background: '#fff', color: INK, border: '1px solid #E5E7EB' };
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        padding: '6px 12px',
        fontSize: 11,
        fontWeight: 800,
        whiteSpace: 'nowrap',
        ...base,
        ...(active ? { boxShadow: `0 0 0 3px ${CYAN_T}55` } : {}),
      }}
    >
      <Icon style={{ width: 12, height: 12 }} />
      {label}
    </div>
  );
}

/** CADCHANGE のアプリ画面モック（1枚で全機能が俯瞰できる構成） */
function MockApp({ hl = null, height = 400 }: { hl?: HL; height?: number }) {
  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: 14,
        overflow: 'hidden',
        background: '#F4F6F9',
        border: '1px solid #E4E8EE',
        boxShadow: '0 20px 50px rgba(13,27,62,0.12)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "-apple-system,BlinkMacSystemFont,'Hiragino Sans','Yu Gothic UI',sans-serif",
      }}
    >
      {/* ヘッダー */}
      <div style={{ height: 44, background: NAVY, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg, ${CYAN}, ${BLUE})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DraftingCompass style={{ width: 14, height: 14, color: NAVY }} />
        </div>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 900, letterSpacing: '0.08em' }}>CADCHANGE</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ borderRadius: 8, padding: 2, ...(hl === 'review' ? { boxShadow: `0 0 0 3px ${PINK}88` } : {}) }}>
            <ToolbarBtn icon={Star} label="評価入力" />
          </div>
          <div style={{ borderRadius: 8, padding: 2, ...(hl === 'download' ? { boxShadow: `0 0 0 3px ${CYAN}` } : {}) }}>
            <ToolbarBtn icon={Download} label="DXFダウンロード" tone="primary" />
          </div>
          <div style={{ borderRadius: 8, padding: 2, ...(hl === 'reset' ? { boxShadow: `0 0 0 3px ${AMBER}` } : {}) }}>
            <ToolbarBtn icon={RefreshCw} label="リセット" tone="danger" />
          </div>
        </div>
      </div>

      {/* 本体 */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* 左ペイン */}
        <div style={{ width: '42%', padding: 12, display: 'flex', flexDirection: 'column', gap: 10, borderRight: '1px solid #E4E8EE', minHeight: 0 }}>
          {/* ① 図面インポート */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #E5E9EF', padding: 10, ...ring(hl === 'import') }}>
            <p style={{ fontSize: 10, fontWeight: 900, color: CYAN_T, letterSpacing: '0.12em', marginBottom: 8 }}>① 図面インポート</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: 8, padding: '8px 10px' }}>
              <FileUp style={{ width: 14, height: 14, color: BLUE, flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 10.5, fontWeight: 800, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>L-bracket_t1.0_rev02.pdf</p>
                <p style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700 }}>読み込み完了 ・ 基本情報を抽出しました</p>
              </div>
              <CheckCircle2 style={{ width: 13, height: 13, color: TEAL, marginLeft: 'auto', flexShrink: 0 }} />
            </div>
          </div>

          {/* プロンプト文 */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #E5E9EF', padding: 10, ...ring(hl === 'prompt', PURPLE) }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <p style={{ fontSize: 10, fontWeight: 900, color: PURPLE, letterSpacing: '0.12em' }}>AIプロンプト文</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: PURPLE, color: '#fff', borderRadius: 6, padding: '4px 9px', fontSize: 9.5, fontWeight: 900 }}>
                <Copy style={{ width: 10, height: 10 }} />
                プロンプトをコピー
              </div>
            </div>
            <div style={{ background: '#0B1220', borderRadius: 7, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
              {['あなたは板金図面の読み取りの専門家です。', '添付の図面PDFを解析し、DXF展開図を作成する', 'ための設定値を、下記の書式で出力してください。', '形状分類 / 板厚 / 明示外形 / 曲げ展開 / 穴…'].map((t, i) => (
                <p key={i} style={{ fontSize: 8.5, color: i === 3 ? 'rgba(0,251,255,0.85)' : 'rgba(255,255,255,0.75)', lineHeight: 1.5, fontFamily: 'ui-monospace, monospace' }}>
                  {t}
                </p>
              ))}
            </div>
          </div>

          {/* ② AI指示入力 */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #E5E9EF', padding: 10, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, ...ring(hl === 'apply') }}>
            <p style={{ fontSize: 10, fontWeight: 900, color: CYAN_T, letterSpacing: '0.12em', marginBottom: 8 }}>② AI指示入力</p>
            <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 7, padding: '8px 10px', minHeight: 40, overflow: 'hidden' }}>
              {AI_OUTPUT_LINES.slice(0, 4).map((t, i) => (
                <CodeLine key={i} t={t} size={8.5} dark={false} />
              ))}
            </div>
            <div
              style={{
                marginTop: 8,
                background: `linear-gradient(90deg, ${NAVY}, ${BLUE})`,
                color: '#fff',
                borderRadius: 8,
                padding: '8px 10px',
                fontSize: 10.5,
                fontWeight: 900,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Zap style={{ width: 12, height: 12, color: CYAN }} />
              指示を適用してDXFを更新
            </div>
          </div>
        </div>

        {/* 右ペイン: DXFビュワー */}
        <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Layers style={{ width: 12, height: 12, color: INK }} />
            <span style={{ fontSize: 10.5, fontWeight: 900, color: INK }}>DXFビュワー</span>
            <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 800, color: '#94A3B8' }}>L-bracket_t1.0_rev02.dxf</span>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <DxfViewer h="100%" markers={hl === 'review' ? [{ x: 46, y: 34, n: 1 }, { x: 55, y: 66, n: 2 }] : undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 機能スライド共通レイアウト ----------
   スライドを捲っても画面モックの位置・サイズがズレないよう、
   ヘッダーの余白と本文行の高さを完全に固定する               */

const FEATURE_ROW_H = 424;

function FeatureSlide({
  bg,
  kicker,
  kickerColor,
  title,
  hl,
  children,
}: {
  bg: string;
  kicker: string;
  kickerColor?: string;
  title: React.ReactNode;
  hl: HL;
  children: React.ReactNode;
}) {
  return (
    <div className={SLIDE} style={{ background: bg }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 72px', boxSizing: 'border-box' }}>
        <Header kicker={kicker} kickerColor={kickerColor} title={title} mb={22} />
        <div style={{ display: 'flex', gap: 28, height: FEATURE_ROW_H }}>
          <div style={{ flex: 1.45, minWidth: 0 }}>
            <MockApp hl={hl} height={FEATURE_ROW_H} />
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ===== SLIDE 1: 表紙 ===== */
const Slide1 = (
  <div key="s1" className={SLIDE} style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_2} 55%, #1E3A8A 100%)` }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 84% 18%, rgba(0,251,255,0.16) 0%, transparent 48%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 8% 88%, rgba(157,114,255,0.16) 0%, transparent 45%)' }} />

    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', padding: '0 80px', boxSizing: 'border-box', gap: 56 }}>
      <div style={{ flex: 1.15 }}>
        <div
          className="inline-flex items-center gap-2 w-fit"
          style={{ borderRadius: 100, padding: '8px 18px', marginBottom: 28, background: 'rgba(0,251,255,0.08)', border: '1px solid rgba(0,251,255,0.3)' }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: CYAN }} />
          <span style={{ color: CYAN, fontSize: 12, fontWeight: 900, letterSpacing: '0.18em' }}>PDF DRAWING → DXF CONVERTER</span>
        </div>

        <h1 style={{ fontSize: 76, fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '0.02em', marginBottom: 20 }}>
          CAD<span style={{ background: `linear-gradient(90deg, ${CYAN}, ${PURPLE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CHANGE</span>
        </h1>

        <p style={{ color: '#fff', fontSize: 24, fontWeight: 800, lineHeight: 1.6, marginBottom: 18 }}>
          図面のPDFを読み込み、DXFへ。
        </p>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, lineHeight: 1.95, maxWidth: 520, marginBottom: 34 }}>
          設定値を入力すれば、より詳細な反映も。
          <br />
          その設定値そのものを、AIが自動で組み立てます。
        </p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: ScanLine, label: 'PDF図面を解析', c: CYAN },
            { icon: Brain, label: 'AIが設定値を作成', c: PURPLE },
            { icon: Download, label: 'DXFで出力', c: PINK },
          ].map(({ icon: Icon, label, c }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2"
              style={{ borderRadius: 100, padding: '10px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}
            >
              <Icon className="w-4 h-4" style={{ color: c }} />
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 右: PDF → DXF ビジュアル */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', marginBottom: 10, textAlign: 'center' }}>INPUT / PDF</p>
          <PdfPreview h={168} />
        </div>
        <ArrowRight style={{ width: 28, height: 28, color: CYAN, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 900, color: CYAN, letterSpacing: '0.2em', marginBottom: 10, textAlign: 'center' }}>OUTPUT / DXF</p>
          <DxfViewer h={168} />
        </div>
      </div>
    </div>

    <div style={{ position: 'absolute', bottom: 32, right: 80, zIndex: 1, textAlign: 'right' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700 }}>Meece株式会社</p>
    </div>
  </div>
);

/* ===== SLIDE 2: 概要 ===== */
const Slide2 = (
  <div key="s2" className={SLIDE} style={{ background: '#F8F9FB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 80px', boxSizing: 'border-box' }}>
      <Header kicker="OVERVIEW" title={<>CADCHANGEとは。</>} center />

      <p style={{ textAlign: 'center', color: BODY, fontSize: 16.5, lineHeight: 2, maxWidth: 880, margin: '0 auto 38px' }}>
        CADCHANGEは、<strong style={{ color: INK }}>図面のPDFファイルを読み込み、DXFファイルを作成するアプリ</strong>です。
        適切な設定値をシステムに入力することで、より詳細な反映もできます。さらに、その設定値は<strong style={{ color: INK }}>AIを使って自動的に作る</strong>ことができます。
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
          {
            icon: FileText,
            no: '01',
            title: 'PDFから、DXFへ',
            desc: '図面PDFをインポートするだけ。内容を読み取り、DXFファイルとして出力します。',
            bg: '#ECFEFF',
            c: CYAN_T,
          },
          {
            icon: Settings2,
            no: '02',
            title: '設定値で、より詳細に',
            desc: '適切な設定値を入力すれば、寸法・穴位置・レイヤーまで、より詳細な反映ができます。',
            bg: '#EFF6FF',
            c: BLUE,
          },
          {
            icon: Brain,
            no: '03',
            title: 'その設定値を、AIが作る',
            desc: '図面から設定値を作るためのプロンプトを自動生成。AIの回答を貼り付けるだけで反映されます。',
            bg: '#F5F3FF',
            c: PURPLE,
          },
        ].map(({ icon: Icon, no, title, desc, bg, c }) => (
          <div key={no} style={{ background: '#fff', borderRadius: 26, border: `1px solid ${LINE}`, padding: '34px 30px', boxShadow: '0 14px 40px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ width: 54, height: 54, borderRadius: 16, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon className="w-6 h-6" style={{ color: c }} />
              </div>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#EDEFF2' }}>{no}</span>
            </div>
            <h3 style={{ fontSize: 19, fontWeight: 900, color: INK, marginBottom: 12 }}>{title}</h3>
            <p style={{ fontSize: 13.5, color: SUB, lineHeight: 1.95 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ===== SLIDE 3: 画面全体像 ===== */
const Slide3 = (
  <FeatureSlide key="s3" bg="#fff" kicker="SCREEN" title="1画面で、読み込みから出力・評価まで。" hl={null}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
            { icon: FileUp, title: '① 図面インポート', desc: 'PDFを読み込み、基本情報を抽出。', c: CYAN_T },
            { icon: Copy, title: 'AIプロンプト文', desc: 'ワンクリックでコピーできます。', c: PURPLE },
            { icon: ClipboardPaste, title: '② AI指示入力', desc: 'AIの結果を貼り付けて、DXFへ反映。', c: BLUE },
            { icon: Layers, title: 'DXFビュワー', desc: '反映結果をその場で確認できます。', c: TEAL },
            { icon: Star, title: '評価入力', desc: '結果を評価し、システムの学習に。', c: PINK },
          ].map(({ icon: Icon, title, desc, c }) => (
            <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#F9FAFB', borderRadius: 16, padding: '14px 18px' }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 16px rgba(0,0,0,0.05)' }}>
                <Icon className="w-4 h-4" style={{ color: c }} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 900, color: INK, marginBottom: 3 }}>{title}</p>
                <p style={{ fontSize: 12, color: SUB, lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
      ))}
    </div>
  </FeatureSlide>
);

/* ===== SLIDE 4: 機能① 図面読み込み ===== */
const Slide4 = (
  <FeatureSlide key="s4" bg="#F8F9FB" kicker="FEATURE 01" title="図面読み込み — PDFを、インポートするだけ。" hl="import">
    <p style={{ color: BODY, fontSize: 14.5, lineHeight: 1.95, marginBottom: 18 }}>
      図面（PDF）をインポートすることができます。インポートされたPDFの内容を読み取り、
      <strong style={{ color: INK }}>基本情報の読み込み</strong>と、
      <strong style={{ color: INK }}>AIに貼り付けるプロンプト文の作成</strong>を行います。
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { icon: FileUp, t: 'PDFをインポート', d: '対象の図面ファイルを選ぶだけ。' },
        { icon: ScanLine, t: '内容を読み取り', d: '図面から基本情報を自動で抽出。' },
        { icon: MessageSquare, t: 'プロンプト文を自動生成', d: '読み取った内容をもとに、AI用の指示文を作成。' },
      ].map(({ icon: Icon, t, d }) => (
        <div key={t} style={{ background: '#fff', borderRadius: 18, border: `1px solid ${LINE}`, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#ECFEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon className="w-4 h-4" style={{ color: CYAN_T }} />
          </div>
          <div>
            <p style={{ fontSize: 14.5, fontWeight: 900, color: INK, marginBottom: 5 }}>{t}</p>
            <p style={{ fontSize: 12.5, color: SUB, lineHeight: 1.7 }}>{d}</p>
          </div>
        </div>
      ))}
    </div>
  </FeatureSlide>
);

/* ===== SLIDE 5: 機能② AIプロンプト文作成 ===== */
const Slide5 = (
  <FeatureSlide key="s5" bg="#fff" kicker="FEATURE 02" kickerColor={PURPLE} title="AIプロンプト文作成 — ワンクリックで、コピー。" hl="prompt">
    <p style={{ color: BODY, fontSize: 14.5, lineHeight: 1.95, marginBottom: 20 }}>
      読み取った図面から、AIで設定値を作成するための<strong style={{ color: INK }}>プロンプト文</strong>を作成します。
      「プロンプトをコピー」ボタンをクリックすると、作成されたプロンプト文をワンクリックでコピーできます。
    </p>

    <div style={{ background: NAVY, borderRadius: 22, padding: '26px 26px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 88% 10%, rgba(157,114,255,0.22) 0%, transparent 58%)' }} />
      <div style={{ position: 'relative' }}>
        <p style={{ fontSize: 11, fontWeight: 900, color: PURPLE, letterSpacing: '0.18em', marginBottom: 14 }}>ONE CLICK COPY</p>
        <h4 style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1.55, marginBottom: 18 }}>
          プロンプトを、
          <br />
          書く必要はありません。
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {['図面の内容に合わせて自動生成', 'AIに貼り付けるだけの完成形', 'クリック1回でクリップボードへ'].map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 className="w-4 h-4" style={{ color: CYAN, flexShrink: 0 }} />
              <span style={{ fontSize: 13.5, fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </FeatureSlide>
);

/* ===== SLIDE 6: 機能③ AI反映 ===== */
const Slide6 = (
  <FeatureSlide key="s6" bg="#F8F9FB" kicker="FEATURE 03" kickerColor={BLUE} title="AI反映 — 貼り付けて、ボタンを1回。" hl="apply">
    <p style={{ color: BODY, fontSize: 14.5, lineHeight: 1.95, marginBottom: 20 }}>
      外部AIにて作成された設定情報を貼り付け、
      <strong style={{ color: INK }}>「指示を適用してDXFを更新」</strong>ボタンをクリックすると、設定値が反映されます。
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[
        { n: '1', icon: ClipboardPaste, t: 'AIの結果を「② AI指示入力」に貼り付け', c: BLUE },
        { n: '2', icon: Zap, t: '「指示を適用してDXFを更新」をクリック', c: CYAN_T },
        { n: '3', icon: Layers, t: 'DXFビュワーに、その場で反映', c: TEAL },
      ].map(({ n, icon: Icon, t, c }) => (
        <div key={n} style={{ background: '#fff', borderRadius: 16, border: `1px solid ${LINE}`, padding: '15px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: c, color: '#fff', fontSize: 13, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {n}
          </div>
          <Icon className="w-4 h-4" style={{ color: c, flexShrink: 0 }} />
          <p style={{ fontSize: 13.5, fontWeight: 800, color: INK, lineHeight: 1.6 }}>{t}</p>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 16, background: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: 16, padding: '15px 20px' }}>
      <p style={{ fontSize: 12.5, color: '#1E40AF', lineHeight: 1.8 }}>
        入力された設定値の分だけ、DXFはより忠実になります。納得いくまで、貼り替えて更新することもできます。
      </p>
    </div>
  </FeatureSlide>
);

/* ===== SLIDE 7: 機能④ DXFダウンロード / ⑥ リセット ===== */
const Slide7 = (
  <FeatureSlide key="s7" bg="#fff" kicker="FEATURE 04 / 05" kickerColor={TEAL} title="DXFダウンロードと、リセット。" hl="download">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY}, #1E3A8A)`, borderRadius: 22, padding: '24px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 85% 15%, rgba(0,251,255,0.2) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ width: 44, height: 44, borderRadius: 13, background: 'rgba(0,251,255,0.12)', border: '1px solid rgba(0,251,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Download className="w-5 h-5" style={{ color: CYAN }} />
          </div>
          <h4 style={{ fontSize: 18.5, fontWeight: 900, color: '#fff', marginBottom: 11 }}>DXFファイルダウンロード</h4>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.85 }}>
            「DXFダウンロード」をクリックすると、設定した内容を反映したDXFファイルがPCにダウンロードされます。
          </p>
        </div>
      </div>

      <div style={{ background: '#FFFBEB', borderRadius: 22, border: '1px solid #FDE68A', padding: '24px 24px' }}>
        <div style={{ width: 44, height: 44, borderRadius: 13, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <RefreshCw className="w-5 h-5" style={{ color: AMBER }} />
        </div>
        <h4 style={{ fontSize: 18.5, fontWeight: 900, color: INK, marginBottom: 11 }}>リセット</h4>
        <p style={{ fontSize: 13, color: '#7A5C00', lineHeight: 1.85 }}>
          「リセット」をクリックすると内容がリセットされ、最初から始められます。次の図面へ、すぐ移れます。
        </p>
      </div>
    </div>
  </FeatureSlide>
);

/* ===== SLIDE 8: 機能⑤ 評価 → 学習 ===== */
const Slide8 = (
  <div key="s8" className={SLIDE} style={{ background: '#F8F9FB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 72px', boxSizing: 'border-box' }}>
      <Header kicker="FEATURE 06" kickerColor={PINK} title="評価 → 学習 — 使うほど、賢くなる。" mb={22} />

      <div style={{ display: 'flex', gap: 26, alignItems: 'stretch' }}>
        {/* 左: 評価入力モーダルのモック */}
        <div style={{ flex: 1.15, background: '#fff', borderRadius: 20, border: `1px solid ${LINE}`, padding: 18, boxShadow: '0 16px 44px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Star style={{ width: 14, height: 14, color: PINK }} />
            <span style={{ fontSize: 12.5, fontWeight: 900, color: INK }}>評価入力</span>
          </div>

          {/* OK / NG */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1, borderRadius: 10, padding: '11px 0', textAlign: 'center', background: '#ECFDF5', border: `2px solid ${TEAL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <CheckCircle2 style={{ width: 15, height: 15, color: TEAL }} />
              <span style={{ fontSize: 14, fontWeight: 900, color: '#047857' }}>OK</span>
            </div>
            <div style={{ flex: 1, borderRadius: 10, padding: '11px 0', textAlign: 'center', background: '#F9FAFB', border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <XCircle style={{ width: 15, height: 15, color: '#9CA3AF' }} />
              <span style={{ fontSize: 14, fontWeight: 900, color: '#9CA3AF' }}>NG</span>
            </div>
          </div>

          {/* コメント */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <ThumbsUp style={{ width: 11, height: 11, color: TEAL }} />
                <span style={{ fontSize: 10, fontWeight: 900, color: TEAL }}>良かった点</span>
              </div>
              <p style={{ fontSize: 10.5, color: '#475569', lineHeight: 1.6 }}>展開全長と4穴の位置が、図面どおりに再現できていた。</p>
            </div>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <ThumbsDown style={{ width: 11, height: 11, color: PINK }} />
                <span style={{ fontSize: 10, fontWeight: 900, color: PINK }}>悪かった点</span>
              </div>
              <p style={{ fontSize: 10.5, color: '#475569', lineHeight: 1.6 }}>
                <span style={{ color: PINK, fontWeight: 900 }}>①</span> 上部タブの傾斜が未反映。
                <span style={{ color: PINK, fontWeight: 900 }}> ②</span> 曲げ方向が逆。
              </p>
            </div>
          </div>

          {/* 添付 */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: '1px dashed #CBD5E1', borderRadius: 9, padding: '9px 0', fontSize: 10.5, fontWeight: 800, color: '#64748B' }}>
              <ImagePlus style={{ width: 12, height: 12 }} />
              画像を添付
            </div>
            <div style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: PINK, borderRadius: 9, padding: '9px 0', fontSize: 10.5, fontWeight: 900, color: '#fff' }}>
              評価を送信
            </div>
          </div>
        </div>

        {/* 中央: マーカー付きDXFビュワー */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
            <MousePointerClick style={{ width: 13, height: 13, color: PINK }} />
            <span style={{ fontSize: 12, fontWeight: 900, color: INK }}>クリックしてマーカーをつける</span>
          </div>
          <div style={{ flex: 1 }}>
            <DxfViewer h="100%" markers={[{ x: 46, y: 34, n: 1 }, { x: 55, y: 66, n: 2 }]} />
          </div>
          <p style={{ fontSize: 11.5, color: SUB, lineHeight: 1.75, marginTop: 10 }}>
            マーカーをつけて、その番号をコメントに書けば、<strong style={{ color: INK }}>どこがどう違うのか</strong>を感覚的に伝えられます。
          </p>
        </div>

        {/* 右: 評価の使われ方 */}
        <div style={{ flex: 0.95, display: 'flex', flexDirection: 'column', gap: 11, justifyContent: 'center' }}>
          {[
            { icon: CheckCircle2, t: 'OK / NG で結果を入力', d: '判定はシンプルに2択で。', c: TEAL },
            { icon: MessageSquare, t: '良かった点・悪かった点', d: 'それぞれにコメントを入力できます。', c: BLUE },
            { icon: MapPin, t: 'ビュワー上にマーカー', d: 'クリックした位置に番号を付与。', c: PINK },
            { icon: ImagePlus, t: '画像の添付', d: '別途、補足画像も添付できます。', c: PURPLE },
            { icon: Brain, t: '内部システムが機械学習', d: '評価の蓄積が、次の精度を上げます。', c: CYAN_T },
          ].map(({ icon: Icon, t, d, c }) => (
            <div key={t} style={{ background: '#fff', borderRadius: 14, border: `1px solid ${LINE}`, padding: '12px 14px', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <Icon className="w-4 h-4" style={{ color: c, flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 12.5, fontWeight: 900, color: INK, marginBottom: 3 }}>{t}</p>
                <p style={{ fontSize: 11, color: SUB, lineHeight: 1.6 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ===== SLIDE 9: 機能一覧 ===== */
const Slide9 = (
  <div key="s9" className={SLIDE} style={{ background: '#fff' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 72px', boxSizing: 'border-box' }}>
      <Header kicker="FEATURES" title="機能一覧" center mb={26} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {[
          { icon: FileUp, title: '図面読み込み', desc: '図面（PDF）をインポート。内容を読み取り、基本情報の読み込みとプロンプト文の作成を行う。', c: CYAN_T, bg: '#ECFEFF' },
          { icon: Copy, title: 'AIプロンプト文作成', desc: 'AIで設定値を作るためのプロンプト文を作成。「プロンプトをコピー」でワンクリックコピー。', c: PURPLE, bg: '#F5F3FF' },
          { icon: Zap, title: 'AI反映', desc: '外部AIが作成した設定情報を貼り付け、「指示を適用してDXFを更新」で設定値を反映。', c: BLUE, bg: '#EFF6FF' },
          { icon: Download, title: 'DXFファイルダウンロード', desc: '「DXFダウンロード」で、設定内容を反映したDXFファイルをPCへダウンロード。', c: TEAL, bg: '#ECFDF5' },
          { icon: Star, title: '評価 → 学習', desc: 'OK/NG・コメント・マーカー・画像で評価を入力。内部システムが機械学習に活用。', c: PINK, bg: '#FFF1F7' },
          { icon: RefreshCw, title: 'リセット', desc: '「リセット」で内容をリセットし、最初から始められる。', c: AMBER, bg: '#FFFBEB' },
        ].map(({ icon: Icon, title, desc, c, bg }) => (
          <div key={title} style={{ background: '#F9FAFB', borderRadius: 24, padding: '26px 24px' }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Icon className="w-5 h-5" style={{ color: c }} />
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 900, color: INK, marginBottom: 10 }}>{title}</h3>
            <p style={{ fontSize: 12.5, color: SUB, lineHeight: 1.85 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ===== SLIDE 10: 使い方フロー ===== */
const flowSteps = [
  { icon: FileUp, t: '図面(PDF)をインポート', d: 'CADCHANGEに図面を読み込ませます。', c: CYAN_T },
  { icon: Copy, t: 'プロンプト文をコピー', d: '「プロンプトをコピー」をクリック。', c: CYAN_T },
  { icon: Bot, t: '別のAIを立ち上げる', d: 'Claude や Gemini などを開きます。', c: PURPLE },
  { icon: ClipboardPaste, t: 'プロンプト＋PDFを貼り付け', d: '新しいチャットに貼り、そのまま実行。', c: PURPLE },
  { icon: Copy, t: 'AIの結果をコピー', d: 'AIが処理した結果をコピーします。', c: BLUE },
  { icon: Zap, t: '「②AI指示入力」に貼り付け', d: '「指示を適用してDXFを更新」をクリック。', c: BLUE },
  { icon: Download, t: '確認してDXFダウンロード', d: '問題なければダウンロードします。', c: TEAL },
  { icon: Star, t: '評価入力', d: '評価内容を内部システムが機械学習。', c: PINK },
];

const Slide10 = (
  <div key="s10" className={SLIDE} style={{ background: '#F8F9FB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 64px', boxSizing: 'border-box' }}>
      <Header kicker="HOW TO USE" title="使い方フロー — 8ステップ。" center mb={28} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: 28, rowGap: 26 }}>
        {flowSteps.map(({ icon: Icon, t, d, c }, i) => (
          <div key={t} style={{ position: 'relative', background: '#fff', borderRadius: 20, border: `1px solid ${LINE}`, padding: '20px 18px', boxShadow: '0 10px 28px rgba(0,0,0,0.03)' }}>
            <div style={{ position: 'absolute', top: 16, right: 18, fontSize: 26, fontWeight: 900, color: '#EFF1F4' }}>0{i + 1}</div>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${c}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <Icon className="w-4 h-4" style={{ color: c }} />
            </div>
            <h4 style={{ fontSize: 13.5, fontWeight: 900, color: INK, marginBottom: 8, lineHeight: 1.45, minHeight: 39 }}>{t}</h4>
            <p style={{ fontSize: 11.5, color: SUB, lineHeight: 1.75 }}>{d}</p>

            {/* 矢印: カードとカードの間（gap）の中央に配置
                columnGap 28 / rowGap 26、バッジ 24px → はみ出し量 = (gap + badge) / 2 */}
            {i !== 3 && i !== 7 && (
              <div style={{ position: 'absolute', right: -26, top: '50%', transform: 'translateY(-50%)', zIndex: 2, width: 24, height: 24, borderRadius: '50%', background: '#fff', border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowRight style={{ width: 12, height: 12, color: '#B6BCC6' }} />
              </div>
            )}
            {i === 3 && (
              <div style={{ position: 'absolute', bottom: -25, left: '50%', transform: 'translateX(-50%)', zIndex: 2, width: 24, height: 24, borderRadius: '50%', background: '#fff', border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowDown style={{ width: 12, height: 12, color: '#B6BCC6' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 26, background: '#fff', borderRadius: 20, border: `1px solid ${LINE}`, padding: '18px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Sparkles className="w-5 h-5" style={{ color: PURPLE, flexShrink: 0 }} />
        <p style={{ fontSize: 14, color: BODY, lineHeight: 1.85 }}>
          AIに渡すのは、<strong style={{ color: INK }}>コピーしたプロンプト文</strong>と<strong style={{ color: INK }}>今回インプットした図面のPDF</strong>の2つだけ。
          あとは、そのまま実行して結果を戻すだけです。
        </p>
      </div>
    </div>
  </div>
);

/* ============================================================
   SLIDE 11〜13: 手動AI連携ウォークスルー
   実画面に近いモックに番号ピンを打ち、3ページに分けて
   1操作ずつ追えるように構成
   ============================================================ */

const FONT = "-apple-system,BlinkMacSystemFont,'Hiragino Sans','Yu Gothic UI',sans-serif";

/** ブラウザウィンドウ枠 */
function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div style={{ height: '100%', borderRadius: 14, overflow: 'hidden', border: '1px solid #DCE2EB', background: '#fff', boxShadow: '0 26px 64px rgba(13,27,62,0.16)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 30, background: '#EDF0F5', borderBottom: '1px solid #DFE4EC', display: 'flex', alignItems: 'center', padding: '0 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 5, width: 60 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#fff', border: '1px solid #E2E7EF', borderRadius: 6, padding: '3px 14px', fontSize: 9, color: '#8A93A3', fontWeight: 600, minWidth: 200, textAlign: 'center' }}>{url}</div>
        </div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}

/** 画面上に打つ番号ピン
    pos: 'tl' 左上 / 'left' 左横（要素の左に寄せる）/ 'bl' 左下 */
type PinPos = 'tl' | 'left' | 'bl';
const PIN_POS: Record<PinPos, React.CSSProperties> = {
  tl: { left: -11, top: -11 },
  left: { left: -14, top: '50%', transform: 'translateY(-50%)' },
  bl: { left: -11, bottom: -11 },
};

function Pin({ n, c, pos = 'tl' }: { n: number; c: string; pos?: PinPos }) {
  return (
    <div
      style={{
        position: 'absolute',
        ...PIN_POS[pos],
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: c,
        color: '#fff',
        fontSize: 11.5,
        fontWeight: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2.5px solid #fff',
        boxShadow: '0 4px 12px rgba(13,27,62,0.35)',
        zIndex: 5,
        fontFamily: FONT,
      }}
    >
      {n}
    </div>
  );
}

/** 番号ピン付きの枠（ハイライト） */
function Pinned({ n, c, children, style, grow, pos }: { n?: number; c?: string; children: React.ReactNode; style?: React.CSSProperties; grow?: boolean; pos?: PinPos }) {
  return (
    <div
      style={{
        position: 'relative',
        ...(grow ? { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' } : {}),
        ...(n ? { boxShadow: `0 0 0 2px ${c}`, borderRadius: 10 } : {}),
        ...style,
      }}
    >
      {n && c && <Pin n={n} c={c} pos={pos} />}
      {children}
    </div>
  );
}

function SecLabel({ icon: Icon, label, c }: { icon: typeof FileUp; label: string; c: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
      <Icon style={{ width: 11, height: 11, color: c }} />
      <span style={{ fontSize: 10, fontWeight: 900, color: c, letterSpacing: '0.06em' }}>{label}</span>
    </div>
  );
}

const CARD: React.CSSProperties = { background: '#fff', borderRadius: 10, border: '1px solid #E5E9EF', padding: 11 };

/* ---------- CADCHANGE アプリ画面（リアル版） ---------- */

function CadAppScreen({ applied, pins }: { applied: boolean; pins: 'copy' | 'apply' }) {
  const isCopy = pins === 'copy';
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F4F6F9', fontFamily: FONT }}>
      {/* アプリヘッダー */}
      <div style={{ height: 44, background: NAVY, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg, ${CYAN}, ${BLUE})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DraftingCompass style={{ width: 14, height: 14, color: NAVY }} />
        </div>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 900, letterSpacing: '0.08em' }}>CADCHANGE</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9.5, fontWeight: 700 }}>PDF図面 → DXF変換</span>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 7 }}>
          <Pinned n={!isCopy ? 5 : undefined} c={PINK} pos="bl">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, borderRadius: 8, padding: '6px 11px', fontSize: 10.5, fontWeight: 800, background: '#fff', color: applied ? INK : '#C7CDD6', border: '1px solid #E5E7EB' }}>
              <Star style={{ width: 11, height: 11 }} />
              評価入力
            </div>
          </Pinned>
          <Pinned n={!isCopy ? 4 : undefined} c={TEAL} pos="bl">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                borderRadius: 8,
                padding: '6px 11px',
                fontSize: 10.5,
                fontWeight: 800,
                background: applied ? BLUE : '#5A6C8C',
                color: applied ? '#fff' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${applied ? BLUE : '#5A6C8C'}`,
              }}
            >
              <Download style={{ width: 11, height: 11 }} />
              DXFダウンロード
            </div>
          </Pinned>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, borderRadius: 8, padding: '6px 11px', fontSize: 10.5, fontWeight: 800, background: '#fff', color: '#9CA3AF', border: '1px solid #E5E7EB' }}>
            <RefreshCw style={{ width: 11, height: 11 }} />
            リセット
          </div>
        </div>
      </div>

      {/* 本体 */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* 左パネル */}
        <div style={{ width: 306, flexShrink: 0, padding: 12, display: 'flex', flexDirection: 'column', gap: 11, borderRight: '1px solid #E4E8EE', background: '#FAFBFD', minHeight: 0 }}>
          {/* ① 図面インポート */}
          <Pinned n={isCopy ? 1 : undefined} c={CYAN_T}>
            <div style={CARD}>
              <SecLabel icon={FileUp} label="① 図面インポート" c={CYAN_T} />
              <div style={{ display: 'flex', gap: 9, alignItems: 'center', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 8, padding: 8 }}>
                <div style={{ width: 44, height: 32, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 4, padding: 2, flexShrink: 0 }}>
                  <DrawingSvg mode="pdf" simple />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: 10.5, fontWeight: 800, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>L-bracket_t1.0_rev02.pdf</p>
                  <p style={{ fontSize: 8.5, color: '#94A3B8', fontWeight: 700, marginTop: 2 }}>1ページ ・ 412 KB</p>
                </div>
                <span style={{ fontSize: 8.5, fontWeight: 900, color: '#047857', background: '#ECFDF5', borderRadius: 100, padding: '3px 7px', flexShrink: 0 }}>読込完了</span>
              </div>
            </div>
          </Pinned>

          {/* AIプロンプト文 */}
          <Pinned n={isCopy ? 3 : undefined} c={PURPLE} grow>
            <div style={{ ...CARD, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <SecLabel icon={MessageSquare} label="AIプロンプト文（自動生成）" c={PURPLE} />
              <div style={{ flex: 1, minHeight: 0, background: '#0B1220', borderRadius: 7, padding: '9px 10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {PROMPT_LINES.map((l, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: 8.5,
                      color: l.head ? 'rgba(255,255,255,0.4)' : l.accent ? 'rgba(0,251,255,0.85)' : 'rgba(255,255,255,0.82)',
                      lineHeight: 1.5,
                      fontFamily: 'ui-monospace, monospace',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {l.t}
                  </p>
                ))}
              </div>
              <Pinned n={isCopy ? 4 : undefined} c={PURPLE} style={{ marginTop: 9 }}>
                <div style={{ background: PURPLE, borderRadius: 8, padding: '9px 0', textAlign: 'center', fontSize: 11, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Copy style={{ width: 12, height: 12 }} />
                  プロンプトをコピー
                </div>
              </Pinned>
            </div>
          </Pinned>

          {/* ② AI指示入力 */}
          <Pinned n={!isCopy ? 1 : undefined} c={BLUE}>
            <div style={CARD}>
              <SecLabel icon={ClipboardPaste} label="② AI指示入力" c={applied ? CYAN_T : '#A9B2BF'} />
              {applied ? (
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 7, padding: '8px 10px', height: 56, overflow: 'hidden' }}>
                  {AI_OUTPUT_LINES.slice(0, 4).map((t, i) => (
                    <CodeLine key={i} t={t} size={8.5} dark={false} />
                  ))}
                </div>
              ) : (
                <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: 7, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontSize: 9.5, color: '#A9B2BF', fontWeight: 700 }}>AIの結果をここに貼り付け</p>
                </div>
              )}
              <Pinned n={!isCopy ? 2 : undefined} c={CYAN_T} style={{ marginTop: 9 }}>
                <div
                  style={{
                    background: applied ? `linear-gradient(90deg, ${NAVY}, ${BLUE})` : '#E7EBF1',
                    borderRadius: 8,
                    padding: '9px 0',
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 900,
                    color: applied ? '#fff' : '#A9B2BF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Zap style={{ width: 12, height: 12, color: applied ? CYAN : '#A9B2BF' }} />
                  指示を適用してDXFを更新
                </div>
              </Pinned>
            </div>
          </Pinned>
        </div>

        {/* 右: 読み取り結果 ＋ DXFビュワー */}
        <div style={{ flex: 1, minWidth: 0, padding: 12, display: 'flex', flexDirection: 'column' }}>
          <Pinned n={isCopy ? 2 : undefined} c={BLUE} style={{ marginBottom: 11 }}>
            <div style={{ background: '#fff', border: '1px solid #E5E9EF', borderRadius: 10, padding: '9px 11px' }}>
              <SecLabel icon={ScanLine} label="読み取り結果（PDFから自動抽出）" c={BLUE} />
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  ['図面名', 'L-BRACKET'],
                  ['用紙サイズ', 'A3'],
                  ['尺度', '1 : 2'],
                  ['単位', 'mm'],
                ].map(([k, v]) => (
                  <div key={k} style={{ flex: 1, background: '#F8FAFC', borderRadius: 6, padding: '6px 8px' }}>
                    <p style={{ fontSize: 8.5, color: '#94A3B8', fontWeight: 800, marginBottom: 2 }}>{k}</p>
                    <p style={{ fontSize: 10.5, color: INK, fontWeight: 900, whiteSpace: 'nowrap' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Pinned>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
            <Layers style={{ width: 12, height: 12, color: INK }} />
            <span style={{ fontSize: 11, fontWeight: 900, color: INK }}>DXFビュワー</span>
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 900,
                borderRadius: 100,
                padding: '3px 8px',
                background: applied ? '#ECFDF5' : '#FFF7ED',
                color: applied ? '#047857' : '#B45309',
              }}
            >
              {applied ? '設定値 反映済み' : '基本変換のみ（設定値なし）'}
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
              {[ZoomIn, Maximize2].map((Icon, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: 6, background: '#fff', border: '1px solid #E5E9EF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon style={{ width: 11, height: 11, color: '#8A93A3' }} />
                </div>
              ))}
              <span style={{ fontSize: 9, fontWeight: 800, color: '#94A3B8', marginLeft: 4 }}>L-bracket_t1.0_rev02.dxf</span>
            </div>
          </div>

          <Pinned n={!isCopy ? 3 : undefined} c={PURPLE} grow>
            <div style={{ flex: 1, minHeight: 0 }}>
              <DxfViewer h="100%" simple={!applied} />
            </div>
          </Pinned>

          <div style={{ display: 'flex', gap: 8, marginTop: 9 }}>
            {[
              { k: 'レイヤー', v: applied ? 'OUTLINE / BEND / DIM' : '0（既定）' },
              { k: '要素数', v: applied ? '18' : '5' },
              { k: '曲げ線', v: applied ? 'あり（90°×1）' : 'なし' },
              { k: '寸法線', v: applied ? 'あり' : 'なし' },
            ].map(({ k, v }) => (
              <div key={k} style={{ flex: 1, background: '#fff', border: '1px solid #E5E9EF', borderRadius: 8, padding: '7px 9px' }}>
                <p style={{ fontSize: 8.5, color: '#94A3B8', fontWeight: 800, marginBottom: 2 }}>{k}</p>
                <p style={{ fontSize: 10.5, color: applied ? INK : '#94A3B8', fontWeight: 900 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 外部AIチャット画面（リアル版） ---------- */

function AiChatScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', background: '#fff', fontFamily: FONT }}>
      {/* サイドバー */}
      <div style={{ width: 152, flexShrink: 0, background: '#F7F7F8', borderRight: '1px solid #E9EAEC', padding: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Pinned n={1} c={PURPLE}>
          <div style={{ background: '#fff', border: '1px solid #E1E2E6', borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus style={{ width: 11, height: 11, color: '#4B2E83' }} />
            <span style={{ fontSize: 10.5, fontWeight: 900, color: '#3F3F46' }}>新しいチャット</span>
          </div>
        </Pinned>
        <p style={{ fontSize: 8.5, fontWeight: 900, color: '#A1A1AA', letterSpacing: '0.08em' }}>最近のチャット</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['図面変換の設定値作成', '見積書のたたき台', '議事録の要約', '仕様書レビュー'].map((t, i) => (
            <div key={t} style={{ borderRadius: 6, padding: '6px 8px', background: i === 0 ? '#EDEBF6' : 'transparent' }}>
              <p style={{ fontSize: 9.5, fontWeight: i === 0 ? 800 : 600, color: i === 0 ? '#4B2E83' : '#71717A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t}</p>
            </div>
          ))}
        </div>
      </div>

      {/* メイン */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 36, borderBottom: '1px solid #EDEEF0', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8, flexShrink: 0 }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: '#EDEBF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot style={{ width: 11, height: 11, color: '#4B2E83' }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 900, color: '#3F3F46' }}>AIチャット</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#A1A1AA' }}>Claude / Gemini など、お使いのAIで構いません</span>
        </div>

        {/* 会話 */}
        <div style={{ flex: 1, minHeight: 0, padding: '13px 16px', display: 'flex', flexDirection: 'column', gap: 12, background: '#FCFCFD' }}>
          {/* ユーザー */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ maxWidth: '86%', display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'flex-end' }}>
              <Pinned n={2} c={CYAN_T}>
                <div style={{ background: '#fff', border: '1px solid #E4E4E7', borderRadius: 9, padding: '7px 9px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 34, height: 24, background: '#fff', border: '1px solid #E4E4E7', borderRadius: 3, padding: 1.5, flexShrink: 0 }}>
                    <DrawingSvg mode="pdf" simple />
                  </div>
                  <div>
                    <p style={{ fontSize: 9.5, fontWeight: 800, color: '#3F3F46' }}>L-bracket_t1.0_rev02.pdf</p>
                    <p style={{ fontSize: 8, color: '#A1A1AA', fontWeight: 700 }}>PDF ・ 412 KB</p>
                  </div>
                  <Paperclip style={{ width: 10, height: 10, color: '#A1A1AA', marginLeft: 4 }} />
                </div>
              </Pinned>
              <Pinned n={3} c={PURPLE}>
                <div style={{ background: '#EFF1FB', border: '1px solid #DFE3F6', borderRadius: '12px 12px 4px 12px', padding: '10px 12px' }}>
                  <p style={{ fontSize: 10, color: '#3F3F46', lineHeight: 1.75 }}>
                    あなたは板金図面の読み取りの専門家です。添付の図面PDFを解析し、DXF展開図を作成するための設定値を、下記の書式で出力してください。
                    <br />
                    出力書式: 形状分類 / 板厚 / 明示外形 / 曲げ展開 / 穴: x=, y=, φ=（1行につき1穴）／ 確定できない項目は末尾に # 要確認
                  </p>
                </div>
              </Pinned>
            </div>
          </div>

          {/* AI */}
          <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#EDEBF6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot style={{ width: 12, height: 12, color: '#4B2E83' }} />
            </div>
            <Pinned n={4} c={TEAL} grow style={{ minWidth: 0 }}>
              <div style={{ flex: 1, minHeight: 0, background: '#fff', border: '1px solid #E9EAEC', borderRadius: '12px 12px 12px 4px', padding: '11px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontSize: 10, color: '#3F3F46', lineHeight: 1.7 }}>
                  図面を解析しました。以下の設定値を、CADCHANGEの「② AI指示入力」に貼り付けてください。
                </p>

                <div style={{ flex: 1, minHeight: 0, background: '#0B1220', borderRadius: 8, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 26, background: 'rgba(255,255,255,0.06)', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', padding: '0 9px', flexShrink: 0 }}>
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: 'rgba(255,255,255,0.5)', fontFamily: 'ui-monospace, monospace' }}>解析結果</span>
                    <Pinned n={5} c={PINK} pos="left" style={{ marginLeft: 'auto' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 5, padding: '3px 8px' }}>
                        <Copy style={{ width: 9, height: 9, color: '#fff' }} />
                        <span style={{ fontSize: 8.5, fontWeight: 900, color: '#fff' }}>コピー</span>
                      </div>
                    </Pinned>
                  </div>
                  <div style={{ flex: 1, minHeight: 0, padding: '8px 10px', overflow: 'hidden', borderRadius: '0 0 8px 8px' }}>
                    {AI_OUTPUT_LINES.map((t, i) => (
                      <CodeLine key={i} t={t} size={8.5} />
                    ))}
                  </div>
                </div>
              </div>
            </Pinned>
          </div>
        </div>

        {/* 入力欄 */}
        <div style={{ padding: '10px 16px 12px', borderTop: '1px solid #EDEEF0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, border: '1px solid #E4E4E7', borderRadius: 10, padding: '8px 10px', background: '#fff' }}>
            <Paperclip style={{ width: 12, height: 12, color: '#A1A1AA', flexShrink: 0 }} />
            <span style={{ fontSize: 9.5, color: '#B4B4BB', flex: 1 }}>メッセージを入力…</span>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: '#4B2E83', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Send style={{ width: 11, height: 11, color: '#fff' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- ウォークスルー共通レイアウト ---------- */

function PhaseBar({ active }: { active: 0 | 1 | 2 }) {
  const phases = ['CADCHANGE', 'AIチャット', 'CADCHANGE'];
  const colors = [CYAN_T, PURPLE, BLUE];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      {phases.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              borderRadius: 100,
              padding: '6px 13px',
              background: i === active ? colors[i] : '#fff',
              border: `1px solid ${i === active ? colors[i] : '#E5E9EF'}`,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 900, color: i === active ? '#fff' : '#B6BCC6' }}>STEP {i + 1}</span>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: i === active ? '#fff' : '#A9B2BF' }}>{p}</span>
          </div>
          {i < 2 && <ArrowRight style={{ width: 12, height: 12, color: '#D4D9E1' }} />}
        </div>
      ))}
    </div>
  );
}

function WalkStep({ n, c, t, d, last }: { n: number; c: string; t: string; d: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ position: 'relative', paddingBottom: last ? 0 : 15 }}>
      {!last && <div style={{ position: 'absolute', left: 12.5, top: 28, bottom: 3, width: 1.5, background: '#E5E9EF' }} />}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: c, color: '#fff', fontSize: 12.5, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>{n}</div>
        <div style={{ paddingTop: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 900, color: INK, marginBottom: 4, lineHeight: 1.45 }}>{t}</p>
          <p style={{ fontSize: 12, color: SUB, lineHeight: 1.7 }}>{d}</p>
        </div>
      </div>
    </div>
  );
}

function WalkSlide({
  bg,
  kicker,
  kickerColor,
  title,
  phase,
  url,
  screen,
  steps,
  note,
  noteColor,
}: {
  bg: string;
  kicker: string;
  kickerColor: string;
  title: React.ReactNode;
  phase: 0 | 1 | 2;
  url: string;
  screen: React.ReactNode;
  steps: React.ReactNode;
  note: React.ReactNode;
  noteColor: string;
}) {
  return (
    <div className={SLIDE} style={{ background: bg }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '30px 48px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, gap: 24 }}>
          <div>
            <p style={{ color: kickerColor, fontSize: 11, fontWeight: 900, letterSpacing: '0.28em', marginBottom: 8 }}>{kicker}</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{title}</h2>
          </div>
          <PhaseBar active={phase} />
        </div>

        <div style={{ display: 'flex', gap: 22, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1.78, minWidth: 0 }}>
            <BrowserFrame url={url}>{screen}</BrowserFrame>
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 10.5, fontWeight: 900, color: '#A9B2BF', letterSpacing: '0.14em', marginBottom: 14 }}>この画面での操作</p>
            <div>{steps}</div>
            <div style={{ marginTop: 'auto', background: `${noteColor}0D`, border: `1px solid ${noteColor}33`, borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 10 }}>
              <Lightbulb style={{ width: 15, height: 15, color: noteColor, flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 12, color: BODY, lineHeight: 1.75 }}>{note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== SLIDE 11: STEP 1 — CADCHANGE でコピー ===== */
const SlideWalk1 = (
  <WalkSlide
    key="w1"
    bg="#F8F9FB"
    kicker="STEP 1 / CADCHANGE"
    kickerColor={CYAN_T}
    title={<>図面を読み込み、プロンプトをコピーする。</>}
    phase={0}
    url="app.cadchange.jp"
    screen={<CadAppScreen applied={false} pins="copy" />}
    noteColor={CYAN_T}
    note={
      <>
        この時点のDXFは<strong style={{ color: INK }}>「基本変換のみ」</strong>。外形と穴の位置しか入っていません。ここに設定値を足すことで、寸法線やレイヤーまで反映された図面になります。
      </>
    }
    steps={
      <>
        <WalkStep n={1} c={CYAN_T} t="図面(PDF)をインポート" d="対象の図面ファイルを選ぶだけ。読み込みは自動で始まります。" />
        <WalkStep n={2} c={BLUE} t="読み取り結果を確認" d="図面名・用紙サイズ・尺度・単位など、基本情報が自動で抽出されます。" />
        <WalkStep n={3} c={PURPLE} t="プロンプト文が自動生成される" d="この図面専用の指示文が組み上がります。内容を書き換える必要はありません。" />
        <WalkStep n={4} c={PURPLE} t="「プロンプトをコピー」をクリック" d="クリック1回でクリップボードへ。次はAIチャットへ移ります。" last />
      </>
    }
  />
);

/* ===== SLIDE 12: STEP 2 — AIチャットで実行 ===== */
const SlideWalk2 = (
  <WalkSlide
    key="w2"
    bg="#fff"
    kicker="STEP 2 / AIチャット"
    kickerColor={PURPLE}
    title={<>AIに貼り付けて実行し、回答をコピーする。</>}
    phase={1}
    url="お使いのAIチャット（Claude / Gemini など）"
    screen={<AiChatScreen />}
    noteColor={PURPLE}
    note={
      <>
        AI側でやることは<strong style={{ color: INK }}>「添付」「貼り付け」「実行」「コピー」の4つだけ</strong>。返ってきた解析結果を読んだり、書き換えたりする必要はありません。
      </>
    }
    steps={
      <>
        <WalkStep n={1} c={PURPLE} t="新しいチャットを開く" d="お手持ちのAI（Claude・Geminiなど）で、新規チャットを開きます。" />
        <WalkStep n={2} c={CYAN_T} t="図面のPDFを添付" d="CADCHANGEにインポートしたものと同じPDFを、そのまま添付します。" />
        <WalkStep n={3} c={PURPLE} t="プロンプト文を貼り付けて実行" d="コピーしたプロンプトを貼り付け、そのまま送信するだけです。" />
        <WalkStep n={4} c={TEAL} t="AIが解析し、設定値を返す" d="形状分類・板厚・曲げ展開・穴の座標などが、行単位のテキストで出力されます。" />
        <WalkStep n={5} c={PINK} t="回答を「コピー」" d="コードブロックのコピーボタンで、設定値をまるごとコピーします。" last />
      </>
    }
  />
);

/* ===== SLIDE 13: STEP 3 — CADCHANGE に反映 ===== */
const SlideWalk3 = (
  <WalkSlide
    key="w3"
    bg="#F8F9FB"
    kicker="STEP 3 / CADCHANGE"
    kickerColor={BLUE}
    title={<>貼り付けて更新すると、DXFが仕上がる。</>}
    phase={2}
    url="app.cadchange.jp"
    screen={<CadAppScreen applied pins="apply" />}
    noteColor={BLUE}
    note={
      <>
        <strong style={{ color: INK }}>基本変換のみ → 設定値 反映済み</strong>へ。要素数・寸法線・レイヤーが増え、図面に忠実なDXFになります。納得いくまで貼り替えて更新することもできます。
      </>
    }
    steps={
      <>
        <WalkStep n={1} c={BLUE} t="「② AI指示入力」に貼り付け" d="AIの回答を、そのまま貼り付けます。編集は不要です。" />
        <WalkStep n={2} c={CYAN_T} t="「指示を適用してDXFを更新」をクリック" d="設定値が反映され、DXFがその場で作り直されます。" />
        <WalkStep n={3} c={PURPLE} t="DXFビュワーで結果を確認" d="寸法線・レイヤー・穴径まで反映されているかを、その場で確認できます。" />
        <WalkStep n={4} c={TEAL} t="「DXFダウンロード」でPCに保存" d="問題なければクリック。反映済みのDXFファイルがダウンロードされます。" />
        <WalkStep n={5} c={PINK} t="「評価入力」で評価を残す" d="OK / NG とコメント・マーカーを入力。内部システムの機械学習に活用されます。" last />
      </>
    }
  />
);

/* ===== SLIDE 11: 方針変更（扉／ご提案）===== */
const Slide11 = (
  <div key="s11" className={SLIDE} style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_2} 60%, #1E3A8A 100%)` }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 82% 20%, rgba(0,251,255,0.14) 0%, transparent 50%)' }} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', boxSizing: 'border-box' }}>
      <div className="inline-flex items-center gap-2 w-fit" style={{ borderRadius: 100, padding: '8px 18px', marginBottom: 26, background: 'rgba(224,164,0,0.12)', border: '1px solid rgba(224,164,0,0.4)' }}>
        <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#FCD34D' }} />
        <span style={{ color: '#FCD34D', fontSize: 12, fontWeight: 900, letterSpacing: '0.18em' }}>PROPOSAL / AI利用の方針変更</span>
      </div>

      <h2 style={{ fontSize: 44, fontWeight: 900, color: '#fff', lineHeight: 1.35, marginBottom: 24, letterSpacing: '-0.01em' }}>
        AIとの付き合い方を変えて、
        <br />
        <span style={{ background: `linear-gradient(90deg, ${CYAN}, ${PURPLE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ランニングコストを大幅に下げる。</span>
      </h2>

      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15.5, lineHeight: 2.05, maxWidth: 900, marginBottom: 34 }}>
        当初は、ClaudeのAPIを組み込んで利用することを想定していました。弊社側でClaude APIを検証用に取得し、組み込んで検証をした結果、
        <strong style={{ color: '#fff' }}>何回もAIとのやり取りが発生し、ランニングコストが大幅に上がってしまう</strong>ことを懸念。
        別AIを手動で利用することで、ランニングコストを大幅ダウンさせるご提案をいたします。
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr 1fr', gap: 18 }}>
        <div style={{ background: 'rgba(0,251,255,0.08)', border: '1px solid rgba(0,251,255,0.32)', borderRadius: 20, padding: '24px 26px' }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: CYAN, letterSpacing: '0.16em', marginBottom: 12 }}>ご提案</p>
          <p style={{ fontSize: 16.5, fontWeight: 900, color: '#fff', lineHeight: 1.7 }}>
            AIのインプット、結果をシステムに反映を
            <br />
            <span style={{ color: CYAN }}>手動で行う方式</span>に変更
          </p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20, padding: '24px 26px' }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: PINK, letterSpacing: '0.16em', marginBottom: 12 }}>デメリット</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>AIへ貼り付けたりシステム側に貼り付けたりの操作が発生する</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20, padding: '24px 26px' }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: TEAL, letterSpacing: '0.16em', marginBottom: 12 }}>メリット</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>ランニングコストを下げられる</p>
        </div>
      </div>

      <p style={{ marginTop: 26, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.9 }}>
        お客様影響として多少の手間は発生しますが、難しくなく、お時間も取らせません。ランニングコストをカットできるメリットを十分に発揮できると考えています。
      </p>
    </div>
  </div>
);

/* ===== SLIDE 12: API組み込み版の利用イメージ ===== */
const Slide12 = (
  <div key="s12" className={SLIDE} style={{ background: '#F8F9FB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 64px', boxSizing: 'border-box' }}>
      <Header kicker="API VERSION" kickerColor={BLUE} title="API組み込み版の、利用イメージ。" mb={22} />

      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        {/* 左: 操作 */}
        <div style={{ flex: 0.85, background: '#fff', borderRadius: 24, border: `1px solid ${LINE}`, padding: '24px 24px' }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: CYAN_T, letterSpacing: '0.16em', marginBottom: 16 }}>操作（お客様）</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: FileUp, t: '図面(PDF)をインポート' },
              { icon: Download, t: '確認して「DXFダウンロード」' },
              { icon: Star, t: '「評価入力」で評価を入力' },
            ].map(({ icon: Icon, t }, i) => (
              <div key={t}>
                <div style={{ background: '#F9FAFB', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 11, alignItems: 'center' }}>
                  <Icon className="w-4 h-4" style={{ color: CYAN_T, flexShrink: 0 }} />
                  <p style={{ fontSize: 12.5, fontWeight: 800, color: INK, lineHeight: 1.5 }}>{t}</p>
                </div>
                {i < 2 && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                    <ArrowDown style={{ width: 13, height: 13, color: '#CBD5E1' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, background: '#ECFDF5', borderRadius: 14, padding: '14px 16px' }}>
            <p style={{ fontSize: 11.5, color: '#047857', lineHeight: 1.75, fontWeight: 700 }}>操作は、たしかにシンプル。ただし、その裏では──</p>
          </div>
        </div>

        {/* 右: 裏の仕組み */}
        <div style={{ flex: 1.6, background: NAVY, borderRadius: 24, padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 900, color: CYAN, letterSpacing: '0.16em', marginBottom: 16 }}>裏で動いている仕組み（API通信）</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { n: 1, t: '図面読み込み → プロンプト文を作成 → APIでAIに送信', side: '送信 ①' },
                { n: 2, t: 'AIがPDFとプロンプトをもとに解析 → 設定値を作成 → システムに返す', side: '送信 ②' },
                { n: 3, t: '結果を反映 → 作成したDXFと元図面を、比較用にAIへ送信', side: '送信 ③' },
                { n: 4, t: 'AIが比較 → 精度70%以下ならやり直し、結果を再びシステムへ', side: '送信 ④' },
                { n: 5, t: '70%以下なら再実行してAIへ送信。70%以上で画面に反映して終了', side: '再実行…' },
              ].map((s, i) => (
                <div key={s.n}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '11px 14px' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: i === 4 ? PINK : 'rgba(0,251,255,0.18)', color: i === 4 ? '#fff' : CYAN, fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {s.n}
                    </div>
                    <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, flex: 1 }}>{s.t}</p>
                    <span style={{ fontSize: 9.5, fontWeight: 900, color: i === 4 ? PINK : CYAN, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{s.side}</span>
                  </div>
                  {i < 4 && (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '3px 0' }}>
                      <ArrowDown style={{ width: 12, height: 12, color: 'rgba(0,251,255,0.5)' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,91,174,0.12)', border: '1px solid rgba(255,91,174,0.35)', borderRadius: 14, padding: '14px 18px' }}>
              <Gauge className="w-5 h-5" style={{ color: PINK, flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.7, fontWeight: 700 }}>
                精度<strong style={{ color: PINK }}>70%</strong>を超えるまで、AIとのやり取りが繰り返される設計。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ===== SLIDE 13: コスト比較 ===== */
const Slide13 = (
  <div key="s13" className={SLIDE} style={{ background: '#fff' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 72px', boxSizing: 'border-box' }}>
      <Header kicker="RUNNING COST" kickerColor={PINK} title="API通信は、最低4回。やり直せば、倍々に。" center mb={26} />

      <div style={{ display: 'flex', gap: 26, alignItems: 'stretch' }}>
        {/* 左: 倍々グラフ */}
        <div style={{ flex: 1.25, background: '#F9FAFB', borderRadius: 26, padding: '26px 30px 20px' }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: INK, marginBottom: 4 }}>1図面あたりのAPI通信回数（イメージ）</p>
          <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700, marginBottom: 20 }}>精度が出ずにやり直すたび、回数は倍々に増えていきます。</p>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 168, borderBottom: '1.5px solid #E5E7EB', padding: '0 6px' }}>
            {[
              { label: '1回で成功', v: 4, c: TEAL },
              { label: '1回やり直し', v: 8, c: BLUE },
              { label: '2回やり直し', v: 16, c: PURPLE },
              { label: '3回やり直し', v: 32, c: PINK },
            ].map((b) => (
              <div key={b.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: b.c, marginBottom: 6 }}>{b.v}回</span>
                <div style={{ width: 54, height: (b.v / 32) * 128, background: `linear-gradient(180deg, ${b.c}, ${b.c}BB)`, borderRadius: '8px 8px 0 0' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12 }}>
            {['1回で成功', '1回やり直し', '2回やり直し', '3回やり直し'].map((t) => (
              <p key={t} style={{ fontSize: 11.5, fontWeight: 800, color: SUB, width: 90, textAlign: 'center' }}>
                {t}
              </p>
            ))}
          </div>
          <p style={{ fontSize: 10.5, color: '#9CA3AF', lineHeight: 1.7, marginTop: 14 }}>
            ※ 回数は検証時のフロー（最低4回のAPI送信）をもとにしたイメージです。図面の複雑さやAIの精度により変動します。
          </p>
        </div>

        {/* 右: 2方式の比較 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', borderRadius: 22, border: '1.5px solid #FBCFE8', padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#FFF1F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu className="w-4 h-4" style={{ color: PINK }} />
              </div>
              <p style={{ fontSize: 15.5, fontWeight: 900, color: INK }}>API組み込み版</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { ok: true, t: '操作は全自動でシンプル' },
                { ok: false, t: '最低4回、やり直すたび倍々にAPI通信' },
                { ok: false, t: 'ランニングコストが膨大に膨れ上がる恐れ' },
              ].map(({ ok, t }) => (
                <div key={t} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                  {ok ? <CheckCircle2 className="w-4 h-4" style={{ color: TEAL, flexShrink: 0, marginTop: 1 }} /> : <XCircle className="w-4 h-4" style={{ color: PINK, flexShrink: 0, marginTop: 1 }} />}
                  <p style={{ fontSize: 12.5, color: BODY, lineHeight: 1.65 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NAVY, borderRadius: 22, padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 88% 12%, rgba(0,251,255,0.18) 0%, transparent 58%)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(0,251,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Repeat className="w-4 h-4" style={{ color: CYAN }} />
                </div>
                <p style={{ fontSize: 15.5, fontWeight: 900, color: '#fff' }}>手動連携版（ご提案）</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { ok: true, t: 'API通信のランニングコストを大幅カット' },
                  { ok: true, t: '手持ちのAI（Claude / Gemini 等）を活用' },
                  { ok: false, t: '貼り付け操作が数回発生する' },
                ].map(({ ok, t }) => (
                  <div key={t} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                    {ok ? <CheckCircle2 className="w-4 h-4" style={{ color: CYAN, flexShrink: 0, marginTop: 1 }} /> : <AlertTriangle className="w-4 h-4" style={{ color: '#FCD34D', flexShrink: 0, marginTop: 1 }} />}
                    <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ===== SLIDE 14: 結論 ===== */
const Slide14 = (
  <div key="s14" className={SLIDE} style={{ background: 'linear-gradient(135deg, #EFF6FF, #ECFEFF)' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '46px 80px', boxSizing: 'border-box' }}>
      <Header kicker="CONCLUSION" kickerColor={BLUE} title="手間よりも、メリットが大きい。" center mb={28} />

      <p style={{ textAlign: 'center', color: BODY, fontSize: 15.5, lineHeight: 2, maxWidth: 900, margin: '0 auto 30px' }}>
        API組み込み版は<strong style={{ color: INK }}>最低でも4回</strong>、精度が悪くやり直せば<strong style={{ color: INK }}>倍々ゲーム</strong>となり、ランニングコストが膨大に膨れ上がる恐れがあります。
        手間ではありますが、別AIにプロンプトとPDFファイルを貼り付けて手動で実行させ、結果をシステム側に反映させることで、
        <strong style={{ color: INK }}>ランニングコストを大幅に減らせます。</strong>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }}>
        {[
          { icon: TrendingDown, title: 'ランニングコストを大幅ダウン', desc: 'API通信の回数そのものをなくし、継続利用のコストを抑えます。', bg: '#ECFEFF', c: CYAN_T },
          { icon: Wallet, title: '費用の予測が立てやすい', desc: '使うほど増えていく従量課金の不確実性から解放されます。', bg: '#EFF6FF', c: BLUE },
          { icon: ShieldCheck, title: '手間は、わずか', desc: '貼り付けの操作のみ。難しくなく、お時間も取らせません。', bg: '#F5F3FF', c: PURPLE },
        ].map(({ icon: Icon, title, desc, bg, c }) => (
          <div key={title} style={{ background: '#fff', borderRadius: 24, border: '1px solid #DBEAFE', padding: '26px 24px' }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Icon className="w-5 h-5" style={{ color: c }} />
            </div>
            <h4 style={{ fontSize: 16.5, fontWeight: 900, color: INK, marginBottom: 12, lineHeight: 1.45 }}>{title}</h4>
            <p style={{ fontSize: 13, color: SUB, lineHeight: 1.9 }}>{desc}</p>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 900, color: INK, lineHeight: 1.6 }}>
        今回は手間よりもメリットが大きいため、<span style={{ color: BLUE }}>この方式に変更した方が良い</span>と考えています。
      </p>
    </div>
  </div>
);

/* ===== SLIDE 15: クロージング ===== */
const Slide15 = (
  <div key="s15" className={SLIDE} style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_2} 60%, #1E3A8A 100%)` }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(0,251,255,0.12) 0%, transparent 50%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 85%, rgba(157,114,255,0.14) 0%, transparent 48%)' }} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 80px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <Ruler className="w-8 h-8" style={{ color: CYAN }} />
        <DraftingCompass className="w-9 h-9" style={{ color: '#fff' }} />
        <Layers className="w-8 h-8" style={{ color: PURPLE }} />
      </div>

      <h2 style={{ fontSize: 50, fontWeight: 900, color: '#fff', marginBottom: 22, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
        図面のPDFが、そのままDXFに。
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.95, marginBottom: 42, maxWidth: 680 }}>
        AIで設定値をつくり、評価でさらに賢くなる。
        <br />
        ランニングコストを抑えたまま、図面変換を日常の作業に。
      </p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
        {['PDF → DXF', 'AIプロンプト自動生成', '評価による学習', '低ランニングコスト'].map((t) => (
          <div key={t} className="inline-flex items-center gap-2" style={{ borderRadius: 100, padding: '10px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}>
            <CheckCircle2 className="w-4 h-4" style={{ color: CYAN }} />
            <span style={{ color: '#fff', fontSize: 13.5, fontWeight: 800 }}>{t}</span>
          </div>
        ))}
      </div>

      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700 }}>Meece株式会社</p>
    </div>
  </div>
);

export const cadchangePresentation: PresentationEntry = {
  meta: {
    id: 'cadchange-2026',
    title: 'CADCHANGE サービス紹介',
    description: '図面のPDFを読み込みDXFファイルを作成するアプリ「CADCHANGE」の機能・使い方フロー、およびAI利用方針変更（ランニングコスト削減）のご提案資料',
    thumbnail: `linear-gradient(135deg, ${NAVY} 0%, #1E3A8A 50%, ${CYAN} 100%)`,
    author: 'Meece株式会社',
    createdAt: '2026-07-24',
  },
  slides: [
    Slide1,  // 1. 表紙
    Slide2,  // 2. 概要
    Slide3,  // 3. 画面全体像
    Slide4,  // 4. 機能① 図面読み込み
    Slide5,  // 5. 機能② AIプロンプト文作成
    Slide6,  // 6. 機能③ AI反映
    Slide7,  // 7. 機能④ DXFダウンロード / ⑤ リセット
    Slide8,  // 8. 機能⑥ 評価 → 学習
    Slide9,  // 9. 機能一覧
    Slide10,    // 10. 使い方フロー（全体像）
    SlideWalk1, // 11. STEP 1 — CADCHANGE でプロンプトをコピー
    SlideWalk2, // 12. STEP 2 — AIチャットで実行し、回答をコピー
    SlideWalk3, // 13. STEP 3 — CADCHANGE に貼り付けて反映・出力
    Slide11,    // 14. AI利用の方針変更（ご提案）
    Slide12,    // 15. API組み込み版の利用イメージ
    Slide13,    // 16. コスト比較
    Slide14,    // 17. 結論
    Slide15,    // 18. クロージング
  ],
};
