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
  Network,
  FileText,
  Newspaper,
  Boxes,
  Send,
  Radio,
  Lock,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Fingerprint,
  Share2,
  PhoneCall,
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
const TOTAL = 31;

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
   16  少額案件償却プロジェクト（費用の話に一本化）
   ============================================================ */
const S18 = (
  <div key="s18" className={SLIDE} style={{ background: PAPER, padding: '46px 64px 0' }}>
    <Head eyebrow="Topic 02 / Small Project" title="システム開発は、100万円から。" lead="「予算が足りない」を、DXを諦める理由にしない。" />

    <div style={{ display: 'flex', gap: 22, height: 480 }}>
      {/* 左：価格の常識を変える */}
      <Card style={{ width: 420, background: INK, border: 'none', padding: '34px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.2em', color: CYAN, fontWeight: 900, marginBottom: 24 }}>これまでの常識 → Meece</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: 'rgba(255,255,255,0.38)', textDecoration: 'line-through', letterSpacing: '-0.02em' }}>¥1,000万〜</div>
        <div style={{ margin: '12px 0 14px' }}>
          <ArrowRight size={24} color={CYAN} style={{ transform: 'rotate(90deg)' }} />
        </div>
        <div style={{ fontSize: 68, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1 }}>¥100万〜</div>
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.62)', fontWeight: 700, margin: '20px 0 28px', lineHeight: 1.7 }}>
          小さく始めても、開発規模に上限はありません。
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13, borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 24 }}>
          {['AI駆動開発による高速化', '独自の開発フレームワーク', '少数精鋭の体制'].map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={15} color={CYAN} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>{t}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 右：補助金との併用 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 18 }}>
          <span style={{ width: 18, height: 3, background: AMBER, borderRadius: 2 }} />
          <span style={{ fontSize: 10, letterSpacing: '0.2em', color: AMBER, fontWeight: 900 }}>SUBSIDY</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: INK }}>補助金と組み合わせれば、さらに効果的。</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, height: 176 }}>
          {[
            { icon: Store, t: '小規模事業者\n持続化補助金', d: '販路開拓とあわせて申請。', c: TEAL, bg: '#E6FFFA' },
            { icon: Sparkles, t: 'デジタル化・\nAI導入2026', d: '業務のデジタル化・AI活用に。', c: VIOLET, bg: '#F5F3FF' },
            { icon: Factory, t: 'ものづくり\n補助金', d: '生産プロセスの改善を伴う開発に。', c: PINK, bg: '#FFF5F7' },
          ].map((s) => (
            <Card key={s.t} style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 38, height: 38, borderRadius: 13, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <s.icon size={18} color={s.c} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 900, color: INK, marginBottom: 8, lineHeight: 1.45, whiteSpace: 'pre-line', letterSpacing: '-0.01em' }}>{s.t}</div>
              <p style={{ fontSize: 11, color: MUTE, lineHeight: 1.7, margin: 0, fontWeight: 600 }}>{s.d}</p>
            </Card>
          ))}
        </div>

        {/* 自己負担のイメージ */}
        <Card style={{ height: 202, padding: '20px 26px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 18 }}>
            <Wallet size={16} color={AMBER} />
            <span style={{ fontSize: 15, fontWeight: 900, color: INK }}>自己負担のイメージ</span>
            <span style={{ fontSize: 11.5, color: MUTE, fontWeight: 700 }}>開発費 100万円 ／ 補助率 2/3 の制度を利用した場合</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', height: 46, borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
                <div style={{ width: '66.7%', background: `linear-gradient(to right, ${AMBER}, #ECC94B)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: '#7B4A00' }}>補助金 約67万円</span>
                </div>
                <div style={{ width: '33.3%', background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: '#FFFFFF' }}>自己負担</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: FAINT }}>開発費 100万円</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: FAINT }}>実質のご負担はここだけ</span>
              </div>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: CRIMSON, lineHeight: 1, letterSpacing: '-0.03em' }}>約33<span style={{ fontSize: 18 }}>万円</span></div>
              <div style={{ fontSize: 11.5, fontWeight: 900, color: MUTE, marginTop: 7 }}>実質の自己負担</div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, background: PAPER, borderRadius: 9, padding: '9px 14px' }}>
            <Handshake size={14} color={TEAL} />
            <span style={{ fontSize: 11.5, fontWeight: 800, color: INK }}>申請書類の作成・事業計画づくりまで、あわせてご支援します。</span>
          </div>
        </Card>

        <div style={{ fontSize: 10, color: FAINT, fontWeight: 700, lineHeight: 1.7 }}>
          ※ 補助率・上限額・対象要件は制度や公募回によって異なります。上図は補助率 2/3 と仮定した試算イメージです。<br />
          ※ 補助金の採択を保証するものではありません。申請の可否は最新の公募要領をご確認ください。
        </div>
      </div>
    </div>
    <Foot n={16} />
  </div>
);

/* ============================================================
   15  AI開発ラボ
   ------------------------------------------------------------
   下段は「開発規模の例」を使った AS-IS / TO-BE の構成比ドーナツ。
   ============================================================ */

/** ドーナツの1セグメント分のパスを返す（角度は12時起点・時計回り） */
function donutArc(cx: number, cy: number, rO: number, rI: number, a0: number, a1: number) {
  const pt = (r: number, a: number) => [cx + r * Math.sin(a), cy - r * Math.cos(a)] as const;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = pt(rO, a0);
  const [x1, y1] = pt(rO, a1);
  const [x2, y2] = pt(rI, a1);
  const [x3, y3] = pt(rI, a0);
  return `M${x0} ${y0} A${rO} ${rO} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${rI} ${rI} 0 ${large} 0 ${x3} ${y3} Z`;
}

/** 工程の構成比：従来 6ヶ月 → Meece 1ヶ月（中規模の開発を例に） */
const PHASE_MIX = [
  { t: '要件定義', c: TEAL, asis: 15, tobe: 35 },
  { t: '設計', c: '#3182CE', asis: 20, tobe: 20 },
  { t: '実装', c: VIOLET, asis: 45, tobe: 25 },
  { t: 'テスト', c: PINK, asis: 20, tobe: 20 },
];

/** 期間短縮率：構成比 × 全体期間（従来6ヶ月／Meece1ヶ月）から算出 */
const phaseCut = (asis: number, tobe: number) => Math.round((1 - (tobe * 1) / (asis * 6)) * 100);

function MixDonut({ mode, total, label }: { mode: 'asis' | 'tobe'; total: string; label: string }) {
  const GAP = 0.035; // セグメント間の隙間（rad）
  let acc = 0;
  return (
    <svg width="100%" height="224" viewBox="0 0 236 224">
      {PHASE_MIX.map((p) => {
        const v = p[mode];
        const a0 = acc * Math.PI * 2 + GAP / 2;
        acc += v / 100;
        const a1 = acc * Math.PI * 2 - GAP / 2;
        const mid = (a0 + a1) / 2;
        const lx = 118 + 88 * Math.sin(mid);
        const ly = 106 - 88 * Math.cos(mid);
        return (
          <g key={p.t}>
            <path d={donutArc(118, 106, 68, 44, a0, a1)} fill={mode === 'asis' ? `${p.c}59` : p.c} />
            <text x={lx} y={ly + 4} textAnchor="middle" fontSize="11.5" fontWeight="900" fill={mode === 'asis' ? FAINT : p.c}>{v}%</text>
          </g>
        );
      })}
      <text x="118" y="98" textAnchor="middle" fontSize="10" fontWeight="900" fill={FAINT} letterSpacing="1.6">{label}</text>
      <text x="118" y="126" textAnchor="middle" fontSize="26" fontWeight="900" fill={mode === 'asis' ? FAINT : INK} letterSpacing="-1">{total}</text>
      <text x="118" y="214" textAnchor="middle" fontSize="11" fontWeight="800" fill={FAINT}>
        {mode === 'asis' ? '従来の開発（6ヶ月）' : 'Meece の開発（1ヶ月）'}
      </text>
    </svg>
  );
}

const S19 = (
  <div key="s19" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head eyebrow="Topic 01 / AI Lab" title="AI開発ラボ ─ 最短2週間で、動くものを。" lead="アイデアの段階で「触れる形」にして、意思決定のスピードを上げます。" />

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

    {/* AS-IS / TO-BE の構成比 */}
    <div style={{ display: 'flex', gap: 20, height: 318 }}>
      <Card style={{ flex: 1, padding: '18px 24px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 9.5, fontWeight: 900, letterSpacing: '0.16em', color: VIOLET }}>AS-IS → TO-BE</span>
          <span style={{ fontSize: 12.5, fontWeight: 900, color: INK }}>工程ごとの時間の使われ方が、変わる。</span>
          <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 800, color: FAINT }}>例：中規模（ECサイト・在庫管理システム）</span>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', minHeight: 0 }}>
          <div style={{ flex: 1, minWidth: 0 }}><MixDonut mode="asis" total="6ヶ月" label="AS-IS" /></div>
          <div style={{ width: 96, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <ArrowRight size={22} color="#C7CFDB" />
            <div style={{ background: '#FFF5F7', borderRadius: 100, padding: '7px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 900, color: CRIMSON, lineHeight: 1 }}>−83<span style={{ fontSize: 11 }}>%</span></div>
              <div style={{ fontSize: 8.5, fontWeight: 900, color: CRIMSON, marginTop: 3 }}>全体の期間</div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}><MixDonut mode="tobe" total="1ヶ月" label="TO-BE" /></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, paddingTop: 4 }}>
          {PHASE_MIX.map((p) => (
            <div key={p.t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: p.c }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: INK }}>{p.t}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 工程別の内訳 */}
      <Card style={{ width: 400, padding: '18px 24px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: INK }}>工程別の内訳</span>
          <span style={{ fontSize: 10, fontWeight: 800, color: FAINT }}>数値は全体に占める構成比</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {PHASE_MIX.map((p, i, arr) => (
            <div key={p.t} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 0', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${BORDER}` }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: p.c, flexShrink: 0 }} />
              <span style={{ width: 60, fontSize: 12.5, fontWeight: 900, color: INK, flexShrink: 0 }}>{p.t}</span>
              <span style={{ fontSize: 9.5, fontWeight: 900, color: FAINT }}>従来</span>
              <span style={{ width: 32, fontSize: 14, fontWeight: 900, color: FAINT, textAlign: 'right' }}>{p.asis}%</span>
              <ArrowRight size={11} color="#C7CFDB" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 9.5, fontWeight: 900, color: p.c }}>Meece</span>
              <span style={{ width: 32, fontSize: 14, fontWeight: 900, color: INK, textAlign: 'right' }}>{p.tobe}%</span>
              <span style={{ marginLeft: 'auto', fontSize: 14.5, fontWeight: 900, color: CRIMSON, flexShrink: 0 }}>−{phaseCut(p.asis, p.tobe)}%</span>
            </div>
          ))}
        </div>

        <div style={{ background: PAPER, borderRadius: 9, padding: '10px 13px', marginTop: 8 }}>
          <p style={{ fontSize: 10, color: MUTE, lineHeight: 1.75, margin: 0, fontWeight: 700 }}>
            右端は<span style={{ color: INK, fontWeight: 900 }}>実期間の短縮率</span>。全体が約1/6になるため、実装の比重は下がり、要件定義の比重が上がります。
          </p>
        </div>
      </Card>
    </div>
    <Foot n={15} />
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
   実績・プロダクトパート ─ ログイン画面モックと共通テンプレート
   ============================================================ */

type IconType = React.ComponentType<{ size?: number; color?: string }>;

/** アプリ画面のウィンドウ枠 */
function Win({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 14, border: `1px solid ${BORDER}`, boxShadow: '0 18px 44px rgba(13,27,62,0.14)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <div style={{ height: 26, background: '#F1F3F7', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', padding: '0 11px', gap: 5, flexShrink: 0 }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
          <span key={c} style={{ width: 7, height: 7, borderRadius: 4, background: c }} />
        ))}
        <div style={{ marginLeft: 12, height: 14, minWidth: 210, background: '#FFFFFF', borderRadius: 7, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 5, padding: '0 8px' }}>
          <Lock size={7} color="#B9C0CC" />
          <span style={{ fontSize: 7.5, fontWeight: 700, color: '#A8B0BD', whiteSpace: 'nowrap' }}>{label}</span>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>{children}</div>
    </div>
  );
}

/** 入力欄のモック */
function Field({ label, ph, icon: Ic, dark, pill, accent, right }: {
  label: string; ph: string; icon?: IconType; dark?: boolean; pill?: boolean; accent: string; right?: ReactNode;
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <span style={{ fontSize: 8, fontWeight: 900, letterSpacing: '0.1em', color: dark ? 'rgba(255,255,255,0.5)' : '#9AA3B2' }}>{label}</span>
        {right && <span style={{ marginLeft: 'auto' }}>{right}</span>}
      </div>
      <div style={{ position: 'relative', height: pill ? 32 : 30, borderRadius: pill ? 99 : 9, background: dark ? 'rgba(255,255,255,0.06)' : '#FAFBFC', border: `${pill ? 1.5 : 1}px solid ${dark ? 'rgba(255,255,255,0.14)' : '#E2E8F0'}`, display: 'flex', alignItems: 'center', padding: pill ? '0 14px' : '0 10px', gap: 8 }}>
        {Ic && <Ic size={11} color={dark ? 'rgba(255,255,255,0.45)' : '#C4CBD6'} />}
        <span style={{ fontSize: 9, fontWeight: 600, color: dark ? 'rgba(255,255,255,0.35)' : '#C4CBD6' }}>{ph}</span>
        <span style={{ marginLeft: 'auto', width: 1.5, height: 11, background: accent, borderRadius: 1 }} />
      </div>
    </div>
  );
}

/* ---------- 画面 01：テナントマッチング（ログイン） ---------- */

const GOLD = '#E6B422';
const GOLD_DK = '#C9A01A';

const SCREEN_TENANT = (
  <Win label="テナントマッチング PRO ｜ ログイン">
    {/* 左：ブランドパネル */}
    <div style={{ width: 366, background: '#080B10', position: 'relative', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '22px 24px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(230,180,34,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(230,180,34,0.05) 1px, transparent 1px)`, backgroundSize: '34px 34px' }} />
      <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}26 0%, transparent 70%)`, top: -90, left: -80 }} />
      <div style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.16) 0%, transparent 70%)', bottom: -80, right: -50 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 26, height: 26, borderRadius: 9, background: `linear-gradient(135deg, ${GOLD}, #F5D060)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 3px 12px ${GOLD}55` }}>
            <Building2 size={13} color="#5C3A00" />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.3 }}>テナントマッチング</div>
            <div style={{ fontSize: 6.5, fontWeight: 900, letterSpacing: '0.24em', color: GOLD }}>PRO EDITION</div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', marginBottom: 'auto', paddingTop: 18 }}>
          <div style={{ fontSize: 6.5, fontWeight: 900, letterSpacing: '0.2em', color: `${GOLD}AA`, marginBottom: 9 }}>COMMERCIAL REAL ESTATE MATCHING</div>
          <div style={{ fontSize: 25, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.28, letterSpacing: '-0.03em' }}>
            物件とテナントを<br />
            <span style={{ color: GOLD }}>スマートに</span><br />
            つなぐ
          </div>
          <p style={{ fontSize: 9, color: '#94A3B8', lineHeight: 1.85, margin: '11px 0 0', fontWeight: 600 }}>
            仲介業務の打診・追跡・成約管理を、ひとつのプラットフォームで。
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {[
            { icon: MapPin, t: '物件情報を一元管理。ステータス追跡から地主連絡先まで。' },
            { icon: Users, t: 'テナント企業DB。業態・エリア・面積条件で即検索。' },
            { icon: Zap, t: 'マッチング実行で、候補企業へ打診メールを一括送信。' },
            { icon: TrendingUp, t: '成約率・打診数をダッシュボードで可視化。' },
          ].map((f) => (
            <div key={f.t} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 21, height: 21, borderRadius: 7, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <f.icon size={10} color={GOLD} />
              </div>
              <span style={{ fontSize: 8.5, color: '#8E9AAC', lineHeight: 1.5, fontWeight: 600 }}>{f.t}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 22, paddingTop: 13, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {[{ n: '1,200+', l: '登録物件数' }, { n: '340+', l: 'テナント企業' }, { n: '98%', l: '顧客満足度' }].map((s) => (
            <div key={s.l}>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 7.5, color: '#64748B', fontWeight: 700, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 右：フォーム */}
    <div style={{ flex: 1, background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '26px 32px', minWidth: 0 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>おかえりなさい</div>
      <div style={{ fontSize: 9, color: '#9AA3B2', fontWeight: 600, marginTop: 5, marginBottom: 16 }}>アカウントにサインインしてください</div>

      <div style={{ borderRadius: 11, background: '#FFFBEB', border: `1px solid ${GOLD}44`, padding: '10px 11px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 7 }}>
          <Shield size={9} color={GOLD_DK} />
          <span style={{ fontSize: 7.5, fontWeight: 900, letterSpacing: '0.1em', color: GOLD_DK }}>デモアカウント</span>
        </div>
        {[{ n: '山田 太郎', r: '管理者', e: 'yamada@tm-pro.co.jp' }, { n: '田中 花子', r: '営業担当', e: 'tanaka@tm-pro.co.jp' }].map((a) => (
          <div key={a.e} style={{ display: 'flex', alignItems: 'center', gap: 8, borderRadius: 8, background: 'rgba(230,180,34,0.1)', border: '1px solid rgba(230,180,34,0.18)', padding: '6px 9px', marginBottom: 5 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 8.5, fontWeight: 900, color: '#334155' }}>{a.n}<span style={{ fontWeight: 600, color: '#94A3B8' }}> / {a.r}</span></div>
              <div style={{ fontSize: 7.5, color: '#94A3B8', fontWeight: 600 }}>{a.e}</div>
            </div>
            <ArrowRight size={10} color={GOLD} style={{ marginLeft: 'auto', flexShrink: 0 }} />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="メールアドレス" ph="your@company.co.jp" icon={Mail} accent={GOLD} />
        <Field label="パスワード" ph="••••••••••" icon={Lock} accent={GOLD} right={<Eye size={11} color="#C4CBD6" />} />
      </div>

      <div style={{ marginTop: 16, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DK})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: `0 4px 16px ${GOLD}55` }}>
        <ArrowRight size={12} color="#FFFFFF" />
        <span style={{ fontSize: 11, fontWeight: 900, color: '#FFFFFF' }}>サインインする</span>
      </div>
      <div style={{ textAlign: 'center', fontSize: 7.5, color: '#CBD3DE', fontWeight: 600, marginTop: 16 }}>© 2026 テナントマッチング PRO. All rights reserved.</div>
    </div>
  </Win>
);

/* ---------- 画面 02：CADCHANGE（ログイン／設計図パネル） ---------- */

const SCREEN_CAD = (
  <Win label="CADCHANGE ｜ ログイン">
    <div style={{ flex: 1, background: 'linear-gradient(145deg,#EEF4FF 0%,#F0F5FF 42%,#E8F0FE 100%)', position: 'relative', overflow: 'hidden', minWidth: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 460 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="bpDots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(37,99,235,0.22)" />
          </pattern>
          <pattern id="bpGrid" width="110" height="110" patternUnits="userSpaceOnUse">
            <path d="M110 0 L0 0 0 110" fill="none" stroke="rgba(37,99,235,0.10)" strokeWidth="0.7" />
          </pattern>
          <pattern id="bpHatch" width="9" height="9" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="9" stroke="rgba(37,99,235,0.07)" strokeWidth="2.4" />
          </pattern>
          <marker id="bpArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="rgba(37,99,235,0.5)" />
          </marker>
          <marker id="bpArrR" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
            <path d="M0,0 L0,6 L6,3 z" fill="rgba(37,99,235,0.5)" />
          </marker>
        </defs>
        <rect width="460" height="500" fill="url(#bpDots)" />
        <rect width="460" height="500" fill="url(#bpGrid)" />

        <g transform="translate(58,128)">
          <rect x="0" y="0" width="278" height="176" fill="rgba(219,234,254,0.2)" stroke="rgba(37,99,235,0.7)" strokeWidth="1.6" />
          <rect x="0" y="0" width="278" height="176" fill="url(#bpHatch)" />
          {[[0, 0], [278, 0], [0, 176], [278, 176]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="4" fill="rgba(37,99,235,0.45)" />
              <circle cx={cx} cy={cy} r="9" fill="none" stroke="rgba(37,99,235,0.3)" strokeWidth="0.7" />
            </g>
          ))}
          <line x1="0" y1="54" x2="278" y2="54" stroke="rgba(185,28,28,0.6)" strokeWidth="1.2" strokeDasharray="10 4" />
          <rect x="282" y="47" width="46" height="14" rx="3" fill="rgba(254,242,242,0.92)" stroke="rgba(185,28,28,0.4)" strokeWidth="0.7" />
          <text x="305" y="57" textAnchor="middle" fill="rgba(185,28,28,0.9)" fontSize="7" fontWeight="800">90° UP</text>
          <line x1="0" y1="124" x2="278" y2="124" stroke="rgba(29,78,216,0.6)" strokeWidth="1.2" strokeDasharray="4 4" />
          <rect x="282" y="117" width="52" height="14" rx="3" fill="rgba(239,246,255,0.92)" stroke="rgba(29,78,216,0.4)" strokeWidth="0.7" />
          <text x="308" y="127" textAnchor="middle" fill="rgba(29,78,216,0.9)" fontSize="7" fontWeight="800">90° DOWN</text>
          {[[28, 27, 9], [250, 27, 9], [28, 149, 9], [250, 149, 9], [139, 88, 13], [72, 88, 7], [206, 88, 7]].map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill="rgba(255,251,235,0.85)" stroke="rgba(180,83,9,0.7)" strokeWidth="1.2" />
              <line x1={cx - (r + 5)} y1={cy} x2={cx + (r + 5)} y2={cy} stroke="rgba(180,83,9,0.5)" strokeWidth="0.7" />
              <line x1={cx} y1={cy - (r + 5)} x2={cx} y2={cy + (r + 5)} stroke="rgba(180,83,9,0.5)" strokeWidth="0.7" />
              {i === 4 && <text x={cx} y={cy + r + 11} textAnchor="middle" fill="rgba(146,64,14,0.85)" fontSize="7" fontWeight="700">⌀18</text>}
              {i === 0 && <text x={cx} y={cy + r + 11} textAnchor="middle" fill="rgba(146,64,14,0.85)" fontSize="7" fontWeight="700">⌀12</text>}
            </g>
          ))}
          <line x1="0" y1="-19" x2="278" y2="-19" stroke="rgba(37,99,235,0.5)" strokeWidth="0.8" markerStart="url(#bpArrR)" markerEnd="url(#bpArr)" />
          <rect x="103" y="-27" width="72" height="13" rx="3" fill="rgba(255,255,255,0.9)" />
          <text x="139" y="-18" textAnchor="middle" fill="rgba(29,78,216,0.9)" fontSize="7.5" fontWeight="800">278.000 mm</text>
          <line x1="-19" y1="0" x2="-19" y2="176" stroke="rgba(37,99,235,0.5)" strokeWidth="0.8" markerStart="url(#bpArrR)" markerEnd="url(#bpArr)" />
          <rect x="-52" y="81" width="66" height="13" rx="3" fill="rgba(255,255,255,0.9)" transform="rotate(-90,-19,88)" />
          <text x="-19" y="88" textAnchor="middle" fill="rgba(29,78,216,0.9)" fontSize="7.5" fontWeight="800" transform="rotate(-90,-19,88)">176.000 mm</text>
          <rect x="186" y="130" width="86" height="38" rx="4" fill="rgba(255,255,255,0.86)" stroke="rgba(37,99,235,0.3)" strokeWidth="0.7" />
          <text x="229" y="143" textAnchor="middle" fill="rgba(29,78,216,0.72)" fontSize="6" fontWeight="700">MATERIAL</text>
          <text x="229" y="154" textAnchor="middle" fill="rgba(29,78,216,0.92)" fontSize="7.5" fontWeight="800">SS400 / t2.3</text>
          <text x="229" y="164" textAnchor="middle" fill="rgba(100,116,139,0.85)" fontSize="6">± 0.05 mm</text>
        </g>

        <g transform="translate(352,52)" opacity="0.75">
          <rect x="0" y="0" width="92" height="92" fill="none" stroke="rgba(37,99,235,0.4)" strokeWidth="0.8" strokeDasharray="4 3" />
          <text x="46" y="-6" textAnchor="middle" fill="rgba(29,78,216,0.62)" fontSize="6.5" fontWeight="700">DETAIL A — 2:1</text>
          <circle cx="46" cy="46" r="26" fill="rgba(219,234,254,0.18)" stroke="rgba(37,99,235,0.55)" strokeWidth="1.1" />
          <circle cx="46" cy="46" r="12" fill="rgba(255,251,235,0.75)" stroke="rgba(180,83,9,0.6)" strokeWidth="1.1" />
          <line x1="18" y1="46" x2="74" y2="46" stroke="rgba(180,83,9,0.4)" strokeWidth="0.7" />
          <line x1="46" y1="18" x2="46" y2="74" stroke="rgba(180,83,9,0.4)" strokeWidth="0.7" />
          <line x1="46" y1="46" x2="68" y2="27" stroke="rgba(37,99,235,0.45)" strokeWidth="0.7" markerEnd="url(#bpArr)" />
          <rect x="66" y="16" width="30" height="12" rx="3" fill="rgba(255,255,255,0.9)" />
          <text x="81" y="25" textAnchor="middle" fill="rgba(29,78,216,0.88)" fontSize="6.5" fontWeight="700">R18.0</text>
        </g>

        <g transform="translate(316,360)" opacity="0.7">
          <text x="60" y="-8" textAnchor="middle" fill="rgba(29,78,216,0.62)" fontSize="6.5" fontWeight="700">SECTION B-B</text>
          <rect x="0" y="0" width="120" height="40" fill="rgba(219,234,254,0.18)" stroke="rgba(37,99,235,0.5)" strokeWidth="1.2" />
          {[0, 8, 16, 24, 32].map((y) => (
            <line key={y} x1={0} y1={y} x2={Math.min(y + 40, 120)} y2={Math.max(y - 80, 0)} stroke="rgba(37,99,235,0.18)" strokeWidth="0.7" />
          ))}
          <line x1="-12" y1="0" x2="-12" y2="40" stroke="rgba(37,99,235,0.5)" strokeWidth="0.7" markerStart="url(#bpArrR)" markerEnd="url(#bpArr)" />
          <rect x="-34" y="13" width="22" height="12" rx="3" fill="rgba(255,255,255,0.9)" />
          <text x="-23" y="22" textAnchor="middle" fill="rgba(29,78,216,0.88)" fontSize="6.5" fontWeight="700">t2.3</text>
        </g>

        <g transform="translate(24,414)" opacity="0.65">
          <rect x="0" y="0" width="230" height="60" fill="rgba(255,255,255,0.6)" stroke="rgba(37,99,235,0.3)" strokeWidth="0.8" />
          <line x1="0" y1="17" x2="230" y2="17" stroke="rgba(37,99,235,0.25)" strokeWidth="0.6" />
          <line x1="0" y1="40" x2="230" y2="40" stroke="rgba(37,99,235,0.16)" strokeWidth="0.4" />
          <line x1="115" y1="17" x2="115" y2="60" stroke="rgba(37,99,235,0.16)" strokeWidth="0.4" />
          <text x="115" y="12" textAnchor="middle" fill="rgba(29,78,216,0.82)" fontSize="7.5" fontWeight="800">CADCHANGE SYSTEM — SS400</text>
          <text x="34" y="31" textAnchor="middle" fill="rgba(37,99,235,0.68)" fontSize="6.5">DRAWN: AI-OCR</text>
          <text x="166" y="31" textAnchor="middle" fill="rgba(37,99,235,0.68)" fontSize="6.5">SCALE: 1:2.5</text>
          <text x="34" y="52" textAnchor="middle" fill="rgba(37,99,235,0.55)" fontSize="6">REV: A</text>
          <text x="166" y="52" textAnchor="middle" fill="rgba(37,99,235,0.55)" fontSize="6">DWG: 49700</text>
        </g>

        <g transform="translate(272,318)" opacity="0.6">
          <rect x="0" y="0" width="14" height="13" fill="none" stroke="rgba(37,99,235,0.5)" strokeWidth="0.7" />
          <rect x="14" y="0" width="42" height="13" fill="none" stroke="rgba(37,99,235,0.5)" strokeWidth="0.7" />
          <rect x="56" y="0" width="20" height="13" fill="none" stroke="rgba(37,99,235,0.5)" strokeWidth="0.7" />
          <text x="7" y="10" textAnchor="middle" fill="rgba(29,78,216,0.8)" fontSize="8">⏥</text>
          <text x="35" y="10" textAnchor="middle" fill="rgba(29,78,216,0.8)" fontSize="6.5">0.05</text>
          <text x="66" y="10" textAnchor="middle" fill="rgba(29,78,216,0.8)" fontSize="6.5">A</text>
        </g>
        <g transform="translate(190,336)" opacity="0.6">
          <polygon points="0,0 7,12 -7,12" fill="rgba(37,99,235,0.6)" />
          <rect x="-9" y="12" width="18" height="12" rx="2" fill="none" stroke="rgba(37,99,235,0.5)" strokeWidth="0.7" />
          <text x="0" y="21" textAnchor="middle" fill="rgba(29,78,216,0.85)" fontSize="7" fontWeight="700">A</text>
        </g>
      </svg>
    </div>

    <div style={{ width: 250, flexShrink: 0, background: '#FFFFFF', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '26px 24px', boxShadow: '-8px 0 30px rgba(15,23,42,0.10)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#1D4ED8,#2563EB,#60A5FA)' }} />

      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, padding: '5px 12px 5px 5px', borderRadius: 10, background: '#EFF6FF', border: '1px solid rgba(37,99,235,0.16)', marginBottom: 16 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#1E40AF,#2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Code2 size={13} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ fontSize: 7, fontWeight: 700, color: '#64748B', lineHeight: 1.3 }}>CAD自動生成システム</div>
          <div style={{ fontSize: 11, fontWeight: 900, color: '#1E3A8A', letterSpacing: '0.05em', lineHeight: 1.3 }}>CADCHANGE</div>
        </div>
      </div>

      <div style={{ fontSize: 19, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: 6 }}>ログイン</div>
      <p style={{ fontSize: 9, color: '#64748B', lineHeight: 1.7, margin: '0 0 18px', fontWeight: 600 }}>
        CADCHANGE にアクセスするには<br />認証情報を入力してください
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="ユーザーID" ph="ユーザーIDを入力" icon={User} accent="#2563EB" />
        <Field label="パスワード" ph="パスワードを入力" icon={Lock} accent="#2563EB" right={<span style={{ fontSize: 7.5, color: '#2563EB', fontWeight: 700 }}>パスワードを忘れた場合</span>} />
      </div>

      <div style={{ marginTop: 16, height: 33, borderRadius: 10, background: 'linear-gradient(135deg,#1E40AF 0%,#2563EB 55%,#3B82F6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, boxShadow: '0 5px 18px rgba(37,99,235,0.42)' }}>
        <span style={{ fontSize: 11, fontWeight: 900, color: '#FFFFFF' }}>ログイン</span>
        <ChevronRight size={12} color="#FFFFFF" />
      </div>

      <div style={{ marginTop: 16, padding: '9px 11px', borderRadius: 10, background: 'linear-gradient(135deg,#F8FAFC,#F1F5F9)', border: '1px solid #EEF1F6' }}>
        <div style={{ fontSize: 7.5, fontWeight: 800, color: '#64748B', marginBottom: 4, letterSpacing: '0.04em' }}>デモアカウント</div>
        <div style={{ display: 'flex', gap: 14 }}>
          {[['ID：', 'admin'], ['PW：', 'admin']].map(([l, v]) => (
            <div key={l}>
              <span style={{ fontSize: 7.5, color: '#94A3B8', fontWeight: 700 }}>{l}</span>
              <span style={{ fontSize: 9, fontWeight: 900, color: '#1E293B' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Win>
);

/* ---------- 画面 03：AI記事自動生成（ログイン／ダーク中央） ---------- */

const SCREEN_NEWS = (
  <Win label="AI Content Desk ｜ サインイン">
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'linear-gradient(150deg,#150F2E 0%,#1E1547 45%,#241958 100%)', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 700 500" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.9 }}>
        <defs>
          <pattern id="nvGrid" width="46" height="46" patternUnits="userSpaceOnUse">
            <path d="M46 0 L0 0 0 46" fill="none" stroke="rgba(157,114,255,0.09)" strokeWidth="0.7" />
          </pattern>
          <linearGradient id="nvArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(157,114,255,0.22)" />
            <stop offset="100%" stopColor="rgba(157,114,255,0)" />
          </linearGradient>
        </defs>
        <rect width="700" height="500" fill="url(#nvGrid)" />
        <path d="M0 400 L60 372 L120 386 L180 330 L240 348 L300 286 L360 300 L420 240 L480 262 L540 196 L600 214 L660 158 L700 172 L700 500 L0 500 Z" fill="url(#nvArea)" />
        <path d="M0 400 L60 372 L120 386 L180 330 L240 348 L300 286 L360 300 L420 240 L480 262 L540 196 L600 214 L660 158 L700 172" fill="none" stroke="rgba(185,156,255,0.5)" strokeWidth="1.6" />
        {[[60, 372], [180, 330], [300, 286], [420, 240], [540, 196], [660, 158]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.6" fill="#B99CFF" />
        ))}
      </svg>
      <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(157,114,255,0.3) 0%, transparent 70%)', top: -120, right: -60 }} />

      <div style={{ position: 'relative', zIndex: 2, height: 26, borderBottom: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', gap: 20, padding: '0 16px', background: 'rgba(0,0,0,0.22)', flexShrink: 0 }}>
        {[
          { t: '日経平均', v: '38,420.15', d: '▲ 0.82%', up: true },
          { t: 'TOPIX', v: '2,714.63', d: '▲ 0.44%', up: true },
          { t: 'USD/JPY', v: '152.31', d: '▼ 0.12%', up: false },
          { t: '国内株式ファンド 資金流入', v: '3ヶ月連続', d: '＋', up: true },
        ].map((k) => (
          <div key={k.t} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 7.5, fontWeight: 800, color: 'rgba(255,255,255,0.42)' }}>{k.t}</span>
            <span style={{ fontSize: 8.5, fontWeight: 900, color: '#FFFFFF' }}>{k.v}</span>
            <span style={{ fontSize: 7.5, fontWeight: 900, color: k.up ? '#4ADE80' : '#FB7185' }}>{k.d}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
        <div style={{ width: 320, borderRadius: 18, background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.13)', boxShadow: '0 24px 60px rgba(0,0,0,0.42)', padding: '24px 26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
            <div style={{ width: 30, height: 30, borderRadius: 10, background: 'linear-gradient(135deg,#9D72FF,#6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 16px rgba(109,40,217,0.55)' }}>
              <Newspaper size={14} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: 6.5, fontWeight: 900, letterSpacing: '0.22em', color: '#B99CFF' }}>AI CONTENT DESK</div>
              <div style={{ fontSize: 12, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.35 }}>記事自動生成システム</div>
            </div>
          </div>

          <div style={{ fontSize: 17, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: 5 }}>サインイン</div>
          <p style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.48)', margin: '0 0 16px', fontWeight: 600 }}>編集部アカウントでログインしてください</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <Field label="社員ID" ph="editorial-0000" icon={User} dark accent="#B99CFF" />
            <Field label="パスワード" ph="••••••••••" icon={Lock} dark accent="#B99CFF" right={<Eye size={11} color="rgba(255,255,255,0.4)" />} />
          </div>

          <div style={{ marginTop: 15, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#9D72FF,#6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(109,40,217,0.5)' }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: '#FFFFFF' }}>サインイン</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '13px 0' }}>
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ fontSize: 7.5, fontWeight: 700, color: 'rgba(255,255,255,0.32)' }}>または</span>
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          </div>

          <div style={{ height: 30, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <Shield size={11} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.82)' }}>社内 SSO でログイン</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: 28, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
        <span style={{ fontSize: 7.5, fontWeight: 700, color: 'rgba(255,255,255,0.35)' }}>社内ネットワークからのみ接続できます</span>
        <span style={{ marginLeft: 'auto', fontSize: 7.5, fontWeight: 700, color: 'rgba(255,255,255,0.25)' }}>v1.4.0 ／ 本番環境</span>
      </div>
    </div>
  </Win>
);

/* ---------- 画面 04：MP Core（ログイン／基幹システム） ---------- */

const SCREEN_CORE = (
  <Win label="MP Core ｜ ログイン">
    <div style={{ flex: 1, background: '#EEF1F5', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <div style={{ height: 44, background: 'linear-gradient(100deg,#0F766E 0%,#155E75 45%,#1D4ED8 100%)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Server size={13} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ fontSize: 6.5, fontWeight: 900, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}>CORE BUSINESS SYSTEM</div>
          <div style={{ fontSize: 12.5, fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.01em', lineHeight: 1.3 }}>MP Core</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 7.5, fontWeight: 800, color: 'rgba(255,255,255,0.6)' }}>環境</span>
          <span style={{ fontSize: 8, fontWeight: 900, color: '#FFFFFF', background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.24)', borderRadius: 99, padding: '3px 10px' }}>本番</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, padding: 16 }}>
        <div style={{ width: 356, background: '#FFFFFF', borderRadius: 14, border: '1px solid #DFE4EC', boxShadow: '0 14px 38px rgba(15,23,42,0.10)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 26px 22px' }}>
            <div style={{ fontSize: 7, fontWeight: 900, letterSpacing: '0.2em', color: '#94A3B8', marginBottom: 6 }}>AUTHENTICATION</div>
            <div style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 16 }}>業務システムへログイン</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field label="社員番号" ph="000000" icon={User} accent="#1D4ED8" />
              <Field label="パスワード" ph="••••••••••" icon={Lock} accent="#1D4ED8" right={<Eye size={11} color="#C4CBD6" />} />
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <ShieldCheck size={10} color="#0F766E" />
                <span style={{ fontSize: 8, fontWeight: 900, letterSpacing: '0.1em', color: '#9AA3B2' }}>ワンタイムコード</span>
                <span style={{ marginLeft: 'auto', fontSize: 7.5, fontWeight: 800, color: '#0F766E' }}>残り 00:42</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['4', '1', '8', '', '', ''].map((d, i) => (
                  <div key={i} style={{ flex: 1, height: 30, borderRadius: 8, background: d ? '#FFFFFF' : '#FAFBFC', border: `1px solid ${i === 3 ? '#1D4ED8' : '#E2E8F0'}`, boxShadow: i === 3 ? '0 0 0 3px rgba(29,78,216,0.12)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: '#0F172A' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 16, height: 33, borderRadius: 10, background: 'linear-gradient(135deg,#1D4ED8,#0F766E)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 5px 18px rgba(29,78,216,0.35)' }}>
              <span style={{ fontSize: 11.5, fontWeight: 900, color: '#FFFFFF' }}>ログイン</span>
              <ChevronRight size={12} color="#FFFFFF" />
            </div>
          </div>

          <div style={{ borderTop: '1px solid #EEF1F6', background: '#FAFBFD', padding: '10px 26px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={10} color="#94A3B8" />
            <span style={{ fontSize: 7.5, fontWeight: 700, color: '#8B94A3', lineHeight: 1.5 }}>本システムの操作内容はすべて記録されます。</span>
          </div>
        </div>
      </div>

      <div style={{ height: 28, borderTop: '1px solid #E2E7EE', background: '#F7F9FC', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
        <span style={{ fontSize: 7.5, fontWeight: 700, color: '#98A1AE' }}>MP Core v1.2.0 ／ 移行フェーズ 1</span>
        <span style={{ marginLeft: 'auto', fontSize: 7.5, fontWeight: 700, color: '#98A1AE' }}>社内ヘルプデスク 内線 4120</span>
      </div>
    </div>
  </Win>
);

/* ---------- 画面 05：Call Net（ログイン／中央カード） ---------- */

const SCREEN_CALLNET = (
  <Win label="Call Net ｜ ログイン">
    <div style={{ flex: 1, background: '#F7FAFC', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 0, padding: 20 }}>
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(252,212,0,0.28)', filter: 'blur(70px)', top: -80, right: -50 }} />
      <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'rgba(0,88,148,0.16)', filter: 'blur(70px)', bottom: -80, left: -50 }} />

      <div style={{ position: 'relative', zIndex: 2, width: 330 }}>
        {/* ロゴ */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
            <div style={{ width: 30, height: 30, background: '#0071BC', borderRadius: 9, borderTopRightRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Share2 size={15} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: 19, fontWeight: 900, color: '#181C1E', letterSpacing: '-0.02em' }}>Call Net</span>
          </div>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#404751' }}>コールセンター支援システム</div>
        </div>

        {/* カード */}
        <div style={{ background: '#FFFFFF', borderRadius: 14, boxShadow: '0 12px 40px rgba(24,28,30,0.09)', border: '1px solid rgba(192,199,211,0.3)', padding: '22px 24px' }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: '#181C1E', marginBottom: 4 }}>おかえりなさい</div>
          <p style={{ fontSize: 9, color: '#404751', margin: '0 0 16px', fontWeight: 600, lineHeight: 1.6 }}>オペレーター情報を入力してセッションを開始してください。</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            <Field label="オペレーターID" ph="IDを入力してください" icon={User} pill accent="#0071BC" />
            <Field label="パスワード" ph="パスワードを入力してください" icon={Lock} pill accent="#0071BC" right={<span style={{ fontSize: 7.5, color: '#005894', fontWeight: 800 }}>パスワードを忘れた場合</span>} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 13 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, border: '1.5px solid #C0C7D3', background: '#FFFFFF', flexShrink: 0 }} />
            <span style={{ fontSize: 9, fontWeight: 600, color: '#404751' }}>ログイン情報を保持する</span>
          </div>

          <div style={{ marginTop: 15, height: 34, borderRadius: 10, background: '#0071BC', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 6px 18px rgba(0,88,148,0.28)' }}>
            <span style={{ fontSize: 11.5, fontWeight: 900, color: '#FFFFFF' }}>ログイン</span>
            <ArrowRight size={12} color="#FFFFFF" />
          </div>
        </div>

        {/* フッター */}
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 8, fontWeight: 700, color: '#404751' }}>
            <span>システム v4.2.0</span>
            <span style={{ width: 3, height: 3, borderRadius: 2, background: '#C0C7D3' }} />
            <span>サポートセンター</span>
          </div>
          <div style={{ fontSize: 8, fontWeight: 600, color: '#8A94A3', marginTop: 5 }}>© 2026 Call Net. 全著作権所有。</div>
        </div>
      </div>
    </div>
  </Win>
);

/* ---------- 画面 06：Dev Ticket（ログイン） ---------- */

const SCREEN_DEVTICKET = (
  <Win label="Dev Ticket ｜ ログイン">
    <div style={{ width: 296, background: '#0F766E', position: 'relative', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 26px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 26%, rgba(255,255,255,0.09) 0%, transparent 60%), radial-gradient(circle at 18% 82%, rgba(0,0,0,0.12) 0%, transparent 52%)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 34 }}>
          <div style={{ width: 26, height: 26, borderRadius: 9, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 10px rgba(0,0,0,0.16)' }}>
            <Ticket size={13} color="#0F766E" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#FFFFFF' }}>Dev Ticket</span>
        </div>
        <div style={{ fontSize: 25, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.32, letterSpacing: '-0.03em', marginBottom: 12 }}>
          プロジェクトを、<br />スマートに。
        </div>
        <p style={{ fontSize: 9.5, color: '#99F6E4', lineHeight: 1.85, margin: 0, fontWeight: 600 }}>
          チケット・スプリント・メンバーを一元管理。<br />チームの生産性を最大化するツール。
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 24 }}>
        {[{ n: '4件', l: '進行中PJ' }, { n: '5名', l: 'メンバー' }, { n: '87%', l: '完了率' }].map((s) => (
          <div key={s.l}>
            <div style={{ fontSize: 17, fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 8, color: '#5EEAD4', fontWeight: 700, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ flex: 1, background: '#F5F6F8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 30px', minWidth: 0 }}>
      <div style={{ fontSize: 19, fontWeight: 900, color: '#1C1917', letterSpacing: '-0.02em' }}>ログイン</div>
      <div style={{ fontSize: 9, color: '#A8A29E', fontWeight: 600, marginTop: 4, marginBottom: 14 }}>アカウントにアクセスしてください</div>

      <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E7E5E4', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', padding: '18px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          <Field label="メールアドレス" ph="you@company.com" icon={Mail} accent="#059669" />
          <Field label="パスワード" ph="••••••••" icon={Lock} accent="#059669" />
        </div>

        <div style={{ marginTop: 15, height: 32, borderRadius: 10, background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 4px 14px rgba(5,150,105,0.3)' }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: '#FFFFFF' }}>ログイン</span>
          <ArrowRight size={12} color="#FFFFFF" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '13px 0' }}>
          <span style={{ flex: 1, height: 1, background: '#E7E5E4' }} />
          <span style={{ fontSize: 7.5, fontWeight: 700, color: '#A8A29E' }}>または</span>
          <span style={{ flex: 1, height: 1, background: '#E7E5E4' }} />
        </div>

        <div style={{ height: 31, borderRadius: 10, background: '#FFFFFF', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
          <Fingerprint size={12} color="#047857" />
          <span style={{ fontSize: 10.5, fontWeight: 900, color: '#047857' }}>生体認証でログイン</span>
        </div>
      </div>

      <div style={{ marginTop: 12, background: '#FFFFFF', borderRadius: 11, border: '1px solid #E7E5E4', padding: '11px 14px' }}>
        <div style={{ fontSize: 7.5, fontWeight: 900, letterSpacing: '0.12em', color: '#A8A29E', marginBottom: 7 }}>最近のログイン</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {['mizoguchi@meece.io', 'suzuki@meece.io'].map((u) => (
            <span key={u} style={{ fontSize: 8, fontWeight: 700, color: '#78716C', background: '#FAFAF9', border: '1px solid #E7E5E4', borderRadius: 7, padding: '4px 8px' }}>{u}</span>
          ))}
        </div>
      </div>
    </div>
  </Win>
);

/* ---------- 画面 07：NegoNavi（ログイン） ---------- */

const NegoMark = ({ size = 20, color = '#FFFFFF' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <path
      fill={color}
      fillRule="evenodd"
      d="M6 3h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm9 9h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3Z"
    />
  </svg>
);

const SCREEN_NEGONAVI = (
  <Win label="NegoNavi ｜ ログイン">
    {/* 左：段そのものがグラフ */}
    <div style={{ width: 378, position: 'relative', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '24px 26px' }}>
      <svg width="100%" height="100%" viewBox="0 0 760 640" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        <rect width="760" height="640" fill="#04222B" />
        <path d="M0 640V520l152-26v146z" fill="#0A3E4E" />
        <path d="M152 640V494l152-44v190z" fill="#0D4C60" />
        <path d="M304 640V450l152-62v252z" fill="#105C73" />
        <path d="M456 640V388l152-84v336z" fill="#146D87" />
        <path d="M608 640V304l152-104v440z" fill="#18809D" />
        <g stroke="#fff" strokeOpacity=".18">
          <path d="M0 506h152M152 480h152M304 436h152M456 374h152M608 290h152" />
        </g>
        <g fill="#fff">
          <text x="22" y="546" fontSize="26" fontWeight="700" fillOpacity=".72">¥12.0M</text>
          <text x="22" y="572" fontSize="17" fillOpacity=".44">初回接触 10%</text>
          <text x="174" y="520" fontSize="26" fontWeight="700" fillOpacity=".76">¥2.8M</text>
          <text x="174" y="546" fontSize="17" fillOpacity=".44">ヒアリング 25%</text>
          <text x="326" y="476" fontSize="26" fontWeight="700" fillOpacity=".8">¥12.0M</text>
          <text x="326" y="502" fontSize="17" fillOpacity=".48">提案 45%</text>
          <text x="478" y="414" fontSize="28" fontWeight="700">¥12.9M</text>
          <text x="478" y="440" fontSize="17" fillOpacity=".6">見積提出 65%</text>
          <text x="630" y="330" fontSize="26" fontWeight="700" fillOpacity=".88">¥4.8M</text>
          <text x="630" y="356" fontSize="17" fillOpacity=".54">クロージング 85%</text>
        </g>
        <circle cx="534" cy="374" r="11" fill="#8EF0FF" />
        <circle cx="534" cy="374" r="20" fill="none" stroke="#8EF0FF" strokeOpacity=".5" strokeWidth="2.5" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,34,43,0.92) 0%, rgba(4,34,43,0.6) 42%, rgba(4,34,43,0) 66%)' }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NegoMark size={20} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.2em' }}>NEGONAVI</span>
        </div>
        <div style={{ marginTop: 26 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.42, letterSpacing: '-0.035em', marginBottom: 10 }}>
            商談を、<br />成約へナビゲート
          </div>
          <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.74)', lineHeight: 1.95, margin: 0, fontWeight: 500, maxWidth: 230 }}>
            初回接触から受注まで。案件の現在地と着地予定を、ひとつの画面に。
          </p>
        </div>
        <div style={{ marginTop: 'auto', fontSize: 8, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>© 2026 Meece株式会社</div>
      </div>
    </div>

    {/* 右：フォーム */}
    <div style={{ flex: 1, background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '26px 34px', minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 22, color: '#0E7490' }}>
        <NegoMark size={15} color="#0E7490" />
        <span style={{ fontSize: 9.5, fontWeight: 700, color: '#0E7490', letterSpacing: '0.2em' }}>NEGONAVI</span>
      </div>

      <div style={{ fontSize: 21, fontWeight: 800, color: '#16232A', letterSpacing: '-0.03em', marginBottom: 5 }}>ログイン</div>
      <p style={{ fontSize: 9, color: '#7B8B92', margin: '0 0 20px', fontWeight: 600, lineHeight: 1.65 }}>アカウントのメールアドレスとパスワードを入力してください。</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
        <Field label="メールアドレス" ph="suzuki@meece.io" accent="#0E7490" />
        <Field label="パスワード" ph="••••••••" accent="#0E7490" right={<span style={{ fontSize: 7.5, color: '#0E7490', fontWeight: 800 }}>お忘れですか？</span>} />
      </div>

      <div style={{ marginTop: 16, height: 33, borderRadius: 8, background: '#0E7490', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 16px rgba(14,116,144,0.28)' }}>
        <span style={{ fontSize: 11.5, fontWeight: 900, color: '#FFFFFF' }}>ログイン</span>
      </div>

      <div style={{ fontSize: 8.5, color: '#7B8B92', fontWeight: 600, marginTop: 14 }}>
        招待メールをお持ちの方は <span style={{ color: '#0E7490', fontWeight: 800 }}>こちらから設定</span>
      </div>

      <div style={{ display: 'flex', gap: 14, marginTop: 18, paddingTop: 13, borderTop: '1px solid #E1E6E8' }}>
        {['利用条件', 'プライバシー', 'Cookie の設定'].map((t) => (
          <span key={t} style={{ fontSize: 8, color: '#9AA8AE', fontWeight: 600 }}>{t}</span>
        ))}
      </div>
    </div>
  </Win>
);

/* ---------- 実績・プロダクトのデータ ---------- */

type Project = {
  no: string;
  en: string;
  industry: string;
  system: string; // プロダクト／システム名
  title: string;
  short: string; // 種別（サブタイトル）
  tags: string[];
  headline: string;
  lead: string;
  icon: IconType;
  color: string; // 明るい背景の上で使う色
  accent: string; // ネイビー面の上で使う色
  bg: string;
  metaLine: string;
  stack: string[];
  screen: ReactNode;
  notes: { icon: IconType; t: string; d: string }[];
};

const PROJECTS: Project[] = [
  {
    no: 'PROJECT 01',
    en: 'REAL ESTATE',
    industry: '大手不動産会社',
    system: 'テナントマッチング PRO',
    title: 'テナント事業DX ／ テナントマッチング AIプラットフォーム構築',
    short: 'テナントマッチング AIプラットフォーム',
    tags: ['AI開発', '事業戦略立案', 'AWS基盤設計'],
    headline: '土地とテナントを、データでつなぐ。',
    lead: '担当者の勘に頼っていた組み合わせを、スコアで可視化しました。',
    icon: Building2,
    color: '#0D9488',
    accent: CYAN,
    bg: '#E6FFFA',
    metaLine: 'PM 1名 ＋ エンジニア 2名 ／ 約7ヶ月でリリース',
    stack: ['AWS', 'Bedrock', 'Aurora', 'pgvector'],
    screen: SCREEN_TENANT,
    notes: [
      { icon: Gauge, t: '適合度を、数字で見る', d: '商圏プロファイルと出店条件から0〜100点で採点。' },
      { icon: Send, t: '選んで、一括で打診', d: 'メール送信から回答受領まで画面上で完結。' },
      { icon: LayoutDashboard, t: '進捗は一覧で追う', d: '停滞している案件は自動でアラート。' },
    ],
  },
  {
    no: 'PROJECT 02',
    en: 'MANUFACTURING',
    industry: '金属加工会社',
    system: 'CADCHANGE',
    title: 'CADCHANGE ／ 図面PDF → DXF 自動変換サービス',
    short: '図面PDF → DXF 自動変換サービス',
    tags: ['生成AI活用', '機械学習', 'プロダクト開発'],
    headline: '図面のPDFを、DXFに変える。',
    lead: '外形・穴・曲げ線を読み取り、そのままCADデータへ書き出します。',
    icon: Factory,
    color: '#3182CE',
    accent: '#5BC8E8',
    bg: '#EBF8FF',
    metaLine: '専用Webアプリとして開発 ／ 評価を機械学習へ還流',
    stack: ['React', 'TypeScript', '生成AI', 'DXF'],
    screen: SCREEN_CAD,
    notes: [
      { icon: FileText, t: 'PDFを入れるだけ', d: 'アップロードから解析・DXF生成まで一本道。' },
      { icon: Brain, t: '設定値は、AIが作る', d: 'プロンプトをコピーし、回答を貼り戻すだけ。' },
      { icon: Layers, t: '用途別にDXF出力', d: '図面用とCAM用、2種類を書き出せます。' },
    ],
  },
  {
    no: 'PROJECT 03',
    en: 'FINANCE / SECURITIES',
    industry: '大手証券グループ会社',
    system: 'AI Content Desk',
    title: '投資信託レポート／ニュース記事 AI自動生成システム',
    short: '投資信託レポート／記事 AI自動生成システム',
    tags: ['生成AI', '業務自動化', '機械学習'],
    headline: '収集から承認まで、AIで自動化。',
    lead: '執筆も事実確認もAIが担い、最終承認だけを人が行う設計にしました。',
    icon: Landmark,
    color: VIOLET,
    accent: '#B99CFF',
    bg: '#F5F3FF',
    metaLine: '4名体制 ／ 約2ヶ月で本番リリース',
    stack: ['生成AI', 'RAG', '機械学習', 'CMS連携'],
    screen: SCREEN_NEWS,
    notes: [
      { icon: Search, t: '材料集めから自動', d: '対象ソースを巡回し、必要な情報を集約。' },
      { icon: Newspaper, t: '記事はAIが下書き', d: 'レポートもニュースも同じ流れで生成。' },
      { icon: CheckCircle2, t: '最終承認は、人が', d: '事実確認の結果を見て、承認か差戻しか。' },
    ],
  },
  {
    no: 'PROJECT 04',
    en: 'TELECOMMUNICATIONS',
    industry: '大手通信事業会社',
    system: 'MP Core',
    title: '基幹システム「MP Core」フルスクラッチ開発プロジェクト',
    short: '基幹システム（フルスクラッチ開発）',
    tags: ['基幹システム', 'フルスクラッチ', 'データ移行'],
    headline: '基幹システムを、まるごと作り替える。',
    lead: '現行システムをトレースしながら、止めずに新基盤へ載せ替えます。',
    icon: Radio,
    color: PINK,
    accent: '#FF8FC8',
    bg: '#FFF5F7',
    metaLine: '3フェーズで全面移行 ／ 両社にPM窓口を1名ずつ',
    stack: ['AWS', 'API連携', 'マスタ設計', 'データ移行'],
    screen: SCREEN_CORE,
    notes: [
      { icon: LayoutDashboard, t: '業務をひとつの画面に', d: '顧客・受注・在庫・配送・問合せを集約。' },
      { icon: Network, t: '外部サービスと連携', d: '既存の連携先を止めずにつなぎ替え。' },
      { icon: Boxes, t: '移行は専用フェーズで', d: '全データのカラム設計から作り直します。' },
    ],
  },
  {
    no: 'PROJECT 05',
    en: 'ENERGY',
    industry: '大手エネルギー開発事業会社',
    system: 'Call Net',
    title: 'Call Net ／ コンタクトセンター＆CRM システム',
    short: 'コンタクトセンター＆CRM システム',
    tags: ['WebRTC開発', 'CRM構築', 'クラウド構成'],
    headline: '電話とお客様情報を、ひとつに。',
    lead: 'ブラウザだけで通話できるコンタクトセンター基盤を構築しました。',
    icon: Zap,
    color: '#D97706',
    accent: '#FBBF24',
    bg: '#FFFAF0',
    metaLine: 'コンタクトセンター基盤の内製化 ／ クラウド構成',
    stack: ['React', 'TypeScript', 'WebRTC', 'Supabase'],
    screen: SCREEN_CALLNET,
    notes: [
      { icon: PhoneCall, t: 'ブラウザだけで通話', d: 'WebRTCで発着信。電話機器は不要です。' },
      { icon: Users, t: '顧客の360度ビュー', d: '応対履歴をタイムラインで一望できます。' },
      { icon: LayoutDashboard, t: '稼働状況を可視化', d: 'オペレーターの状態と統計を集約。' },
    ],
  },
];

const PRODUCTS: Project[] = [
  {
    no: 'PRODUCT 01',
    en: 'PROJECT MANAGEMENT',
    industry: '自社プロダクト',
    system: 'Dev Ticket',
    title: 'システム開発管理ツール「Dev Ticket」',
    short: 'システム開発管理ツール',
    tags: ['チケット管理', 'スプリント', 'AI連携'],
    headline: 'プロジェクトを、スマートに。',
    lead: 'チケット・スプリント・メンバーを一元管理する、開発現場のためのツール。',
    icon: Ticket,
    color: '#059669',
    accent: '#34D399',
    bg: '#ECFDF5',
    metaLine: '2026年6月24日リリース ／ 自社プロダクト第一弾',
    stack: ['React', 'TypeScript', 'Supabase', 'iOS / Mac'],
    screen: SCREEN_DEVTICKET,
    notes: [
      { icon: LayoutDashboard, t: 'リスト・ボード・ガント', d: '3つのビューで進捗を追えます。' },
      { icon: Users, t: 'スプリントとメンバー', d: '誰が何を持っているかが一目で分かる。' },
      { icon: Sparkles, t: 'チケットからAIプロンプト', d: '実装指示をワンクリックで生成。' },
    ],
  },
  {
    no: 'PRODUCT 02',
    en: 'SALES CRM / SFA',
    industry: '自社プロダクト',
    system: 'NegoNavi',
    title: 'セールス管理ツール「NegoNavi」',
    short: 'セールス管理ツール（CRM / SFA）',
    tags: ['パイプライン', '見積・受注', '承認フロー'],
    headline: '商談を、成約へナビゲート。',
    lead: '初回接触から受注まで、案件の現在地と着地予定をひとつの画面に。',
    icon: Handshake,
    color: '#0E7490',
    accent: '#22D3EE',
    bg: '#ECFEFF',
    metaLine: '独立型の営業管理SaaS ／ マルチテナント構成',
    stack: ['React', 'TypeScript', 'Supabase', 'PDF出力'],
    screen: SCREEN_NEGONAVI,
    notes: [
      { icon: BarChart3, t: 'パイプラインで見る', d: 'ステージ別の金額と着地見込みを可視化。' },
      { icon: FileText, t: '見積・受注書まで', d: '作成から承認フローまで画面内で完結。' },
      { icon: Ticket, t: '受注後は開発へ', d: 'Dev Ticket へプロジェクト化を依頼。' },
    ],
  },
];

/* ---------- 実績・プロダクトスライドのテンプレート ---------- */

function ProjectSlide({ p, n, paper }: { p: Project; n: number; paper?: boolean }) {
  return (
    <div className={SLIDE} style={{ background: paper ? PAPER : '#FFFFFF', padding: '44px 64px 0' }}>
      {/* ヘッダー：システム名を主役に */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginBottom: 18 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ width: 22, height: 3, background: p.color, borderRadius: 2 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.2em', color: p.color, fontWeight: 900 }}>{p.no}</span>
            <span style={{ fontSize: 11.5, fontWeight: 900, color: INK }}>{p.industry}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <div style={{ width: 50, height: 50, borderRadius: 17, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <p.icon size={24} color={p.color} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ fontSize: 34, fontWeight: 900, color: INK, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.15 }}>{p.system}</h2>
              <div style={{ fontSize: 12.5, fontWeight: 900, color: p.color, marginTop: 5 }}>{p.short}</div>
            </div>
          </div>
        </div>
        <div style={{ width: 372, flexShrink: 0 }}>
          <div style={{ fontSize: 15.5, fontWeight: 900, color: INK, letterSpacing: '-0.02em', marginBottom: 7 }}>{p.headline}</div>
          <p style={{ fontSize: 11.5, color: MUTE, lineHeight: 1.8, margin: 0, fontWeight: 600 }}>{p.lead}</p>
        </div>
      </div>

      {/* 本体：ログイン画面 ＋ 補足 */}
      <div style={{ display: 'flex', gap: 20, height: 504 }}>
        {p.screen}

        <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
          {p.notes.map((v, i) => (
            <Card key={v.t} style={{ flex: 1, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 14, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                <v.icon size={19} color={p.color} />
                <span style={{ position: 'absolute', top: -5, left: -5, width: 17, height: 17, borderRadius: 9, background: p.color, color: '#FFFFFF', fontSize: 9, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 900, color: INK, marginBottom: 5, letterSpacing: '-0.01em' }}>{v.t}</div>
                <p style={{ fontSize: 11.5, color: MUTE, lineHeight: 1.6, margin: 0, fontWeight: 600 }}>{v.d}</p>
              </div>
            </Card>
          ))}

          <Card style={{ height: 100, background: INK, border: 'none', padding: '15px 18px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.16em', color: p.accent, fontWeight: 900, marginBottom: 7 }}>PROJECT DATA</div>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.5, marginBottom: 'auto' }}>{p.metaLine}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {p.stack.map((t) => (
                <span key={t} style={{ fontSize: 9.5, fontWeight: 800, color: 'rgba(255,255,255,0.78)', background: 'rgba(255,255,255,0.09)', borderRadius: 6, padding: '3px 8px' }}>{t}</span>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <Foot n={n} />
    </div>
  );
}

/* ============================================================
   19  主要な開発実績（サマリ）
   ============================================================ */
const R00 = (
  <div key="r00" className={SLIDE} style={{ background: PAPER, padding: '46px 64px 0' }}>
    <Head
      eyebrow="Development Track Record"
      title="主要な開発実績。"
      lead="不動産・製造・金融・通信・エネルギー ── AIの実装から基幹システムの全面刷新まで、自社チームでご支援しています。"
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
      {PROJECTS.map((p) => (
        <Card key={p.no} style={{ padding: 0, height: 372, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: p.bg, height: 118, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p.icon size={44} color={p.color} />
            <div style={{ position: 'absolute', left: 15, top: 12, fontSize: 8.5, letterSpacing: '0.14em', color: p.color, fontWeight: 900 }}>{p.no}</div>
          </div>
          <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontSize: 8.5, letterSpacing: '0.12em', color: FAINT, fontWeight: 900, marginBottom: 6 }}>{p.en}</div>
            <div style={{ fontSize: 12, fontWeight: 900, color: MUTE, marginBottom: 8, lineHeight: 1.4 }}>{p.industry}</div>
            <div style={{ fontSize: 19, fontWeight: 900, color: INK, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 6 }}>{p.system}</div>
            <p style={{ fontSize: 10.5, color: p.color, lineHeight: 1.6, margin: 0, fontWeight: 800 }}>{p.short}</p>
            <div style={{ marginTop: 'auto' }}>
              <div style={{ height: 1, background: BORDER, margin: '13px 0 12px' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ fontSize: 9.5, fontWeight: 800, color: p.color, background: p.bg, borderRadius: 100, padding: '4px 9px' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
    <Card style={{ marginTop: 16, padding: '15px 26px', background: INK, border: 'none', display: 'flex', alignItems: 'center', gap: 18 }}>
      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: CYAN, fontWeight: 900, flexShrink: 0 }}>ENTERPRISE</span>
      <span style={{ fontSize: 14, color: '#FFFFFF', fontWeight: 800 }}>上場企業グループから中堅製造業まで。規模も産業も異なる現場で、AIと基幹の両輪を担っています。</span>
    </Card>
    <Foot n={19} />
  </div>
);

/* ============================================================
   20〜24  実績詳細（PROJECT 01〜05）
   ============================================================ */
const R01 = <ProjectSlide key="r01" p={PROJECTS[0]} n={20} />;
const R02 = <ProjectSlide key="r02" p={PROJECTS[1]} n={21} paper />;
const R03 = <ProjectSlide key="r03" p={PROJECTS[2]} n={22} />;
const R04 = <ProjectSlide key="r04" p={PROJECTS[3]} n={23} paper />;
const R05 = <ProjectSlide key="r05" p={PROJECTS[4]} n={24} />;

/* ============================================================
   27  章扉 04 PRODUCTS
   ============================================================ */
const P00 = <Divider key="p00" no="04" en="OUR PRODUCTS" ja="自社プロダクト" lead="受託開発の現場から生まれた、2つのプロダクト。" n={27} />;

/* ============================================================
   28  プロダクトラインナップ
   ============================================================ */
const P01 = (
  <div key="p01" className={SLIDE} style={{ background: '#FFFFFF', padding: '46px 64px 0' }}>
    <Head
      eyebrow="Product Lineup"
      title="つくる現場と、売る現場に。"
      lead="開発マネジメントと営業マネジメント。自分たちが使うために作り、そのまま製品にしました。"
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
      {PRODUCTS.map((p) => (
        <Card key={p.no} style={{ padding: 0, height: 384, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: p.bg, height: 132, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px' }}>
            <div style={{ width: 64, height: 64, borderRadius: 21, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 18px rgba(13,27,62,0.08)' }}>
              <p.icon size={29} color={p.color} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.18em', color: p.color, fontWeight: 900, marginBottom: 6 }}>{p.no} ／ {p.en}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: INK, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{p.system}</div>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: p.color, marginTop: 6 }}>{p.short}</div>
            </div>
          </div>
          <div style={{ padding: '22px 30px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.85, margin: 0, fontWeight: 600 }}>{p.lead}</p>
            <div style={{ height: 1, background: BORDER, margin: '18px 0 16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {p.notes.map((v) => (
                <div key={v.t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 10, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <v.icon size={14} color={p.color} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 900, color: INK, flexShrink: 0 }}>{v.t}</span>
                  <span style={{ fontSize: 11.5, color: MUTE, fontWeight: 600 }}>{v.d}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 16 }}>
              {p.stack.map((t) => (
                <span key={t} style={{ fontSize: 10.5, fontWeight: 800, color: MUTE, background: PAPER, borderRadius: 7, padding: '5px 10px' }}>{t}</span>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
    <Card style={{ marginTop: 16, padding: '15px 26px', background: INK, border: 'none', display: 'flex', alignItems: 'center', gap: 18 }}>
      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: CYAN, fontWeight: 900, flexShrink: 0 }}>IN-HOUSE</span>
      <span style={{ fontSize: 14, color: '#FFFFFF', fontWeight: 800 }}>受注は NegoNavi、開発は Dev Ticket。商談から実装まで、自社の業務がそのまま製品になっています。</span>
    </Card>
    <Foot n={28} />
  </div>
);

/* ============================================================
   29〜30  プロダクト詳細
   ============================================================ */
const P02 = <ProjectSlide key="p02" p={PRODUCTS[0]} n={29} paper />;
const P03 = <ProjectSlide key="p03" p={PRODUCTS[1]} n={30} />;

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
    <Foot n={25} />
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
    <Foot n={26} />
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
      '他社ご紹介用の会社案内（全31枚・図解主体）。公式サイト最新情報に基づき、会社概要／代表挨拶／社名の由来（5つの産業）／沿革／行動指針、SERVICES（受託開発・AI研究開発・ITコンサルティング・多角的事業支援の4本柱とAIによる工期短縮）、TOPICS 2026（少額案件償却プロジェクト・AI開発ラボ・自社プロダクト「Dev Ticket」）、RESULTS（主要な開発実績サマリ＋実績詳細5件：大手不動産会社のテナントマッチングAIプラットフォーム／金属加工会社のCADCHANGE／大手証券グループ会社のAI記事自動生成システム／大手通信事業会社の基幹システム「MP Core」／大手エネルギー開発事業会社のCall Net、支援事例2件・対応産業とフェーズ）、OUR PRODUCTS（自社プロダクト2件：システム開発管理ツール「Dev Ticket」／セールス管理ツール「NegoNavi」）で構成。各実績はプロダクトのログイン画面モックを掲載。',
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
    S19, // 15  AI開発ラボ（AS-IS / TO-BE の構成比）
    S18, // 16  少額案件償却プロジェクト（費用と補助金）
    S20, // 17  Dev Ticket（製品画面）
    S21, // 18  章扉 03 RESULTS
    R00, // 19  主要な開発実績（サマリ）
    R01, // 20  実績 01 大手不動産会社（テナントマッチングAI）
    R02, // 21  実績 02 金属加工会社（CADCHANGE）
    R03, // 22  実績 03 大手証券グループ会社（AI記事自動生成）
    R04, // 23  実績 04 大手通信事業会社（MP Core）
    R05, // 24  実績 05 大手エネルギー開発事業会社（Call Net）
    S22, // 25  支援事例
    S23, // 26  対応産業とフェーズ
    P00, // 27  章扉 04 PRODUCTS
    P01, // 28  プロダクトラインナップ
    P02, // 29  プロダクト 01 Dev Ticket
    P03, // 30  プロダクト 02 NegoNavi
    S24, // 31  END
  ],
};
