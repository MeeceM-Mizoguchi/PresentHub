import { motion } from 'motion/react';
import type { PresentationEntry } from '../registry';

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

// ---- Slide 1: タイトル ----
function TitleSlide() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-white overflow-hidden">
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(157,114,255,0.14) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,91,174,0.1) 0%, transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, #9D72FF, #FF5BAE)' }} />

      <div className="relative z-10 text-center px-16">
        <motion.p {...up(0.1)} className="text-xs font-bold mb-6"
          style={{ color: '#9D72FF', letterSpacing: '0.4em' }}>
          DIGITAL CREATIVE FIRM
        </motion.p>
        <motion.h1 {...up(0.2)} className="font-black mb-6 leading-none"
          style={{ color: '#0D1B3E', fontSize: '6rem', letterSpacing: '0.22em' }}>
          Meece
        </motion.h1>
        <motion.div {...up(0.3)} className="mx-auto mb-8"
          style={{ width: '56px', height: '3px', background: 'linear-gradient(90deg, #9D72FF, #FF5BAE)' }} />
        <motion.p {...up(0.4)} className="text-base"
          style={{ color: '#64748b', letterSpacing: '0.1em' }}>
          時代をまたぎ、新しいデジタルをデザインする。
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, #FF5BAE, #9D72FF)' }} />
    </div>
  );
}

// ---- Slide 2: WHO WE ARE ----
function WhoWeAreSlide() {
  const pillars = [
    { en: 'Experience Design', ja: 'UX・体験設計', desc: '人を中心に据えた設計で、使う人の感情と行動を動かす体験をつくる。', color: '#9D72FF' },
    { en: 'Deep Technology', ja: '先端テクノロジー', desc: 'AI・クラウド・最新スタックを駆使し、複雑な課題をエレガントに解く。', color: '#FF5BAE' },
    { en: 'Business Strategy', ja: 'ビジネス戦略', desc: '技術選定から組織設計まで、成果に直結するDX戦略を描く。', color: '#319795' },
    { en: 'Creative Direction', ja: 'クリエイティブ', desc: 'ブランドの物語を視覚言語に変換し、独自の世界観として表現する。', color: '#f59e0b' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-14 overflow-hidden" style={{ background: '#F8FAFC' }}>
      <motion.div {...up(0.1)} className="mb-8 flex-shrink-0">
        <p className="text-xs font-bold mb-2" style={{ color: '#9D72FF', letterSpacing: '0.4em' }}>WHO WE ARE</p>
        <h2 className="text-4xl font-black leading-snug" style={{ color: '#0D1B3E' }}>
          テクノロジーと表現で、<br />
          <span style={{
            background: 'linear-gradient(90deg, #9D72FF, #FF5BAE)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>価値を再定義する。</span>
        </h2>
      </motion.div>
      <div className="flex-1 grid grid-cols-4 gap-4 min-h-0">
        {pillars.map((p, i) => (
          <motion.div key={i} {...up(0.2 + i * 0.1)}
            className="flex flex-col p-5 rounded-2xl bg-white shadow-sm border border-gray-100">
            <div className="w-8 h-1 rounded-full mb-4" style={{ background: p.color }} />
            <p className="text-xs font-bold mb-1" style={{ color: p.color, letterSpacing: '0.12em' }}>{p.en}</p>
            <p className="text-sm font-bold mb-2" style={{ color: '#0D1B3E' }}>{p.ja}</p>
            <p className="text-xs leading-relaxed text-slate-500">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---- Slide 3: Meeceの由来 ----
function OriginSlide() {
  const letters = [
    { letter: 'M', word: 'Manufacturing', ja: '製造・ものづくり', desc: '日本の基幹産業を支える製造・生産の領域', color: '#9D72FF' },
    { letter: 'E', word: 'Education', ja: '教育・学び', desc: '次世代の可能性を広げる教育イノベーション', color: '#FF5BAE' },
    { letter: 'E', word: 'Entertainment', ja: 'エンタメ', desc: 'テクノロジーで感動体験をつくる娯楽領域', color: '#319795' },
    { letter: 'C', word: 'Commerce', ja: '流通・商業', desc: 'モノと人をつなぐ商業・流通の仕組みを革新', color: '#f59e0b' },
    { letter: 'E', word: 'Energy & Life', ja: 'エネルギー・生活', desc: '持続可能なデジタルソリューションで暮らしを豊かに', color: '#3b82f6' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-14 bg-white overflow-hidden">
      <motion.div {...up(0.1)} className="mb-8 flex-shrink-0">
        <p className="text-xs font-bold mb-2" style={{ color: '#9D72FF', letterSpacing: '0.4em' }}>ORIGIN OF MEECE</p>
        <h2 className="text-4xl font-black" style={{ color: '#0D1B3E' }}>Meeceという名前に込めた想い</h2>
      </motion.div>
      <div className="flex-1 flex gap-3 min-h-0">
        {letters.map((l, i) => (
          <motion.div key={i} {...up(0.2 + i * 0.08)}
            className="flex-1 flex flex-col p-5 rounded-2xl border-2"
            style={{ borderColor: `${l.color}30`, background: `${l.color}08` }}>
            <div className="text-5xl font-black mb-3 leading-none" style={{ color: l.color }}>{l.letter}</div>
            <div className="w-6 h-0.5 rounded-full mb-3" style={{ background: l.color }} />
            <p className="text-xs font-bold mb-1" style={{ color: l.color, letterSpacing: '0.06em' }}>{l.word}</p>
            <p className="text-sm font-bold mb-2" style={{ color: '#0D1B3E' }}>{l.ja}</p>
            <p className="text-xs leading-relaxed text-slate-500">{l.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---- Slide 4: 事業領域 ----
function BusinessFieldsSlide() {
  const services = [
    { icon: '💻', title: '受託開発', en: 'Custom Development', desc: 'モダンなスタックで複雑な要件を美しいUXに昇華。WebアプリからモバイルAppまで一気通貫で対応。', tags: ['Web App', 'Mobile', 'UI/UX'] },
    { icon: '🤖', title: 'AI研究開発', en: 'AI R&D', desc: '生成AI・LLMの実装から独自学習モデル開発まで。プロダクトにインテリジェンスを組み込む。', tags: ['Gen AI', 'LLM', 'ML'] },
    { icon: '📊', title: 'ITコンサル', en: 'IT Consulting', desc: 'DX戦略から技術選定・アーキテクチャ設計まで。ビジネス成果に直結するデジタル変革を推進。', tags: ['DX', '戦略', 'アーキ'] },
    { icon: '🚀', title: '多角的事業支援', en: 'Business Support', desc: 'マーケティング・採用・技術選定を統合的に支援。スタートアップから成長期まで加速させる。', tags: ['Marketing', '採用', '成長'] },
  ];

  return (
    <div className="w-full h-full flex flex-col p-14 overflow-hidden" style={{ background: '#F8FAFC' }}>
      <motion.div {...up(0.1)} className="mb-8 flex-shrink-0">
        <p className="text-xs font-bold mb-2" style={{ color: '#9D72FF', letterSpacing: '0.4em' }}>BUSINESS FIELDS</p>
        <h2 className="text-4xl font-black" style={{ color: '#0D1B3E' }}>4つの事業領域</h2>
      </motion.div>
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {services.map((s, i) => (
          <motion.div key={i} {...up(0.2 + i * 0.1)}
            className="flex flex-col p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-3">
              <span className="text-3xl">{s.icon}</span>
              <div>
                <p className="font-black text-base" style={{ color: '#0D1B3E' }}>{s.title}</p>
                <p className="text-xs text-slate-400">{s.en}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 flex-1">{s.desc}</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {s.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 text-xs rounded-full"
                  style={{ background: 'rgba(157,114,255,0.1)', color: '#9D72FF' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---- Slide 5: AI開発ラボ ----
function AiLabSlide() {
  const points = [
    { num: '1/3', label: 'のコストで', desc: '通常開発の1/3の費用でAI実装が可能' },
    { num: '2週間', label: 'でPOC完了', desc: '最短2週間でコンセプト実証を完了' },
    { num: '∞', label: '可能性', desc: '生成AI・LLM・画像認識など幅広く対応' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      <div className="px-14 py-10 flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, rgba(157,114,255,0.07) 0%, rgba(255,91,174,0.07) 100%)', borderBottom: '1px solid rgba(157,114,255,0.12)' }}>
        <motion.p {...up(0.1)} className="text-xs font-bold mb-2"
          style={{ color: '#9D72FF', letterSpacing: '0.4em' }}>NEW SERVICE</motion.p>
        <motion.h2 {...up(0.2)} className="text-4xl font-black" style={{ color: '#0D1B3E' }}>AI開発ラボ</motion.h2>
        <motion.p {...up(0.3)} className="text-sm mt-2 text-slate-500">
          貴社のビジネスに、AIの力を最速・最小コストで。
        </motion.p>
      </div>
      <div className="flex-1 flex items-center px-14 py-8">
        <div className="grid grid-cols-3 gap-6 w-full">
          {points.map((p, i) => (
            <motion.div key={i} {...up(0.3 + i * 0.12)}
              className="flex flex-col items-center text-center p-8 rounded-2xl border-2"
              style={{ borderColor: 'rgba(157,114,255,0.2)', background: 'rgba(157,114,255,0.03)' }}>
              <div className="text-5xl font-black mb-1"
                style={{ background: 'linear-gradient(135deg, #9D72FF, #FF5BAE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {p.num}
              </div>
              <div className="text-sm font-bold mb-3" style={{ color: '#0D1B3E' }}>{p.label}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Slide 6: CEOメッセージ ----
function CeoMessageSlide() {
  return (
    <div className="w-full h-full flex flex-col p-14 bg-white overflow-hidden">
      <motion.p {...up(0.1)} className="text-xs font-bold mb-8"
        style={{ color: '#9D72FF', letterSpacing: '0.4em' }}>CEO MESSAGE</motion.p>
      <div className="flex flex-1 gap-12 items-start min-h-0">
        <motion.div {...up(0.2)} className="flex-shrink-0 flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black"
            style={{ background: 'linear-gradient(135deg, #9D72FF, #FF5BAE)' }}>
            溝
          </div>
          <div className="text-center">
            <p className="text-sm font-bold" style={{ color: '#0D1B3E' }}>溝口 雅登</p>
            <p className="text-xs text-slate-400">代表取締役 CEO</p>
          </div>
        </motion.div>
        <motion.div {...up(0.3)} className="flex-1">
          <div className="w-10 h-1 rounded-full mb-6"
            style={{ background: 'linear-gradient(90deg, #9D72FF, #FF5BAE)' }} />
          <p className="text-sm leading-8 text-slate-600 mb-4">
            テクノロジーは手段であり、目的は常に「人の可能性を広げること」にあります。
          </p>
          <p className="text-sm leading-8 text-slate-600 mb-4">
            Meeceは創業以来、クライアントの物語の一部となることを使命として歩んでまいりました。私たちはただシステムを作るのではなく、共に未来を設計するパートナーでありたいと考えています。
          </p>
          <p className="text-sm leading-8 text-slate-600">
            変化の激しい時代において、Meeceは常に「未来の当たり前」を先取りし、社会に新しい価値を届け続けます。
          </p>
          <p className="mt-6 text-sm font-bold" style={{ color: '#0D1B3E' }}>
            Meece株式会社 代表取締役　溝口 雅登
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ---- Slide 7: 会社概要 ----
function CompanyProfileSlide() {
  const rows = [
    { label: '会社名', value: 'Meece株式会社' },
    { label: '設立', value: '2022年8月22日' },
    { label: '代表取締役', value: '溝口 雅登' },
    { label: '所在地', value: '東京都千代田区丸の内1丁目　丸の内トラストタワー 20F' },
    { label: '事業内容', value: '受託開発・AI研究開発・ITコンサルティング・多角的事業支援' },
    { label: 'コーポレートサイト', value: 'meece.io' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-14 overflow-hidden" style={{ background: '#F8FAFC' }}>
      <motion.div {...up(0.1)} className="mb-8 flex-shrink-0">
        <p className="text-xs font-bold mb-2" style={{ color: '#9D72FF', letterSpacing: '0.4em' }}>COMPANY PROFILE</p>
        <h2 className="text-4xl font-black" style={{ color: '#0D1B3E' }}>会社概要</h2>
      </motion.div>
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-0">
        {rows.map((row, i) => (
          <motion.div key={i} {...up(0.2 + i * 0.07)}
            className="flex border-b border-gray-50 last:border-b-0">
            <div className="w-44 flex-shrink-0 px-6 py-4 flex items-center"
              style={{ background: 'rgba(157,114,255,0.04)' }}>
              <p className="text-xs font-bold text-slate-500">{row.label}</p>
            </div>
            <div className="flex-1 px-6 py-4 flex items-center">
              <p className="text-sm" style={{ color: '#0D1B3E' }}>{row.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---- Slide 8: お問い合わせ ----
function ContactSlide() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-white overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(157,114,255,0.12) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,91,174,0.1) 0%, transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, #9D72FF, #FF5BAE)' }} />

      <div className="relative z-10 text-center px-16">
        <motion.p {...up(0.1)} className="text-xs font-bold mb-6"
          style={{ color: '#9D72FF', letterSpacing: '0.4em' }}>CONTACT</motion.p>
        <motion.h2 {...up(0.2)} className="text-5xl font-black mb-4" style={{ color: '#0D1B3E' }}>
          一緒に、物語を作りませんか。
        </motion.h2>
        <motion.div {...up(0.3)} className="mx-auto mb-8"
          style={{ width: '56px', height: '3px', background: 'linear-gradient(90deg, #9D72FF, #FF5BAE)' }} />
        <motion.p {...up(0.4)} className="text-base text-slate-500 mb-10">
          ご相談・お見積りはお気軽にお問い合わせください。
        </motion.p>
        <motion.div {...up(0.5)}
          className="inline-block px-10 py-4 rounded-2xl text-white font-bold text-base"
          style={{ background: 'linear-gradient(135deg, #9D72FF, #FF5BAE)' }}>
          meece.io
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, #FF5BAE, #9D72FF)' }} />
    </div>
  );
}

export const meeceIntroPresentation: PresentationEntry = {
  meta: {
    id: 'meece-intro',
    title: 'Meece 会社紹介',
    description: 'Meece株式会社 — DIGITAL CREATIVE FIRM',
    thumbnail: 'linear-gradient(135deg, #9D72FF 0%, #FF5BAE 100%)',
    author: 'Claude',
    createdAt: '2026-05-13',
  },
  slides: [
    <TitleSlide key="1" />,
    <WhoWeAreSlide key="2" />,
    <OriginSlide key="3" />,
    <BusinessFieldsSlide key="4" />,
    <AiLabSlide key="5" />,
    <CeoMessageSlide key="6" />,
    <CompanyProfileSlide key="7" />,
    <ContactSlide key="8" />,
  ],
};
