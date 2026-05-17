import type { PresentationEntry } from '../registry';

function TitleSlide() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center text-white p-16">
      <div className="text-center">
        <div className="text-7xl mb-6">📊</div>
        <h1 className="text-6xl font-bold mb-4">PresentHub</h1>
        <p className="text-2xl opacity-80 mb-8">プレゼンテーション管理システム</p>
        <div className="w-32 h-1 bg-white/40 mx-auto rounded-full" />
      </div>
    </div>
  );
}

function ProblemSlide() {
  const problems = [
    { icon: '📁', text: 'ファイルが散在して管理が煩雑になる' },
    { icon: '🔗', text: '共有が難しく、チーム連携がスムーズでない' },
    { icon: '🔍', text: '必要な資料をすぐに見つけられない' },
  ];
  return (
    <div className="w-full h-full bg-white flex flex-col p-14">
      <div className="mb-8">
        <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">Problem</span>
        <h2 className="text-4xl font-bold text-gray-800 mt-2">従来のプレゼン管理の問題</h2>
      </div>
      <div className="flex-1 flex flex-col gap-5 justify-center">
        {problems.map((p, i) => (
          <div key={i} className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-4xl">{p.icon}</div>
            <p className="text-xl text-gray-700">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionSlide() {
  const features = [
    { icon: '🗂️', title: '一元管理', desc: 'すべてのプレゼン資料を一か所で管理' },
    { icon: '👥', title: 'チーム共有', desc: '権限管理付きで安全に共有' },
    { icon: '⚡', title: '即時閲覧', desc: 'ブラウザ上でそのまま閲覧可能' },
    { icon: '📂', title: 'フォルダ整理', desc: 'プロジェクトごとに整理できる' },
  ];
  return (
    <div className="w-full h-full bg-gradient-to-br from-violet-50 to-pink-50 flex flex-col p-14">
      <div className="mb-8">
        <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">Solution</span>
        <h2 className="text-4xl font-bold text-gray-800 mt-2">PresentHubの特徴</h2>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-5">
        {features.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-violet-100 flex flex-col gap-3">
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksSlide() {
  const steps = [
    { num: '01', title: '資料を依頼', desc: 'Claude AIに「○○の資料を作成して」と指示するだけ' },
    { num: '02', title: '自動表示', desc: '作成した資料がダッシュボードに即座に反映される' },
    { num: '03', title: 'フォルダ整理', desc: 'メニューから任意のフォルダへ移動できる' },
    { num: '04', title: 'チームと共有', desc: '招待リンクでメンバーと安全に共有する' },
  ];
  return (
    <div className="w-full h-full bg-white flex flex-col p-14">
      <div className="mb-8">
        <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">How it works</span>
        <h2 className="text-4xl font-bold text-gray-800 mt-2">使い方</h2>
      </div>
      <div className="flex-1 flex items-center">
        <div className="w-full grid grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="text-4xl font-bold text-violet-200">{step.num}</div>
              <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" />
              <h3 className="text-base font-bold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClosingSlide() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center text-white p-16">
      <div className="text-center">
        <div className="text-6xl mb-8">🚀</div>
        <h2 className="text-5xl font-bold mb-4">今すぐ始めましょう</h2>
        <p className="text-xl opacity-80 mb-10">プレゼン管理をもっとスマートに</p>
        <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/30">
          <p className="text-lg font-semibold">PresentHub — Powered by Claude AI</p>
        </div>
      </div>
    </div>
  );
}

export const demoPresentation: PresentationEntry = {
  meta: {
    id: 'demo',
    title: 'PresentHub 機能紹介',
    description: 'PresentHubの特徴と使い方',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    author: 'Claude',
    createdAt: '2026-05-13',
  },
  slides: [
    <TitleSlide key="1" />,
    <ProblemSlide key="2" />,
    <SolutionSlide key="3" />,
    <HowItWorksSlide key="4" />,
    <ClosingSlide key="5" />,
  ],
};
