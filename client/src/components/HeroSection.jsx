import React from 'react';
import { Play, Sparkles, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HeroSection = ({ onStartAdventure, onOpenAuth }) => {
  const { demoLogin, isAuthenticated } = useAuth();

  return (
    <section style={{
      minHeight: 'calc(100vh - 80px)',
      background: 'radial-gradient(ellipse at 70% 40%, #2b1f7d 0%, #14103e 60%, #0c0827 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      padding: '3rem 4rem',
    }}>
      {/* Background Starfield Decor */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(251, 191, 36, 0.25) 1px, transparent 1px),
          radial-gradient(circle at 45% 75%, rgba(255, 255, 255, 0.3) 1.5px, transparent 1.5px),
          radial-gradient(circle at 85% 15%, rgba(251, 191, 36, 0.35) 2px, transparent 2px),
          radial-gradient(circle at 75% 85%, rgba(255, 255, 255, 0.25) 1.5px, transparent 1.5px),
          radial-gradient(circle at 30% 60%, rgba(139, 92, 246, 0.3) 2px, transparent 2px)
        `,
        backgroundSize: '150px 150px',
        opacity: 0.85,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: '3rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Left Column: Text & CTAs */}
        <div>
          {/* Tag Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            padding: '0.45rem 1.1rem',
            borderRadius: '9999px',
            color: '#fbbf24',
            fontWeight: '700',
            fontSize: '0.85rem',
            letterSpacing: '0.04em',
            marginBottom: '1.75rem',
            backdropFilter: 'blur(8px)',
          }}>
            <Sparkles size={16} />
            <span>Learn • Play • Empower</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: '3.6rem',
            fontWeight: '900',
            lineHeight: 1.1,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}>
            Learn Your <span style={{ color: '#fbbf24' }}>Rights</span>,<br />
            Unlock Your <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Powers!</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.18rem',
            lineHeight: 1.6,
            color: '#cbd5e1',
            maxWidth: '520px',
            marginBottom: '2.5rem',
          }}>
            A fun and interactive platform that helps kids learn about their legal rights through games, stories and challenges.
          </p>

          {/* Primary Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={onStartAdventure}
              style={{
                background: '#fbbf24',
                color: '#14103e',
                fontWeight: '800',
                fontSize: '1.05rem',
                padding: '0.9rem 2.2rem',
                borderRadius: '9999px',
                boxShadow: '0 8px 24px rgba(251, 191, 36, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                border: '2px solid #fde047',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(251, 191, 36, 0.45)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 191, 36, 0.35)';
              }}
            >
              Start Your Adventure
              <ArrowRight size={18} />
            </button>

            <button
              onClick={demoLogin}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '1.05rem',
                padding: '0.9rem 1.8rem',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backdropFilter: 'blur(8px)',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
            >
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Play size={12} fill="#ffffff" />
              </div>
              Explore as Aarav (Demo)
            </button>
          </div>

          {/* Social Proof */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {['#38bdf8', '#f43f5e', '#fbbf24'].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '2.5px solid #14103e',
                    marginLeft: i > 0 ? '-10px' : '0',
                    background: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                  }}
                >
                  {i === 0 ? '👦' : i === 1 ? '👧' : '🧒'}
                </div>
              ))}
            </div>
            <span style={{
              color: '#94a3b8',
              fontSize: '0.92rem',
              fontWeight: '600',
            }}>
              Join <strong style={{ color: '#ffffff' }}>10,000+</strong> young explorers learning their rights!
            </span>
          </div>
        </div>

        {/* Right Column: Hero Mascot with Floating Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
          {/* Glowing Aura Ring */}
          <div style={{
            position: 'absolute',
            width: '440px',
            height: '440px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(79, 70, 229, 0.15) 50%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }} />

          {/* Mascot Image Card */}
          <div style={{
            position: 'relative',
            width: '380px',
            height: '380px',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
            border: '3px solid rgba(255, 255, 255, 0.15)',
            background: '#1a144b',
          }}>
            <img
              src="/assets/images/hero_superhero.jpg"
              alt="EduRights Superhero Mascot"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Floating Badge 1: Learn */}
          <div className="float-animation" style={{
            position: 'absolute',
            top: '8%',
            left: '-4%',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '0.65rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: '#e0e7ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4f46e5',
            }}>
              <ShieldCheck size={20} />
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e1b4b' }}>
              Learn
            </span>
          </div>

          {/* Floating Badge 2: Earn */}
          <div className="float-animation" style={{
            position: 'absolute',
            top: '12%',
            right: '-6%',
            animationDelay: '1.5s',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '0.65rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d97706',
            }}>
              <Award size={20} />
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e1b4b' }}>
              Earn
            </span>
          </div>

          {/* Floating Badge 3: Empower */}
          <div className="float-animation" style={{
            position: 'absolute',
            bottom: '12%',
            right: '-4%',
            animationDelay: '2.5s',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '0.65rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: '#ffe4e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e11d48',
            }}>
              <Heart size={20} fill="#e11d48" />
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e1b4b' }}>
              Empower
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
