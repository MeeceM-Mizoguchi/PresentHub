import type { PresentationEntry } from '../registry';

const SlideCover = (
  <div
    key="s-cover"
    className="w-full h-[720px] relative overflow-hidden flex flex-col"
    style={{ background: 'linear-gradient(135deg, #080e1a 0%, #0d1829 55%, #0a1220 100%)' }}
  >
    {/* Grid pattern */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />

    {/* Glow orbs */}
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 480,
        height: 480,
        top: -120,
        right: -80,
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
      }}
    />
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 360,
        height: 360,
        bottom: -60,
        left: 80,
        background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)',
      }}
    />

    {/* Large M&A watermark */}
    <div
      className="absolute select-none pointer-events-none font-black"
      style={{
        fontSize: 320,
        color: 'rgba(255,255,255,0.022)',
        right: -40,
        bottom: -60,
        lineHeight: 1,
        letterSpacing: '-0.05em',
        fontFamily: 'Georgia, serif',
      }}
    >
      M&A
    </div>

    {/* SVG connection nodes decoration */}
    <svg
      className="absolute pointer-events-none"
      style={{ top: 60, left: 60, opacity: 0.18 }}
      width="200"
      height="200"
      viewBox="0 0 200 200"
    >
      <circle cx="40" cy="40" r="4" fill="#F59E0B" />
      <circle cx="120" cy="30" r="3" fill="#6366F1" />
      <circle cx="160" cy="90" r="4" fill="#F59E0B" />
      <circle cx="80" cy="120" r="3" fill="#6366F1" />
      <circle cx="30" cy="160" r="4" fill="#F59E0B" />
      <line x1="40" y1="40" x2="120" y2="30" stroke="#6366F1" strokeWidth="1" />
      <line x1="120" y1="30" x2="160" y2="90" stroke="#F59E0B" strokeWidth="1" />
      <line x1="160" y1="90" x2="80" y2="120" stroke="#6366F1" strokeWidth="1" />
      <line x1="80" y1="120" x2="30" y2="160" stroke="#F59E0B" strokeWidth="1" />
    </svg>

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full px-16 py-10">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        {/* Meece logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl"
            style={{ background: '#F59E0B', color: '#080e1a' }}
          >
            M
          </div>
          <span className="text-white font-semibold tracking-widest text-sm opacity-80">
            Meece株式会社
          </span>
        </div>
        {/* CONFIDENTIAL badge */}
        <div
          className="px-3 py-1 rounded text-xs font-bold tracking-widest"
          style={{ border: '1px solid rgba(245,158,11,0.5)', color: '#F59E0B', background: 'rgba(245,158,11,0.08)' }}
        >
          CONFIDENTIAL
        </div>
      </div>

      {/* Main title area */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-3">
          <span
            className="text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: '#6366F1' }}
          >
            Strategic Report
          </span>
        </div>
        <h1
          className="font-black leading-none mb-4"
          style={{ fontSize: 72, color: '#FFFFFF', letterSpacing: '-0.02em' }}
        >
          M&A
          <br />
          <span style={{ fontSize: 52, color: 'rgba(255,255,255,0.9)' }}>取り組み状況</span>
        </h1>
        {/* Gradient separator */}
        <div
          className="mb-6"
          style={{
            height: 3,
            width: 240,
            background: 'linear-gradient(to right, #F59E0B, #6366F1, transparent)',
            borderRadius: 2,
          }}
        />
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
          各社との面談進捗・論点整理・ネクストアクション
        </p>

        {/* Company status badges */}
        <div className="flex flex-wrap gap-2">
          {/* Active */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(245,158,11,0.18)', border: '1px solid rgba(245,158,11,0.5)', color: '#F59E0B' }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#F59E0B' }}
            />
            オープングループ
            <span
              className="ml-1 px-1.5 py-0.5 rounded text-xs"
              style={{ background: 'rgba(245,158,11,0.3)', fontSize: 10 }}
            >
              LOI調整中
            </span>
          </div>
          {/* Others - muted */}
          {['A社', 'B社', 'C社', 'D社'].map((c) => (
            <div
              key={c}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between text-xs"
        style={{ color: 'rgba(255,255,255,0.35)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}
      >
        <span>2026年5月21日</span>
        <span>溝口 雅登｜Meece株式会社</span>
      </div>
    </div>
  </div>
);

const SlideOpenGroupTitle = (
  <div
    key="s-og-title"
    className="w-full h-[720px] overflow-hidden relative flex flex-col items-center justify-center"
    style={{ background: 'linear-gradient(145deg, #FFFBEB 0%, #FEF3C7 40%, #FDE68A 100%)' }}
  >
    {/* Background circles */}
    <div style={{ position: 'absolute', top: -160, right: -160, width: 560, height: 560, borderRadius: '50%', background: 'rgba(245,158,11,0.12)' }} />
    <div style={{ position: 'absolute', bottom: -120, left: -120, width: 440, height: 440, borderRadius: '50%', background: 'rgba(245,158,11,0.1)' }} />
    <div style={{ position: 'absolute', top: 80, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(245,158,11,0.08)' }} />

    {/* Large OG watermark */}
    <div style={{
      position: 'absolute',
      right: -20,
      bottom: -60,
      fontSize: 420,
      fontWeight: 900,
      color: 'rgba(245,158,11,0.1)',
      lineHeight: 1,
      fontFamily: 'Georgia, serif',
      letterSpacing: '-0.06em',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      OG
    </div>

    {/* Top-left Meece label */}
    <div style={{ position: 'absolute', top: 36, left: 48, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 30, height: 30, borderRadius: 7,
        background: '#F59E0B',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 900, fontSize: 15, color: 'white',
      }}>M</div>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#92400E', letterSpacing: '0.15em' }}>M&A 取り組み状況レポート</span>
    </div>

    {/* Top-right company number */}
    <div style={{ position: 'absolute', top: 36, right: 48 }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: '#D97706', letterSpacing: '0.2em' }}>COMPANY 01</span>
    </div>

    {/* Center content */}
    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
      {/* Amber accent line above */}
      <div style={{ width: 64, height: 4, background: '#F59E0B', borderRadius: 2, margin: '0 auto 28px' }} />

      <h1 style={{
        fontSize: 88,
        fontWeight: 900,
        color: '#1C1917',
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        marginBottom: 12,
      }}>
        オープングループ
      </h1>
      <h2 style={{
        fontSize: 52,
        fontWeight: 700,
        color: '#D97706',
        lineHeight: 1,
        letterSpacing: '-0.01em',
        marginBottom: 36,
      }}>
        株式会社
      </h2>

      {/* Bottom accent line */}
      <div style={{ width: 120, height: 3, background: 'linear-gradient(to right, transparent, #F59E0B, transparent)', borderRadius: 2, margin: '0 auto' }} />
    </div>

    {/* Bottom label */}
    <div style={{ position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center' }}>
      <span style={{ fontSize: 11, color: '#B45309', fontWeight: 600, letterSpacing: '0.15em' }}>
        2026年5月 ｜ Meece株式会社
      </span>
    </div>
  </div>
);

const SlideOpenGroupIntro = (
  <div
    key="s-og-intro"
    className="w-full h-[720px] overflow-hidden flex"
  >
    {/* ===== LEFT: Bold amber identity panel ===== */}
    <div
      style={{
        width: '42%',
        background: 'linear-gradient(160deg, #FBBF24 0%, #F59E0B 45%, #D97706 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '44px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />
      <div style={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 120, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

      {/* Logo mark */}
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: 18,
          background: 'rgba(255,255,255,0.22)',
          border: '2px solid rgba(255,255,255,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 28,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>OG</span>
      </div>

      {/* Company name + vision */}
      <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em', marginBottom: 10 }}>
        COMPANY PROFILE
      </p>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', lineHeight: 1.25, marginBottom: 14 }}>
        オープングループ<br />株式会社
      </h1>
      <p style={{ fontSize: 20, fontWeight: 900, color: 'rgba(255,255,255,0.95)', fontStyle: 'italic', marginBottom: 6 }}>
        「変化を、進化に」
      </p>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.35)',
          borderRadius: 999,
          padding: '3px 12px',
          marginBottom: 28,
          alignSelf: 'flex-start',
        }}
      >
        <span style={{ fontSize: 11, color: 'white', fontWeight: 600 }}>2024年6月 社名変更</span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.25)', marginBottom: 28 }} />

      {/* Key stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, flex: 1 }}>
        {[
          { num: '¥81.5億', label: '売上高（2026年2月期）' },
          { num: '3,000社+', label: 'RPA累積導入実績' },
          { num: '150〜210名', label: 'グループ従業員（連結）' },
          { num: '6事業', label: 'サービスポートフォリオ' },
        ].map(({ num, label }) => (
          <div key={label}>
            <p style={{ fontSize: 27, fontWeight: 900, color: 'white', lineHeight: 1 }}>{num}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Domain tags */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
        {['AIトランスフォーメーション', 'M&A事業拡大'].map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'white',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.35)',
              padding: '5px 14px',
              borderRadius: 999,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* ===== RIGHT: Services — clean white, editorial list ===== */}
    <div
      style={{
        flex: 1,
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '44px 44px',
      }}
    >
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.14em', marginBottom: 6 }}>
            SERVICES
          </p>
          <p style={{ fontSize: 22, fontWeight: 900, color: '#111827', lineHeight: 1 }}>
            サービスポートフォリオ
          </p>
        </div>
        <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>全 6 サービス</p>
      </div>

      {/* Services: 2-column numbered list, no card borders */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr',
          columnGap: 36,
        }}
      >
        {[
          {
            num: '01', name: 'BizRobo!', category: 'RPAプラットフォーム',
            desc: '国内トップクラスのRPA。PC操作を自動化するロボットを開発・管理する基盤。金融・製造など幅広い業種で導入実績。',
            color: '#2563EB',
          },
          {
            num: '02', name: 'AUTORO', category: 'クラウド型業務自動化ロボット',
            desc: 'ブラウザ上で動作するクラウドRPA。インストール不要でWebブラウザ操作を自動化。スモールスタートから導入可能。',
            color: '#7C3AED',
          },
          {
            num: '03', name: 'RoboRobo', category: 'バックオフィス業務自動化',
            desc: '給与・勤怠・請求処理など管理部門に特化したクラウドサービス。中小企業のバックオフィスDXを効率的に支援。',
            color: '#0891B2',
          },
          {
            num: '04', name: 'PRESCO', category: '成果報酬型広告ASP',
            desc: 'アフィリエイト広告プラットフォーム。広告主とメディアをマッチングし、費用対効果の高い集客施策を実現。',
            color: '#D97706',
          },
          {
            num: '05', name: 'ご近所ワーク', category: 'スキマ時間のワークシェアリング',
            desc: '地域の空き時間を活用したスポットワークマッチングプラットフォーム。地元の単発仕事を手軽にマッチング。',
            color: '#059669',
          },
          {
            num: '06', name: 'MedOS', category: '医療事務請負サービス',
            desc: '医療機関の事務業務をアウトソーシング。レセプト処理・受付・会計など医療現場の管理業務を一括代行。',
            color: '#DC2626',
          },
        ].map(({ num, name, category, desc, color }) => (
          <div
            key={name}
            style={{
              borderTop: '1px solid #F3F4F6',
              paddingTop: 16,
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                color,
                opacity: 0.45,
                flexShrink: 0,
                marginTop: 3,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {num}
            </span>
            <div>
              <p style={{ fontSize: 19, fontWeight: 900, color, lineHeight: 1.1, marginBottom: 3 }}>{name}</p>
              <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 6 }}>{category}</p>
              <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


const SlideOpenGroupOverview = (
  <div
    key="s-og-overview"
    className="w-full h-[720px] overflow-hidden flex flex-col"
    style={{ background: '#F1F5F9' }}
  >
    {/* Top gradient bar */}
    <div style={{ height: 4, background: 'linear-gradient(to right, #D97706, #6366F1, #1E40AF)', flexShrink: 0 }} />

    {/* Dark header: company name + KPIs */}
    <div
      className="px-10 py-5 flex flex-col gap-4"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', flexShrink: 0 }}
    >
      {/* Row 1: Name + badges */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0"
            style={{ background: 'rgba(245,158,11,0.15)', border: '2px solid #F59E0B', color: '#F59E0B' }}
          >
            OG
          </div>
          <div>
            <h2 className="font-black leading-tight" style={{ color: 'white', fontSize: 26 }}>
              オープングループ
            </h2>
            <p style={{ color: '#64748B', fontSize: 11 }}>株式会社オープングループ — FDE事業・現場DX推進</p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#FCD34D', border: '1px solid rgba(245,158,11,0.4)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F59E0B' }} />
            LOI調整中
          </div>
        </div>
        <div
          className="text-right px-4 py-2 rounded-lg"
          style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)' }}
        >
          <p style={{ color: '#FCA5A5', fontSize: 10, fontWeight: 600 }}>提出期限</p>
          <p style={{ color: '#FCA5A5', fontSize: 17, fontWeight: 900 }}>2026年5月29日</p>
        </div>
      </div>

      {/* Row 2: KPI strip */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { num: '3,000+', unit: '社', label: 'RPA累積導入実績', accent: '#F59E0B' },
          { num: '¥200万〜', unit: '/月', label: 'FDE事業単価', accent: '#818CF8' },
          { num: '▼67%', unit: '削減', label: 'AI活用コスト試算', accent: '#34D399' },
          { num: '全国', unit: '対応', label: '営業エリア展開', accent: '#60A5FA' },
        ].map(({ num, unit, label, accent }) => (
          <div
            key={label}
            className="rounded-lg px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${accent}` }}
          >
            <p style={{ color: '#94A3B8', fontSize: 10, fontWeight: 600, marginBottom: 3 }}>{label}</p>
            <div className="flex items-baseline gap-1">
              <span style={{ color: 'white', fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{num}</span>
              <span style={{ color: '#64748B', fontSize: 11 }}>{unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Main content: 3 columns, no tall cards */}
    <div className="flex flex-1 min-h-0">

      {/* LEFT — Profile + FDE + M&A背景 */}
      <div
        className="flex flex-col gap-3 p-5"
        style={{ width: '31%', borderRight: '1px solid #CBD5E1' }}
      >
        <div>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#6366F1' }}>COMPANY PROFILE</p>
          <div>
            {[
              { label: '業種', value: 'IT・DXコンサルティング' },
              { label: '主力事業', value: 'FDE事業（現場DX推進）' },
              { label: '営業モデル', value: '紹介・パートナー経由中心' },
              { label: 'プロダクト', value: '自社SaaS保有' },
              { label: 'RPA実績', value: '3,000社超（累積）' },
              { label: 'エリア', value: '全国対応' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-2"
                style={{ borderBottom: '1px solid #E2E8F0' }}
              >
                <span style={{ color: '#64748B', fontSize: 11, fontWeight: 600 }}>{label}</span>
                <span style={{ color: '#0F172A', fontSize: 11, fontWeight: 700 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-xl p-3"
          style={{ background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', border: '1px solid #F59E0B' }}
        >
          <p style={{ color: '#92400E', fontSize: 11, fontWeight: 900, marginBottom: 5 }}>
            FDE事業（Field DX Engineer）
          </p>
          <p style={{ color: '#78350F', fontSize: 11, lineHeight: 1.65 }}>
            現場に専任エンジニアを配置し、RPAや業務自動化で現場DXを伴走支援。
            <strong>月額¥200万〜</strong>の高単価継続モデル。
            AI活用で同品質を<strong>¥100万以下</strong>で提供可能。
          </p>
        </div>

        <div
          className="rounded-xl p-3"
          style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}
        >
          <p style={{ color: '#991B1B', fontSize: 11, fontWeight: 900, marginBottom: 5 }}>M&A検討背景</p>
          <div className="flex flex-col gap-2">
            {[
              { icon: '⚠️', text: '営業機能が不足、新規獲得に限界' },
              { icon: '🏢', text: 'グループの中核事業体になりたい' },
              { icon: '🤖', text: 'AI活用でコスト競争力を高めたい' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-2">
                <span style={{ fontSize: 12, flexShrink: 0 }}>{icon}</span>
                <span style={{ color: '#991B1B', fontSize: 11 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER — 既存の強み */}
      <div
        className="flex flex-col gap-3 p-5"
        style={{ width: '35%', borderRight: '1px solid #CBD5E1' }}
      >
        <p className="text-xs font-bold tracking-widest" style={{ color: '#64748B' }}>既存の強み</p>
        <div className="flex flex-col gap-3 flex-1">
          {[
            {
              icon: '⚙️',
              color: '#2563EB',
              bg: '#EFF6FF',
              border: '#BFDBFE',
              title: 'RPA × 現場密着型支援',
              points: [
                '業種を問わず3,000社超の現場DX導入実績',
                '専任エンジニアによる伴走型支援モデル',
                '現場の業務フロー・ボトルネックを深く理解',
              ],
            },
            {
              icon: '📊',
              color: '#7C3AED',
              bg: '#F5F3FF',
              border: '#DDD6FE',
              title: '自社SaaSプロダクト保有',
              points: [
                '顧客LTVを高める月次継続収益モデル',
                'ツール×支援の一体型ソリューション提供',
                'データ蓄積による継続的ナレッジ改善',
              ],
            },
            {
              icon: '🤝',
              color: '#059669',
              bg: '#ECFDF5',
              border: '#A7F3D0',
              title: '紹介・パートナー経由営業',
              points: [
                '既存顧客からの口コミ・紹介が主な流入経路',
                'パートナー企業経由の安定した案件パイプライン',
                '信頼ベースの商談で高い成約率を実現',
              ],
            },
          ].map(({ icon, color, bg, border, title, points }) => (
            <div
              key={title}
              className="rounded-xl p-3 flex-1"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: 16 }}>{icon}</span>
                <p style={{ color, fontSize: 12, fontWeight: 800 }}>{title}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                {points.map((p) => (
                  <div key={p} className="flex items-start gap-1.5">
                    <span style={{ color, fontSize: 10, flexShrink: 0, marginTop: 1 }}>•</span>
                    <span style={{ color: '#374151', fontSize: 11, lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Synergy flow + Cost */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <p className="text-xs font-bold tracking-widest" style={{ color: '#64748B' }}>シナジー分析</p>

        {/* Synergy flow diagram */}
        <div
          className="rounded-xl p-4 flex-1 flex flex-col"
          style={{ background: 'white', border: '1px solid #E2E8F0' }}
        >
          {/* Meece → Open */}
          <div
            className="rounded-lg p-3 mb-2"
            style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
          >
            <p style={{ color: '#4338CA', fontSize: 10, fontWeight: 800, marginBottom: 6 }}>
              Meece → オープン に提供
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['AI×業務自動化', '新規顧客獲得力', 'コスト削減設計', '先端テック実装'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: '#C7D2FE', color: '#3730A3' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow + Combined */}
          <div className="flex items-center gap-2 mb-2">
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
            <div
              className="rounded-lg px-3 py-2 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(245,158,11,0.08))', border: '1px dashed #CBD5E1' }}
            >
              <p style={{ fontSize: 10, fontWeight: 900, color: '#374151' }}>統合後の提供価値</p>
              <p style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>現場DX × AI × 営業力 のワンストップ</p>
            </div>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          </div>

          {/* Open → Meece */}
          <div
            className="rounded-lg p-3"
            style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
          >
            <p style={{ color: '#92400E', fontSize: 10, fontWeight: 800, marginBottom: 6 }}>
              オープン → Meece に提供
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['3,000社顧客基盤', '現場DXノウハウ', '全国営業網', 'パートナー群'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: '#FDE68A', color: '#78350F' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Cost reduction — dark card */}
        <div
          className="rounded-xl p-4"
          style={{ background: 'linear-gradient(135deg, #064E3B, #065F46)', color: 'white' }}
        >
          <p style={{ color: '#6EE7B7', fontSize: 10, fontWeight: 700, marginBottom: 8 }}>
            AI活用コスト削減シミュレーション
          </p>
          <div className="flex items-center gap-4">
            <div className="text-center flex-1">
              <p style={{ color: '#A7F3D0', fontSize: 10, marginBottom: 2 }}>現状（従来）</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>
                ¥300万
              </p>
              <p style={{ color: '#6EE7B7', fontSize: 10 }}>/ 月 / 社</p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
              style={{ background: '#34D399', color: '#064E3B' }}
            >
              →
            </div>
            <div className="text-center flex-1">
              <p style={{ color: '#A7F3D0', fontSize: 10, marginBottom: 2 }}>AI活用後</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>¥100万</p>
              <p style={{ color: '#6EE7B7', fontSize: 10 }}>/ 月 / 社</p>
            </div>
            <div
              className="rounded-xl px-3 py-2 text-center"
              style={{ background: '#34D399', color: '#064E3B' }}
            >
              <p style={{ fontSize: 10, fontWeight: 700 }}>削減率</p>
              <p style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.1 }}>▼67%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideOpenGroupMeeting = (
  <div
    key="s-og-meeting"
    className="w-full h-[720px] overflow-hidden flex flex-col bg-white"
  >
    {/* Top accent bar */}
    <div style={{ height: 5, background: 'linear-gradient(to right, #D97706, #6366F1, #1E40AF)', flexShrink: 0 }} />

    {/* Header */}
    <div
      className="flex items-center justify-between px-10 py-5"
      style={{ borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}
    >
      <div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: '#111827', lineHeight: 1 }}>面談サマリー</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>オープングループ — 初回面談での論点整理</p>
      </div>
      <span
        style={{
          fontSize: 12, fontWeight: 600, color: '#4338CA',
          background: '#EEF2FF', border: '1px solid #C7D2FE',
          padding: '4px 14px', borderRadius: 999,
        }}
      >
        初回面談
      </span>
    </div>

    {/* 3-column main area */}
    <div className="flex flex-1 min-h-0">

      {/* ── Col 1: 興味関心事項 ── */}
      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        {/* Header with SVG target illustration */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            padding: '18px 22px',
            display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
          }}
        >
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <circle cx="23" cy="23" r="21" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <circle cx="23" cy="23" r="14" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
            <circle cx="23" cy="23" r="7" fill="white" opacity="0.9"/>
            <line x1="23" y1="2" x2="23" y2="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="23" y1="36" x2="23" y2="44" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="23" x2="10" y2="23" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="36" y1="23" x2="44" y2="23" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div>
            <p style={{ fontSize: 15, fontWeight: 900, color: 'white', lineHeight: 1 }}>興味関心事項</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>先方が注目するポイント</p>
          </div>
        </div>
        {/* Items — numbered with icon */}
        <div className="flex flex-col flex-1 p-4 gap-3" style={{ background: '#FFFBEB' }}>
          {[
            { n: 1, icon: '🤖', label: 'AI業務自動化', text: 'AIによる業務自動化・効率化の可能性と実現手法への関心' },
            { n: 2, icon: '💰', label: 'コスト削減', text: 'FDE事業のコスト構造とAI活用での削減余地（¥300万→¥100万）' },
            { n: 3, icon: '🚀', label: '顧客獲得連携', text: 'Meeceの新規顧客獲得モデルとのシナジー・連携可能性' },
            { n: 4, icon: '🏢', label: 'グループ中核', text: 'グループ全体のDX中核として機能する道筋・ポジション' },
          ].map(({ n, icon, label, text }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-2xl flex-1"
              style={{ background: 'white', border: '1px solid #FDE68A', padding: '12px 14px' }}
            >
              <div
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: '#F59E0B', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 13, flexShrink: 0,
                }}
              >
                {n}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#92400E' }}>{label}</p>
                </div>
                <p style={{ fontSize: 11.5, color: '#B45309', lineHeight: 1.65 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Col 2: Meeceの提供価値 ── */}
      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        {/* Header with SVG star illustration */}
        <div
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            padding: '18px 22px',
            display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
          }}
        >
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <polygon
              points="23,4 27,16 39,16 30,24 33,36 23,29 13,36 16,24 7,16 19,16"
              fill="rgba(255,255,255,0.9)"
            />
            <circle cx="23" cy="23" r="5" fill="rgba(255,255,255,0.3)"/>
          </svg>
          <div>
            <p style={{ fontSize: 15, fontWeight: 900, color: 'white', lineHeight: 1 }}>Meeceの提供価値</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>先方へのバリュー訴求</p>
          </div>
        </div>
        {/* Items with impact bars */}
        <div className="flex flex-col flex-1 p-4 gap-3" style={{ background: '#ECFDF5' }}>
          {[
            { icon: '⚡', title: 'AI業務自動化', desc: 'FDE業務を1/3コストで実現。RPAにAIを組み合わせ大幅削減。', pct: 95, color: '#059669' },
            { icon: '📈', title: '新規顧客獲得', desc: '営業機能の補完・強化。Meeceの獲得チャネルをオープンへ開放。', pct: 82, color: '#10B981' },
            { icon: '🔗', title: 'DXパートナー', desc: '現場×AIのワンストップ化。伴走型でDX定着を継続推進。', pct: 88, color: '#059669' },
            { icon: '🌐', title: 'グループ展開', desc: '子会社含む一括DX推進。グループ全体への横展開でスケール。', pct: 72, color: '#10B981' },
          ].map(({ icon, title, desc, pct, color }) => (
            <div
              key={title}
              className="rounded-2xl flex-1"
              style={{ background: 'white', border: '1px solid #6EE7B7', padding: '12px 14px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <p style={{ fontSize: 13, fontWeight: 800, color: '#065F46', flex: 1 }}>{title}</p>
                <span style={{ fontSize: 11, fontWeight: 700, color }}>{pct}%</span>
              </div>
              {/* Impact bar */}
              <div style={{ height: 5, background: '#D1FAE5', borderRadius: 999, marginBottom: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(to right, #059669, #34D399)`, borderRadius: 999 }} />
              </div>
              <p style={{ fontSize: 11.5, color: '#047857', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Col 3: 重要発言・先方の本音 ── */}
      <div className="flex flex-col flex-1">
        {/* Header with SVG speech bubbles */}
        <div
          style={{
            background: 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)',
            padding: '18px 22px',
            display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
          }}
        >
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            {/* Large bubble */}
            <rect x="2" y="4" width="26" height="18" rx="5" fill="rgba(255,255,255,0.9)"/>
            <polygon points="7,22 7,30 15,22" fill="rgba(255,255,255,0.9)"/>
            {/* Small bubble */}
            <rect x="20" y="20" width="24" height="16" rx="4" fill="rgba(255,255,255,0.55)"/>
            <polygon points="39,36 39,43 32,36" fill="rgba(255,255,255,0.55)"/>
            {/* Dots in bubbles */}
            <circle cx="10" cy="13" r="2" fill="rgba(99,102,241,0.5)"/>
            <circle cx="15" cy="13" r="2" fill="rgba(99,102,241,0.5)"/>
            <circle cx="20" cy="13" r="2" fill="rgba(99,102,241,0.5)"/>
          </svg>
          <div>
            <p style={{ fontSize: 15, fontWeight: 900, color: 'white', lineHeight: 1 }}>重要発言・先方の本音</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>面談中のキーメッセージ</p>
          </div>
        </div>
        {/* Quote items */}
        <div className="flex flex-col flex-1 p-4 gap-3" style={{ background: '#F8FAFC' }}>
          {[
            { quote: '「営業が弱い。そこを補ってくれるパートナーが欲しい」', note: '営業補完ニーズが最優先課題', color: '#6366F1' },
            { quote: '「グループの中核として事業を拡大したい意思がある」', note: 'スケール志向・拡大意欲が強い', color: '#8B5CF6' },
            { quote: '「AIで¥300万→¥100万になるなら本当に検討したい」', note: 'コスト削減インパクトへの反応大', color: '#EC4899' },
            { quote: '「現場に入り込む力はある。あとは出口戦略の問題」', note: 'PMI・出口設計が今後の論点', color: '#F59E0B' },
          ].map(({ quote, note, color }) => (
            <div
              key={quote}
              className="rounded-2xl flex-1 flex flex-col justify-between"
              style={{ background: 'white', border: `1.5px solid ${color}22`, borderLeft: `4px solid ${color}`, padding: '12px 14px' }}
            >
              {/* Large decorative quote mark via SVG */}
              <svg width="22" height="17" viewBox="0 0 22 17" style={{ marginBottom: 6, opacity: 0.2 }}>
                <path
                  d="M0 17V9.5C0 3.8 3 0.8 9 0L10 2.2C7.4 3 6.2 4.6 6 7H9V17H0ZM12 17V9.5C12 3.8 15 0.8 21 0L22 2.2C19.4 3 18.2 4.6 18 7H21V17H12Z"
                  fill={color}
                />
              </svg>
              <p style={{ fontSize: 12.5, color: '#1E293B', fontStyle: 'italic', lineHeight: 1.7, flex: 1 }}>{quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <p style={{ fontSize: 11, fontWeight: 700, color }}>{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideOpenGroupNext = (
  <div
    key="s-og-next"
    className="w-full h-[720px] overflow-hidden flex flex-col bg-white"
  >
    {/* Top accent bar */}
    <div style={{ height: 5, background: 'linear-gradient(to right, #D97706, #6366F1, #1E40AF)', flexShrink: 0 }} />

    {/* Header */}
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0,
      }}
    >
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>今後の方針</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>オープングループ — ネクストアクション</p>
      </div>
      {/* Next milestone badge */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4338CA, #6366F1)',
          color: 'white', padding: '8px 18px', borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 10,
        }}
      >
        <span style={{ fontSize: 18 }}>🤝</span>
        <div>
          <p style={{ fontSize: 10, opacity: 0.75 }}>NEXT STEP</p>
          <p style={{ fontSize: 14, fontWeight: 900 }}>社長面談</p>
        </div>
      </div>
    </div>

    {/* Main: 2 columns */}
    <div
      style={{
        display: 'flex', flex: 1, minHeight: 0,
        padding: '18px 40px', gap: 36,
      }}
    >
      {/* LEFT — タイムライン */}
      <div style={{ width: '37%', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>
          プロセスタイムライン
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {[
            { phase: '初回面談', status: 'done', label: '完了', desc: 'オープングループの事業概要とM&Aへの意向を確認。両社の方向性をすり合わせ。' },
            { phase: '2回目面談', status: 'done', label: '完了', desc: 'FDE事業・顧客基盤の詳細ヒアリング。Meeceのビジネスモデルも紹介。' },
            { phase: '社長面談', status: 'active', label: 'NEXT', desc: '両社代表が直接会い、M&Aの方向性・統合後ビジョンを確認する重要なMTG。' },
            { phase: '意向表明（LOI）', status: 'upcoming', label: '予定', desc: 'オープングループからMeeceへ意向表明書を提出。条件・スコープをすり合わせ。' },
            { phase: 'DD・クロージング', status: 'upcoming', label: '予定', desc: 'デューデリジェンス対応 → 最終条件合意 → M&A契約締結。' },
          ].map(({ phase, status, label, desc }, i, arr) => (
            <div key={phase} style={{ display: 'flex', gap: 14, flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: status === 'done' ? '#059669' : status === 'active' ? '#6366F1' : '#E2E8F0',
                    color: status === 'upcoming' ? '#94A3B8' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: 13, flexShrink: 0,
                    boxShadow: status === 'active' ? '0 0 0 4px #C7D2FE' : 'none',
                  }}
                >
                  {status === 'done' ? '✓' : status === 'active' ? '▶' : i + 1}
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: status === 'done' ? '#6EE7B7' : '#E2E8F0', margin: '4px 0' }} />
                )}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 10 : 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <p style={{
                    fontSize: 14, fontWeight: 800,
                    color: status === 'done' ? '#065F46' : status === 'active' ? '#3730A3' : '#94A3B8',
                  }}>
                    {phase}
                  </p>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
                    background: status === 'done' ? '#ECFDF5' : status === 'active' ? '#EEF2FF' : '#F1F5F9',
                    color: status === 'done' ? '#065F46' : status === 'active' ? '#4338CA' : '#CBD5E1',
                  }}>
                    {label}
                  </span>
                </div>
                <p style={{ fontSize: 11, lineHeight: 1.55, color: status === 'upcoming' ? '#CBD5E1' : '#94A3B8' }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — ネクストアクション */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>
          ネクストアクション
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            {
              action: '社長面談の準備・実施',
              owner: '両社',
              desc: 'Meece代表とオープン社長が直接面談。M&Aビジョン・統合方針を確認し、互いの信頼関係を構築する。',
              color: '#6366F1',
            },
            {
              action: 'Meece会社概要資料の整備',
              owner: 'Meece',
              desc: '社長面談に向けてMeeceのビジネス概要・強み・今後の展望をまとめた資料を準備する。',
              color: '#8B5CF6',
            },
            {
              action: '意向表明書（LOI）の受領・精査',
              owner: 'Meece',
              desc: 'オープングループからMeeceへ提出されるLOIの内容を確認し、条件・スコープを精査する。',
              color: '#2563EB',
            },
            {
              action: 'LOI条件のすり合わせ・回答',
              owner: '両社',
              desc: '受領したLOIの条件に対してMeeceの意向を回答し、双方合意できる条件に落とし込む。',
              color: '#059669',
            },
            {
              action: 'DDデータルームの準備',
              owner: 'Meece',
              desc: 'デューデリジェンスに向けて財務・法務・事業資料を整備し、オープン側へ開示できる状態にする。',
              color: '#D97706',
            },
          ].map(({ action, owner, desc, color }) => (
            <div
              key={action}
              style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                background: 'white',
                border: '1px solid #F1F5F9',
                borderLeft: `4px solid ${color}`,
                borderRadius: 12,
                padding: '12px 16px',
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 20, height: 20, borderRadius: 5,
                  border: '2px solid #E2E8F0', background: 'white',
                  flexShrink: 0, marginTop: 2,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{action}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}15`, padding: '2px 9px', borderRadius: 999 }}>
                    {owner}
                  </span>
                </div>
                <p style={{ fontSize: 11.5, color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          style={{
            marginTop: 10, flexShrink: 0,
            background: '#EEF2FF', border: '1px solid #C7D2FE',
            borderRadius: 12, padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3730A3' }}>
            社長面談が最重要マイルストーン — トップ同士の信頼関係構築が意向表明への最短経路
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// 株式会社 kubell
// ============================================================

const SlideKubellTitle = (
  <div
    key="s-kubell-title"
    className="w-full h-[720px] overflow-hidden relative flex flex-col items-center justify-center"
    style={{ background: 'linear-gradient(145deg, #ECFDF5 0%, #D1FAE5 40%, #A7F3D0 100%)' }}
  >
    {/* Background circles */}
    <div style={{ position: 'absolute', top: -160, right: -160, width: 560, height: 560, borderRadius: '50%', background: 'rgba(5,150,105,0.1)' }} />
    <div style={{ position: 'absolute', bottom: -120, left: -120, width: 440, height: 440, borderRadius: '50%', background: 'rgba(5,150,105,0.08)' }} />
    <div style={{ position: 'absolute', top: 80, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(5,150,105,0.06)' }} />

    {/* Large KB watermark */}
    <div style={{
      position: 'absolute', right: -20, bottom: -60,
      fontSize: 420, fontWeight: 900,
      color: 'rgba(5,150,105,0.08)',
      lineHeight: 1, fontFamily: 'Georgia, serif',
      letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none',
    }}>
      KB
    </div>

    {/* Top-left Meece label */}
    <div style={{ position: 'absolute', top: 36, left: 48, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: 7, background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, color: 'white' }}>M</div>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#065F46', letterSpacing: '0.15em' }}>M&A 取り組み状況レポート</span>
    </div>

    {/* Top-right company number */}
    <div style={{ position: 'absolute', top: 36, right: 48 }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: '#059669', letterSpacing: '0.2em' }}>COMPANY 02</span>
    </div>

    {/* Center content */}
    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
      <div style={{ width: 64, height: 4, background: '#059669', borderRadius: 2, margin: '0 auto 28px' }} />
      <h1 style={{ fontSize: 88, fontWeight: 900, color: '#1C1917', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 12 }}>
        株式会社kubell
      </h1>
      <h2 style={{ fontSize: 36, fontWeight: 600, color: '#059669', lineHeight: 1, letterSpacing: '0.02em', marginBottom: 12 }}>
        （旧: Chatwork株式会社）
      </h2>
      <div style={{ width: 120, height: 3, background: 'linear-gradient(to right, transparent, #059669, transparent)', borderRadius: 2, margin: '24px auto 0' }} />
    </div>

    {/* Bottom label */}
    <div style={{ position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center' }}>
      <span style={{ fontSize: 11, color: '#065F46', fontWeight: 600, letterSpacing: '0.15em' }}>
        2026年5月 ｜ Meece株式会社
      </span>
    </div>
  </div>
);

const SlideKubellIntro = (
  <div key="s-kubell-intro" className="w-full h-[720px] overflow-hidden flex">
    {/* LEFT: Emerald identity panel */}
    <div style={{
      width: '42%',
      background: 'linear-gradient(160deg, #34D399 0%, #059669 45%, #047857 100%)',
      display: 'flex', flexDirection: 'column',
      padding: '44px 40px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', top: 100, right: 40, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

      {/* Logo mark + name */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: 16 }}>
        <div style={{ width: 54, height: 54, borderRadius: 14, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 26, fontWeight: 900, color: 'white' }}>kb</span>
        </div>
        <p style={{ fontSize: 26, fontWeight: 900, color: 'white', lineHeight: 1.15 }}>株式会社kubell</p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>旧: Chatwork株式会社（2024年7月1日 社名変更）</p>
      </div>

      {/* Mission / Vision */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, padding: '8px 14px' }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', marginBottom: 3 }}>MISSION</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.4 }}>「働くをもっと楽しく、創造的に」</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8, padding: '8px 14px' }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', marginBottom: 3 }}>VISION</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.4 }}>「すべての人に、一歩先の働き方を」</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { label: '売上高', value: '¥95.3億', sub: '2026年目標: ¥150億' },
          { label: '従業員数', value: '735名', sub: 'グループ全体 2026年3月末' },
          { label: '導入社数', value: '98.9万社+', sub: 'Chatwork 国内導入実績' },
        ].map(({ label, value, sub }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{label}</span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'white', display: 'block' }}>{value}</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Domain tags */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 'auto' }}>
        {['ビジネスチャットSaaS', 'BPaaS', 'DX支援', 'グローバル展開'].map((tag) => (
          <span key={tag} style={{ padding: '5px 11px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.18)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* RIGHT: Services list */}
    <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column', padding: '36px 44px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid #ECFDF5' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#059669', letterSpacing: '0.25em', marginBottom: 6 }}>SERVICES / サービスポートフォリオ</p>
        <p style={{ fontSize: 13, color: '#6B7280' }}>ビジネスチャットを起点とした多角的サービス展開</p>
      </div>

      {/* Services grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', flex: 1, gap: 0 }}>
        {[
          { num: '01', name: 'Chatwork', color: '#059669', desc: '国内98.9万社以上が導入するビジネスチャットSaaS' },
          { num: '02', name: 'タクシタ', color: '#0D9488', desc: 'チャット経由で経理・労務などを依頼できるオンライン業務代行' },
          { num: '03', name: 'Chatwork 労務管理', color: '#0891B2', desc: '給与計算・年末調整などを一括対応する人事労務BPaaS' },
          { num: '04', name: 'Chatwork DX相談窓口', color: '#2563EB', desc: '中小企業向けDX推進サポート' },
          { num: '05', name: 'セキュアSAMBA / ストレージ', color: '#7C3AED', desc: 'クラウドストレージサービス' },
          { num: '06', name: '勤怠管理 / MINAGINE', color: '#DB2777', desc: 'クラウド型勤怠管理システム' },
        ].map(({ num, name, color, desc }, i) => (
          <div key={num} style={{ padding: '16px 20px', borderTop: i >= 2 ? '1px solid #F3F4F6' : undefined, borderLeft: i % 2 === 1 ? '1px solid #F3F4F6' : undefined, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF' }}>{num}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color }}>{name}</span>
            </div>
            <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideKubellOverview = (
  <div key="s-kubell-overview" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    {/* Top accent bar */}
    <div style={{ height: 4, background: 'linear-gradient(to right, #34D399, #059669, #0891B2)', flexShrink: 0 }} />

    {/* Header */}
    <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '16px 40px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: '#34D399' }}>kb</span>
        </div>
        <div>
          <p style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1 }}>株式会社kubell</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>旧: Chatwork株式会社 — AI活用開発パートナー候補</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: 8, padding: '6px 14px' }}>
          <p style={{ fontSize: 10, color: '#6EE7B7', fontWeight: 700 }}>STAGE</p>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#34D399' }}>2回目TOP面談完了</p>
        </div>
        <div style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 8, padding: '6px 14px' }}>
          <p style={{ fontSize: 10, color: '#A5B4FC', fontWeight: 700 }}>TYPE</p>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#818CF8' }}>M&A / アライアンス</p>
        </div>
      </div>
    </div>

    {/* KPI strip */}
    <div style={{ display: 'flex', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
      {[
        { label: 'Chatworkユーザー', value: '中小企業中心', color: '#059669' },
        { label: '案件単価目線', value: '100〜300万円', color: '#0891B2' },
        { label: 'AI開発リソース', value: '即時連携可能', color: '#7C3AED' },
        { label: '拠点', value: '国内 + バンコク', color: '#DB2777' },
      ].map(({ label, value, color }) => (
        <div key={label} style={{ flex: 1, padding: '12px 20px', borderLeft: `3px solid ${color}`, borderRight: '1px solid #E2E8F0' }}>
          <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginBottom: 3 }}>{label}</p>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#1E293B' }}>{value}</p>
        </div>
      ))}
    </div>

    {/* Main 3-section layout */}
    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 24px', gap: 16 }}>

      {/* LEFT: Profile + Context */}
      <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0', flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 10 }}>企業プロフィール</p>
          {[
            { k: '旧社名', v: 'Chatwork株式会社' },
            { k: '社名変更', v: '2024年' },
            { k: '主力SaaS', v: 'Chatwork' },
            { k: '事業方向', v: 'DX・AI・BPO' },
            { k: 'グローバル', v: 'バンコク拠点あり' },
            { k: '顧客層', v: '中小企業中心' },
          ].map(({ k, v }) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{k}</span>
              <span style={{ fontSize: 11, color: '#1E293B', fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)', borderRadius: 12, padding: '12px 14px', border: '1px solid #6EE7B7' }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: '#065F46', marginBottom: 6 }}>M&A関心の背景</p>
          <p style={{ fontSize: 11, color: '#047857', lineHeight: 1.65 }}>Chatwork以外の事業領域へ積極展開中。AI活用開発力の補完と顧客基盤の相互活用を目的にM&A・アライアンスを検討。</p>
        </div>
      </div>

      {/* CENTER: Interest areas */}
      <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', flexShrink: 0, marginBottom: 2 }}>先方の興味関心事項</p>
        {[
          {
            title: 'AI活用受託事業の拡張',
            points: ['スモールサイズ案件をAIで多数並行受託', '100万円前後×複数件のスケールモデル', 'AI駆動開発で生産性を10倍以上に'],
          },
          {
            title: '営業・開発の役割分担モデル',
            points: ['Kubel: 営業・マーケ・案件獲得・顧客接点', 'Meece: AI駆動開発・PM・要件整理', 'お互いの強みを活かした分業体制'],
          },
          {
            title: '自社AI事業の戦略パートナー化',
            points: ['Meeceをグループ内AI開発の中核に', 'ドメイン知識×AI開発力で差別化', 'バックオフィス補完で成長体制整備'],
          },
        ].map(({ title, points }) => (
          <div key={title} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#059669', marginBottom: 8 }}>{title}</p>
            {points.map((p) => (
              <div key={p} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399', marginTop: 5, flexShrink: 0 }} />
                <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* RIGHT: Synergy */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', flexShrink: 0, marginBottom: 2 }}>シナジー構造</p>

        {/* Meece → Kubel */}
        <div style={{ borderRadius: 10, padding: '12px 14px', background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
          <p style={{ color: '#4338CA', fontSize: 10, fontWeight: 800, marginBottom: 8 }}>Meece → Kubel に提供</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['AI駆動開発力', '10倍生産性', 'PM・要件整理', '上流コンサル'].map((tag) => (
              <span key={tag} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#C7D2FE', color: '#3730A3' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Arrow + Combined */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          <div style={{ borderRadius: 10, padding: '8px 12px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(5,150,105,0.08), rgba(99,102,241,0.08))', border: '1px dashed #CBD5E1' }}>
            <p style={{ fontSize: 10, fontWeight: 900, color: '#374151' }}>統合後の提供価値</p>
            <p style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>AI開発 × 顧客基盤 × BPOのワンストップ</p>
          </div>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
        </div>

        {/* Kubel → Meece */}
        <div style={{ borderRadius: 10, padding: '12px 14px', background: '#ECFDF5', border: '1px solid #6EE7B7' }}>
          <p style={{ color: '#065F46', fontSize: 10, fontWeight: 800, marginBottom: 8 }}>Kubel → Meece に提供</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['中小企業顧客基盤', '案件供給', 'Chatworkユーザー接点', 'BPO体制'].map((tag) => (
              <span key={tag} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#A7F3D0', color: '#065F46' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Scale model */}
        <div style={{ borderRadius: 10, padding: '14px', background: 'linear-gradient(135deg, #1E3A5F, #1E293B)', color: 'white', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: '#93C5FD', fontSize: 10, fontWeight: 700, marginBottom: 8 }}>スケールモデル試算</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <p style={{ color: '#94A3B8', fontSize: 10, marginBottom: 2 }}>1案件単価</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>¥100万</p>
            </div>
            <div style={{ color: '#60A5FA', fontWeight: 900 }}>×</div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <p style={{ color: '#94A3B8', fontSize: 10, marginBottom: 2 }}>並行案件数</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>5〜6件</p>
            </div>
            <div style={{ background: '#3B82F6', borderRadius: 10, padding: '8px 12px', textAlign: 'center' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#BFDBFE' }}>月商</p>
              <p style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.1, color: 'white' }}>¥600万</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideKubellMeeting = (
  <div key="s-kubell-meeting" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    {/* Top accent bar */}
    <div style={{ height: 5, background: 'linear-gradient(to right, #34D399, #059669, #0891B2)', flexShrink: 0 }} />

    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>面談サマリー</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>株式会社kubell — TOP面談（2回）での論点整理</p>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#065F46', background: '#ECFDF5', border: '1px solid #6EE7B7', padding: '4px 14px', borderRadius: 999 }}>
        TOP面談 2回実施
      </span>
    </div>

    {/* 3-column main area */}
    <div className="flex flex-1 min-h-0">

      {/* Col 1: 興味関心事項 */}
      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <circle cx="22" cy="22" r="13" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
            <circle cx="22" cy="22" r="6" fill="white" opacity="0.9"/>
            <line x1="22" y1="2" x2="22" y2="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="35" x2="22" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="22" x2="9" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="35" y1="22" x2="42" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>興味関心事項</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>先方が注目するポイント</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#F0FDF4' }}>
          {[
            { n: 1, icon: '🤖', label: 'AI受託事業の拡張', text: 'スモール案件をAIで多数並行受託するモデルを実現したい' },
            { n: 2, icon: '🤝', label: '役割分担モデル', text: '営業/マーケ=Kubel、開発=MeeceというBizDev分業体制' },
            { n: 3, icon: '👥', label: '顧客基盤の相互活用', text: 'Chatworkユーザーへ AI開発サービスを横展開できないか' },
            { n: 4, icon: '🚀', label: '戦略パートナー化', text: 'MeeceをグループのAI開発中核として位置づけたい' },
          ].map(({ n, icon, label, text }) => (
            <div key={label} className="flex items-start gap-2.5 rounded-xl flex-1" style={{ background: 'white', border: '1px solid #A7F3D0', padding: '10px 12px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{n}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#065F46' }}>{label}</p>
                </div>
                <p style={{ fontSize: 11, color: '#047857', lineHeight: 1.6 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Col 2: Meeceの提供価値 */}
      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        <div style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <polygon points="22,3 26,15 38,15 29,23 32,35 22,28 12,35 15,23 6,15 18,15" fill="rgba(255,255,255,0.9)"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>Meeceの提供価値</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>Kubel側が評価するポイント</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#F0F9FF' }}>
          {[
            { icon: '⚡', label: 'AI駆動の圧倒的スピード', note: '開発スピード', pct: 92, text: '2週間で7〜8割完成のプロトタイプ提示。顧客の発注意欲を大幅UP。' },
            { icon: '💡', label: 'PM・要件整理の一体提供', note: '上流力', pct: 85, text: '案件獲得後の要件定義〜開発〜納品まで一気通貫で対応可能。' },
            { icon: '💰', label: '100万円台の競争力ある価格', note: 'コスト優位', pct: 88, text: 'AI活用で従来比70〜80%コスト削減。中小企業の予算感に合致。' },
            { icon: '📈', label: '複数案件並行のスケール力', note: 'スケーラビリティ', pct: 78, text: '3〜4件から最大5〜6件を並行受注できる体制へ拡張が可能。' },
          ].map(({ icon, label, note, pct, text }) => (
            <div key={label} className="rounded-xl flex-1" style={{ background: 'white', border: '1px solid #BAE6FD', padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#0E7490' }}>{label}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <div style={{ flex: 1, height: 5, background: '#E0F2FE', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(to right, #0891B2, #06B6D4)', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0891B2' }}>{pct}%</span>
                <span style={{ fontSize: 10, color: '#94A3B8' }}>{note}</span>
              </div>
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.55 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Col 3: 重要発言・本音 */}
      <div className="flex flex-col flex-1">
        <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect x="2" y="4" width="26" height="18" rx="5" fill="rgba(255,255,255,0.9)"/>
            <polygon points="7,22 7,30 15,22" fill="rgba(255,255,255,0.9)"/>
            <rect x="20" y="20" width="22" height="15" rx="4" fill="rgba(255,255,255,0.55)"/>
            <polygon points="37,35 37,42 30,35" fill="rgba(255,255,255,0.55)"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>重要発言・先方の本音</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>TOP面談で語られた本質</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#FAF5FF' }}>
          {[
            { quote: 'AIで開発生産性は上がっている。でも事業として大きくするには複数案件を並行管理できる仕組みが必要で、そこがまだ弱い。', note: '→ PМ機能・案件マネジメントを外部補完したい', color: '#7C3AED' },
            { quote: '中小企業に100万〜300万の案件を複数並行で受けるモデルに可能性がある。Chatworkユーザー基盤と組み合わせると相性が良い。', note: '→ スモール案件×顧客基盤のシナジーに本気', color: '#0891B2' },
            { quote: '単に開発できるだけでなく、AI開発のドメイン知識・事業推進力・PM・要件整理まで含めて入り込めるかが重要な論点。', note: '→ 技術力よりもビジネス推進力を重視', color: '#059669' },
            { quote: 'M&Aの考え方として、子会社を買って親会社の利益を増やすもの。親会社の利益に結びつかなければ意味がない。', note: '→ 財務的な利益貢献を明確に示す必要あり', color: '#D97706' },
          ].map(({ quote, note, color }) => (
            <div key={note} className="rounded-xl flex-1" style={{ background: 'white', borderLeft: `3px solid ${color}`, padding: '10px 12px' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
                <svg width="16" height="12" viewBox="0 0 16 12" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M0 12V7.2C0 3.2 2.4 1 7.2 0L8 1.6C5.6 2.2 4.4 3.4 4.4 5.2H7.2V12H0ZM8.8 12V7.2C8.8 3.2 11.2 1 16 0l.8 1.6C14.4 2.2 13.2 3.4 13.2 5.2H16V12H8.8Z" fill={color} opacity="0.3"/>
                </svg>
                <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.65, fontStyle: 'italic' }}>{quote}</p>
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, color, paddingLeft: 22 }}>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideKubellNext = (
  <div key="s-kubell-next" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    {/* Top accent bar */}
    <div style={{ height: 5, background: 'linear-gradient(to right, #34D399, #059669, #0891B2)', flexShrink: 0 }} />

    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>今後の方針</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>株式会社kubell — ネクストアクション</p>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #059669, #047857)', color: 'white', padding: '8px 18px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>🤝</span>
        <div>
          <p style={{ fontSize: 10, opacity: 0.75 }}>NEXT STEP</p>
          <p style={{ fontSize: 14, fontWeight: 900 }}>連携方向性の決定</p>
        </div>
      </div>
    </div>

    {/* Main: 2 columns */}
    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 40px', gap: 36 }}>

      {/* LEFT: Timeline */}
      <div style={{ width: '37%', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>プロセスタイムライン</p>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {[
            { phase: 'TOP面談（1回目）', status: 'done', label: '完了', desc: '両社代表が初めて面談。AI開発力への関心とM&A・アライアンスの可能性を確認。' },
            { phase: 'TOP面談（2回目）', status: 'done', label: '完了', desc: 'スモール案件モデルや役割分担・連携形態について踏み込んだ議論を実施。' },
            { phase: '連携方向性の決定', status: 'active', label: 'NEXT', desc: 'M&A・アライアンス・業務提携のいずれかを選択し、基本合意に向けて動き出す。' },
            { phase: '条件すり合わせ・LOI', status: 'upcoming', label: '予定', desc: 'Kubel→Meeceへ意向表明または提携条件書を提示。スコープ・対価を精査。' },
            { phase: 'DD・クロージング', status: 'upcoming', label: '予定', desc: 'デューデリジェンス対応 → 最終条件合意 → 契約締結・グループ参画。' },
          ].map(({ phase, status, label, desc }, i, arr) => (
            <div key={phase} style={{ display: 'flex', gap: 14, flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: status === 'done' ? '#059669' : status === 'active' ? '#059669' : '#E2E8F0', color: status === 'upcoming' ? '#94A3B8' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0, boxShadow: status === 'active' ? '0 0 0 4px #A7F3D0' : 'none' }}>
                  {status === 'done' ? '✓' : status === 'active' ? '▶' : i + 1}
                </div>
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: status === 'done' ? '#6EE7B7' : '#E2E8F0', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 10 : 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: status === 'done' ? '#065F46' : status === 'active' ? '#065F46' : '#94A3B8' }}>{phase}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: status === 'done' ? '#ECFDF5' : status === 'active' ? '#ECFDF5' : '#F1F5F9', color: status === 'done' ? '#065F46' : status === 'active' ? '#059669' : '#CBD5E1' }}>{label}</span>
                </div>
                <p style={{ fontSize: 11, lineHeight: 1.55, color: status === 'upcoming' ? '#CBD5E1' : '#94A3B8' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Next actions */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>ネクストアクション</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { action: '連携形態の方向性決定', owner: '両社', desc: 'M&A・アライアンス・業務提携の中から最適な形を選択し、次ステップを合意する。', color: '#059669' },
            { action: 'Meece実績・強み資料の整備', owner: 'Meece', desc: 'AI駆動開発の具体的な実績・スピード・コスト削減効果をまとめた説明資料を準備。', color: '#0891B2' },
            { action: 'スモール案件での試験連携', owner: '両社', desc: 'Kubel経由の案件をMeeceが受託するトライアルを実施し、連携モデルの実効性を検証する。', color: '#7C3AED' },
            { action: '意向表明書（LOI）の受領・精査', owner: 'Meece', desc: 'KubellからMeeceへ提示される条件書の内容を確認し、スコープ・条件を精査する。', color: '#2563EB' },
            { action: '受入体制・役割分担の設計', owner: '両社', desc: '本格連携に向けてPM・営業・開発の役割を明確化し、Meece側の体制整備を進める。', color: '#D97706' },
          ].map(({ action, owner, desc, color }) => (
            <div key={action} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'white', border: '1px solid #F1F5F9', borderLeft: `4px solid ${color}`, borderRadius: 12, padding: '11px 14px', flex: 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, border: '2px solid #E2E8F0', background: 'white', flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{action}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}15`, padding: '2px 9px', borderRadius: 999 }}>{owner}</span>
                </div>
                <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ marginTop: 10, flexShrink: 0, background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#065F46' }}>
            スモール案件での試験連携が最速の信頼構築 — 実績を積みながら連携形態を決定する
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   TOWNLIFE 株式会社
   ============================================================ */

const SlideTownlifeTitle = (
  <div key="s-tl-title" className="w-full h-[720px] overflow-hidden relative flex flex-col items-center justify-center"
    style={{ background: 'linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 40%, #BFDBFE 100%)' }}>
    {/* Decorative circles */}
    <div style={{ position: 'absolute', top: -80, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(59,130,246,0.12)' }} />
    <div style={{ position: 'absolute', bottom: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(29,78,216,0.10)' }} />
    <div style={{ position: 'absolute', top: '30%', right: '15%', width: 160, height: 160, borderRadius: '50%', background: 'rgba(96,165,250,0.15)' }} />

    {/* TL watermark */}
    <div style={{ position: 'absolute', right: -20, bottom: -40, fontSize: 320, fontWeight: 900, color: 'rgba(59,130,246,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>TL</div>

    {/* Meece label top-left */}
    <div style={{ position: 'absolute', top: 36, left: 44, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6' }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.18em' }}>Meece株式会社 — M&A取り組み状況</span>
    </div>

    {/* COMPANY 03 top-right */}
    <div style={{ position: 'absolute', top: 36, right: 44 }}>
      <span style={{ fontSize: 10, fontWeight: 800, color: '#93C5FD', letterSpacing: '0.25em' }}>COMPANY 03</span>
    </div>

    {/* Center content */}
    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {/* Accent bar */}
      <div style={{ width: 56, height: 5, borderRadius: 999, background: 'linear-gradient(to right, #3B82F6, #1D4ED8)', marginBottom: 28 }} />

      {/* Company name */}
      <p style={{ fontSize: 88, fontWeight: 900, color: '#1E3A8A', lineHeight: 1.0, letterSpacing: '-0.02em', textAlign: 'center' }}>タウンライフ</p>
      <p style={{ fontSize: 52, fontWeight: 900, color: '#3B82F6', lineHeight: 1.1, letterSpacing: '-0.01em', textAlign: 'center', marginBottom: 24 }}>株式会社</p>

      {/* Separator */}
      <div style={{ width: 280, height: 1, background: 'linear-gradient(to right, transparent, #93C5FD, transparent)', marginBottom: 24 }} />
    </div>

    {/* Bottom */}
    <div style={{ position: 'absolute', bottom: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#60A5FA' }}>2026年5月</span>
      <div style={{ width: 1, height: 14, background: '#93C5FD' }} />
      <span style={{ fontSize: 13, fontWeight: 600, color: '#60A5FA' }}>Meece株式会社</span>
    </div>
  </div>
);

const SlideTownlifeIntro = (
  <div key="s-tl-intro" className="w-full h-[720px] overflow-hidden flex">
    {/* LEFT: Blue identity panel */}
    <div style={{
      width: '42%',
      background: 'linear-gradient(160deg, #60A5FA 0%, #3B82F6 45%, #1D4ED8 100%)',
      display: 'flex', flexDirection: 'column',
      padding: '44px 40px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', top: 100, right: 40, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

      {/* Logo mark + name */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: 16 }}>
        <div style={{ width: 54, height: 54, borderRadius: 14, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>TL</span>
        </div>
        <p style={{ fontSize: 24, fontWeight: 900, color: 'white', lineHeight: 1.15 }}>タウンライフ株式会社</p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>住まい・不動産メディアを中心に多角事業展開</p>
      </div>

      {/* Philosophy / Mission */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, padding: '8px 14px' }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', marginBottom: 3 }}>PHILOSOPHY</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'white', lineHeight: 1.4 }}>「変化する社会に新たな事業システム・サービスを創造し、進化する」</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8, padding: '8px 14px' }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', marginBottom: 3 }}>MISSION</p>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'white', lineHeight: 1.45 }}>「有意義な情報・付加価値の高いサービスを提供し、社会貢献を目指す」</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { label: '売上高', value: '¥36.3億', sub: '2025年3月期 / 2028年目標: ¥100億' },
          { label: '従業員数', value: '234名', sub: 'グループ全体 2025年4月現在' },
          { label: 'クライアント数', value: '3,000社+', sub: '年間ユーザー接触数 約12万人' },
        ].map(({ label, value, sub }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{label}</span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'white', display: 'block' }}>{value}</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Domain tags */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 'auto' }}>
        {['住宅・不動産メディア', 'アフィリエイト', 'HRテック', 'DXコンサル'].map((tag) => (
          <span key={tag} style={{ padding: '5px 11px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.18)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* RIGHT: Services list */}
    <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column', padding: '36px 44px' }}>
      <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid #EFF6FF' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.25em', marginBottom: 6 }}>SERVICES / サービスポートフォリオ</p>
        <p style={{ fontSize: 13, color: '#6B7280' }}>住まいを起点に多様なデジタルサービスを展開</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', flex: 1, gap: 0 }}>
        {[
          { num: '01', name: 'メディア事業', color: '#3B82F6', desc: '「townlife家づくり」「townlifeリフォーム」など住まい・不動産マッチングプラットフォーム' },
          { num: '02', name: 'アフィリエイト事業', color: '#0EA5E9', desc: 'アフィリエイターのスカウト・育成を活用した広告宣伝サポート' },
          { num: '03', name: 'クリエイティブ事業', color: '#0891B2', desc: 'Webサイト、広告、各種販促ツールの企画・制作・デザイン' },
          { num: '04', name: 'HRテック事業', color: '#2563EB', desc: '建築・建設業界の現場人材における労働力不足の解決サポート' },
          { num: '05', name: '民泊事業', color: '#7C3AED', desc: '住宅を利用した宿泊施設の開設・運営による地域課題解決' },
          { num: '06', name: 'デジタルマーケティング', color: '#DB2777', desc: '多数メディアを活用したクロスセル・アップセル・AI活用集客' },
        ].map(({ num, name, color, desc }, i) => (
          <div key={num} style={{ padding: '16px 20px', borderTop: i >= 2 ? '1px solid #F3F4F6' : undefined, borderLeft: i % 2 === 1 ? '1px solid #F3F4F6' : undefined, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF' }}>{num}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color }}>{name}</span>
            </div>
            <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideTownlifeOverview = (
  <div key="s-tl-overview" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    <div style={{ height: 4, background: 'linear-gradient(to right, #60A5FA, #3B82F6, #1D4ED8)', flexShrink: 0 }} />

    {/* Header */}
    <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '16px 40px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(96,165,250,0.2)', border: '1px solid rgba(96,165,250,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#60A5FA' }}>TL</span>
        </div>
        <div>
          <p style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1 }}>タウンライフ株式会社</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>住まい・不動産メディア最大手 — AI開発力連携候補</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.4)', borderRadius: 8, padding: '6px 14px' }}>
          <p style={{ fontSize: 10, color: '#93C5FD', fontWeight: 700 }}>STAGE</p>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#60A5FA' }}>1回目面談完了</p>
        </div>
        <div style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 8, padding: '6px 14px' }}>
          <p style={{ fontSize: 10, color: '#A5B4FC', fontWeight: 700 }}>TYPE</p>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#818CF8' }}>M&A / アライアンス</p>
        </div>
      </div>
    </div>

    {/* KPI strip */}
    <div style={{ display: 'flex', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
      {[
        { label: 'メディア売上比率', value: '約80%', color: '#3B82F6' },
        { label: '年間ユーザー接触', value: '約12万人', color: '#0891B2' },
        { label: 'クライアント数', value: '3,000社+', color: '#7C3AED' },
        { label: '2028年売上目標', value: '¥100億', color: '#DB2777' },
      ].map(({ label, value, color }) => (
        <div key={label} style={{ flex: 1, padding: '12px 20px', borderLeft: `3px solid ${color}`, borderRight: '1px solid #E2E8F0' }}>
          <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginBottom: 3 }}>{label}</p>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#1E293B' }}>{value}</p>
        </div>
      ))}
    </div>

    {/* Main 3-section layout */}
    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 24px', gap: 16 }}>

      {/* LEFT: Profile + Context */}
      <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0', flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 10 }}>企業プロフィール</p>
          {[
            { k: '設立', v: '2003年9月25日' },
            { k: '所在地', v: '東京都新宿区' },
            { k: '資本金', v: '2,000万円' },
            { k: '売上高', v: '36.3億円(25年3月期)' },
            { k: '主軸', v: '住まい・不動産メディア' },
            { k: '展開', v: '10以上のメディア保有' },
          ].map(({ k, v }) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{k}</span>
              <span style={{ fontSize: 11, color: '#1E293B', fontWeight: 700, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', borderRadius: 12, padding: '12px 14px', border: '1px solid #93C5FD' }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: '#1E40AF', marginBottom: 6 }}>M&A関心の背景</p>
          <p style={{ fontSize: 11, color: '#1D4ED8', lineHeight: 1.65 }}>注文住宅の着工件数減少を受け、売上依存度を55%まで低下させる分散化戦略。AIを活用した既存メディア強化と新規プロダクト開発でポートフォリオ拡充を目指す。</p>
        </div>
      </div>

      {/* CENTER: Interest areas */}
      <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', flexShrink: 0, marginBottom: 2 }}>先方の興味関心事項</p>
        {[
          {
            title: 'AI活用による開発力強化',
            points: ['AI駆動開発による開発コスト削減・スピード向上', '既存エンジニアへのAIノウハウ横展開', 'AIで既存メディアの診断・集客コンテンツ強化'],
          },
          {
            title: '社内DX・プロダクト化',
            points: ['「タウンライフAI」構想 — 社内業務効率化', '3,000社クライアント向けAIプロダクト展開', '人事評価AIプロダクトへの関心'],
          },
          {
            title: '事業拡張・シナジー創出',
            points: ['コンテンツ力・営業力とMeeceのAI開発力の掛け合わせ', '新規メディア展開（10→20メディア計画）へのAI活用', 'チームビルディング力・組織横展開への期待'],
          },
        ].map(({ title, points }) => (
          <div key={title} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#3B82F6', marginBottom: 8 }}>{title}</p>
            {points.map((p) => (
              <div key={p} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#60A5FA', marginTop: 5, flexShrink: 0 }} />
                <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* RIGHT: Synergy */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', flexShrink: 0, marginBottom: 2 }}>シナジー構造</p>

        <div style={{ borderRadius: 10, padding: '12px 14px', background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
          <p style={{ color: '#4338CA', fontSize: 10, fontWeight: 800, marginBottom: 8 }}>Meece → タウンライフ に提供</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['AI駆動開発力', '高速プロトタイプ', 'PM・要件整理', '診断コンテンツ'].map((tag) => (
              <span key={tag} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#C7D2FE', color: '#3730A3' }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 10, padding: '10px 14px', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: '#166534' }}>⇄ 相互補完・共同成長</p>
        </div>

        <div style={{ borderRadius: 10, padding: '12px 14px', background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <p style={{ color: '#1D4ED8', fontSize: 10, fontWeight: 800, marginBottom: 8 }}>タウンライフ → Meece に提供</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['案件供給', '3,000社販路', 'コンテンツ力', '集客基盤'].map((tag) => (
              <span key={tag} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#BFDBFE', color: '#1E40AF' }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 10, padding: '12px 14px', background: 'white', border: '1px solid #E2E8F0', flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginBottom: 8 }}>想定連携モデル</p>
          {[
            '既存メディアへのAI診断コンテンツ実装',
            '3,000社向けAIプロダクト共同開発・販売',
            '社内エンジニアへのAI開発ノウハウ移転',
            '新規メディア立ち上げの高速開発支援',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#3B82F6', marginTop: 5, flexShrink: 0 }} />
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.5 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideTownlifeMeeting = (
  <div key="s-tl-meeting" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    {/* Top accent bar */}
    <div style={{ height: 5, background: 'linear-gradient(to right, #60A5FA, #3B82F6, #1D4ED8)', flexShrink: 0 }} />

    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>面談サマリー</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>タウンライフ株式会社 — 1回目面談での論点整理</p>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#1E40AF', background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '4px 14px', borderRadius: 999 }}>
        初回面談 完了・QA待ち
      </span>
    </div>

    {/* 3-column main area */}
    <div className="flex flex-1 min-h-0">

      {/* Col 1: 興味関心事項 */}
      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        <div style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <circle cx="22" cy="22" r="13" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
            <circle cx="22" cy="22" r="6" fill="white" opacity="0.9"/>
            <line x1="22" y1="2" x2="22" y2="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="35" x2="22" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="22" x2="9" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="35" y1="22" x2="42" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>興味関心事項</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>先方が注目するポイント</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#EFF6FF' }}>
          {[
            { n: 1, icon: '⚡', label: 'AI駆動の圧倒的スピード', text: '3日でプロトタイプを作るMeeceの開発力に強い関心。スピードと品質の両立に驚き。' },
            { n: 2, icon: '🔗', label: 'AIプロダクトの共同外販', text: '3,000社クライアントへAIプロダクトを共同展開できないか。住まい診断AIなど業界特化型での展開を想定。' },
            { n: 3, icon: '🎓', label: '社内エンジニアへのAI展開', text: '既存エンジニア10名へのAI開発ノウハウ浸透。AI化シフトを支援する体制の提供に関心。' },
            { n: 4, icon: '🤖', label: 'タウンライフAI構想協力', text: '4,000ファイルをAI学習させる社内AI化・SaaS化構想への協力。API連携での外販も視野に。' },
          ].map(({ n, icon, label, text }) => (
            <div key={label} className="flex items-start gap-2.5 rounded-xl flex-1" style={{ background: 'white', border: '1px solid #BFDBFE', padding: '10px 12px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{n}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#1E40AF' }}>{label}</p>
                </div>
                <p style={{ fontSize: 11, color: '#1D4ED8', lineHeight: 1.6 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Col 2: Meeceの提供価値 */}
      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        <div style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <polygon points="22,3 26,15 38,15 29,23 32,35 22,28 12,35 15,23 6,15 18,15" fill="rgba(255,255,255,0.9)"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>Meeceの提供価値</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>先方が評価するポイント</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#F0F9FF' }}>
          {[
            { icon: '🚀', label: 'AI開発の爆速デリバリー', note: '開発スピード', pct: 95, text: '3日プロトタイプ・2週間納品。コスト比80%削減でタウンライフの新事業スピードを加速。' },
            { icon: '💡', label: '企画〜納品の一気通貫力', note: '上流力', pct: 88, text: '要件定義・PM・AI開発・納品まで全工程を担当。タウンライフ側の工数を最小化できる。' },
            { icon: '🎯', label: '診断×AIの業界特化実装', note: 'ドメイン適合', pct: 90, text: '診断系コンテンツとAIの相性が良く、タウンライフの既存コンテンツ資産をAI化できる強み。' },
            { icon: '📈', label: 'エンジニアのAI化支援', note: 'ナレッジ移転', pct: 82, text: '社内エンジニア10名のAIシフトを技術・組織両面からサポートできる育成体制の提供。' },
          ].map(({ icon, label, note, pct, text }) => (
            <div key={label} className="rounded-xl flex-1" style={{ background: 'white', border: '1px solid #BAE6FD', padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#0E7490' }}>{label}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <div style={{ flex: 1, height: 5, background: '#E0F2FE', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(to right, #0891B2, #06B6D4)', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0891B2' }}>{pct}%</span>
                <span style={{ fontSize: 10, color: '#94A3B8' }}>{note}</span>
              </div>
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.55 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Col 3: 重要発言・本音 */}
      <div className="flex flex-col flex-1">
        <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect x="2" y="4" width="26" height="18" rx="5" fill="rgba(255,255,255,0.9)"/>
            <polygon points="7,22 7,30 15,22" fill="rgba(255,255,255,0.9)"/>
            <rect x="20" y="20" width="22" height="15" rx="4" fill="rgba(255,255,255,0.55)"/>
            <polygon points="37,35 37,42 30,35" fill="rgba(255,255,255,0.55)"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>重要発言・先方の本音</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>1回目面談で語られた本質</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#FAF5FF' }}>
          {[
            { quote: '診断系コンテンツとAIの相性は非常に良い。この方向での展開なら当社の強みをかなり活かせると思う。', note: '→ 既存コンテンツ資産×AI化に最大の関心', color: '#3B82F6' },
            { quote: 'エンジニアリング・PM・コンサルまでできる代表というのは珍しく、その点が一番刺さった。', note: '→ 技術力よりもビジネス推進力・総合力を評価', color: '#0891B2' },
            { quote: '社内に4,000ファイルのコンテンツがある。AI化して外販・SaaS化できるかが一番の論点になりそう。', note: '→ タウンライフAI構想の実現可能性を重視', color: '#7C3AED' },
            { quote: 'AIプロダクトを共同で外販することで、3,000社のクライアントにリーチできる可能性がある。', note: '→ 販路・クライアント基盤の活用に積極的', color: '#1D4ED8' },
          ].map(({ quote, note, color }) => (
            <div key={note} className="rounded-xl flex-1" style={{ background: 'white', borderLeft: `3px solid ${color}`, padding: '10px 12px' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
                <svg width="16" height="12" viewBox="0 0 16 12" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M0 12V7.2C0 3.2 2.4 1 7.2 0L8 1.6C5.6 2.2 4.4 3.4 4.4 5.2H7.2V12H0ZM8.8 12V7.2C8.8 3.2 11.2 1 16 0l.8 1.6C14.4 2.2 13.2 3.4 13.2 5.2H16V12H8.8Z" fill={color} opacity="0.3"/>
                </svg>
                <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.65, fontStyle: 'italic' }}>{quote}</p>
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, color, paddingLeft: 22 }}>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideTownlifeNext = (
  <div key="s-tl-next" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    {/* Top accent bar */}
    <div style={{ height: 5, background: 'linear-gradient(to right, #60A5FA, #3B82F6, #1D4ED8)', flexShrink: 0 }} />

    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>今後の方針</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>タウンライフ株式会社 — ネクストアクション</p>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', color: 'white', padding: '8px 18px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>📩</span>
        <div>
          <p style={{ fontSize: 10, opacity: 0.75 }}>NEXT STEP</p>
          <p style={{ fontSize: 14, fontWeight: 900 }}>QA回答・2回目面談</p>
        </div>
      </div>
    </div>

    {/* Main: 2 columns */}
    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 40px', gap: 36 }}>

      {/* LEFT: Timeline */}
      <div style={{ width: '37%', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>プロセスタイムライン</p>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {[
            { phase: '1回目面談', status: 'done', label: '完了', desc: '両社代表が面談。AI開発力・コンテンツ×AIシナジーへの関心を確認し手応えあり。' },
            { phase: 'タウンライフ社QA送付', status: 'active', label: 'NEXT', desc: '先方よりMeeceへの追加質問・確認事項を送付予定。回答後に2回目面談を設定する。' },
            { phase: 'Meece QA回答・資料準備', status: 'upcoming', label: '予定', desc: 'QAへの丁寧な回答と、実績・ロードマップ資料を整備して先方に送付する。' },
            { phase: '2回目面談', status: 'upcoming', label: '予定', desc: '深掘り議論・具体的な連携モデル（AI外販・SaaS化・エンジニア育成）の提案を実施。' },
            { phase: 'DD・クロージング', status: 'upcoming', label: '予定', desc: 'デューデリジェンス対応 → 最終条件合意 → 契約締結。' },
          ].map(({ phase, status, label, desc }, i, arr) => (
            <div key={phase} style={{ display: 'flex', gap: 14, flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: status === 'done' ? '#3B82F6' : status === 'active' ? '#3B82F6' : '#E2E8F0', color: status === 'upcoming' ? '#94A3B8' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0, boxShadow: status === 'active' ? '0 0 0 4px #BFDBFE' : 'none' }}>
                  {status === 'done' ? '✓' : status === 'active' ? '▶' : i + 1}
                </div>
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: status === 'done' ? '#BFDBFE' : '#E2E8F0', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 10 : 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: status === 'done' ? '#1E40AF' : status === 'active' ? '#1E40AF' : '#94A3B8' }}>{phase}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: status === 'done' ? '#EFF6FF' : status === 'active' ? '#EFF6FF' : '#F1F5F9', color: status === 'done' ? '#1E40AF' : status === 'active' ? '#3B82F6' : '#CBD5E1' }}>{label}</span>
                </div>
                <p style={{ fontSize: 11, lineHeight: 1.55, color: status === 'upcoming' ? '#CBD5E1' : '#94A3B8' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Next actions */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>ネクストアクション</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { action: 'QA内容の精査・回答準備', owner: 'Meece', desc: '先方からのQAを受領後、スキル詳細・担当範囲・体制・セキュリティ方針を丁寧に回答する。', color: '#3B82F6' },
            { action: 'AI開発実績・ロードマップ資料整備', owner: 'Meece', desc: '従来比80%コスト削減・2週間納品の実績と、0→3ヶ月での進め方をドキュメント化する。', color: '#0891B2' },
            { action: '診断×AI・外販モデルの提案準備', owner: 'Meece', desc: 'タウンライフの既存コンテンツを活用したAI化案と、3,000社への外販シナリオを具体化する。', color: '#7C3AED' },
            { action: 'タウンライフAI構想への協力案整理', owner: '両社', desc: '4,000ファイルのAI学習・SaaS化・API外販の実現ステップを整理し提案する。', color: '#1D4ED8' },
            { action: '2回目面談の日程調整', owner: '両社', desc: 'QA回答後に2回目面談を設定。連携モデルの深掘り・具体提案を実施する。', color: '#0891B2' },
          ].map(({ action, owner, desc, color }) => (
            <div key={action} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'white', border: '1px solid #F1F5F9', borderLeft: `4px solid ${color}`, borderRadius: 12, padding: '11px 14px', flex: 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, border: '2px solid #E2E8F0', background: 'white', flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{action}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}15`, padding: '2px 9px', borderRadius: 999 }}>{owner}</span>
                </div>
                <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ marginTop: 10, flexShrink: 0, background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF' }}>
            QAへの丁寧な回答が信頼構築の鍵 — 診断×AI・外販モデルの具体案を準備して2回目面談に臨む
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ========================================================
   SICグループ
   ======================================================== */

const SlideSICTitle = (
  <div key="s-sic-title" className="w-full h-[720px] overflow-hidden flex flex-col" style={{ background: 'linear-gradient(135deg, #0F0A1E 0%, #1E0A3C 40%, #2D1B69 100%)' }}>
    {/* Background pattern */}
    <div style={{ position: 'absolute', inset: 0, opacity: 0.07 }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', borderRadius: '50%', border: '1px solid #A78BFA', width: 120 + i * 80, height: 120 + i * 80, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      ))}
    </div>
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, padding: '60px 80px' }}>
      {/* Company number badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', borderRadius: 12, padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2 }}>COMPANY</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>04</span>
        </div>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, rgba(167,139,250,0.5), transparent)' }} />
      </div>

      {/* Center content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#A78BFA', letterSpacing: 4, marginBottom: 12 }}>SIC GROUP</p>
        <h1 style={{ fontSize: 64, fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
          SIC<br />
          <span style={{ background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>グループ</span>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 480, lineHeight: 1.7 }}>
          IT技術でより豊かな未来を — グループ全体のAI化を推進するITコングロマリット
        </p>
      </div>

      {/* Bottom stats row */}
      <div style={{ display: 'flex', gap: 32, paddingTop: 32, borderTop: '1px solid rgba(167,139,250,0.2)' }}>
        {[
          { label: '売上高', value: '約70億円', sub: 'グループ全体' },
          { label: '従業員数', value: '300名以上', sub: 'グループ全体' },
          { label: '事業柱', value: '3', sub: 'システム/プロダクト/デジタル' },
          { label: 'グループ会社', value: '7社', sub: 'SICテック含む' },
        ].map(({ label, value, sub }) => (
          <div key={label}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 26, fontWeight: 900, color: 'white', lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{sub}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideSICIntro = (
  <div key="s-sic-intro" className="w-full h-[720px] overflow-hidden flex">
    {/* Left panel */}
    <div style={{ width: '38%', background: 'linear-gradient(160deg, #1E0A3C 0%, #2D1B69 50%, #3B0764 100%)', display: 'flex', flexDirection: 'column', padding: '40px 36px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(124,58,237,0.15)' }} />
      <div style={{ position: 'absolute', top: 60, left: -60, width: 180, height: 180, borderRadius: '50%', background: 'rgba(91,33,182,0.1)' }} />
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'rgba(167,139,250,0.15)', borderRadius: 12, padding: '10px 16px', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28, alignSelf: 'flex-start' }}>
          <span style={{ fontSize: 16 }}>🏢</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#A78BFA', letterSpacing: 1 }}>COMPANY PROFILE</span>
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: 8 }}>SICグループ</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>株式会社SICシステム・SICテックを中核</p>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>ビジョン</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'white', lineHeight: 1.5 }}>「IT技術でより豊かな未来を」</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>役割</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>お客様のビジネスの発展に貢献するビジネス・ソリューションプロバイダー</p>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>本社所在地</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['東京都品川区（NTビル）', '長野県長野市（SIC長野ビル）'].map(loc => (
              <div key={loc} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12 }}>📍</span>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{loc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Right panel */}
    <div style={{ flex: 1, background: '#FAFAF9', display: 'flex', flexDirection: 'column', padding: '32px 36px' }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 6 }}>グループ会社構成</h3>
      <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 20 }}>7社体制でITサービスを提供</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1 }}>
        {[
          { name: 'SICシステム', role: 'グループ中核・システム開発', emp: '約170名', color: '#7C3AED' },
          { name: 'SICテック', role: 'エンジニア育成・技術研究', emp: '—', color: '#5B21B6' },
          { name: 'SICイーワークス', role: 'Eワーク・BPO事業', emp: '—', color: '#6D28D9' },
          { name: 'SICマーケティング', role: 'マーケティング支援', emp: '—', color: '#7C3AED' },
          { name: '富久屋', role: '事業多角化', emp: '—', color: '#8B5CF6' },
          { name: '丸伊伊那青果', role: '農産物流通', emp: '—', color: '#A78BFA' },
          { name: 'Logix Technology', role: 'ロジスティクスIT', emp: '—', color: '#6D28D9' },
        ].map(({ name, role, emp, color }) => (
          <div key={name} style={{ background: 'white', borderRadius: 10, padding: '12px 14px', border: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
              <p style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{name}</p>
            </div>
            <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.4 }}>{role}</p>
            {emp !== '—' && <p style={{ fontSize: 11, fontWeight: 600, color }}>従業員 {emp}</p>}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, background: '#F5F3FF', borderRadius: 10, padding: '10px 16px', border: '1px solid #DDD6FE' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#5B21B6' }}>グループ全体: 売上高 約70億円 / 従業員 300名以上</p>
      </div>
    </div>
  </div>
);

const SlideSICOverview = (
  <div key="s-sic-overview" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    {/* Top accent bar */}
    <div style={{ height: 4, background: 'linear-gradient(to right, #A78BFA, #7C3AED, #5B21B6)', flexShrink: 0 }} />

    {/* Dark header */}
    <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '16px 40px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(167,139,250,0.2)', border: '1px solid rgba(167,139,250,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#A78BFA' }}>SIC</span>
        </div>
        <div>
          <p style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1 }}>SICグループ</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>ITコングロマリット — AI開発力連携候補</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.4)', borderRadius: 8, padding: '6px 14px' }}>
          <p style={{ fontSize: 10, color: '#C4B5FD', fontWeight: 700 }}>STAGE</p>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#A78BFA' }}>1回目TOP面談完了</p>
        </div>
        <div style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 8, padding: '6px 14px' }}>
          <p style={{ fontSize: 10, color: '#A5B4FC', fontWeight: 700 }}>TYPE</p>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#818CF8' }}>M&A / アライアンス</p>
        </div>
      </div>
    </div>

    {/* KPI strip */}
    <div style={{ display: 'flex', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
      {[
        { label: 'グループ売上高', value: '約70億円', color: '#7C3AED' },
        { label: 'グループ従業員', value: '300名以上', color: '#0891B2' },
        { label: 'グループ会社', value: '7社体制', color: '#5B21B6' },
        { label: 'SICシステム規模', value: '約170名', color: '#DB2777' },
      ].map(({ label, value, color }) => (
        <div key={label} style={{ flex: 1, padding: '12px 20px', borderLeft: `3px solid ${color}`, borderRight: '1px solid #E2E8F0' }}>
          <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginBottom: 3 }}>{label}</p>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#1E293B' }}>{value}</p>
        </div>
      ))}
    </div>

    {/* Main 3-section layout */}
    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 24px', gap: 16 }}>

      {/* LEFT: Profile + Context */}
      <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0', flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 10 }}>企業プロフィール</p>
          {[
            { k: '業種', v: 'ITシステム・DX' },
            { k: '本社', v: '東京品川区 / 長野市' },
            { k: '売上高', v: '約70億円（グループ）' },
            { k: '従業員', v: '300名以上' },
            { k: '主軸事業', v: 'システムソリューション' },
            { k: 'グループ', v: '7社体制' },
          ].map(({ k, v }) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{k}</span>
              <span style={{ fontSize: 11, color: '#1E293B', fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)', borderRadius: 12, padding: '12px 14px', border: '1px solid #C4B5FD' }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: '#4C1D95', marginBottom: 6 }}>M&A関心の背景</p>
          <p style={{ fontSize: 11, color: '#5B21B6', lineHeight: 1.65 }}>AI開発力の内製化不足を外部補完で解決し、グループ全体をAI駆動開発に転換。受託開発の競争力強化と87.5%工数削減インパクトを高く評価。</p>
        </div>
      </div>

      {/* CENTER: Interest areas */}
      <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', flexShrink: 0, marginBottom: 2 }}>先方の興味関心事項</p>
        {[
          {
            title: 'AI開発力の強化・内製化',
            points: ['0→3ヶ月で自走できるAI人材育成モデル', 'グループ全体への横展開を想定した仕組み化', 'AI開発チームビルディングのノウハウ取り込み'],
          },
          {
            title: 'グループ全体のAI化推進',
            points: ['M&A後の全案件をAI駆動開発で進めてほしい', '87.5%工数削減でSICの受託競争力を直接強化', 'ITコングロマリット全社のDX・AI化加速'],
          },
          {
            title: '事業成長・体制強化',
            points: ['MeeceをグループのAI開発中核として位置づけ', 'エンジニア育成とAI組織構築の外部パートナー', 'M&Aの価値観・哲学の一致を重要視'],
          },
        ].map(({ title, points }) => (
          <div key={title} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#7C3AED', marginBottom: 8 }}>{title}</p>
            {points.map((p) => (
              <div key={p} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#A78BFA', marginTop: 5, flexShrink: 0 }} />
                <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* RIGHT: Synergy */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', flexShrink: 0, marginBottom: 2 }}>シナジー構造</p>

        <div style={{ borderRadius: 10, padding: '12px 14px', background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
          <p style={{ color: '#4338CA', fontSize: 10, fontWeight: 800, marginBottom: 8 }}>Meece → SICグループ に提供</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['AI駆動開発力', '87.5%工数削減', 'エンジニア育成', 'PM・要件整理'].map((tag) => (
              <span key={tag} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#C7D2FE', color: '#3730A3' }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 10, padding: '10px 14px', background: '#F5F3FF', border: '1px solid #DDD6FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: '#5B21B6' }}>⇄ 相互補完・グループ全体AI化</p>
        </div>

        <div style={{ borderRadius: 10, padding: '12px 14px', background: '#F5F3FF', border: '1px solid #DDD6FE' }}>
          <p style={{ color: '#5B21B6', fontSize: 10, fontWeight: 800, marginBottom: 8 }}>SICグループ → Meece に提供</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['受託案件供給', 'グループ販路', 'ITコングロマリット基盤', '多様な業種接点'].map((tag) => (
              <span key={tag} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#DDD6FE', color: '#4C1D95' }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 10, padding: '12px 14px', background: 'white', border: '1px solid #E2E8F0', flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginBottom: 8 }}>想定連携モデル</p>
          {[
            'グループ全案件のAI駆動開発化（M&A後）',
            'SICエンジニアへのAI育成モデル横展開',
            '受託開発スピード・競争力の抜本的強化',
            '新規プロダクト・DX案件のAI高速開発',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C3AED', marginTop: 5, flexShrink: 0 }} />
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.5 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideSICMeeting = (
  <div key="s-sic-meeting" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    {/* Top accent bar */}
    <div style={{ height: 5, background: 'linear-gradient(to right, #A78BFA, #7C3AED, #5B21B6)', flexShrink: 0 }} />

    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>面談サマリー</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>SICグループ — TOP面談（2026年5月12日）での論点整理</p>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#5B21B6', background: '#F5F3FF', border: '1px solid #DDD6FE', padding: '4px 14px', borderRadius: 999 }}>
        初回面談 完了・2回目調整中
      </span>
    </div>

    {/* 3-column main area */}
    <div className="flex flex-1 min-h-0">

      {/* Col 1: 興味関心事項 */}
      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <circle cx="22" cy="22" r="13" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
            <circle cx="22" cy="22" r="6" fill="white" opacity="0.9"/>
            <line x1="22" y1="2" x2="22" y2="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="35" x2="22" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="22" x2="9" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="35" y1="22" x2="42" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>興味関心事項</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>先方が注目するポイント</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#F5F3FF' }}>
          {[
            { n: 1, icon: '🤖', label: 'AI開発力の強化', text: 'AI開発できる人材がまだ少ない。育成スピードと仕組み化が最重要課題。' },
            { n: 2, icon: '🏗️', label: 'AI開発の仕組化', text: '0→3ヶ月で自走できる体制を構築し、グループ全体に横展開したい。' },
            { n: 3, icon: '👥', label: 'チームビルディング力', text: 'AI時代のエンジニア組織づくりのノウハウを外部から取り込みたい。' },
            { n: 4, icon: '🚀', label: 'グループ全体のAI化推進', text: '参画後はグループ全案件をAI駆動開発で進めてほしい。大きなビジョン。' },
          ].map(({ n, icon, label, text }) => (
            <div key={label} className="flex items-start gap-2.5 rounded-xl flex-1" style={{ background: 'white', border: '1px solid #DDD6FE', padding: '10px 12px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#7C3AED', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{n}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#4C1D95' }}>{label}</p>
                </div>
                <p style={{ fontSize: 11, color: '#5B21B6', lineHeight: 1.6 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Col 2: Meeceの提供価値 */}
      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        <div style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <polygon points="22,3 26,15 38,15 29,23 32,35 22,28 12,35 15,23 6,15 18,15" fill="rgba(255,255,255,0.9)"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>Meeceの提供価値</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>SIC側が評価するポイント</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#F0F9FF' }}>
          {[
            { icon: '🤖', label: 'AI社内人材への横展開', note: '育成力', pct: 92, text: '0→3ヶ月自走化の育成モデルをグループ全体に展開。AI人材不足を外部補完で解決。' },
            { icon: '⚡', label: 'AI駆動の圧倒的開発速度', note: '87.5%削減', pct: 95, text: 'SICの受託開発競争力を抜本的に強化。「この数字が刺さった」と代表が評価。' },
            { icon: '🏗️', label: '体制・働き方の柔軟性', note: '連携力', pct: 85, text: 'グループ企業の体制に合わせた柔軟な参画形態。ITコングロマリット構想と親和性高い。' },
            { icon: '📈', label: '営業力・案件獲得力', note: '事業力', pct: 80, text: 'MeeceとSICグループの販路を組み合わせた相互補完モデルが実現できる。' },
          ].map(({ icon, label, note, pct, text }) => (
            <div key={label} className="rounded-xl flex-1" style={{ background: 'white', border: '1px solid #BAE6FD', padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#0E7490' }}>{label}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <div style={{ flex: 1, height: 5, background: '#E0F2FE', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(to right, #0891B2, #06B6D4)', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0891B2' }}>{pct}%</span>
                <span style={{ fontSize: 10, color: '#94A3B8' }}>{note}</span>
              </div>
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.55 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Col 3: 重要発言・先方の本音 */}
      <div className="flex flex-col flex-1">
        <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect x="2" y="4" width="26" height="18" rx="5" fill="rgba(255,255,255,0.9)"/>
            <polygon points="7,22 7,30 15,22" fill="rgba(255,255,255,0.9)"/>
            <rect x="20" y="20" width="22" height="15" rx="4" fill="rgba(255,255,255,0.55)"/>
            <polygon points="37,35 37,42 30,35" fill="rgba(255,255,255,0.55)"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>重要発言・先方の本音</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>TOP面談で語られた本質</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#FAF5FF' }}>
          {[
            { quote: 'AI開発できる人材がまだ少ない。0→3ヶ月で自走できるなら横展開できる。', note: '→ 育成スピードと仕組み化が最重要論点', color: '#7C3AED' },
            { quote: '87.5%の工数削減という数字が刺さった。そのインパクトは大きい。', note: '→ 競争力強化の具体的な数字が決め手', color: '#0891B2' },
            { quote: 'グループに参画してもらえる場合は全案件をAI駆動開発で進めてほしい。', note: '→ M&A後の全案件AI化という大きなビジョン', color: '#7C3AED' },
            { quote: 'M&Aの哲学について共感。お互いの価値観の一致を重要視している。', note: '→ 文化・価値観の一致がM&A成功の鍵', color: '#D97706' },
          ].map(({ quote, note, color }) => (
            <div key={note} className="rounded-xl flex-1" style={{ background: 'white', borderLeft: `3px solid ${color}`, padding: '10px 12px' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
                <svg width="16" height="12" viewBox="0 0 16 12" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M0 12V7.2C0 3.2 2.4 1 7.2 0L8 1.6C5.6 2.2 4.4 3.4 4.4 5.2H7.2V12H0ZM8.8 12V7.2C8.8 3.2 11.2 1 16 0l.8 1.6C14.4 2.2 13.2 3.4 13.2 5.2H16V12H8.8Z" fill={color} opacity="0.3"/>
                </svg>
                <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.65, fontStyle: 'italic' }}>{quote}</p>
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, color, paddingLeft: 22 }}>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideSICNext = (
  <div key="s-sic-next" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    {/* Top accent bar */}
    <div style={{ height: 5, background: 'linear-gradient(to right, #A78BFA, #7C3AED, #5B21B6)', flexShrink: 0 }} />

    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>今後の方針</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>SICグループ — ネクストアクション</p>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', color: 'white', padding: '8px 18px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>📨</span>
        <div>
          <p style={{ fontSize: 10, opacity: 0.75 }}>NEXT STEP</p>
          <p style={{ fontSize: 14, fontWeight: 900 }}>SICより意向表明待ち</p>
        </div>
      </div>
    </div>

    {/* Main: 2 columns */}
    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 40px', gap: 36 }}>

      {/* LEFT: Timeline */}
      <div style={{ width: '37%', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>プロセスタイムライン</p>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {[
            { phase: 'TOP面談', status: 'done', label: '完了', desc: '両社代表が初めて面談。AI開発力・エンジニア育成・全案件AI化への関心を確認。' },
            { phase: 'QA対応', status: 'done', label: '完了', desc: 'SICよりQA送付、Meeceが回答済み。懸念事項の解消と連携イメージを共有。' },
            { phase: 'SICより意向表明', status: 'active', label: 'NEXT', desc: 'SICグループからMeeceへ意向表明を送付予定。内容を受領・精査する。' },
            { phase: '条件すり合わせ・LOI', status: 'upcoming', label: '予定', desc: '意向表明を踏まえ、参画形態・条件・スコープを詳細に詰める。' },
            { phase: 'DD・クロージング', status: 'upcoming', label: '予定', desc: 'デューデリジェンス対応 → 最終条件合意 → 契約締結・グループ参画。' },
          ].map(({ phase, status, label, desc }, i, arr) => (
            <div key={phase} style={{ display: 'flex', gap: 14, flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: status === 'done' ? '#7C3AED' : status === 'active' ? '#7C3AED' : '#E2E8F0', color: status === 'upcoming' ? '#94A3B8' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0, boxShadow: status === 'active' ? '0 0 0 4px #DDD6FE' : 'none' }}>
                  {status === 'done' ? '✓' : status === 'active' ? '▶' : i + 1}
                </div>
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: status === 'done' ? '#A78BFA' : '#E2E8F0', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 10 : 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: status === 'done' ? '#5B21B6' : status === 'active' ? '#5B21B6' : '#94A3B8' }}>{phase}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: status === 'done' ? '#F5F3FF' : status === 'active' ? '#F5F3FF' : '#F1F5F9', color: status === 'done' ? '#5B21B6' : status === 'active' ? '#7C3AED' : '#CBD5E1' }}>{label}</span>
                </div>
                <p style={{ fontSize: 11, lineHeight: 1.55, color: status === 'upcoming' ? '#CBD5E1' : '#94A3B8' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Next actions */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>ネクストアクション</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { action: '意向表明書の受領・内容精査', owner: 'Meece', desc: 'SICグループより送付される意向表明を受領し、参画形態・条件・スコープを確認する。', color: '#7C3AED' },
            { action: '意向表明を踏まえた条件検討', owner: 'Meece', desc: '提示内容に対するMeeceの回答方針・許容条件の範囲を整理する。', color: '#7C3AED' },
            { action: '条件すり合わせ面談の設定', owner: '両社', desc: '意向表明受領後、速やかに条件詳細を議論する場を設定する。', color: '#5B21B6' },
            { action: 'DD対応準備（財務・契約・組織）', owner: 'Meece', desc: 'デューデリジェンスに備え、財務資料・契約関係・組織体制の整理を着手する。', color: '#0891B2' },
            { action: '最終参画形態の意思決定', owner: '両社', desc: 'M&A・業務提携・資本提携の各オプションを精査し、双方合意の形態に絞り込む。', color: '#5B21B6' },
          ].map(({ action, owner, desc, color }) => (
            <div key={action} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'white', border: '1px solid #F1F5F9', borderLeft: `4px solid ${color}`, borderRadius: 12, padding: '11px 14px', flex: 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, border: '2px solid #E2E8F0', background: 'white', flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{action}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}15`, padding: '2px 9px', borderRadius: 999 }}>{owner}</span>
                </div>
                <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ marginTop: 10, flexShrink: 0, background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#5B21B6' }}>
            QA対応完了・SICより意向表明待ちの段階 — 意向表明の受領後、速やかに条件精査・DD準備に移行する
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// COMPANY 05: ギブクリエーション
// ============================================================

const SlideGiveTitle = (
  <div key="s-give-title" className="w-full h-[720px] overflow-hidden flex flex-col" style={{ background: 'linear-gradient(135deg, #1A0A0F 0%, #3D0B1F 40%, #6B1030 100%)' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.07 }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', borderRadius: '50%', border: '1px solid #FDA4AF', width: 120 + i * 80, height: 120 + i * 80, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      ))}
    </div>
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, padding: '60px 80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #E11D48, #BE123C)', borderRadius: 12, padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2 }}>COMPANY</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>05</span>
        </div>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, rgba(253,164,175,0.5), transparent)' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#FDA4AF', letterSpacing: 4, marginBottom: 12 }}>GIVE CREATION</p>
        <h1 style={{ fontSize: 64, fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
          ギブ<br />
          <span style={{ background: 'linear-gradient(135deg, #FDA4AF, #E11D48)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>クリエーション</span>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 480, lineHeight: 1.7 }}>
          メーカー特化型人材紹介のリーダー — AI駆動でHR Tech企業への進化を目指す
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, paddingTop: 32, borderTop: '1px solid rgba(253,164,175,0.2)' }}>
        {[
          { label: '売上高', value: '21.7億円', sub: '急成長中' },
          { label: '従業員数', value: '50〜100名', sub: '少数精鋭' },
          { label: 'Google口コミ', value: '4.9', sub: '顧客満足度' },
          { label: '設立', value: '2021年', sub: '創業3年で急成長' },
        ].map(({ label, value, sub }) => (
          <div key={label}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 26, fontWeight: 900, color: 'white', lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{sub}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideGiveIntro = (
  <div key="s-give-intro" className="w-full h-[720px] overflow-hidden flex">
    <div style={{ width: '38%', background: 'linear-gradient(160deg, #3D0B1F 0%, #6B1030 50%, #881337 100%)', display: 'flex', flexDirection: 'column', padding: '40px 36px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(225,29,72,0.15)' }} />
      <div style={{ position: 'absolute', top: 60, left: -60, width: 180, height: 180, borderRadius: '50%', background: 'rgba(190,18,60,0.1)' }} />
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'rgba(253,164,175,0.15)', borderRadius: 12, padding: '10px 16px', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28, alignSelf: 'flex-start' }}>
          <span style={{ fontSize: 16 }}>🏢</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#FDA4AF', letterSpacing: 1 }}>COMPANY PROFILE</span>
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: 8 }}>ギブクリエーション</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>メーカー特化型人材紹介のリーダー企業</p>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>ビジョン</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'white', lineHeight: 1.5 }}>メーカー採用をAIで変革するHR Techへ</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>強み</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>メーカー業界特化の独自パイプラインと高いマッチング品質（Google口コミ 4.9）</p>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>企業概要</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['設立: 2021年1月 / 資本金: 1,000万円', 'グループ: GIOテクノロジーズ'].map(loc => (
              <div key={loc} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12 }}>📌</span>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{loc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div style={{ flex: 1, background: '#FAFAF9', display: 'flex', flexDirection: 'column', padding: '32px 36px' }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 6 }}>事業モデルと強み</h3>
      <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 20 }}>メーカー特化 × 独自パイプラインで高品質マッチングを実現</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1 }}>
        {[
          { name: 'メーカー特化採用', role: 'ものづくり業界への深い知見と専門ネットワーク', color: '#E11D48' },
          { name: '独自パイプライン', role: '他社にない候補者データベースで高いマッチング精度', color: '#BE123C' },
          { name: '採用支援AI（開発中）', role: '7月公開予定のAIサービスで業務効率を革命的に改善', color: '#E11D48' },
          { name: 'HR Techへの進化', role: 'AI×人材紹介でHR Tech企業への転換を推進', color: '#9F1239' },
          { name: '急成長の実績', role: '2021年設立から3年で売上高21.7億円を達成', color: '#BE123C' },
          { name: 'GIOテクノロジーズ連携', role: '親会社のIT基盤を活用しIT内製化を推進中', color: '#E11D48' },
        ].map(({ name, role, color }) => (
          <div key={name} style={{ background: 'white', borderRadius: 10, padding: '12px 14px', border: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
              <p style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{name}</p>
            </div>
            <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.4 }}>{role}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, background: '#FFF1F2', borderRadius: 10, padding: '10px 16px', border: '1px solid #FECDD3' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#9F1239' }}>Google口コミ 4.9 / 売上高 21.7億円 / 設立3年の急成長ベンチャー</p>
      </div>
    </div>
  </div>
);

const SlideGiveOverview = (
  <div key="s-give-overview" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    <div style={{ height: 4, background: 'linear-gradient(to right, #FDA4AF, #E11D48, #BE123C)', flexShrink: 0 }} />

    <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '16px 40px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(225,29,72,0.2)', border: '1px solid rgba(225,29,72,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: '#FDA4AF' }}>GC</span>
        </div>
        <div>
          <p style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1 }}>ギブクリエーション</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>メーカー特化型人材紹介 — HR Tech AI化候補</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ background: 'rgba(225,29,72,0.15)', border: '1px solid rgba(225,29,72,0.4)', borderRadius: 8, padding: '6px 14px' }}>
          <p style={{ fontSize: 10, color: '#FDA4AF', fontWeight: 700 }}>STAGE</p>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#E11D48' }}>TOP面談完了</p>
        </div>
        <div style={{ background: 'rgba(190,18,60,0.15)', border: '1px solid rgba(190,18,60,0.4)', borderRadius: 8, padding: '6px 14px' }}>
          <p style={{ fontSize: 10, color: '#FDA4AF', fontWeight: 700 }}>TYPE</p>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#BE123C' }}>M&A / HR Tech連携</p>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
      {[
        { label: '売上高', value: '21.7億円', color: '#E11D48' },
        { label: '従業員数', value: '50〜100名', color: '#0891B2' },
        { label: 'Google口コミ', value: '4.9 ★', color: '#BE123C' },
        { label: '設立', value: '2021年1月', color: '#9F1239' },
      ].map(({ label, value, color }) => (
        <div key={label} style={{ flex: 1, padding: '12px 20px', borderLeft: `3px solid ${color}`, borderRight: '1px solid #E2E8F0' }}>
          <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginBottom: 3 }}>{label}</p>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#1E293B' }}>{value}</p>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 24px', gap: 16 }}>

      <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0', flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 10 }}>企業プロフィール</p>
          {[
            { k: '設立', v: '2021年1月' },
            { k: '資本金', v: '1,000万円' },
            { k: '売上高', v: '21.7億円' },
            { k: '従業員', v: '50〜100名' },
            { k: '主力事業', v: 'メーカー特化型人材紹介' },
            { k: 'グループ', v: 'GIOテクノロジーズ' },
          ].map(({ k, v }) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{k}</span>
              <span style={{ fontSize: 11, color: '#1E293B', fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)', borderRadius: 12, padding: '12px 14px', border: '1px solid #FDA4AF' }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: '#9F1239', marginBottom: 6 }}>M&A関心の背景</p>
          <p style={{ fontSize: 11, color: '#BE123C', lineHeight: 1.65 }}>AI駆動開発力の補完によりHR Tech化を加速。GIOテクノロジーズ子会社化でIT内製化を推進中。7月公開AIサービスの開発加速が最優先課題。</p>
        </div>
      </div>

      <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', flexShrink: 0, marginBottom: 2 }}>先方の興味関心事項</p>
        {[
          {
            title: '自社AIサービスの開発力強化',
            points: ['7月公開予定AIサービスの開発加速が急務', 'AI駆動開発で87.5%工数削減の実現を期待', '採用AI機能の品質・スピード向上'],
          },
          {
            title: '採用支援システムのAI化',
            points: ['人材紹介業務のAI自動化で生産性を大幅向上', 'マッチング精度のAI強化で差別化を図る', '採用プロセス全体のHR Tech化を推進'],
          },
          {
            title: 'HR Tech企業への進化',
            points: ['メーカー特化の強みを活かしたHR Tech化', 'AI×人材紹介の新ビジネスモデル構築', 'GIOテクノロジーズとの協業でIT内製化加速'],
          },
        ].map(({ title, points }) => (
          <div key={title} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#E11D48', marginBottom: 8 }}>{title}</p>
            {points.map((p) => (
              <div key={p} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FDA4AF', marginTop: 5, flexShrink: 0 }} />
                <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', flexShrink: 0, marginBottom: 2 }}>シナジー構造</p>

        <div style={{ borderRadius: 10, padding: '12px 14px', background: '#FFF1F2', border: '1px solid #FECDD3' }}>
          <p style={{ color: '#9F1239', fontSize: 10, fontWeight: 800, marginBottom: 8 }}>Meece → ギブクリエーション に提供</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['AI駆動開発力', '採用支援AI実装', 'HR Tech高速開発', '87.5%工数削減'].map((tag) => (
              <span key={tag} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#FECDD3', color: '#9F1239' }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 10, padding: '10px 14px', background: '#FFE4E6', border: '1px solid #FECDD3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: '#BE123C' }}>⇄ 相互補完・HR Tech共創</p>
        </div>

        <div style={{ borderRadius: 10, padding: '12px 14px', background: '#FFF1F2', border: '1px solid #FECDD3' }}>
          <p style={{ color: '#BE123C', fontSize: 10, fontWeight: 800, marginBottom: 8 }}>ギブクリエーション → Meece に提供</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['メーカー採用案件', '独自パイプライン', 'HR知見', '製造業ネットワーク'].map((tag) => (
              <span key={tag} style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#FECDD3', color: '#9F1239' }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 10, padding: '12px 14px', background: 'white', border: '1px solid #E2E8F0', flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginBottom: 8 }}>想定連携モデル</p>
          {[
            'AIサービス共同開発でHR Techへの転換を加速',
            '採用支援AI実装によるマッチング精度向上',
            'メーカー採用案件のAI高速開発・受注拡大',
            'HR Tech新ビジネスモデルの共同構築',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#E11D48', marginTop: 5, flexShrink: 0 }} />
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.5 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideGiveMeeting = (
  <div key="s-give-meeting" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    <div style={{ height: 5, background: 'linear-gradient(to right, #FDA4AF, #E11D48, #BE123C)', flexShrink: 0 }} />

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>面談サマリー</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>ギブクリエーション — TOP面談（2026年5月20日）での論点整理</p>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#BE123C', background: '#FFF1F2', border: '1px solid #FECDD3', padding: '4px 14px', borderRadius: 999 }}>
        TOP面談 完了・2回目調整中
      </span>
    </div>

    <div className="flex flex-1 min-h-0">

      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        <div style={{ background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <circle cx="22" cy="22" r="13" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
            <circle cx="22" cy="22" r="6" fill="white" opacity="0.9"/>
            <line x1="22" y1="2" x2="22" y2="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="35" x2="22" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="22" x2="9" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="35" y1="22" x2="42" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>興味関心事項</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>先方が注目するポイント</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#FFF1F2' }}>
          {[
            { n: 1, icon: '🤖', label: 'AIサービス開発加速', text: '7月公開予定のAIサービス開発を加速したい。タイムラインが逼迫している。' },
            { n: 2, icon: '📊', label: '採用支援AI化', text: '人材紹介業務のAI自動化で生産性を大幅に向上させたい。' },
            { n: 3, icon: '⚡', label: '87.5%工数削減への関心', text: 'Meeceの工数削減実績に強い関心。自社AI開発への応用を検討。' },
            { n: 4, icon: '🚀', label: 'HR Tech企業への進化', text: 'メーカー特化の強みを活かしHR Tech企業として再定義したい。' },
          ].map(({ n, icon, label, text }) => (
            <div key={label} className="flex items-start gap-2.5 rounded-xl flex-1" style={{ background: 'white', border: '1px solid #FECDD3', padding: '10px 12px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E11D48', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{n}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#9F1239' }}>{label}</p>
                </div>
                <p style={{ fontSize: 11, color: '#BE123C', lineHeight: 1.6 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col" style={{ width: '33%', borderRight: '1px solid #F1F5F9' }}>
        <div style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <polygon points="22,3 26,15 38,15 29,23 32,35 22,28 12,35 15,23 6,15 18,15" fill="rgba(255,255,255,0.9)"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>Meeceの提供価値</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>先方が評価するポイント</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#F0F9FF' }}>
          {[
            { icon: '🤖', label: 'AI開発力でサービス前倒し', note: '開発加速', pct: 95, text: 'AI駆動開発でギブの7月公開AIサービスを前倒し実現。タイムライン圧縮が最大の訴求点。' },
            { icon: '⚡', label: '87.5%工数削減の実績', note: '削減実績', pct: 93, text: '具体的な工数削減数値でギブのAI化コスト・スピードの課題を直接解決できる。' },
            { icon: '📊', label: '採用AI実装ノウハウ', note: 'HR Tech力', pct: 88, text: 'HR領域のAI実装経験でマッチング精度向上と採用プロセス自動化を支援。' },
            { icon: '🏗️', label: 'HR Tech高速開発実績', note: '実装力', pct: 85, text: '採用支援システムのAI化を高速で実現。ギブのHR Tech転換を加速するパートナー。' },
          ].map(({ icon, label, note, pct, text }) => (
            <div key={label} className="rounded-xl flex-1" style={{ background: 'white', border: '1px solid #BAE6FD', padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#0E7490' }}>{label}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <div style={{ flex: 1, height: 5, background: '#E0F2FE', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(to right, #0891B2, #06B6D4)', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0891B2' }}>{pct}%</span>
                <span style={{ fontSize: 10, color: '#94A3B8' }}>{note}</span>
              </div>
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.55 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect x="2" y="4" width="26" height="18" rx="5" fill="rgba(255,255,255,0.9)"/>
            <polygon points="7,22 7,30 15,22" fill="rgba(255,255,255,0.9)"/>
            <rect x="20" y="20" width="22" height="15" rx="4" fill="rgba(255,255,255,0.55)"/>
            <polygon points="37,35 37,42 30,35" fill="rgba(255,255,255,0.55)"/>
          </svg>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'white', lineHeight: 1 }}>重要発言・先方の本音</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>TOP面談で語られた本質</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2.5" style={{ background: '#FAF5FF' }}>
          {[
            { quote: 'AIサービスの7月公開タイムラインが逼迫している。開発加速のパートナーが必要だ。', note: '→ 即戦力のAI開発力が最優先ニーズ', color: '#E11D48' },
            { quote: '87.5%の工数削減という数字は具体的で刺さる。自社AI開発に直接応用できる。', note: '→ 実績数値が意思決定の主軸に', color: '#0891B2' },
            { quote: '採用支援のAI化は絶対に必要。今が業界の転換点だと思っている。', note: '→ 採用AI化への強い意向・危機感', color: '#7C3AED' },
            { quote: 'HR Tech企業として再定義したい。メーカー採用×AIで差別化できる。', note: '→ 中長期の方向性が明確で本気度が高い', color: '#D97706' },
          ].map(({ quote, note, color }) => (
            <div key={note} className="rounded-xl flex-1" style={{ background: 'white', borderLeft: `3px solid ${color}`, padding: '10px 12px' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
                <svg width="16" height="12" viewBox="0 0 16 12" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M0 12V7.2C0 3.2 2.4 1 7.2 0L8 1.6C5.6 2.2 4.4 3.4 4.4 5.2H7.2V12H0ZM8.8 12V7.2C8.8 3.2 11.2 1 16 0l.8 1.6C14.4 2.2 13.2 3.4 13.2 5.2H16V12H8.8Z" fill={color} opacity="0.3"/>
                </svg>
                <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.65, fontStyle: 'italic' }}>{quote}</p>
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, color, paddingLeft: 22 }}>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideGiveNext = (
  <div key="s-give-next" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    <div style={{ height: 5, background: 'linear-gradient(to right, #FDA4AF, #E11D48, #BE123C)', flexShrink: 0 }} />

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>今後の方針</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>ギブクリエーション — ネクストアクション</p>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #E11D48, #BE123C)', color: 'white', padding: '8px 18px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>📊</span>
        <div>
          <p style={{ fontSize: 10, opacity: 0.75 }}>NEXT STEP</p>
          <p style={{ fontSize: 14, fontWeight: 900 }}>AI開発デモ・採用支援提案</p>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 40px', gap: 36 }}>

      <div style={{ width: '37%', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>プロセスタイムライン</p>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {[
            { phase: 'TOP面談', status: 'done', label: '完了', desc: '水口社長・岡山氏との初回面談完了。AIサービス開発ニーズと採用AI化の課題を確認。' },
            { phase: 'AIデモ・詳細説明', status: 'active', label: 'NEXT', desc: 'AI駆動開発のデモと87.5%工数削減実績を提示。7月公開AIサービスへの具体的な貢献を示す。' },
            { phase: '採用支援AI具体提案', status: 'upcoming', label: '予定', desc: '採用支援システムのAI化具体案を提示。HR Tech転換のロードマップを共同策定する。' },
            { phase: '条件すり合わせ・LOI', status: 'upcoming', label: '予定', desc: '参画形態・スコープ・条件を詳細に詰め、意向表明書（LOI）の締結を目指す。' },
            { phase: 'DD・クロージング', status: 'upcoming', label: '予定', desc: 'デューデリジェンス対応 → 最終条件合意 → 契約締結・グループ参画。' },
          ].map(({ phase, status, label, desc }, i, arr) => (
            <div key={phase} style={{ display: 'flex', gap: 14, flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: status === 'done' ? '#E11D48' : status === 'active' ? '#E11D48' : '#E2E8F0', color: status === 'upcoming' ? '#94A3B8' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0, boxShadow: status === 'active' ? '0 0 0 4px #FECDD3' : 'none' }}>
                  {status === 'done' ? '✓' : status === 'active' ? '▶' : i + 1}
                </div>
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: status === 'done' ? '#FDA4AF' : '#E2E8F0', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 10 : 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: status === 'done' ? '#9F1239' : status === 'active' ? '#9F1239' : '#94A3B8' }}>{phase}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: status === 'done' ? '#FFF1F2' : status === 'active' ? '#FFF1F2' : '#F1F5F9', color: status === 'done' ? '#9F1239' : status === 'active' ? '#E11D48' : '#CBD5E1' }}>{label}</span>
                </div>
                <p style={{ fontSize: 11, lineHeight: 1.55, color: status === 'upcoming' ? '#CBD5E1' : '#94A3B8' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>ネクストアクション</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { action: 'AI駆動開発デモの準備・実施', owner: 'Meece', desc: '87.5%工数削減の具体的実績デモを準備。7月公開AIサービスへの貢献イメージを明確に提示する。', color: '#E11D48' },
            { action: '採用支援AI化の具体案策定', owner: 'Meece', desc: '人材紹介業務のAI自動化ロードマップを策定。マッチング精度向上と工数削減の数値目標を設定する。', color: '#E11D48' },
            { action: '7月タイムラインの実現計画確認', owner: '両社', desc: 'AIサービス7月公開に向けた具体的な開発スケジュールと役割分担を早急に合意する。', color: '#BE123C' },
            { action: 'HR Tech転換ロードマップ共同策定', owner: '両社', desc: 'ギブクリエーションのHR Tech化に向けた中長期ロードマップを共同で策定・合意する。', color: '#0891B2' },
            { action: '参画形態・条件の初期検討', owner: 'Meece', desc: 'M&A・業務提携・開発パートナーの各オプションを整理し、先方の意向に合わせた初期提案を準備する。', color: '#9F1239' },
          ].map(({ action, owner, desc, color }) => (
            <div key={action} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'white', border: '1px solid #F1F5F9', borderLeft: `4px solid ${color}`, borderRadius: 12, padding: '11px 14px', flex: 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, border: '2px solid #E2E8F0', background: 'white', flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{action}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}15`, padding: '2px 9px', borderRadius: 999 }}>{owner}</span>
                </div>
                <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10, flexShrink: 0, background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#BE123C' }}>
            AIサービス7月公開タイムラインが逼迫 — AI駆動開発実績のデモを早期提示し採用支援AI案件の具体化が最優先
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// 意向表明フェーズ（面談締め切り後の結論セクション）
// ============================================================

const SlideLOITitle = (
  <div key="s-loi-title" className="w-full h-[720px] relative overflow-hidden flex flex-col" style={{ background: 'linear-gradient(135deg, #080e1a 0%, #0d1829 55%, #0a1220 100%)' }}>
    {/* Grid pattern */}
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
    {/* Glow orbs */}
    <div className="absolute rounded-full pointer-events-none" style={{ width: 460, height: 460, top: -120, right: -60, background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)' }} />
    <div className="absolute rounded-full pointer-events-none" style={{ width: 360, height: 360, bottom: -80, left: 60, background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
    {/* Watermark */}
    <div className="absolute select-none pointer-events-none font-black" style={{ fontSize: 200, color: 'rgba(255,255,255,0.022)', right: 20, bottom: -30, lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'Georgia, serif' }}>LOI</div>

    <div className="relative z-10 flex flex-col h-full px-16 py-10">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl" style={{ background: '#F59E0B', color: '#080e1a' }}>M</div>
          <span className="text-white font-semibold tracking-widest text-sm opacity-80">Meece株式会社</span>
        </div>
        <div className="px-3 py-1 rounded text-xs font-bold tracking-widest" style={{ border: '1px solid rgba(245,158,11,0.5)', color: '#F59E0B', background: 'rgba(245,158,11,0.08)' }}>CONFIDENTIAL</div>
      </div>

      {/* Main title */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#F59E0B' }}>Phase 02 — Conclusion</span>
          <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(167,139,250,0.5)', color: '#C4B5FD' }}>面談フェーズ 締め切り</span>
        </div>
        <h1 className="font-black leading-none mb-4" style={{ fontSize: 72, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          意向表明
          <br />
          <span style={{ fontSize: 44, color: 'rgba(255,255,255,0.85)' }}>受領・比較・応諾の決定</span>
        </h1>
        <div className="mb-6" style={{ height: 3, width: 240, background: 'linear-gradient(to right, #F59E0B, #7C3AED, transparent)', borderRadius: 2 }} />
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>各社面談を完了し、いただいた意向表明を比較検討。応諾先を決定するフェーズ</p>

        {/* Stat chips */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: '面談実施', value: '5社' },
            { label: '意向表明 受領', value: '2社' },
            { label: '応諾', value: 'SICグループ' },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginBottom: 3 }}>{label}</p>
              <p style={{ fontSize: 18, fontWeight: 900, color: '#F59E0B' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs" style={{ color: 'rgba(255,255,255,0.35)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
        <span>2026年6月</span>
        <span>溝口 雅登｜Meece株式会社</span>
      </div>
    </div>
  </div>
);

const SlideLOIReport = (
  <div key="s-loi-report" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    {/* Top accent */}
    <div style={{ height: 5, background: 'linear-gradient(to right, #F59E0B, #7C3AED, #5B21B6)', flexShrink: 0 }} />
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>意向表明の受領状況と選定</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>面談締め切り時点で2社より受領 — 2軸で比較しSICグループを応諾</p>
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#5B21B6', background: '#F5F3FF', border: '1px solid #DDD6FE', padding: '4px 14px', borderRadius: 999 }}>応諾先決定</span>
    </div>

    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 40px', gap: 24 }}>
      {/* LEFT: 受領状況 */}
      <div style={{ width: '34%', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 12 }}>受領状況（5社）</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { name: 'オープングループ', state: '受領', got: true },
            { name: 'SICグループ', state: '受領 → 応諾', got: true, win: true },
            { name: 'Kubell', state: '表明遅延・対象外', got: false },
            { name: 'Townlife', state: '表明遅延・対象外', got: false },
            { name: 'Give', state: '表明遅延・対象外', got: false },
          ].map(({ name, state, got, win }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, background: win ? 'linear-gradient(135deg, #F5F3FF, #EDE9FE)' : got ? '#FFFBEB' : '#F8FAFC', border: win ? '1px solid #C4B5FD' : got ? '1px solid #FDE68A' : '1px solid #E2E8F0', borderRadius: 12, padding: '12px 14px', flex: 1 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, background: win ? '#7C3AED' : got ? '#F59E0B' : '#E2E8F0', color: got || win ? 'white' : '#94A3B8' }}>{got ? '✓' : '—'}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: win ? '#5B21B6' : got ? '#92400E' : '#94A3B8' }}>{name}</p>
                <p style={{ fontSize: 11, color: win ? '#7C3AED' : got ? '#B45309' : '#CBD5E1', marginTop: 1 }}>{state}</p>
              </div>
              {win && <span style={{ fontSize: 16 }}>🏆</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '10px 14px' }}>
          <p style={{ fontSize: 11, color: '#92400E', lineHeight: 1.6 }}>他3社は意向表明の提出が遅く、面談を締め切った時点で受領済みの<b>2社で選定</b>することとした。</p>
        </div>
      </div>

      {/* CENTER: 2軸比較 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 12 }}>選定の判断軸（2点）</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {[
            { icon: '💰', axis: '金額・条件面', og: 'オープングループ：条件提示あり', sic: '対価6,000万円を基準・処遇/雇用継続・スケジュール明確で条件面の納得感が高い', winner: 'SIC' },
            { icon: '🤝', axis: '社長様との相性', og: 'オープングループ：相性良好', sic: 'AI駆動開発・新規事業への価値観/ビジョンが一致。グループAI化の牽引役として相互に共感', winner: 'SIC' },
          ].map(({ icon, axis, og, sic, winner }) => (
            <div key={axis} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 14, padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <p style={{ fontSize: 15, fontWeight: 900, color: '#111827' }}>{axis}</p>
                <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 800, color: '#5B21B6', background: '#F5F3FF', border: '1px solid #DDD6FE', padding: '3px 10px', borderRadius: 999 }}>SIC 優位</span>
              </div>
              <div style={{ display: 'flex', gap: 10, flex: 1 }}>
                <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '8px 12px' }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', marginBottom: 4 }}>オープングループ</p>
                  <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.55 }}>{og}</p>
                </div>
                <div style={{ flex: 1.4, background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 10, padding: '8px 12px' }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#7C3AED', marginBottom: 4 }}>SICグループ ✓</p>
                  <p style={{ fontSize: 11, color: '#5B21B6', lineHeight: 1.55, fontWeight: 600 }}>{sic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Conclusion */}
        <div style={{ marginTop: 12, background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 24 }}>✍️</span>
          <div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>結論</p>
            <p style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>金額・条件面／社長様との相性の2軸で、SICグループの意向表明を応諾</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideLOITerms = (
  <div key="s-loi-terms" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    <div style={{ height: 5, background: 'linear-gradient(to right, #A78BFA, #7C3AED, #5B21B6)', flexShrink: 0 }} />
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>応諾した意向表明の条件</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>SICグループ — LOI面談（2026年6月9日）で提示された主要条件</p>
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#5B21B6', background: '#F5F3FF', border: '1px solid #DDD6FE', padding: '4px 14px', borderRadius: 999 }}>株式譲渡スキーム</span>
    </div>

    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 40px', gap: 24 }}>
      {/* LEFT: 主要条件カード */}
      <div style={{ width: '56%', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 12 }}>主要条件</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
          {[
            { icon: '🏛️', k: 'スキーム', v: 'M&A（株式譲渡）', d: '全株式をSIC側が取得し、グループ会社化' },
            { icon: '💰', k: '対価（基準）', v: '6,000万円', d: 'を基準として条件を調整' },
            { icon: '👤', k: '溝口社長の処遇', v: '代表として継続', d: '会社は存続。グループ内の開発を牽引' },
            { icon: '👥', k: '従業員', v: '雇用継続', d: '現在の雇用条件で引き続き継続' },
            { icon: '🔒', k: '独占交渉権', v: '10月末まで', d: '期間中は他社との交渉を控える' },
            { icon: '📋', k: 'デューデリ', v: '社内中心', d: '必要に応じ税理士・弁護士など外部も活用' },
          ].map(({ icon, k, v, d }) => (
            <div key={k} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: '12px 14px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8' }}>{k}</p>
              </div>
              <p style={{ fontSize: 17, fontWeight: 900, color: '#5B21B6', lineHeight: 1.1, marginBottom: 4 }}>{v}</p>
              <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.5 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: スケジュール + 評価 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 12 }}>想定スケジュール</p>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {[
            { phase: 'デューデリジェンス', when: '〜7月末', desc: '財務・契約・組織を確認' },
            { phase: '契約書の条文すり合わせ', when: '〜8月中旬', desc: '最終契約の中身を詰めて締結' },
            { phase: 'クロージング（実行）', when: '8月下旬', desc: 'グループ参画' },
          ].map(({ phase, when, desc }, i, arr) => (
            <div key={phase} style={{ display: 'flex', gap: 12, flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#7C3AED', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13 }}>{i + 1}</div>
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: '#DDD6FE', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#5B21B6' }}>{phase}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', background: '#F5F3FF', border: '1px solid #DDD6FE', padding: '2px 8px', borderRadius: 6 }}>{when}</span>
                </div>
                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 3, lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 12, padding: '12px 16px' }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: '#4C1D95', marginBottom: 6 }}>意向表明への評価</p>
          <p style={{ fontSize: 12, color: '#5B21B6', lineHeight: 1.65, fontStyle: 'italic' }}>「共に歩む未来を楽しみにしております」など、条件だけでなく姿勢の伝わる内容。仲介からも高い評価を受けた。</p>
        </div>
      </div>
    </div>
  </div>
);

const SlideLOIDiscussion = (
  <div key="s-loi-discussion" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    <div style={{ height: 5, background: 'linear-gradient(to right, #A78BFA, #7C3AED, #5B21B6)', flexShrink: 0 }} />
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>LOI面談での主要論点</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>SICグループ — 参画後の役割・連携イメージのすり合わせ</p>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#5B21B6', background: '#F5F3FF', border: '1px solid #DDD6FE', padding: '4px 14px', borderRadius: 999 }}>2026年6月9日</span>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, flex: 1, minHeight: 0, padding: '16px 40px' }}>
      {[
        { icon: '🎯', title: 'グループ内の位置づけ', color: '#7C3AED', points: ['Meeceをデジタル/AIの先進中核として先頭で牽引', '波及効果でグループ全体（約320名）の従来型開発をAI化', '「この数年が勝負」— 早期にグループ全体へ横展開'] },
        { icon: '🏗️', title: 'AI開発部署の立ち上げ（③）', color: '#6D28D9', points: ['当面はグループ内AI案件・SICテックのユーザー案件を共同開発', 'S3（輸出規制パッケージ）へのAI検索機能の高度化', '小規模AI部隊とMeece部隊でリソース貸し合い→将来一体化'] },
        { icon: '⚡', title: 'Meeceの開発力（強み）', color: '#0891B2', points: ['最低100万円の案件から対応（一般SIerは3,000〜4,000万〜）', '500万以下の小規模案件を高速・多数こなす（1人で3〜4PJ）', '中〜大規模も15〜20名→3〜4名のチームで対応可能'] },
        { icon: '🏢', title: 'オフィス', color: '#7C3AED', points: ['SIC本社13F（開発フロア）を提供、DD段階から利用可', 'AI駆動開発はスピードが速く対面コミュニケーションを重視', 'レンタルオフィスの制約を解消、入社待ち2名の受け皿に'] },
        { icon: '🌐', title: '事業観・市場認識', color: '#5B21B6', points: ['AI規制が来る前に「今のうちにリードを取る」のが業界の課題', '次の技術は量子コンピュータ・AIエージェント等を見据える', '個人受負の乱立はセキュリティ面で危険、早期にリード確立'] },
        { icon: '🎫', title: 'AI駆動開発の実証（DevTicket）', color: '#D97706', points: ['M&A期間中にAIで自社チケット管理ツールを内製・今月公開予定', 'グループ内/外部へチケットを公開しリソース共有する構想', 'コンサル→開発→リリースまで一気通貫できる実績を提示'] },
      ].map(({ icon, title, color, points }) => (
        <div key={title} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', borderTop: `4px solid ${color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <p style={{ fontSize: 14, fontWeight: 900, color: '#111827', lineHeight: 1.2 }}>{title}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {points.map((p) => (
              <div key={p} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, marginTop: 6, flexShrink: 0 }} />
                <p style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SlideLOINext = (
  <div key="s-loi-next" className="w-full h-[720px] overflow-hidden flex flex-col bg-white">
    <div style={{ height: 5, background: 'linear-gradient(to right, #A78BFA, #7C3AED, #5B21B6)', flexShrink: 0 }} />
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1 }}>今後の方針・ネクストアクション</h2>
        <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>意向表明 応諾済み — 次はビジネスDDへ</p>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', color: 'white', padding: '8px 18px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>🧪</span>
        <div>
          <p style={{ fontSize: 10, opacity: 0.75 }}>NEXT STEP</p>
          <p style={{ fontSize: 14, fontWeight: 900 }}>ビジネスDD（試験案件の受注）</p>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '16px 40px', gap: 36 }}>
      {/* LEFT: Timeline */}
      <div style={{ width: '37%', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>プロセスタイムライン</p>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {[
            { phase: '面談・意向表明 応諾', status: 'done', label: '完了', desc: '2社の意向表明を比較し、SICグループの意向表明を応諾。' },
            { phase: 'ビジネスDD（試験案件）', status: 'active', label: 'NEXT', desc: 'SICから軽い開発案件を受注し、システム開発能力を実地で確認してもらう。' },
            { phase: 'DD（財務・法務・組織）', status: 'upcoming', label: '〜7月末', desc: 'デューデリジェンス対応。社内中心、必要に応じ外部専門家を活用。' },
            { phase: '最終契約の締結', status: 'upcoming', label: '〜8月中旬', desc: '条文すり合わせを経て最終契約を締結。' },
            { phase: 'クロージング', status: 'upcoming', label: '8月下旬', desc: '実行・グループ参画。' },
          ].map(({ phase, status, label, desc }, i, arr) => (
            <div key={phase} style={{ display: 'flex', gap: 14, flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: status === 'upcoming' ? '#E2E8F0' : '#7C3AED', color: status === 'upcoming' ? '#94A3B8' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0, boxShadow: status === 'active' ? '0 0 0 4px #DDD6FE' : 'none' }}>
                  {status === 'done' ? '✓' : status === 'active' ? '▶' : i + 1}
                </div>
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: status === 'done' ? '#A78BFA' : '#E2E8F0', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 10 : 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: status === 'upcoming' ? '#94A3B8' : '#5B21B6' }}>{phase}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: status === 'upcoming' ? '#F1F5F9' : '#F5F3FF', color: status === 'active' ? '#7C3AED' : status === 'upcoming' ? '#94A3B8' : '#5B21B6' }}>{label}</span>
                </div>
                <p style={{ fontSize: 11, lineHeight: 1.55, color: status === 'upcoming' ? '#CBD5E1' : '#94A3B8' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Next actions */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 14, flexShrink: 0 }}>ネクストアクション</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { action: 'ビジネスDD用の試験案件を受注', owner: 'Meece / SIC', desc: 'SICからシステム開発能力を確認するための軽い案件を受注し、AI駆動開発のスピード・品質を実証する。', color: '#7C3AED' },
            { action: '試験案件の遂行・成果共有', owner: 'Meece', desc: '短納期で開発・リリースし、工数削減と品質をSIC側に体感してもらう。', color: '#7C3AED' },
            { action: 'DD対応準備（財務・契約・組織）', owner: 'Meece', desc: '7月末までのデューデリに備え、資料・契約関係・組織体制を整理する。', color: '#0891B2' },
            { action: '最終契約の条件すり合わせ', owner: '両社', desc: '対価6,000万円基準・処遇・スケジュールを踏まえ、契約条文を詰める。', color: '#5B21B6' },
            { action: 'オフィス移転の調整', owner: 'Meece', desc: 'SIC本社13Fの利用に向け、現レンタルオフィス（月額）の解約タイミングを調整する。', color: '#D97706' },
          ].map(({ action, owner, desc, color }) => (
            <div key={action} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'white', border: '1px solid #F1F5F9', borderLeft: `4px solid ${color}`, borderRadius: 12, padding: '11px 14px', flex: 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, border: '2px solid #E2E8F0', background: 'white', flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>{action}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}15`, padding: '2px 9px', borderRadius: 999 }}>{owner}</span>
                </div>
                <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, flexShrink: 0, background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#5B21B6' }}>
            次回はビジネスDD — SICからの試験案件で開発能力を実証し、DD・契約・クロージング（8月下旬）へつなげる
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const maStatus2026Presentation: PresentationEntry = {
  meta: {
    id: 'ma-status-2026',
    title: 'M&A 取り組み状況レポート',
    description: '各社との面談進捗・論点整理・ネクストアクション',
    thumbnail: 'linear-gradient(135deg, #080e1a 0%, #0d1829 55%, #F59E0B 100%)',
    author: '溝口 雅登',
    createdAt: '2026-05-21',
  },
  slides: [
    SlideCover,
    SlideOpenGroupTitle, SlideOpenGroupIntro, SlideOpenGroupOverview, SlideOpenGroupMeeting, SlideOpenGroupNext,
    SlideKubellTitle, SlideKubellIntro, SlideKubellOverview, SlideKubellMeeting, SlideKubellNext,
    SlideTownlifeTitle, SlideTownlifeIntro, SlideTownlifeOverview, SlideTownlifeMeeting, SlideTownlifeNext,
    SlideSICTitle, SlideSICIntro, SlideSICOverview, SlideSICMeeting, SlideSICNext,
    SlideGiveTitle, SlideGiveIntro, SlideGiveOverview, SlideGiveMeeting, SlideGiveNext,
    SlideLOITitle, SlideLOIReport, SlideLOITerms, SlideLOIDiscussion, SlideLOINext,
  ],
};
