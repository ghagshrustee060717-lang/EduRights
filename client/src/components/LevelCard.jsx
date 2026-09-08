import React from 'react';
import { Award, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LevelCard = () => {
  const { user } = useAuth();
  const currentXP = user?.totalPoints || 750;
  const nextXP = user?.nextLevelPoints || 1200;
  const progressPercent = Math.min(Math.round((currentXP / nextXP) * 100), 100);

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '22px',
      padding: '1.5rem 1.75rem',
      border: '1px solid #eef2f6',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      flex: 1.4,
    }}>
      {/* Level Medal Badge */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fbbf24',
        boxShadow: '0 8px 18px rgba(124, 58, 237, 0.35)',
        flexShrink: 0,
        position: 'relative',
      }}>
        <Award size={36} fill="#fbbf24" stroke="#ffffff" strokeWidth={1.5} />
        <span style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          background: '#fbbf24',
          color: '#1e1b4b',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          fontSize: '0.72rem',
          fontWeight: '900',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #ffffff',
        }}>
          {user?.currentLevel || 3}
        </span>
      </div>

      {/* Level Info & Progress Bar */}
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.65rem',
        }}>
          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: '800',
            color: '#1e1b4b',
          }}>
            {user?.levelTitle || 'Level 3 Explorer'}
          </h3>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            color: '#64748b',
          }}>
            <strong style={{ color: '#4f46e5' }}>{currentXP}</strong> / {nextXP} XP
          </span>
        </div>

        {/* Thick Rounded Progress Bar matching mockup */}
        <div style={{
          height: '12px',
          background: '#e2e8f0',
          borderRadius: '9999px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
            borderRadius: '9999px',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)',
          }} />
        </div>
      </div>
    </div>
  );
};
export default LevelCard;
