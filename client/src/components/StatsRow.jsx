import React from 'react';
import { Zap, Trophy, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const StatsRow = () => {
  const { user } = useAuth();

  const completed = user?.completedModules || [];
  const moduleScoreTotal = completed.reduce((sum, m) => sum + (Number(m.score) || 0), 0);
  const xp = (user?.role === 'child' && completed.length > 0 && user?.email !== 'aarav@edurights.org')
    ? moduleScoreTotal
    : (user?.totalPoints ?? 0);
  const badgesCount = user?.badgesEarned?.length ?? 0;
  const streak = user?.streakDays ?? 1;

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '22px',
      padding: '1.25rem 1.75rem',
      border: '1px solid #eef2f6',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
      flex: 1,
    }}>
      <div style={{
        fontSize: '0.82rem',
        fontWeight: '800',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.75rem',
      }}>
        Your Stats
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '1rem',
      }}>
        {/* XP Stat */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: '#fef3c7',
            color: '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.35rem',
          }}>
            <Zap size={20} fill="#d97706" />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1e1b4b' }}>
            {xp}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>
            XP
          </div>
        </div>

        {/* Badges Stat */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: '#ffedd5',
            color: '#ea580c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.35rem',
          }}>
            <Trophy size={20} fill="#ea580c" />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1e1b4b' }}>
            {badgesCount}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>
            Badges
          </div>
        </div>

        {/* Streak Stat */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: '#ffe4e6',
            color: '#e11d48',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.35rem',
          }}>
            <Flame size={20} fill="#e11d48" />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1e1b4b' }}>
            {streak} days
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>
            Streak
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatsRow;
