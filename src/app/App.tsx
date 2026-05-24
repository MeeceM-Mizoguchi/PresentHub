import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  useDeployDetection();

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
