import {
  Award,
  User,
  Calendar,
  CircleDollarSign,
  Landmark,
  MapPin,
  Phone,
  Building2,
  Factory,
  GraduationCap,
  Sparkles,
  ShoppingCart,
  Heart,
  Cpu,
  Zap,
  Rocket,
  Lightbulb,
  Calculator,
  PiggyBank,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Mail,
  ClipboardCheck,
  Globe,
  Layers,
  Box,
  Shield,
  Briefcase,
  Server,
  FileCheck,
  MessageSquare,
  Users,
  Search,
  Bell,
  Settings,
  Clock,
} from 'lucide-react';
import type { PresentationEntry } from '../registry';

const Slide1 = (
  <div key="s1" className="w-full h-[720px] relative overflow-hidden" style={{ backgroundColor: '#000814' }}>
    {/* 背景：都市景色写真 */}
    <img
      src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2044&auto=format&fit=crop"
      alt="City Background"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: 'brightness(1.1) contrast(1.05) saturate(1.2) hue-rotate(-5deg)' }}
    />
    {/* グラデーションオーバーレイ（左下を濃くして文字を読みやすく） */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,8,20,0.82) 0%, rgba(0,8,20,0.55) 50%, rgba(0,8,20,0.2) 100%)' }} />
    {/* 背景に薄くDIGITAL CREATIVE FIRM（装飾） */}
    <div className="absolute bottom-0 right-0 leading-none select-none pointer-events-none" style={{
      fontSize: '140px', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.04)', lineHeight: 0.85
    }}>
      DIGITAL<br />CREATIVE<br />FIRM
    </div>
    {/* コンテンツ */}
    <div className="absolute inset-0 flex flex-col justify-between z-10" style={{ padding: '56px 72px 48px' }}>
      {/* TOP: 右端に縦書きスローガン */}
      <div className="flex justify-between items-start">
        <div style={{ color: 'white', fontSize: '18px', fontWeight: 900, letterSpacing: '0.08em' }}>
          Meece株式会社
        </div>
        <div style={{
          color: 'white',
          writingMode: 'vertical-rl',
          fontSize: '12px',
          letterSpacing: '0.55em',
          fontWeight: 600,
          textShadow: '0 0 20px rgba(0,251,255,0.5)',
          lineHeight: 1.8,
          opacity: 0.85
        }}>
          時代をまたぎ、新しいデジタルをデザインする。
        </div>
      </div>
      {/* MIDDLE: 資料タイトル */}
      <div>
        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', letterSpacing: '0.45em', fontWeight: 700, marginBottom: '20px' }}>
          COMPANY INTRODUCTION
        </div>
        <h1 style={{ color: 'white', fontSize: '68px', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
          会社紹介
        </h1>
        <div style={{ width: '48px', height: '3px', background: 'linear-gradient(to right, #00fbff, #9D72FF)', borderRadius: '2px', marginBottom: '24px' }} />
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 500, letterSpacing: '0.05em', lineHeight: 1.7, margin: 0 }}>
          デジタルクリエイティブファームが描く、<br />ビジネスの新しい物語。
        </p>
      </div>
      {/* BOTTOM: 年度・バージョン情報 */}
      <div className="flex items-center justify-between border-t border-white/15 pt-5">
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', letterSpacing: '0.3em', fontWeight: 600 }}>
          INNOVATION GUIDE 2026
        </div>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 500 }}>
          2026年度版
        </div>
      </div>
    </div>
  </div>
);

const Slide2 = (
  <div key="s2" className="w-full h-[720px] bg-white p-10 relative overflow-hidden">
    <div className="absolute top-16 right-16 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl" />
    <div className="absolute bottom-16 left-16 w-48 h-48 bg-violet-400/10 rounded-full blur-3xl" />

    <div className="relative z-10 h-full flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-1 bg-cyan-500" />
          <span className="text-cyan-600 font-bold tracking-wider text-sm">Corporate Profile</span>
        </div>
        <h2 className="text-4xl font-black text-slate-800">会社概要</h2>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { icon: Award, label: '商号', value: 'Meece株式会社' },
          { icon: User, label: '代表取締役', value: '溝口 雅登' },
          { icon: Calendar, label: '設立', value: '2022年 8月 22日' },
          { icon: CircleDollarSign, label: '資本金', value: '1,000,000円' },
          { icon: Landmark, label: '取引銀行', value: 'みずほ銀行' },
        ].map((item, idx) => (
          <div key={idx} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-4 hover:shadow-xl transition-all duration-300">
            <item.icon className="w-6 h-6 text-cyan-500 mb-3" />
            <div className="text-xs text-slate-500 mb-1">{item.label}</div>
            <div className="text-sm font-bold text-slate-800 leading-tight">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 flex-1">
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 rounded-2xl p-5 border-l-4 border-cyan-500">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-cyan-500" />
              <div className="font-bold text-slate-800">所在地</div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              〒100-0005<br />
              東京都千代田区丸の内1-8-3<br />
              丸の内トラストタワー本館 20階
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5 border-l-4 border-violet-500 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="w-5 h-5 text-violet-500" />
              <div className="font-bold text-slate-800">連絡先</div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              TEL: 03-5288-5125<br />
              info@meece.io<br />
              受付: 平日 10:00–19:00
            </p>
          </div>
        </div>

        <div className="col-span-2 bg-slate-50 rounded-2xl p-5 border-l-4 border-pink-500 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-pink-500" />
            <div className="font-bold text-slate-800">事業内容</div>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {[
              { icon: Cpu, title: 'AI受託開発', desc: '独自のAIエンジンを活用したシステム開発・プロトタイピング。アイデアを最速で動くプロダクトへ。', color: 'text-cyan-500' },
              { icon: Zap, title: 'DX推進支援', desc: '業務効率化・デジタル変革を包括的にサポート。現場に根ざしたコンサルティング。', color: 'text-violet-500' },
              { icon: Factory, title: 'SES事業', desc: '製造・教育・医療など多岐にわたるドメインへの技術者派遣・現場支援。', color: 'text-emerald-500' },
              { icon: Rocket, title: 'AI開発ラボ', desc: '独自のAI駆動エンジンで従来比87.5%の工期削減を実現する次世代開発。', color: 'text-pink-500' },
            ].map((biz, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-all duration-300">
                <biz.icon className={`w-5 h-5 ${biz.color} mb-2`} />
                <div className="font-bold text-slate-800 text-sm mb-1">{biz.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{biz.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-xl p-4 text-white text-center">
        <p className="font-bold text-sm tracking-wide">すべてのビジネスに、輝く「物語」の続きを。— Meece株式会社</p>
      </div>
    </div>
  </div>
);

const SlideWhatIsMeece = (
  <div key="s-what" className="w-full h-[720px] bg-white p-10 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-violet-400/10 to-transparent rounded-full blur-3xl" />

    <div className="relative z-10 h-full flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-1 bg-cyan-500" />
          <span className="text-cyan-600 font-bold tracking-wider text-sm">What is Meece?</span>
        </div>
        <h2 className="text-4xl font-black text-slate-800">Meeceとは？</h2>
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col gap-5">
          <div className="bg-cyan-50 border-l-4 border-cyan-500 rounded-2xl p-6 flex-1">
            <div className="text-xs font-bold text-cyan-600 tracking-widest mb-3">MISSION</div>
            <p className="text-2xl font-black text-slate-800 leading-snug mb-4">
              「ITの歯車」として、<br />まだ見ぬ感動の続きを<br />創り出す。
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              お客様が心に描いた「実現したい物語」を、確かな技術力というラスト・ピースで完成に導くプロフェッショナル集団です。
            </p>
          </div>

          <div className="bg-violet-50 border-l-4 border-violet-500 rounded-2xl p-6 flex-1">
            <div className="text-xs font-bold text-violet-600 tracking-widest mb-3">VISION</div>
            <p className="text-2xl font-black text-slate-800 leading-snug mb-4">
              必要なときに、<br />必要な規模で、<br />最適な一手を。
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              特定の技術や手法に固執せず、お客様のビジネスフェーズと課題に真摯に向き合い、その瞬間に最も価値を発揮する解決策をデザインします。
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold text-slate-500 tracking-widest mb-1">社名の由来 — 5つの産業ドメイン</div>
          {[
            { letter: 'M', domain: 'Manufacturing', desc: '製造・ものづくり', color: 'bg-cyan-500', text: 'text-cyan-500' },
            { letter: 'E', domain: 'Education', desc: '教育・学習支援', color: 'bg-violet-500', text: 'text-violet-500' },
            { letter: 'E', domain: 'Entertainment', desc: '娯楽・エンターテインメント', color: 'bg-pink-500', text: 'text-pink-500' },
            { letter: 'C', domain: 'Commerce', desc: '商業・流通', color: 'bg-emerald-500', text: 'text-emerald-500' },
            { letter: 'E', domain: 'Energy & Life', desc: 'エネルギー・生活', color: 'bg-amber-500', text: 'text-amber-500' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0`}>
                {item.letter}
              </div>
              <div>
                <div className={`text-sm font-black ${item.text}`}>{item.domain}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideDCF = (
  <div key="s-dcf" className="w-full h-[720px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex flex-col justify-center">
    {/* 背景装飾 */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

    <div className="relative z-10 px-16 flex flex-col gap-12">
      {/* ラベル */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-px bg-cyan-500" />
        <span className="text-cyan-500 font-bold tracking-[0.3em] text-xs">MEECE POSITIONING</span>
      </div>

      {/* メインタイトル */}
      <div>
        <h2 className="text-7xl font-black text-white leading-none tracking-tight mb-3">
          DIGITAL<br />
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            CREATIVE
          </span><br />
          FIRM
        </h2>
        <p className="text-slate-400 text-lg max-w-xl leading-relaxed mt-6">
          単なる「開発会社」ではない。戦略・テクノロジー・クリエイティブを高度に融合させ、プロダクトが描くべき<span className="text-white font-bold">物語そのもの</span>をデザインする。
        </p>
      </div>

      {/* 3つの柱 */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: '01', title: 'Strategy', sub: '戦略的なビジネス設計', desc: 'ビジネスの成功から逆算した最適なアーキテクチャと戦略を提案。', color: 'border-cyan-500', accent: 'text-cyan-400' },
          { label: '02', title: 'Technology', sub: '最新鋭のテクノロジー実装', desc: 'React / TypeScript / AI まで、モダンで拡張性の高いプロダクトを構築。', color: 'border-violet-500', accent: 'text-violet-400' },
          { label: '03', title: 'Creative', sub: '心を動かすクリエイティブ表現', desc: '機能だけでなく、使う人の心を動かす体験と物語をデザインする。', color: 'border-pink-500', accent: 'text-pink-400' },
        ].map((item) => (
          <div key={item.label} className={`border-t-2 ${item.color} pt-5`}>
            <div className={`text-xs font-bold ${item.accent} tracking-widest mb-2`}>{item.label} — {item.title}</div>
            <div className="text-white font-bold text-sm mb-2">{item.sub}</div>
            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Slide3 = (
  <div key="s3" className="w-full h-[720px] bg-gradient-to-br from-white to-slate-50 p-10 relative overflow-hidden">
    <div className="absolute bottom-6 right-6 opacity-5">
      <Cpu className="w-72 h-72 text-slate-400" />
    </div>

    <div className="relative z-10 h-full flex gap-8">
      <div className="w-2/5 flex flex-col justify-center space-y-5">
        <div className="space-y-1">
          <div className="inline-block px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold">PHASE 01</div>
          <div className="text-xs text-slate-500 font-medium">SES事業</div>
        </div>

        <div className="text-4xl font-black text-slate-500">2022 - 2023</div>

        <h2 className="text-3xl font-black text-slate-800 leading-tight">
          現場の熱量を、<br />ITの歯車に変える。
        </h2>

        <p className="text-slate-600 text-sm leading-relaxed">
          2022年の創業以来、私たちはSES事業を通じて、あらゆる産業の「最前線」に身を置いてきました。
          机上の空論ではなく、現場の痛みを知るからこそ、真に動くシステムが創れると信じています。
        </p>

        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-lg">
          <p className="text-xs text-slate-700 leading-relaxed">
            5つの巨大なドメインでの経験こそが、私たちの知能の礎となっています。
          </p>
        </div>
      </div>

      <div className="w-3/5 grid grid-cols-2 gap-4 content-center">
        {[
          { char: 'M', name: 'Manufacturing', desc: '技術継承や生産ラインを効率化。工場の「止まらない物語」をデジタルで支援。', icon: Factory, color: 'cyan' },
          { char: 'E', name: 'Education', desc: '知識共有を民主化。誰もが最高の教育を享受できる環境をITで構築。', icon: GraduationCap, color: 'blue' },
          { char: 'E', name: 'Entertainment', desc: '感動を実装。最新技術で人々の心を動かす、新しい「体験」を創造。', icon: Sparkles, color: 'violet' },
          { char: 'C', name: 'Commerce', desc: '複雑な物流やトレンドを最適化。店舗とユーザーを繋ぐ流通を実装。', icon: ShoppingCart, color: 'pink' },
          { char: 'E', name: 'Everyday life', desc: '医療・行政・インフラ。日常の当たり前を、より便利で安心なものへ刷新。', icon: Heart, color: 'emerald' },
        ].map((domain, idx) => {
          const borderColor =
            domain.color === 'cyan' ? 'border-cyan-500' :
            domain.color === 'blue' ? 'border-blue-500' :
            domain.color === 'violet' ? 'border-violet-500' :
            domain.color === 'pink' ? 'border-pink-500' : 'border-emerald-500';
          const textColor =
            domain.color === 'cyan' ? 'text-cyan-500' :
            domain.color === 'blue' ? 'text-blue-500' :
            domain.color === 'violet' ? 'text-violet-500' :
            domain.color === 'pink' ? 'text-pink-500' : 'text-emerald-500';
          const textOpacity =
            domain.color === 'cyan' ? 'text-cyan-500/10' :
            domain.color === 'blue' ? 'text-blue-500/10' :
            domain.color === 'violet' ? 'text-violet-500/10' :
            domain.color === 'pink' ? 'text-pink-500/10' : 'text-emerald-500/10';

          return (
            <div key={idx} className={`bg-white border-t-4 ${borderColor} rounded-xl p-5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
              <div className={`absolute top-1 right-1 text-7xl font-black ${textOpacity}`}>{domain.char}</div>
              <domain.icon className={`w-7 h-7 ${textColor} mb-3`} />
              <h3 className="text-base font-bold text-slate-800 mb-2">{domain.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{domain.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

/* ===== CASE STUDY INTRO ===== */
const SlideCaseIntro = (
  <div key="s-case-intro" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf2ff 50%, #fff7ed 100%)' }}>
    {/* Gradient orbs */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-60" style={{ background: 'radial-gradient(circle, #c084fc 0%, #818cf8 50%, transparent 70%)' }} />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-60" style={{ background: 'radial-gradient(circle, #fb923c 0%, #f472b6 50%, transparent 70%)' }} />
    <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(circle, #34d399 0%, #06b6d4 50%, transparent 70%)' }} />
    {/* Dot grid */}
    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    {/* Decorative rings */}
    <div className="absolute top-14 left-14 w-20 h-20 rounded-full border-4 border-violet-300/50" />
    <div className="absolute top-24 left-24 w-10 h-10 rounded-full border-4 border-pink-300/50" />
    <div className="absolute bottom-14 right-14 w-16 h-16 rounded-full border-4 border-cyan-300/50" />
    <div className="absolute bottom-28 right-28 w-8 h-8 rounded-full bg-orange-300/40" />
    <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-pink-300/40" />
    <div className="absolute bottom-1/3 left-20 w-8 h-8 rounded-full bg-violet-300/40" />
    {/* Content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <div className="text-center max-w-2xl px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 shadow-lg" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)' }}>
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-black tracking-widest">CASE STUDY</span>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {/* Main title */}
        <h1 className="font-black mb-6 leading-none" style={{ fontSize: '96px', background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          事例紹介
        </h1>
        {/* Separator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to right, transparent, #a855f7)' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }} />
          <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to left, transparent, #a855f7)' }} />
        </div>
        <p className="text-slate-500 text-lg mb-10 font-medium">Meeceが手がけた実績をご紹介します</p>
        {/* Category cards */}
        <div className="flex items-center justify-center gap-6">
          <div className="px-8 py-5 rounded-3xl shadow-xl" style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '2px solid #bfdbfe' }}>
            <div className="text-4xl font-black text-blue-600 mb-1">4</div>
            <div className="text-sm font-black text-blue-500 tracking-wide">SES 事例</div>
          </div>
          <div className="w-px h-16 bg-slate-200" />
          <div className="px-8 py-5 rounded-3xl shadow-xl" style={{ background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '2px solid #ddd6fe' }}>
            <div className="text-4xl font-black text-violet-600 mb-1">3</div>
            <div className="text-sm font-black text-violet-500 tracking-wide">AI LAB 事例</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideSESCase = (
  <div key="s-ses-case" className="w-full h-[720px] relative overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" style={{ clipPath: 'polygon(0 0, 42% 0, 42% 100%, 0 100%)' }} />
    <div className="absolute top-0 left-0 w-[42%] h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-64 h-64 border border-cyan-500/20 rounded-full" />
      <div className="absolute top-1/3 -left-10 w-40 h-40 border border-violet-500/10 rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
    </div>

    <div className="absolute inset-0 flex h-full">
      {/* Left panel */}
      <div className="w-[42%] flex flex-col justify-between p-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1.5 bg-cyan-500/15 text-cyan-400 text-xs font-black rounded-full border border-cyan-500/30 tracking-wider">SES CASE 01</span>
            <span className="px-3 py-1.5 bg-red-500/15 text-red-400 text-xs font-black rounded-full border border-red-500/30 flex items-center gap-1">
              <Shield className="w-3 h-3" />セキュリティ重視
            </span>
          </div>

          <h2 className="text-2xl font-black text-white leading-tight mb-4">
            マイナンバーカード<br />管理システム開発
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            プロジェクトマネジメントおよびシステム開発を担当。入札案件にゼロから対応し、ベンチャー企業ながら大規模入札案件に参画できる希少な実績を保有しています。
          </p>

          <div className="space-y-1 mb-2">
            <div className="text-xs font-black text-slate-500 tracking-widest mb-3">プロジェクト概要</div>
            {[
              { icon: ClipboardCheck, text: '入札対応から一貫したプロジェクト管理' },
              { icon: Shield, text: '高度なセキュリティ機能の実装' },
              { icon: Award, text: 'ベンチャー企業による大規模入札実績' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 hover:bg-white/8 rounded-xl p-3.5 border border-white/10 transition-colors">
                <item.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-200 text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="text-xs text-slate-500 font-medium">行政・公共領域への実績</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-300">公共入札 参画実績あり</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white p-10 flex flex-col gap-5 relative">
        <div className="absolute top-6 right-8 opacity-5">
          <Server className="w-40 h-40 text-slate-400" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-lg flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-black text-slate-800">マイナンバーカード管理システム</h3>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 flex-1 relative z-10">
          <div className="text-xs font-black text-slate-500 tracking-widest mb-4">システム特徴</div>
          <div className="space-y-3">
            {[
              { text: '高度なセキュリティ基準に準拠した個人情報保護機能', icon: Shield },
              { text: 'クラウドベースの管理インフラストラクチャ', icon: Server },
              { text: 'カード発行・更新・管理のワンストップシステム', icon: Cpu },
              { text: '行政システムとの連携インターフェース', icon: Briefcase },
              { text: '24時間365日の監視体制とバックアップ機能', icon: Zap },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-cyan-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                  <feature.icon className="w-3 h-3 text-cyan-600" />
                </div>
                <span className="text-slate-700 text-sm leading-relaxed">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-xs font-black text-slate-500 tracking-widest mb-3">Meeceの役割</div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'プロジェクトマネジメント', icon: ClipboardCheck, bg: 'bg-cyan-50 border-cyan-200', text: 'text-cyan-700', icon_color: 'text-cyan-500' },
              { label: 'システム設計・開発', icon: Cpu, bg: 'bg-violet-50 border-violet-200', text: 'text-violet-700', icon_color: 'text-violet-500' },
              { label: '入札提案書作成支援', icon: FileCheck, bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', icon_color: 'text-emerald-500' },
              { label: 'セキュリティ監査対応', icon: Shield, bg: 'bg-pink-50 border-pink-200', text: 'text-pink-700', icon_color: 'text-pink-500' },
            ].map((role, idx) => (
              <div key={idx} className={`${role.bg} border rounded-xl px-4 py-3 flex items-center gap-2.5`}>
                <role.icon className={`w-4 h-4 ${role.icon_color} flex-shrink-0`} />
                <span className={`${role.text} text-sm font-bold`}>{role.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlidePetSalon = (
  <div key="s-petsalon" className="w-full h-[720px] relative overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" style={{ clipPath: 'polygon(0 0, 42% 0, 42% 100%, 0 100%)' }} />
    <div className="absolute top-0 left-0 w-[42%] h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-64 h-64 border border-cyan-500/20 rounded-full" />
      <div className="absolute top-1/3 -left-10 w-40 h-40 border border-violet-500/10 rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
    </div>

    <div className="absolute inset-0 flex h-full">
      {/* Left panel */}
      <div className="w-[42%] flex flex-col justify-between p-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1.5 bg-cyan-500/15 text-cyan-400 text-xs font-black rounded-full border border-cyan-500/30 tracking-wider">SES CASE 02</span>
            <span className="px-3 py-1.5 bg-green-500/15 text-green-400 text-xs font-black rounded-full border border-green-500/30 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />LINE連携
            </span>
          </div>

          <h2 className="text-2xl font-black text-white leading-tight mb-4">
            ペットサロン予約管理<br />・電子カルテシステム
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            ペットサロン向け予約管理および電子カルテシステムを開発。ホテル・鉄道を手掛ける企業の新業界進出を技術でサポートしています。
          </p>

          <div className="space-y-1 mb-2">
            <div className="text-xs font-black text-slate-500 tracking-widest mb-3">プロジェクト概要</div>
            {[
              { icon: ClipboardCheck, text: 'BtoB・BtoC一括対応の予約管理システム' },
              { icon: MessageSquare, text: 'LINE連携による顧客通知・予約確認機能' },
              { icon: FileCheck, text: 'ペット情報・施術履歴の電子カルテ管理' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 hover:bg-white/8 rounded-xl p-3.5 border border-white/10 transition-colors">
                <item.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-200 text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="text-xs text-slate-500 font-medium">新業界進出・ホテル／鉄道業からペット業界へ</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-300">BtoB・BtoC 両対応システム 稼働中</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white p-10 flex flex-col gap-4 relative">
        {/* SVG System Diagram */}
        <div className="flex-[0.52] bg-white/80 backdrop-blur rounded-2xl border border-slate-100 shadow-sm p-3 overflow-hidden">
          <svg viewBox="0 0 540 185" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* ===== STORE (left) ===== */}
            {/* Building body */}
            <rect x="18" y="68" width="74" height="68" rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
            {/* Roof */}
            <polygon points="10,68 55,36 100,68" fill="#F59E0B"/>
            {/* Door */}
            <rect x="43" y="98" width="25" height="38" rx="3" fill="#B45309"/>
            {/* Windows */}
            <rect x="22" y="76" width="17" height="16" rx="2" fill="white" stroke="#FCD34D" strokeWidth="1"/>
            <rect x="71" y="76" width="17" height="16" rx="2" fill="white" stroke="#FCD34D" strokeWidth="1"/>
            {/* Paw sign */}
            <circle cx="55" cy="57" r="9" fill="white" stroke="#F59E0B" strokeWidth="1"/>
            <text x="55" y="62" textAnchor="middle" fontSize="10" fill="#F59E0B">🐾</text>
            {/* 予約管理 label */}
            <rect x="12" y="10" width="86" height="20" rx="10" fill="white" stroke="#93C5FD" strokeWidth="1.5"/>
            <text x="55" y="24" textAnchor="middle" fontSize="9" fill="#3B82F6" fontWeight="700">予約管理</text>
            {/* Arrow right */}
            <path d="M 100 100 L 150 100" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,4" markerEnd="url(#arrowGray)"/>

            {/* ===== PHONE (center) ===== */}
            <rect x="155" y="22" width="88" height="142" rx="13" fill="#1E293B"/>
            <rect x="161" y="32" width="76" height="122" rx="8" fill="white"/>
            {/* App header */}
            <rect x="161" y="32" width="76" height="26" rx="8" fill="#0EA5E9"/>
            <text x="199" y="43" textAnchor="middle" fontSize="7" fill="white" fontWeight="800">🐾 PET SALON</text>
            {/* Tabs */}
            <rect x="164" y="59" width="32" height="9" rx="4" fill="#0EA5E9"/>
            <text x="180" y="66" textAnchor="middle" fontSize="5.5" fill="white" fontWeight="700">Reservations</text>
            <rect x="200" y="59" width="32" height="9" rx="4" fill="#F1F5F9"/>
            <text x="216" y="66" textAnchor="middle" fontSize="5.5" fill="#9CA3AF" fontWeight="700">Records</text>
            {/* Appointment rows */}
            <rect x="164" y="73" width="70" height="16" rx="4" fill="#F8FAFC"/>
            <circle cx="172" cy="81" r="5" fill="#FBBF24"/>
            <text x="179" y="85" fontSize="7.5" fill="#374151" fontWeight="700">🐕  10:00</text>
            <rect x="228" y="75" width="12" height="12" rx="3" fill="#E0F2FE"/>
            <text x="234" y="84" textAnchor="middle" fontSize="7" fill="#0EA5E9">✎</text>
            <rect x="164" y="93" width="70" height="16" rx="4" fill="#F8FAFC"/>
            <circle cx="172" cy="101" r="5" fill="#A78BFA"/>
            <text x="179" y="105" fontSize="7.5" fill="#374151" fontWeight="700">🐈  14:00</text>
            <rect x="228" y="95" width="12" height="12" rx="3" fill="#E0F2FE"/>
            <text x="234" y="104" textAnchor="middle" fontSize="7" fill="#0EA5E9">✎</text>
            {/* Divider + note lines */}
            <line x1="164" y1="116" x2="234" y2="116" stroke="#E2E8F0" strokeWidth="1"/>
            <rect x="164" y="122" width="70" height="4" rx="2" fill="#E2E8F0"/>
            <rect x="164" y="130" width="52" height="4" rx="2" fill="#E2E8F0"/>
            <rect x="164" y="138" width="60" height="4" rx="2" fill="#E2E8F0"/>
            {/* Home bar */}
            <rect x="186" y="149" width="26" height="2.5" rx="1.5" fill="#94A3B8"/>

            {/* ===== LINE area (upper right) ===== */}
            <rect x="306" y="8" width="90" height="64" rx="12" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
            <text x="351" y="28" textAnchor="middle" fontSize="10" fill="#15803D" fontWeight="800">LINE連携能</text>
            {/* Two person silhouettes */}
            <circle cx="335" cy="44" r="9" fill="#BBF7D0"/>
            <circle cx="335" cy="39" r="4" fill="#16A34A"/>
            <path d="M 327 52 Q 335 47 343 52" fill="#BBF7D0" stroke="#16A34A" strokeWidth="0.8"/>
            <circle cx="357" cy="44" r="9" fill="#BBF7D0"/>
            <circle cx="357" cy="39" r="4" fill="#16A34A"/>
            <path d="M 349 52 Q 357 47 365 52" fill="#BBF7D0" stroke="#16A34A" strokeWidth="0.8"/>
            {/* Chat bubble */}
            <rect x="370" y="20" width="20" height="14" rx="4" fill="#16A34A" opacity="0.5"/>
            <polygon points="370,34 374,40 380,34" fill="#16A34A" opacity="0.5"/>
            {/* Arrow from phone to LINE */}
            <path d="M 243 65 Q 270 40 304 38" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,4" markerEnd="url(#arrowGray)" fill="none"/>

            {/* ===== Pet owner + pets (right) ===== */}
            {/* Person */}
            <circle cx="462" cy="75" r="14" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="1.5"/>
            <circle cx="462" cy="67" r="6" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1"/>
            <path d="M 450 84 Q 462 78 474 84" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="1"/>
            {/* Dog left */}
            <ellipse cx="432" cy="115" rx="16" ry="11" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.2"/>
            <circle cx="447" cy="108" r="8" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.2"/>
            <ellipse cx="424" cy="104" rx="5" ry="8" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1"/>
            <circle cx="444" cy="103" r="2" fill="#374151"/>
            <path d="M 442 107 Q 447 105 452 107" stroke="#374151" strokeWidth="0.8" fill="none"/>
            {/* Cat right */}
            <ellipse cx="490" cy="115" rx="14" ry="10" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.2"/>
            <circle cx="503" cy="107" r="8" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.2"/>
            <polygon points="497,103 502,95 507,103" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1"/>
            <polygon points="498,103 502,97 506,103" fill="#FECACA"/>
            <circle cx="500" cy="103" r="2" fill="#374151"/>
            {/* 電子カルテ作成 label */}
            <rect x="420" y="132" width="104" height="20" rx="10" fill="white" stroke="#93C5FD" strokeWidth="1.5"/>
            <text x="472" y="146" textAnchor="middle" fontSize="8.5" fill="#3B82F6" fontWeight="700">電子カルテ作成</text>
            {/* Arrow from pet owner area to phone */}
            <path d="M 418 100 L 250 100" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,4" markerEnd="url(#arrowGrayLeft)" fill="none"/>

            {/* Arrow marker defs */}
            <defs>
              <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#CBD5E1"/>
              </marker>
              <marker id="arrowGrayLeft" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
                <path d="M8,0 L8,6 L0,3 z" fill="#CBD5E1"/>
              </marker>
            </defs>
          </svg>
        </div>

        {/* Feature cards 2x2 */}
        <div className="flex-[0.48] grid grid-cols-2 gap-3">
          {[
            { icon: MessageSquare, title: 'LINE連携サービス', desc: '予約確認・変更、ペット情報の確認、サービス案内などをLINEで簡単に行えるシステムを構築。顧客満足度と利便性を大幅に向上。', color: 'text-green-500', bg: 'bg-green-50' },
            { icon: Users, title: 'BtoB・BtoC両対応', desc: 'サロン側（BtoB）と飼い主側（BtoC）の両方にサービス提供が可能な珍しい一括受託システムを実現。業務効率とUXを同時に向上。', color: 'text-cyan-500', bg: 'bg-cyan-50' },
            { icon: FileCheck, title: '電子カルテシステム', desc: 'ペットの健康データや治療履歴を一元管理できる電子カルテシステムを開発。健康管理と顧客サービスの品質向上を実現。', color: 'text-violet-500', bg: 'bg-violet-50' },
            { icon: TrendingUp, title: '新業界進出支援', desc: '新規事業展開を、IT技術で全面的にサポート。ホテル・鉄道業界からペット業界への進出で新たな収益源の創出に貢献。', color: 'text-pink-500', bg: 'bg-pink-50' },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-100 hover:shadow-md transition-all duration-300 flex gap-3">
              <div className={`${card.bg} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm mb-1">{card.title}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlidePurchaseCase = (
  <div key="s-purchase" className="w-full h-[720px] relative overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" style={{ clipPath: 'polygon(0 0, 42% 0, 42% 100%, 0 100%)' }} />
    <div className="absolute top-0 left-0 w-[42%] h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-64 h-64 border border-cyan-500/20 rounded-full" />
      <div className="absolute top-1/3 -left-10 w-40 h-40 border border-violet-500/10 rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
    </div>

    <div className="absolute inset-0 flex h-full">
      {/* Left panel */}
      <div className="w-[42%] flex flex-col justify-between p-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1.5 bg-cyan-500/15 text-cyan-400 text-xs font-black rounded-full border border-cyan-500/30 tracking-wider">SES CASE 03</span>
            <span className="px-3 py-1.5 bg-violet-500/15 text-violet-400 text-xs font-black rounded-full border border-violet-500/30 flex items-center gap-1">
              <Briefcase className="w-3 h-3" />プロジェクト統括
            </span>
          </div>

          <h2 className="text-2xl font-black text-white leading-tight mb-4">
            購買管理システム<br />開発・PM統括
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            購買管理システム開発の全体コンサルとプロジェクトマネジメントを受託。開発は他ベンダーが担当しますが、上流工程から全体をコントロールする重要な役割を担っています。
          </p>

          <div className="space-y-1 mb-2">
            <div className="text-xs font-black text-slate-500 tracking-widest mb-3">プロジェクト概要</div>
            {[
              { icon: ClipboardCheck, text: '複数ベンダーを束ねるプロジェクト全体統括' },
              { icon: Briefcase, text: '購買業務の効率化・最適化コンサルティング' },
              { icon: Layers, text: '要件定義・基本設計など上流工程の専門性発揮' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 hover:bg-white/8 rounded-xl p-3.5 border border-white/10 transition-colors">
                <item.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-200 text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="text-xs text-slate-500 font-medium">大規模購買管理プロジェクト参画実績</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-300">マルチベンダー PM 実績あり</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white p-8 flex flex-col gap-4 relative">
        {/* System overview */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <div className="font-black text-slate-800 text-sm mb-2">システム概要</div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            企業全体の購買業務を一元管理するシステムの開発プロジェクト。サプライヤー管理、発注プロセス、在庫管理、支払い処理などを統合した包括的な購買管理プラットフォームを構築。
          </p>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: 'コスト削減', icon: TrendingDown, cls: 'bg-amber-50 text-amber-700 border-amber-200' },
              { label: 'データ一元管理', icon: Server, cls: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
              { label: 'リスク軽減', icon: Shield, cls: 'bg-violet-50 text-violet-700 border-violet-200' },
            ].map((tag, i) => (
              <span key={i} className={`${tag.cls} border rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1`}>
                <tag.icon className="w-3 h-3" />{tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture diagram */}
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-4 overflow-hidden">
          <svg viewBox="0 0 460 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Center: 購買管理システム */}
            <rect x="160" y="65" width="140" height="70" rx="8" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5"/>
            <text x="230" y="96" textAnchor="middle" fontSize="11" fill="white" fontWeight="800">購買管理</text>
            <text x="230" y="112" textAnchor="middle" fontSize="11" fill="white" fontWeight="800">システム</text>

            {/* Left top: プロジェクト管理 */}
            <rect x="14" y="14" width="110" height="42" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="1"/>
            <text x="69" y="33" textAnchor="middle" fontSize="8.5" fill="#CBD5E1" fontWeight="700">プロジェクト</text>
            <text x="69" y="46" textAnchor="middle" fontSize="8.5" fill="#CBD5E1" fontWeight="700">管理コンソール</text>
            <path d="M124 35 L160 85" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr)"/>

            {/* Left bottom: コンサルティング */}
            <rect x="14" y="144" width="110" height="42" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="1"/>
            <text x="69" y="163" textAnchor="middle" fontSize="8.5" fill="#CBD5E1" fontWeight="700">コンサルティング</text>
            <text x="69" y="176" textAnchor="middle" fontSize="8.5" fill="#CBD5E1" fontWeight="700">業務</text>
            <path d="M124 165 L160 115" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr)"/>

            {/* Right top: システム開発統括 */}
            <rect x="336" y="14" width="110" height="42" rx="6" fill="#164E63" stroke="#06B6D4" strokeWidth="1.5"/>
            <text x="391" y="33" textAnchor="middle" fontSize="8.5" fill="#67E8F9" fontWeight="700">システム開発の</text>
            <text x="391" y="46" textAnchor="middle" fontSize="8.5" fill="#67E8F9" fontWeight="700">全体コントロール</text>
            <path d="M336 35 L300 85" stroke="#06B6D4" strokeWidth="1.5" markerEnd="url(#arrC)"/>

            {/* Right bottom: サプライチェーン */}
            <rect x="336" y="144" width="110" height="42" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="1"/>
            <text x="391" y="163" textAnchor="middle" fontSize="8.5" fill="#CBD5E1" fontWeight="700">サプライチェーン</text>
            <text x="391" y="176" textAnchor="middle" fontSize="8.5" fill="#CBD5E1" fontWeight="700">管理</text>
            <path d="M336 165 L300 115" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr)"/>

            {/* Top arrow into center */}
            <path d="M230 14 L230 65" stroke="#06B6D4" strokeWidth="2" markerEnd="url(#arrC)"/>

            <defs>
              <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#94A3B8"/>
              </marker>
              <marker id="arrC" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#06B6D4"/>
              </marker>
            </defs>
          </svg>
        </div>

        {/* Results */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
          <div className="font-black text-slate-800 text-sm mb-3">プロジェクト成果</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {[
              { value: '30%', label: '購買プロセスの効率化', color: 'text-cyan-600' },
              { value: '25%', label: 'コスト削減を実現', color: 'text-violet-600' },
              { value: '100%', label: '可視化率向上', color: 'text-emerald-600' },
              { value: '40%', label: 'リードタイム短縮', color: 'text-pink-600' },
            ].map((r, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className={`text-2xl font-black ${r.color}`}>{r.value}</span>
                <span className="text-xs text-slate-500">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideHealthCase = (
  <div key="s-health" className="w-full h-[720px] relative overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" style={{ clipPath: 'polygon(0 0, 42% 0, 42% 100%, 0 100%)' }} />
    <div className="absolute top-0 left-0 w-[42%] h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-64 h-64 border border-cyan-500/20 rounded-full" />
      <div className="absolute top-1/3 -left-10 w-40 h-40 border border-violet-500/10 rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
    </div>

    <div className="absolute inset-0 flex h-full">
      {/* Left panel */}
      <div className="w-[42%] flex flex-col justify-between p-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1.5 bg-cyan-500/15 text-cyan-400 text-xs font-black rounded-full border border-cyan-500/30 tracking-wider">SES CASE 04</span>
            <span className="px-3 py-1.5 bg-emerald-500/15 text-emerald-400 text-xs font-black rounded-full border border-emerald-500/30 flex items-center gap-1">
              <Heart className="w-3 h-3" />医療DX
            </span>
          </div>

          <h2 className="text-2xl font-black text-white leading-tight mb-4">
            健康診断システム<br />開発・PM統括
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            大規模導入を見据えた健康診断システムの企画・コンサル・プロジェクトマネジメントを担当。医療データの安全管理、コンサルティング機能、プロジェクト推進の仕組みを設計・支援し、最新のDX医療分野ニーズに対応。
          </p>

          <div className="space-y-1 mb-2">
            <div className="text-xs font-black text-slate-500 tracking-widest mb-3">プロジェクト概要</div>
            {[
              { icon: Server, text: '数千人規模の医療データを扱う拡張性設計' },
              { icon: Shield, text: 'HIPAA準拠のセキュリティ・匿名化処理' },
              { icon: ClipboardCheck, text: 'ステークホルダー間調整・PM統括' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 hover:bg-white/8 rounded-xl p-3.5 border border-white/10 transition-colors">
                <item.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-200 text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="text-xs text-slate-500 font-medium mb-3">プロジェクト実績</div>
          <div className="flex gap-6">
            {[
              { value: '2,000+', label: '利用ユーザー', color: 'text-cyan-400' },
              { value: '30%', label: '業務効率化', color: 'text-emerald-400' },
              { value: '100%', label: 'データ安全性', color: 'text-violet-400' },
            ].map((m, i) => (
              <div key={i}>
                <div className={`text-xl font-black ${m.color}`}>{m.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white p-8 flex flex-col gap-3 relative">
        {/* System diagram */}
        <div className="flex-[0.58] bg-slate-50 rounded-2xl border border-slate-200 p-4 overflow-hidden">
          <svg viewBox="0 0 460 210" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* 医療データ管理 (left) */}
            <rect x="8" y="15" width="118" height="130" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1.5"/>
            {/* Heart icon (top) */}
            <circle cx="42" cy="42" r="14" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1"/>
            <path d="M36 42 C36 38 39 36 42 38 C45 36 48 38 48 42 C48 46 42 51 42 51 C42 51 36 46 36 42Z" fill="#EF4444"/>
            {/* Shield icon */}
            <circle cx="77" cy="42" r="14" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="1"/>
            <path d="M83 37 L83 42 C83 47 77 50 77 50 C77 50 71 47 71 42 L71 37 L77 34 Z" fill="#10B981"/>
            <text x="77" y="49" textAnchor="middle" fontSize="8" fill="white" fontWeight="800">+</text>
            {/* DB cylinder */}
            <ellipse cx="67" cy="75" rx="26" ry="9" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.2"/>
            <rect x="41" y="75" width="52" height="28" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.2"/>
            <ellipse cx="67" cy="103" rx="26" ry="9" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.2"/>
            <text x="67" y="128" textAnchor="middle" fontSize="10" fill="#1E40AF" fontWeight="700">医療データ管理</text>

            {/* Arrow left→center */}
            <path d="M126 80 L170 80" stroke="#CBD5E1" strokeWidth="2" markerEnd="url(#ha2)" fill="none"/>

            {/* 健康診断システム (center) */}
            <rect x="170" y="38" width="120" height="88" rx="12" fill="#0F172A" stroke="#06B6D4" strokeWidth="2"/>
            {/* Monitor */}
            <rect x="188" y="50" width="84" height="54" rx="5" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.2"/>
            <rect x="193" y="55" width="74" height="38" rx="3" fill="#0EA5E9" opacity="0.25"/>
            {/* Screen glow lines */}
            <rect x="198" y="62" width="50" height="3" rx="1.5" fill="#38BDF8" opacity="0.6"/>
            <rect x="198" y="70" width="38" height="3" rx="1.5" fill="#38BDF8" opacity="0.4"/>
            <rect x="198" y="78" width="44" height="3" rx="1.5" fill="#38BDF8" opacity="0.4"/>
            {/* Stand */}
            <rect x="222" y="104" width="16" height="6" rx="2" fill="#334155"/>
            <rect x="214" y="110" width="32" height="4" rx="2" fill="#334155"/>
            <text x="230" y="138" textAnchor="middle" fontSize="9.5" fill="white" fontWeight="800">健康診断システム</text>

            {/* Arrow down from center */}
            <path d="M230 126 L230 158" stroke="#CBD5E1" strokeWidth="2" markerEnd="url(#ha2)" fill="none"/>

            {/* Person figure (bottom center) */}
            <circle cx="230" cy="175" r="14" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="1.2"/>
            <circle cx="230" cy="169" r="6" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1"/>
            <path d="M218 182 Q230 177 242 182" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="1"/>

            {/* Arrow center→right */}
            <path d="M290 80 L334 80" stroke="#CBD5E1" strokeWidth="2" markerEnd="url(#ha2)" fill="none"/>

            {/* コンサルティング機能 (right) */}
            <rect x="334" y="15" width="118" height="130" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1.5"/>
            {/* Person icon */}
            <circle cx="375" cy="48" r="16" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1"/>
            <circle cx="375" cy="43" r="7" fill="#93C5FD" stroke="#3B82F6" strokeWidth="0.8"/>
            <path d="M362 60 Q375 55 388 60" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1"/>
            {/* Clock */}
            <circle cx="410" cy="38" r="10" fill="white" stroke="#94A3B8" strokeWidth="1.2"/>
            <path d="M410 32 L410 38 L414 41" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Chat bubble */}
            <rect x="382" y="72" width="34" height="22" rx="6" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1.2"/>
            <polygon points="386,94 391,102 397,94" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="0.8"/>
            <text x="399" y="84" textAnchor="middle" fontSize="7.5" fill="#0369A1" fontWeight="700">Chat</text>
            <text x="393" y="128" textAnchor="middle" fontSize="10" fill="#1E40AF" fontWeight="700">コンサルティング</text>
            <text x="393" y="141" textAnchor="middle" fontSize="10" fill="#1E40AF" fontWeight="700">機能</text>

            <defs>
              <marker id="ha2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#CBD5E1"/>
              </marker>
            </defs>
          </svg>
        </div>

        {/* Feature cards */}
        <div className="flex gap-3">
          {[
            { icon: Server, title: '大規模データ管理', desc: '全社規模の導入に向けた拡張性の高いシステム設計。数千人規模の健康データを安全かつ効率的に管理できるアーキテクチャを実現。', bg: 'bg-cyan-50', iconColor: 'text-cyan-500' },
            { icon: Shield, title: '医療データ保護', desc: '個人医療情報の高度なセキュリティ対策と匿名化処理を実装。HIPAA準拠のデータ管理とアクセス制御システムで安全性を確保。', bg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
            { icon: Users, title: 'コンサルティング主導', desc: 'プロジェクト全体のコンサルティングと進行管理を担当し、ステークホルダー間の調整を実現。', bg: 'bg-violet-50', iconColor: 'text-violet-500' },
          ].map((card, i) => (
            <div key={i} className="flex-1 bg-white rounded-xl p-4 border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className={`w-8 h-8 ${card.bg} rounded-lg flex items-center justify-center mb-3`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
              <div className="font-bold text-slate-800 text-sm mb-2">{card.title}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Project highlight */}
        <div className="bg-white rounded-2xl border border-cyan-200 p-5 flex items-start gap-3">
          <div className="w-7 h-7 bg-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 text-cyan-500" />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-sm mb-1">プロジェクトハイライト</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              企画段階から参画し、健康診断データと業務効率化を両立させるシステムをゼロから設計。要件を満たす架け橋としてプロジェクトをコントロールし、スムーズなプロジェクト進行を実現。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ===== AI LAB CASE 01: AI MD System ===== */
const SlideAIMD = (
  <div key="s-aimd" className="w-full h-[720px] relative overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" style={{ clipPath: 'polygon(0 0, 42% 0, 42% 100%, 0 100%)' }} />
    <div className="absolute top-0 left-0 w-[42%] h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-64 h-64 border border-cyan-500/20 rounded-full" />
      <div className="absolute top-1/3 -left-10 w-40 h-40 border border-violet-500/10 rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
    </div>
    <div className="absolute inset-0 flex h-full">
      {/* Left panel */}
      <div className="w-[42%] flex flex-col justify-between p-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1.5 bg-cyan-500/15 text-cyan-400 text-xs font-black rounded-full border border-cyan-500/30 tracking-wider">AI LAB CASE 01</span>
            <span className="px-3 py-1.5 bg-amber-500/15 text-amber-400 text-xs font-black rounded-full border border-amber-500/30 flex items-center gap-1">
              <ShoppingCart className="w-3 h-3" />EC × AI
            </span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight mb-4">
            AI マーチャンダイジング<br />管理システム
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            楽天・Amazon・Yahoo・自社ECの商品・在庫・価格をAIで一元管理。AI価格提案から承認・自動反映まで、EC運営の全工程を統合したマルチプラットフォーム対応システム。
          </p>
          <div className="space-y-1 mb-2">
            <div className="text-xs font-black text-slate-500 tracking-widest mb-3">主要機能</div>
            {[
              { icon: Cpu, text: 'AI価格提案・承認ワークフロー（AS-IS→TO-BE比較）' },
              { icon: Layers, text: '4大ECプラットフォーム在庫・価格一元管理' },
              { icon: Zap, text: '在庫アラート・異常検知・CSV自動連携' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 hover:bg-white/8 rounded-xl p-3.5 border border-white/10 transition-colors">
                <item.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-200 text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-5">
          <div className="text-xs text-slate-500 font-medium mb-3">システム実績</div>
          <div className="flex gap-6">
            {[
              { value: '4', label: 'EC連携', color: 'text-cyan-400' },
              { value: 'AI', label: '価格自動提案', color: 'text-amber-400' },
              { value: '24h', label: '自動同期', color: 'text-emerald-400' },
            ].map((m, i) => (
              <div key={i}>
                <div className={`text-xl font-black ${m.color}`}>{m.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right panel — UI mockup matching actual app */}
      <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden">
        {/* App header */}
        <div className="bg-white border-b border-slate-200 px-5 py-2.5 flex items-center gap-5 flex-shrink-0">
          <span className="font-black text-slate-900 text-sm tracking-tight">AI MD System</span>
          <div className="flex gap-4">
            {['ダッシュボード', '価格承認', '在庫一覧', 'データ管理'].map((t, i) => (
              <span key={i} className={`text-xs pb-1 ${i === 0 ? 'text-slate-900 font-bold border-b-2 border-slate-900' : 'text-slate-400'}`}>{t}</span>
            ))}
          </div>
        </div>
        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-3 p-4 flex-shrink-0">
          {[
            { label: '総商品数', value: '1,247', sub: '4プラットフォーム', icon: Box, color: 'text-slate-600' },
            { label: '低在庫商品', value: '38', sub: '要発注', icon: TrendingDown, color: 'text-red-500' },
            { label: '過剰在庫', value: '12', sub: '見直し推奨', icon: TrendingUp, color: 'text-amber-500' },
            { label: '承認待ち', value: '24', sub: 'AI提案件数', icon: Zap, color: 'text-cyan-600' },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-500">{card.label}</p>
                <card.icon className={`w-3.5 h-3.5 ${card.color}`} />
              </div>
              <p className="text-xl font-black text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{card.sub}</p>
            </div>
          ))}
        </div>
        {/* Price approval section */}
        <div className="px-4 flex-1 overflow-hidden">
          <div className="bg-white rounded-lg border border-slate-200 p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-black text-slate-700 tracking-wider">AI価格承認 — 最新提案</p>
              <div className="flex gap-2">
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200">全承認</span>
                <span className="text-xs bg-slate-50 text-slate-600 px-2 py-0.5 rounded font-bold border border-slate-200">全差し戻し</span>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {[
                { sku: 'TSD-001234', name: '博多通りもん 12個入', from: '¥2,180', to: '¥2,380', rate: '+9.2%', up: true },
                { sku: 'TSD-005678', name: '辛子明太子 切れ子 500g', from: '¥3,480', to: '¥3,200', rate: '-8.0%', up: false },
                { sku: 'TSD-009012', name: '博多ラーメン セット 5食', from: '¥1,980', to: '¥2,100', rate: '+6.1%', up: true },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-slate-400">{row.sku}</p>
                    <p className="text-xs font-bold text-slate-800 truncate">{row.name}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="bg-white border border-slate-200 rounded px-2 py-1 text-center">
                      <p className="text-xs text-slate-400 leading-none">AS-IS</p>
                      <p className="text-sm font-bold text-slate-700">{row.from}</p>
                    </div>
                    <span className={`text-xs font-black ${row.up ? 'text-emerald-600' : 'text-blue-600'}`}>{row.rate}</span>
                    <div className={`border rounded px-2 py-1 text-center ${row.up ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-50 border-blue-200'}`}>
                      <p className={`text-xs leading-none ${row.up ? 'text-emerald-500' : 'text-blue-500'}`}>TO-BE</p>
                      <p className={`text-sm font-black ${row.up ? 'text-emerald-700' : 'text-blue-700'}`}>{row.to}</p>
                    </div>
                    <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">承認</span>
                    <span className="text-xs bg-white text-slate-600 px-2 py-0.5 rounded font-bold border border-slate-300">却下</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-3 flex-shrink-0" />
      </div>
    </div>
  </div>
);

/* ===== AI LAB CASE 02: Looop Connect ===== */
const SlideLooop = (
  <div key="s-looop" className="w-full h-[720px] relative overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" style={{ clipPath: 'polygon(0 0, 42% 0, 42% 100%, 0 100%)' }} />
    <div className="absolute top-0 left-0 w-[42%] h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-64 h-64 border border-cyan-500/20 rounded-full" />
      <div className="absolute top-1/3 -left-10 w-40 h-40 border border-violet-500/10 rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
    </div>
    <div className="absolute inset-0 flex h-full">
      {/* Left panel */}
      <div className="w-[42%] flex flex-col justify-between p-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1.5 bg-cyan-500/15 text-cyan-400 text-xs font-black rounded-full border border-cyan-500/30 tracking-wider">AI LAB CASE 02</span>
            <span className="px-3 py-1.5 bg-orange-500/15 text-orange-400 text-xs font-black rounded-full border border-orange-500/30 flex items-center gap-1">
              <Phone className="w-3 h-3" />CTI・CRM
            </span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight mb-4">
            Looop Connect<br />統合コンタクトセンター
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            WebRTCによるリアルタイム音声通話とCRMを融合した次世代コンタクトセンターシステム。通話中の文字起こし・チケット自動生成・顧客360度ビューを一画面で提供。
          </p>
          <div className="space-y-1 mb-2">
            <div className="text-xs font-black text-slate-500 tracking-widest mb-3">主要機能</div>
            {[
              { icon: Zap, text: 'WebRTC音声通話・リアルタイム文字起こし' },
              { icon: FileCheck, text: '通話中チケット自動生成・CRM連携' },
              { icon: Users, text: '顧客360度ビュー・対応履歴タイムライン' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 hover:bg-white/8 rounded-xl p-3.5 border border-white/10 transition-colors">
                <item.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-200 text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-5">
          <div className="text-xs text-slate-500 font-medium mb-3">システム特性</div>
          <div className="flex gap-6">
            {[
              { value: 'WebRTC', label: 'ブラウザ通話', color: 'text-orange-400' },
              { value: 'AI', label: '音声文字起こし', color: 'text-cyan-400' },
              { value: '3画面', label: '同時表示', color: 'text-emerald-400' },
            ].map((m, i) => (
              <div key={i}>
                <div className={`text-lg font-black ${m.color}`}>{m.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right panel — Looop Connect Dashboard UI mockup */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f7fafc]">
        {/* Top navbar */}
        <div className="h-11 bg-white border-b border-slate-200 flex items-center px-4 gap-3 flex-shrink-0">
          <span className="font-black text-[#005894] text-sm tracking-tight whitespace-nowrap">Looop Connect</span>
          <div className="flex-1 bg-[#f1f5f9] rounded-full px-3 py-1 flex items-center gap-2">
            <Search className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-400">連絡先や履歴を検索...</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2 h-2 bg-[#fcd400] rounded-full" />
            <span className="text-xs text-[#0071bc] font-bold">受付中</span>
          </div>
          <Bell className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <Settings className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <div className="text-right leading-tight flex-shrink-0">
            <div className="text-xs font-bold text-slate-700">溝口テスト</div>
            <div className="text-slate-400 font-normal" style={{ fontSize: '10px' }}>LEVEL 2 AGENT</div>
          </div>
        </div>
        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div className="w-44 bg-[#f1f5f9] border-r border-slate-200 flex flex-col p-2 flex-shrink-0">
            <div className="flex flex-col items-center py-3 mb-1">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center mb-1.5">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-[#005894]">溝口テスト</span>
              <span className="text-slate-400" style={{ fontSize: '10px' }}>システム管理者</span>
            </div>
            <div className="space-y-0.5 flex-1">
              {[
                { label: 'ダッシュボード', active: true },
                { label: '通話' },
                { label: '連絡先' },
                { label: '履歴' },
                { label: 'スクリプト' },
                { label: 'アカウント管理' },
              ].map((item, i) => (
                <div key={i} className={`px-3 py-2 rounded-lg text-xs font-medium ${item.active ? 'bg-[#0071bc] text-white font-bold' : 'text-slate-500'}`}>
                  {item.label}
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <div className="bg-[#fcd400] text-[#6e5c00] font-bold text-xs rounded-lg px-3 py-2 text-center flex items-center justify-center gap-1 mb-2">
                <Phone className="w-3 h-3" />ソフトフォン起動
              </div>
              <div className="text-xs text-slate-400 text-center">ヘルプ</div>
              <div className="text-xs text-slate-400 text-center mt-0.5">ログアウト</div>
            </div>
          </div>
          {/* Main dashboard */}
          <div className="flex-1 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-[#181c1e]">ダッシュボード</h2>
              <div className="flex gap-2">
                <button className="bg-[#ff6600] text-white text-xs px-3 py-1.5 rounded-lg font-bold">URLをコピー</button>
                <button className="bg-slate-200 text-slate-600 text-xs px-2 py-1.5 rounded-lg font-bold">URLをクローズ</button>
                <button className="bg-[#0071bc] text-white text-xs px-3 py-1.5 rounded-lg font-bold">新規顧客登録</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-700">最近の通話履歴</span>
                  </div>
                  <span className="text-xs text-[#0071bc] font-bold">VIEW ALL</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700">顧客ID: cust-001</p>
                    <p className="text-xs text-slate-400 truncate">2026-05-19T06:06:38.370Z</p>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold flex-shrink-0">Completed</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <div className="mb-3">
                  <span className="text-xs font-bold text-slate-700">優先対応タスク</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-2 h-2 bg-[#fcd400] rounded-full flex-shrink-0" />
                  <p className="text-xs text-slate-700">新プラン切り替え相談</p>
                </div>
              </div>
            </div>
            {/* Floating softphone popup */}
            <div className="absolute top-3 right-3 w-36 bg-[#181c1e] rounded-3xl p-3 shadow-2xl">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-xs text-blue-400 font-bold tracking-wider">READY</span>
                <div className="ml-auto w-4 h-4 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-400 leading-none" style={{ fontSize: '10px' }}>×</span>
                </div>
              </div>
              <div className="flex flex-col items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center mb-1">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-bold text-white">Standby</span>
                <span className="text-white/60 leading-tight" style={{ fontSize: '9px' }}>WAITING FOR CONNECTION</span>
              </div>
              <div className="text-center text-slate-500 text-xs mb-1.5">- - -</div>
              <div className="grid grid-cols-3 gap-0.5 mb-2">
                {['1','2','3','4','5','6','7','8','9','*','0','×'].map(d => (
                  <div key={d} className="h-6 bg-slate-800 rounded flex items-center justify-center text-xs text-white font-bold">{d}</div>
                ))}
              </div>
              <div className="flex justify-between px-1 mb-2">
                <span className="text-slate-500" style={{ fontSize: '9px' }}>MUTE</span>
                <span className="text-slate-500" style={{ fontSize: '9px' }}>TRANSFER</span>
              </div>
              <button className="w-full bg-[#0071bc] rounded-xl py-1.5 text-xs font-bold text-white flex items-center justify-center gap-1">
                <Phone className="w-3 h-3" />発信する
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ===== AI LAB CASE 03: Tenant Matching System ===== */
const SlideTenant = (
  <div key="s-tenant" className="w-full h-[720px] relative overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" style={{ clipPath: 'polygon(0 0, 42% 0, 42% 100%, 0 100%)' }} />
    <div className="absolute top-0 left-0 w-[42%] h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-64 h-64 border border-cyan-500/20 rounded-full" />
      <div className="absolute top-1/3 -left-10 w-40 h-40 border border-violet-500/10 rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
    </div>
    <div className="absolute inset-0 flex h-full">
      {/* Left panel */}
      <div className="w-[42%] flex flex-col justify-between p-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1.5 bg-cyan-500/15 text-cyan-400 text-xs font-black rounded-full border border-cyan-500/30 tracking-wider">AI LAB CASE 03</span>
            <span className="px-3 py-1.5 bg-yellow-500/15 text-yellow-400 text-xs font-black rounded-full border border-yellow-500/30 flex items-center gap-1">
              <Building2 className="w-3 h-3" />不動産DX
            </span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight mb-4">
            テナントマッチング<br />プラットフォーム
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            物件情報とテナント（業態・立地・面積条件）をAIでマッチングし、打診メール送信から回答管理・交渉ステータス追跡まで一気通貫で管理するDXプラットフォーム。
          </p>
          <div className="space-y-1 mb-2">
            <div className="text-xs font-black text-slate-500 tracking-widest mb-3">主要機能</div>
            {[
              { icon: Layers, text: '物件・テナントデータ管理（CRUD・フィルタ・ソート）' },
              { icon: Cpu, text: '業態・面積・地域条件でのAI自動マッチング' },
              { icon: Mail, text: '打診メール一括送信・回答追跡・交渉ステータス管理' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 hover:bg-white/8 rounded-xl p-3.5 border border-white/10 transition-colors">
                <item.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-200 text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-5">
          <div className="text-xs text-slate-500 font-medium mb-3">管理ステータス</div>
          <div className="flex gap-5">
            {[
              { value: '6段階', label: 'ステータス管理', color: 'text-yellow-400' },
              { value: '一括', label: '打診メール送信', color: 'text-cyan-400' },
              { value: '自動', label: 'マッチング', color: 'text-emerald-400' },
            ].map((m, i) => (
              <div key={i}>
                <div className={`text-lg font-black ${m.color}`}>{m.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right panel — Tenant Matching UI mockup */}
      <div className="flex-1 bg-[#f1f5f9] flex flex-col overflow-hidden">
        {/* Header with gold search */}
        <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 flex-1 max-w-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-400">物件名・地主名で検索...</span>
          </div>
          <button className="ml-3 px-3 py-1.5 text-xs font-black rounded-lg text-white" style={{ background: '#e6b422' }}>🔍</button>
        </div>
        {/* Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Dark sidebar */}
          <div className="w-40 flex-shrink-0 flex flex-col py-4 gap-1" style={{ background: '#333333' }}>
            {[
              { label: 'ダッシュボード', icon: TrendingUp },
              { label: '土地管理', icon: Building2 },
              { label: 'テナント管理', icon: Users },
              { label: 'マッチング実行', icon: Zap },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer ${i === 3 ? 'rounded-r-full' : ''}`}
                style={{ background: i === 3 ? '#e6b422' : 'transparent' }}>
                <item.icon className={`w-3.5 h-3.5 flex-shrink-0 ${i === 3 ? 'text-white' : 'text-slate-400'}`} />
                <span className={`text-xs font-bold ${i === 3 ? 'text-white' : 'text-slate-400'}`}>{item.label}</span>
              </div>
            ))}
          </div>
          {/* Matching content */}
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex-shrink-0">
              <p className="text-xs font-black text-slate-700 mb-3">マッチング実行</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 bg-slate-100 rounded-lg px-3 py-2">
                  <p className="text-xs text-slate-400 leading-none mb-0.5">対象物件</p>
                  <p className="text-xs font-bold text-slate-800">渋谷区神南 1丁目 — 120㎡</p>
                </div>
                <div className="flex gap-2">
                  <select className="text-xs bg-slate-100 border-0 rounded px-2 py-1.5 text-slate-600">
                    <option>業態: すべて</option>
                  </select>
                  <select className="text-xs bg-slate-100 border-0 rounded px-2 py-1.5 text-slate-600">
                    <option>50㎡以上</option>
                  </select>
                </div>
              </div>
              {/* Tenant match list */}
              <div className="space-y-1.5">
                {[
                  { name: '株式会社 CAFE BLUE', type: 'カフェ', area: '東京都', status: '新規', check: true },
                  { name: 'コンビニエンスA', type: 'コンビニ', area: '神奈川', status: '過去打診', check: false },
                  { name: '学習塾ステップ', type: '教育', area: '東京都', status: '新規', check: true },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-slate-50 rounded-lg px-3 py-2">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${t.check ? 'bg-[#e6b422] border-[#e6b422]' : 'border-slate-300'}`}>
                      {t.check && <span className="text-white text-xs font-black">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.type} | {t.area}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${t.status === '新規' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full py-2.5 rounded-xl font-black text-white text-sm flex items-center justify-center gap-2 flex-shrink-0" style={{ background: '#1e293b' }}>
              <Mail className="w-4 h-4" />2件に打診メールを送信
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Slide4 = (
  <div key="s4" className="w-full h-[720px] bg-white p-10 relative overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <svg className="w-full h-full">
        <defs>
          <pattern id="circuit-ph" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 0 50 L 50 50 L 50 0" stroke="currentColor" fill="none" className="text-slate-300" />
            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-slate-300" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-ph)" />
      </svg>
    </div>

    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="px-3 py-1 bg-cyan-500 text-white rounded-full text-xs font-bold">PHASE 02</div>
          <div className="text-cyan-600 font-bold text-lg italic">2024 - 2025</div>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">知能を研鑽し、エンジンを創る。</h2>
        <p className="text-base text-slate-600 max-w-3xl">SES継続 × AI研究開発 —— 二刀流の挑戦</p>
      </div>

      <div className="flex gap-6 flex-1">
        <div className="flex-1 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-6 border-2 border-cyan-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-black text-cyan-700">TRACK A</h3>
            <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold">稼働中</div>
          </div>
          <div className="text-lg font-bold text-slate-800 mb-4">SES事業 継続</div>
          <div className="space-y-2">
            {['Manufacturing', 'Education', 'Entertainment', 'Commerce', 'Everyday life'].map((domain, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                  idx === 0 ? 'from-cyan-500 to-cyan-600' :
                  idx === 1 ? 'from-blue-500 to-blue-600' :
                  idx === 2 ? 'from-violet-500 to-violet-600' :
                  idx === 3 ? 'from-pink-500 to-pink-600' :
                  'from-emerald-500 to-emerald-600'
                }`} />
                <span className="text-slate-700 font-medium text-sm">{domain}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-5xl font-black text-slate-300">×</div>
        </div>

        <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 border-2 border-slate-700 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-black">TRACK B</h3>
            <div className="px-3 py-1 bg-amber-500 text-slate-900 rounded-full text-xs font-bold">秘密裏に</div>
          </div>
          <div className="text-lg font-bold mb-4">AI研究開発 始動</div>
          <div className="space-y-3">
            {[
              { id: '01', title: 'AI Architecture', desc: '開発プロセス自体を自動化・高度化する独自のAIアーキテクチャの研究。' },
              { id: '02', title: 'Hybrid Workflow', desc: 'AIのスピードと人間のプロ品質を融合させる、手戻りゼロのワークフロー構築。' },
              { id: '03', title: 'Data Insight', desc: '創業から蓄積した多角的ドメインの知見を学習データ化し、即応能力を獲得。' },
            ].map((pillar) => (
              <div key={pillar.id} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-cyan-400 text-xs font-bold mb-1">{pillar.id}</div>
                <div className="font-bold text-sm mb-1">{pillar.title}</div>
                <div className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <div className="inline-block px-5 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-full font-bold shadow-xl text-sm">
          → 2026年、2つの軌跡が交わる
        </div>
      </div>
    </div>
  </div>
);

const Slide5 = (
  <div key="s5" className="w-full h-[720px] bg-gradient-to-br from-slate-50 via-violet-50 to-cyan-50 p-10 relative overflow-hidden">
    <div className="absolute top-16 right-16 w-72 h-72 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-3xl" />
    <div className="absolute bottom-16 left-16 w-72 h-72 bg-gradient-to-tr from-violet-400/30 to-transparent rounded-full blur-3xl" />

    <div className="relative z-10 h-full flex flex-col justify-center">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-full text-xs font-bold">⚡ PHASE 03</div>
          <div className="text-cyan-400 font-bold text-lg italic">2026</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="text-white/30 text-xs tracking-widest">AI Development Lab</div>
          <h2 className="text-4xl font-black">
            <span className="text-slate-800">AI開発ラボ、</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
              始動。
            </span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            4年間の現場経験とAI研究開発が結実。独自のAI駆動エンジンにより、
            アイディアを短時間で動くプロトタイプへと変換します。
          </p>

          <div className="space-y-3 pt-4">
            {[
              { year: '2022-23', label: 'SES事業', active: false },
              { year: '2024-25', label: 'AI R&D', active: false },
              { year: '2026', label: 'AI開発ラボ', active: true },
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center gap-3 ${item.active ? 'mt-2' : ''}`}>
                <div className={`rounded-full flex-shrink-0 ${item.active ? 'w-4 h-4 bg-cyan-500 shadow-lg shadow-cyan-500/50 animate-pulse' : 'w-3 h-3 bg-slate-300'}`} />
                <div className={`font-black ${item.active ? 'text-3xl text-cyan-500' : 'text-sm text-slate-400'}`}>{item.year}</div>
                <div className={`${item.active ? 'text-base font-semibold text-slate-700' : 'text-slate-600 text-sm'}`}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[
            { id: '01', title: 'ラボ設立の意義', desc: '現場知見を学習データ化し、迅速なプロトタイピングを可能にする基盤を構築。', icon: Lightbulb },
            { id: '02', title: 'エンジン投資', desc: '次世代の開発エンジンへ2年間の研究投資を実施。スピードと品質を両立。', icon: Zap },
            { id: '03', title: '即時実行', desc: 'アイディアを短時間で動くプロトタイプに変換し、意思決定の速度を劇的に高めます。', icon: Rocket },
          ].map((feature) => (
            <div key={feature.id} className="bg-white/80 backdrop-blur-sm border-l-4 border-cyan-500 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-3">
                <feature.icon className="w-6 h-6 text-cyan-500 mt-0.5" />
                <div>
                  <div className="text-cyan-600 text-xs font-bold mb-1">{feature.id}</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Slide6 = (
  <div key="s6" className="w-full h-[720px] bg-white p-10 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-5 text-pink-500 transform -rotate-45 flex items-center justify-center text-9xl font-black tracking-widest">
      CONFIDENTIAL
    </div>

    <div className="relative z-10 h-full flex flex-col justify-center">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-800 mb-4">
          従来比 <span className="text-cyan-500">87.5%</span> の工期削減
        </h2>
        <p className="text-lg text-slate-600">
          最短24時間、最大でも2週間での実装力。開発の「単位」を根本から変えます。
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-5 flex flex-col justify-center space-y-5">
          <div className="text-slate-500 text-xs tracking-wider font-bold">Reduction Rate</div>
          <div className="flex items-baseline">
            <div className="text-[100px] font-black bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent leading-none">
              87.5
            </div>
            <div className="text-4xl font-black text-cyan-500 ml-1">%</div>
          </div>

          <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-lg">
            <p className="text-slate-700 text-sm leading-relaxed">
              AI自動化により、要件定義から実装、テストまでを圧倒的に高速化。
              従来8週間のプロジェクトを1週間で実現します。
            </p>
          </div>
        </div>

        <div className="col-span-7 space-y-5">
          {[
            { task: '要件定義・設計', traditional: '2週間', meece: '24時間', rate: 90 },
            { task: '開発・実装', traditional: '5週間', meece: '5日間', rate: 85 },
            { task: 'QA・テスト', traditional: '1週間', meece: '1日間', rate: 87 },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="font-bold text-slate-800 text-base">{item.task}</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <div className="w-16 text-xs text-slate-500">従来</div>
                  <div className="flex-1 h-8 bg-slate-300 rounded-lg flex items-center justify-end px-3">
                    <span className="text-slate-700 font-bold text-sm">{item.traditional}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 text-xs text-cyan-600 font-bold">Meece</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div
                      className="h-8 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg flex items-center justify-end px-3 shadow-lg"
                      style={{ width: `${100 - item.rate}%` }}
                    >
                      <span className="text-white font-bold text-xs">{item.meece}</span>
                    </div>
                    <span className="text-cyan-600 font-bold text-sm">{item.rate}%削減</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-slate-900 rounded-2xl p-6 mt-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-white text-2xl font-black">8 WEEKS</div>
              <div className="text-5xl text-slate-600">→</div>
              <div className="text-cyan-400 text-2xl font-black">1 WEEK</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Slide7 = (
  <div key="s7" className="w-full h-[720px] bg-gradient-to-br from-white to-slate-50 p-10 relative overflow-hidden">
    <div className="absolute bottom-6 right-6 opacity-10 transform rotate-12">
      <div className="border-4 border-cyan-500 rounded-xl px-8 py-4 text-cyan-500 text-3xl font-black">
        Official Proven
      </div>
    </div>

    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-8">
        <div className="border-l-4 border-cyan-500 pl-4 mb-3">
          <h2 className="text-3xl font-black text-slate-800">Success Stories: 2026 Revolution</h2>
        </div>
        <p className="text-base text-slate-600 pl-8">
          AI開発ラボが実現した、圧倒的な実行スピードの証明。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-3xl p-6 relative overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-6 right-6 opacity-5">
            <Zap className="w-36 h-36 text-slate-400" />
          </div>
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold mb-3">Case 01 — 老舗50年 お菓子屋さん</div>
            <h3 className="text-xl font-black text-slate-800 mb-2">
              在庫管理の属人化を解消。<br />50年の知見をAIが継承。
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              年商5億未満・IT未導入の老舗菓子店。エクセル管理で属人化した在庫ロジックをAIが学習し、
              独自フルスクラッチシステムを従来比40%コスト削減で構築しました。
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-xl p-3 border-2 border-cyan-200 text-center">
                <div className="text-cyan-600 text-xs font-bold mb-1">開発期間</div>
                <div className="text-lg font-black text-slate-800">10 Days</div>
              </div>
              <div className="bg-white rounded-xl p-3 border-2 border-emerald-200 text-center">
                <div className="text-emerald-600 text-xs font-bold mb-1">コスト削減</div>
                <div className="text-lg font-black text-slate-800">40% Off</div>
              </div>
              <div className="bg-white rounded-xl p-3 border-2 border-violet-200 text-center">
                <div className="text-violet-600 text-xs font-bold mb-1">工数削減</div>
                <div className="text-lg font-black text-slate-800">160h/月</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-6 relative overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-6 right-6 opacity-10">
            <Rocket className="w-36 h-36 text-cyan-400" />
          </div>
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-violet-500 text-white rounded-full text-xs font-bold mb-3">Case 02 — 急成長ベンチャー企業</div>
            <h3 className="text-xl font-black mb-2">
              5,000万円調達後、最速PMF。<br />マーケ資金を捻出し追加調達成功。
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              売上立ち上げ前のベンチャー。他社で「半年」と言われたMVPをAI駆動開発で数週間に圧縮。
              浮いた開発費をマーケティングへ回し、強力なトラクション形成に成功しました。
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/10 rounded-xl p-3 border border-violet-400 text-center">
                <div className="text-violet-300 text-xs font-bold mb-1">MVP期間</div>
                <div className="text-lg font-black">数週間</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-cyan-400 text-center">
                <div className="text-cyan-300 text-xs font-bold mb-1">PMF検証</div>
                <div className="text-lg font-black">✓ 達成</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-emerald-400 text-center">
                <div className="text-emerald-300 text-xs font-bold mb-1">追加調達</div>
                <div className="text-lg font-black">2ヶ月</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-200">
        {[
          { step: 'STEP 01', title: '財務の解剖', desc: '経営の健康診断から安全な投資予算を定義。無駄な出費ゼロで着手できる余剰資産を算出。', color: 'border-cyan-500 text-cyan-600 bg-cyan-50' },
          { step: 'STEP 02', title: 'AI実装', desc: 'AI駆動型開発をフル活用し、膨大な開発コストと時間の壁を突破。最小単位の価値を高速証明。', color: 'border-violet-500 text-violet-600 bg-violet-50' },
          { step: 'STEP 03', title: '継続的エンハンス', desc: '市場の声をアジャイルで反映し続け、必要な機能のみを追加。浮いた資金を次の成長へ還元。', color: 'border-pink-500 text-pink-600 bg-pink-50' },
        ].map((item, idx) => (
          <div key={idx} className={`${item.color} border-l-4 rounded-xl p-4`}>
            <div className="text-xs font-black tracking-wider mb-1 opacity-70">{item.step}</div>
            <div className="font-black text-slate-800 text-sm mb-1">{item.title}</div>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Slide8 = (
  <div key="s8" className="w-full h-[720px] bg-white p-10 relative overflow-hidden">
    <div className="relative z-10 h-full flex flex-col justify-center">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-800 mb-4">
          IT予算を「消費」から「投資」へ。
        </h2>
        <p className="text-lg text-slate-600">財務の健全化 × DX戦略の再構築</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-5 space-y-4">
          {[
            { id: '01', title: '無駄の特定', desc: '徹底したコスト監査で維持費を削減', icon: Calculator },
            { id: '02', title: '原資の創出', desc: '削減分をそのまま新規開発予算へ転換', icon: PiggyBank },
            { id: '03', title: '利益の最大化', desc: '爆速検証で投資対効果（ROI）を追求', icon: TrendingUp },
          ].map((step) => (
            <div key={step.id} className="bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-5 hover:border-amber-500 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm">
                  {step.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                    <h3 className="text-lg font-black text-slate-800">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-7 bg-slate-50 rounded-3xl p-8">
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-slate-700 font-bold text-base mb-3">現状のIT予算</div>
              <div className="flex gap-2 h-14">
                <div className="w-[10%] bg-amber-100 border-2 border-dashed border-amber-400 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-amber-700 font-bold">余剰</span>
                </div>
                <div className="flex-1 bg-slate-300 rounded-lg flex items-center justify-center">
                  <span className="text-slate-700 font-bold text-sm">固定費（保守・運用）</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-5xl text-cyan-500 animate-pulse">↓</div>
            </div>

            <div className="space-y-3">
              <div className="text-slate-700 font-bold text-base mb-3">Meece導入後</div>
              <div className="flex gap-2 h-14">
                <div className="w-[25%] bg-slate-300 rounded-lg flex items-center justify-center">
                  <span className="text-slate-700 font-bold text-xs">固定費最小化</span>
                </div>
                <div className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg flex items-center justify-center shadow-xl shadow-amber-500/30">
                  <span className="text-white font-black text-sm">成長投資（AI開発ラボ）</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-slate-300 rounded" />
                <span className="text-slate-600 text-sm font-medium">固定費</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-amber-500 rounded" />
                <span className="text-slate-600 text-sm font-medium">成長投資</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Slide9 = (
  <div key="s9" className="w-full h-[720px] bg-gradient-to-br from-white via-slate-50 to-violet-50 p-10 relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center opacity-5">
      <div className="w-[440px] h-[440px] rounded-full border-4 border-violet-500 animate-pulse" />
    </div>
    <div className="absolute top-0 right-0 w-full h-full opacity-5 text-pink-500 transform -rotate-45 flex items-center justify-center text-9xl font-black tracking-widest">
      CONFIDENTIAL
    </div>

    <div className="relative z-10 h-full grid grid-cols-12 gap-8">
      <div className="col-span-5 flex flex-col justify-center space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-1 bg-gradient-to-r from-cyan-500 to-violet-500" />
          <span className="text-violet-600 font-bold tracking-wider text-sm">Our Mindset</span>
        </div>

        <h2 className="text-4xl font-black text-slate-800 leading-tight">
          「当事者」以上の<br />当事者意識を。
        </h2>

        <p className="text-base text-slate-600 leading-relaxed">
          私たちは、依頼されたものを作るだけの集団ではありません。あなたの事業の成功を、
          誰よりも強く、深く、自らのこととして考え抜きます。
        </p>

        <div className="flex items-center gap-2 pt-4">
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          <span className="text-xl font-black text-slate-800">Extreme Ownership</span>
        </div>
      </div>

      <div className="col-span-7 flex flex-col justify-center space-y-4">
        {[
          {
            id: '01', label: 'Proactive', title: '一蓮托生のチーム体制',
            desc: 'クライアントと制作側の壁を取り払い、一つのSlack、一つの目的に向かって最速で動く体制を構築。',
            icon: Lightbulb, color: 'cyan',
          },
          {
            id: '02', label: 'Essential', title: '本質的な提案力',
            desc: '言われた通りに作るのではない、「本当にそれは必要なのか？」という問いを立て、事業価値を最大化する提案。',
            icon: Zap, color: 'pink',
          },
          {
            id: '03', label: 'Passion', title: '完遂する熱量',
            desc: 'どんな困難があっても投げ出さない。物語が「完結」するその瞬間まで、現場の最前線で走り抜く。',
            icon: Zap, color: 'violet',
          },
        ].map((card, idx) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 hover:border-cyan-400"
            style={{ transform: `translateX(${idx * 24}px)`, zIndex: 10 - idx }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                card.color === 'cyan' ? 'from-cyan-400 to-cyan-500' :
                card.color === 'pink' ? 'from-pink-400 to-pink-500' :
                'from-violet-400 to-violet-500'
              } flex items-center justify-center shadow-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className={`${card.color === 'cyan' ? 'text-cyan-600' : card.color === 'pink' ? 'text-pink-600' : 'text-violet-600'} text-xs font-bold mb-1`}>
                  {card.id}. {card.label}
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-1">{card.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Slide10 = (
  <div key="s10" className="w-full h-[720px] bg-gradient-to-br from-slate-50 via-violet-50 to-pink-50 p-10 relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border-4 border-dashed border-violet-300 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 border-dashed border-pink-200 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
      <div className="absolute top-16 right-16 w-72 h-72 bg-gradient-to-br from-violet-400/20 to-transparent rounded-full blur-3xl" />
    </div>

    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
      <div className="relative">
        <Box className="w-20 h-20 text-violet-500 animate-pulse drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))' }} />
        <Sparkles className="w-8 h-8 text-pink-500 absolute -top-4 -right-4 animate-pulse" />
      </div>
    </div>

    <div className="relative z-10 h-full flex flex-col">
      <div className="text-center mb-8 pt-40">
        <h2 className="text-4xl font-black bg-gradient-to-r from-slate-800 via-violet-600 to-pink-600 bg-clip-text text-transparent leading-tight mb-4">
          2026年、Meece独自の<br />「物語」が動き出す。
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
          AI開発ラボで培った「爆速実装技術」と「多角的ドメインの知見」を結集させ、
          特定の業界課題を根本から解決する独自のAIプロダクトを解禁します。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          {
            step: '0→1', label: 'Launch', title: 'Product Launch',
            desc: 'AI開発ラボの基盤をSaaS化。誰もが直感的に「動く資産」を手に入れられるプラットフォームを提供。',
            icon: Layers, color: 'cyan',
          },
          {
            step: '1→10', label: 'Vertical', title: 'Vertical AI',
            desc: '製造・医療・教育。現場に特化した「垂直統合型AI」を展開し、業界の標準OSを塗り替える。',
            icon: Rocket, color: 'violet',
          },
          {
            step: '10→∞', label: 'Global', title: 'Global Expansion',
            desc: '言語と文化の壁をAIで突破。日本発の知能を、世界中の「止まっている現場」へ届ける。',
            icon: Globe, color: 'pink',
          },
        ].map((item, idx) => {
          const gradientClass =
            item.color === 'cyan' ? 'from-cyan-500 to-cyan-600' :
            item.color === 'violet' ? 'from-violet-500 to-violet-600' :
            'from-pink-500 to-pink-600';
          const iconColor =
            item.color === 'cyan' ? 'text-cyan-500' :
            item.color === 'violet' ? 'text-violet-500' :
            'text-pink-500';

          return (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-violet-400 h-full">
              <div className="mb-4">
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${gradientClass} text-white rounded-full text-xs font-bold mb-2`}>
                  {item.step}
                </div>
                <div className="text-slate-400 text-xs mb-2">{item.label}</div>
                <div className="flex items-center gap-2 mb-3">
                  <item.icon className={`w-7 h-7 ${iconColor}`} />
                  <h3 className="text-lg font-black text-slate-800">{item.title}</h3>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const Slide11 = (
  <div key="s11" className="w-full h-[720px] bg-white p-10 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-[440px] h-[440px] opacity-10">
      <div className="w-full h-full border-8 border-slate-200 rounded-3xl transform rotate-6" />
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-violet-400/20 to-transparent rounded-full blur-3xl animate-pulse" />

    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center space-y-8">
      <div className="space-y-4">
        <div className="text-violet-600 font-bold tracking-[0.5em] text-xs">READY TO START?</div>
        <h2 className="text-5xl font-black text-slate-800">次のページを、一緒に。</h2>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Meeceは、あなたの事業という壮大な物語を完成させるための「最後の一片（ラスト・ピース）」です。<br />
          まずは、現在の課題や理想の姿を私たちに聞かせてください。共に新たな歴史を刻みましょう。
        </p>
      </div>

      <div className="flex gap-6">
        <a
          href="/diagnosis"
          className="group bg-white border-4 border-violet-500 rounded-3xl p-6 hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 flex items-center gap-5 min-w-[280px]"
        >
          <div className="w-14 h-14 rounded-2xl bg-violet-500 group-hover:bg-violet-600 flex items-center justify-center transition-all">
            <ClipboardCheck className="w-7 h-7 text-white" />
          </div>
          <div className="text-left">
            <div className="text-violet-600 text-xs font-bold mb-1">01. Diagnosis</div>
            <div className="text-xl font-black text-slate-800">AI開発適正診断</div>
          </div>
        </a>

        <a
          href="mailto:info@meece.io"
          className="group bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-5 min-w-[280px]"
        >
          <div className="w-14 h-14 rounded-2xl bg-pink-500 group-hover:bg-pink-600 flex items-center justify-center transition-all">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <div className="text-left">
            <div className="text-pink-400 text-xs font-bold mb-1">02. Contact</div>
            <div className="text-xl font-black text-white">お問い合わせ</div>
          </div>
        </a>
      </div>

      <div className="border-t-2 border-slate-200 pt-6 mt-4 w-full max-w-4xl">
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div className="text-left">
            <div className="font-bold text-slate-800 mb-1">Meece株式会社</div>
            <div className="text-slate-500">東京都千代田区丸の内1-8-3</div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href="/company" className="flex items-center gap-1.5 text-slate-600 hover:text-cyan-500 transition-colors">
              <Building2 className="w-4 h-4" />
              <span>会社概要</span>
            </a>
            <a href="/ai-lab" className="flex items-center gap-1.5 text-slate-600 hover:text-violet-500 transition-colors">
              <Rocket className="w-4 h-4" />
              <span>AI開発ラボ</span>
            </a>
          </div>
          <div className="text-right">
            <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
              Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const meeceIntroPresentation: PresentationEntry = {
  meta: {
    id: 'meece-intro',
    title: 'Meece株式会社 会社紹介',
    description: 'すべてのビジネスに、輝く「物語」の続きを。Meeceの会社紹介プレゼンテーション。',
    thumbnail: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
    author: '溝口 雅登',
    createdAt: '2026-05-19',
  },
  slides: [Slide1, Slide2, SlideWhatIsMeece, SlideDCF, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, SlideCaseIntro, SlideSESCase, SlidePetSalon, SlidePurchaseCase, SlideHealthCase, SlideAIMD, SlideLooop, SlideTenant, Slide10, Slide11],
};
