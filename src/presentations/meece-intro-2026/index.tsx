import type { ReactNode } from 'react';
import {
  Award,
  User,
  Calendar,
  CircleDollarSign,
  Landmark,
  MapPin,
  Mail,
  Globe,
  Factory,
  GraduationCap,
  Sparkles,
  ShoppingCart,
  Zap,
  Heart,
  Rocket,
  Lightbulb,
  CheckCircle2,
  Layers,
  Shield,
  Users,
  Search,
  Clock,
  Wallet,
  Ticket,
  LayoutDashboard,
  Bot,
  Brain,
  Database,
  Target,
  ArrowRight,
  Compass,
  MessageSquare,
  Handshake,
  Code2,
  BarChart3,
  Building2,
  Store,
  Monitor,
  Smartphone,
  Workflow,
  Eye,
  Mic,
  Puzzle,
  Megaphone,
  UserPlus,
  Banknote,
  Server,
  Gauge,
} from 'lucide-react';
import type { PresentationEntry } from '../registry';
import { OFFICE_MAP_IMAGE } from './officeMap';

/* ============================================================
   Meece株式会社 ／ 会社紹介 2026年度版（他社ご紹介用）
   出典：Meece 公式サイト（2026年8月時点）

   Design : "Meece Brand Editorial ─ 図解主体"
   ─ 白 × ディープネイビー(#0D1B3E) × シアン→バイオレット
   ─ 1スライド＝1メッセージ＋1ビジュアル。本文は最小限。
   ============================================================ */

const INK = '#0D1B3E';
const CYAN = '#00FBFF';
const TEAL = '#319795';
const VIOLET = '#9D72FF';
const PINK = '#FF5BAE';
const CRIMSON = '#FF0055';
const AMBER = '#F6AD55';
const PAPER = '#F8F9FB';
const MUTE = '#6B7280';
const FAINT = '#9CA3AF';
const BORDER = '#E9ECF1';
const GRAD = `linear-gradient(to right, ${CYAN}, ${VIOLET})`;

const SLIDE = 'w-full h-[720px] relative overflow-hidden';
const TOTAL = 21;

/* ---------------- 共通パーツ ---------------- */

function Head({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ width: 22, height: 3, background: TEAL, borderRadius: 2 }} />
        <span style={{ fontSize: 10, letterSpacing: '0.22em', color: TEAL, fontWeight: 900 }}>{eyebrow}</span>
      </div>
      <h2 style={{ fontSize: 36, fontWeight: 900, color: INK, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.2 }}>{title}</h2>
      {lead && <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.7, margin: '14px 0 0', fontWeight: 600 }}>{lead}</p>}
    </div>
  );
}

function Foot({ n, dark = false }: { n: number; dark?: boolean }) {
  const c = dark ? 'rgba(255,255,255,0.4)' : FAINT;
  return (
    <>
      <div style={{ position: 'absolute', left: 64, bottom: 22, fontSize: 10, letterSpacing: '0.16em', color: c, fontWeight: 700, zIndex: 8 }}>
        Meece株式会社 ｜ COMPANY PROFILE 2026
      </div>
      <div style={{ position: 'absolute', right: 64, bottom: 22, fontSize: 10, letterSpacing: '0.12em', color: c, fontWeight: 800, zIndex: 8 }}>
        {String(n).padStart(2, '0')} / {TOTAL}
      </div>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 3, background: dark ? 'rgba(255,255,255,0.12)' : '#EEF1F5', zIndex: 8 }}>
        <div style={{ width: `${(n / TOTAL) * 100}%`, height: '100%', background: GRAD }} />
      </div>
    </>
  );
}

function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 22, boxShadow: '0 10px 30px rgba(13,27,62,0.04)', ...style }}>
      {children}
    </div>
  );
}

/* 矢印形のプロセスブロック */
function Chevron({ children, bg, first = false, style }: { children: ReactNode; bg: string; first?: boolean; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        flex: 1,
        background: bg,
        padding: first ? '36px 26px 36px 26px' : '36px 26px 36px 44px',
        clipPath: first
          ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
          : 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)',
        marginLeft: first ? 0 : -20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Divider({ no, en, ja, lead, n }: { no: string; en: string; ja: string; lead: string; n: number }) {
  return (
    <div className={SLIDE} style={{ background: INK }}>
      <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,251,255,0.18) 0%, rgba(0,251,255,0) 70%)', top: -160, right: -80 }} />
      <div style={{ position: 'absolute', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(157,114,255,0.22) 0%, rgba(157,114,255,0) 70%)', bottom: -180, left: 120 }} />
      <div style={{ position: 'absolute', right: 64, top: 96, fontSize: 200, fontWeight: 900, color: 'rgba(255,255,255,0.045)', lineHeight: 0.8, letterSpacing: '-0.04em' }}>{no}</div>
      <div style={{ position: 'absolute', left: 88, top: '50%', transform: 'translateY(-50%)', zIndex: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <span style={{ width: 40, height: 3, background: GRAD, borderRadius: 2 }} />
          <span style={{ fontSize: 11, letterSpacing: '0.32em', color: CYAN, fontWeight: 900 }}>SECTION {no}</span>
        </div>
        <div style={{ fontSize: 13, letterSpacing: '0.34em', color: 'rgba(255,255,255,0.5)', fontWeight: 800, marginBottom: 16 }}>{en}</div>
        <h2 style={{ fontSize: 58, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>{ja}</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', lineHeight: 1.8, margin: '22px 0 0', fontWeight: 600 }}>{lead}</p>
      </div>
      <Foot n={n} dark />
    </div>
  );
}

/* HP ヒーローと同じ都市写真（公式サイト Home の背景1枚目） */
const CITY_BG = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2044&auto=format&fit=crop';
const CITY_FILTER = 'brightness(1.1) contrast(1.05) saturate(1.2) hue-rotate(-5deg)';

/* ============================================================
   01  表紙
   ============================================================ */
const S01 = (
  <div key="s01" className={SLIDE} style={{ backgroundColor: '#000814' }}>
    <img
      src={CITY_BG}
      alt="City Background"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: CITY_FILTER }}
    />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,8,20,0.88) 0%, rgba(0,8,20,0.56) 52%, rgba(0,8,20,0.24) 100%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,8,20,0.94) 0%, rgba(0,8,20,0.62) 26%, rgba(0,8,20,0.05) 58%)' }} />
    <div style={{ position: 'absolute', right: 26, bottom: 96, fontSize: 120, fontWeight: 900, letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.05)', lineHeight: 0.85, textAlign: 'right', textTransform: 'uppercase' }}>
      DIGITAL<br />CREATIVE<br />FIRM
    </div>

    <div style={{ position: 'absolute', inset: 0, padding: '52px 72px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 900, letterSpacing: '0.06em' }}>Meece株式会社</div>
        <div style={{ color: 'rgba(255,255,255,0.88)', writingMode: 'vertical-rl', fontSize: 12, letterSpacing: '0.5em', fontWeight: 700, lineHeight: 1.8, textShadow: '0 0 20px rgba(0,251,255,0.5)' }}>
          時代をまたぎ、新しいデジタルをデザインする。
        </div>
      </div>

      <div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: '0.42em', fontWeight: 800, marginBottom: 20 }}>COMPANY PROFILE</div>
        <h1 style={{ color: '#FFFFFF', fontSize: 74, fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.03em', margin: '0 0 22px', textShadow: '0 4px 40px rgba(0,8,20,0.5)' }}>会社紹介</h1>
        <div style={{ width: 56, height: 4, background: GRAD, borderRadius: 2, marginBottom: 26 }} />
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, fontWeight: 600, lineHeight: 1.7, margin: 0 }}>
          すべてのビジネスに、輝く「物語」の続きを。
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 20 }}>
        <div style={{ display: 'flex', gap: 22 }}>
          {['受託開発', 'AI研究開発', 'ITコンサルティング', '多角的事業支援'].map((t) => (
            <span key={t} style={{ color: 'rgba(255,255,255,0.78)', fontSize: 11, letterSpacing: '0.14em', fontWeight: 700 }}>{t}</span>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: '0.18em', fontWeight: 600 }}>2026年度版 ／ https://meece-jp.com/</div>
      </div>
    </div>
  </div>
);

/* ============================================================
   05  会社概要
   ============================================================ */
const S05 = (
  <div key="s05" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head eyebrow="Corporate Profile" title="会社概要" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.18fr', gap: 22, height: 522 }}>
      <Card style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {[
          { icon: Award, label: '商号', value: 'Meece株式会社' },
          { icon: User, label: '代表取締役社長', value: '溝口 雅登' },
          { icon: Calendar, label: '設立', value: '2022年 8月 22日' },
          { icon: CircleDollarSign, label: '資本金', value: '1,000,000円' },
          { icon: Landmark, label: '取引先銀行', value: 'みずほ銀行 八重洲口支店' },
          { icon: MapPin, label: '所在地', value: '東京都千代田区丸の内1-8-3\n丸の内トラストタワー本館 20階' },
        ].map((r, i, arr) => (
          <div key={r.label} style={{ display: 'flex', flex: 1, alignItems: 'center', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${BORDER}` }}>
            <div style={{ width: 178, background: PAPER, alignSelf: 'stretch', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 11 }}>
              <r.icon size={15} color={TEAL} />
              <span style={{ fontSize: 12.5, fontWeight: 900, color: INK }}>{r.label}</span>
            </div>
            <div style={{ flex: 1, padding: '14px 22px', fontSize: 14.5, fontWeight: 800, color: INK, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{r.value}</div>
          </div>
        ))}
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card style={{ padding: '22px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', color: TEAL, fontWeight: 900, marginBottom: 6 }}>ACCESS</div>
          <div style={{ fontSize: 17, fontWeight: 900, color: INK, marginBottom: 12 }}>東京駅直結、丸の内のオフィス</div>
          <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
            <img src={OFFICE_MAP_IMAGE} alt="Meece株式会社の所在地（Google マップ）" style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 14 }}>
            {[
              { c: TEAL, t: 'JR「東京駅」日本橋口 徒歩1分' },
              { c: VIOLET, t: '地下鉄「大手町駅」B7出口 徒歩2分' },
            ].map((a) => (
              <div key={a.t} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: PAPER, borderRadius: 10, padding: '10px 12px' }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: a.c, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: INK }}>{a.t}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: '22px 26px', background: INK, border: 'none', display: 'flex', alignItems: 'center', gap: 26 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
              <Mail size={15} color={CYAN} />
              <span style={{ fontSize: 15, fontWeight: 900, color: '#FFFFFF' }}>info@meece.io</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Globe size={15} color={CYAN} />
              <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.75)' }}>https://meece-jp.com/</span>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 800, marginBottom: 5 }}>受付時間</div>
            <div style={{ fontSize: 13.5, color: '#FFFFFF', fontWeight: 900 }}>平日 10:00〜17:00</div>
          </div>
        </Card>
      </div>
    </div>
    <Foot n={2} />
  </div>
);

/* ============================================================
   06  代表挨拶
   ============================================================ */
const S06 = (
  <div key="s06" className={SLIDE} style={{ background: PAPER, display: 'flex' }}>
    <div style={{ width: 470, background: INK, position: 'relative', overflow: 'hidden' }}>
      <img src="/ceo.png" alt="代表取締役社長 溝口 雅登" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,62,0) 45%, rgba(13,27,62,0.94) 90%)' }} />
      <div style={{ position: 'absolute', left: 46, bottom: 56, zIndex: 2 }}>
        <div style={{ width: 40, height: 3, background: GRAD, borderRadius: 2, marginBottom: 16 }} />
        <div style={{ fontSize: 11, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.6)', fontWeight: 800, marginBottom: 8 }}>代表取締役社長</div>
        <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.04em' }}>溝口 雅登</div>
      </div>
    </div>

    <div style={{ flex: 1, padding: '76px 64px 0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, letterSpacing: '0.22em', color: TEAL, fontWeight: 900, marginBottom: 26 }}>MESSAGE ／ 代表挨拶</div>
      <div style={{ fontSize: 44, fontWeight: 900, color: INK, lineHeight: 1.5, letterSpacing: '-0.03em' }}>
        <span style={{ color: FAINT, fontSize: 56, lineHeight: 1 }}>「</span>自ら限界を決めず、<br />
        最後までやり遂げる。<span style={{ color: FAINT, fontSize: 56, lineHeight: 1 }}>」</span>
      </div>
      <div style={{ width: 56, height: 4, background: GRAD, borderRadius: 2, margin: '34px 0 30px' }} />
      <p style={{ fontSize: 15, color: MUTE, lineHeight: 2.1, fontWeight: 600, margin: 0 }}>
        その意思を込めて、Meeceは立ち上がりました。<br />
        お客様と信頼関係を築き、共に成長する。<br />
        人を大切に、何より皆が自分自身を大切にできる組織を。
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 'auto', marginBottom: 62 }}>
        {[
          { icon: Handshake, t: 'お客様と共に成長', c: TEAL },
          { icon: Rocket, t: '限界を決めない', c: VIOLET },
          { icon: Heart, t: '人を大切にする', c: PINK },
        ].map((c) => (
          <Card key={c.t} style={{ flex: 1, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 11 }}>
            <c.icon size={17} color={c.c} />
            <span style={{ fontSize: 12.5, fontWeight: 900, color: INK }}>{c.t}</span>
          </Card>
        ))}
      </div>
    </div>
    <Foot n={3} />
  </div>
);

/* ============================================================
   07  社名の由来（5つの産業ドメイン）
   ============================================================ */
const S07 = (
  <div key="s07" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head eyebrow="Roots of the Name" title="社名は、5つの産業の頭文字。" lead="創業以来、あらゆる産業の現場に立ってきました。" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
      {[
        { char: 'M', en: 'Manufacturing', ja: '製造', desc: '技術継承と生産ラインを、\nデジタルで支える。', icon: Factory, color: TEAL, bg: '#E6FFFA' },
        { char: 'E', en: 'Education', ja: '教育', desc: '次世代の学びを、\nITの力でアップデート。', icon: GraduationCap, color: '#3182CE', bg: '#EBF8FF' },
        { char: 'E', en: 'Entertainment', ja: '娯楽', desc: '心を動かす体験と感動を、\n技術で創出する。', icon: Sparkles, color: VIOLET, bg: '#F5F3FF' },
        { char: 'C', en: 'Commerce', ja: '商業・流通', desc: 'モノと人が繋がる仕組みを、\nもっと滑らかに。', icon: ShoppingCart, color: PINK, bg: '#FFF5F7' },
        { char: 'E', en: 'Everyday life', ja: 'エネルギー・生活', desc: '医療・行政・インフラ。\n日常を、より安心に。', icon: Zap, color: AMBER, bg: '#FFFAF0' },
      ].map((d, i) => (
        <Card key={i} style={{ padding: 0, height: 336, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: d.bg, height: 152, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 104, fontWeight: 900, color: d.color, lineHeight: 1, letterSpacing: '-0.05em' }}>{d.char}</div>
            <div style={{ position: 'absolute', right: 14, bottom: 12, width: 40, height: 40, borderRadius: 13, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <d.icon size={19} color={d.color} />
            </div>
          </div>
          <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontSize: 10.5, letterSpacing: '0.08em', color: FAINT, fontWeight: 900, marginBottom: 8 }}>{d.en}</div>
            <div style={{ fontSize: 17, fontWeight: 900, color: INK, marginBottom: 12 }}>{d.ja}</div>
            <p style={{ fontSize: 12, color: MUTE, lineHeight: 1.85, margin: 0, fontWeight: 600, whiteSpace: 'pre-line' }}>{d.desc}</p>
          </div>
        </Card>
      ))}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 22, padding: '0 4px' }}>
      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: TEAL, fontWeight: 900 }}>ALL INDUSTRIES</span>
      <span style={{ fontSize: 13, fontWeight: 800, color: INK }}>ヘルスケア・不動産など、5領域以外の産業もご支援しています。</span>
    </div>
    <Foot n={4} />
  </div>
);

/* ============================================================
   08  沿革
   ============================================================ */
const S08 = (
  <div key="s08" className={SLIDE} style={{ background: PAPER, padding: '46px 64px 0' }}>
    <Head eyebrow="History" title="SESから、プロダクトカンパニーへ。" />
    <Card style={{ padding: '30px 34px 28px' }}>
      <svg width="100%" height="290" viewBox="0 0 1084 290" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="histline" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={CYAN} />
            <stop offset="55%" stopColor={VIOLET} />
            <stop offset="100%" stopColor={CRIMSON} />
          </linearGradient>
          <linearGradient id="histfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(157,114,255,0.16)" />
            <stop offset="100%" stopColor="rgba(157,114,255,0)" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={92 + i * 300} y1="52" x2={92 + i * 300} y2="254" stroke="#EEF1F5" strokeWidth="2" />
        ))}

        <path d="M92 232 C 240 226, 250 190, 392 180 C 540 170, 560 140, 692 124 C 840 106, 880 82, 992 64 L992 254 L92 254 Z" fill="url(#histfill)" />
        <path d="M92 232 C 240 226, 250 190, 392 180 C 540 170, 560 140, 692 124 C 840 106, 880 82, 992 64" fill="none" stroke="url(#histline)" strokeWidth="5" strokeLinecap="round" />

        {[
          { x: 92, y: 232, year: '2022', c: CYAN },
          { x: 392, y: 180, year: '2023', c: '#5BC8E8' },
          { x: 692, y: 124, year: '2024', c: VIOLET },
          { x: 992, y: 64, year: '2026', c: CRIMSON },
        ].map((m) => (
          <g key={m.year}>
            <circle cx={m.x} cy={m.y} r="13" fill="#FFFFFF" stroke={m.c} strokeWidth="5" />
            <text x={m.x} y={m.y - 28} textAnchor="middle" fontSize="36" fontWeight="900" fill={m.c} letterSpacing="-1">{m.year}</text>
          </g>
        ))}

        <line x1="60" y1="254" x2="1024" y2="254" stroke="#E3E8EF" strokeWidth="2" />
        <text x="1024" y="280" textAnchor="end" fontSize="11" fontWeight="800" fill={FAINT}>事業領域の広がり ／ 提供価値の拡大 →</text>
      </svg>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 18 }}>
        {[
          { title: 'Meece株式会社 設立', desc: 'SES事業を柱に、現場からスタート。', c: CYAN, special: false },
          { title: '受託開発・コンサルへ拡大', desc: '戦略から実装までを一気通貫で。', c: '#5BC8E8', special: false },
          { title: 'AI研究開発部門を設立', desc: '生成AI・LLMの専門チームを発足。', c: VIOLET, special: false },
          { title: '「Dev Ticket」正式リリース', desc: '2026年6月24日、自社プロダクト第一弾。', c: CRIMSON, special: true },
        ].map((h, i) => (
          <div key={i} style={{ background: h.special ? '#FFF5F7' : PAPER, borderRadius: 14, padding: '18px 20px', borderLeft: `4px solid ${h.c}` }}>
            <div style={{ fontSize: 14.5, fontWeight: 900, color: INK, marginBottom: 8, lineHeight: 1.4 }}>{h.title}</div>
            <div style={{ fontSize: 12, color: MUTE, fontWeight: 600, lineHeight: 1.7 }}>{h.desc}</div>
          </div>
        ))}
      </div>
    </Card>
    <Foot n={5} />
  </div>
);

/* ============================================================
   09  行動指針
   ============================================================ */
const S09 = (
  <div key="s09" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head eyebrow="Our Policy" title="大切にしている、3つの指針。" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
      {[
        { no: '01', en: 'OWNERSHIP', title: '深い当事者意識', desc: 'お客様の事業を、自社の痛みとして捉える。', icon: Heart, color: TEAL, bg: '#E6FFFA' },
        { no: '02', en: 'PRAGMATISM', title: '実利的な現実主義', desc: '技術は手段。本当に機能するITだけを実装する。', icon: Compass, color: VIOLET, bg: '#F5F3FF' },
        { no: '03', en: 'AGILITY', title: '無限の機動力', desc: '限界を定めず、常に最適な歯車を選び直す。', icon: Zap, color: PINK, bg: '#FFF5F7' },
      ].map((p) => (
        <Card key={p.no} style={{ padding: '40px 34px', height: 424, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -14, top: -22, fontSize: 128, fontWeight: 900, color: '#F2F5F9', lineHeight: 1, letterSpacing: '-0.05em' }}>{p.no}</div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ width: 76, height: 76, borderRadius: 24, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 36 }}>
              <p.icon size={34} color={p.color} />
            </div>
            <div style={{ fontSize: 10, letterSpacing: '0.24em', color: p.color, fontWeight: 900, marginBottom: 14 }}>{p.en}</div>
            <h3 style={{ fontSize: 27, fontWeight: 900, color: INK, margin: '0 0 20px', letterSpacing: '-0.02em' }}>{p.title}</h3>
            <p style={{ fontSize: 14.5, color: MUTE, lineHeight: 1.95, margin: 0, fontWeight: 600 }}>{p.desc}</p>
            <div style={{ marginTop: 'auto', width: 36, height: 4, background: p.color, borderRadius: 2 }} />
          </div>
        </Card>
      ))}
    </div>
    <Foot n={6} />
  </div>
);

/* ============================================================
   10  SECTION 02
   ============================================================ */
const S10 = <Divider key="s10" no="01" en="SERVICES" ja="4つの事業" lead="戦略・開発・AI・事業支援を、ひとつのチームで。" n={7} />;

/* ============================================================
   11  4つの事業の柱（相関図）
   ============================================================ */
const S11 = (
  <div key="s11" className={SLIDE} style={{ background: PAPER, padding: '46px 64px 0' }}>
    <Head eyebrow="Business Domain" title="4つの事業が、ひとつの成長を支える。" />
    <div style={{ position: 'relative', height: 430 }}>
      {/* 接続線 */}
      <svg width="100%" height="430" viewBox="0 0 1152 430" style={{ position: 'absolute', left: 0, top: 0 }}>
        <line x1="430" y1="126" x2="546" y2="196" stroke="#DCE2EC" strokeWidth="2" />
        <line x1="722" y1="126" x2="606" y2="196" stroke="#DCE2EC" strokeWidth="2" />
        <line x1="430" y1="304" x2="546" y2="234" stroke="#DCE2EC" strokeWidth="2" />
        <line x1="722" y1="304" x2="606" y2="234" stroke="#DCE2EC" strokeWidth="2" />
      </svg>

      {/* 中央 */}
      <div style={{ position: 'absolute', left: '50%', top: 215, transform: 'translate(-50%, -50%)', width: 190, height: 190, borderRadius: '50%', background: INK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(13,27,62,0.28)', zIndex: 2 }}>
        <Target size={26} color={CYAN} />
        <div style={{ fontSize: 16, fontWeight: 900, color: '#FFFFFF', marginTop: 12, lineHeight: 1.5, textAlign: 'center' }}>お客様の<br />事業成長</div>
      </div>

      {/* 4象限 */}
      {[
        { icon: Code2, color: TEAL, bg: '#E6FFFA', en: 'DEVELOPMENT', title: '受託開発', desc: '複雑な要件を、シンプルな体験へ。', pos: { left: 0, top: 40 } },
        { icon: Brain, color: VIOLET, bg: '#F5F3FF', en: 'AI R&D', title: 'AI研究開発', desc: '最先端の知能を、プロダクトへ実装。', pos: { right: 0, top: 40 } },
        { icon: Compass, color: PINK, bg: '#FFF5F7', en: 'CONSULTING', title: 'ITコンサルティング', desc: '成功から逆算した、戦略と設計。', pos: { left: 0, bottom: 20 } },
        { icon: Handshake, color: AMBER, bg: '#FFFAF0', en: 'BUSINESS SUPPORT', title: '多角的事業支援', desc: 'マーケ・採用・資金まで統合支援。', pos: { right: 0, bottom: 20 } },
      ].map((s) => (
        <Card key={s.title} style={{ position: 'absolute', width: 430, padding: '24px 26px', display: 'flex', gap: 20, alignItems: 'center', zIndex: 2, ...s.pos }}>
          <div style={{ width: 62, height: 62, borderRadius: 20, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <s.icon size={28} color={s.color} />
          </div>
          <div>
            <div style={{ fontSize: 9.5, letterSpacing: '0.2em', color: s.color, fontWeight: 900, marginBottom: 6 }}>{s.en}</div>
            <div style={{ fontSize: 21, fontWeight: 900, color: INK, marginBottom: 7, letterSpacing: '-0.02em' }}>{s.title}</div>
            <div style={{ fontSize: 12.5, color: MUTE, fontWeight: 600 }}>{s.desc}</div>
          </div>
        </Card>
      ))}
    </div>
    <Card style={{ padding: '15px 26px', background: INK, border: 'none', display: 'flex', alignItems: 'center', gap: 18, marginTop: 4 }}>
      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: CYAN, fontWeight: 900, flexShrink: 0 }}>SYNERGY</span>
      <span style={{ fontSize: 14, color: '#FFFFFF', fontWeight: 800 }}>戦略を描いたその日から、開発に着手できる。──「描く」と「作る」が同じ社内にあります。</span>
    </Card>
    <Foot n={8} />
  </div>
);

/* ============================================================
   12  受託開発
   ============================================================ */
const S12 = (
  <div key="s12" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head eyebrow="Service 01 / Development" title="受託開発 ─ 想いを、形にする技術。" />

    {/* 対応領域 */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 34 }}>
      {[
        { icon: Monitor, t: 'Webアプリ', d: 'SaaS・業務システム', c: TEAL },
        { icon: Smartphone, t: 'モバイルアプリ', d: 'iOS / Android / Flutter', c: '#3182CE' },
        { icon: Rocket, t: 'MVP開発', d: '新規事業の最速立ち上げ', c: VIOLET },
        { icon: Workflow, t: 'DX支援', d: '業務のデジタル化・連携', c: PINK },
      ].map((d) => (
        <Card key={d.t} style={{ padding: '26px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 17, background: PAPER, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <d.icon size={24} color={d.c} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: INK, marginBottom: 4 }}>{d.t}</div>
            <div style={{ fontSize: 11.5, color: MUTE, fontWeight: 700 }}>{d.d}</div>
          </div>
        </Card>
      ))}
    </div>

    {/* ハイブリッド開発 */}
    <div style={{ fontSize: 10, letterSpacing: '0.2em', color: VIOLET, fontWeight: 900, marginBottom: 16 }}>MEECE推奨 ／ ハイブリッド開発</div>
    <div style={{ display: 'flex', marginBottom: 26 }}>
      <Chevron bg="#E6FFFA" first>
        <div style={{ fontSize: 10, fontWeight: 900, color: TEAL, letterSpacing: '0.12em', marginBottom: 7 }}>PHASE 01 ／ アジャイル</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: INK, marginBottom: 8, letterSpacing: '-0.02em' }}>まず、世に出す。</div>
        <div style={{ fontSize: 12.5, color: MUTE, fontWeight: 700 }}>核となる最小機能を優先実装し、実ユーザーの声を集める。</div>
      </Chevron>
      <Chevron bg="#F5F3FF">
        <div style={{ fontSize: 10, fontWeight: 900, color: VIOLET, letterSpacing: '0.12em', marginBottom: 7 }}>PHASE 02 ／ ウォーターフォール</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: INK, marginBottom: 8, letterSpacing: '-0.02em' }}>そして、育てる。</div>
        <div style={{ fontSize: 12.5, color: MUTE, fontWeight: 700 }}>検証結果をもとに大規模拡張と品質・セキュリティを強化。</div>
      </Chevron>
      <Chevron bg={INK}>
        <div style={{ fontSize: 10, fontWeight: 900, color: CYAN, letterSpacing: '0.12em', marginBottom: 7 }}>AFTER RELEASE ／ 運用</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 8, letterSpacing: '-0.02em' }}>止めずに、伸ばす。</div>
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', fontWeight: 700 }}>24時間365日の監視と、データに基づく継続的な改善。</div>
      </Chevron>
    </div>

    <div style={{ display: 'flex', gap: 16 }}>
      <Card style={{ flex: 1, padding: '24px 26px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <Clock size={18} color={TEAL} />
        <span style={{ fontSize: 12.5, fontWeight: 900, color: INK }}>開発期間の目安</span>
        <span style={{ fontSize: 12.5, color: MUTE, fontWeight: 700, marginLeft: 'auto' }}>
          小規模 <span style={{ color: INK, fontWeight: 900 }}>最短1〜3ヶ月</span>　／　大規模基幹 <span style={{ color: INK, fontWeight: 900 }}>1年半〜3年</span>
        </span>
      </Card>
      <Card style={{ width: 470, padding: '24px 26px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.16em', color: FAINT, fontWeight: 900, flexShrink: 0 }}>STACK</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['React', 'TypeScript', 'Next.js', 'Flutter', 'Python', 'Go', 'AWS'].map((t) => (
            <span key={t} style={{ fontSize: 10.5, fontWeight: 800, color: INK, background: PAPER, borderRadius: 7, padding: '4px 9px' }}>{t}</span>
          ))}
        </div>
      </Card>
    </div>
    <Foot n={9} />
  </div>
);

/* ============================================================
   13  AI研究開発
   ============================================================ */
const S13 = (
  <div key="s13" className={SLIDE} style={{ background: PAPER, padding: '46px 64px 0' }}>
    <Head eyebrow="Service 02 / AI R&D" title="AI研究開発 ─ 知能を、ビジネスの鼓動に。" />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
      {[
        { icon: Bot, t: '生成AI・LLM実装', d: 'RAGによる社内ナレッジ活用と業務自動化', c: VIOLET, bg: '#F5F3FF' },
        { icon: Database, t: '独自学習モデル開発', d: 'ドメイン特化の機械学習モデルを構築', c: TEAL, bg: '#E6FFFA' },
        { icon: Target, t: 'AI導入・戦略立案', d: '費用対効果から逆算したロードマップ', c: PINK, bg: '#FFF5F7' },
      ].map((s) => (
        <Card key={s.t} style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 46, height: 46, borderRadius: 15, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <s.icon size={21} color={s.c} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: INK, marginBottom: 4 }}>{s.t}</div>
            <div style={{ fontSize: 11.5, color: MUTE, fontWeight: 700 }}>{s.d}</div>
          </div>
        </Card>
      ))}
    </div>

    <Card style={{ padding: '24px 30px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.2em', color: VIOLET, fontWeight: 900 }}>RAG</span>
        <span style={{ fontSize: 18, fontWeight: 900, color: INK }}>社内の情報を、正確に答えるAIへ。</span>
        <span style={{ fontSize: 12, color: MUTE, fontWeight: 700 }}>ハルシネーション（誤答）を防ぐ検索拡張生成の仕組み</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {[
          { icon: MessageSquare, t: '質問', d: '実務の疑問を入力', c: '#94A3B8' },
          { icon: Search, t: '検索', d: '社内文書から抽出', c: TEAL },
          { icon: Layers, t: '統合', d: '質問と根拠を結合', c: VIOLET },
          { icon: CheckCircle2, t: '回答', d: '根拠つきで生成', c: CRIMSON },
        ].map((s, i, arr) => (
          <div key={s.t} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ flex: 1, background: PAPER, borderRadius: 18, padding: '20px 18px', textAlign: 'center', border: `2px solid ${i === 3 ? '#FFE0EB' : 'transparent'}` }}>
              <div style={{ width: 46, height: 46, borderRadius: 15, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 4px 12px rgba(13,27,62,0.06)' }}>
                <s.icon size={21} color={s.c} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 900, color: FAINT, letterSpacing: '0.14em', marginBottom: 6 }}>STEP {i + 1}</div>
              <div style={{ fontSize: 17, fontWeight: 900, color: INK, marginBottom: 6 }}>{s.t}</div>
              <div style={{ fontSize: 11.5, color: MUTE, fontWeight: 700 }}>{s.d}</div>
            </div>
            {i < arr.length - 1 && (
              <div style={{ padding: '0 10px', flexShrink: 0 }}>
                <ArrowRight size={20} color="#C7CFDB" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18, paddingTop: 18, borderTop: `1px solid ${BORDER}` }}>
        <span style={{ fontSize: 10, letterSpacing: '0.16em', color: FAINT, fontWeight: 900, flexShrink: 0 }}>OTHER MODELS</span>
        {[
          { icon: Eye, t: '画像・動画解析' },
          { icon: BarChart3, t: '数値・成果予測' },
          { icon: Mic, t: '音声・音響解析' },
          { icon: Puzzle, t: 'マルチモーダルAI' },
        ].map((m) => (
          <div key={m.t} style={{ display: 'flex', alignItems: 'center', gap: 8, background: PAPER, borderRadius: 100, padding: '8px 16px' }}>
            <m.icon size={14} color={VIOLET} />
            <span style={{ fontSize: 12, fontWeight: 800, color: INK }}>{m.t}</span>
          </div>
        ))}
      </div>
    </Card>
    <Foot n={10} />
  </div>
);

/* ============================================================
   14  AIによる開発スピード
   ============================================================ */
const S14 = (
  <div key="s14" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head eyebrow="AI Acceleration" title="AIで、開発の時間軸を変える。" lead="各行とも「従来の手法」を100%としたときの、期間の比較イメージです。" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {[
        { scale: '小規模', ex: 'ホームページ・社内ツール', legacy: '2ヶ月', meece: '1週間以内', w: 12.5, cut: '87.5', color: TEAL },
        { scale: '中規模', ex: 'ECサイト・在庫管理システム', legacy: '6ヶ月', meece: '1ヶ月以内', w: 16.7, cut: '83.3', color: VIOLET },
        { scale: '大規模', ex: '基幹システム・大規模事業基盤', legacy: '1年（12ヶ月）', meece: '半年（6ヶ月）〜', w: 50, cut: '50.0', color: PINK },
      ].map((r) => (
        <Card key={r.scale} style={{ padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 26 }}>
          <div style={{ width: 210, flexShrink: 0 }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: INK, marginBottom: 4, letterSpacing: '-0.02em' }}>{r.scale}</div>
            <div style={{ fontSize: 11, color: FAINT, fontWeight: 700 }}>{r.ex}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: FAINT, fontWeight: 900, width: 62, flexShrink: 0 }}>従来</span>
              <div style={{ flex: 1, height: 22, background: '#EDF0F5', borderRadius: 11 }} />
              <span style={{ fontSize: 14, fontWeight: 900, color: FAINT, width: 110, textAlign: 'right', flexShrink: 0 }}>{r.legacy}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 10, color: r.color, fontWeight: 900, width: 62, flexShrink: 0 }}>MEECE</span>
              <div style={{ flex: 1, height: 22, background: '#F5F7FA', borderRadius: 11, overflow: 'hidden' }}>
                <div style={{ width: `${r.w}%`, height: '100%', background: `linear-gradient(to right, ${r.color}, ${VIOLET})`, borderRadius: 11 }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 900, color: INK, width: 110, textAlign: 'right', flexShrink: 0 }}>{r.meece}</span>
            </div>
          </div>
          <div style={{ width: 132, flexShrink: 0, textAlign: 'center' }}>
            <div style={{ fontSize: 34, fontWeight: 900, color: r.color, lineHeight: 1, letterSpacing: '-0.03em' }}>{r.cut}<span style={{ fontSize: 18 }}>%</span></div>
            <div style={{ fontSize: 11, fontWeight: 900, color: MUTE, marginTop: 6 }}>短縮</div>
          </div>
        </Card>
      ))}
    </div>
    <Card style={{ marginTop: 18, padding: '16px 28px', background: INK, border: 'none', display: 'flex', alignItems: 'center', gap: 18 }}>
      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: CYAN, fontWeight: 900, flexShrink: 0 }}>WHY SO FAST?</span>
      <span style={{ fontSize: 14, color: '#FFFFFF', fontWeight: 800 }}>AIによるコード自動生成と並列レビュー体制が、従来の「待ち時間」を排除しています。</span>
    </Card>
    <Foot n={11} />
  </div>
);

/* ============================================================
   15  ITコンサルティング
   ============================================================ */
const S15 = (
  <div key="s15" className={SLIDE} style={{ background: PAPER, padding: '46px 64px 0' }}>
    <Head eyebrow="Service 03 / Consulting" title="ITコンサルティング ─ 滞った物語を、動かす。" lead="ツール導入の前に、まず経営課題を整理する「0次DX」から。" />

    <Card style={{ padding: '34px 34px', marginBottom: 24 }}>
      {/* Before */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22 }}>
        <div style={{ width: 108, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 900, color: FAINT, letterSpacing: '0.14em', marginBottom: 4 }}>BEFORE</div>
          <div style={{ fontSize: 15, fontWeight: 900, color: FAINT }}>導入前</div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ flex: 2, height: 56, background: '#E6EAF1', borderRadius: '12px 0 0 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#8A93A3' }}>要件定義</div>
          <div style={{ flex: 3, height: 56, background: 'repeating-linear-gradient(45deg, #FFE3EC, #FFE3EC 8px, #FFD3E1 8px, #FFD3E1 16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 900, color: CRIMSON }}>意思決定の停滞</span>
          </div>
          <div style={{ flex: 3, height: 56, background: '#E6EAF1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#8A93A3' }}>開発フェーズ</div>
          <div style={{ flex: 1.2, height: 56, background: '#D8DEE8', borderRadius: '0 12px 12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#6B7686' }}>リリース</div>
        </div>
      </div>

      {/* After */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 108, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 900, color: TEAL, letterSpacing: '0.14em', marginBottom: 4 }}>AFTER</div>
          <div style={{ fontSize: 15, fontWeight: 900, color: INK }}>Meece導入後</div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ flex: 2, height: 56, background: '#E6FFFA', borderRadius: '12px 0 0 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: TEAL }}>戦略策定</div>
          <div style={{ flex: 2.6, height: 56, background: '#EDE7FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: VIOLET }}>開発・実装</div>
          <div style={{ flex: 1, height: 56, background: INK, borderRadius: '0 12px 12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#FFFFFF' }}>リリース</div>
          <div style={{ flex: 3.6, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 2, background: `repeating-linear-gradient(to right, ${CRIMSON}, ${CRIMSON} 6px, transparent 6px, transparent 12px)` }} />
            <span style={{ fontSize: 13, fontWeight: 900, color: CRIMSON, flexShrink: 0 }}>約40%の期間短縮</span>
          </div>
        </div>
      </div>
    </Card>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {[
        { no: '01', t: '現状把握', d: '経営陣ヒアリングと現場調査' },
        { no: '02', t: '戦略策定', d: '予算・優先順位からROI最大化' },
        { no: '03', t: '実行支援', d: 'ベンダー選定・要件監修・PMO' },
        { no: '04', t: '継続的改善', d: '効果検証と次フェーズの提案' },
      ].map((s) => (
        <Card key={s.no} style={{ padding: '28px 26px' }}>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#E4E8EF', lineHeight: 1, marginBottom: 14 }}>{s.no}</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: INK, marginBottom: 7 }}>{s.t}</div>
          <div style={{ fontSize: 11.5, color: MUTE, fontWeight: 700, lineHeight: 1.6 }}>{s.d}</div>
        </Card>
      ))}
    </div>
    <Foot n={12} />
  </div>
);

/* ============================================================
   16  多角的事業支援
   ============================================================ */
const S16 = (
  <div key="s16" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head eyebrow="Service 04 / Business Support" title="多角的事業支援 ─ 予算は、創り出せる。" lead="経営を健全化し、IT投資の原資そのものを生み出すところから伴走します。" />

    {/* 階段の図 */}
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 364, marginBottom: 26 }}>
      {[
        { no: 'STEP 01', t: '売上・利益の最適化', d: '収益構造とマーケを立て直し、\nキャッシュフローを安定させる。', h: 240, c: TEAL, bg: '#E6FFFA', icon: BarChart3, tags: ['ボトルネック特定', 'マーケ最適化'] },
        { no: 'STEP 02', t: '予算の最適化・確保', d: '補助金活用とコスト改善で、\nIT投資の原資を捻出する。', h: 302, c: VIOLET, bg: '#F5F3FF', icon: Wallet, tags: ['ROI算出', '補助金申請支援'] },
        { no: 'STEP 03', t: '最適なIT実装', d: '土台が整ってから、実務に\n本当に必要なシステムを導入。', h: 364, c: PINK, bg: '#FFF5F7', icon: Layers, tags: ['システム選定', '自社チームで実装'] },
      ].map((s, i) => (
        <div key={s.no} style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 18 }}>
          <Card style={{ flex: 1, height: s.h, padding: '22px 24px', display: 'flex', flexDirection: 'column', borderTop: `5px solid ${s.c}`, background: i === 2 ? s.bg : '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 900, color: s.c, letterSpacing: '0.16em' }}>{s.no}</span>
              <s.icon size={19} color={s.c} />
            </div>
            <div style={{ fontSize: 19, fontWeight: 900, color: INK, marginBottom: 12, letterSpacing: '-0.02em' }}>{s.t}</div>
            <p style={{ fontSize: 12.5, color: MUTE, lineHeight: 1.85, margin: 0, fontWeight: 600, whiteSpace: 'pre-line' }}>{s.d}</p>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {s.tags.map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, background: i === 2 ? '#FFFFFF' : s.bg, borderRadius: 9, padding: '9px 12px' }}>
                  <CheckCircle2 size={13} color={s.c} />
                  <span style={{ fontSize: 11.5, fontWeight: 800, color: s.c }}>{t}</span>
                </div>
              ))}
            </div>
          </Card>
          {i < 2 && <ArrowRight size={22} color="#C7CFDB" style={{ marginBottom: 96, flexShrink: 0 }} />}
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ fontSize: 10, letterSpacing: '0.18em', color: FAINT, fontWeight: 900, flexShrink: 0 }}>支援領域</span>
      {[
        { icon: Megaphone, t: 'マーケティング' },
        { icon: UserPlus, t: '人事・採用支援' },
        { icon: Banknote, t: '資金調達支援' },
        { icon: Lightbulb, t: '新規事業開発' },
      ].map((s) => (
        <div key={s.t} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: PAPER, borderRadius: 100, padding: '15px 22px' }}>
          <s.icon size={15} color={AMBER} />
          <span style={{ fontSize: 12.5, fontWeight: 800, color: INK }}>{s.t}</span>
        </div>
      ))}
    </div>
    <Foot n={13} />
  </div>
);

/* ============================================================
   17  SECTION 03
   ============================================================ */
const S17 = <Divider key="s17" no="02" en="TOPICS 2026" ja="新しい取り組み" lead="予算の壁を壊す新事業、高速PoC、そして自社プロダクト。" n={14} />;

/* ============================================================
   18  少額案件償却プロジェクト
   ============================================================ */
const S18 = (
  <div key="s18" className={SLIDE} style={{ background: PAPER, padding: '46px 64px 0' }}>
    <Head eyebrow="Topic 01 / Small Project" title="システム開発は、100万円から。" lead="「予算が足りない」を、DXを諦める理由にしない。" />

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.55fr', gap: 22 }}>
      <Card style={{ background: INK, border: 'none', padding: '32px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.2em', color: CYAN, fontWeight: 900, marginBottom: 22 }}>これまでの常識 → Meece</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through', letterSpacing: '-0.02em' }}>¥1,000万〜</div>
        <div style={{ margin: '10px 0 12px' }}>
          <ArrowRight size={22} color={CYAN} style={{ transform: 'rotate(90deg)' }} />
        </div>
        <div style={{ fontSize: 58, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1 }}>¥100万〜</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 700, margin: '18px 0 26px' }}>最短1ヶ月／開発規模に上限なし</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 22 }}>
          {['AI駆動開発による高速化', '独自の開発フレームワーク', '少数精鋭の体制'].map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={15} color={CYAN} />
              <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>{t}</span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.2em', color: CRIMSON, fontWeight: 900 }}>実績 ─ 従来の開発費との比較</div>
        {[
          { t: 'EC在庫一元管理システム', legacy: 2000, cost: 400, m: '1.5ヶ月', c: TEAL },
          { t: '情報マッチングシステム', legacy: 1200, cost: 200, m: '1ヶ月', c: VIOLET },
          { t: '社内ワークフローシステム', legacy: 1500, cost: 300, m: '2ヶ月', c: PINK },
        ].map((r) => (
          <Card key={r.t} style={{ padding: '18px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: INK }}>{r.t}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: FAINT }}>納期 {r.m}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: FAINT, fontWeight: 900, width: 44, flexShrink: 0 }}>従来</span>
              <div style={{ flex: 1, height: 16, background: '#EDF0F5', borderRadius: 8 }} />
              <span style={{ fontSize: 12.5, fontWeight: 800, color: FAINT, width: 96, textAlign: 'right', flexShrink: 0 }}>約{r.legacy.toLocaleString()}万円</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 10, color: r.c, fontWeight: 900, width: 44, flexShrink: 0 }}>MEECE</span>
              <div style={{ flex: 1, height: 16, background: '#F5F7FA', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ width: `${(r.cost / r.legacy) * 100}%`, height: '100%', background: r.c, borderRadius: 8 }} />
              </div>
              <span style={{ fontSize: 17, fontWeight: 900, color: INK, width: 96, textAlign: 'right', flexShrink: 0 }}>{r.cost}万円</span>
            </div>
          </Card>
        ))}
        <Card style={{ padding: '13px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Wallet size={16} color={VIOLET} />
          <span style={{ fontSize: 12.5, fontWeight: 900, color: INK }}>補助金との相性も良好</span>
          <span style={{ fontSize: 11.5, color: MUTE, fontWeight: 700 }}>小規模事業者持続化／デジタル化・AI導入2026／ものづくり補助金</span>
        </Card>
      </div>
    </div>
    <Foot n={15} />
  </div>
);

/* ============================================================
   19  AI開発ラボ
   ============================================================ */
const S19 = (
  <div key="s19" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head eyebrow="Topic 02 / AI Lab" title="AI開発ラボ ─ 最短2週間で、動くものを。" lead="アイデアの段階で「触れる形」にして、意思決定のスピードを上げます。" />

    {/* 期間比較 */}
    <Card style={{ padding: '26px 30px', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
        <div style={{ width: 128, flexShrink: 0, fontSize: 12, fontWeight: 900, color: FAINT }}>従来の開発</div>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {['要件定義', '設計', '実装', 'テスト', '初回デモ'].map((t) => (
            <div key={t} style={{ flex: 1, height: 42, background: '#EDF0F5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 800, color: '#8A93A3' }}>{t}</div>
          ))}
        </div>
        <div style={{ width: 96, flexShrink: 0, textAlign: 'right', fontSize: 15, fontWeight: 900, color: FAINT }}>数ヶ月</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 128, flexShrink: 0, fontSize: 12, fontWeight: 900, color: INK }}>AI開発ラボ</div>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          <div style={{ flex: 2, height: 42, borderRadius: 8, background: `linear-gradient(to right, ${TEAL}, ${VIOLET})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 900, color: '#FFFFFF' }}>
            ヒアリング → AI駆動で実装 → 動くプロトタイプ
          </div>
          <div style={{ flex: 3, height: 42, display: 'flex', alignItems: 'center', paddingLeft: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: CRIMSON }}>その先の検証・拡張へすぐ進める</span>
          </div>
        </div>
        <div style={{ width: 96, flexShrink: 0, textAlign: 'right', fontSize: 22, fontWeight: 900, color: INK, letterSpacing: '-0.02em' }}>2週間</div>
      </div>
    </Card>

    {/* 3つの活用型 */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 18 }}>
      {[
        { tag: '大手企業様', t: 'PoC・システム更改', d: '最小限のチームで、品質を保ったまま工期を60%削減。', c: TEAL, bg: '#E6FFFA', icon: Building2 },
        { tag: '中小企業様', t: '新規プロダクト開発', d: '事業に必要な基盤をAIモジュールで一気に構築。', c: VIOLET, bg: '#F5F3FF', icon: Rocket },
        { tag: '営業会社様', t: '商談を動かすデモ実装', d: '2回目の商談までに、60%完成した「動くデモ」を提示。', c: PINK, bg: '#FFF5F7', icon: Handshake },
      ].map((c) => (
        <Card key={c.t} style={{ padding: '24px 26px', height: 176, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 10, fontWeight: 900, color: c.c, background: c.bg, borderRadius: 100, padding: '6px 14px' }}>{c.tag}</span>
            <c.icon size={19} color={c.c} />
          </div>
          <div style={{ fontSize: 19, fontWeight: 900, color: INK, marginBottom: 12, letterSpacing: '-0.02em' }}>{c.t}</div>
          <p style={{ fontSize: 12.5, color: MUTE, lineHeight: 1.8, margin: 0, fontWeight: 600 }}>{c.d}</p>
        </Card>
      ))}
    </div>

    <div style={{ display: 'flex', gap: 16 }}>
      {[
        { icon: Gauge, t: '従来の10倍の構築速度' },
        { icon: Shield, t: '型定義と最新プロトコルで堅牢' },
        { icon: Server, t: '拡張前提の設計・ソースコード納品可' },
      ].map((f) => (
        <Card key={f.t} style={{ flex: 1, padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <f.icon size={16} color={VIOLET} />
          <span style={{ fontSize: 12.5, fontWeight: 800, color: INK }}>{f.t}</span>
        </Card>
      ))}
    </div>
    <Foot n={16} />
  </div>
);

/* ============================================================
   20  Dev Ticket（自社プロダクト）
   ============================================================ */
const S20 = (
  <div key="s20" className={SLIDE} style={{ background: PAPER, display: 'flex' }}>
    <div style={{ width: 452, background: INK, padding: '58px 46px 0', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ position: 'absolute', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.24) 0%, rgba(52,211,153,0) 70%)', bottom: -180, right: -140 }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30 }}>
          <span style={{ width: 22, height: 3, background: '#34D399', borderRadius: 2 }} />
          <span style={{ fontSize: 10, letterSpacing: '0.22em', color: '#34D399', fontWeight: 900 }}>TOPIC 03 / PRODUCT</span>
        </div>
        <div style={{ width: 62, height: 62, borderRadius: 20, background: 'linear-gradient(145deg, #34D399, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 12px 30px rgba(5,150,105,0.4)' }}>
          <Ticket size={28} color="#FFFFFF" />
        </div>
        <h2 style={{ fontSize: 42, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', margin: '0 0 16px', lineHeight: 1.1 }}>Dev Ticket</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, margin: '0 0 30px', fontWeight: 600 }}>
          開発チームに必要なすべてを、一つに。
        </p>
        <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: '18px 20px' }}>
          <div style={{ fontSize: 10, color: '#34D399', fontWeight: 900, letterSpacing: '0.16em', marginBottom: 8 }}>2026.06.24 RELEASE</div>
          <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontWeight: 700 }}>
            受託開発の現場から生まれた、自社プロダクト第一弾。
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 26 }}>
          {['現場の実務に即した設計', 'リスト・ボード・ガントの3ビュー', 'チケットからAIプロンプトを自動生成'].map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <CheckCircle2 size={15} color="#34D399" />
              <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{ flex: 1, padding: '52px 56px 0', display: 'flex', flexDirection: 'column' }}>
      {/* 製品モック */}
      <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 16, boxShadow: '0 20px 50px rgba(13,27,62,0.10)', overflow: 'hidden', display: 'flex', height: 430 }}>
        <div style={{ width: 52, background: '#FBFCFD', borderRight: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 9, background: 'linear-gradient(145deg,#34D399,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ticket size={13} color="#FFFFFF" />
          </div>
          <div style={{ width: 22, height: 1, background: BORDER, margin: '4px 0' }} />
          {[LayoutDashboard, Layers, Users, BarChart3, Clock].map((Ic, i) => (
            <div key={i} style={{ width: 30, height: 30, borderRadius: 9, background: i === 1 ? '#ECFDF5' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic size={14} color={i === 1 ? '#059669' : '#C2C8D2'} />
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ height: 38, borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: PAPER, borderRadius: 7, padding: '5px 10px', width: 190 }}>
              <Search size={10} color="#B9C0CC" />
              <span style={{ fontSize: 9.5, color: '#B9C0CC', fontWeight: 700 }}>チケットを検索...</span>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: '#059669', color: '#fff', fontSize: 8, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>M</div>
              <span style={{ fontSize: 9.5, fontWeight: 800, color: '#6B7280' }}>スプリント #12</span>
            </div>
          </div>

          <div style={{ padding: '12px 14px', display: 'flex', gap: 8 }}>
            {[
              { l: '進行中', v: '12', c: '#059669' },
              { l: 'レビュー', v: '4', c: '#0284C7' },
              { l: '完了', v: '31', c: '#7C3AED' },
              { l: '遅延', v: '1', c: CRIMSON },
            ].map((s) => (
              <div key={s.l} style={{ flex: 1, background: PAPER, borderRadius: 9, padding: '8px 10px' }}>
                <div style={{ fontSize: 8.5, color: FAINT, fontWeight: 900, marginBottom: 3 }}>{s.l}</div>
                <div style={{ fontSize: 17, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.v}</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, padding: '2px 14px 14px', display: 'flex', gap: 8, minHeight: 0 }}>
            {[
              { t: 'TODO', c: '#94A3B8', items: [['認証基盤の設計', '#EEF2F7'], ['CSV取込の改修', '#EEF2F7'], ['請求書出力の追加', '#EEF2F7'], ['検索条件の保存', '#EEF2F7']] },
              { t: 'IN PROGRESS', c: '#059669', items: [['ダッシュボードAPI', '#ECFDF5'], ['権限ロール追加', '#ECFDF5'], ['通知バッチ', '#ECFDF5'], ['ガント表示の改善', '#ECFDF5']] },
              { t: 'REVIEW', c: '#0284C7', items: [['ガントの表示崩れ', '#EFF6FF'], ['CSV文字化け対応', '#EFF6FF'], ['ログイン導線の修正', '#EFF6FF']] },
              { t: 'DONE', c: '#7C3AED', items: [['スプリント作成', '#F5F3FF'], ['Wiki連携', '#F5F3FF'], ['議事録テンプレ', '#F5F3FF'], ['メンバー招待', '#F5F3FF']] },
            ].map((col) => (
              <div key={col.t} style={{ flex: 1, background: '#FBFCFD', borderRadius: 10, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                  <span style={{ width: 5, height: 5, borderRadius: 3, background: col.c }} />
                  <span style={{ fontSize: 8, fontWeight: 900, color: col.c, letterSpacing: '0.06em' }}>{col.t}</span>
                </div>
                {col.items.map(([label, bg]) => (
                  <div key={label} style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 8px' }}>
                    <div style={{ fontSize: 8.5, fontWeight: 800, color: INK, lineHeight: 1.4, marginBottom: 5 }}>{label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 7, fontWeight: 900, color: col.c, background: bg, borderRadius: 4, padding: '2px 5px' }}>#{Math.abs(label.length * 7) % 90 + 10}</span>
                      <span style={{ width: 12, height: 12, borderRadius: 6, background: '#E6EAF1' }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 22 }}>
        {[
          { icon: LayoutDashboard, t: 'ダッシュボード', c: '#059669' },
          { icon: Layers, t: 'スプリント管理', c: '#0284C7' },
          { icon: Users, t: 'リソース調達', c: '#EA580C' },
          { icon: Sparkles, t: 'AI連携', c: '#DB2777' },
        ].map((f) => (
          <Card key={f.t} style={{ padding: '20px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <f.icon size={17} color={f.c} />
            <span style={{ fontSize: 12.5, fontWeight: 900, color: INK }}>{f.t}</span>
          </Card>
        ))}
      </div>
    </div>
    <Foot n={17} />
  </div>
);

/* ============================================================
   21  SECTION 04
   ============================================================ */
const S21 = <Divider key="s21" no="03" en="RESULTS" ja="実績とご相談" lead="経営の理想を、テクノロジーで具現化してきた軌跡。" n={18} />;

/* ============================================================
   22  支援事例
   ============================================================ */
const S22 = (
  <div key="s22" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head eyebrow="Case Studies" title="支援事例 ─ 物語の再始動。" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
      {[
        {
          no: 'CASE 01', client: '老舗50年のお菓子屋さん', profile: '年商5億未満 ／ IT未導入',
          issue: '在庫管理はエクセル。50年の知見が属人化し、停滞。',
          steps: [{ icon: Search, t: '財務の解剖' }, { icon: Layers, t: 'IT資産の棚卸し' }, { icon: Bot, t: 'AIで開発' }],
          result: '40', unit: '%', label: '開発コスト削減', note: '余剰資産の範囲内で完結。人件費も大幅削減。',
          c: TEAL, bg: '#E6FFFA',
        },
        {
          no: 'CASE 02', client: '急成長を目指すベンチャー', profile: '売上立ち上げ前 ／ 5,000万円調達済',
          issue: '限られた資金で、PMFを最速で証明する必要があった。',
          steps: [{ icon: Target, t: 'KPI設計' }, { icon: Rocket, t: 'MVPで検証' }, { icon: Workflow, t: 'アジャイル拡張' }],
          result: '数週間', unit: '', label: 'でMVPを構築', note: '浮いた開発費をマーケへ。トラクション形成に成功。',
          c: VIOLET, bg: '#F5F3FF',
        },
      ].map((c) => (
        <Card key={c.no} style={{ padding: '28px 30px', height: 442, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 900, color: c.c, background: c.bg, borderRadius: 100, padding: '6px 14px', letterSpacing: '0.1em' }}>{c.no}</span>
            <span style={{ fontSize: 11, color: FAINT, fontWeight: 800 }}>{c.profile}</span>
          </div>
          <h3 style={{ fontSize: 26, fontWeight: 900, color: INK, margin: '0 0 16px', letterSpacing: '-0.03em' }}>{c.client}</h3>
          <div style={{ background: PAPER, borderRadius: 12, padding: '13px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 900, color: CRIMSON, flexShrink: 0 }}>課題</span>
            <span style={{ fontSize: 12.5, color: MUTE, fontWeight: 700, lineHeight: 1.6 }}>{c.issue}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 26 }}>
            {c.steps.map((s, i, arr) => (
              <div key={s.t} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 17, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                    <s.icon size={23} color={c.c} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: INK }}>{s.t}</div>
                </div>
                {i < arr.length - 1 && <ArrowRight size={16} color="#C7CFDB" style={{ flexShrink: 0, marginBottom: 22 }} />}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', borderTop: `1px solid ${BORDER}`, paddingTop: 22, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: c.c, lineHeight: 1, letterSpacing: '-0.04em' }}>
                {c.result}<span style={{ fontSize: 24 }}>{c.unit}</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 900, color: INK, marginTop: 8 }}>{c.label}</div>
            </div>
            <p style={{ fontSize: 12, color: MUTE, lineHeight: 1.75, margin: 0, fontWeight: 600 }}>{c.note}</p>
          </div>
        </Card>
      ))}
    </div>
    <Foot n={19} />
  </div>
);

/* ============================================================
   23  対応産業とフェーズ
   ============================================================ */
const S23 = (
  <div key="s23" className={SLIDE} style={{ background: PAPER, padding: '46px 64px 0' }}>
    <Head eyebrow="Industry & Phase" title="産業もフェーズも問わず、最適な規模で。" />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 14, marginBottom: 26 }}>
      {[
        { icon: Factory, t: '製造', c: TEAL },
        { icon: GraduationCap, t: '教育', c: '#3182CE' },
        { icon: Sparkles, t: 'エンタメ', c: VIOLET },
        { icon: Store, t: '小売・コマース', c: PINK },
        { icon: Zap, t: 'エネルギー', c: AMBER },
        { icon: Heart, t: 'ヘルスケア', c: CRIMSON },
        { icon: Building2, t: '不動産', c: '#0D9488' },
      ].map((i) => (
        <Card key={i.t} style={{ padding: '20px 8px', textAlign: 'center' }}>
          <div style={{ width: 46, height: 46, borderRadius: 15, background: PAPER, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <i.icon size={21} color={i.c} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 900, color: INK }}>{i.t}</div>
        </Card>
      ))}
    </div>

    <Card style={{ padding: '26px 34px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 22 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.2em', color: VIOLET, fontWeight: 900 }}>SCALE MODEL</span>
        <span style={{ fontSize: 17, fontWeight: 900, color: INK }}>フェーズに連動して、ITの規模も広げる。</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, height: 176 }}>
        {[
          { p: 'PHASE 01', t: '創業・MVP', d: '過不足のないリソース', h: 76, c: '#CFF6F8', tc: TEAL },
          { p: 'PHASE 02', t: '成長・PMF', d: '機動的な拡張', h: 124, c: '#B7A6F5', tc: VIOLET },
          { p: 'PHASE 03', t: '統合・グローバル', d: '持続可能なコア', h: 172, c: VIOLET, tc: VIOLET },
        ].map((f) => (
          <div key={f.p} style={{ flex: 1 }}>
            <div style={{ height: f.h, background: f.c, borderRadius: '14px 14px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 900, color: f.h > 100 ? 'rgba(255,255,255,0.9)' : '#5B6472', letterSpacing: '0.14em' }}>{f.p}</span>
            </div>
            <div style={{ borderTop: `3px solid ${BORDER}`, paddingTop: 12, display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: INK }}>{f.t}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: MUTE }}>{f.d}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: FAINT, fontWeight: 800, textAlign: 'right', marginTop: 8 }}>時間と事業規模の拡大 →</div>
    </Card>
    <Foot n={20} />
  </div>
);

/* ============================================================
   24  END
   ============================================================ */
const S24 = (
  <div key="s24" className={SLIDE} style={{ backgroundColor: '#000814' }}>
    <img
      src={CITY_BG}
      alt="City Background"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: CITY_FILTER }}
    />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,8,20,0.9) 0%, rgba(0,8,20,0.6) 52%, rgba(0,8,20,0.26) 100%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,8,20,0.95) 0%, rgba(0,8,20,0.66) 28%, rgba(0,8,20,0.05) 60%)' }} />
    <div style={{ position: 'absolute', right: 26, bottom: 96, fontSize: 120, fontWeight: 900, letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.05)', lineHeight: 0.85, textAlign: 'right', textTransform: 'uppercase' }}>
      DIGITAL<br />CREATIVE<br />FIRM
    </div>

    <div style={{ position: 'absolute', inset: 0, padding: '52px 72px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 900, letterSpacing: '0.06em' }}>Meece株式会社</div>
        <div style={{ color: 'rgba(255,255,255,0.88)', writingMode: 'vertical-rl', fontSize: 12, letterSpacing: '0.5em', fontWeight: 700, lineHeight: 1.8, textShadow: '0 0 20px rgba(0,251,255,0.5)' }}>
          時代をまたぎ、新しいデジタルをデザインする。
        </div>
      </div>

      <div>
        <h1 style={{ color: '#FFFFFF', fontSize: 94, fontWeight: 900, lineHeight: 1, letterSpacing: '0.16em', margin: '0 0 22px', textShadow: '0 4px 40px rgba(0,8,20,0.5)' }}>END</h1>
        <div style={{ width: 56, height: 4, background: GRAD, borderRadius: 2, marginBottom: 28 }} />
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, fontWeight: 700, lineHeight: 1.7, margin: 0 }}>
          ご清聴、ありがとうございました。
        </p>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 900, color: '#FFFFFF', marginBottom: 12, letterSpacing: '0.04em' }}>Meece株式会社</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { icon: MapPin, v: '〒100-0005 東京都千代田区丸の内1-8-3 丸の内トラストタワー本館 20階' },
              { icon: Mail, v: 'info@meece.io' },
            ].map((r) => (
              <div key={r.v} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <r.icon size={13} color="rgba(255,255,255,0.55)" />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', fontWeight: 600 }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, color: CYAN, fontWeight: 800, letterSpacing: '0.06em', marginBottom: 6 }}>https://meece-jp.com/</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em', fontWeight: 600 }}>© 2026 MEECE INC. ALL STORIES RESERVED.</div>
        </div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 3, background: GRAD, zIndex: 6 }} />
  </div>
);

export const meeceIntro2026Presentation: PresentationEntry = {
  meta: {
    id: 'meece-intro-2026',
    title: 'Meece株式会社 会社紹介（2026年度版）',
    description:
      '他社ご紹介用の会社案内（全21枚・図解主体）。公式サイト最新情報に基づき、会社概要／代表挨拶／社名の由来（5つの産業）／沿革／行動指針、SERVICES（受託開発・AI研究開発・ITコンサルティング・多角的事業支援の4本柱とAIによる工期短縮）、TOPICS 2026（少額案件償却プロジェクト・AI開発ラボ・自社プロダクト「Dev Ticket」）、RESULTS（支援事例2件・対応産業とフェーズ）で構成。',
    thumbnail: `linear-gradient(135deg, ${INK} 0%, ${INK} 40%, ${CYAN} 72%, ${VIOLET} 100%)`,
    author: 'Meece株式会社',
    createdAt: '2026-08-18',
  },
  slides: [
    S01, //  1  表紙
    S05, //  2  会社概要（立地図）
    S06, //  3  代表挨拶
    S07, //  4  社名の由来（5つの産業）
    S08, //  5  沿革（成長カーブ）
    S09, //  6  行動指針
    S10, //  7  章扉 01 SERVICES
    S11, //  8  4つの事業（相関図）
    S12, //  9  受託開発（プロセス図）
    S13, // 10  AI研究開発（RAG図）
    S14, // 11  AIによる開発スピード
    S15, // 12  ITコンサル（Before/After）
    S16, // 13  多角的事業支援（ステップ図）
    S17, // 14  章扉 02 TOPICS 2026
    S18, // 15  少額案件償却プロジェクト
    S19, // 16  AI開発ラボ
    S20, // 17  Dev Ticket（製品画面）
    S21, // 18  章扉 03 RESULTS
    S22, // 19  支援事例
    S23, // 20  対応産業とフェーズ
    S24, // 21  END
  ],
};
