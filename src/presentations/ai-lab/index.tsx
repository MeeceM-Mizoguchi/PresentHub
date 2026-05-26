import {
  Rocket, Zap, Cpu, Code, Layers, TrendingUp, TrendingDown,
  Clock, Users, Building2, CheckCircle2, ArrowRight, Lightbulb,
  Shield, Server, Sparkles, Brain, Briefcase,
  AlertTriangle, Target, MessageSquare, Star, Bot, Eye,
  Globe, GitBranch, BarChart3, Package
} from 'lucide-react';
import type { PresentationEntry } from '../registry';

/* =====================================================================
   SLIDE 1: TITLE / COVER
   ===================================================================== */
const Slide1 = (
  <div key="s1" className="w-full h-[720px] relative overflow-hidden bg-white">
    {/* Grid background */}
    <div className="absolute inset-0" style={{
      backgroundImage: 'linear-gradient(rgba(99,102,241,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.035) 1px, transparent 1px)',
      backgroundSize: '44px 44px'
    }} />
    {/* Gradient orbs */}
    <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)' }} />
    <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)' }} />

    <div className="absolute inset-0 flex" style={{ padding: '52px 72px' }}>
      {/* LEFT: Content */}
      <div className="flex flex-col justify-between flex-1 pr-16">
        {/* Top brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.2em' }}>MEECE AI LAB</span>
        </div>

        {/* Center: Main title */}
        <div>
          <div className="inline-flex items-center gap-2 mb-8" style={{
            padding: '7px 20px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.09), rgba(139,92,246,0.09))',
            border: '1px solid rgba(99,102,241,0.22)',
            borderRadius: '100px'
          }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#4F46E5' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.32em' }}>AI DRIVEN DEVELOPMENT</span>
          </div>

          <h1 style={{ fontSize: '88px', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '22px' }}>
            <span style={{ color: '#0F172A' }}>AI開発</span><span style={{
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 45%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>ラボ</span>
          </h1>

          <div style={{ width: '56px', height: '4px', background: 'linear-gradient(to right, #4F46E5, #7C3AED)', borderRadius: '2px', marginBottom: '26px' }} />

          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.8, fontWeight: 500, maxWidth: '400px' }}>
            AIが駆動する次世代開発メソッドで<br />
            従来のSI業界の常識を塗り替える、<br />
            Meeceの戦略的新事業詳細説明書
          </p>
        </div>

        {/* Bottom: Meta info */}
        <div className="flex items-center gap-8 pt-5" style={{ borderTop: '1px solid #E5E7EB' }}>
          {[
            { label: 'PRESENTED BY', value: 'Meece株式会社' },
            { label: 'CATEGORY', value: '新事業・戦略的業務拡大' },
            { label: 'VERSION', value: '2026年度版' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-8">
              {i > 0 && <div style={{ width: '1px', height: '32px', background: '#E5E7EB', marginRight: '-16px' }} />}
              <div>
                <div style={{ fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.25em', fontWeight: 700, marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: '#1F2937', fontWeight: 800 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: AI network SVG */}
      <div className="w-[340px] flex items-center justify-center">
        <svg viewBox="0 0 340 400" width="320" height="380" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="tg-main" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </radialGradient>
            <filter id="tg-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Orbital rings */}
          <circle cx="170" cy="200" r="108" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
          <circle cx="170" cy="200" r="134" fill="none" stroke="rgba(99,102,241,0.05)" strokeWidth="1" />
          {/* Connecting lines */}
          <line x1="170" y1="144" x2="170" y2="72" stroke="#4F46E5" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
          <line x1="170" y1="256" x2="170" y2="332" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
          <line x1="124" y1="177" x2="79" y2="152" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
          <line x1="216" y1="177" x2="261" y2="152" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
          {/* Center AI Lab node */}
          <circle cx="170" cy="200" r="56" fill="url(#tg-main)" filter="url(#tg-glow)" />
          <circle cx="170" cy="200" r="56" fill="none" stroke="white" strokeWidth="1.5" opacity="0.25" strokeDasharray="4 5" />
          <text x="170" y="194" textAnchor="middle" fontSize="12" fill="white" fontWeight="900" letterSpacing="1.5">AI LAB</text>
          <text x="170" y="212" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.75)">Meece</text>
          {/* Claude node — top */}
          <circle cx="170" cy="44" r="28" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2" />
          <text x="170" y="41" textAnchor="middle" fontSize="8.5" fill="#4338CA" fontWeight="800">Claude</text>
          <text x="170" y="53" textAnchor="middle" fontSize="7" fill="#6366F1">設計・要件</text>
          {/* Gemini node — bottom */}
          <circle cx="170" cy="360" r="28" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
          <text x="170" y="357" textAnchor="middle" fontSize="8.5" fill="#047857" fontWeight="800">Gemini</text>
          <text x="170" y="369" textAnchor="middle" fontSize="7" fill="#10B981">コード実装</text>
          {/* GPT-4o node — left */}
          <circle cx="50" cy="130" r="28" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" />
          <text x="50" y="127" textAnchor="middle" fontSize="8.5" fill="#B45309" fontWeight="800">GPT-4o</text>
          <text x="50" y="139" textAnchor="middle" fontSize="7" fill="#F59E0B">レビュー</text>
          {/* Cursor node — right */}
          <circle cx="290" cy="130" r="28" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" />
          <text x="290" y="127" textAnchor="middle" fontSize="8.5" fill="#7E22CE" fontWeight="800">Cursor</text>
          <text x="290" y="139" textAnchor="middle" fontSize="7" fill="#A855F7">AI IDE</text>
        </svg>
      </div>
    </div>

    {/* Right accent stripe */}
    <div className="absolute right-0 top-0 bottom-0 w-1.5" style={{ background: 'linear-gradient(to bottom, #4F46E5, #7C3AED, #A855F7)' }} />
  </div>
);

/* =====================================================================
   SLIDE 2: MARKET PROBLEM — 投資判断のジレンマ
   ===================================================================== */
const Slide2 = (
  <div key="s2" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FAFBFF 0%, #F5F3FF 100%)' }}>
    <div className="absolute top-0 right-0 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)' }} />

    <div className="relative z-10 h-full flex flex-col" style={{ padding: '36px 64px' }}>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-1 rounded" style={{ background: 'linear-gradient(to right, #EF4444, #F97316)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#EF4444', letterSpacing: '0.3em' }}>MARKET PROBLEM</span>
        </div>
        <h2 style={{ fontSize: '34px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
          市場の課題と<span style={{ color: '#4F46E5' }}>AIラボ</span>立ち上げの背景
        </h2>
      </div>

      {/* Main: Large market coverage visualization */}
      <div className="flex gap-6 flex-1">
        {/* LEFT: Big SVG market map */}
        <div className="flex-1 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col">
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#374151', marginBottom: '6px' }}>投資規模 × 供給者カバレッジのマップ</div>
          <div className="flex-1">
            <svg viewBox="0 0 500 310" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mp-ailab" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="mp-gap" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="100%" stopColor="#FFFBEB" />
                </linearGradient>
              </defs>
              {/* Y axis label */}
              <text x="8" y="28" fontSize="8" fill="#9CA3AF" fontWeight="700" transform="rotate(-90 8 28)" textAnchor="middle">供給カバレッジ</text>
              {/* X axis label */}
              <text x="280" y="305" textAnchor="middle" fontSize="8.5" fill="#9CA3AF" fontWeight="700">投資規模（予算）</text>
              {/* Grid */}
              {[0,1,2,3].map(i => (
                <line key={i} x1="44" y1={44 + i * 56} x2="490" y2={44 + i * 56} stroke="#F1F5F9" strokeWidth="1" />
              ))}
              {/* X axis band labels */}
              <text x="78"  y="288" textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="600">〜1千万</text>
              <text x="155" y="288" textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="600">〜3千万</text>
              <text x="240" y="288" textAnchor="middle" fontSize="8" fill="#D97706" fontWeight="700">5千万〜1億</text>
              <text x="360" y="288" textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="600">1〜3億</text>
              <text x="455" y="288" textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="600">3億以上</text>
              {/* Y axis ticks */}
              <text x="40" y="275" textAnchor="end" fontSize="8" fill="#9CA3AF">低</text>
              <text x="40" y="100" textAnchor="end" fontSize="8" fill="#9CA3AF">高</text>
              {/* 中小SIer */}
              <rect x="48" y="184" width="132" height="84" rx="6" fill="#CBD5E1" opacity="0.55" />
              <text x="114" y="222" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="800">中小SIer</text>
              <text x="114" y="235" textAnchor="middle" fontSize="8" fill="#64748B">〜3千万のみ対応</text>
              <text x="114" y="248" textAnchor="middle" fontSize="7.5" fill="#94A3B8">品質・スピードに課題</text>
              {/* 大手SIer */}
              <rect x="296" y="52" width="194" height="216" rx="6" fill="#C7D2FE" opacity="0.6" />
              <text x="393" y="150" textAnchor="middle" fontSize="9" fill="#3730A3" fontWeight="800">大手SIer / SaaS</text>
              <text x="393" y="164" textAnchor="middle" fontSize="8" fill="#4338CA">1億円〜に特化</text>
              <text x="393" y="177" textAnchor="middle" fontSize="8" fill="#6366F1">対応力◎ 品質◎</text>
              {/* GAP ZONE */}
              <rect x="180" y="100" width="116" height="168" rx="8" fill="url(#mp-gap)" stroke="#FDE68A" strokeWidth="2" strokeDasharray="6 3" />
              <text x="238" y="162" textAnchor="middle" fontSize="11" fill="#D97706" fontWeight="900">空白地帯</text>
              <text x="238" y="177" textAnchor="middle" fontSize="8" fill="#B45309">5千万〜1億</text>
              <text x="238" y="190" textAnchor="middle" fontSize="8" fill="#92400E">受け手がいない</text>
              <text x="238" y="210" textAnchor="middle" fontSize="16" fill="#F59E0B">⚠</text>
              {/* 需要バブル */}
              <circle cx="238" cy="240" r="16" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5" />
              <text x="238" y="236" textAnchor="middle" fontSize="7" fill="#92400E" fontWeight="800">需要</text>
              <text x="238" y="247" textAnchor="middle" fontSize="7" fill="#92400E" fontWeight="800">大！</text>
              {/* AI LAB */}
              <rect x="48" y="52" width="442" height="42" rx="10" fill="url(#mp-ailab)" />
              <text x="269" y="70" textAnchor="middle" fontSize="11" fill="white" fontWeight="900">AI開発ラボ — 全規模に対応可能</text>
              <text x="269" y="85" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.85)">〜1千万の小規模から大型案件まで、AIで採算を確保しながら全域をカバー</text>
              {/* X axis line */}
              <line x1="44" y1="270" x2="490" y2="270" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="120" y1="265" x2="120" y2="275" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="186" y1="265" x2="186" y2="275" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="296" y1="265" x2="296" y2="275" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="416" y1="265" x2="416" y2="275" stroke="#CBD5E1" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* RIGHT: Problem cards + solution */}
        <div className="w-[280px] flex flex-col gap-4">
          <div className="flex-1 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EEF2FF' }}>
                <TrendingUp className="w-4 h-4" style={{ color: '#4F46E5' }} />
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.2em', marginBottom: '3px' }}>PROBLEM 01</div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A', lineHeight: 1.3 }}>汎用型SaaSの投資判断ジレンマ</h3>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.7 }}>
              SaaSは<strong style={{ color: '#1F2937' }}>1.5億円超の大規模投資</strong>は承認が下りにくい構造。「欲しいが買えない」企業が多数存在します。
            </p>
          </div>

          <div className="flex-1 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FEF2F2' }}>
                <Building2 className="w-4 h-4" style={{ color: '#EF4444' }} />
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#EF4444', letterSpacing: '0.2em', marginBottom: '3px' }}>PROBLEM 02</div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A', lineHeight: 1.3 }}>SIerの「ちょうどいい」がない空白</h3>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.7 }}>
              大手SIerは<strong style={{ color: '#1F2937' }}>1億円以上しか採算が合わず</strong>、5千万〜1億の案件は失注。強い需要があるのに供給がない構造的空白が発生。
            </p>
          </div>

          <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: 'white' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', opacity: 0.8 }}>THE SOLUTION</div>
            </div>
            <p style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.65 }}>AIラボはこの<strong>「空白市場」</strong>を起点に、小規模から大規模まで全域をAI活用で採算確保しながら制覇します</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* =====================================================================
   SLIDE 3: CORE STRATEGY — 基幹はそのまま、フロントをAIで刷新
   ===================================================================== */
const Slide3 = (
  <div key="s3" className="w-full h-[720px] relative overflow-hidden bg-white">
    <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)' }} />
    <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

    <div className="relative z-10 h-full flex flex-col" style={{ padding: '48px 72px' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-1 rounded" style={{ background: 'linear-gradient(to right, #10B981, #4F46E5)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#10B981', letterSpacing: '0.3em' }}>CORE STRATEGY</span>
        </div>
        <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          既存基幹を活かした<br />
          <span style={{ color: '#4F46E5' }}>「基幹維持＋AIフロント刷新」</span>の基本戦略
        </h2>
      </div>

      {/* 3-layer architecture */}
      <div className="flex gap-5 flex-1">
        {/* Layer diagram (SVG) */}
        <div className="w-[380px] flex-shrink-0">
          <svg viewBox="0 0 360 420" width="360" height="420" xmlns="http://www.w3.org/2000/svg">
            {/* Layer 1: 基幹システム */}
            <rect x="10" y="270" width="340" height="90" rx="16" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            <text x="42" y="308" fontSize="15" fill="#334155" fontWeight="900">基幹システム</text>
            <text x="42" y="326" fontSize="11" fill="#64748B" fontWeight="500">（既存の堅牢なデータ群）</text>
            <text x="42" y="344" fontSize="10" fill="#94A3B8">全社展開スタッフ ・ 会計データ ・ マスターデータ</text>
            <text x="290" y="320" fontSize="28" fill="#94A3B8" opacity="0.4">🔒</text>

            {/* Arrow up */}
            <line x1="180" y1="268" x2="180" y2="218" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#strat-arr)" />
            <rect x="120" y="236" width="120" height="22" rx="11" fill="white" stroke="#E2E8F0" strokeWidth="1" />
            <text x="180" y="251" textAnchor="middle" fontSize="9" fill="#64748B" fontWeight="700">API連携</text>

            {/* Layer 2: AI LAB LINK */}
            <rect x="10" y="130" width="340" height="80" rx="16" fill="url(#strat-link-grad)" stroke="#6366F1" strokeWidth="2" />
            <text x="180" y="163" textAnchor="middle" fontSize="15" fill="white" fontWeight="900">AI LAB LINK</text>
            <text x="180" y="182" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.8)">既存基幹と新フロントエンドをつなぐ連携レイヤー</text>
            <circle cx="30" cy="170" r="8" fill="rgba(255,255,255,0.2)" />
            <circle cx="330" cy="170" r="8" fill="rgba(255,255,255,0.2)" />

            {/* Arrow up */}
            <line x1="180" y1="128" x2="180" y2="88" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#strat-arr-i)" />

            {/* Layer 3: 業務フロントエンド */}
            <rect x="10" y="10" width="340" height="72" rx="16" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
            <text x="42" y="43" fontSize="14" fill="#065F46" fontWeight="900">業務フロントエンド</text>
            <text x="42" y="62" fontSize="11" fill="#059669" fontWeight="500">AIラボで新規製作 — 最新UI/UXへ刷新</text>
            <circle cx="320" cy="46" r="20" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1.5" />
            <text x="320" y="43" textAnchor="middle" fontSize="9" fill="#065F46" fontWeight="800">AI</text>
            <text x="320" y="55" textAnchor="middle" fontSize="8" fill="#059669">製作</text>

            <defs>
              <linearGradient id="strat-link-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
              <marker id="strat-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#CBD5E1" />
              </marker>
              <marker id="strat-arr-i" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#4F46E5" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Right: explanations */}
        <div className="flex-1 flex flex-col gap-4">
          {[
            {
              num: '01', color: '#94A3B8', bg: '#F8FAFC', border: '#E2E8F0',
              title: '基幹システム — そのまま維持',
              body: '全社展開された基幹や会計データなど「組織の骨格」となる堅牢なデータ群には手をつけません。触ると甚大なコストとリスクが発生するため、既存のまま活用します。',
              tags: ['コスト最小化', 'リスクゼロ', '既存資産活用'],
              tagColors: ['#64748B', '#64748B', '#64748B'],
            },
            {
              num: '02', color: '#4F46E5', bg: '#F0F4FF', border: '#C7D2FE',
              title: 'AI LAB LINK — AI開発でつなぐ',
              body: '既存の基幹システムと新しく作る業務フロントエンドをつなぐAPIの連携部分をAIラボで開発。ここがコストを抑えながら価値を最大化するカギになります。',
              tags: ['API連携', 'AI開発', '高速実装'],
              tagColors: ['#4F46E5', '#4F46E5', '#4F46E5'],
            },
            {
              num: '03', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0',
              title: '業務フロントエンド — AIで刷新',
              body: '現場社員が毎日触るフロント（見積・発注・案件管理など）をAIラボを用いて最新のUI/UXへ一新。開発コストを最大60%削減しながら、現場の利便性を飛躍的に向上させます。',
              tags: ['UI/UX刷新', '60%コスト削減', '2日で完成'],
              tagColors: ['#10B981', '#10B981', '#10B981'],
            },
          ].map((item) => (
            <div key={item.num} className="rounded-2xl p-5 border" style={{ background: item.bg, borderColor: item.border }}>
              <div className="flex items-start gap-3 mb-2">
                <div className="text-xs font-black rounded-full px-2 py-0.5 mt-0.5" style={{ color: item.color, background: 'white', border: `1px solid ${item.border}` }}>{item.num}</div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1F2937' }}>{item.title}</h4>
              </div>
              <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.7, marginBottom: '10px' }}>{item.body}</p>
              <div className="flex gap-2 flex-wrap">
                {item.tags.map((tag, ti) => (
                  <span key={ti} className="text-xs font-bold rounded-full px-2.5 py-0.5" style={{ color: item.tagColors[ti], background: 'white', border: `1px solid ${item.border}` }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* =====================================================================
   SLIDE 4: 3 KEY ADVANTAGES
   ===================================================================== */
const Slide4 = (
  <div key="s4" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FAFBFF 0%, #F5F3FF 50%, #FFF7ED 100%)' }}>
    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

    <div className="relative z-10 h-full flex flex-col" style={{ padding: '48px 72px' }}>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-1 rounded" style={{ background: 'linear-gradient(to right, #4F46E5, #F59E0B)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.3em' }}>COMPETITIVE ADVANTAGE</span>
        </div>
        <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
          従来型SIを凌駕する<span style={{ color: '#4F46E5' }}>3つの決定的優位性</span>
        </h2>
      </div>

      {/* 3 big metric cards */}
      <div className="grid grid-cols-3 gap-6 flex-1">
        {[
          {
            number: '60%', unit: '削減',
            label: 'コスト＆時間',
            sublabel: '従来3ヶ月 → 約2週間',
            desc: 'AIを開発工程の80%に導入。設計から実装・テストまで自動化することで、従来比約60%のコスト・期間削減を実現します。',
            icon: TrendingDown,
            gradient: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            bg: '#F0F4FF',
            accent: '#4F46E5',
            light: '#EEF2FF',
          },
          {
            number: '8割', unit: 'AI代行',
            label: '作業をAIが担当',
            sublabel: '少人数で高品質を実現',
            desc: '単純作業・繰り返し実装の約8割をAIが代行。優秀なエンジニアを採用に頼らず、少人数でも高収益なプロジェクト体制を構築できます。',
            icon: Bot,
            gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)',
            bg: '#F5F3FF',
            accent: '#7C3AED',
            light: '#FAF5FF',
          },
          {
            number: '2日', unit: '完成',
            label: 'フロントエンド実装',
            sublabel: 'プロトタイプ駆動の商談',
            desc: '仕様まとめから動く画面まで約2日で完成。競合が仕様書を作っている間に稼働URLを発行し、先行者利益を確保します。',
            icon: Rocket,
            gradient: 'linear-gradient(135deg, #F59E0B, #F97316)',
            bg: '#FFFBEB',
            accent: '#D97706',
            light: '#FEF9C3',
          },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl overflow-hidden border shadow-sm flex flex-col" style={{ borderColor: `${item.accent}33`, background: 'white' }}>
            {/* Top gradient bar */}
            <div className="h-2" style={{ background: item.gradient }} />
            <div className="flex-1 p-7 flex flex-col">
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: item.light }}>
                <item.icon className="w-6 h-6" style={{ color: item.accent }} />
              </div>
              {/* Big number */}
              <div className="mb-2">
                <span style={{
                  fontSize: '72px',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  background: item.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>{item.number}</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: item.accent, marginLeft: '4px' }}>{item.unit}</span>
              </div>
              {/* Label */}
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#1F2937', marginBottom: '4px' }}>{item.label}</div>
              <div className="inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full" style={{ background: item.bg, width: 'fit-content' }}>
                <CheckCircle2 className="w-3 h-3" style={{ color: item.accent }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: item.accent }}>{item.sublabel}</span>
              </div>
              {/* Description */}
              <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.75 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: Prototype advantage */}
      <div className="mt-6 rounded-2xl p-5 flex items-center gap-5" style={{ background: 'linear-gradient(135deg, #0F172A, #1E1B4B)', color: 'white' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.3)' }}>
          <Target className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.2em', color: '#A5B4FC', marginBottom: '3px' }}>BONUS — プロトタイプ駆動の商談</div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>仕様書ではなく<strong style={{ color: '#FCD34D' }}>「実際に動く画面」</strong>をお客様に提示して仕様を決める — 「思ってたのと違う」リスクを完全に排除し、商談成功率・顧客満足度を圧倒的に高めます。</p>
        </div>
      </div>
    </div>
  </div>
);

/* =====================================================================
   SLIDE 5: AI TECH STACK
   ===================================================================== */
const Slide5 = (
  <div key="s5" className="w-full h-[720px] relative overflow-hidden bg-white">
    <div className="absolute top-0 right-0 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />
    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)' }} />

    <div className="relative z-10 h-full flex flex-col" style={{ padding: '48px 72px' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-1 rounded" style={{ background: 'linear-gradient(to right, #4F46E5, #10B981)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.3em' }}>AI TECHNOLOGY STACK</span>
        </div>
        <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
          独自AI開発メソッドと<span style={{ color: '#4F46E5' }}>テクノロジースタック</span>
        </h2>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>単一のAIに依存せず、最適なAIを適材適所で組み合わせた高度なワークフロー</p>
      </div>

      {/* AI Model cards - 3x2 grid */}
      <div className="grid grid-cols-3 gap-4 flex-1">
        {[
          {
            name: 'Claude 3.5 Sonnet', maker: 'Anthropic',
            role: '設計・要件定義・プロンプト設計',
            desc: 'ヒアリング内容からの要件抽出、プロンプト設計、論理的な整理を担当。複雑な業務ロジックを精密に言語化します。',
            tags: ['要件抽出', 'プロンプト設計'],
            color: '#4F46E5', bg: '#EEF2FF', border: '#C7D2FE', logo: '🤖',
          },
          {
            name: 'ChatGPT (GPT-4o)', maker: 'OpenAI',
            role: 'レビュー・仕様書・整合性チェック',
            desc: '仕様やコードの論理的な矛盾・整合性チェック、精巧なレビューコメントを担当します。',
            tags: ['コードレビュー', '整合性確認'],
            color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', logo: '💬',
          },
          {
            name: 'Meece Design AI', maker: 'Meece',
            role: 'UI/UXデザイン設計・プロトタイプ生成',
            desc: 'AIがプロンプトからUI/UXデザインを自動生成。デザイン〜コード連携までを一気通貫で実現する独自AIデザインメソッドです。',
            tags: ['UI/UX設計', 'デザイン自動生成'],
            color: '#E11D48', bg: '#FFF1F2', border: '#FECDD3', logo: '🎨',
          },
          {
            name: 'Gemini 1.5 Pro', maker: 'Google',
            role: '高速コード生成・コンポーネント設計',
            desc: '確定した仕様を基にフロントエンドコードを高速生成。デザイン構造やコンポーネント実装の核心を担います。',
            tags: ['コード生成', 'UI実装'],
            color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', logo: '✨',
          },
          {
            name: 'Cursor (AI IDE)', maker: 'Anysphere',
            role: 'AIとの対話・超高速コーディング',
            desc: 'AIと対話しながらリアルタイムでコーディングする次世代IDE。AI駆動超高速開発の中核となるツールです。',
            tags: ['AI対話', 'ペアプログラミング'],
            color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', logo: '⚡',
          },
          {
            name: 'GitHub Copilot', maker: 'GitHub / Microsoft',
            role: '開発補助・コード補完・自動テスト',
            desc: 'コーディング中のリアルタイム補完から自動テスト生成まで。開発者の生産性を飛躍的に向上させるAI開発アシスタントです。',
            tags: ['コード補完', '自動テスト生成'],
            color: '#0F172A', bg: '#F8FAFC', border: '#CBD5E1', logo: '🐙',
          },
        ].map((ai) => (
          <div key={ai.name} className="rounded-2xl p-5 border flex flex-col" style={{ background: ai.bg, borderColor: ai.border }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: 'white', border: `1.5px solid ${ai.border}` }}>
                {ai.logo}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#1F2937', lineHeight: 1.3 }}>{ai.name}</div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280' }}>by {ai.maker}</div>
              </div>
            </div>
            <div className="mb-3 px-2.5 py-1 rounded-lg" style={{ background: `${ai.color}15`, border: `1px solid ${ai.border}` }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: ai.color }}>役割：{ai.role}</span>
            </div>
            <p style={{ fontSize: '11.5px', color: '#4B5563', lineHeight: 1.65, flex: 1 }}>{ai.desc}</p>
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {ai.tags.map((tag) => (
                <span key={tag} className="text-xs font-bold rounded-full px-2 py-0.5" style={{ color: ai.color, background: 'white', border: `1px solid ${ai.border}` }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* =====================================================================
   SLIDE 6: DEVELOPMENT WORKFLOW — フロントエンドを2日で完了
   ===================================================================== */
const Slide6 = (
  <div key="s6" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#F8FAFC' }}>
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

    <div className="relative z-10 h-full flex flex-col" style={{ padding: '48px 72px' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-1 rounded" style={{ background: 'linear-gradient(to right, #7C3AED, #4F46E5)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#7C3AED', letterSpacing: '0.3em' }}>DEVELOPMENT WORKFLOW</span>
        </div>
        <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
          フロントエンド開発の流れ<span style={{ color: '#7C3AED' }}>（約2日で完了）</span>
        </h2>
      </div>

      {/* Workflow steps */}
      {(() => {
        const steps = [
          { step: '01', time: 'Day 1 AM', icon: MessageSquare, title: '仕様まとめ', sub: 'ヒアリング→要件化', color: '#4F46E5', gradient: 'linear-gradient(135deg, #4F46E5, #6366F1)', bg: '#EEF2FF', desc: 'ヒアリング内容をGeminiに入力し詳細仕様として整理。曖昧な要望も構造化された仕様書へ変換します。' },
          { step: '02', time: 'Day 1 PM', icon: Eye, title: 'レビュー', sub: '論理的な矛盾チェック', color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)', bg: '#F5F3FF', desc: '整理した仕様をChatGPTで論理矛盾・整合性をレビュー。仕様の穴を事前に潰します。' },
          { step: '03', time: 'Day 1–2', icon: Code, title: 'AI開発', sub: '高速コード実装', color: '#059669', gradient: 'linear-gradient(135deg, #059669, #10B981)', bg: '#ECFDF5', desc: '確定仕様を基にGemini+Cursorで高速コード実装。フロントエンド全体を2日以内に形にします。' },
          { step: '04', time: 'Day 2 PM', icon: CheckCircle2, title: '最終確認', sub: '人間によるチェック', color: '#D97706', gradient: 'linear-gradient(135deg, #D97706, #F59E0B)', bg: '#FFFBEB', desc: '初めて「人」がレビュー。要件通りか目視・動作確認し、品質を担保します。' },
          { step: '05', time: 'Day 2', icon: Globe, title: '引き渡し', sub: '稼働URLを発行', color: '#EF4444', gradient: 'linear-gradient(135deg, #EF4444, #F97316)', bg: '#FEF2F2', desc: 'バックエンドとの連携へ。稼働URLをお客様に即日提供し商談を加速します。' },
        ];
        return (
          <div className="flex flex-col flex-1">
            {/* ── Row 1: 番号を各カードの真ん中に配置 ── */}
            <div className="flex gap-4 mb-3">
              {steps.map((s, i) => (
                <div key={s.step} className="flex-1 relative flex justify-center">
                  {/* 左コネクター（ギャップ分 -8px で隙間を埋める） */}
                  {i > 0 && (
                    <div className="absolute top-1/2 h-0.5 -translate-y-1/2"
                         style={{ left: '-8px', right: '50%', background: `linear-gradient(to right, ${steps[i-1].color}50, ${s.color}50)` }} />
                  )}
                  {/* 右コネクター */}
                  {i < 4 && (
                    <div className="absolute top-1/2 h-0.5 -translate-y-1/2"
                         style={{ left: '50%', right: '-8px', background: `linear-gradient(to right, ${s.color}50, ${steps[i+1].color}40)` }} />
                  )}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shadow-md relative z-10 flex-shrink-0"
                       style={{ background: s.gradient }}>{s.step}</div>
                </div>
              ))}
            </div>
            {/* ── Row 2: カード（gap-4 で Row 1 と幅を合わせる） ── */}
            <div className="flex gap-4 flex-1">
              {steps.map((s) => (
                <div key={s.step} className="flex-1 rounded-3xl border-2 flex flex-col overflow-hidden" style={{ borderColor: `${s.color}35`, background: 'white' }}>
                  <div className="h-1.5 w-full" style={{ background: s.gradient }} />
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <div className="flex justify-center">
                      <div className="text-xs font-black px-3 py-1 rounded-full" style={{ background: s.bg, color: s.color }}>{s.time}</div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto" style={{ background: s.bg }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <div className="text-center">
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#1F2937' }}>{s.title}</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: s.color, marginTop: '2px' }}>{s.sub}</div>
                    </div>
                    <p style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.6, textAlign: 'center', flex: 1 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Bottom: AI documentation bonus */}
      <div className="mt-4 rounded-2xl p-5 flex items-center gap-5" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: 'white' }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div style={{ fontSize: '14px', fontWeight: 900, color: 'white', marginBottom: '4px' }}>AIが設計書・完了報告書も自動生成</div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            実装と並行して設計書・完了報告書などのドキュメントも自動生成。<strong style={{ color: '#FCD34D' }}>エンジニアは開発そのものに100%集中</strong>でき、品質とスピードを両立します。
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          {['設計書', '完了報告書', 'API仕様書'].map((doc) => (
            <div key={doc} className="rounded-xl px-4 py-2.5 text-center bg-white/15 border border-white/25">
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#FCD34D' }}>AUTO</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'white' }}>{doc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* =====================================================================
   SLIDE 7: INFRASTRUCTURE STRATEGY
   ===================================================================== */
const Slide7 = (
  <div key="s7" className="w-full h-[720px] relative overflow-hidden bg-white">
    <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />
    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />

    <div className="relative z-10 h-full flex flex-col" style={{ padding: '48px 72px' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-1 rounded" style={{ background: 'linear-gradient(to right, #4F46E5, #F59E0B)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.3em' }}>INFRASTRUCTURE STRATEGY</span>
        </div>
        <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
          インフラ戦略<span style={{ color: '#4F46E5' }}>— Vercel × サーバーレス基盤</span>
        </h2>
      </div>

      {/* Two-phase layout */}
      <div className="flex gap-6 flex-1">
        {/* Phase 1 */}
        <div className="flex-1 rounded-3xl border-2 border-indigo-200 overflow-hidden flex flex-col" style={{ background: '#F8FAFF' }}>
          <div className="px-7 py-5" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-black">1</div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.2em' }}>PHASE 1 — 検証とスプリントローンチ</span>
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: 'white' }}>Vercel</h3>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '4px' }}>フロントエンドに特化したサーバーレス基盤</p>
          </div>

          <div className="flex-1 p-7 flex flex-col gap-4">
            {/* Vercel features */}
            {[
              { icon: Zap, title: '物理サーバー構築が不要', desc: '煩雑な設定なしにコードを反映した瞬間に世界中のエッジネットワークで配信' },
              { icon: Globe, title: 'コード修正ごとに検証URLが自動発行', desc: 'お客様とのプロトタイプ確認が極めてスムーズに行えます' },
              { icon: Shield, title: 'インフラの保守運用コストはほぼゼロ', desc: 'アプリ開発に100%集中できる環境' },
            ].map((f) => (
              <div key={f.title} className="flex gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EEF2FF' }}>
                  <f.icon className="w-4 h-4" style={{ color: '#4F46E5' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#1F2937' }}>{f.title}</div>
                  <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}

            <div className="mt-auto rounded-xl p-3" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
              <p style={{ fontSize: '12px', color: '#3730A3', fontWeight: 600 }}>
                ✓ 小〜中規模システムに最適。検証フェーズからの爆速ローンチが得意
              </p>
            </div>
          </div>
        </div>

        {/* Arrow between phases */}
        <div className="flex flex-col items-center justify-center gap-2 w-20 flex-shrink-0">
          <div className="text-xs font-black text-slate-400 tracking-wider" style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>スケール時に移行</div>
          <ArrowRight className="w-6 h-6 text-slate-300" />
        </div>

        {/* Phase 2 */}
        <div className="flex-1 rounded-3xl border-2 border-amber-200 overflow-hidden flex flex-col" style={{ background: '#FFFEF8' }}>
          <div className="px-7 py-5" style={{ background: 'linear-gradient(135deg, #D97706, #F59E0B)' }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-black">2</div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.2em' }}>PHASE 2 — 大規模安定運用へ移行</span>
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: 'white' }}>AWS</h3>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '4px' }}>大規模・エンタープライズ向け堅牢インフラ</p>
          </div>

          <div className="flex-1 p-7 flex flex-col gap-4">
            {[
              { icon: Server, title: '複雑なバックエンド処理に対応', desc: 'ロードバランサーやコスト最適化が可能な堅牢なインフラへシームレスに移行' },
              { icon: BarChart3, title: 'アクセス増大に対応するスケール', desc: 'プロジェクト成長期に必要なスケールアウト・高可用性を確保' },
              { icon: Layers, title: 'フルスタック対応', desc: 'Webアプリ・モバイル・ネイティブアプリまで全方位カバー' },
            ].map((f) => (
              <div key={f.title} className="flex gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FEF3C7' }}>
                  <f.icon className="w-4 h-4" style={{ color: '#D97706' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#1F2937' }}>{f.title}</div>
                  <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}

            <div className="mt-auto rounded-xl p-3" style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}>
              <p style={{ fontSize: '12px', color: '#92400E', fontWeight: 600 }}>
                ✓ アクセス数増大・大規模案件でのスケール時に迷わずAWSへ移行
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* =====================================================================
   SLIDE 8: FIGMA MAKE — AI UI/UX DESIGN
   ===================================================================== */
const Slide8 = (
  <div key="s8" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF0F8 0%, #F5F0FF 50%, #F0F4FF 100%)' }}>
    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(232,72,144,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,72,144,0.07) 0%, transparent 70%)' }} />
    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

    <div className="relative z-10 h-full flex flex-col" style={{ padding: '36px 64px' }}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-1 rounded" style={{ background: 'linear-gradient(to right, #E11D48, #7C3AED)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#E11D48', letterSpacing: '0.3em' }}>AI UI/UX DESIGN</span>
        </div>
        <h2 style={{ fontSize: '34px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
          UI/UXデザインは<span style={{ color: '#E11D48' }}>Meece Design AI</span>に任せる時代へ
        </h2>
      </div>

      <div className="flex gap-6 flex-1">
        {/* LEFT: Before/After + benefits */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Before/After comparison */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#374151', marginBottom: '8px' }}>従来 vs Meece Design AI</div>
            <div className="flex gap-4">
              <div className="flex-1 rounded-2xl p-3" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#991B1B', marginBottom: '6px', letterSpacing: '0.1em' }}>BEFORE — 従来の方法</div>
                {['デザイナーがFigmaでデザイン作成', 'エンジニアがSVG/CSSをゼロから手書き', 'デザインとコードの乖離が発生しやすい', '修正のたびにコードを書き直す手間'].map((t, i) => (
                  <div key={i} className="flex gap-2 items-start mb-1">
                    <span style={{ color: '#EF4444', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: '11px', color: '#7F1D1D', lineHeight: 1.4 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 rounded-2xl p-3" style={{ background: '#FFF1F2', border: '1.5px solid #E11D48' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#E11D48', marginBottom: '6px', letterSpacing: '0.1em' }}>AFTER — Meece Design AI</div>
                {['プロンプトを入力するだけでデザイン自動生成', 'デザインから実装用コードを即時出力', 'ブランドガイドラインに沿ったUI一貫性を維持', '修正もプロンプトで即座に反映できる'].map((t, i) => (
                  <div key={i} className="flex gap-2 items-start mb-1">
                    <span style={{ color: '#E11D48', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '11px', color: '#881337', lineHeight: 1.4 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meece Design AI workflow */}
          <div className="flex-1 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#374151', marginBottom: '8px' }}>Meece Design AIのデザインフロー</div>
            <div className="flex flex-col gap-2">
              {[
                { num: '①', title: 'プロンプト入力', desc: '「案件管理画面を作って。カード型でモバイルフレンドリーに」などの自然言語で指示', color: '#E11D48', bg: '#FFF1F2' },
                { num: '②', title: 'AIがデザイン自動生成', desc: 'Meece Design AI がUI全体をデザイン。レイアウト・配色・コンポーネントを即時に出力', color: '#7C3AED', bg: '#F5F3FF' },
                { num: '③', title: 'コード出力・実装へ', desc: 'デザインをReact/Tailwind CSS形式でコード出力。Cursorに貼り付けて即実装完了', color: '#4F46E5', bg: '#EEF2FF' },
              ].map((item) => (
                <div key={item.num} className="flex gap-3 items-start p-3 rounded-xl" style={{ background: item.bg }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-black" style={{ background: item.color }}>{item.num}</div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#1F2937' }}>{item.title}</div>
                    <p style={{ fontSize: '11px', color: '#4B5563', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Visual + Key metrics */}
        <div className="w-[280px] flex flex-col gap-3">
          {/* Meece Design AI visual */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col gap-2 flex-1">
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#374151' }}>Meece Design AI — 自動生成UIの例</div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 flex-1" style={{ minHeight: 0 }}>
              <svg viewBox="0 0 260 280" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                {/* Header bar */}
                <defs>
                  <linearGradient id="fm-h" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <rect width="260" height="44" fill="url(#fm-h)" />
                <circle cx="18" cy="22" r="9" fill="rgba(255,255,255,0.2)" />
                <rect x="36" y="15" width="100" height="14" rx="7" fill="rgba(255,255,255,0.85)" />
                <rect x="220" y="12" width="28" height="20" rx="6" fill="rgba(255,255,255,0.2)" />
                <text x="234" y="26" textAnchor="middle" fontSize="12" fill="white" fontWeight="800">＋</text>
                {/* AI prompt bar */}
                <rect x="10" y="54" width="240" height="28" rx="14" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="1.5" />
                <text x="20" y="72" fontSize="9" fill="#E11D48" fontWeight="700">✦ AIプロンプト: 案件管理カードUI</text>
                <circle cx="238" cy="68" r="8" fill="#E11D48" />
                <text x="238" y="72" textAnchor="middle" fontSize="9" fill="white" fontWeight="800">→</text>
                {/* Card 1 */}
                <rect x="10" y="92" width="114" height="80" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1" />
                <rect x="10" y="92" width="114" height="10" rx="6" fill="#E11D48" />
                <rect x="18" y="112" width="55" height="7" rx="3.5" fill="#FFF1F2" />
                <rect x="18" y="124" width="80" height="5" rx="2.5" fill="#F1F5F9" />
                <rect x="18" y="134" width="65" height="5" rx="2.5" fill="#F1F5F9" />
                <rect x="18" y="148" width="40" height="16" rx="8" fill="#E11D48" />
                <text x="38" y="160" textAnchor="middle" fontSize="8" fill="white" fontWeight="800">詳細</text>
                {/* Card 2 */}
                <rect x="136" y="92" width="114" height="80" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1" />
                <rect x="136" y="92" width="114" height="10" rx="6" fill="#7C3AED" />
                <rect x="144" y="112" width="55" height="7" rx="3.5" fill="#F5F3FF" />
                <rect x="144" y="124" width="80" height="5" rx="2.5" fill="#F1F5F9" />
                <rect x="144" y="134" width="65" height="5" rx="2.5" fill="#F1F5F9" />
                <rect x="144" y="148" width="40" height="16" rx="8" fill="#7C3AED" />
                <text x="164" y="160" textAnchor="middle" fontSize="8" fill="white" fontWeight="800">編集</text>
                {/* Code output section */}
                <rect x="10" y="184" width="240" height="84" rx="12" fill="#0F172A" />
                <text x="20" y="200" fontSize="8" fill="#64748B" fontWeight="700">// Meece Design AI → Code Output</text>
                <text x="20" y="215" fontSize="7.5" fill="#A5F3FC">{'<div className="card">'}</text>
                <text x="28" y="227" fontSize="7.5" fill="#86EFAC">{'  <CardHeader color="rose" />'}</text>
                <text x="28" y="239" fontSize="7.5" fill="#FCD34D">{'  <CardBody title={title} />'}</text>
                <text x="20" y="251" fontSize="7.5" fill="#A5F3FC">{'</div>'}</text>
                <circle cx="240" cy="196" r="8" fill="#10B981" />
                <text x="240" y="200" textAnchor="middle" fontSize="8" fill="white" fontWeight="800">✓</text>
              </svg>
            </div>
          </div>

          {/* Key message */}
          <div className="rounded-3xl p-4 flex flex-col gap-2" style={{ background: 'linear-gradient(135deg, #E11D48, #7C3AED)', color: 'white' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', opacity: 0.8 }}>KEY ADVANTAGE</div>
            <p style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.6 }}>
              デザイン工程を<strong>最大80%短縮</strong>しながら、プロ品質のUI/UXを実現。スピードと品質の両立が可能です。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* =====================================================================
   SLIDE 9: NEW BUSINESS MODEL — 内製化支援
   ===================================================================== */
const Slide9 = (
  <div key="s9" className="w-full h-[720px] relative overflow-hidden bg-white">
    <div className="absolute top-0 right-0 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)' }} />
    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

    <div className="relative z-10 h-full flex flex-col" style={{ padding: '48px 72px' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-1 rounded" style={{ background: 'linear-gradient(to right, #F59E0B, #4F46E5)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#D97706', letterSpacing: '0.3em' }}>NEW BUSINESS MODEL</span>
        </div>
        <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
          新たなビジネスモデル<span style={{ color: '#D97706' }}>「内製化支援」</span>の展開
        </h2>
      </div>

      {/* Comparison */}
      <div className="flex gap-6 mb-6">
        {/* Old model */}
        <div className="flex-1 rounded-3xl border-2 border-slate-200 overflow-hidden">
          <div className="px-6 py-4" style={{ background: '#F1F5F9' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.2em', marginBottom: '4px' }}>従来モデル</div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#475569' }}>外注依存</h3>
          </div>
          <div className="p-6 flex flex-col gap-3">
            {[
              { icon: TrendingUp, text: '開発費用が高額になり続ける', bad: true },
              { icon: Shield, text: 'システムの中身が特定ベンダーにロック', bad: true },
              { icon: Clock, text: '軽微な修正でも見積もり・コストが発生', bad: true },
              { icon: Users, text: 'スピード感が失われ市場機会を逃す', bad: true },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-xl" style={{ background: '#FEF2F2' }}>
                <item.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
                <span style={{ fontSize: '12px', color: '#7F1D1D', fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-16 flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* New model */}
        <div className="flex-1 rounded-3xl border-2 border-amber-300 overflow-hidden">
          <div className="px-6 py-4" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.2em', marginBottom: '4px' }}>Meeceの新モデル</div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'white' }}>内製化支援（副製品支援）</h3>
          </div>
          <div className="p-6 flex flex-col gap-3">
            {[
              { icon: TrendingDown, text: '自社チームでAI開発できるようになりコスト激減' },
              { icon: Cpu, text: '自社の知的財産として技術を完全に獲得' },
              { icon: Zap, text: '「改善したい」と思ったその日に自分たちで実装できる' },
              { icon: Rocket, text: '競合より常に3.5倍速でリリース・改善できる体制' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-xl" style={{ background: '#FEF9C3' }}>
                <item.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} />
                <span style={{ fontSize: '12px', color: '#78350F', fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support journey */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#1F2937', marginBottom: '12px' }}>Meeceの伴走型内製化支援ステップ</div>
        <div className="flex gap-4">
          {[
            { step: '①', title: 'アセスメント', desc: '顧客のITスキルを可視化しチーム設計', color: '#4F46E5' },
            { step: '②', title: '環境構築', desc: 'Cursor・Vercelなど最新AIインフラを社内に導入', color: '#7C3AED' },
            { step: '③', title: '実践研修', desc: 'プロンプトエンジニアリングをハンズオンで指導', color: '#D97706' },
            { step: '④', title: '共同開発', desc: '実際のプロジェクトをMeeceエンジニアと共に開発', color: '#059669' },
            { step: '⑤', title: '完全自走', desc: '最終的に顧客自身が改善・リリースを実施（Speed 3.5x）', color: '#EF4444' },
          ].map((s) => (
            <div key={s.step} className="flex-1 rounded-xl p-3" style={{ background: `${s.color}08`, border: `1px solid ${s.color}30` }}>
              <div style={{ fontSize: '16px', fontWeight: 900, color: s.color, marginBottom: '4px' }}>{s.step}</div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#1F2937', marginBottom: '4px' }}>{s.title}</div>
              <p style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* =====================================================================
   SLIDE 10: ROADMAP
   ===================================================================== */
const Slide10 = (
  <div key="s10" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #FAFBFF 0%, #F5F3FF 50%, #FAFBFF 100%)' }}>
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

    <div className="relative z-10 h-full flex flex-col" style={{ padding: '36px 64px' }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-1 rounded" style={{ background: 'linear-gradient(to right, #4F46E5, #A855F7)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.3em' }}>GROWTH ROADMAP</span>
        </div>
        <h2 style={{ fontSize: '34px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
          今後の成長ロードマップと<span style={{ color: '#4F46E5' }}>ビジネス展望</span>
        </h2>
      </div>

      {/* Large growth chart + phase annotations */}
      <div className="flex gap-6 flex-1">
        {/* Chart area */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-4 flex flex-col">
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#374151', marginBottom: '4px' }}>事業成長の軌跡 — 指数関数的拡大モデル</div>
          <div className="flex-1">
            <svg viewBox="0 0 640 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="rm-p1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="rm-p2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="rm-p3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="rm-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="40%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0,1,2,3,4].map(i => (
                <line key={i} x1="60" y1={290 - i*60} x2="620" y2={290 - i*60} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
              ))}
              {/* Y-axis labels */}
              {[['0', 290], ['25%', 230], ['50%', 170], ['75%', 110], ['100%', 50]].map(([label, y]) => (
                <text key={label as string} x="52" y={Number(y) + 4} textAnchor="end" fontSize="9" fill="#9CA3AF" fontWeight="600">{label}</text>
              ))}
              {/* Phase 1 area (cols 0-2: x 60→240) */}
              <path d="M60,280 C100,275 140,265 200,245 L240,235 L240,290 L60,290 Z" fill="url(#rm-p1)" />
              {/* Phase 2 area (cols 2-5: x 240→460) */}
              <path d="M240,235 C280,220 320,195 360,165 C400,135 430,115 460,90 L460,290 L240,290 Z" fill="url(#rm-p2)" />
              {/* Phase 3 area (cols 5-8: x 460→620) */}
              <path d="M460,90 C490,68 520,52 550,36 C575,23 600,15 620,10 L620,290 L460,290 Z" fill="url(#rm-p3)" />
              {/* Growth curve */}
              <path d="M60,280 C100,275 140,265 200,245 C240,232 280,220 320,195 C360,168 400,135 440,105 C470,82 500,60 540,38 C570,22 595,14 620,10"
                fill="none" stroke="url(#rm-line)" strokeWidth="3.5" strokeLinecap="round" />
              {/* Dots on curve */}
              <circle cx="150" cy="258" r="5" fill="#4F46E5" stroke="white" strokeWidth="2" />
              <circle cx="350" cy="178" r="5" fill="#A855F7" stroke="white" strokeWidth="2" />
              <circle cx="560" cy="32" r="5" fill="#F59E0B" stroke="white" strokeWidth="2" />
              {/* Phase dividers */}
              <line x1="240" y1="30" x2="240" y2="290" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="460" y1="30" x2="460" y2="290" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4" />
              {/* Phase labels */}
              <rect x="64" y="34" width="168" height="38" rx="8" fill="#EEF2FF" />
              <text x="78" y="52" fontSize="9" fill="#4F46E5" fontWeight="900">Phase 01 — Foundation</text>
              <text x="78" y="65" fontSize="8" fill="#6366F1">2026.01–03 ／ AIワークフロー確立・50案件獲得</text>
              <rect x="244" y="34" width="208" height="38" rx="8" fill="#F5F3FF" />
              <text x="258" y="52" fontSize="9" fill="#7C3AED" fontWeight="900">Phase 02 — Scaling</text>
              <text x="258" y="65" fontSize="8" fill="#A855F7">2026.04–12 ／ 中規模拡大・内製化支援展開</text>
              <rect x="464" y="34" width="152" height="38" rx="8" fill="#FFFBEB" />
              <text x="478" y="52" fontSize="9" fill="#D97706" fontWeight="900">Phase 03 — Enterprise</text>
              <text x="478" y="65" fontSize="8" fill="#F59E0B">2027.01– ／ 大規模展開</text>
              {/* Value callouts */}
              <rect x="110" y="228" width="80" height="22" rx="6" fill="#4F46E5" />
              <text x="150" y="243" textAnchor="middle" fontSize="8.5" fill="white" fontWeight="800">50件/3ヶ月</text>
              <rect x="305" y="148" width="90" height="22" rx="6" fill="#7C3AED" />
              <text x="350" y="163" textAnchor="middle" fontSize="8.5" fill="white" fontWeight="800">中規模拡大期</text>
              <rect x="490" y="2" width="106" height="20" rx="6" fill="#D97706" />
              <text x="543" y="16" textAnchor="middle" fontSize="8.5" fill="white" fontWeight="800">指数関数的成長</text>
              <line x1="543" y1="22" x2="560" y2="27" stroke="#D97706" strokeWidth="1.5" opacity="0.7" />
              {/* X axis */}
              <line x1="60" y1="290" x2="625" y2="290" stroke="#CBD5E1" strokeWidth="1.5" />
              {['Q1 2026', 'Q2', 'Q3', 'Q4', 'Q1 2027', 'Q2', 'Q3', 'Q4+'].map((q, i) => (
                <text key={q} x={60 + i * 80} y="306" textAnchor="middle" fontSize="8.5" fill="#9CA3AF" fontWeight="600">{q}</text>
              ))}
            </svg>
          </div>
        </div>

        {/* Right: Phase KPI summary */}
        <div className="w-[210px] flex flex-col gap-3">
          {[
            { phase: 'Phase 01', period: '2026 Q1', title: '基盤構築期', color: '#4F46E5', bg: '#EEF2FF', border: '#C7D2FE', kpi: '50件', kpiLabel: '案件獲得', items: ['AIワークフローの型を確立', 'エージェント営業を本格始動'] },
            { phase: 'Phase 02', period: '2026 Q2–Q4', title: '拡張・成長期', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', kpi: '×3', kpiLabel: '売上拡大', items: ['中規模システムへ領域拡大', '内製化支援モデルを確立'] },
            { phase: 'Phase 03', period: '2027 Q1–', title: '大規模展開期', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', kpi: '∞', kpiLabel: '指数的成長', items: ['大型案件をAI駆動で提供', '全方位アプリ対応体制完成'] },
          ].map((p) => (
            <div key={p.phase} className="rounded-2xl overflow-hidden border-2 flex-1" style={{ borderColor: p.border }}>
              <div className="px-3 py-2" style={{ background: `${p.color}15` }}>
                <div style={{ fontSize: '9px', fontWeight: 800, color: p.color, letterSpacing: '0.2em' }}>{p.phase} — {p.period}</div>
                <div style={{ fontSize: '12px', fontWeight: 900, color: '#1F2937' }}>{p.title}</div>
              </div>
              <div className="p-3 bg-white flex flex-col gap-1.5">
                <div className="flex items-baseline gap-1">
                  <span style={{ fontSize: '24px', fontWeight: 900, color: p.color, lineHeight: 1 }}>{p.kpi}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#6B7280' }}>{p.kpiLabel}</span>
                </div>
                {p.items.map((item, j) => (
                  <div key={j} className="flex gap-1.5 items-start">
                    <span style={{ color: p.color, fontSize: '10px', fontWeight: 800, flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: '10.5px', color: '#4B5563', lineHeight: 1.45 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* =====================================================================
   SLIDE 11: CLOSING — VIBRANT
   ===================================================================== */
const Slide11 = (
  <div key="s11" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F0F4FF 0%, #F5F0FF 30%, #FFF0F8 60%, #FFFBEB 100%)' }}>
    {/* Geometric decoration top-left */}
    <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }} />
    {/* Geometric decoration top-right */}
    <div className="absolute -top-8 right-32 w-56 h-56 rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,72,144,0.14) 0%, transparent 70%)' }} />
    {/* Geometric decoration bottom-right */}
    <div className="absolute -bottom-12 -right-12 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.16) 0%, transparent 70%)' }} />
    {/* Geometric decoration bottom-left */}
    <div className="absolute bottom-0 left-32 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)' }} />

    {/* Decorative floating shapes */}
    <div className="absolute top-24 right-24 w-16 h-16 rounded-2xl rotate-12 opacity-30" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }} />
    <div className="absolute top-36 right-52 w-8 h-8 rounded-xl rotate-45 opacity-25" style={{ background: 'linear-gradient(135deg, #E11D48, #F59E0B)' }} />
    <div className="absolute bottom-32 left-20 w-12 h-12 rounded-2xl -rotate-12 opacity-25" style={{ background: 'linear-gradient(135deg, #10B981, #4F46E5)' }} />
    <div className="absolute top-20 left-48 w-6 h-6 rounded-lg rotate-45 opacity-20" style={{ background: '#A855F7' }} />

    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: '64px 80px' }}>
      {/* Top badge */}
      <div className="inline-flex items-center gap-3 mb-8 px-7 py-3 rounded-full shadow-sm" style={{
        background: 'white',
        border: '2px solid transparent',
        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #4F46E5, #E11D48, #F59E0B)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}>
        <Star className="w-4 h-4" style={{ color: '#4F46E5' }} />
        <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.3em', background: 'linear-gradient(135deg, #4F46E5, #E11D48)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MEECE AI LAB — CONCLUSION</span>
        <Star className="w-4 h-4" style={{ color: '#E11D48' }} />
      </div>

      {/* Main headline */}
      <h1 style={{ fontSize: '54px', fontWeight: 900, textAlign: 'center', lineHeight: 1.18, letterSpacing: '-0.03em', maxWidth: '860px', marginBottom: '20px' }}>
        <span style={{ color: '#0F172A' }}>AIラボは</span>
        <span style={{ background: 'linear-gradient(135deg, #EF4444, #F97316, #D97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>「ツール導入」</span>
        <span style={{ color: '#0F172A' }}>ではない。</span>
        <br />
        <span style={{ color: '#0F172A' }}>SI業界の</span>
        <span style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 40%, #E11D48 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ビジネスモデルそのものを変える</span>
        <span style={{ color: '#0F172A' }}>。</span>
      </h1>

      {/* Decorative line */}
      <div style={{ width: '80px', height: '5px', background: 'linear-gradient(to right, #4F46E5, #E11D48, #F59E0B)', borderRadius: '3px', marginBottom: '22px' }} />

      <p style={{ fontSize: '17px', color: '#374151', lineHeight: 1.9, textAlign: 'center', maxWidth: '620px', marginBottom: '44px', fontWeight: 500 }}>
        AIによる工数削減と圧倒的なスピードを武器に、<br />
        <strong style={{ color: '#4F46E5' }}>見過ごされてきた中間市場を独占し</strong>、<br />
        クライアント企業のDXを真の意味で加速します。
      </p>

      {/* 4 vibrant pillars */}
      <div className="flex gap-4 mb-10">
        {[
          { icon: TrendingDown, label: '60%コスト削減', sub: '従来比', gradient: 'linear-gradient(135deg, #4F46E5, #6366F1)', lightBg: '#EEF2FF' },
          { icon: Rocket, label: '2日で完成', sub: 'フロントエンド', gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)', lightBg: '#F5F3FF' },
          { icon: Zap, label: '8割AI代行', sub: '開発作業を', gradient: 'linear-gradient(135deg, #E11D48, #F43F5E)', lightBg: '#FFF1F2' },
          { icon: Users, label: '完全内製化', sub: '支援で自走へ', gradient: 'linear-gradient(135deg, #D97706, #F59E0B)', lightBg: '#FFFBEB' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center rounded-3xl overflow-hidden shadow-md" style={{ background: 'white', border: '1.5px solid rgba(0,0,0,0.06)', minWidth: '150px' }}>
            <div className="w-full py-4 flex items-center justify-center" style={{ background: item.gradient }}>
              <item.icon className="w-7 h-7 text-white" />
            </div>
            <div className="px-5 py-4 text-center">
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#1F2937' }}>{item.label}</div>
              <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-14 py-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.7)' }}>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 900, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MEECE AI LAB</span>
        </div>
        <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Meece株式会社 — 2026年度 新事業戦略説明書</div>
        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>info@meece.io</div>
      </div>
    </div>
  </div>
);

/* =====================================================================
   EXPORT
   ===================================================================== */
export const aiLabPresentation = {
  meta: {
    id: 'ai-lab-2026',
    title: 'AI開発ラボ — 新事業・戦略的業務拡大',
    description: 'AI駆動開発メソッドによる次世代SI事業戦略。SIerが取り切れない中堅市場を独占する詳細説明書。',
    thumbnail: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #A855F7 100%)',
    author: 'Meece株式会社',
    createdAt: '2026-05-26',
  },
  slides: [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11],
};
