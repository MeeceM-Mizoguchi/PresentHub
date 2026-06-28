import {
  Ticket,
  CheckCircle2,
  LayoutDashboard,
  FolderKanban,
  Building2,
  Users,
  Bot,
  Clock,
  Shield,
  Bell,
  Download,
  Lock,
  GitPullRequest,
  Search,
  MessageSquare,
  BarChart3,
  SlidersHorizontal,
  ListPlus,
  Tag,
  Activity,
  Timer,
  Layers,
  Rocket,
  ArrowRight,
  CheckCheck,
  List,
  LayoutGrid,
  BarChart2,
  Plus,
  FolderOpen,
  TrendingUp,
  Settings,
  LogOut,
  CalendarRange,
  UserCog,
  BellRing,
  ChevronRight,
  GitMerge,
  Link2,
  Zap,
  Paperclip,
  ClipboardList,
  BookOpen,
  ArrowRightLeft,
  Workflow,
  Gauge,
  Wallet,
  Boxes,
  Puzzle,
  Fingerprint,
  Monitor,
  Tablet,
  Smartphone,
  Command,
  FileText,
  PieChart,
  AppWindow,
} from 'lucide-react';
import type { PresentationEntry } from '../registry';

// ── Mock UI ヘルパーコンポーネント ───────────────────────────────────────────

type Page = 'dashboard' | 'projects' | 'clients' | 'members';
const navItems: { id: Page; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', icon: LayoutDashboard },
  { id: 'projects', icon: FolderKanban },
  { id: 'clients', icon: Building2 },
  { id: 'members', icon: Users },
  { id: 'members', icon: CalendarRange },
  { id: 'members', icon: UserCog },
  { id: 'members', icon: BellRing },
];

function MockShell({ children, active, fillHeight }: { children: React.ReactNode; active: string; fillHeight?: boolean }) {
  return (
    <div style={{ width: '100%', ...(fillHeight ? { height: '100%' } : { aspectRatio: '16/9' }), display: 'flex', background: '#F4F5F6', fontFamily: "-apple-system,BlinkMacSystemFont,'Hiragino Sans','Yu Gothic UI',sans-serif", overflow: 'hidden', fontSize: 12 }}>
      <aside style={{ width: 64, background: '#fff', borderRight: '1px solid rgba(26,23,20,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ padding: '16px 0 8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(145deg,#34D399,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(5,150,105,0.35)' }}>
            <Ticket style={{ width: 16, height: 16, color: '#fff' }} />
          </div>
        </div>
        <div style={{ width: 28, height: 1, background: 'rgba(26,23,20,0.06)', margin: '4px 0' }} />
        <nav style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', paddingTop: 2 }}>
          {navItems.map(({ id, icon: Icon }, i) => {
            const isActive = active === id && (active !== 'members' || i === 3);
            const itsActive = (active === 'dashboard' && i === 0) || (active === 'projects' && i === 1);
            return (
              <div key={i} style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
                {itsActive && <div style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: '0 99px 99px 0', background: '#059669' }} />}
                <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: itsActive ? '#ECFDF5' : 'transparent', border: itsActive ? '1px solid rgba(5,150,105,0.18)' : '1px solid transparent' }}>
                  <Icon style={{ width: 15, height: 15, color: itsActive ? '#059669' : '#9E9690' }} />
                </div>
              </div>
            );
          })}
        </nav>
        <div style={{ width: '100%', paddingBottom: 12 }}>
          <div style={{ width: 28, height: 1, background: 'rgba(26,23,20,0.06)', margin: '4px auto' }} />
          {[Settings, LogOut].map((Icon, i) => (
            <div key={i} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 0' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon style={{ width: 14, height: 14, color: '#C9C4BB' }} />
              </div>
            </div>
          ))}
        </div>
      </aside>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: 46, background: '#fff', borderBottom: '1px solid rgba(20,26,22,0.08)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F4F5F6', borderRadius: 8, padding: '5px 10px', maxWidth: 280, flex: 1 }}>
            <Search style={{ width: 12, height: 12, color: '#B0A9A4' }} />
            <span style={{ fontSize: 11, color: '#B0A9A4' }}>チケット・スプリント・プロジェクトを検索...</span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ position: 'relative', width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell style={{ width: 13, height: 13, color: '#059669' }} />
              <span style={{ position: 'absolute', top: 4, right: 4, width: 12, height: 12, borderRadius: 6, background: '#059669', border: '1.5px solid #fff', fontSize: 7, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>2</span>
            </div>
            <div style={{ width: 1, height: 16, background: 'rgba(26,23,20,0.08)', margin: '0 2px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 8px 3px 4px', borderRadius: 9999, background: '#F4F5F6' }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: '#059669', color: '#fff', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>田</div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#3D3732' }}>田中太郎</span>
            </div>
          </div>
        </header>
        <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
      </div>
    </div>
  );
}

function MockDashboard({ fillHeight }: { fillHeight?: boolean } = {}) {
  const projectBars = [
    { name: 'ECサイトリニューアル', done: 8, inProgress: 5, todo: 12 },
    { name: 'モバイルアプリ開発',   done: 15, inProgress: 8, todo: 6 },
    { name: '社内システム改修',     done: 3,  inProgress: 2, todo: 10 },
    { name: 'APIゲートウェイ構築',  done: 12, inProgress: 10, todo: 9 },
  ];
  const maxTotal = Math.max(...projectBars.map(p => p.done + p.inProgress + p.todo));
  const activeTickets = [
    { title: 'カート機能の実装', sc: '#D97706', sbg: '#FFFBEB', sl: '進行中', ini: '田', ac: '#059669', dot: '#059669' },
    { title: 'ログイン画面のUI改修', sc: '#2563EB', sbg: '#EFF6FF', sl: 'レビュー中', ini: '鈴', ac: '#0284C7', dot: '#F59E0B' },
    { title: 'バッチ処理の最適化', sc: '#A09790', sbg: '#F4F5F6', sl: '未着手', ini: '佐', ac: '#7C3AED', dot: '#3B82F6' },
    { title: '決済APIの統合テスト', sc: '#D97706', sbg: '#FFFBEB', sl: '進行中', ini: '山', ac: '#D97706', dot: '#EF4444' },
    { title: 'レート制限の実装', sc: '#A09790', sbg: '#F4F5F6', sl: '未着手', ini: '伊', ac: '#F43F5E', dot: '#3B82F6' },
  ];
  const projects = [
    { name: 'ECサイトリニューアル', client: '株式会社サンプル商事', progress: 52, ss: { bg: '#ECFDF5', color: '#059669', label: '進行中' } },
    { name: 'モバイルアプリ開発', client: 'テクノ株式会社', progress: 64, ss: { bg: '#ECFDF5', color: '#059669', label: '進行中' } },
    { name: '社内システム改修', client: 'ビジネス合同会社', progress: 20, ss: { bg: '#F4F5F6', color: '#A09790', label: '計画中' } },
  ];
  return (
    <MockShell active="dashboard" fillHeight={fillHeight}>
      <div style={{ padding: '14px 16px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 8, background: '#F9F8F6', boxSizing: 'border-box' }}>
        {/* ヘッダー */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 8, color: '#B0A9A4', margin: 0, fontFamily: 'monospace', letterSpacing: '0.08em' }}>2026年6月1日 月曜日</p>
            <h1 style={{ fontSize: 14, fontWeight: 800, color: '#1A1714', margin: '2px 0 1px', letterSpacing: '-0.03em' }}>こんにちは、<span style={{ color: '#059669' }}>田中太郎</span>さん</h1>
            <p style={{ fontSize: 8, color: '#A09790', margin: 0 }}>今日のチーム状況 — 6月1日 時点</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#059669', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', fontSize: 9, fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(5,150,105,0.30)' }}>
            <Plus style={{ width: 10, height: 10 }} />新規チケット
          </button>
        </div>
        {/* サマリタイル（実際のシステムと同じ左アクセントバー付き） */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, flexShrink: 0 }}>
          {[
            { icon: FolderOpen, label: '進行中プロジェクト', value: '2', trend: '全4件', up: true, accent: '#059669', accentBg: '#ECFDF5' },
            { icon: Zap,        label: '進行中チケット',     value: '16', trend: '期限超過 1件', up: false, accent: '#D97706', accentBg: '#FFFBEB' },
            { icon: Clock,      label: '未着手チケット',     value: '25', trend: '全54件', up: true, accent: '#0284C7', accentBg: '#F0F9FF' },
            { icon: TrendingUp, label: 'チーム完了率',       value: '52%', trend: '完了 13件', up: true, accent: '#059669', accentBg: '#ECFDF5' },
          ].map(({ icon: Icon, label, value, trend, up, accent, accentBg }) => (
            <div key={label} style={{ background: '#FFFFFF', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 3px 10px rgba(0,0,0,0.05)', display: 'flex' }}>
              <div style={{ width: 4, background: accent, flexShrink: 0 }} />
              <div style={{ flex: 1, padding: '10px 10px 10px 9px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 7, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon style={{ width: 12, height: 12, color: accent }} />
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 600, color: up ? '#059669' : '#D97706', background: up ? '#ECFDF5' : '#FFFBEB', padding: '1px 5px', borderRadius: 20 }}>{trend}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1714', lineHeight: 1, letterSpacing: '-0.04em' }}>{value}</div>
                <div style={{ fontSize: 8, color: '#A09790', marginTop: 3 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
        {/* グラフ + アクティブチケット */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 6, flex: 1, minHeight: 0 }}>
          {/* プロジェクト進捗グラフ */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 3px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1714' }}>プロジェクト進捗</div>
                <div style={{ fontSize: 8, color: '#B0A9A4' }}>ステータス別チケット集計</div>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                {['横棒', '縦棒', '折れ線', 'マトリックス図'].map((l, i) => (
                  <span key={l} style={{ fontSize: 7, fontWeight: 600, padding: '3px 5px', borderRadius: 4, border: '1px solid', background: i === 0 ? '#059669' : 'transparent', color: i === 0 ? '#fff' : '#B0A9A4', borderColor: i === 0 ? '#059669' : '#E6E2D9' }}>{l}</span>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              {projectBars.map(p => {
                const total = p.done + p.inProgress + p.todo;
                return (
                  <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 8, color: '#6B6458', width: 80, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                    <div style={{ flex: 1, display: 'flex', height: 13, borderRadius: 3, overflow: 'hidden', gap: 1 }}>
                      {p.done > 0 && <div style={{ width: `${p.done/maxTotal*100}%`, background: '#059669', borderRadius: '3px 0 0 3px' }} />}
                      {p.inProgress > 0 && <div style={{ width: `${p.inProgress/maxTotal*100}%`, background: '#D97706' }} />}
                      {p.todo > 0 && <div style={{ width: `${p.todo/maxTotal*100}%`, background: '#EDE9E0', borderRadius: '0 3px 3px 0' }} />}
                    </div>
                    <span style={{ fontSize: 8, color: '#B0A9A4', width: 18, textAlign: 'right', flexFamily: 'monospace' }}>{total}</span>
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                {[['#059669','完了'],['#D97706','進行中'],['#EDE9E0','未着手']].map(([c,l]) => (
                  <span key={l} style={{ fontSize: 8, color: '#B0A9A4', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ width: 7, height: 7, borderRadius: 2, background: c, display: 'inline-block' }} />{l}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* アクティブチケット */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 3px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1714' }}>アクティブチケット</span>
              <span style={{ fontSize: 8, background: '#F4F5F6', color: '#B0A9A4', borderRadius: 20, padding: '2px 6px', fontWeight: 600 }}>5件</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              {activeTickets.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 5px', borderRadius: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.dot, flexShrink: 0 }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 9, color: '#1A1714', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500, lineHeight: 1.2 }}>{t.title}</div>
                    <span style={{ fontSize: 8, fontWeight: 600, color: t.sc, background: t.sbg, padding: '1px 5px', borderRadius: 20 }}>{t.sl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* プロジェクト一覧 */}
        <div style={{ background: '#FFFFFF', borderRadius: 12, overflow: 'hidden', flexShrink: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 3px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid rgba(26,23,20,0.05)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1714' }}>プロジェクト一覧</span>
            <ChevronRight style={{ width: 12, height: 12, color: '#C9C4BB' }} />
          </div>
          {projects.map((p, i) => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 40px 70px', alignItems: 'center', gap: 10, padding: '7px 12px', background: i % 2 === 1 ? 'rgba(26,23,20,0.015)' : 'transparent', borderBottom: i < projects.length-1 ? '1px solid rgba(26,23,20,0.04)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.ss.color, flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#1A1714', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: 8, color: '#B0A9A4' }}>{p.client}</div>
                </div>
              </div>
              <div style={{ height: 5, background: '#EDE9E0', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${p.progress}%`, background: '#059669', borderRadius: 99 }} />
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#3D3732', textAlign: 'right', fontFamily: 'monospace' }}>{p.progress}%</span>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 8, padding: '2px 7px', borderRadius: 20, background: p.ss.bg, color: p.ss.color, fontWeight: 700 }}>{p.ss.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function MockSprintList() {
  const tickets = [
    { id: 'EC-0001', title: 'トップページのビジュアルデザイン実装', category: 'フロントエンド', status: '進行中', priority: '高', assignee: '田', ac: '#059669', due: '06/05' },
    { id: 'EC-0002', title: 'カート機能のフロントエンド実装', category: 'フロントエンド', status: '進行中', priority: '高', assignee: '鈴', ac: '#0284C7', due: '06/08' },
    { id: 'EC-0003', title: '商品一覧ページのページネーション', category: 'フロントエンド', status: 'クローズ', priority: '中', assignee: '田', ac: '#059669', due: '06/06' },
    { id: 'EC-0004', title: '検索機能のAPIとの接続', category: 'バックエンド', status: 'クローズ', priority: '中', assignee: '佐', ac: '#7C3AED', due: '06/09' },
    { id: 'EC-0005', title: 'ユーザー認証フローの実装', category: 'バックエンド', status: '未着手', priority: '高', assignee: '山', ac: '#D97706', due: '06/07' },
    { id: 'EC-0006', title: '注文確認メール送信機能', category: 'バックエンド', status: '未着手', priority: '低', assignee: '伊', ac: '#F43F5E', due: '06/10' },
  ];
  const statusStyle: Record<string, { bg: string; color: string }> = {
    '進行中':   { bg: '#FFF7ED', color: '#D97706' },
    '未着手':   { bg: '#F4F5F6', color: '#9E9690' },
    'クローズ': { bg: '#F3F4F6', color: '#6B7280' },
  };
  const priorityColor: Record<string, string> = { '高': '#DC2626', '中': '#D97706', '低': '#6B7280' };
  return (
    <MockShell active="projects">
      <div style={{ padding: '12px 20px', height: '100%', display: 'flex', flexDirection: 'column', background: '#F9FAFB', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, marginBottom: 8, flexShrink: 0 }}>
          <span style={{ color: '#059669', fontWeight: 600 }}>プロジェクト</span>
          <ChevronRight style={{ width: 10, height: 10, color: '#C9C4BB' }} />
          <span style={{ color: '#6B6458' }}>ECサイトリニューアル</span>
          <ChevronRight style={{ width: 10, height: 10, color: '#C9C4BB' }} />
          <span style={{ color: '#B0A9A4' }}>スプリント</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, flexShrink: 0 }}>
          <div>
            <h1 style={{ fontSize: 14, fontWeight: 800, color: '#1A1714', letterSpacing: '-0.02em', margin: 0 }}>スプリント管理</h1>
            <p style={{ fontSize: 9, color: '#A09790', margin: '2px 0 0' }}>ECサイトリニューアル・第1スプリント</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', background: '#059669', color: '#fff', fontSize: 9, fontWeight: 600, borderRadius: 9, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(5,150,105,0.25)', flexShrink: 0 }}>
            <Plus style={{ width: 10, height: 10 }} />新規スプリント
          </button>
        </div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexShrink: 0 }}>
          {[{ Icon: List, label: 'リスト', active: true }, { Icon: LayoutGrid, label: 'ボード', active: false }, { Icon: BarChart2, label: 'ガントチャート', active: false }].map(({ Icon, label, active }) => (
            <button key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 8, fontSize: 9, fontWeight: 600, border: 'none', cursor: 'pointer', background: active ? '#059669' : '#fff', color: active ? '#fff' : '#9E9690', boxShadow: active ? 'none' : '0 0 0 1px rgba(26,23,20,0.10)' }}>
              <Icon style={{ width: 10, height: 10 }} />{label}
            </button>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(26,23,20,0.06)', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#F9F8F6', borderRadius: '12px 12px 0 0', padding: '10px 14px', borderBottom: '1px solid rgba(26,23,20,0.06)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1714' }}>第1スプリント — フロントエンド基盤構築</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 9, color: '#B0A9A4' }}>05/31 → 06/12</span>
                <div style={{ width: 60, height: 4, background: '#E5E7EB', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#059669', width: '25%' }} />
                </div>
                <span style={{ fontSize: 9, color: '#059669', fontWeight: 600 }}>25%</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(26,23,20,0.04)', background: '#FAFAF9', flexShrink: 0 }}>
            {['WBS番号','チケット名','カテゴリ','ステータス','優先度','担当','期日'].map((h, i) => (
              <div key={h} style={{ fontSize: 9, fontWeight: 600, color: '#9E9690', padding: '6px 10px', flex: i === 1 ? 3 : i === 2 ? 1.5 : 1, minWidth: 0, borderRight: i < 6 ? '1px solid rgba(26,23,20,0.04)' : 'none' }}>{h}</div>
            ))}
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            {tickets.map((t, i) => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(26,23,20,0.04)', background: i % 2 === 0 ? '#fff' : '#FAFAF9' }}>
                <div style={{ fontSize: 9, fontFamily: 'monospace', color: '#6B7280', padding: '7px 10px', flex: 1, borderRight: '1px solid rgba(26,23,20,0.04)' }}>{t.id}</div>
                <div style={{ fontSize: 10, color: '#1A1714', padding: '7px 10px', flex: 3, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderRight: '1px solid rgba(26,23,20,0.04)' }}>{t.title}</div>
                <div style={{ fontSize: 9, color: '#6B7280', padding: '7px 10px', flex: 1.5, borderRight: '1px solid rgba(26,23,20,0.04)' }}>{t.category}</div>
                <div style={{ padding: '7px 10px', flex: 1, borderRight: '1px solid rgba(26,23,20,0.04)' }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: statusStyle[t.status]?.color || '#6B7280', background: statusStyle[t.status]?.bg || '#F4F5F6', borderRadius: 20, padding: '2px 6px' }}>{t.status}</span>
                </div>
                <div style={{ padding: '7px 10px', flex: 1, borderRight: '1px solid rgba(26,23,20,0.04)' }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: priorityColor[t.priority] || '#6B7280' }}>{t.priority}</span>
                </div>
                <div style={{ padding: '7px 10px', flex: 1, borderRight: '1px solid rgba(26,23,20,0.04)' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 10, background: t.ac, color: '#fff', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.assignee}</div>
                </div>
                <div style={{ fontSize: 9, color: '#6B7280', padding: '7px 10px', flex: 1 }}>{t.due}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function MockSprintBoard() {
  // 実際のシステムのSTATUS_LABELSに合わせた8ステータス
  const columns = [
    { key: 'todo',        label: '未着手',    bg: '#F4F5F6', color: '#A09790', cards: [
      { id: 'EC-0005', ini: '山', ac: '#D97706', dot: '#EF4444' },
      { id: 'EC-0006', ini: '伊', ac: '#F43F5E', dot: '#3B82F6' },
      { id: 'EC-0007', ini: '田', ac: '#059669', dot: '#EF4444' },
      { id: 'EC-0008', ini: '鈴', ac: '#0284C7', dot: '#F59E0B' },
    ]},
    { key: 'in-progress', label: '進行中',    bg: '#FFFBEB', color: '#D97706', cards: [
      { id: 'EC-0001', ini: '田', ac: '#059669', dot: '#EF4444' },
      { id: 'EC-0002', ini: '鈴', ac: '#0284C7', dot: '#EF4444' },
    ]},
    { key: 'in-review',   label: 'レビュー中', bg: '#EFF6FF', color: '#2563EB', cards: [
      { id: 'EC-0004', ini: '佐', ac: '#7C3AED', dot: '#F59E0B' },
    ]},
    { key: 'review-done', label: 'レビュー完了', bg: '#F0FDF4', color: '#16A34A', cards: [] },
    { key: 'stg-test',    label: 'STGテスト', bg: '#F5F3FF', color: '#7C3AED', cards: [] },
    { key: 'uat',         label: 'UAT',       bg: '#FFF7ED', color: '#EA580C', cards: [] },
    { key: 'done',        label: '完了',      bg: '#ECFDF5', color: '#059669', cards: [
      { id: 'EC-0003', ini: '田', ac: '#059669', dot: '#F59E0B' },
    ]},
    { key: 'closed',      label: 'クローズ',  bg: '#F1F5F9', color: '#64748B', cards: [
      { id: 'EC-0010', ini: '鈴', ac: '#0284C7', dot: '#3B82F6' },
    ]},
  ];
  return (
    <MockShell active="projects">
      <div style={{ padding: '12px 16px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 8, background: '#F9FAFB', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: '#B0A9A4' }}>
          <span style={{ color: '#059669', fontWeight: 600 }}>プロジェクト</span>
          <ChevronRight style={{ width: 10, height: 10 }} />
          <span>ECサイトリニューアル</span>
          <ChevronRight style={{ width: 10, height: 10 }} />
          <span>スプリント</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 15, fontWeight: 800, color: '#1A1714', margin: 0 }}>スプリント管理</h1>
            <p style={{ fontSize: 9, color: '#B0A9A4', margin: '2px 0 0' }}>ECサイトリニューアル・第1スプリント</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#059669', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
            <Plus style={{ width: 11, height: 11 }} />新規スプリント
          </button>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[{ Icon: List, label: 'リスト', active: false }, { Icon: LayoutGrid, label: 'ボード', active: true }, { Icon: BarChart2, label: 'ガントチャート', active: false }].map(({ Icon, label, active }) => (
            <button key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 8, fontSize: 10, fontWeight: 600, border: 'none', cursor: 'pointer', background: active ? '#059669' : '#fff', color: active ? '#fff' : '#9E9690', boxShadow: active ? 'none' : '0 0 0 1px rgba(26,23,20,0.10)' }}>
              <Icon style={{ width: 11, height: 11 }} />{label}
            </button>
          ))}
        </div>
        <div style={{ borderBottom: '2px solid #059669', paddingBottom: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1714' }}>第1スプリント — フロントエンド基盤構築</span>
          <p style={{ fontSize: 9, color: '#B0A9A4', margin: '2px 0 0' }}>05/31 → 06/12</p>
        </div>
        <div style={{ display: 'flex', gap: 5, overflow: 'hidden', flex: 1 }}>
          {columns.map(col => (
            <div key={col.key} style={{ flex: col.cards.length > 0 ? '0 0 100px' : '0 0 66px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{ marginBottom: 5, flexShrink: 0 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 7px', borderRadius: 20, background: col.bg }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: col.color }}>{col.label}</span>
                  <span style={{ fontSize: 8, color: col.color, background: col.color + '20', borderRadius: 10, padding: '0 4px', fontWeight: 600 }}>{col.cards.length}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1, overflow: 'hidden' }}>
                {col.cards.map(card => (
                  <div key={card.id} style={{ background: '#fff', borderRadius: 7, border: '1px solid rgba(26,23,20,0.07)', padding: '7px 9px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: card.dot, flexShrink: 0 }} />
                      <div style={{ fontSize: 8, fontFamily: 'monospace', color: '#059669', fontWeight: 700 }}>{card.id}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 9, background: card.ac, color: '#fff', fontSize: 7, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{card.ini}</div>
                    </div>
                  </div>
                ))}
                {col.cards.length === 0 && (
                  <div style={{ fontSize: 8, color: '#E5E7EB', textAlign: 'center', padding: '8px 0', borderRadius: 6, border: '1.5px dashed #E5E7EB' }}>—</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function MockTicketDetail() {
  const tickets = [
    { id: 'EC-0001', title: 'カート機能のフロントエンド実装', status: '進行中', sBg: '#FFFBEB', sC: '#D97706', pri: '高', pC: '#DC2626', assignee: '田', ac: '#059669', active: true },
    { id: 'EC-0002', title: 'ユーザー認証フローの実装', status: '未着手', sBg: '#F4F5F6', sC: '#A09790', pri: '高', pC: '#DC2626', assignee: '山', ac: '#7C3AED', active: false },
    { id: 'EC-0003', title: '決済APIとのインテグレーション', status: '未着手', sBg: '#F4F5F6', sC: '#A09790', pri: '高', pC: '#DC2626', assignee: '田', ac: '#059669', active: false },
    { id: 'EC-0004', title: '商品一覧ページのページネーション', status: 'クローズ', sBg: '#F1F5F9', sC: '#64748B', pri: '中', pC: '#D97706', assignee: '田', ac: '#059669', active: false },
    { id: 'EC-0005', title: '検索機能のAPIとの接続', status: 'クローズ', sBg: '#F1F5F9', sC: '#64748B', pri: '中', pC: '#D97706', assignee: '佐', ac: '#0284C7', active: false },
  ];
  const comments = [
    { ini: '田', ac: '#059669', name: '田中太郎', time: '06/01 10:22', text: '実装を開始しました。Zustandのストア設計はSlackで共有します。' },
    { ini: '鈴', ac: '#0284C7', name: '鈴木花子', time: '06/02 14:05', text: 'APIのエンドポイントはSwaggerを参照してください。' },
    { ini: '田', ac: '#059669', name: '田中太郎', time: '06/03 16:30', text: '実装完了しました。レビューよろしくお願いします。PR: #42' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* 背景: スプリントリスト */}
      <MockShell active="projects" fillHeight>
        <div style={{ padding: '10px 14px', height: '100%', overflow: 'hidden', background: '#F9FAFB', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#1A1714' }}>スプリント管理</div>
              <div style={{ fontSize: 8, color: '#A09790' }}>ECサイトリニューアル・第1スプリント</div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid rgba(26,23,20,0.06)', overflow: 'hidden', flex: 1 }}>
            <div style={{ background: '#F9F8F6', padding: '8px 12px', borderBottom: '1px solid rgba(26,23,20,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#1A1714' }}>第1スプリント — フロントエンド基盤構築</span>
              <span style={{ fontSize: 8, fontWeight: 700, background: '#ECFDF5', color: '#059669', padding: '2px 7px', borderRadius: 20 }}>進行中</span>
            </div>
            <div style={{ overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9 }}>
                <thead>
                  <tr style={{ background: '#F4F5F6', borderBottom: '1px solid rgba(26,23,20,0.08)' }}>
                    {['NO', 'チケット名', 'ステータス', '優先度', '担当者'].map(h => (
                      <th key={h} style={{ padding: '5px 8px', textAlign: 'left', fontSize: 8, fontWeight: 600, color: '#9E9690', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(t => (
                    <tr key={t.id} style={{ borderTop: '1px solid rgba(26,23,20,0.05)', background: t.active ? 'rgba(5,150,105,0.04)' : '#fff' }}>
                      <td style={{ padding: '6px 8px', fontFamily: 'monospace', color: '#059669', fontSize: 8, fontWeight: 700 }}>{t.id}</td>
                      <td style={{ padding: '6px 8px', maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 9, fontWeight: t.active ? 700 : 400, color: '#1A1714' }}>{t.title}</td>
                      <td style={{ padding: '6px 8px' }}><span style={{ fontSize: 7, fontWeight: 600, background: t.sBg, color: t.sC, padding: '1px 5px', borderRadius: 20 }}>{t.status}</span></td>
                      <td style={{ padding: '6px 8px', fontSize: 9, fontWeight: 700, color: t.pC }}>{t.pri}</td>
                      <td style={{ padding: '6px 8px' }}>
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: t.ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 5, fontWeight: 700, color: '#fff' }}>{t.assignee}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MockShell>
      {/* オーバーレイ */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,14,12,0.32)' }} />
      {/* チケット詳細ドロワー（右サイドから56%幅） */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '58%', background: '#FAFAF8', boxShadow: '-12px 0 48px rgba(0,0,0,0.22)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* ヘッダー */}
        <div style={{ padding: '11px 16px 9px', borderBottom: '1px solid rgba(26,23,20,0.07)', background: '#FFF', flexShrink: 0 }}>
          {/* パンくず */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 8, color: '#9E9690', marginBottom: 7, flexWrap: 'wrap' }}>
            <span>プロジェクト一覧</span>
            <span style={{ color: '#D5D0CB' }}>/</span>
            <span>ECサイトリニューアル</span>
            <span style={{ color: '#D5D0CB' }}>/</span>
            <span style={{ fontWeight: 700, color: '#6B6458' }}>第1スプリント</span>
          </div>
          {/* WBS + バッジ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 8, color: '#B0A9A4', fontFamily: 'monospace', background: '#F4F5F6', padding: '2px 7px', borderRadius: 5 }}>EC-0001</span>
            <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: '#FFFBEB', color: '#D97706' }}>進行中</span>
            <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: '#FEF2F2', color: '#DC2626' }}>優先度: 高</span>
            <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: '#EFF6FF', color: '#2563EB' }}>フロントエンド</span>
          </div>
          {/* タイトル */}
          <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1714', letterSpacing: '-0.025em', lineHeight: 1.3, marginBottom: 7 }}>カート機能のフロントエンド実装</div>
          {/* プログレスバー */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <div style={{ flex: 1, height: 5, background: '#EDE9E0', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '30%', background: '#059669', borderRadius: 99 }} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#1A1714' }}>30%</span>
          </div>
          {/* アクションボタン */}
          <button style={{ width: '100%', padding: '6px 0', fontSize: 10, fontWeight: 700, borderRadius: 7, border: '1.5px solid rgba(5,150,105,0.33)', background: '#ECFDF5', color: '#059669', cursor: 'pointer' }}>
            レビュー依頼 →
          </button>
        </div>
        {/* ボディ */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* メタデータ: ステータス/優先度 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <div style={{ background: '#FFF', border: '1px solid rgba(26,23,20,0.07)', borderRadius: 8, padding: '7px 10px' }}>
              <p style={{ fontSize: 7, color: '#B0A9A4', fontWeight: 700, letterSpacing: '0.07em', marginBottom: 4 }}>STATUS</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D97706' }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#D97706' }}>進行中</span>
              </div>
            </div>
            <div style={{ background: '#FFF', border: '1px solid rgba(26,23,20,0.07)', borderRadius: 8, padding: '7px 10px' }}>
              <p style={{ fontSize: 7, color: '#B0A9A4', fontWeight: 700, letterSpacing: '0.07em', marginBottom: 4 }}>PRIORITY</p>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#DC2626' }}>高</span>
            </div>
          </div>
          {/* 担当者 */}
          <div style={{ background: '#FFF', border: '1px solid rgba(26,23,20,0.07)', borderRadius: 8, padding: '7px 10px' }}>
            <p style={{ fontSize: 7, color: '#B0A9A4', fontWeight: 700, letterSpacing: '0.07em', marginBottom: 5 }}>担当者</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6, fontWeight: 700, color: '#fff' }}>田中</div>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#1A1714' }}>田中太郎</span>
            </div>
          </div>
          {/* 開始日/期限日 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <div style={{ background: '#F4F5F6', borderRadius: 8, padding: '7px 10px' }}>
              <p style={{ fontSize: 7, color: '#B0A9A4', fontWeight: 700, marginBottom: 3 }}>開始日</p>
              <span style={{ fontSize: 9, fontWeight: 600, color: '#1A1714', fontFamily: 'monospace' }}>2026/06/01</span>
            </div>
            <div style={{ background: '#F4F5F6', borderRadius: 8, padding: '7px 10px' }}>
              <p style={{ fontSize: 7, color: '#B0A9A4', fontWeight: 700, marginBottom: 3 }}>期限日</p>
              <span style={{ fontSize: 9, fontWeight: 600, color: '#1A1714', fontFamily: 'monospace' }}>2026/06/08</span>
            </div>
          </div>
          {/* 詳細説明 */}
          <div style={{ background: '#FFF', border: '1px solid rgba(26,23,20,0.07)', borderRadius: 8, padding: '9px 12px' }}>
            <p style={{ fontSize: 7, color: '#B0A9A4', fontWeight: 700, letterSpacing: '0.07em', marginBottom: 6 }}>詳細説明</p>
            <p style={{ fontSize: 9.5, color: '#3D3732', lineHeight: 1.7, margin: 0 }}>
              カート追加・削除・数量変更のUIとAPIの連携を実装する。<br />
              <span style={{ color: '#2563EB', fontWeight: 600 }}>Zustand</span>でカート状態を管理し、<span style={{ color: '#2563EB', fontWeight: 600 }}>React Query</span>でサーバー状態と同期。<br />
              完了条件：カート操作のE2Eテストが全て通過すること。
            </p>
            <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
              {['🎨 cart-design.fig', '📄 api-spec.pdf'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#F4F5F6', borderRadius: 6, padding: '3px 7px', fontSize: 8, color: '#6B6458' }}>{f}</div>
              ))}
            </div>
          </div>
          {/* コメント */}
          <div>
            <p style={{ fontSize: 8, color: '#B0A9A4', fontWeight: 700, marginBottom: 7 }}>コメント ({comments.length})</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {comments.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 7 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.ac, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6, fontWeight: 700, color: '#fff' }}>{c.ini}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#1A1714' }}>{c.name}</span>
                      <span style={{ fontSize: 8, color: '#C9C4BB', fontFamily: 'monospace' }}>{c.time}</span>
                    </div>
                    <div style={{ background: '#FFF', border: '1px solid rgba(26,23,20,0.07)', borderRadius: 7, padding: '6px 9px', fontSize: 9, color: '#3D3732', lineHeight: 1.55 }}>{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── スライド定義 ──────────────────────────────────────────────────────────────

const Slide1 = (
  <div key="s1" className="w-full h-[720px] relative overflow-hidden flex">
    {/* 左: ブランドカラー背景 */}
    <div className="relative z-10 flex flex-col justify-between" style={{ width: '52%', background: 'linear-gradient(160deg, #064e3b 0%, #065f46 40%, #0d9488 100%)', padding: '52px 56px 48px' }}>
      {/* 背景デコ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.18) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 65%)' }} />
      </div>
      {/* ロゴ */}
      <div className="relative flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(145deg, #34D399, #059669)', boxShadow: '0 4px 16px rgba(5,150,105,0.5)' }}>
          <Ticket className="w-7 h-7 text-white" />
        </div>
        <span className="text-white text-2xl font-bold">Dev Ticket</span>
      </div>
      {/* メインコピー */}
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold" style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.35)', color: '#6EE7B7' }}>
          <Rocket className="w-3.5 h-3.5" />
          2026年6月 リリース予定
        </div>
        <h1 className="text-white font-black leading-tight mb-4" style={{ fontSize: 42 }}>
          プロジェクトを、<br />
          <span style={{ color: '#34D399' }}>スマートに。</span>
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
          チケット・スプリント・メンバーを<br />
          一元管理。チームの生産性を<br />
          最大化する次世代ツール。
        </p>
      </div>
      {/* 3つのキーポイント */}
      <div className="relative space-y-3">
        {[
          { icon: LayoutDashboard, text: 'プロジェクト・スプリント一元管理' },
          { icon: Users, text: '4ルートのリソース調達機能' },
          { icon: Bell, text: 'Slack通知・権限管理・25以上の機能' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.3)' }}>
              <Icon className="w-3.5 h-3.5" style={{ color: '#34D399' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
    {/* 右: ダッシュボードモック */}
    <div className="flex-1 flex flex-col" style={{ background: '#F1F5F9', padding: '14px 16px 14px 8px' }}>
      <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.15)' }}>
        <MockDashboard fillHeight />
      </div>
    </div>
  </div>
);

const Slide2 = (
  <div key="s2" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20,184,166,0.06) 0%, transparent 60%)' }} />
    <div className="relative h-full flex flex-col" style={{ padding: '52px 72px' }}>
      {/* ヘッダー */}
      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-4" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#059669' }}>
          <Zap className="w-3.5 h-3.5" />
          Dev Ticketとは
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">
          開発チームに必要なすべてを<span style={{ color: '#059669' }}>一つに</span>
        </h2>
        <p className="text-slate-500 text-base">プロジェクト管理・スプリント・リソース調達を統合したWebシステムです</p>
      </div>
      {/* 3柱 */}
      <div className="grid grid-cols-3 gap-6 flex-1">
        {[
          {
            icon: LayoutDashboard,
            color: '#059669', bg: '#ECFDF5', border: '#BBF7D0',
            title: 'プロジェクト管理',
            desc: 'ダッシュボードでチーム全体を俯瞰。プロジェクト・クライアント・メンバーを一元管理できます。',
            points: ['プロジェクト進捗の可視化', '管理者レポート・PDF出力', 'メンバーの権限・ロール管理', 'チケット一括作成・CSV取込', 'Myフィルタ機能', 'リリースノート管理'],
            extra: '複数プロジェクトを横断して状況を把握できるため、PMのオーバーヘッドを大幅削減。',
          },
          {
            icon: FolderKanban,
            color: '#0284C7', bg: '#EFF6FF', border: '#BFDBFE',
            title: 'スプリント管理',
            desc: 'アジャイル開発に対応。チケットをリスト・ボード・ガントの3ビューで管理します。',
            points: ['リスト / ボード / ガントチャート', 'チケット優先度・担当者設定', 'レビューフローの一元管理', 'マイルストーン自動記録（6工程）', '優先度マトリックス分析', 'バックログ・議事録・Wiki機能'],
            extra: '8段階ステータスと優先度マトリックスでチーム全体の作業状況を常に可視化。',
          },
          {
            icon: Users,
            color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE',
            title: 'リソース調達',
            desc: 'チケット単位で担当エンジニアを調達。グループ・会員・パートナー・エージェントの4ルートを提供。',
            points: ['グループ企業内共有', 'フリーランスエンジニア募集', 'パートナー企業・エージェント連携', 'スキル・稼働条件マッチング', '成果物受け取りまで一元管理', 'Slack通知・メール連携'],
            extra: '他ツールにない独自機能。外部エンジニアの発注から完了確認まで一元管理できます。',
          },
        ].map(({ icon: Icon, color, bg, border, title, desc, points, extra }) => (
          <div key={title} className="flex flex-col rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}`, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            <div className="p-5" style={{ background: bg }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: color, boxShadow: `0 4px 12px ${color}44` }}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
            </div>
            <div className="px-5 py-4 flex-1 flex flex-col bg-white">
              <div className="space-y-2 flex-1">
                {points.map(p => (
                  <div key={p} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color }} />
                    <span className="text-sm text-slate-700">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 leading-relaxed">{extra}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Slide3 = (
  <div key="s3" className="w-full h-[720px] relative overflow-hidden flex">
    {/* 左: 説明 */}
    <div className="flex flex-col justify-center" style={{ width: '38%', padding: '52px 48px', background: '#fff' }}>
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-6 w-fit" style={{ background: '#ECFDF5', border: '1px solid #BBF7D0', color: '#059669' }}>
        <LayoutDashboard className="w-3.5 h-3.5" />
        ダッシュボード
      </div>
      <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
        チーム全体を<br /><span style={{ color: '#059669' }}>一目で把握</span>
      </h2>
      <p className="text-slate-600 text-sm leading-relaxed mb-6">
        プロジェクト別の進捗状況、アクティブなチケット、チーム全体の完了率をリアルタイムで確認できます。
      </p>
      <div className="space-y-3">
        {[
          'プロジェクト別チケット進捗バー',
          'アクティブチケットの一覧表示',
          '完了率・期限超過アラート',
          'リアルタイムの進捗更新',
        ].map(t => (
          <div key={t} className="flex items-center gap-3">
            <CheckCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#059669' }} />
            <span className="text-sm text-slate-700">{t}</span>
          </div>
        ))}
      </div>
    </div>
    {/* 右: ダッシュボードモック */}
    <div className="flex-1 flex flex-col" style={{ background: '#F8FAFC', padding: '14px 16px 14px 8px' }}>
      <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
        <MockDashboard fillHeight />
      </div>
    </div>
  </div>
);

const Slide4 = (
  <div key="s4" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex flex-col" style={{ padding: '40px 56px' }}>
      {/* ヘッダー */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#0284C7' }}>
          <FolderKanban className="w-3.5 h-3.5" />
          スプリント管理
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900">
            3つのビューで<span style={{ color: '#0284C7' }}>直感的に管理</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>リスト</span>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-blue-600">ボード</span>
            <span className="text-slate-300">|</span>
            <span>ガント</span>
          </div>
        </div>
      </div>
      {/* 2カラム: リスト & ボード */}
      <div className="flex gap-5 flex-1 min-h-0">
        {/* リストビュー */}
        <div className="flex-1 flex flex-col min-w-0">
          <p className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
            <List className="w-3.5 h-3.5" />
            リストビュー
          </p>
          <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 min-h-0" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <MockSprintList />
          </div>
        </div>
        {/* ボードビュー */}
        <div className="flex-1 flex flex-col min-w-0">
          <p className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5" />
            ボードビュー（カンバン）
          </p>
          <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 min-h-0" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <MockSprintBoard />
          </div>
        </div>
      </div>
      {/* 下部: 機能ポイント */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {[
          { icon: CheckCheck, text: 'ドラッグ&ドロップでステータス変更' },
          { icon: SlidersHorizontal, text: '詳細フィルタ・Myフィルタ保存' },
          { icon: ListPlus, text: 'チケット一括作成' },
          { icon: GitMerge, text: '子チケット・チケット分類' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-start gap-2 rounded-xl p-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <Icon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <span className="text-xs text-slate-600 leading-relaxed">{text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Slide5 = (
  <div key="s5" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%)' }}>
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 65%)' }} />
    </div>
    <div className="relative h-full flex flex-col" style={{ padding: '44px 60px' }}>
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: 'linear-gradient(135deg, #0d9488, #10b981)', color: '#fff', boxShadow: '0 4px 16px rgba(16,185,129,0.3)' }}>
          <Zap className="w-3.5 h-3.5" />
          リソース調達の新しいカタチ
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2">
          <span style={{ color: '#059669' }}>4つのルート</span>から最適な<br />エンジニアを確保
        </h2>
        <p className="text-slate-500 text-base">チケット単位で担当を募集・アサイン。完了後はチケットをクローズ。</p>
      </div>
      {/* 4ルートカード */}
      <div className="grid grid-cols-4 gap-4 flex-1">
        {[
          {
            icon: Building2, color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4', text: '#0f766e',
            label: 'グループ企業内',
            desc: 'グループ会社の管理者が社内メンバーをアサイン。社外に非公開のクローズドな調達ルート。',
            steps: ['グループ専用ページに案件掲載', '管理者が担当者をアサイン', '実装・レビューで完了'],
          },
          {
            icon: Users, color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8',
            label: '会員エンジニア',
            desc: 'スキルタグにマッチした登録エンジニアのみに案件を公開。応募を受け付けて承認。',
            steps: ['スキルマッチした会員に公開', 'エンジニアが応募', '企業が承認・アサイン'],
          },
          {
            icon: Building2, color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', text: '#5b21b6',
            label: 'パートナー企業',
            desc: '連携設定済みのパートナー企業の管理者に通知。パートナー社内でアサインして受注。',
            steps: ['パートナー管理者に通知', 'パートナー企業が担当者を指名', '実装・レビューで完了'],
          },
          {
            icon: Bot, color: '#f97316', bg: '#fff7ed', border: '#fed7aa', text: '#c2410c',
            label: 'エージェント連携',
            desc: 'API連携でエージェント会社の独立システムに案件を連携。FLの応募または直接指名が可能。',
            steps: ['API経由で案件データ連携', 'FL応募 or エージェント指名', '企業が最終承認・アサイン'],
          },
        ].map(({ icon: Icon, color, bg, border, text, label, desc, steps }) => (
          <div key={label} className="flex flex-col rounded-2xl overflow-hidden" style={{ background: '#fff', border: `1.5px solid ${border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div className="p-5 border-b" style={{ borderColor: border, background: bg }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: color, boxShadow: `0 4px 12px ${color}55` }}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-black text-slate-900 text-sm">{label}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
            </div>
            <div className="p-4 flex-1 space-y-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-black flex-shrink-0 mt-0.5" style={{ background: color, minWidth: 16 }}>{i + 1}</div>
                  <span className="text-xs text-slate-600 leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* 共通フロー */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {[
          { label: 'チケット作成', icon: Ticket, color: '#059669' },
          null,
          { label: 'ルート選択', icon: ArrowRight, color: '#0284C7' },
          null,
          { label: '担当者アサイン', icon: Users, color: '#7C3AED' },
          null,
          { label: '実装・提出', icon: GitPullRequest, color: '#D97706' },
          null,
          { label: 'レビュー・完了', icon: CheckCircle2, color: '#059669' },
        ].map((item, i) => item === null ? (
          <ArrowRight key={i} className="w-4 h-4 text-slate-300 flex-shrink-0" />
        ) : (
          <div key={item.label} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
            <item.icon className="w-3 h-3" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Slide6 = (
  <div key="s6" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#F8FAFB' }}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px 32px 20px', boxSizing: 'border-box' }}>
      {/* ヘッダー */}
      <div style={{ textAlign: 'center', marginBottom: 10, flexShrink: 0 }}>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#059669', marginBottom: 6 }}>
          <Activity className="w-3.5 h-3.5" />
          調達フロー詳細
        </div>
        <h2 className="text-2xl font-black text-slate-900" style={{ margin: '0 0 4px' }}>
          チケットを起点に、<span style={{ color: '#059669' }}>担当が決まる</span>
        </h2>
        <p className="text-slate-500" style={{ fontSize: 11, margin: 0 }}>すべてチケットから始まり、ルート別に担当者が決定し、最終的にチケット完了でクローズ</p>
      </div>

      {/* START + STEP01 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F0FDF4', border: '2px solid #BBF7D0', borderRadius: 10, padding: '7px 14px', width: 400 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Ticket style={{ width: 13, height: 13, color: '#fff' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 8, fontWeight: 900, color: '#059669', letterSpacing: '0.12em', margin: 0 }}>START</p>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#1A1714', margin: 0, lineHeight: 1.2 }}>DevTicketでチケットを作成</p>
          </div>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#9E9690', background: '#fff', borderRadius: 20, padding: '2px 8px', border: '1px solid #E5E7EB', flexShrink: 0 }}>PM / チームリーダー</span>
        </div>
        <div style={{ width: 2, height: 7, background: '#CBD5E1' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #0d9488, #059669)', borderRadius: 10, padding: '7px 14px', width: 400, boxShadow: '0 4px 14px rgba(13,148,136,0.3)' }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Search style={{ width: 13, height: 13, color: '#fff' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 8, fontWeight: 900, color: '#99f6e4', letterSpacing: '0.12em', margin: 0 }}>STEP 01</p>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>「担当を探す」をクリック・ルートを選択</p>
          </div>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#99f6e4', background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '2px 8px', border: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>PM / チームリーダー</span>
        </div>
      </div>

      {/* 分岐線 */}
      <div style={{ position: 'relative', height: 20, flexShrink: 0 }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: 10, background: '#CBD5E1', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', top: 10, left: '12.5%', right: '12.5%', height: 2, background: '#E2E8F0' }} />
        {[['12.5%','#0d9488'],['37.5%','#3b82f6'],['62.5%','#7c3aed'],['87.5%','#f97316']].map(([pos,col]) => (
          <div key={pos} style={{ position: 'absolute', top: 10, bottom: 0, left: pos, width: 2, background: col, transform: 'translateX(-50%)' }} />
        ))}
      </div>

      {/* 4カラム — flex-1で残りの高さを均等分割 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, flex: 1, minHeight: 0 }}>
        {[
          {
            label: 'グループ企業内', color: '#0d9488', border: '#99f6e4',
            steps: [
              { title: 'グループ専用ページに案件掲載', actor: 'Dev Ticket', system: true },
              { title: '管理者が担当者をアサイン', actor: 'グループ会社側', system: false },
              { title: '実装完了・成果物を提出', actor: '担当エンジニア', system: false },
            ],
          },
          {
            label: '会員エンジニア', color: '#3b82f6', border: '#bfdbfe',
            steps: [
              { title: 'スキルマッチした会員に案件公開', actor: 'Dev Ticket', system: true },
              { title: 'エンジニアが案件に応募', actor: '登録エンジニア', system: false },
              { title: '企業が応募者を承認・アサイン', actor: 'チケット作成側', system: false },
              { title: '実装完了・成果物を提出', actor: '担当エンジニア', system: false },
            ],
          },
          {
            label: 'パートナー企業', color: '#7c3aed', border: '#ddd6fe',
            steps: [
              { title: 'パートナー企業の管理者に通知', actor: 'Dev Ticket', system: true },
              { title: 'パートナー企業が担当者をアサイン', actor: 'パートナー企業側', system: false },
              { title: '実装完了・成果物を提出', actor: 'パートナーエンジニア', system: false },
            ],
          },
          {
            label: 'エージェント連携', color: '#f97316', border: '#fed7aa',
            steps: [
              { title: 'エージェントシステムに案件連携', actor: 'Dev Ticket', system: true },
              { title: 'FLが応募 / エージェントが指名', actor: 'エージェント側', system: false },
              { title: '企業が最終承認・アサイン', actor: 'チケット作成側', system: false },
              { title: '実装完了・成果物を提出', actor: '担当エンジニア', system: false },
            ],
          },
        ].map(route => (
          <div key={route.label} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ background: route.color, borderRadius: 8, padding: '7px 10px', textAlign: 'center', marginBottom: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>{route.label}</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, minHeight: 0 }}>
              {route.steps.map((step, si) =>
                step ? (
                  <div key={si} style={{ flex: 1, background: '#fff', border: `1px solid ${route.border}`, borderRadius: 8, padding: '6px 9px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0, boxSizing: 'border-box' }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: step.system ? route.color : '#6B6458', background: step.system ? `${route.color}15` : '#F4F5F6', borderRadius: 4, padding: '1px 5px', alignSelf: 'flex-start', marginBottom: 4, display: 'inline-block' }}>
                      {step.actor}
                    </span>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#1A1714', lineHeight: 1.35, margin: 0 }}>{step.title}</p>
                  </div>
                ) : (
                  <div key={si} style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'visible' }}>
                    <div style={{ position: 'absolute', left: '50%', top: -5, bottom: -18, width: 2, background: route.color, transform: 'translateX(-50%)', zIndex: 1 }} />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 収束線 */}
      <div style={{ position: 'relative', height: 18, flexShrink: 0 }}>
        {[['12.5%','#0d9488'],['37.5%','#3b82f6'],['62.5%','#7c3aed'],['87.5%','#f97316']].map(([pos,col]) => (
          <div key={pos} style={{ position: 'absolute', top: 0, bottom: 8, left: pos, width: 2, background: col, transform: 'translateX(-50%)' }} />
        ))}
        <div style={{ position: 'absolute', bottom: 8, left: '12.5%', right: '12.5%', height: 2, background: '#E2E8F0' }} />
        <div style={{ position: 'absolute', left: '50%', bottom: 0, width: 2, height: 8, background: '#CBD5E1', transform: 'translateX(-50%)' }} />
      </div>

      {/* REVIEW + COMPLETE */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '7px 14px', width: 400 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <GitPullRequest style={{ width: 13, height: 13, color: '#64748B' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 8, fontWeight: 900, color: '#94A3B8', letterSpacing: '0.12em', margin: 0 }}>REVIEW</p>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#1A1714', margin: 0, lineHeight: 1.2 }}>コードレビュー・承認</p>
          </div>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#9E9690', background: '#fff', borderRadius: 20, padding: '2px 8px', border: '1px solid #E5E7EB', flexShrink: 0 }}>PM / チームリーダー</span>
        </div>
        <div style={{ width: 2, height: 5, background: '#34D399' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #0d9488, #059669)', borderRadius: 10, padding: '8px 14px', width: 400, boxShadow: '0 6px 20px rgba(13,148,136,0.35)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 9, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 style={{ width: 15, height: 15, color: '#fff' }} />
          </div>
          <div>
            <p style={{ fontSize: 8, fontWeight: 900, color: '#99f6e4', letterSpacing: '0.12em', margin: 0 }}>COMPLETE</p>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>チケット完了・クローズ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Slide7 = (
  <div key="s7" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex flex-col" style={{ padding: '36px 56px' }}>
      {/* ヘッダー */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-2" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#059669' }}>
          <Layers className="w-3.5 h-3.5" />
          豊富な機能
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">
          開発チームが本当に欲しい<span style={{ color: '#059669' }}>28以上の機能</span>
        </h2>
        <p className="text-slate-500 text-sm">すぐに使い始められるシンプルさと、大規模チームにも対応できるパワーを両立</p>
      </div>
      {/* 目玉機能ハイライト */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* Priority Matrix */}
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)', border: '1.5px solid #DDD6FE' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#7C3AED' }}>
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-black text-purple-900">優先度マトリックス</p>
              <p className="text-[9px] text-purple-500">DevTicket独自の分析ビュー</p>
            </div>
          </div>
          {/* ミニ Priority Matrix */}
          <div style={{ border: '1.5px solid #C4B5FD', borderRadius: 8, overflow: 'hidden', fontSize: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr 1fr', background: '#EDE9FE', borderBottom: '1px solid #C4B5FD' }}>
              <div style={{ padding: '4px' }}></div>
              <div style={{ padding: '4px 6px', borderLeft: '1px solid #C4B5FD', color: '#7C3AED', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#F87171', display: 'inline-block' }}></span>バグ
              </div>
              <div style={{ padding: '4px 6px', borderLeft: '1px solid #C4B5FD', color: '#7C3AED', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399', display: 'inline-block' }}></span>機能
              </div>
            </div>
            {[{ label: '優先度：高', dot: '#EF4444', counts: [3, 5] }, { label: '優先度：中', dot: '#F59E0B', counts: [1, 8] }, { label: '優先度：低', dot: '#3B82F6', counts: [2, 4] }].map((row, i, arr) => (
              <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 1fr', borderBottom: i < arr.length - 1 ? '1px solid #C4B5FD' : 'none' }}>
                <div style={{ padding: '6px 6px', background: '#F5F3FF', borderRight: '1px solid #C4B5FD', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: row.dot, flexShrink: 0, display: 'inline-block' }}></span>
                  <span style={{ color: '#6D28D9', fontWeight: 600, fontSize: 7 }}>{row.label}</span>
                </div>
                {row.counts.map((count, ci) => (
                  <div key={ci} style={{ padding: '6px', borderLeft: ci === 0 ? 'none' : '1px solid #C4B5FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#6D28D9', background: '#F3F0FF', padding: '1px 7px', borderRadius: 4, border: '1px solid #C4B5FD' }}>{count}件</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-purple-700 mt-2">バグ×優先度で課題を可視化。クリックで詳細一覧を表示</p>
        </div>
        {/* バックログ・Wiki・議事録 */}
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', border: '1.5px solid #FCD34D' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#D97706' }}>
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-black text-amber-900">ドキュメント管理</p>
              <p className="text-[9px] text-amber-600">PJに紐づく知識を一元管理</p>
            </div>
          </div>
          <div className="space-y-2 mb-3">
            {[
              { icon: Layers, label: 'バックログ', desc: '未着手チケットをプロジェクト横断で一覧管理。スプリントへの追加もドラッグで即完了', color: '#D97706', bg: '#FEF3C7' },
              { icon: BookOpen, label: 'Wiki', desc: 'プロジェクト仕様・設計ドキュメントをTiptapリッチエディタで記述・共有', color: '#B45309', bg: '#FEF9C3' },
              { icon: ClipboardList, label: '議事録', desc: '会議内容をプロジェクトに紐付けて記録。テンプレートで効率的に作成', color: '#92400E', bg: '#FEF3C7' },
            ].map(({ icon: Icon, label, desc, color, bg }) => (
              <div key={label} className="rounded-xl p-2.5 flex items-start gap-2.5" style={{ background: '#fff', border: '1px solid #FDE68A' }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: bg }}>
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold leading-tight" style={{ color: '#78350F' }}>{label}</p>
                  <p className="text-[8px] mt-0.5 leading-snug" style={{ color: '#A16207' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-amber-700">スプリントとドキュメントがひとつのシステムで完結</p>
        </div>
        {/* 6工程マイルストーン */}
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)', border: '1.5px solid #BFDBFE' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-black text-blue-900">6工程マイルストーン追跡</p>
              <p className="text-[9px] text-blue-500">ステータス変更で自動記録</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { label: '着手日',         key: 'startedAt',          done: true,  date: '06/01' },
              { label: 'レビュー依頼日', key: 'reviewRequestedAt',   done: true,  date: '06/03' },
              { label: 'レビュー承認日', key: 'reviewApprovedAt',    done: true,  date: '06/04' },
              { label: 'STG完了日',      key: 'stgCompletedAt',      done: false, date: '—' },
              { label: 'UAT完了日',      key: 'uatCompletedAt',      done: false, date: '—' },
              { label: 'リリース日',     key: 'releasedAt',          done: false, date: '—' },
            ].map(m => (
              <div key={m.key} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: m.done ? '#2563EB' : '#BFDBFE', border: m.done ? '2px solid #1D4ED8' : '2px solid #BFDBFE' }}>
                  {m.done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-[9px] font-medium flex-1" style={{ color: m.done ? '#1E40AF' : '#93C5FD' }}>{m.label}</span>
                <span className="text-[9px] font-mono font-bold" style={{ color: m.done ? '#1D4ED8' : '#BFDBFE' }}>{m.date}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-blue-700 mt-2">実績時間をマイルストーン差分から自動集計</p>
        </div>
      </div>
      {/* その他機能グリッド */}
      <div className="grid grid-cols-6 gap-2 flex-1">
        {[
          { icon: LayoutDashboard, label: 'ダッシュボード', color: '#059669' },
          { icon: FolderKanban, label: 'スプリント管理', color: '#0284C7' },
          { icon: Building2, label: 'プロジェクト管理', color: '#D97706' },
          { icon: Users, label: 'メンバー管理', color: '#F43F5E' },
          { icon: Building2, label: 'クライアント管理', color: '#0891B2' },
          { icon: GitPullRequest, label: 'レビューフロー', color: '#8B5CF6' },
          { icon: MessageSquare, label: 'コメント・メンション', color: '#06B6D4' },
          { icon: Search, label: 'グローバル検索', color: '#EC4899' },
          { icon: Bell, label: 'Slack通知連携', color: '#F59E0B' },
          { icon: Download, label: 'CSVエクスポート', color: '#65A30D' },
          { icon: Lock, label: '権限グループ管理', color: '#7C3AED' },
          { icon: SlidersHorizontal, label: 'Myフィルタ', color: '#0EA5E9' },
          { icon: ListPlus, label: 'チケット一括作成', color: '#16A34A' },
          { icon: GitMerge, label: '子チケット', color: '#D946EF' },
          { icon: Tag, label: 'チケット分類', color: '#0D9488' },
          { icon: Link2, label: '短URLリダイレクト', color: '#F97316' },
          { icon: Layers, label: 'バックログ', color: '#EAB308' },
          { icon: BookOpen, label: 'Wiki', color: '#78716C' },
          { icon: ClipboardList, label: '議事録', color: '#EF4444' },
          { icon: Rocket, label: 'リリースノート', color: '#8B5CF6' },
          { icon: Zap, label: 'マイアクション', color: '#F97316' },
          { icon: CalendarRange, label: 'アサイン計画', color: '#6366F1' },
          { icon: UserCog, label: 'ロール設定', color: '#64748B' },
          { icon: Paperclip, label: 'ファイル添付', color: '#71717A' },
          { icon: BarChart3, label: '管理者レポート', color: '#0891B2' },
          { icon: Fingerprint, label: '生体認証ログイン', color: '#059669' },
          { icon: Smartphone, label: 'Mac/iPadアプリ', color: '#6366F1' },
        ].map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-1.5 rounded-lg px-2.5 py-2" style={{ background: '#F9FAFB', border: '1px solid #F0F0F0' }}>
            <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
              <Icon className="w-3 h-3" style={{ color }} />
            </div>
            <span className="text-[9px] font-bold text-slate-700 leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Slide8 = (
  <div key="s8" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#F8FAFC' }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20,184,166,0.05) 0%, transparent 60%)' }} />
    <div className="relative h-full flex flex-col" style={{ padding: '44px 72px' }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#ECFDF5', border: '1px solid #BBF7D0', color: '#059669' }}>
          シンプルな料金体系
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2">料金プラン</h2>
        <p className="text-slate-500 text-base">チームの規模に合わせて最適なプランをお選びください</p>
      </div>
      <div className="grid grid-cols-3 gap-6 flex-1 items-center">
        {/* スターター */}
        <div className="flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden h-full" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div className="p-7 flex-1">
            <h3 className="text-xl font-black text-slate-900 mb-1">スターター</h3>
            <p className="text-sm text-slate-400 mb-5">小規模チーム向け</p>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-black text-slate-900">¥5,000</span>
              <span className="text-slate-400 text-sm mb-1">/ 月</span>
            </div>
            <div className="space-y-3">
              {['1プロジェクトまで', '5メンバーまで', '基本機能', 'メールサポート'].map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#059669' }} />
                  <span className="text-sm text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-7 pb-7">
            <button className="w-full rounded-xl py-3 text-sm font-bold border border-slate-300 text-slate-700 hover:border-slate-400 transition-colors">
              無料で始める
            </button>
          </div>
        </div>
        {/* プロフェッショナル (推奨) */}
        <div className="flex flex-col rounded-2xl overflow-hidden h-full relative" style={{ background: 'linear-gradient(160deg, #065f46 0%, #0d9488 100%)', boxShadow: '0 12px 40px rgba(13,148,136,0.4)' }}>
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-200 rounded-full px-3 py-1">人気 No.1</span>
          </div>
          <div className="p-7 pt-12 flex-1">
            <h3 className="text-xl font-black text-white mb-1">プロフェッショナル</h3>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>成長チーム向け</p>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-black text-white">¥9,800</span>
              <span className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>/ 月</span>
            </div>
            <div className="space-y-3">
              {['30プロジェクトまで', '20メンバーまで', '全機能利用可能', '優先サポート'].map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCheck className="w-4 h-4 flex-shrink-0 text-emerald-300" />
                  <span className="text-sm text-white">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-7 pb-7">
            <button className="w-full rounded-xl py-3 text-sm font-black bg-white text-emerald-700 hover:bg-emerald-50 transition-colors">
              今すぐ始める →
            </button>
          </div>
        </div>
        {/* エンタープライズ */}
        <div className="flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden h-full" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div className="p-7 flex-1">
            <h3 className="text-xl font-black text-slate-900 mb-1">エンタープライズ</h3>
            <p className="text-sm text-slate-400 mb-5">大規模・グループ企業向け</p>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-3xl font-black text-slate-900">お問い合わせ</span>
            </div>
            <div className="space-y-3">
              {['無制限プロジェクト', '無制限メンバー', '専用サーバー', 'カスタマイズ対応', '専任サポート'].map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#059669' }} />
                  <span className="text-sm text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-7 pb-7">
            <button className="w-full rounded-xl py-3 text-sm font-bold border border-slate-300 text-slate-700">
              お問い合わせ
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 mt-4">※ 料金はすべて税別表示です</p>
    </div>
  </div>
);

const Slide9 = (
  <div key="s9" className="w-full h-[720px] relative overflow-hidden">
    <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #064e3b 0%, #065f46 35%, #0d9488 70%, #14b8a6 100%)' }} />
    {/* デコ */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 65%)' }} />
    </div>
    <div className="relative h-full flex flex-col items-center justify-center text-center" style={{ padding: '52px 80px' }}>
      {/* ロゴ */}
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(145deg, #34D399, #059669)', boxShadow: '0 8px 24px rgba(5,150,105,0.5), inset 0 1px 0 rgba(255,255,255,0.30)' }}>
        <Ticket className="w-9 h-9 text-white" />
      </div>
      <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold mb-6" style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.35)', color: '#6EE7B7' }}>
        <Rocket className="w-3.5 h-3.5" />
        2026年6月 リリース予定
      </div>
      <h2 className="text-white font-black mb-3 leading-tight" style={{ fontSize: 48 }}>
        まずは<span style={{ color: '#34D399' }}>無料デモ</span>から<br />始めましょう
      </h2>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
        数分でチーム全体の生産性を向上させます。
      </p>
      {/* 3つの特徴 */}
      <div className="grid grid-cols-3 gap-4 mb-10 w-full max-w-2xl">
        {[
          { icon: Clock, title: 'すぐに利用開始', desc: 'サインアップ後すぐにプロジェクト管理を開始' },
          { icon: Shield, title: 'きめ細かい権限管理', desc: 'ロールベースのアクセス制御で安全に運用' },
          { icon: Bell, title: 'Slack連携', desc: '更新・レビュー依頼をSlackへ即通知' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl p-4 text-left" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Icon className="w-5 h-5 mb-2" style={{ color: '#34D399' }} />
            <p className="text-white font-bold text-sm mb-1">{title}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{desc}</p>
          </div>
        ))}
      </div>
      {/* 連絡先 */}
      <div className="flex items-center gap-8 rounded-2xl px-8 py-4" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <div className="text-left">
          <p className="text-[10px] font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>運営</p>
          <p className="text-sm font-black text-white">Meece株式会社</p>
        </div>
        <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.2)' }} />
        <div className="text-left">
          <p className="text-[10px] font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>TEL</p>
          <p className="text-sm font-black text-white">03-5288-5125</p>
        </div>
        <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.2)' }} />
        <div className="text-left">
          <p className="text-[10px] font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>WEB</p>
          <p className="text-sm font-black text-white">meece-jp.com</p>
        </div>
      </div>
    </div>
  </div>
);

// ── 追加7スライド ─────────────────────────────────────────────────────────────

const SlideMeece = (
  <div key="s-meece" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex flex-col justify-between" style={{ padding: '44px 64px' }}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #34D399, #059669)', boxShadow: '0 8px 24px rgba(5,150,105,0.3)' }}>
            <Ticket className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900" style={{ letterSpacing: '-0.03em' }}>Meece株式会社</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">ミースカブシキガイシャ</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: '#ECFDF5', border: '1px solid #BBF7D0', color: '#059669' }}>
          <Building2 className="w-3.5 h-3.5" />
          運営会社概要
        </div>
      </div>

      {/* メインコンテンツ: 左(会社概要表) + 右(ミッション・沿革) */}
      <div className="flex gap-8 flex-1 mt-6">
        {/* 左: 会社概要テーブル */}
        <div className="flex-1 flex flex-col">
          <div className="rounded-2xl overflow-hidden border border-slate-100 flex-1" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
            {[
              { label: '商号', value: 'Meece株式会社' },
              { label: '代表取締役社長', value: '溝口 雅登' },
              { label: '会社設立日', value: '2022年 8月 22日' },
              { label: '資本金', value: '1,000,000円' },
              { label: '取引先銀行', value: 'みずほ銀行（八重洲口支店）' },
              { label: '住所', value: '〒100-0005 東京都千代田区丸の内1丁目8-3\n丸の内トラストタワー本館 20階' },
              { label: '事業内容', value: 'SES事業 / 受託開発・コンサル / AI研究開発 / 自社SaaS開発' },
              { label: 'お問い合わせ', value: '03-5288-5125' },
            ].map(({ label, value }, i, arr) => (
              <div key={label} className="flex" style={{ flex: 1, borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', alignItems: 'center' }}>
                <div className="flex items-center flex-shrink-0" style={{ width: 140, padding: '0 14px', background: '#F9FAFB', alignSelf: 'stretch', display: 'flex' }}>
                  <span className="text-[10px] font-bold text-slate-700">{label}</span>
                </div>
                <div style={{ padding: '8px 14px', flex: 1 }}>
                  <span className="text-[10px] text-slate-700" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右: ミッション + 沿革 */}
        <div className="flex flex-col gap-3" style={{ width: '42%' }}>
          {/* ミッション */}
          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1e3a5f 100%)', boxShadow: '0 8px 32px rgba(13,27,62,0.25)' }}>
            <p className="text-[9px] font-black tracking-widest mb-2" style={{ color: '#00FBFF', letterSpacing: '0.2em' }}>MISSION</p>
            <p className="text-base font-black text-white leading-snug">「ITの歯車」として、<br />まだ見ぬ感動の続きを創り出す。</p>
          </div>
          {/* 沿革 */}
          <div className="rounded-2xl p-4 flex-1" style={{ background: '#F9FAFB', border: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column' }}>
            <p className="text-[9px] font-black text-slate-400 tracking-widest mb-3" style={{ letterSpacing: '0.15em' }}>HISTORY</p>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {[
                { year: '2022', title: '設立', desc: 'SES事業を柱として創業。技術力あるエンジニアを企業へ提供開始。' },
                { year: '2023', title: '受託開発・コンサル拡大', desc: '戦略策定から実装まで一気通貫支援。エンジニアリング組織の構築支援も開始。' },
                { year: '2024', title: 'AI研究開発部門 立ち上げ', desc: '生成AI・LLM技術のビジネス実装専門チームを発足。GPT/Claude活用の内製化支援。' },
                { year: '2026', title: '自社プロダクト Dev Ticket 始動', desc: '開発現場の課題を解決するSaaSを正式リリース。現場発の本質的な課題解決ツール。' },
              ].map(({ year, title, desc }) => (
                <div key={year} className="flex gap-3">
                  <span className="text-[10px] font-black flex-shrink-0 pt-0.5" style={{ color: '#059669', fontFamily: 'monospace', width: 36 }}>{year}</span>
                  <div>
                    <p className="text-[10px] font-black text-slate-900">{title}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 行動指針 */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { title: '深い\n当事者意識', bg: '#E6FFFA' },
              { title: '実利的な\n現実主義', bg: '#F5F3FF' },
              { title: '無限の\n機動力', bg: '#FFF5F7' },
            ].map(({ title, bg }) => (
              <div key={title} className="rounded-xl py-3 px-2 text-center" style={{ background: bg }}>
                <p className="text-[10px] font-black leading-snug text-slate-800" style={{ whiteSpace: 'pre-line' }}>{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideProblem = (
  <div key="s-problem" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#FAFAFA' }}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)' }} />
    </div>
    <div className="relative h-full flex flex-col justify-between" style={{ padding: '48px 64px' }}>
      {/* ヘッダー */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-4" style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}>
          <Activity className="w-3.5 h-3.5" />
          現状の課題
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2">
          開発チームが抱える<span style={{ color: '#DC2626' }}>4つの課題</span>
        </h2>
        <p className="text-slate-500 text-base">多くの開発現場では、プロジェクト管理が複数ツールに分散し、情報共有のロスが発生しています。</p>
      </div>
      {/* 課題カード */}
      <div className="grid grid-cols-2 gap-4 flex-1 mt-6">
        {[
          {
            no: '01', icon: Layers, color: '#DC2626', bg: '#FEF2F2', border: '#FECACA',
            title: 'ツールがバラバラで情報が分散',
            desc: 'Slack・Excel・メール・Backlog・Notionと複数ツールを行き来。最新の情報がどこにあるか把握できない状態が常態化。',
            impacts: ['情報検索に平均30分/日消費', 'バージョン違いによるミスが頻発', '「最新版はどれ？」が口癖に'],
            tags: ['Excel管理', 'Slack連絡', 'メール依頼'],
          },
          {
            no: '02', icon: BarChart3, color: '#D97706', bg: '#FFFBEB', border: '#FDE68A',
            title: '進捗が見えない・可視化できない',
            desc: '誰が何をやっているかリアルタイムで把握できない。スプリントの遅延が直前になるまで気づかず、報告工数が本来の開発を圧迫。',
            impacts: ['週次MTGが毎回1時間超', 'リリース遅延の主因No.1', '報告資料作成に週2〜3時間'],
            tags: ['進捗不明', 'ミーティング増加', '報告工数大'],
          },
          {
            no: '03', icon: Users, color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE',
            title: '外部リソースの管理が煩雑',
            desc: '外部エンジニアへの発注・進捗確認・成果物受け取りがメールとチャットで完結しない。コミュニケーションの抜け漏れが頻発。',
            impacts: ['外部委託管理に月10時間超', '成果物検収のトラブルが多発', 'クレームリスクが常に存在'],
            tags: ['外部委託', '契約管理', '成果物受領'],
          },
          {
            no: '04', icon: Timer, color: '#0284C7', bg: '#EFF6FF', border: '#BFDBFE',
            title: '実績・工数管理が手動で非効率',
            desc: 'エンジニアが都度タイムシートに記入。集計ミスや記入漏れが多く、正確な工数把握ができていない。',
            impacts: ['月次集計に毎回3〜4時間', '集計ミスが四半期に平均2件', 'コスト超過の発覚が常に遅れる'],
            tags: ['手動記録', '集計ミス', '振り返り困難'],
          },
        ].map(p => (
          <div key={p.no} className="rounded-2xl p-5 flex gap-4" style={{ background: '#fff', border: `1.5px solid ${p.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: p.bg }}>
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <span className="text-xs font-black" style={{ color: p.color, fontFamily: 'monospace' }}>{p.no}</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <h3 className="text-sm font-black text-slate-900 mb-1.5">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{p.desc}</p>
              <div className="flex-1 space-y-1.5 mb-3">
                {p.impacts.map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <span className="text-[10px] font-medium" style={{ color: p.color }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span key={t} className="text-[9px] font-bold px-2 py-0.5 rounded-md" style={{ background: p.bg, color: p.color }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideBeforeAfter = (
  <div key="s-before-after" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#F8FAFC' }}>
    <div className="h-full flex flex-col justify-between" style={{ padding: '44px 56px' }}>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#059669' }}>
          <Zap className="w-3.5 h-3.5" />
          導入効果
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">
          Dev Ticket導入<span style={{ color: '#059669' }}>前後</span>の変化
        </h2>
        <p className="text-slate-500 text-sm">同じチーム・同じメンバーで、働き方がここまで変わります</p>
      </div>
      {/* Before / After 対比 */}
      <div className="flex gap-5 flex-1 mt-5">
        {/* Before */}
        <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border-2" style={{ borderColor: '#FECACA', background: '#fff' }}>
          <div className="px-5 py-3 flex items-center gap-2 flex-shrink-0" style={{ background: '#FEF2F2' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: '#DC2626' }}>✕</div>
            <span className="text-sm font-black text-red-700">Before — 導入前</span>
          </div>
          <div className="flex-1 flex flex-col p-4 gap-2">
            {[
              { icon: Layers, text: 'タスクはExcelで管理。更新のたびに全員に送付', sub: 'ファイルのバージョン管理が煩雑' },
              { icon: MessageSquare, text: 'レビュー依頼はSlackでメンション。承認確認はメール', sub: '承認状況の追跡が不可能' },
              { icon: Users, text: '外部エンジニアへはメールで発注書を送付', sub: '進捗確認のたびに連絡が必要' },
              { icon: Timer, text: '工数はスプレッドシートに手動入力', sub: '集計に毎月3〜4時間かかる' },
              { icon: BarChart3, text: '進捗報告は週次ミーティングで口頭確認', sub: 'リアルタイムの状況把握は不可能' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex-1 flex items-center gap-3 p-3 rounded-xl" style={{ background: '#FEF2F2' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#FECACA' }}>
                  <Icon className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-snug">{text}</p>
                  <p className="text-[10px] text-red-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 矢印 */}
        <div className="flex items-center justify-center flex-shrink-0">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #059669, #0d9488)', boxShadow: '0 4px 16px rgba(5,150,105,0.3)' }}>
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-black text-emerald-600">Dev Ticket<br />導入</span>
          </div>
        </div>
        {/* After */}
        <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border-2" style={{ borderColor: '#6EE7B7', background: '#fff' }}>
          <div className="px-5 py-3 flex items-center gap-2 flex-shrink-0" style={{ background: '#ECFDF5' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: '#059669' }}>✓</div>
            <span className="text-sm font-black text-emerald-700">After — 導入後</span>
          </div>
          <div className="flex-1 flex flex-col p-4 gap-2">
            {[
              { icon: LayoutDashboard, text: 'ダッシュボードで全プロジェクトをリアルタイム把握', sub: 'どこからでも最新状況を確認可能' },
              { icon: GitPullRequest, text: 'レビュー依頼・承認・差し戻しをシステム内で完結', sub: '承認状況は全員がリアルタイムで確認' },
              { icon: Users, text: '外部エンジニアもシステム内で発注・進捗管理・完了確認', sub: 'チケットが完了したらワンクリックでクローズ' },
              { icon: Activity, text: 'ステータス変更で工数を自動記録・自動集計', sub: '手入力ゼロ、集計は即座に完了' },
              { icon: BarChart3, text: '優先度マトリックスで課題の優先度を即座に可視化', sub: 'データに基づいた意思決定が可能' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex-1 flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F0FDF4' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#ECFDF5' }}>
                  <Icon className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-snug">{text}</p>
                  <p className="text-[10px] text-emerald-600 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideROI = (
  <div key="s-roi" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 30%, #fff 70%)' }}>
    <div className="h-full flex flex-col justify-between" style={{ padding: '48px 64px' }}>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#ECFDF5', border: '1px solid #BBF7D0', color: '#059669' }}>
          <TrendingUp className="w-3.5 h-3.5" />
          導入効果
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">
          数字で見る<span style={{ color: '#059669' }}>導入効果</span>
        </h2>
        <p className="text-slate-500 text-sm">Dev Ticket導入チームの平均的な改善効果（社内検証データ）</p>
      </div>
      {/* 大数字 4つ */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { value: '35%', label: '管理工数削減', sub: '週あたりの管理・報告作業時間が平均35%削減', icon: Timer, color: '#059669', bg: '#ECFDF5' },
          { value: '3日→1日', label: 'レビューリードタイム', sub: 'レビュー依頼から承認までの平均日数が短縮', icon: GitPullRequest, color: '#2563EB', bg: '#EFF6FF' },
          { value: '当日', label: 'リソースアサイン', sub: 'チケット起点の調達フローで担当決定が迅速化', icon: Users, color: '#7C3AED', bg: '#F5F3FF' },
          { value: '0時間', label: '工数集計作業', sub: 'マイルストーン自動記録により手動集計が完全撤廃', icon: Activity, color: '#D97706', bg: '#FFFBEB' },
        ].map(({ value, label, sub, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: `1px solid ${color}20` }}>
            <div style={{ height: 4, background: color }} />
            <div className="p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="text-3xl font-black mb-1.5" style={{ color, letterSpacing: '-0.04em' }}>{value}</div>
              <div className="text-sm font-black text-slate-900 mb-2">{label}</div>
              <p className="text-[10px] text-slate-400 leading-relaxed">{sub}</p>
            </div>
          </div>
        ))}
      </div>
      {/* 補足 */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: CheckCheck, text: '月次レポート作成時間：平均4時間 → 15分', color: '#059669' },
          { icon: MessageSquare, text: '進捗確認ミーティング：週3回 → 週1回', color: '#0284C7' },
          { icon: Shield, text: 'タスク抜け漏れ発生率：月平均8件 → 1件未満', color: '#7C3AED' },
        ].map(({ icon: Icon, text, color }) => (
          <div key={text} className="flex items-center gap-3 rounded-xl p-3.5" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <span className="text-xs font-bold text-slate-700">{text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideComparison = (
  <div key="s-comparison" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex flex-col" style={{ padding: '44px 56px' }}>
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#2563EB' }}>
          <BarChart3 className="w-3.5 h-3.5" />
          サービス比較
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">
          他社サービスとの<span style={{ color: '#059669' }}>比較</span>
        </h2>
        <p className="text-slate-500 text-sm">Dev Ticketは「開発チームのリソース調達」まで含めた唯一のオールインワンプロジェクト管理ツールです</p>
      </div>
      {/* 比較テーブル */}
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        {/* ヘッダー行 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1fr', borderBottom: '2px solid #E5E7EB', flexShrink: 0 }}>
          <div style={{ padding: '12px 16px', background: '#F9F8F6', fontSize: 10, fontWeight: 700, color: '#B0A9A4' }}>比較項目</div>
          {[
            { name: 'Dev Ticket', sub: '国産・開発特化', bg: 'linear-gradient(135deg, #064e3b, #0d9488)', text: '#fff', badge: '推奨' },
            { name: 'Jira', sub: 'アトラシアン製', bg: '#EFF6FF', text: '#1D4ED8', badge: null },
            { name: 'Backlog', sub: 'ヌーラボ製・国産', bg: '#F9FAFB', text: '#1A1714', badge: null },
            { name: 'Asana', sub: 'タスク管理ツール', bg: '#F9FAFB', text: '#1A1714', badge: null },
          ].map(s => (
            <div key={s.name} style={{ padding: '10px 12px', background: s.bg, textAlign: 'center', borderLeft: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: s.text }}>{s.name}</span>
              <span style={{ fontSize: 8, color: s.text === '#fff' ? 'rgba(255,255,255,0.7)' : '#9E9690' }}>{s.sub}</span>
              {s.badge && <span style={{ fontSize: 8, fontWeight: 700, background: 'rgba(255,255,255,0.22)', color: '#fff', padding: '1px 6px', borderRadius: 20 }}>{s.badge}</span>}
            </div>
          ))}
        </div>
        {/* 比較行 */}
        <div className="flex-1 flex flex-col">
          {[
            { label: 'スプリント管理（リスト/ボード/ガント）', vals: ['○', '○', '○', '△'] },
            { label: 'バックログ/Wiki/議事録',            vals: ['○', '✕', '○', '✕'] },
            { label: '外部リソース調達（4ルート）',       vals: ['○', '✕', '✕', '✕'] },
            { label: 'Myフィルタ機能',                    vals: ['○', '○', '✕', '✕'] },
            { label: 'チケット一括作成',                  vals: ['○', '○', '○', '✕'] },
            { label: 'マイルストーン自動記録',            vals: ['○', '△', '△', '△'] },
            { label: 'リリースノート機能',                vals: ['○', '○', '✕', '✕'] },
            { label: '優先度マトリックス分析',            vals: ['○', '△', '✕', '△'] },
            { label: '日本語カスタマーサポート',          vals: ['○', '✕', '○', '✕'] },
          ].map((row, ri) => {
            const symbolColor = (v: string) => v === '○' ? '#059669' : v === '△' ? '#D97706' : '#DC2626';
            return (
              <div key={row.label} style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1fr', borderBottom: ri < 8 ? '1px solid #F0F0F0' : 'none', background: ri % 2 === 1 ? 'rgba(26,23,20,0.012)' : 'transparent', alignItems: 'center' }}>
                <div style={{ padding: '0 16px', fontSize: 10, fontWeight: 600, color: '#3D3732' }}>{row.label}</div>
                {row.vals.map((v, vi) => (
                  <div key={vi} style={{ textAlign: 'center', borderLeft: '1px solid #F0F0F0', background: vi === 0 ? 'rgba(5,150,105,0.04)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: symbolColor(v) }}>{v}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const SlideTicketDetail = (
  <div key="s-ticket-detail" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex" style={{ padding: '40px 56px' }}>
      {/* 左: 説明 */}
      <div className="flex flex-col justify-between" style={{ width: '36%', paddingRight: 40 }}>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-4" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#2563EB' }}>
            <Ticket className="w-3.5 h-3.5" />
            チケット詳細
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3">
            <span style={{ color: '#2563EB' }}>チケットひとつ</span>に<br />すべてが集約
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">タスクの内容からコメント・ファイル・マイルストーンまで、チケット上で完結。ツールを切り替える必要はありません。</p>
          <div className="space-y-3">
            {[
              { icon: MessageSquare, title: 'Tiptapリッチエディタ', desc: 'Markdown対応の高機能テキストエディタで詳細仕様を記述', color: '#2563EB' },
              { icon: Paperclip, title: 'ファイル添付', desc: '設計書・画像・GitHubリンクをチケットに直接添付', color: '#7C3AED' },
              { icon: Activity, title: 'マイルストーン表示', desc: 'ステータス変更履歴と6工程の記録を右パネルに表示', color: '#059669' },
              { icon: GitPullRequest, title: 'レビューフロー', desc: '依頼→承認→差し戻しをチケット内で完結', color: '#D97706' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${color}15` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 右: チケット詳細モック */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
        <MockTicketDetail />
      </div>
    </div>
  </div>
);

const SlideRoadmap = (
  <div key="s-roadmap" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex flex-col justify-between" style={{ padding: '48px 64px' }}>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', color: '#7C3AED' }}>
          <Rocket className="w-3.5 h-3.5" />
          開発ロードマップ
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">
          <span style={{ color: '#7C3AED' }}>進化し続ける</span>プロダクト
        </h2>
        <p className="text-slate-500 text-sm">現場の声を反映したアップデートを継続リリース。長期パートナーとして共に成長します。</p>
      </div>
      {/* ロードマップタイムライン */}
      <div className="flex-1 flex flex-col justify-center gap-0 mt-6">
        {/* ライン */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2" style={{ background: 'linear-gradient(90deg, #059669, #0284C7, #7C3AED, #D97706)' }} />
          <div className="relative grid grid-cols-4 gap-0">
            {[
              {
                phase: 'Phase 1', date: '2026年6月', status: 'launch', color: '#059669', bg: '#ECFDF5', border: '#BBF7D0',
                title: '正式リリース',
                features: ['スプリント管理（3ビュー）', 'リソース調達（4ルート）', 'ダッシュボード・分析', '6工程マイルストーン', '権限・ロール管理'],
              },
              {
                phase: 'Phase 2', date: '2026年Q3', status: 'planned', color: '#0284C7', bg: '#EFF6FF', border: '#BFDBFE',
                title: '連携強化',
                features: ['GitHub連携（PR自動リンク）', 'Slack連携（双方向通知）', 'カレンダー統合', 'APIパブリック公開', 'CSVインポート'],
              },
              {
                phase: 'Phase 3', date: '2026年Q4', status: 'planned', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE',
                title: 'AI強化',
                features: ['AIチケット自動分類', 'AI工数見積もり支援', 'ボトルネック自動検出', '自然言語でチケット作成', 'レポート自動生成'],
              },
              {
                phase: 'Phase 4', date: '2027年〜', status: 'future', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A',
                title: 'エンタープライズ',
                features: ['SSO/SAML対応', 'マルチテナント', 'オンプレミス対応', 'カスタムワークフロー', 'SLAサポート'],
              },
            ].map((p, i) => (
              <div key={p.phase} className="flex flex-col items-center" style={{ paddingTop: i % 2 === 0 ? 0 : 0 }}>
                {/* ドット */}
                <div className="w-5 h-5 rounded-full flex-shrink-0 border-4 border-white z-10 relative" style={{ background: p.color, boxShadow: `0 0 0 3px ${p.color}30` }} />
                {/* カード */}
                <div className="mt-4 rounded-xl p-4 w-full" style={{ background: '#fff', border: `1.5px solid ${p.border}`, boxShadow: `0 4px 16px ${p.color}15` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black tracking-wide" style={{ color: p.color }}>{p.phase}</span>
                    {p.status === 'launch' && (
                      <span className="text-[8px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: p.color }}>LAUNCH</span>
                    )}
                    {p.status === 'planned' && (
                      <span className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: p.bg, color: p.color }}>予定</span>
                    )}
                    {p.status === 'future' && (
                      <span className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#F9F8F6', color: '#B0A9A4' }}>検討中</span>
                    )}
                  </div>
                  <p className="text-xs font-black text-slate-900 mb-1">{p.title}</p>
                  <p className="text-[9px] font-bold mb-2.5" style={{ color: p.color }}>{p.date}</p>
                  <div className="space-y-1">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.color }} />
                        <span className="text-[9px] text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* メッセージ */}
      <div className="text-center">
        <p className="text-sm text-slate-500">機能リクエストは随時受付中。<span className="font-bold text-slate-800">導入企業様のフィードバックを最優先で開発に反映します。</span></p>
      </div>
    </div>
  </div>
);

// ── 追加スライド ───────────────────────────────────────────────────────────────

const SlideResourceConcept = (
  <div key="s-resource-concept" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%)' }}>
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 65%)' }} />
    </div>
    <div className="relative h-full flex flex-col justify-between" style={{ padding: '44px 64px' }}>
      {/* ヘッダー */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: 'linear-gradient(135deg, #0d9488, #059669)', color: '#fff', boxShadow: '0 4px 14px rgba(5,150,105,0.3)' }}>
          <Users className="w-3.5 h-3.5" />
          リソース調達の新しいカタチ
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">
          <span style={{ color: '#059669' }}>チケット起点</span>のエンジニア調達
        </h2>
        <p className="text-slate-500 text-sm">従来の「会社ごとの採用」から、「チケット単位の調達」へ。必要なスキルを、必要なタイミングで確保できます。</p>
      </div>
      {/* フロー図: flex-1 で全幅均等配分 */}
      <div className="flex items-center">
        {/* チケット */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #34D399, #059669)', boxShadow: '0 8px 24px rgba(5,150,105,0.3)' }}>
            <Ticket className="w-9 h-9 text-white" />
          </div>
          <span className="text-xs font-bold text-slate-700">チケット作成</span>
          <span className="text-[10px] text-slate-400">担当未定の状態</span>
        </div>
        <ArrowRight className="w-8 h-8 text-slate-300 flex-shrink-0" />
        {/* 担当を探す */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: '#fff', border: '2px dashed #059669' }}>
            <Search className="w-9 h-9" style={{ color: '#059669' }} />
          </div>
          <span className="text-xs font-bold text-slate-700">担当を探す</span>
          <span className="text-[10px] text-slate-400">4ルートから選択</span>
        </div>
        <ArrowRight className="w-8 h-8 text-slate-300 flex-shrink-0" />
        {/* 4ルート */}
        <div className="flex-1 flex flex-col gap-2">
          {[
            { label: 'グループ企業内', color: '#0d9488', icon: Building2 },
            { label: '会員エンジニア', color: '#3b82f6', icon: Users },
            { label: 'パートナー企業', color: '#7c3aed', icon: Building2 },
            { label: 'エージェント連携', color: '#f97316', icon: Bot },
          ].map(({ label, color, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 w-full" style={{ background: '#fff', border: `1.5px solid ${color}30`, boxShadow: `0 2px 8px ${color}10` }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                <Icon className="w-3.5 h-3.5" style={{ color }} />
              </div>
              <span className="text-xs font-bold" style={{ color }}>{label}</span>
            </div>
          ))}
        </div>
        <ArrowRight className="w-8 h-8 text-slate-300 flex-shrink-0" />
        {/* 実装・レビュー */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: '#EFF6FF', border: '2px solid #BFDBFE' }}>
            <GitPullRequest className="w-9 h-9 text-blue-600" />
          </div>
          <span className="text-xs font-bold text-slate-700">実装・レビュー</span>
          <span className="text-[10px] text-slate-400">通常のフロー</span>
        </div>
        <ArrowRight className="w-8 h-8 text-slate-300 flex-shrink-0" />
        {/* チケット完了 */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: '#ECFDF5', border: '2px solid #6EE7B7' }}>
            <CheckCircle2 className="w-9 h-9 text-emerald-600" />
          </div>
          <span className="text-xs font-bold text-slate-700">チケット完了</span>
          <span className="text-[10px] text-slate-400">クローズ</span>
        </div>
      </div>
      {/* ポイント3つ */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { icon: Zap, title: 'チケット単位で発注', desc: '案件全体ではなく必要な機能・修正単位で外部リソースを活用。コストを最適化できます。', color: '#059669', bg: '#ECFDF5' },
          { icon: Shield, title: '承認制で品質管理', desc: '応募・指名されたエンジニアは必ずPMが承認してからアサイン。信頼性を担保します。', color: '#2563EB', bg: '#EFF6FF' },
          { icon: CheckCheck, title: '完了後はクローズ', desc: '成果物の提出→レビュー→承認でチケット完了。業務委託フローが自動的にクローズします。', color: '#7C3AED', bg: '#F5F3FF' },
        ].map(({ icon: Icon, title, desc, color, bg }) => (
          <div key={title} className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <h3 className="text-sm font-black text-slate-900 mb-1.5">{title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideMilestone = (
  <div key="s-milestone" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex" style={{ padding: '44px 56px' }}>
      {/* 左: 説明 */}
      <div className="flex flex-col" style={{ width: '42%', paddingRight: 40 }}>
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#2563EB' }}>
            <Activity className="w-3.5 h-3.5" />
            実績追跡
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            <span style={{ color: '#2563EB' }}>6工程マイルストーン</span><br />自動記録
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">ステータスが変わるたびに日時を自動記録。手入力不要で正確な実績データを蓄積し、チーム全体の生産性を可視化します。</p>
        </div>
        <div className="space-y-3 mb-6">
          {[
            { key: 'startedAt',         label: '着手日',         desc: '「進行中」にステータス変更した瞬間に自動記録',         color: '#2563EB', step: 1 },
            { key: 'reviewRequestedAt', label: 'レビュー依頼日', desc: '「レビュー中」ステータスへの変更時に記録',              color: '#7C3AED', step: 2 },
            { key: 'reviewApprovedAt',  label: 'レビュー承認日', desc: '「レビュー完了」移行時に記録',                         color: '#059669', step: 3 },
            { key: 'stgCompletedAt',    label: 'STG完了日',      desc: '「STGテスト」完了時に記録',                            color: '#0D9488', step: 4 },
            { key: 'uatCompletedAt',    label: 'UAT完了日',      desc: '「UAT」通過時に記録',                                  color: '#D97706', step: 5 },
            { key: 'releasedAt',        label: 'リリース日',     desc: '「完了」ステータスへの変更で記録',                     color: '#EA580C', step: 6 },
          ].map(m => (
            <div key={m.key} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white flex-shrink-0 mt-0.5" style={{ background: m.color }}>
                {m.step}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-800">{m.label}</span>
                <p className="text-[10px] text-slate-400 leading-snug mt-0.5">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-4" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <div className="flex items-center gap-2 mb-1">
            <Timer className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-black text-blue-900">実績時間を自動集計</span>
          </div>
          <p className="text-[10px] text-blue-700 leading-relaxed">マイルストーン間の差分から各工程の実績時間を自動計算。「実装にかかった時間」「レビュー待ち時間」などを数値で把握できます。</p>
        </div>
      </div>
      {/* 右: モックUI */}
      <div className="flex-1 flex flex-col gap-4">
        {/* チケット詳細 モック */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ background: '#F9F8F6', padding: '12px 16px', borderBottom: '1px solid rgba(26,23,20,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#059669', fontWeight: 700 }}>EC-0001</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#1A1714' }}>カート機能のフロントエンド実装</span>
            </div>
            <span style={{ fontSize: 9, fontWeight: 600, color: '#059669', background: '#ECFDF5', padding: '2px 8px', borderRadius: 20 }}>完了</span>
          </div>
          <div style={{ padding: '16px', background: '#fff' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#1A1714', marginBottom: 12 }}>実績モニタ</p>
            {/* タイムライン */}
            <div style={{ position: 'relative', paddingLeft: 20 }}>
              <div style={{ position: 'absolute', left: 7, top: 6, bottom: 6, width: 2, background: '#E5E7EB', borderRadius: 1 }} />
              {[
                { label: '着手日',         date: '2026/06/01 09:12', color: '#2563EB', done: true },
                { label: 'レビュー依頼日', date: '2026/06/03 16:45', color: '#7C3AED', done: true },
                { label: 'レビュー承認日', date: '2026/06/04 11:20', color: '#059669', done: true },
                { label: 'STG完了日',      date: '2026/06/05 14:00', color: '#0D9488', done: true },
                { label: 'UAT完了日',      date: '2026/06/07 10:30', color: '#D97706', done: true },
                { label: 'リリース日',     date: '2026/06/10 18:00', color: '#EA580C', done: true },
              ].map((m, i) => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < 5 ? 14 : 0, position: 'relative' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: m.color, border: '2px solid #fff', boxShadow: `0 0 0 2px ${m.color}40`, flexShrink: 0, zIndex: 1, position: 'absolute', left: -17 }} />
                  <div style={{ paddingLeft: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#1A1714' }}>{m.label}</span>
                    <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#B0A9A4' }}>{m.date}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* 実績サマリ */}
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                { label: '実装時間', value: '2日4h', color: '#2563EB' },
                { label: 'レビュー待ち', value: '19h', color: '#7C3AED' },
                { label: 'STG〜リリース', value: '5日', color: '#D97706' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: '#F9F8F6', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color, letterSpacing: '-0.03em' }}>{value}</div>
                  <div style={{ fontSize: 8, color: '#B0A9A4', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* プロジェクト統計カード */}
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', border: '1px solid #BFDBFE' }}>
          <p className="text-xs font-black text-blue-900 mb-3">プロジェクト全体のマイルストーン統計</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '平均着手〜完了', value: '9.2日' },
              { label: '平均レビュー待ち', value: '22h' },
              { label: '按期完了率', value: '84%' },
              { label: '記録されたMST', value: '312件' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-xl font-black text-blue-700 leading-tight">{value}</div>
                <div className="text-[8px] text-blue-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideSecurity = (
  <div key="s-security" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex flex-col" style={{ padding: '44px 56px' }}>
      {/* ヘッダー */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', color: '#7C3AED' }}>
          <Shield className="w-3.5 h-3.5" />
          セキュリティ・権限管理
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">
          <span style={{ color: '#7C3AED' }}>細やかな権限設定</span>で<br />チームを安全に管理
        </h2>
        <p className="text-slate-500 text-sm">プロジェクト単位・ロール単位の多層アクセス制御。外部リソースと社内メンバーを安全に同じシステムで管理できます。</p>
      </div>
      {/* 3カラム: 権限グループ / ロール設定 / 招待フロー */}
      <div className="grid grid-cols-3 gap-6 flex-1">
        {/* 権限グループ */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F5F3FF' }}>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="text-sm font-black text-slate-900">権限グループ</h3>
          </div>
          <div className="space-y-2.5 mb-4">
            {[
              { name: '管理者', perms: ['全機能', 'メンバー管理', '設定変更'], color: '#7C3AED', bg: '#F5F3FF' },
              { name: 'PM',     perms: ['チケット全操作', 'スプリント作成', 'レビュー承認'], color: '#2563EB', bg: '#EFF6FF' },
              { name: '開発者', perms: ['チケット更新', 'コメント', 'ファイル添付'], color: '#059669', bg: '#ECFDF5' },
              { name: '閲覧者', perms: ['チケット閲覧のみ'], color: '#6B7280', bg: '#F4F5F6' },
            ].map(g => (
              <div key={g.name} className="rounded-xl p-3" style={{ background: g.bg, border: `1px solid ${g.color}20` }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-black" style={{ color: g.color }}>{g.name}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {g.perms.map(p => (
                    <span key={p} className="text-[8px] font-medium px-1.5 py-0.5 rounded-md" style={{ background: '#fff', color: g.color }}>{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3 mt-auto" style={{ background: '#FAFAFA', border: '1px solid #E5E7EB' }}>
            <p className="text-[9px] text-slate-500 leading-relaxed">権限グループはプロジェクト単位で設定。同じメンバーでもプロジェクトによって異なる権限を持てます。</p>
          </div>
        </div>
        {/* ロール設定 */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#EFF6FF' }}>
              <UserCog className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm font-black text-slate-900">ロール設定</h3>
          </div>
          {/* ロール × 機能マトリックス */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(4, 1fr)', background: '#F9F8F6', borderBottom: '1px solid #E6E2D9', fontSize: 8, fontWeight: 700, color: '#B0A9A4', flexShrink: 0 }}>
              <div style={{ padding: '8px 10px' }}>機能</div>
              {['管理者', 'PM', '開発者', '閲覧者'].map(r => (
                <div key={r} style={{ padding: '8px 6px', textAlign: 'center', borderLeft: '1px solid #E6E2D9' }}>{r}</div>
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'チケット作成', perms: [true, true, true, false] },
                { label: 'チケット削除', perms: [true, true, false, false] },
                { label: 'レビュー承認', perms: [true, true, false, false] },
                { label: 'メンバー招待', perms: [true, false, false, false] },
                { label: '設定変更',     perms: [true, false, false, false] },
                { label: 'CSV出力',      perms: [true, true, true, false] },
              ].map((row, i) => (
                <div key={row.label} style={{ flex: 1, display: 'grid', gridTemplateColumns: '80px repeat(4, 1fr)', borderBottom: i < 5 ? '1px solid #F0F0F0' : 'none', fontSize: 9, alignItems: 'center' }}>
                  <div style={{ padding: '0 10px', color: '#6B6458', fontWeight: 500 }}>{row.label}</div>
                  {row.perms.map((ok, j) => (
                    <div key={j} style={{ textAlign: 'center', borderLeft: '1px solid #F0F0F0' }}>
                      {ok
                        ? <span style={{ color: '#059669', fontWeight: 700, fontSize: 11 }}>✓</span>
                        : <span style={{ color: '#E5E7EB' }}>—</span>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 招待フロー */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#ECFDF5' }}>
              <Link2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-sm font-black text-slate-900">招待フロー</h3>
          </div>
          <div className="space-y-3 flex-1">
            {[
              { step: 1, title: '管理者が招待リンクを発行', desc: 'メールアドレスまたは招待URLを発行。有効期限付きで安全に共有できます。', icon: Link2, color: '#7C3AED' },
              { step: 2, title: '招待者がアカウント登録', desc: 'リンクからアカウント作成。既存アカウントがある場合はそのまま参加できます。', icon: Users, color: '#2563EB' },
              { step: 3, title: 'プロジェクトに自動参加', desc: '登録完了後、招待されたプロジェクトに自動でアサイン。すぐに作業開始できます。', icon: CheckCircle2, color: '#059669' },
            ].map(s => (
              <div key={s.step} className="flex gap-3 rounded-xl p-3" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 mt-0.5" style={{ background: s.color }}>
                  {s.step}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 mb-0.5">{s.title}</p>
                  <p className="text-[9px] text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3 mt-3" style={{ background: '#F5F3FF', border: '1px solid #DDD6FE' }}>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-xs font-black text-purple-900">セキュリティポリシー</span>
            </div>
            <ul className="space-y-1">
              {['招待リンクは24時間で失効', 'プロジェクト外のデータは非表示', '生体認証ログイン（Passkey / Face ID）対応'].map(p => (
                <li key={p} className="text-[9px] text-purple-700 flex items-center gap-1.5">
                  <CheckCheck className="w-3 h-3 flex-shrink-0" />{p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* インフラ基盤バナー */}
      <div className="mt-5 rounded-2xl p-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #1e293b, #334155)', border: '1px solid #475569' }}>
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-slate-300" />
          <div>
            <p className="text-xs font-black text-white">エンタープライズグレードのインフラ基盤</p>
            <p className="text-[9px] text-slate-400 mt-0.5">業界標準のセキュリティと高可用性をフルマネージドで提供</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {[
            { name: 'Supabase', desc: 'RLS・認証・DB', color: '#3ECF8E' },
            { name: 'Vercel', desc: 'エッジデプロイ', color: '#fff' },
            { name: 'HTTPS/TLS', desc: '通信暗号化', color: '#60A5FA' },
            { name: 'Row Level Security', desc: '行単位アクセス制御', color: '#A78BFA' },
          ].map(({ name, desc, color }) => (
            <div key={name} className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black" style={{ color }}>{name}</span>
              <span className="text-[8px] text-slate-500">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideOnboarding = (
  <div key="s-onboarding" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #fff 40%)' }}>
    <div className="h-full flex flex-col justify-between" style={{ padding: '44px 56px' }}>
      {/* ヘッダー */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#ECFDF5', border: '1px solid #BBF7D0', color: '#059669' }}>
          <Rocket className="w-3.5 h-3.5" />
          スムーズな導入
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-1.5">
          最短<span style={{ color: '#059669' }}>30分</span>で使い始められる
        </h2>
        <p className="text-slate-500 text-sm">複雑な設定不要。シンプルなステップで今日からチームの管理を始められます。</p>
      </div>
      {/* ステップ */}
      <div className="relative">
        {/* コネクションライン */}
        <div className="absolute top-10 left-[calc(10%-8px)] right-[calc(10%-8px)] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 pointer-events-none" style={{ zIndex: 0 }} />
        <div className="grid grid-cols-5 gap-4 relative" style={{ zIndex: 1 }}>
          {[
            {
              step: 1, icon: Ticket, color: '#059669', bg: '#ECFDF5', time: '5分',
              title: 'アカウント登録',
              items: ['メールで登録', '会社情報を入力', 'プロフィール設定'],
            },
            {
              step: 2, icon: FolderKanban, color: '#0284C7', bg: '#EFF6FF', time: '5分',
              title: 'プロジェクト作成',
              items: ['プロジェクト名を入力', 'クライアント情報を登録', '開始日を設定'],
            },
            {
              step: 3, icon: Users, color: '#7C3AED', bg: '#F5F3FF', time: '5分',
              title: 'メンバー招待',
              items: ['メールで招待', '権限グループを設定', 'ロールを割り当て'],
            },
            {
              step: 4, icon: ListPlus, color: '#D97706', bg: '#FFFBEB', time: '15分',
              title: 'スプリント & チケット作成',
              items: ['スプリント期間を設定', 'チケットを登録', '担当者をアサイン'],
            },
            {
              step: 5, icon: Activity, color: '#EA580C', bg: '#FFF7ED', time: '〜',
              title: '実績追跡スタート',
              items: ['ステータス更新で自動記録', 'ダッシュボードで進捗確認', 'チームの生産性を可視化'],
            },
          ].map(s => (
            <div key={s.step} className="flex flex-col items-center">
              {/* アイコン */}
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-2 relative" style={{ background: s.bg, border: `2px solid ${s.color}30`, boxShadow: `0 6px 20px ${s.color}25` }}>
                <s.icon className="w-9 h-9" style={{ color: s.color }} />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ background: s.color, boxShadow: `0 2px 8px ${s.color}60` }}>
                  {s.step}
                </div>
              </div>
              {/* 時間 */}
              <div className="flex items-center gap-1 mb-2">
                <Clock className="w-3.5 h-3.5" style={{ color: s.color }} />
                <span className="text-xs font-black" style={{ color: s.color }}>{s.time}</span>
              </div>
              {/* タイトル */}
              <h3 className="text-sm font-black text-slate-900 text-center mb-3 leading-tight">{s.title}</h3>
              {/* チェックリスト */}
              <div className="w-full rounded-xl p-4 space-y-2.5" style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                {s.items.map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCheck className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: s.color }} />
                    <span className="text-xs text-slate-600 leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 底部メッセージ */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 rounded-2xl px-8 py-4" style={{ background: 'linear-gradient(135deg, #064e3b, #0d9488)', boxShadow: '0 8px 24px rgba(5,150,105,0.25)' }}>
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-base font-black text-white">初期費用・長期契約不要。いつでもキャンセル可能。</span>
          <ArrowRight className="w-5 h-5 text-emerald-300" />
        </div>
      </div>
    </div>
  </div>
);

// ── 他システム連携スライド（16↔17の間に挿入） ────────────────────────────────

type ChipColor = { bg: string; border: string; text: string; sub: string };
const CHIP_DT: ChipColor = { bg: '#ECFDF5', border: '#A7F3D0', text: '#047857', sub: '#059669' };
const CHIP_ENG: ChipColor = { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8', sub: '#2563EB' };
const CHIP_SYS: ChipColor = { bg: '#F8FAFC', border: '#E2E8F0', text: '#475569', sub: '#94A3B8' };
const CHIP_LINK: ChipColor = { bg: '#FFFBEB', border: '#FDE68A', text: '#B45309', sub: '#D97706' };

function FlowStep({ n, name, role, icon: Icon, c }: { n: number; name: string; role: string; icon: typeof Ticket; c: ChipColor }) {
  return (
    <div className="flex-1 min-w-0 rounded-xl flex flex-col items-center text-center" style={{ padding: '11px 4px 10px', background: c.bg, border: `1px solid ${c.border}`, minHeight: 94 }}>
      <div className="rounded-full flex items-center justify-center mb-1.5" style={{ width: 18, height: 18, background: c.text }}>
        <span style={{ fontSize: 9, fontWeight: 900, color: '#fff' }}>{n}</span>
      </div>
      <Icon className="w-4 h-4 mb-1.5" style={{ color: c.sub }} />
      <span style={{ fontSize: 10.5, fontWeight: 800, color: c.text, lineHeight: 1.15 }}>{name}</span>
      <span style={{ fontSize: 7.5, fontWeight: 700, color: c.sub, marginTop: 3, lineHeight: 1.2 }}>{role}</span>
    </div>
  );
}

const FLOW_DT = [
  { name: 'リソース募集', role: 'Dev Ticket', icon: Search, c: CHIP_DT },
  { name: 'エントリー', role: 'エンジニア', icon: Users, c: CHIP_ENG },
  { name: '承諾', role: 'Dev Ticket', icon: CheckCircle2, c: CHIP_DT },
  { name: '契約書発行', role: 'システム自動', icon: ClipboardList, c: CHIP_SYS },
  { name: '合意処理', role: 'エンジニア', icon: CheckCheck, c: CHIP_ENG },
  { name: '締結・対応', role: 'Dev Ticket / Eng', icon: Link2, c: CHIP_DT },
  { name: '納品', role: 'エンジニア', icon: Paperclip, c: CHIP_ENG },
  { name: 'レビュー', role: 'Dev Ticket', icon: GitPullRequest, c: CHIP_DT },
  { name: '承認', role: 'Dev Ticket', icon: Shield, c: CHIP_DT },
];
const FLOW_BILLING = [
  { name: '請求書発行', role: 'オムニスクエア', icon: ClipboardList, c: CHIP_LINK },
  { name: '請求書検収', role: 'Dev Ticket', icon: CheckCheck, c: CHIP_LINK },
  { name: '振込', role: 'ペイアシスト', icon: Wallet, c: CHIP_LINK },
];

const SlideIntegrationIntro = (
  <div key="s-integration-intro" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #052e26 0%, #064e3b 42%, #0d9488 100%)' }}>
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-44 -left-32 w-[480px] h-[480px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 65%)' }} />
    </div>
    <div className="relative h-full flex flex-col items-center justify-center text-center" style={{ padding: '56px 72px' }}>
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-7" style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', letterSpacing: '0.08em' }}>
        <Workflow className="w-3.5 h-3.5" />
        他システム連携 ・ PARTNERSHIP
      </div>
      <h2 className="font-black text-white mb-5" style={{ fontSize: 46, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
        SES稼働を、<span style={{ color: '#6EE7B7' }}>最大効率化</span>する。
      </h2>
      <p className="text-white/80 mb-10" style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 780 }}>
        <b className="text-white">情報戦略テクノロジー</b> × <b className="text-white">Whitebox</b> とのシステム連携で、<br />
        SES業務を「募集から支払まで」ワンストップで自動化します。
      </p>

      {/* 連携体制 */}
      <div className="flex items-center justify-center gap-5">
        <div className="rounded-2xl flex flex-col items-center justify-center" style={{ background: 'rgba(255,255,255,0.97)', padding: '20px 30px', minWidth: 200, boxShadow: '0 12px 34px rgba(0,0,0,0.22)' }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-2.5" style={{ background: '#ECFDF5' }}>
            <Ticket className="w-6 h-6" style={{ color: '#059669' }} />
          </div>
          <span className="font-black text-slate-900 text-base">Dev Ticket</span>
          <span className="text-[10px] font-bold text-slate-400 mt-0.5">Meece株式会社</span>
        </div>

        <span className="text-white/55 font-thin" style={{ fontSize: 34, lineHeight: 1 }}>×</span>

        <div className="rounded-2xl flex flex-col items-center justify-center" style={{ background: 'rgba(255,255,255,0.97)', padding: '20px 30px', minWidth: 260, boxShadow: '0 12px 34px rgba(0,0,0,0.22)' }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-2.5" style={{ background: '#EFF6FF' }}>
            <Boxes className="w-6 h-6" style={{ color: '#2563EB' }} />
          </div>
          <span className="font-black text-slate-900 text-base">Whitebox</span>
          <span className="text-[10px] font-bold text-slate-400 mt-0.5">情報戦略テクノロジーグループ</span>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: '#EFF6FF', color: '#2563EB' }}>オムニスクエア</span>
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: '#F5F3FF', color: '#7C3AED' }}>ペイアシスト</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlideSESFlow = (
  <div key="s-ses-flow" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex flex-col justify-between" style={{ padding: '40px 56px' }}>
      {/* ヘッダー */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#ECFDF5', border: '1px solid #BBF7D0', color: '#059669' }}>
          <Workflow className="w-3.5 h-3.5" />
          他システム連携
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">
          SES業務フロー<span style={{ color: '#059669' }}>全体図</span>
        </h2>
        <p className="text-slate-500 text-sm">Dev Ticketは<b className="text-slate-700">リソース募集〜承認</b>までをカバー。<b className="text-slate-700">請求・支払</b>はグループシステムと連携し、募集から振込まで一気通貫で自動化します。</p>
      </div>

      {/* フロー canvas */}
      <div className="rounded-2xl" style={{ background: 'linear-gradient(180deg, #FAFAF9 0%, #F4F6F5 100%)', border: '1px solid #ECEEEC', padding: '24px 26px' }}>
        <div className="flex items-stretch" style={{ gap: 10 }}>
          {/* Dev Ticket 領域 */}
          <div className="flex flex-col" style={{ flex: '9 1 0', minWidth: 0 }}>
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: 'linear-gradient(135deg, #0d9488, #059669)', boxShadow: '0 3px 10px rgba(5,150,105,0.25)' }}>
                <Ticket className="w-3 h-3 text-white" />
                <span className="text-[10px] font-bold text-white">Dev Ticket がカバー</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">受発注〜承認の9工程</span>
            </div>
            <div className="flex items-center" style={{ gap: 3 }}>
              {FLOW_DT.flatMap((s, i) => {
                const chip = <FlowStep key={`dt-${i}`} n={i + 1} name={s.name} role={s.role} icon={s.icon} c={s.c} />;
                return i < FLOW_DT.length - 1
                  ? [chip, <ChevronRight key={`dta-${i}`} className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#CBD5E1' }} />]
                  : [chip];
              })}
            </div>
          </div>

          {/* コネクタ */}
          <div className="flex flex-col items-center justify-center flex-shrink-0" style={{ width: 30, paddingTop: 30 }}>
            <ArrowRight className="w-5 h-5" style={{ color: '#D97706' }} />
          </div>

          {/* 連携領域 */}
          <div className="flex flex-col" style={{ flex: '3 1 0', minWidth: 0 }}>
            <div className="flex items-center mb-3">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                <Link2 className="w-3 h-3" style={{ color: '#D97706' }} />
                <span className="text-[10px] font-bold" style={{ color: '#B45309' }}>連携で自動化</span>
              </div>
            </div>
            <div className="rounded-xl flex items-center flex-1" style={{ gap: 3, padding: 7, background: '#FFFCF5', border: '1.5px dashed #FCD34D' }}>
              {FLOW_BILLING.flatMap((s, i) => {
                const chip = <FlowStep key={`bl-${i}`} n={FLOW_DT.length + i + 1} name={s.name} role={s.role} icon={s.icon} c={s.c} />;
                return i < FLOW_BILLING.length - 1
                  ? [chip, <ChevronRight key={`bla-${i}`} className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#FBBF24' }} />]
                  : [chip];
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2領域の意味づけ */}
      <div className="grid grid-cols-2 gap-5">
        <div className="rounded-2xl p-5" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#059669' }}>
              <Ticket className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Dev Ticket がカバーする範囲</h3>
          </div>
          <div className="space-y-2">
            {[
              '契約書はあらかじめ設定したフォーマットで自動生成',
              '納品はチケットへの添付 / 招待GitHubへのPRで完結',
              'レビュー〜承認までをチケット内で一気通貫',
            ].map(t => (
              <div key={t} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#059669' }} />
                <span className="text-[11px] font-bold text-slate-700 leading-snug">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-5" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#D97706' }}>
              <ArrowRightLeft className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-black text-slate-900">グループ連携で自動化する範囲</h3>
          </div>
          <div className="space-y-2">
            {[
              '稼働・案件データを自動で引き継ぎ、転記作業をゼロに',
              '請求書発行〜請求管理を「オムニスクエア」が自動化',
              '振込は「ペイアシスト」が代行し手数料・負担を削減',
            ].map(t => (
              <div key={t} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} />
                <span className="text-[11px] font-bold text-slate-700 leading-snug">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SlidePlatformArch = (
  <div key="s-platform-arch" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8fafc 0%, #f0fdfa 60%, #fff 100%)' }}>
    <div className="h-full flex flex-col justify-between" style={{ padding: '44px 56px' }}>
      {/* ヘッダー */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#2563EB' }}>
          <Workflow className="w-3.5 h-3.5" />
          連携アーキテクチャ
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">
          3つのシステムで<span style={{ color: '#059669' }}>SES業務を全自動化</span>
        </h2>
        <p className="text-slate-500 text-sm">Dev Ticketを起点に、<b className="text-slate-700">稼働・請求管理をオムニスクエア</b>、<b className="text-slate-700">支払・振込をペイアシスト</b>へ。データを引き継ぎ、転記なしで連携します。</p>
      </div>

      {/* 3システム連携図 */}
      <div className="flex items-stretch">
        {[
          { name: 'Dev Ticket', tag: '受発注・開発進行管理', desc: 'リソース募集〜契約〜開発〜承認までを一元管理。案件・稼働データの起点となります。', icon: Ticket, color: '#059669', bg: '#ECFDF5', maker: 'Meece株式会社' },
          { name: 'オムニスクエア', tag: '稼働管理・請求管理', desc: 'SESの事務作業をAIでまるごと自動化。稼働集計から請求書作成までを担います。', icon: Gauge, color: '#2563EB', bg: '#EFF6FF', maker: '株式会社Whitebox' },
          { name: 'ペイアシスト', tag: '支払代行・振込', desc: '振込手数料・業務負担を削減し、キャッシュフローを改善する支払代行サービス。', icon: Wallet, color: '#7C3AED', bg: '#F5F3FF', maker: '株式会社Whitebox' },
        ].flatMap((s, i, arr) => {
          const Icon = s.icon;
          const card = (
            <div key={`sys-${i}`} className="flex-1 rounded-2xl overflow-hidden" style={{ background: '#fff', border: `1px solid ${s.color}22`, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 4, background: s.color }} />
              <div className="p-5 flex flex-col" style={{ minHeight: 232 }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                  <Icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">{s.name}</h3>
                <div className="inline-flex self-start rounded-full px-2.5 py-1 text-[10px] font-bold mt-1.5 mb-2.5" style={{ background: s.bg, color: s.color }}>{s.tag}</div>
                <p className="text-xs text-slate-500 leading-relaxed flex-1">{s.desc}</p>
                <p className="text-[9px] text-slate-400 mt-3 pt-2.5" style={{ borderTop: '1px solid #F1F5F9' }}>提供：{s.maker}</p>
              </div>
            </div>
          );
          if (i >= arr.length - 1) return [card];
          const label = i === 0 ? '案件・稼働データ' : '請求データ';
          const connector = (
            <div key={`conn-${i}`} className="flex flex-col items-center justify-center flex-shrink-0" style={{ width: 104, paddingTop: 4 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', marginBottom: 5, whiteSpace: 'nowrap' }}>{label}</span>
              <ArrowRight className="w-7 h-7" style={{ color: '#CBD5E1' }} />
            </div>
          );
          return [card, connector];
        })}
      </div>

      {/* 統合プラットフォーム帯 */}
      <div className="rounded-2xl flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #064e3b, #0d9488 55%, #0ea5e9)', padding: '18px 28px', boxShadow: '0 8px 30px rgba(13,148,136,0.25)' }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <Boxes className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-black text-base">ホワイトボックス・プラットフォーム</p>
          <p className="text-white/75 text-xs mt-0.5">3つのシステムが連携し、募集から支払まで SES業務をワンストップで提供</p>
        </div>
        <ArrowRightLeft className="w-7 h-7 text-white/70 flex-shrink-0" />
      </div>
    </div>
  </div>
);

const SlidePartnerServices = (
  <div key="s-partner-services" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#fff' }}>
    <div className="h-full flex flex-col" style={{ padding: '44px 56px' }}>
      {/* ヘッダー */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', color: '#7C3AED' }}>
          <Puzzle className="w-3.5 h-3.5" />
          連携パートナー
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">
          グループの<span style={{ color: '#059669' }}>専門システム</span>と連携
        </h2>
        <p className="text-slate-500 text-sm">情報戦略テクノロジーグループ（Whitebox）が提供する2つのSaaSと連携し、Dev Ticket単体では担えない領域をカバーします。</p>
      </div>

      {/* 2サービス */}
      <div className="flex-1 flex items-stretch gap-6">
        {[
          {
            name: 'オムニスクエア', icon: Gauge, color: '#2563EB', bg: '#EFF6FF',
            lead: 'SESの事務作業をAIでまるごと自動化・効率化するクラウドサービス（SaaS）。',
            features: ['稼働管理', '請求管理', '事務作業の自動化'],
            points: [
              { icon: Activity, title: '稼働実績の自動集計', desc: '勤怠・工数を取り込み、稼働データを自動で集計' },
              { icon: ClipboardList, title: '請求書の自動発行', desc: '集計結果をもとに請求書を自動作成・送付' },
              { icon: Bot, title: 'AIで事務作業を効率化', desc: 'SES特有の煩雑なバックオフィス業務を自動化' },
            ],
            link: 'Dev Ticketの案件・稼働データを引き継ぎ、稼働集計から請求書作成までを自動化します。',
          },
          {
            name: 'ペイアシスト', icon: Wallet, color: '#7C3AED', bg: '#F5F3FF',
            lead: '振込手数料や業務負担を削減し、キャッシュフローを改善できる支払い代行サービス。',
            features: ['支払代行', '振込', 'キャッシュフロー改善'],
            points: [
              { icon: ArrowRightLeft, title: '報酬の振込を代行', desc: 'エンジニアへの支払業務をまとめて代行' },
              { icon: TrendingUp, title: '振込手数料を削減', desc: '振込をまとめることでコスト・事務負担を圧縮' },
              { icon: Timer, title: '入金サイクルを短縮', desc: '支払を平準化し、資金繰り・キャッシュフローを改善' },
            ],
            link: '請求確定後の振込を代行。手数料・事務負担を削減し、入金サイクルを改善します。',
          },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.name} className="flex-1 rounded-2xl overflow-hidden flex flex-col" style={{ background: '#fff', border: `1px solid ${s.color}22`, boxShadow: '0 6px 30px rgba(0,0,0,0.07)' }}>
              <div className="flex items-center gap-3" style={{ padding: '20px 24px', background: s.bg, borderBottom: `1px solid ${s.color}18` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fff', boxShadow: `0 2px 10px ${s.color}25` }}>
                  <Icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{s.name}</h3>
                  <p className="text-[10px] font-bold mt-0.5" style={{ color: s.color }}>株式会社Whitebox（情報戦略テクノロジーグループ）</p>
                </div>
              </div>
              <div className="px-6 py-5 flex flex-col flex-1">
                <p className="text-[13px] text-slate-600 leading-relaxed mb-2.5">{s.lead}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {s.features.map(f => (
                    <span key={f} className="rounded-full px-3 py-1.5 text-[11px] font-bold" style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}25` }}>{f}</span>
                  ))}
                </div>
                {/* 主な機能 */}
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="h-px flex-1" style={{ background: `${s.color}22` }} />
                  <span className="text-[10px] font-black tracking-wider" style={{ color: s.color }}>主な機能・提供価値</span>
                  <div className="h-px flex-1" style={{ background: `${s.color}22` }} />
                </div>
                <div className="space-y-2 mb-4">
                  {s.points.map(({ icon: PIcon, title, desc }) => (
                    <div key={title} className="flex items-start gap-2.5 rounded-xl p-2.5" style={{ background: s.bg, border: `1px solid ${s.color}1A` }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#fff', boxShadow: `0 1px 6px ${s.color}20` }}>
                        <PIcon className="w-3.5 h-3.5" style={{ color: s.color }} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800 leading-tight">{title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-3.5 mt-auto" style={{ background: `${s.color}0A`, border: `1px solid ${s.color}20` }}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Link2 className="w-3.5 h-3.5" style={{ color: s.color }} />
                    <span className="text-[11px] font-black" style={{ color: s.color }}>Dev Ticketとの連携</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.link}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const SlidePlatformVision = (
  <div key="s-platform-vision" className="w-full h-[720px] relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #064e3b 0%, #0d9488 45%, #0f766e 100%)' }}>
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.22) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 65%)' }} />
    </div>
    <div className="relative h-full flex flex-col justify-between" style={{ padding: '48px 56px' }}>
      {/* ヘッダー */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}>
          <Rocket className="w-3.5 h-3.5" />
          将来構想
        </div>
        <h2 className="text-3xl font-black text-white mb-1.5">
          ホワイトボックス・<span style={{ color: '#6EE7B7' }}>統合プラットフォーム</span>構想
        </h2>
        <p className="text-white/75 text-sm">Dev Ticketを開発・受発注のハブに据え、SES業務を「募集から支払まで」ワンストップで完結させる統合プラットフォームを目指します。</p>
      </div>

      {/* 価値カード4つ */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Workflow, title: 'ワンストップ', desc: '募集→契約→開発→検収→請求→振込まで一気通貫で完結', color: '#059669' },
          { icon: Zap, title: '二重入力ゼロ', desc: 'システム間のデータ連携で転記・再入力の事務作業を排除', color: '#2563EB' },
          { icon: TrendingUp, title: '入金を早期化', desc: '請求〜振込の自動化と支払代行でキャッシュフローを改善', color: '#7C3AED' },
          { icon: Puzzle, title: '拡張するプラットフォーム', desc: '専門SaaSを組み合わせ、SES業務の対応領域を継続的に拡張', color: '#D97706' },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.97)', boxShadow: '0 8px 30px rgba(0,0,0,0.18)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <h3 className="text-sm font-black text-slate-900 mb-1.5 leading-tight">{title}</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* ロードマップ：3つの連携ステップ ＝ 統合プラットフォーム */}
      <div className="rounded-2xl" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px 24px' }}>
        <div className="flex items-center gap-2 mb-3">
          <CalendarRange className="w-4 h-4 text-white/80" />
          <span className="text-xs font-bold text-white/90">プラットフォーム拡充のステップ</span>
          <span className="text-[10px] text-white/55">— 3つの連携を積み上げ、統合プラットフォームへ</span>
        </div>
        {/* STEP1 ＋ STEP2 ＋ STEP3 ＝ 統合プラットフォーム（均等配置の式） */}
        <div className="flex items-center">
          {[
            { kind: 'step', label: 'Dev Ticket', sub: '受発注・開発進行', status: '提供中', color: '#6EE7B7' },
            { kind: 'step', label: 'オムニスクエア連携', sub: '稼働管理・請求管理', status: '連携予定', color: '#93C5FD' },
            { kind: 'step', label: 'ペイアシスト連携', sub: '支払代行・振込', status: '連携予定', color: '#C4B5FD' },
            { kind: 'goal', label: '統合プラットフォーム', sub: 'SES業務をワンストップ提供', status: 'GOAL', color: '#FCD34D' },
          ].flatMap((p, i, arr) => {
            const node = p.kind === 'goal' ? (
              <div key="goal" className="flex-1 flex justify-center" style={{ minWidth: 0 }}>
                <div className="rounded-xl flex flex-col items-center justify-center text-center" style={{ width: 210, padding: '12px 16px', background: 'linear-gradient(135deg, rgba(252,211,77,0.24), rgba(251,191,36,0.12))', border: '1.5px solid rgba(252,211,77,0.6)' }}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Rocket className="w-3.5 h-3.5" style={{ color: '#FCD34D' }} />
                    <span className="rounded-full px-2 py-0.5 text-[8px] font-black tracking-widest" style={{ background: 'rgba(252,211,77,0.25)', color: '#FCD34D' }}>{p.status}</span>
                  </div>
                  <span className="text-sm font-black text-white leading-tight">{p.label}</span>
                  <span className="text-[9px] text-white/70 mt-0.5 leading-tight">{p.sub}</span>
                </div>
              </div>
            ) : (
              <div key={`ph-${i}`} className="flex-1 flex flex-col items-center justify-center text-center" style={{ minWidth: 0 }}>
                <span className="rounded-full px-2.5 py-0.5 text-[9px] font-black mb-1.5" style={{ background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}55` }}>{p.status}</span>
                <span className="text-xs font-black text-white leading-tight">{p.label}</span>
                <span className="text-[9px] text-white/60 mt-0.5 leading-tight">{p.sub}</span>
              </div>
            );
            if (i >= arr.length - 1) return [node];
            const op = i < arr.length - 2
              ? <Plus key={`op-${i}`} className="w-4 h-4 flex-shrink-0 text-white/40" />
              : <span key={`op-${i}`} className="font-black text-white/55 flex-shrink-0" style={{ fontSize: 26, lineHeight: 1 }}>=</span>;
            return [node, op];
          })}
        </div>
      </div>
    </div>
  </div>
);

// ── 管理者レポート機能（新機能） ─────────────────────────────────────────────
const SlideAdminReport = (
  <div key="s-admin-report" className="w-full h-[720px] relative overflow-hidden" style={{ background: '#F8FAFB' }}>
    <div className="h-full flex flex-col" style={{ padding: '40px 56px' }}>
      {/* ヘッダー */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3" style={{ background: '#ECFEFF', border: '1px solid #A5F3FC', color: '#0891B2' }}>
            <BarChart3 className="w-3.5 h-3.5" />
            管理者レポート
            <span className="ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-black" style={{ background: '#0891B2', color: '#fff' }}>NEW</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            チームの生産性を<span style={{ color: '#0891B2' }}>自動で見える化</span>
          </h2>
          <p className="text-slate-500 text-sm">期間・プロジェクト単位でKPIを自動集計。ワンクリックでPDF業務レポートを出力できます。</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-bold flex-shrink-0" style={{ background: '#fff', border: '1px solid #E2E8F0', color: '#64748B' }}>
          <Lock className="w-3 h-3" style={{ color: '#0891B2' }} />
          管理者・PMのみ閲覧可
        </div>
      </div>
      {/* 本体: 左モック / 右 指標リスト */}
      <div className="grid gap-5 flex-1 min-h-0" style={{ gridTemplateColumns: '1.35fr 1fr' }}>
        {/* 左: レポートモック */}
        <div className="rounded-2xl bg-white p-4 flex flex-col" style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          {/* 期間切替 */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <div className="flex gap-1.5">
              {['週次', '月次', '任意期間'].map((l, i) => (
                <span key={l} className="text-[10px] font-bold px-2.5 py-1 rounded-md" style={{ background: i === 1 ? '#0891B2' : '#F1F5F9', color: i === 1 ? '#fff' : '#94A3B8' }}>{l}</span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-md" style={{ background: '#ECFEFF', color: '#0891B2' }}>
              <FileText className="w-3 h-3" />PDF出力
            </div>
          </div>
          {/* KPIタイル */}
          <div className="grid grid-cols-4 gap-2 mb-3 flex-shrink-0">
            {[
              { icon: CheckCircle2, label: '完了チケット', value: '48', sub: '+12%', accent: '#059669', bg: '#ECFDF5' },
              { icon: Gauge,        label: '完了率',       value: '72%', sub: '順調', accent: '#0891B2', bg: '#ECFEFF' },
              { icon: Timer,        label: '平均サイクル', value: '3.4', sub: '日/件', accent: '#7C3AED', bg: '#F5F3FF' },
              { icon: Clock,        label: '総工数',       value: '64', sub: '人日', accent: '#D97706', bg: '#FFFBEB' },
            ].map(({ icon: Icon, label, value, sub, accent, bg }) => (
              <div key={label} className="rounded-xl p-2.5" style={{ background: bg, border: `1px solid ${accent}1f` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
                  <span className="text-[8px] font-bold" style={{ color: accent }}>{sub}</span>
                </div>
                <div className="text-lg font-black leading-none" style={{ color: '#1A1714' }}>{value}</div>
                <div className="text-[8px] mt-1" style={{ color: '#94A3B8' }}>{label}</div>
              </div>
            ))}
          </div>
          {/* ステータス内訳バー */}
          <div className="mb-3 flex-shrink-0">
            <p className="text-[9px] font-bold text-slate-400 mb-2">ステータス内訳</p>
            <div className="flex h-4 rounded-md overflow-hidden gap-px">
              {[
                { c: '#059669', w: 36 }, { c: '#D97706', w: 20 }, { c: '#2563EB', w: 14 },
                { c: '#7C3AED', w: 10 }, { c: '#EA580C', w: 8 }, { c: '#E2E8F0', w: 12 },
              ].map((s, i) => <div key={i} style={{ width: `${s.w}%`, background: s.c }} />)}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
              {[['#059669','完了'],['#D97706','進行中'],['#2563EB','レビュー'],['#7C3AED','STG'],['#EA580C','UAT'],['#E2E8F0','未着手']].map(([c,l]) => (
                <span key={l} className="text-[8px] flex items-center gap-1" style={{ color: '#64748B' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 2, background: c, display: 'inline-block' }} />{l}
                </span>
              ))}
            </div>
          </div>
          {/* メンバー別生産性テーブル */}
          <div className="flex-1 min-h-0 flex flex-col">
            <p className="text-[9px] font-bold text-slate-400 mb-1.5">メンバー別生産性</p>
            <div className="rounded-lg overflow-hidden flex-1" style={{ border: '1px solid #EEF2F6' }}>
              <div className="grid items-center px-2.5 py-1.5" style={{ gridTemplateColumns: '1fr 44px 44px 52px', background: '#F8FAFC', fontSize: 8, fontWeight: 700, color: '#94A3B8' }}>
                <span>メンバー</span><span className="text-right">完了</span><span className="text-right">人日</span><span className="text-right">サイクル</span>
              </div>
              {[
                { ini: '田', n: '田中太郎', ac: '#059669', done: 18, pd: 22, cy: '3.1' },
                { ini: '鈴', n: '鈴木花子', ac: '#0284C7', done: 14, pd: 19, cy: '3.6' },
                { ini: '佐', n: '佐藤健',   ac: '#7C3AED', done: 11, pd: 14, cy: '2.9' },
                { ini: '山', n: '山田優',   ac: '#D97706', done: 5,  pd: 9,  cy: '4.8' },
              ].map((m, i) => (
                <div key={m.n} className="grid items-center px-2.5 py-1.5" style={{ gridTemplateColumns: '1fr 44px 44px 52px', background: i % 2 ? '#FAFCFE' : '#fff', fontSize: 9 }}>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div style={{ width: 16, height: 16, borderRadius: 8, background: m.ac, color: '#fff', fontSize: 7, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{m.ini}</div>
                    <span className="truncate text-slate-700">{m.n}</span>
                  </div>
                  <span className="text-right font-bold text-slate-800">{m.done}</span>
                  <span className="text-right text-slate-500">{m.pd}</span>
                  <span className="text-right font-mono text-slate-500">{m.cy}日</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 右: 集計指標 + 機能 */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="rounded-2xl bg-white p-4" style={{ border: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#ECFEFF' }}>
                <PieChart className="w-4 h-4" style={{ color: '#0891B2' }} />
              </div>
              <h3 className="text-sm font-black text-slate-900">自動集計する指標</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['完了率・スループット', '平均サイクルタイム', '平均リードタイム', '見積精度（実績/見積）', '1件あたり工数', 'メンバー別生産性', 'スループット推移(8週)', '遅延・期限間近の検出'].map(p => (
                <div key={p} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#0891B2' }} />
                  <span className="text-[10px] text-slate-700 leading-tight">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4" style={{ border: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#F0FDF4' }}>
                <SlidersHorizontal className="w-4 h-4" style={{ color: '#059669' }} />
              </div>
              <h3 className="text-sm font-black text-slate-900">柔軟な集計とビュー</h3>
            </div>
            <div className="space-y-2">
              {[
                { icon: CalendarRange, t: '週次 / 月次 / 任意期間', d: '期間を選ぶだけで自動再集計' },
                { icon: Building2, t: '組織全体 / プロジェクト別', d: 'スコープを切り替えて分析' },
                { icon: BarChart2, t: 'ガント図でスプリント俯瞰', d: '完了・進行中・遅延を色分け表示' },
                { icon: Zap, t: '課題と対策を自動抽出', d: '遅延・偏り・見積ズレをアラート' },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex items-start gap-2.5 rounded-xl p-2" style={{ background: '#F9FAFB', border: '1px solid #EEF2F6' }}>
                  <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#ECFDF5' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: '#059669' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-800 leading-tight">{t}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5 leading-snug">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-3 flex items-center gap-2.5 mt-auto" style={{ background: 'linear-gradient(135deg, #083344, #0e7490)' }}>
            <FileText className="w-4 h-4 text-cyan-200 flex-shrink-0" />
            <p className="text-[10px] text-cyan-50 leading-snug">
              <span className="font-black">日本語フォント埋め込みのPDF</span>を1セクション1ページで出力。報告文のワンクリックコピーにも対応。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── デバイスフレーム（MacBook / iPad イラスト） ──────────────────────────────
function MacBookFrame({ width = 460 }: { width?: number }) {
  return (
    <div style={{ width }}>
      {/* 画面（液晶パネル + ベゼル） */}
      <div style={{ position: 'relative', background: 'linear-gradient(180deg,#2b2c30,#161618)', borderRadius: '14px 14px 5px 5px', padding: '11px 11px 12px', boxShadow: '0 28px 60px rgba(0,0,0,0.5)' }}>
        {/* インカメラ */}
        <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: '50%', background: '#0b0b0d', border: '1px solid #2c2c2e' }} />
        {/* スクリーン中身 */}
        <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '16 / 10', background: '#F4F5F6' }}>
          <MockDashboard fillHeight />
        </div>
      </div>
      {/* ヒンジ・底面（画面より少し広い台形風） */}
      <div style={{ position: 'relative', width: '113%', marginLeft: '-6.5%', height: 16, background: 'linear-gradient(180deg,#d9dce1,#a7abb2)', borderRadius: '0 0 11px 11px', boxShadow: '0 18px 26px rgba(0,0,0,0.4)' }}>
        {/* ノッチ（開閉用くぼみ） */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 96, height: 7, background: 'linear-gradient(180deg,#8d9198,#c0c4ca)', borderRadius: '0 0 8px 8px' }} />
      </div>
    </div>
  );
}

function IPadFrame({ width = 168 }: { width?: number }) {
  return (
    <div style={{ width, position: 'relative', background: 'linear-gradient(135deg,#36373b,#161618)', borderRadius: 18, padding: 8, boxShadow: '0 26px 50px rgba(0,0,0,0.5)' }}>
      {/* インカメラ（横向き時：左辺中央） */}
      <div style={{ position: 'absolute', top: '50%', left: 3, transform: 'translateY(-50%)', width: 4, height: 4, borderRadius: '50%', background: '#0b0b0d' }} />
      <div style={{ borderRadius: 9, overflow: 'hidden', aspectRatio: '16 / 10', background: '#F4F5F6' }}>
        <MockDashboard fillHeight />
      </div>
    </div>
  );
}

// ── Mac / iPad ネイティブアプリ（開発中） ──────────────────────────────────────
const SlideNativeApp = (
  <div key="s-native-app" className="w-full h-[720px] relative overflow-hidden flex" style={{ background: 'linear-gradient(160deg, #0f172a 0%, #134e4a 55%, #115e59 100%)' }}>
    {/* 背景デコ */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.16) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 65%)' }} />
    </div>
    {/* 左: 説明 + 実装済み機能 */}
    <div className="relative z-10 flex flex-col justify-center" style={{ width: '43%', padding: '44px 28px 44px 52px' }}>
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-4 w-fit" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)', color: '#FCD34D' }}>
        <Rocket className="w-3.5 h-3.5" />
        開発中 — まもなく登場
      </div>
      <h2 className="text-white font-black leading-tight mb-3" style={{ fontSize: 33 }}>
        Dev Ticketを<br /><span style={{ color: '#34D399' }}>Mac・iPad</span>アプリで
      </h2>
      <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.72)' }}>
        Capacitorで構築するネイティブアプリを開発中。ブラウザを開かずに起動でき、デスクトップ／タブレットに最適化したUIを提供します。
      </p>
      {/* 実装済み機能 */}
      <div className="rounded-2xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-[10px] font-black mb-3 flex items-center gap-1.5" style={{ color: '#6EE7B7' }}>
          <CheckCheck className="w-3.5 h-3.5" />実装済みの機能
        </p>
        <div className="space-y-2.5">
          {[
            { icon: Fingerprint, t: 'Face ID / Touch ID ログイン' },
            { icon: BellRing, t: 'プッシュ通知（APNs）' },
            { icon: AppWindow, t: 'マルチタブUI（⌘T / ⌘W / ⌘1〜9）' },
            { icon: Rocket, t: 'アプリアイコン・起動画面' },
          ].map(({ icon: Icon, t }) => (
            <div key={t} className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(52,211,153,0.15)' }}>
                <Icon className="w-3.5 h-3.5" style={{ color: '#34D399' }} />
              </div>
              <span className="text-[11px] font-medium leading-tight" style={{ color: 'rgba(255,255,255,0.9)' }}>{t}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Clock className="w-3 h-3 flex-shrink-0" style={{ color: '#FCD34D' }} />
          <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.55)' }}>開発中：実機検証・App Store配信準備を進行中</span>
        </div>
      </div>
      {/* 対応プラットフォーム + App ID */}
      <div className="flex items-center gap-2 mb-3">
        {[
          { icon: Monitor, label: 'macOS', ok: true },
          { icon: Tablet, label: 'iPadOS', ok: true },
          { icon: Smartphone, label: 'iPhone 対象外', ok: false },
        ].map(({ icon: Icon, label, ok }) => (
          <div key={label} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5" style={{ background: ok ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${ok ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.1)'}` }}>
            <Icon className="w-3.5 h-3.5" style={{ color: ok ? '#34D399' : 'rgba(255,255,255,0.4)' }} />
            <span className="text-[10px] font-bold" style={{ color: ok ? '#fff' : 'rgba(255,255,255,0.5)' }}>{label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.42)' }}>
        <AppWindow className="w-3.5 h-3.5" />
        App ID: io.meece.devticket
      </div>
    </div>
    {/* 右: MacBook + iPad 実機イラスト */}
    <div className="relative z-10 flex-1 flex items-center justify-center" style={{ padding: '44px 48px 44px 8px' }}>
      <div style={{ position: 'relative' }}>
        <MacBookFrame width={452} />
        {/* iPad を手前右下にオーバーラップ */}
        <div style={{ position: 'absolute', right: -44, bottom: 6 }}>
          <IPadFrame width={158} />
        </div>
      </div>
    </div>
  </div>
);

export const devticketPresentation: PresentationEntry = {
  meta: {
    id: 'devticket-2026',
    title: 'Dev Ticket サービス紹介',
    description: '開発チームのプロジェクト管理・リソース調達を一元化するWebシステム「Dev Ticket」の企業向け紹介資料',
    thumbnail: 'linear-gradient(135deg, #064e3b 0%, #0d9488 50%, #34D399 100%)',
    author: 'Meece株式会社',
    createdAt: '2026-06-22',
  },
  slides: [
    Slide1,           // 1. タイトル
    SlideMeece,       // 2. 運営会社紹介
    SlideProblem,     // 3. 課題提起
    SlideBeforeAfter, // 4. Before/After比較
    Slide2,           // 5. 概要
    Slide3,           // 6. ダッシュボード詳細
    SlideTicketDetail,// 7. チケット詳細画面
    Slide4,           // 8. スプリント管理
    SlideResourceConcept, // 9. リソース調達の考え方
    Slide5,           // 10. 4ルートから選択
    Slide6,           // 11. リソース調達フロー
    Slide7,           // 12. 機能一覧
    SlideMilestone,   // 13. 実績追跡・マイルストーン
    SlideAdminReport, // 14. 管理者レポート（新機能）
    SlideSecurity,    // 15. セキュリティ・権限
    SlideNativeApp,   // 16. Mac/iPadネイティブアプリ（開発中）
    SlideComparison,  // 17. 他社サービス比較
    SlideROI,         // 16. 導入効果・ROI
    SlideIntegrationIntro, // 17. 連携セクション扉（情報戦略テクノロジー×Whitebox）
    SlideSESFlow,          // 18. SES業務フロー全体図（連携）
    SlidePlatformArch,     // 19. 3システム連携アーキテクチャ
    SlidePartnerServices,  // 20. 連携サービス紹介
    SlidePlatformVision,   // 21. 統合プラットフォーム構想
    SlideOnboarding,  // 22. 導入ステップ
    Slide8,           // 23. 料金
    Slide9,           // 24. CTA
  ],
};
