import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AuthModal from './components/AuthModal';
import QuizPage from './quiz/QuizPage';

function AppContent() {
  const isQuizRoute = window.location.pathname === '/quiz';
  if (isQuizRoute) {
    return <QuizPage moduleId="m1" onExit={() => { window.location.href = '/'; }} />;
  }

  const { isAuthenticated, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [viewOverride, setViewOverride] = useState(null); // 'landing' | 'dashboard' | null

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#14103e',
        color: '#ffffff',
      }}>
        <div style={{
          width: '54px',
          height: '54px',
          border: '4px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: '#fbbf24',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
        <p style={{ marginTop: '1.25rem', fontWeight: '700', color: '#cbd5e1' }}>
          Loading EduRights...
        </p>
      </div>
    );
  }

  const showDashboard = isAuthenticated && viewOverride !== 'landing';

  return (
    <>
      {showDashboard ? (
        <DashboardPage onNavigateLanding={() => setViewOverride('landing')} />
      ) : (
        <LandingPage
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setAuthModalOpen(true);
          }}
          onNavigateDashboard={() => setViewOverride('dashboard')}
        />
      )}

      {/* Login & Register Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
          setViewOverride('dashboard');
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
