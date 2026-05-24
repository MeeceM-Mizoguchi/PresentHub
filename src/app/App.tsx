import { ReactNode, useEffect } from 'react';
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
import { AccessRestrictedPage } from './components/AccessRestrictedPage';
import { useDeployDetection } from './hooks/useDeployDetection';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    // ルートURLへの直接アクセスはアクセス制限ページを表示（ログイン画面を見せない）
    if (location.pathname === '/') return <AccessRestrictedPage />;
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useDeployDetection();

  useEffect(() => {
    // URLハッシュに type=invite / type=recovery が含まれる場合は /set-password へ誘導
    // （Supabaseのリダイレクト先がベースURLになっても正しく動作させるため）
    const params = new URLSearchParams(window.location.hash.slice(1));
    const type = params.get('type');
    if (type === 'invite' || type === 'recovery') {
      navigate('/set-password', { replace: true });
      return;
    }
    // 通常のパスワードリセットフロー（resetPasswordForEmail）用
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/set-password', { replace: true });
      }
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
