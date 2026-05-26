import { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Loader2 } from 'lucide-react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ConfirmProvider } from './components/ConfirmDialog';
import { LoginPage } from './components/LoginPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { RequestAccessPage } from './components/RequestAccessPage';
import { SetPasswordPage } from './components/SetPasswordPage';
import { DashboardPage } from './components/DashboardPage';
import { ShareViewer } from './components/ShareViewer';
import { NotFoundPage } from './components/NotFoundPage';
import { useDeployDetection } from './hooks/useDeployDetection';

const LoadingScreen = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
    <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
  </div>
);

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 招待・パスワードリセットリンクで開かれた場合、セッション確立を待ってから/set-passwordへ遷移
  const [invitePending] = useState(() =>
    /type=(invite|recovery)/.test(window.location.hash)
  );

  useEffect(() => {
    if (!invitePending) return;

    let done = false;
    const go = () => {
      if (!done) { done = true; navigate('/set-password', { replace: true }); }
    };

    // セッションが既に確立済みの場合に対応
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) go();
    });

    // SIGNED_IN / PASSWORD_RECOVERY を待ってから遷移（セッション確立後に実行）
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') && session) go();
    });

    // 15秒でタイムアウト → /set-password の「リンクが無効」画面を表示
    const timer = setTimeout(go, 15000);

    return () => { subscription.unsubscribe(); clearTimeout(timer); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || invitePending) return <LoadingScreen />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useDeployDetection();

  // 通常のパスワードリセットフロー（forgot-passwordページからのメールリンク）
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') navigate('/set-password', { replace: true });
    });
    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Routes>
      {/* 公開ルート（認証不要） */}
      <Route path="/share/:token" element={<ShareViewer />} />
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/request-access" element={<RequestAccessPage />} />
      <Route path="/set-password" element={<SetPasswordPage />} />
      {/* 認証必須ルート */}
      <Route path="/*" element={
        <ProtectedRoute>
          <DndProvider backend={HTML5Backend}>
            <AppProvider>
              <DashboardPage />
            </AppProvider>
          </DndProvider>
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ConfirmProvider>
            <AppRoutes />
          </ConfirmProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{ unstyled: true, classNames: {} }} />
    </>
  );
}
