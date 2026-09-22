import React from 'react';
import {
  Home,
  Map,
  Compass,
  BookOpen,
  Trophy,
  User,
  Settings,
  Award,
  Shield,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ activeTab, onSelectTab, onOpenProfile, onOpenSettings }) => {
  const { logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'progress', label: 'My Progress', icon: Award },
    { id: 'quests', label: 'Quests', icon: Compass },
    { id: 'knowledge', label: 'Knowledge Hub', icon: BookOpen },
    { id: 'trophy', label: 'Trophy Case', icon: Trophy },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'profile', label: 'Profile', icon: User, action: onOpenProfile },
    { id: 'settings', label: 'Settings', icon: Settings, action: onOpenSettings },
  ];

  return (
    <aside style={{
      width: '240px',
      background: '#ffffff',
      borderRight: '1px solid #eef2f6',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.5rem 1.25rem',
      minHeight: '100vh',
      position: 'sticky',
      top: 0,
    }}>
      {/* Brand Top */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem 0.5rem 2rem',
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
          }}>
            <Shield size={22} fill="#fbbf24" stroke="#ffffff" strokeWidth={1.5} />
          </div>
          <span style={{
            fontSize: '1.35rem',
            fontWeight: '800',
            color: '#1e1b4b',
            letterSpacing: '-0.02em',
          }}>
            Edu<span style={{ color: '#4f46e5' }}>Rights</span>
          </span>
        </div>

        {/* Navigation List */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    onSelectTab(item.id);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.8rem 1rem',
                  borderRadius: '16px',
                  background: isActive ? '#fef3c7' : 'transparent',
                  color: isActive ? '#92400e' : '#64748b',
                  fontWeight: isActive ? '800' : '600',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  border: isActive ? '1px solid #fde68a' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.color = '#1e293b';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }
                }}
              >
                <Icon
                  size={20}
                  color={isActive ? '#d97706' : '#64748b'}
                  strokeWidth={isActive ? 2.4 : 2}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Bottom Button */}
      <div>
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            padding: '0.8rem 1rem',
            borderRadius: '16px',
            background: 'transparent',
            color: '#ef4444',
            fontWeight: '700',
            fontSize: '0.95rem',
            width: '100%',
            textAlign: 'left',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#fee2e2')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
