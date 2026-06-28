import {
  Wallet,
  Clock,
  Cpu,
  Zap,
  Layers,
  Users,
  Boxes,
  Database,
  Workflow,
  Calendar,
  UserCheck,
  ShoppingCart,
  BarChart3,
  Sparkles,
  ArrowRight,
  MessageSquare,
  FileSearch,
  Rocket,
  Wrench,
  ClipboardList,
  BadgeCheck,
  PackageCheck,
  PiggyBank,
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import type { PresentationEntry } from '../registry';

/* ============================================================
   少額案件償却プロジェクト — 外部説明用プレゼン（全15枚）
   配色は Meece-HP のサービスページに準拠
   ============================================================ */

const NAVY = '#0D1B3E';
const BLUE = '#3182CE';
const CYAN = '#00FBFF'; // ダーク背景上のアクセント
const CYAN_T = '#0891B2'; // 明背景上のテキスト用
const PURPLE = '#9D72FF';
const PINK = '#FF5BAE';
const TEAL = '#14B8A6';
const INK = '#0D1B3E';
const SUB = '#6B7280';
const BODY = '#4B5563';

const SLIDE = 'w-full h-[720px] relative overflow-hidden';

const Underline = () => (
  <div style={{ width: 60, height: 4, background: 'linear-gradient(to right, #00FBFF, #9D72FF)', borderRadius: 2 }} />
);

function Header({
  kicker,
  kickerColor = PURPLE,
  title,
  center = false,
}: {
  kicker: string;
  kickerColor?: string;
  title: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div style={{ marginBottom: 36, textAlign: center ? 'center' : 'left' }}>
      <p style={{ color: kickerColor, fontSize: 12, fontWeight: 900, letterSpacing: '0.3em', marginBottom: 14 }}>
        {kicker}
      </p>
      <h2 style={{ fontSize: 40, fontWeight: 900, color: INK, marginBottom: 18, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
        {title}
      </h2>
      <div style={{ display: 'flex', justifyContent: center ? 'center' : 'flex-start' }}>
        <Underline />
      </div>
    </div>
  );
}

/* ===== SLIDE 1: 表紙（ダーク）===== */
const Slide1 = (
  <div key="s1" className={SLIDE} style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #142a5c 55%, #1E3A8A 100%)' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 82% 16%, rgba(0,251,255,0.12) 0%, transparent 48%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 10% 90%, rgba(157,114,255,0.14) 0%, transparent 45%)' }} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 88px', boxSizing: 'border-box' }}>
      <div
        className="inline-flex items-center gap-2 w-fit"
        style={{ borderRadius: 100, padding: '8px 18px', marginBottom: 32, background: 'rgba(0,251,255,0.08)', border: '1px solid rgba(0,251,255,0.3)' }}
      >
        <Sparkles className="w-3.5 h-3.5" style={{ color: CYAN }} />
        <span style={{ color: CYAN, fontSize: 12, fontWeight: 900, letterSpacing: '0.18em' }}>SERVICE / 少額案件償却プロジェクト</span>
      </div>

      <h1 style={{ fontSize: 68, fontWeight: 900, color: '#fff', lineHeight: 1.18, letterSpacing: '-0.02em', marginBottom: 30 }}>
        予算が足りない、を
        <br />
        <span style={{ background: 'linear-gradient(90deg, #00FBFF, #9D72FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          諦める理由にしない。
        </span>
      </h1>

      <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 19, lineHeight: 1.9, maxWidth: 760, marginBottom: 44 }}>
        システム開発は、1,000万円からが当たり前だった。その常識を、AIの力で塗り替えます。
        <br />
        <span style={{ color: '#fff', fontWeight: 800 }}>── 100万円から、最短1ヶ月。</span>
      </p>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        {[
          { icon: Wallet, label: '100万円〜', c: CYAN },
          { icon: Clock, label: '最短1ヶ月', c: PURPLE },
          { icon: Cpu, label: 'AI駆動開発', c: PINK },
        ].map(({ icon: Icon, label, c }) => (
          <div
            key={label}
            className="inline-flex items-center gap-2"
            style={{ borderRadius: 100, padding: '11px 22px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            <Icon className="w-4 h-4" style={{ color: c }} />
            <span style={{ color: '#fff', fontSize: 15, fontWeight: 800 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>

    <div style={{ position: 'absolute', bottom: 36, right: 88, zIndex: 1, textAlign: 'right' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700 }}>Meece株式会社</p>
    </div>
  </div>
);

/* ===== SLIDE 2: 課題 ===== */
const Slide2 = (
  <div key="s2" className={SLIDE} style={{ background: '#F8F9FB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 80px', boxSizing: 'border-box' }}>
      <Header kicker="THE 10 MILLION YEN WALL" kickerColor={PURPLE} title={<>その案件、予算を理由に眠っていませんか。</>} />

      <div style={{ display: 'flex', gap: 48, alignItems: 'stretch' }}>
        {/* 左: ナラティブ */}
        <div style={{ flex: 1.25 }}>
          <p style={{ color: BODY, fontSize: 16, lineHeight: 2.05, marginBottom: 18 }}>
            システム開発は、これまで1,000万円以上が当たり前でした。エンジニア1人あたり月100万円。4〜5人のチームを組めば、あっという間に1,000万円を超えていきます。
          </p>
          <p style={{ color: BODY, fontSize: 16, lineHeight: 2.05, marginBottom: 18 }}>
            けれど、その予算を用意できる中小企業は、決して多くありません。「やりたかったシステム化」「DXの構想」は、見積もりを見た瞬間にペンディングされ、そのまま眠り続ける。
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 24, padding: '20px 24px', background: '#fff', borderRadius: 20, border: '1px solid #EEF1F5' }}>
            <span style={{ fontSize: 52, fontWeight: 900, color: BLUE, lineHeight: 1, letterSpacing: '-0.03em' }}>
              99.7<span style={{ fontSize: 24 }}>%</span>
            </span>
            <span style={{ fontSize: 14, color: BODY, fontWeight: 700, lineHeight: 1.7 }}>
              日本企業に占める、中小企業の割合。
              <br />
              雇用の約7割を支えています。
            </span>
          </div>
        </div>

        {/* 右: 1,000万→100万 の対比 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: '28px 32px', textAlign: 'center', border: '1px solid #F0F2F5' }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#9CA3AF', marginBottom: 10 }}>これまでの常識</p>
            <p style={{ fontSize: 44, fontWeight: 900, color: '#B6BCC6', textDecoration: 'line-through', textDecorationColor: PINK }}>¥1,000万〜</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ArrowRight size={26} color={PURPLE} style={{ transform: 'rotate(90deg)' }} />
          </div>
          <div style={{ background: 'linear-gradient(135deg, #0D1B3E, #1E3A8A)', borderRadius: 24, padding: '28px 32px', textAlign: 'center', boxShadow: '0 20px 50px rgba(13,27,62,0.25)' }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: CYAN, marginBottom: 10 }}>Meeceなら</p>
            <p style={{ fontSize: 46, fontWeight: 900, color: '#fff' }}>¥100万〜</p>
          </div>
        </div>
      </div>

      <p style={{ fontWeight: 900, color: INK, fontSize: 21, textAlign: 'center', lineHeight: 1.6, marginTop: 36 }}>
        眠ったままの案件を、寝かせない。ちゃんと、動かす。
        <br />
        それが「<span style={{ color: BLUE }}>少額案件償却プロジェクト</span>」です。
      </p>
    </div>
  </div>
);

/* ===== SLIDE 3: ソリューション 3つの価値 ===== */
const Slide3 = (
  <div key="s3" className={SLIDE} style={{ background: '#fff' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 80px', boxSizing: 'border-box' }}>
      <Header kicker="SOLUTION" kickerColor={CYAN_T} title={<>100万円から、本格的なシステム開発を。</>} center />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        {[
          { icon: Wallet, big: '100万円〜', sub: '受注可能（上限なし）', bg: '#E6FFFA', c: CYAN_T },
          { icon: Clock, big: '最短1ヶ月〜', sub: 'スピード納品', bg: '#F5F3FF', c: PURPLE },
          { icon: Cpu, big: 'AI駆動', sub: '低コスト × 高品質', bg: '#FFF5F7', c: PINK },
        ].map(({ icon: Icon, big, sub, bg, c }) => (
          <div key={big} style={{ background: '#fff', borderRadius: 28, border: '1px solid #F0F2F5', padding: '40px 28px', textAlign: 'center', boxShadow: '0 16px 44px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 60, height: 60, borderRadius: 18, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
              <Icon className="w-7 h-7" style={{ color: c }} />
            </div>
            <p style={{ fontSize: 34, fontWeight: 900, color: INK, marginBottom: 8, letterSpacing: '-0.02em' }}>{big}</p>
            <p style={{ fontSize: 14, color: SUB, fontWeight: 700 }}>{sub}</p>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: BODY, fontSize: 16, lineHeight: 1.9, maxWidth: 740, margin: '0 auto 28px' }}>
        Meeceは、AIを活用した独自の開発体制によって、これまで少額では受けきれなかった案件を、低コスト・短納期で形にします。
      </p>

      <div style={{ background: '#FFF9E6', border: '1px solid #FCE7A2', borderRadius: 20, padding: '22px 32px', maxWidth: 860, margin: '0 auto', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <Lightbulb className="w-6 h-6" style={{ color: '#E0A400', flexShrink: 0 }} />
        <p style={{ color: '#7A5C00', fontSize: 15, lineHeight: 1.85, margin: 0 }}>
          ここで言う“開発”は、ホームページ制作のことではありません。
          <strong style={{ color: '#5C4500' }}>在庫管理・業務システム・マッチング・社内ワークフローといった、本格的なシステム開発</strong>
          が、100万円からスタートできるという意味です。
        </p>
      </div>
    </div>
  </div>
);

/* ===== SLIDE 4: 安さの理由 ===== */
const Slide4 = (
  <div key="s4" className={SLIDE} style={{ background: '#F8F9FB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 80px', boxSizing: 'border-box' }}>
      <Header kicker="WHY MEECE" kickerColor={PURPLE} title={<>安さの理由は、ごまかしではありません。</>} center />

      <p style={{ textAlign: 'center', color: SUB, fontSize: 15, lineHeight: 1.9, maxWidth: 760, margin: '0 auto 36px' }}>
        Meeceの低コストは、人件費を削った“安かろう悪かろう”ではなく、<strong style={{ color: INK }}>開発のやり方そのものを変えた</strong>ことで生まれています。
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        {[
          { no: '01', icon: Zap, title: 'AIを駆使した開発', desc: '人海戦術に頼らず、AIで設計・実装を高速化。同じ成果を、より少ない工数で実現します。', bg: '#E6FFFA', c: CYAN_T },
          { no: '02', icon: Layers, title: '独自の開発フレームワーク', desc: 'Meeceが積み上げてきた“型”で、ムダな工程を削ぎ落とす。（その中身は、私たちの財産であり企業秘密です。）', bg: '#F5F3FF', c: PURPLE },
          { no: '03', icon: Users, title: '少数精鋭の体制', desc: '余計な人月を、見積もりに載せない。だからこそ、価格を抑えながら品質を守れます。', bg: '#FFF5F7', c: PINK },
        ].map(({ no, icon: Icon, title, desc, bg, c }) => (
          <div key={no} style={{ background: '#fff', borderRadius: 28, border: '1px solid #F0F2F5', padding: '36px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <div style={{ width: 52, height: 52, borderRadius: 15, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon className="w-6 h-6" style={{ color: c }} />
              </div>
              <span style={{ fontSize: 34, fontWeight: 900, color: '#EDEFF2' }}>{no}</span>
            </div>
            <h3 style={{ fontSize: 19, fontWeight: 900, color: INK, marginBottom: 14 }}>{title}</h3>
            <p style={{ fontSize: 13.5, color: SUB, lineHeight: 1.9 }}>{desc}</p>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 900, color: INK, lineHeight: 1.6 }}>
        言葉でいくら説明しても、安さの不安は消えません。
        <span style={{ color: BLUE }}> だから私たちは、実績で証明します。</span>
      </p>
    </div>
  </div>
);

/* ===== SLIDE 5: 実績 ===== */
const Slide5 = (
  <div key="s5" className={SLIDE} style={{ background: '#fff' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 80px', boxSizing: 'border-box' }}>
      <Header kicker="TRACK RECORD" kickerColor={CYAN_T} title="実績 — この金額・この期間で、実現しています。" center />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        {[
          { icon: Boxes, title: 'EC在庫一元管理システム', desc: '複数のECに出品する商品の在庫・価格を、1つのシステムで一元管理。', price: '400万円', period: '1.5ヶ月', c: CYAN_T },
          { icon: Database, title: '情報マッチングシステム', desc: 'さまざまな情報とニーズを、自動でマッチング。', price: '200万円', period: '1ヶ月', c: PURPLE },
          { icon: Workflow, title: '社内ワークフローシステム', desc: '自社独自のルール・文化に沿ったワークフローを構築・運用。', price: '300万円', period: '2ヶ月', c: PINK },
        ].map(({ icon: Icon, title, desc, price, period, c }) => (
          <div key={title} style={{ background: '#F9FAFB', borderRadius: 28, padding: '36px 30px' }}>
            <div style={{ width: 52, height: 52, borderRadius: 15, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22, boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
              <Icon className="w-6 h-6" style={{ color: c }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: INK, marginBottom: 12, lineHeight: 1.4 }}>{title}</h3>
            <p style={{ fontSize: 13, color: SUB, lineHeight: 1.8, marginBottom: 22, minHeight: 66 }}>{desc}</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { k: '費用', v: price },
                { k: '期間', v: period },
              ].map(({ k, v }) => (
                <div key={k} style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '14px', textAlign: 'center' }}>
                  <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 800, marginBottom: 6 }}>{k}</p>
                  <p style={{ fontSize: 20, fontWeight: 900, color: INK }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: BODY, fontSize: 16, lineHeight: 1.9, fontWeight: 700 }}>
        いずれも、本来なら<span style={{ color: PINK, fontWeight: 900 }}>数千万円規模になりうる開発</span>です。それを、この金額・この期間で実現しています。
      </p>
    </div>
  </div>
);

/* ===== SLIDE 6: コスト削減 ===== */
const costData = [
  { name: 'EC在庫一元管理', color: BLUE, legacy: { m: 8, c: 2000 }, meece: { m: 1.5, c: 400 } },
  { name: '情報マッチング', color: TEAL, legacy: { m: 6, c: 1200 }, meece: { m: 1, c: 200 } },
  { name: '社内ワークフロー', color: '#6366F1', legacy: { m: 10, c: 1500 }, meece: { m: 2, c: 300 } },
];

const Slide6 = (
  <div key="s6" className={SLIDE} style={{ background: '#F8F9FB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 80px', boxSizing: 'border-box' }}>
      <Header kicker="COST REDUCTION" kickerColor={BLUE} title="従来の開発会社なら、これだけ掛かっていた。" center />

      <div style={{ background: '#fff', borderRadius: 32, padding: '40px 48px', boxShadow: '0 16px 44px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {costData.map((d) => {
            const reduction = Math.round((1 - d.meece.c / d.legacy.c) * 100);
            const R = 80;
            const C = 2 * Math.PI * R;
            return (
              <div key={d.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <svg viewBox="0 0 200 200" style={{ width: 150, height: 150 }}>
                  <circle cx="100" cy="100" r={R} fill="none" stroke="#EDF0F4" strokeWidth="20" />
                  <circle
                    cx="100"
                    cy="100"
                    r={R}
                    fill="none"
                    stroke={d.color}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${C * (reduction / 100)} ${C}`}
                    transform="rotate(-90 100 100)"
                  />
                  <text x="100" y="96" textAnchor="middle" fontSize="48" fontWeight="900" fill={INK}>
                    {reduction}%
                  </text>
                  <text x="100" y="126" textAnchor="middle" fontSize="15" fontWeight="800" fill="#9CA3AF">
                    コスト削減
                  </text>
                </svg>
                <h4 style={{ fontSize: 17, fontWeight: 900, color: INK, margin: '16px 0 14px' }}>{d.name}</h4>
                <div style={{ width: '100%', maxWidth: 240, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
                    <span style={{ color: '#9CA3AF', fontWeight: 800 }}>費用</span>
                    <span>
                      <span style={{ color: '#C4C9D2', textDecoration: 'line-through', fontWeight: 700 }}>約{d.legacy.c.toLocaleString()}万円</span>{' '}
                      <span style={{ color: d.color, fontWeight: 900, fontSize: 14 }}>→ {d.meece.c}万円</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
                    <span style={{ color: '#9CA3AF', fontWeight: 800 }}>期間</span>
                    <span>
                      <span style={{ color: '#C4C9D2', textDecoration: 'line-through', fontWeight: 700 }}>約{d.legacy.m}ヶ月</span>{' '}
                      <span style={{ color: INK, fontWeight: 900, fontSize: 14 }}>→ {d.meece.m}ヶ月</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 32, background: NAVY, borderRadius: 20, padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <h5 style={{ color: '#fff', fontSize: 20, fontWeight: 900, marginBottom: 6 }}>費用は約 1/5 以下、期間も大幅短縮。</h5>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7 }}>“安い”と“速い”は、トレードオフではありません。</p>
          </div>
          <div style={{ fontSize: 11, fontWeight: 900, color: CYAN, border: '1px solid rgba(0,251,255,0.3)', padding: '10px 20px', borderRadius: 100, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>COST DOWN</div>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 11, color: '#9CA3AF', marginTop: 18, lineHeight: 1.7 }}>
        ※「従来の開発」の費用・期間は、同等のシステムを一般的な受託開発（複数名・数ヶ月）で構築した場合の目安です。実際の金額・期間はご要望により変動します。
      </p>
    </div>
  </div>
);

/* ===== SLIDE 6.5: 取り組みで生まれる効果（Before→After）===== */
function EffectSlide() {
  // 「現状」を100とした相対指数。短くなる＝改善（すべて“減る”方向で統一）。
  const PH = 168; // 棒グラフの最大高さ(px)
  const bars = [
    { label: '定型業務にかかる時間', sub: '繰り返し作業を自動化', before: 100, after: 33, tag: '約 1/3 に', c: CYAN_T },
    { label: '入力ミス・対応漏れ', sub: 'チェックと通知を仕組み化', before: 100, after: 30, tag: '約 −70%', c: PURPLE },
    { label: '情報を探す・確認する手間', sub: '見える化して、すぐ共有', before: 100, after: 33, tag: '約 1/3 に', c: PINK },
  ];

  const points = [
    '必要なところから、予算に合わせて。',
    '小さく始めて、あとから育てられる。',
    '効果を確かめながら、次の一手へ。',
  ];

  return (
    <div key="s6b" className={SLIDE} style={{ background: '#F8F9FB' }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 72px', boxSizing: 'border-box' }}>
        <Header
          kicker="EFFECT"
          kickerColor={BLUE}
          title={<>この一手で、現場はここまで軽くなる。</>}
          center
        />

        <p style={{ textAlign: 'center', color: SUB, fontSize: 14.5, lineHeight: 1.8, maxWidth: 820, margin: '0 auto 22px' }}>
          かけられる費用の中で、いちばん効くところから形にする。だから大きく構えなくても、<strong style={{ color: INK }}>毎日の手間・ミス・スピード</strong>は、はっきり変わります。
        </p>

        <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
          {/* 左: Before→After 改善グラフ */}
          <div style={{ flex: 1.6, background: '#fff', borderRadius: 28, padding: '22px 30px 18px', border: '1px solid #F0F2F5', boxShadow: '0 14px 40px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 900, color: INK }}>システム化で、ここまで減る。</p>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: '#9CA3AF' }}>
                  <span style={{ width: 11, height: 11, borderRadius: 3, background: '#E2E8F0' }} />現状
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: INK }}>
                  <span style={{ width: 11, height: 11, borderRadius: 3, background: `linear-gradient(180deg, ${NAVY}, ${BLUE})` }} />システム化後
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: PH, borderBottom: '1.5px solid #E5E7EB', padding: '0 4px' }}>
              {bars.map((b) => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                  <div style={{ width: 40, height: (b.before / 100) * PH, background: '#E5E7EB', borderRadius: '8px 8px 0 0' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: b.c, marginBottom: 6, whiteSpace: 'nowrap' }}>{b.tag}</span>
                    <div style={{ width: 40, height: (b.after / 100) * PH, background: `linear-gradient(180deg, ${b.c}, ${b.c}CC)`, borderRadius: '8px 8px 0 0' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 14 }}>
              {bars.map((b) => (
                <div key={b.label} style={{ textAlign: 'center', maxWidth: 150 }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: INK, marginBottom: 4, lineHeight: 1.35 }}>{b.label}</p>
                  <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700, lineHeight: 1.5 }}>{b.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 右: 取り組みの考え方 */}
          <div style={{ flex: 1, background: NAVY, borderRadius: 28, padding: '30px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 85% 12%, rgba(0,251,255,0.14) 0%, transparent 55%)' }} />
            <div style={{ position: 'relative' }}>
              <p style={{ fontSize: 11, fontWeight: 900, color: CYAN, letterSpacing: '0.18em', marginBottom: 14 }}>OUR APPROACH</p>
              <h4 style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.5, marginBottom: 22 }}>
                大きく構えなくて、いい。
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {points.map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color: CYAN, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.92)', lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 10.5, color: '#9CA3AF', marginTop: 18, lineHeight: 1.7 }}>
          ※ グラフは効果のイメージで、現状を100とした相対値です。実際の数値は、業務内容や規模により異なります。
        </p>
      </div>
    </div>
  );
}
const Slide6b = <EffectSlide key="s6b" />;

/* ===== SLIDE 7: 作れるもの ===== */
const Slide7 = (
  <div key="s7" className={SLIDE} style={{ background: '#fff' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 80px', boxSizing: 'border-box' }}>
      <Header kicker="WHAT WE BUILD" kickerColor={CYAN_T} title={<>あなたの“困りごと”を、システムに。</>} center />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { icon: Boxes, label: '在庫管理' },
          { icon: Calendar, label: '予約管理' },
          { icon: UserCheck, label: '顧客管理（CRM）' },
          { icon: Database, label: '情報マッチング' },
          { icon: Workflow, label: '社内ワークフロー' },
          { icon: ShoppingCart, label: 'EC・受発注' },
          { icon: BarChart3, label: 'データ集計・可視化' },
          { icon: Sparkles, label: '各種業務効率化' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} style={{ background: '#F9FAFB', borderRadius: 20, padding: '28px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Icon className="w-6 h-6" style={{ color: INK }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: INK }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#F8F9FB', borderRadius: 24, padding: '28px 44px', textAlign: 'center' }}>
        <p style={{ color: BODY, fontSize: 15, lineHeight: 1.9, marginBottom: 12 }}>
          ここに載っていないものでも大丈夫です。「これってシステムにできる？」── その相談からで構いません。
        </p>
        <p style={{ color: SUB, fontSize: 13, lineHeight: 1.8 }}>
          なお、<strong style={{ color: INK }}>開発規模に上限はありません。</strong>より大規模な開発をお考えの場合は、<span style={{ color: BLUE, fontWeight: 800 }}>AI開発ラボ</span>でも承っています。
        </p>
      </div>
    </div>
  </div>
);

/* ===== SLIDE 8: 補助金との相性 ===== */
const Slide8 = (
  <div key="s8" className={SLIDE} style={{ background: '#F8F9FB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 80px', boxSizing: 'border-box' }}>
      <Header kicker="SUBSIDY" kickerColor={PURPLE} title={<>少額だからこそ、補助金が活きる。</>} center />

      <p style={{ textAlign: 'center', color: BODY, fontSize: 16, lineHeight: 2, maxWidth: 800, margin: '0 auto 40px' }}>
        100万円から始められるということは、補助金ととても相性が良いということです。少額の補助金は、大型の補助金に比べて<strong style={{ color: INK }}>採択のハードルが低く</strong>、はじめの一歩として取り組みやすい。補助金を活用すれば、実質的な負担をさらに抑えてDXを進められます。
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 880, margin: '0 auto', width: '100%' }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: '32px 30px', border: '1px solid #F0F2F5', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: '#E6FFFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MessageSquare className="w-5 h-5" style={{ color: '#00B5AD' }} />
          </div>
          <div>
            <h4 style={{ fontSize: 17, fontWeight: 900, color: INK, marginBottom: 8 }}>ご相談は無料</h4>
            <p style={{ fontSize: 13, color: SUB, lineHeight: 1.8 }}>「うちは何の補助金が使える？」の段階から、お気軽にご相談ください。</p>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 24, padding: '32px 30px', border: '1px solid #F0F2F5', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ClipboardList className="w-5 h-5" style={{ color: PURPLE }} />
          </div>
          <div>
            <h4 style={{ fontSize: 17, fontWeight: 900, color: INK, marginBottom: 8 }}>申請業務もサポート</h4>
            <p style={{ fontSize: 13, color: SUB, lineHeight: 1.8 }}>対象の補助金選びから事業計画書・申請書類の作成代行まで（申請業務の委託は有料）。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ===== SLIDE 9: 補助金 詳細一覧 ===== */
const subsidies = [
  { name: '小規模事業者持続化補助金', note: '上限 最大250万円', rate: '2/3', dev: 150, grant: 100, color: TEAL, level: 1, hurdle: '比較的とおりやすい', adopt: '約45〜50%' },
  { name: 'デジタル化・AI導入補助金2026', note: '上限 最大450万円（旧 IT導入補助金）', rate: '1/2', dev: 300, grant: 150, color: BLUE, level: 2, hurdle: '中程度', adopt: '約35〜45%' },
  { name: 'ものづくり補助金', note: '上限 最大2,500万円', rate: '1/2', dev: 450, grant: 225, color: '#6366F1', level: 3, hurdle: 'やや高め（狭き門）', adopt: '約30〜37%' },
];

const Slide9 = (
  <div key="s9" className={SLIDE} style={{ background: '#fff' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 72px', boxSizing: 'border-box' }}>
      <Header kicker="SUBSIDY DETAIL" kickerColor={CYAN_T} title="補助金を使うと、実質負担はこう変わる。" center />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {subsidies.map((sb) => {
          const self = sb.dev - sb.grant;
          const grantPct = Math.round((sb.grant / sb.dev) * 100);
          return (
            <div key={sb.name} style={{ background: '#fff', borderRadius: 24, padding: '26px 24px', border: '1px solid #F0F2F5', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <h4 style={{ fontSize: 15, fontWeight: 900, color: INK, marginBottom: 6, lineHeight: 1.4, minHeight: 42 }}>{sb.name}</h4>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#9CA3AF', marginBottom: 20, lineHeight: 1.5 }}>{sb.note}・補助率 {sb.rate}</p>

              <p style={{ fontSize: 12, fontWeight: 800, color: '#9CA3AF', marginBottom: 10 }}>開発費 {sb.dev}万円のうち</p>
              <div style={{ display: 'flex', width: '100%', height: 18, borderRadius: 100, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ width: `${grantPct}%`, background: sb.color }} />
                <div style={{ flex: 1, background: NAVY }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 800, marginBottom: 20 }}>
                <span style={{ color: sb.color }}>補助金 {sb.grant}万円</span>
                <span style={{ color: INK }}>自己負担 {self}万円</span>
              </div>

              <div style={{ background: '#F9FAFB', borderRadius: 14, padding: 16, textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 800, marginBottom: 4 }}>実質の自己負担</p>
                <p style={{ fontSize: 28, fontWeight: 900, color: sb.color }}>
                  {self}
                  <span style={{ fontSize: 15 }}>万円</span>
                </p>
              </div>

              <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid #F0F2F5' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#9CA3AF' }}>採択ハードル</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {[1, 2, 3].map((n) => (
                        <div key={n} style={{ width: 9, height: 9, borderRadius: '50%', background: n <= sb.level ? sb.color : '#E5E7EB' }} />
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 900, color: INK }}>{sb.hurdle}</span>
                </div>
                <p style={{ fontSize: 10.5, color: '#9CA3AF', fontWeight: 700, textAlign: 'right' }}>採択率の目安 {sb.adopt}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ textAlign: 'center', fontSize: 10.5, color: '#9CA3AF', lineHeight: 1.8, marginTop: 18 }}>
        ※金額・補助率・採択率は2026年度時点の代表的な制度をもとにした目安で、公募回により変動します。最新の要件は各公式サイトでご確認ください（まずはMeeceに無料相談を）。
      </p>
    </div>
  </div>
);

/* ===== SLIDE 10: 補助金活用フロー（6ステップ）===== */
const Slide10 = (
  <div key="s10" className={SLIDE} style={{ background: '#F8F9FB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 72px', boxSizing: 'border-box' }}>
      <Header kicker="SUBSIDY FLOW" kickerColor={PURPLE} title="補助金を活用した、ご相談〜納品の流れ" center />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {[
          { icon: MessageSquare, title: 'まずはMeeceに無料相談', desc: 'やりたいことと予算をヒアリング。どの補助金が使えそうかも含めて、まずは無料でご相談ください。', c: TEAL },
          { icon: ClipboardList, title: '補助金の申請サポート', desc: '対象の補助金を選び、事業計画書や申請書類の作成を代行。採択の可能性を高めます。（委託は有料）', c: BLUE },
          { icon: BadgeCheck, title: '採択・交付決定', desc: '審査を通過して採択。交付決定を受けて、正式にプロジェクトがスタートします。', c: PURPLE },
          { icon: Rocket, title: 'システム開発', desc: 'AIを活用し、低コスト・短納期で開発。進捗を共有しながら、一緒に作り上げます。', c: PINK },
          { icon: PackageCheck, title: '納品・検収', desc: '完成したシステムを納品し、運用に乗せるところまでサポートします。', c: '#6366F1' },
          { icon: PiggyBank, title: '実績報告・補助金の入金', desc: '実績報告のあと、補助金が入金されます（原則あと払い）。実質負担を大きく抑えてDXを実現。', c: '#E0A400' },
        ].map(({ icon: Icon, title, desc, c }, i) => (
          <div key={title} style={{ background: '#fff', borderRadius: 22, padding: '26px 26px', border: '1px solid #F0F2F5', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 22, right: 24, fontSize: 30, fontWeight: 900, color: '#EFF1F4' }}>0{i + 1}</div>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: `${c}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Icon className="w-5 h-5" style={{ color: c }} />
            </div>
            <h4 style={{ fontSize: 15.5, fontWeight: 900, color: INK, marginBottom: 10, lineHeight: 1.4 }}>{title}</h4>
            <p style={{ fontSize: 12.5, color: SUB, lineHeight: 1.85 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ===== SLIDE 11: ご相談の流れ（通常4ステップ）===== */
const Slide11 = (
  <div key="s11" className={SLIDE} style={{ background: '#fff' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 80px', boxSizing: 'border-box' }}>
      <Header kicker="FLOW" kickerColor={CYAN_T} title={<>まずは、話を聞かせてください。</>} center />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 32 }}>
        {[
          { icon: MessageSquare, step: 'STEP 1', title: '無料相談', desc: 'ご要望・お困りごとをお聞かせください。' },
          { icon: FileSearch, step: 'STEP 2', title: 'ヒアリング・お見積もり', desc: '内容に合わせて、最適なプランと金額をご提案。' },
          { icon: Rocket, step: 'STEP 3', title: '開発', desc: 'AIを活用し、低コスト・短納期で構築します。' },
          { icon: Wrench, step: 'STEP 4', title: '納品・運用', desc: '納品後の運用・改善もサポートします。' },
        ].map(({ icon: Icon, step, title, desc }) => (
          <div key={step} style={{ background: '#fff', borderRadius: 26, padding: '36px 24px', border: '1px solid #F0F2F5', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
              <Icon className="w-5 h-5" style={{ color: '#fff' }} />
            </div>
            <p style={{ fontSize: 11, fontWeight: 900, color: PURPLE, letterSpacing: '0.15em', marginBottom: 10 }}>{step}</p>
            <h4 style={{ fontSize: 16, fontWeight: 900, color: INK, marginBottom: 12 }}>{title}</h4>
            <p style={{ fontSize: 12, color: SUB, lineHeight: 1.8 }}>{desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#F8F9FB', borderRadius: 24, padding: '24px 44px', textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
        <p style={{ color: BODY, fontSize: 15, lineHeight: 1.9 }}>
          金額はつくるものによって変わります。だからこそ、決まったプラン表は掲げません。
          <strong style={{ color: INK }}>あなたのケースに合わせた見積もりを、無料でお出しします。</strong>
        </p>
      </div>
    </div>
  </div>
);

/* ===== SLIDE 12: 社会的意義（経営層・投資家向け）===== */
const Slide12 = (
  <div key="s12" className={SLIDE} style={{ background: 'linear-gradient(135deg, #EFF6FF, #ECFEFF)' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 80px', boxSizing: 'border-box', textAlign: 'center' }}>
      <Header kicker="MISSION" kickerColor={BLUE} title={<>中小企業を支えることは、日本を、支えること。</>} center />

      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginBottom: 28 }}>
        <span style={{ fontSize: 84, fontWeight: 900, color: BLUE, letterSpacing: '-0.03em', lineHeight: 1 }}>
          99.7<span style={{ fontSize: 40 }}>%</span>
        </span>
        <span style={{ fontSize: 16, color: BODY, fontWeight: 700, textAlign: 'left', lineHeight: 1.7, maxWidth: 280 }}>
          日本企業に占める、中小企業の割合。
          <br />
          雇用の約7割を支えています。
        </span>
      </div>

      <p style={{ color: BODY, fontSize: 15, lineHeight: 2, maxWidth: 820, margin: '0 auto 36px' }}>
        その大多数が、「予算の壁」でDX・システム化を諦めてきました。Meeceは、その一社一社の課題を拾い上げ、さらに補助金（公的資金）を活かして実現します。一社のシステム化の積み重ねは、やがて日本全体の生産性と競争力の底上げにつながる。だから私たちは、これを単なる開発事業ではなく、<strong style={{ color: INK }}>社会貢献性の高いプロジェクト</strong>として取り組んでいます。
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'left', maxWidth: 980, margin: '0 auto', width: '100%' }}>
        {[
          { icon: Building2, title: '中小企業の悩みに、直結。', desc: '日本の屋台骨である中小企業の「予算で諦めた」を、ダイレクトに解決します。', bg: '#F0F7FF', c: BLUE },
          { icon: PiggyBank, title: '公的資金を、活かす。', desc: '補助金との相性が良く、限られた予算を社会全体で有効に使えます。', bg: '#ECFEFF', c: TEAL },
          { icon: TrendingUp, title: '日本全体を、底上げ。', desc: '一社のDXの積み重ねが、国全体の生産性・競争力につながります。', bg: '#F5F3FF', c: PURPLE },
        ].map(({ icon: Icon, title, desc, bg, c }) => (
          <div key={title} style={{ background: '#fff', borderRadius: 22, padding: '28px 26px', border: '1px solid #DBEAFE' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <Icon className="w-6 h-6" style={{ color: c }} />
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 900, color: INK, marginBottom: 12 }}>{title}</h4>
            <p style={{ fontSize: 13, color: SUB, lineHeight: 1.9, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ===== SLIDE 13: まとめ ===== */
const Slide13 = (
  <div key="s13" className={SLIDE} style={{ background: '#fff' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 80px', boxSizing: 'border-box' }}>
      <Header kicker="SUMMARY" kickerColor={CYAN_T} title="少額案件償却プロジェクト、3つの要点。" center />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 28 }}>
        {[
          { icon: Wallet, head: '100万円・最短1ヶ月から', body: 'システム開発1,000万円の常識を、AIで塗り替える。上限なしで、本格的なシステム開発を少額から。', c: CYAN_T, bg: '#E6FFFA' },
          { icon: ShieldCheck, head: '実績が証明する品質', body: '200〜400万円・1〜2ヶ月で構築。従来比 約1/5 以下のコスト。"安い"と"速い"は両立する。', c: PURPLE, bg: '#F5F3FF' },
          { icon: PiggyBank, head: '補助金で、さらに身軽に', body: '少額だからこそ補助金と好相性。相談は無料、申請サポートも。実質負担を抑えてDXを。', c: PINK, bg: '#FFF5F7' },
        ].map(({ icon: Icon, head, body, c, bg }) => (
          <div key={head} style={{ background: '#fff', borderRadius: 26, padding: '34px 28px', border: '1px solid #F0F2F5', boxShadow: '0 14px 40px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Icon className="w-7 h-7" style={{ color: c }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: INK, marginBottom: 12, lineHeight: 1.4 }}>{head}</h3>
            <p style={{ fontSize: 13.5, color: SUB, lineHeight: 1.95 }}>{body}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        {['中小企業の悩みに直結', '公的資金を活かす', '日本全体を底上げ'].map((t) => (
          <div key={t} className="inline-flex items-center gap-2" style={{ background: '#F8F9FB', borderRadius: 100, padding: '10px 20px', border: '1px solid #EEF1F5' }}>
            <CheckCircle2 className="w-4 h-4" style={{ color: BLUE }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: INK }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ===== SLIDE 14: クロージング / CTA（ダーク）===== */
const Slide14 = (
  <div key="s14" className={SLIDE} style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #142a5c 60%, #1E3A8A 100%)' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(0,251,255,0.1) 0%, transparent 50%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 85%, rgba(157,114,255,0.12) 0%, transparent 48%)' }} />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 80px', boxSizing: 'border-box' }}>
      <ShieldCheck className="w-10 h-10" style={{ color: CYAN, marginBottom: 26 }} />
      <h2 style={{ fontSize: 52, fontWeight: 900, color: '#fff', marginBottom: 24, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
        予算で諦めていた、その一歩を。
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.9, marginBottom: 44, maxWidth: 620 }}>
        100万円から、最短1ヶ月。まずは無料でご相談ください。
        <br />
        まだ内容が固まっていなくても、お気軽にどうぞ。
      </p>

      <div
        className="inline-flex items-center gap-2"
        style={{ background: BLUE, color: '#fff', padding: '18px 44px', borderRadius: 100, fontSize: 16, fontWeight: 900, letterSpacing: '0.04em', boxShadow: '0 16px 40px rgba(49,130,206,0.4)' }}
      >
        無料で相談する
        <ArrowRight className="w-5 h-5" />
      </div>

      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700, marginTop: 36 }}>
        Meece株式会社
      </p>
    </div>
  </div>
);

export const smallProjectPresentation: PresentationEntry = {
  meta: {
    id: 'small-project-2026',
    title: '少額案件償却プロジェクト',
    description: '予算を理由に、DXを諦めない。100万円・最短1ヶ月から、AIで本格システム開発。中小企業のための新スキーム。',
    thumbnail: 'linear-gradient(135deg, #0D1B3E 0%, #2563EB 55%, #00FBFF 100%)',
    author: 'Meece株式会社',
    createdAt: '2026-06-28',
  },
  slides: [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide6b, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14],
};
