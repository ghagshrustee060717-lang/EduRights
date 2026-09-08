import React from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdventureCard = ({ onContinueAdventure }) => {
  const { awardPoints } = useAuth();

  const handleContinue = () => {
    // Award a mini celebration bonus when clicking continue
    awardPoints(25);
    if (onContinueAdventure) onContinueAdventure();
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
            background: '#ede9fe',
            color: '#6d28d9',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '800',
            marginBottom: '0.6rem',
          }}>
            <BookOpen size={12} />
            <span>Chapter 2 of 5</span>
          </div>

          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: '900',
            color: '#1e1b4b',
            marginBottom: '0.4rem',
          }}>
            Right to Education
          </h3>

          <p style={{
            fontSize: '0.88rem',
            color: '#64748b',
            lineHeight: 1.5,
            marginBottom: '1.25rem',
          }}>
            Every child has the right to free and compulsory quality education.
          </p>

          <button
            onClick={handleContinue}
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '0.92rem',
              padding: '0.65rem 1.6rem',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(79, 70, 229, 0.45)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(79, 70, 229, 0.35)';
            }}
          >
            <span>Continue</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Child Reading Illustration matching mockup */}
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
