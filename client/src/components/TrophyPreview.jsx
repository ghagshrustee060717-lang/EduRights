import React from 'react';
import { Award, Trophy, Star, ShieldCheck, Heart } from 'lucide-react';

export const TrophyPreview = ({ onOpenTrophies }) => {
  const badges = [
    { id: 'b1', name: 'First Steps', color: '#38bdf8', bg: '#e0f2fe', icon: '🌟' },
    { id: 'b2', name: 'Quiz Master', color: '#f59e0b', bg: '#fef3c7', icon: '🏆' },
    { id: 'b3', name: 'Story Explorer', color: '#8b5cf6', bg: '#ede9fe', icon: '📖' },
    { id: 'b4', name: 'Helper', color: '#10b981', bg: '#d1fae5', icon: '🤝' },
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
          Trophy Case
        </div>
        <button
          onClick={onOpenTrophies}
          style={{
            background: 'transparent',
            color: '#4f46e5',
            fontSize: '0.82rem',
            fontWeight: '800',
          }}
        >
          View All
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
        {badges.map((badge) => (
          <div
            key={badge.id}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'transform 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Medal circular badge */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: badge.bg,
              border: `2px solid ${badge.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: `0 4px 10px ${badge.color}33`,
            }}>
              {badge.icon}
            </div>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: '800',
              color: '#334155',
              lineHeight: 1.2,
            }}>
              {badge.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TrophyPreview;
