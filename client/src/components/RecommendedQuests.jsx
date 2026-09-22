import React from 'react';
import { ShieldCheck, Lock, Sparkles, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RecommendedQuests = ({ onSelectQuest }) => {
  const { awardPoints } = useAuth();

  const quests = [
    {
      id: 'q_play',
      moduleId: 'm2',
      title: 'Right to Play',
      xp: 50,
      iconType: 'soccer',
      bg: '#f0fdf4',
      badgeBg: '#dcfce7',
      badgeColor: '#15803d',
      iconEmoji: '⚽',
    },
    {
      id: 'q_safety',
      moduleId: 'm3',
      title: 'Right to Safety',
      xp: 60,
      iconType: 'shield',
      bg: '#f0f9ff',
      badgeBg: '#e0f2fe',
      badgeColor: '#0369a1',
      iconEmoji: '🛡️',
    },
    {
      id: 'q_privacy',
      moduleId: 'm4',
      title: 'Right to Privacy',
      xp: 40,
      iconType: 'lock',
      bg: '#faf5ff',
      badgeBg: '#f3e8ff',
      badgeColor: '#7e22ce',
      iconEmoji: '🔒',
    },
  ];

  const handleQuestClick = (quest) => {
    if (onSelectQuest) onSelectQuest(quest);
  };

  return (
    <div style={{ marginTop: '1.75rem' }}>
      <div style={{
        fontSize: '0.88rem',
        fontWeight: '800',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        marginBottom: '1rem',
      }}>
        Recommended for You
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.25rem',
      }}>
        {quests.map((quest) => (
          <div
            key={quest.id}
            onClick={() => handleQuestClick(quest)}
            style={{
              background: quest.bg,
              borderRadius: '22px',
              padding: '1.5rem 1.25rem',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.06)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.02)';
            }}
          >
            {/* Quest Icon Circle */}
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: quest.badgeBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              marginBottom: '0.85rem',
            }}>
              {quest.iconEmoji}
            </div>

            <h4 style={{
              fontSize: '0.98rem',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '0.5rem',
            }}>
              {quest.title}
            </h4>

            <span style={{
              fontSize: '0.78rem',
              fontWeight: '800',
              color: quest.badgeColor,
              background: quest.badgeBg,
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
            }}>
              +{quest.xp} XP
            </span>
          </div>
        ))}

        {/* 4th Card: More Quests Coming Soon */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '22px',
            padding: '1.5rem 1.25rem',
            border: '2px dashed #cbd5e1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#94a3b8',
          }}
        >
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '2px dashed #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.85rem',
            color: '#94a3b8',
          }}>
            <PlusCircle size={24} />
          </div>
          <h4 style={{
            fontSize: '0.92rem',
            fontWeight: '700',
            color: '#64748b',
          }}>
            More Quests<br />Coming Soon!
          </h4>
        </div>
      </div>
    </div>
  );
};
export default RecommendedQuests;
