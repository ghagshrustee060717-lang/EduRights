import React from 'react';
import { Shield, Sparkles, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onOpenAuth, onNavigateDashboard }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem 3rem',
      background: 'rgba(20, 16, 62, 0.95)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
        }}>
          <Shield size={24} fill="#fbbf24" stroke="#ffffff" strokeWidth={1.5} />
        </div>
        <span style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: '#ffffff',
          letterSpacing: '-0.02em',
        }}>
          Edu<span style={{ color: '#fbbf24' }}>Rights</span>
        </span>
      </div>


      {/* Auth Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isAuthenticated ? (
          <>
            <button
              onClick={onNavigateDashboard}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                color: '#ffffff',
                fontWeight: '700',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
              }}
            >
              <LayoutDashboard size={18} />
              Open Dashboard ({user?.name || 'Aarav'})
            </button>
            <button
              onClick={logout}
              title="Sign Out"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f87171',
                padding: '0.65rem',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onOpenAuth('login')}
              style={{
                background: 'transparent',
                color: '#ffffff',
                fontWeight: '600',
                padding: '0.65rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
              }}
            >
              Log In
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              style={{
                background: '#fbbf24',
                color: '#1e1b4b',
                fontWeight: '800',
                padding: '0.65rem 1.5rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                boxShadow: '0 4px 16px rgba(251, 191, 36, 0.35)',
              }}
              onMouseOver={(e) => (e.target.style.background = '#f59e0b')}
              onMouseOut={(e) => (e.target.style.background = '#fbbf24')}
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
