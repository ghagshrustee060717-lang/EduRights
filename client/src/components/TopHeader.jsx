import React from 'react';
import { Bell, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TopHeader = ({ onOpenProfile }) => {
  const { user } = useAuth();
  const userName = user?.name || 'Aarav';

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.75rem 2.5rem 1rem',
      background: 'transparent',
    }}>
      {/* Personalized Greeting */}
      <div>
        <h1 style={{
          fontSize: '1.85rem',
          fontWeight: '900',
          color: '#1e1b4b',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          letterSpacing: '-0.02em',
        }}>
          Welcome back, {userName}! <span style={{ fontSize: '1.75rem' }}>👋</span>
        </h1>
        <p style={{
          fontSize: '0.95rem',
          color: '#64748b',
          fontWeight: '500',
          marginTop: '4px',
        }}>
          Keep learning. Keep growing. You're doing great!
        </p>
      </div>

      {/* Action Badges & Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Notification Bell */}
        <button
          title="Notifications"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            position: 'relative',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#f8fafc')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#ffffff')}
        >
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '10px',
            right: '11px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#ef4444',
            border: '2px solid #ffffff',
          }} />
        </button>

        {/* User Avatar Circle */}
        <div
          onClick={onOpenProfile}
          title="Click to view & edit profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '4px 12px 4px 4px',
            background: '#ffffff',
            borderRadius: '9999px',
            border: '1.5px solid #e2e8f0',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'transform 0.15s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #fbbf24',
            background: '#e0e7ff',
          }}>
            <img
              src="/assets/images/avatar_aarav.jpg"
              alt={userName}
              onError={(e) => {
                // fallback to colored initial if image not found
                e.target.style.display = 'none';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1e293b' }}>
              {userName}
            </span>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#6366f1' }}>
              {user?.levelTitle || 'Level 3 Explorer'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default TopHeader;
