import React from 'react';
import { Trophy, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TrophyPreview = ({ onOpenTrophies }) => {
  const { user } = useAuth();
  const earnedBadges = user?.badgesEarned || [];

  const defaultBadges = [
    { id: 'first-step', name: 'First Step', color: '#f59e0b', bg: '#fef3c7', icon: '🏆' },
    { id: 'quiz-master', name: 'Quiz Master', color: '#8b5cf6', bg: '#ede9fe', icon: '🌟' },
    { id: 'point-collector', name: 'Collector', color: '#38bdf8', bg: '#e0f2fe', icon: '⭐' },
    { id: 'rising-star', name: 'Rising Star', color: '#10b981', bg: '#d1fae5', icon: '🚀' },
  ];

  return (
    <div style={{ flex: 1 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem',
      }}>
        <div style={{
          fontSize: '0.88rem',
          fontWeight: '800',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          Trophy Case ({earnedBadges.length} unlocked)
        </div>
        <button
          onClick={onOpenTrophies}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#4f46e5',
            fontSize: '0.82rem',
            fontWeight: '800',
            cursor: 'pointer',
          }}
        >
          View All →
        </button>
      </div>

      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '1.25rem 1.5rem',
        border: '1px solid #eef2f6',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.75rem',
        minHeight: '170px',
        alignItems: 'center',
      }}>
        {defaultBadges.map((badge) => {
          const isUnlocked = earnedBadges.some(
            (b) => b.badgeId === badge.id || b.name === badge.name
          );

          return (
            <div
              key={badge.id}
              onClick={onOpenTrophies}
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'transform 0.15s ease',
                opacity: isUnlocked ? 1 : 0.65,
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: isUnlocked ? badge.bg : '#f1f5f9',
                border: isUnlocked ? `2px solid ${badge.color}` : '2px dashed #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                boxShadow: isUnlocked ? `0 4px 10px ${badge.color}33` : 'none',
              }}>
                {isUnlocked ? badge.icon : <Lock size={16} color="#94a3b8" />}
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '800',
                color: isUnlocked ? '#1e293b' : '#94a3b8',
                lineHeight: 1.2,
              }}>
                {badge.name}
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: '700',
                color: isUnlocked ? '#15803d' : '#94a3b8',
              }}>
                {isUnlocked ? '✓ Unlocked' : 'Locked'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrophyPreview;
