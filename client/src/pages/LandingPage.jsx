import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import { ShieldCheck, Award, BookOpen, Users, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = ({ onOpenAuth, onNavigateDashboard }) => {
  const { demoLogin, isAuthenticated } = useAuth();

  const handleStart = () => {
    if (isAuthenticated) {
      onNavigateDashboard();
    } else {
      onOpenAuth('register');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#14103e', color: '#ffffff' }}>
      {/* Public Navbar */}
      <Navbar onOpenAuth={onOpenAuth} onNavigateDashboard={onNavigateDashboard} />

      {/* Hero Section */}
      <HeroSection onStartAdventure={handleStart} onOpenAuth={onOpenAuth} />

      {/* Three Feature Highlights Banner */}
      <section style={{
        padding: '4rem 3rem',
        background: '#0e0b2d',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              color: '#fbbf24',
              fontSize: '0.85rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              Gamified Legal Empowerment
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', marginTop: '0.5rem' }}>
              How EduRights Empowers Every Child
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}>
            {/* Feature 1 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '2rem',
              transition: 'transform 0.2s',
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'rgba(79, 70, 229, 0.25)',
                color: '#818cf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <BookOpen size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                Story-Based Learning
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Engaging interactive chapters covering Education, Privacy, Safety, and Play made simple for kids aged 8–16.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '2rem',
              transition: 'transform 0.2s',
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'rgba(251, 191, 36, 0.2)',
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <Award size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                Quizzes, XP & Badges
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Earn badges like First Steps and Quiz Master, unlock new levels, and build healthy learning streaks.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '2rem',
              transition: 'transform 0.2s',
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                Safe & Child-Friendly
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                JWT-encrypted sessions (NFR-03), age-appropriate language, and personalized explorer avatars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2.5rem 3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.88rem',
      }}>
        <p>© 2026 EduRights - Child Rights Learning Platform. Built for SFT-WEB-2026-042 (Person A: Auth & User System).</p>
      </footer>
    </div>
  );
};
export default LandingPage;
