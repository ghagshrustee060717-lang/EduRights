import React from 'react';
import { ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MODULE_CHAPTERS = [
  {
    id: 'm1',
    chapterNum: 1,
    title: 'Right to Education',
    subtitle: 'Chapter 1 of 4',
    description: 'Every child has the right to free and compulsory quality education.',
  },
  {
    id: 'm2',
    chapterNum: 2,
    title: 'Right to Play',
    subtitle: 'Chapter 2 of 4',
    description: 'Rest, play, and recreational activities essential for every child.',
  },
  {
    id: 'm3',
    chapterNum: 3,
    title: 'Right to Safety',
    subtitle: 'Chapter 3 of 4',
    description: 'Protection from harm, child safety rules, and emergency help lines.',
  },
  {
    id: 'm4',
    chapterNum: 4,
    title: 'Right to Privacy',
    subtitle: 'Chapter 4 of 4',
    description: 'Online safety, personal boundaries, and protecting private data.',
  },
];

export const AdventureCard = ({ onContinueAdventure }) => {
  const { user } = useAuth();
  const completedModules = user?.completedModules || [];

  // Determine current unfinished chapter
  const nextChapter = MODULE_CHAPTERS.find(
    (ch) => !completedModules.some((c) => c.moduleId === ch.id)
  );

  const isAllComplete = !nextChapter && completedModules.length > 0;
  const activeChapter = nextChapter || MODULE_CHAPTERS[0];

  const handleContinue = () => {
    if (onContinueAdventure) {
      onContinueAdventure(activeChapter.id);
    }
  };

  return (
    <div style={{ flex: 1.4 }}>
      <div style={{
        fontSize: '0.88rem',
        fontWeight: '800',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        marginBottom: '0.75rem',
      }}>
        Continue Your Adventure
      </div>

      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '1.5rem 1.75rem',
        border: '1px solid #eef2f6',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        minHeight: '170px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '340px', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: isAllComplete ? '#dcfce7' : '#ede9fe',
            color: isAllComplete ? '#15803d' : '#6d28d9',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '800',
            marginBottom: '0.6rem',
          }}>
            {isAllComplete ? <CheckCircle2 size={12} /> : <BookOpen size={12} />}
            <span>{isAllComplete ? 'All 4 Chapters Completed!' : activeChapter.subtitle}</span>
          </div>

          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: '900',
            color: '#1e1b4b',
            marginBottom: '0.4rem',
          }}>
            {isAllComplete ? 'Explorer Champion!' : activeChapter.title}
          </h3>

          <p style={{
            fontSize: '0.88rem',
            color: '#64748b',
            lineHeight: 1.5,
            marginBottom: '1.25rem',
          }}>
            {isAllComplete
              ? 'You have completed all child rights chapters! Review or retake any quiz to boost your XP score.'
              : activeChapter.description}
          </p>

          <button
            type="button"
            onClick={handleContinue}
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '0.92rem',
              padding: '0.65rem 1.6rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(79, 70, 229, 0.45)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(79, 70, 229, 0.35)';
            }}
          >
            <span>{isAllComplete ? 'Review Quizzes' : 'Start Chapter Quiz'}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Child Reading Illustration */}
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '20px',
          overflow: 'hidden',
          flexShrink: 0,
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
        }}>
          <img
            src="/assets/images/child_reading.jpg"
            alt="Child reading adventure"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default AdventureCard;
