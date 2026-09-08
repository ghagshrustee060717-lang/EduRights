import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import LevelCard from '../components/LevelCard';
import StatsRow from '../components/StatsRow';
import AdventureCard from '../components/AdventureCard';
import TrophyPreview from '../components/TrophyPreview';
import RecommendedQuests from '../components/RecommendedQuests';
import ProfileModal from '../components/ProfileModal';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Map, Compass, BookOpen, Trophy, Shield, CheckCircle } from 'lucide-react';

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, awardPoints, celebrate } = useAuth();

  const handleQuestSelected = (quest) => {
    celebrate();
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
    }}>
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        maxHeight: '100vh',
      }}>
        {/* Top Header */}
        <TopHeader onOpenProfile={() => setIsProfileOpen(true)} />

        {/* Dynamic Body Content */}
        <main style={{ padding: '0.5rem 2.5rem 2.5rem' }}>
          {activeTab === 'home' && (
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
              {/* Row 1: Level Card & Stats Card */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'stretch',
                marginBottom: '1.75rem',
              }}>
                <LevelCard />
                <StatsRow />
              </div>

              {/* Row 2: Continue Adventure & Trophy Case */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'stretch',
                marginBottom: '0.5rem',
              }}>
                <AdventureCard onContinueAdventure={() => celebrate()} />
                <TrophyPreview onOpenTrophies={() => setActiveTab('trophy')} />
              </div>

              {/* Row 3: Recommended Quests */}
              <RecommendedQuests onSelectQuest={handleQuestSelected} />
            </div>
          )}

          {/* Map Tab Preview */}
          {activeTab === 'map' && (
            <div style={{
              maxWidth: '900px',
              margin: '2rem auto',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: '#e0e7fe',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <Map size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1e1b4b', marginBottom: '0.5rem' }}>
                Adventure World Map
              </h2>
              <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
                Your progress journey across the Islands of Rights. The shell and user auth are connected. Person D and Person B will link module pins here!
              </p>
              <button
                onClick={() => setActiveTab('home')}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontWeight: '700',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                }}
              >
                ← Back to Dashboard Home
              </button>
            </div>
          )}

          {/* Quests Tab Preview */}
          {activeTab === 'quests' && (
            <div style={{
              maxWidth: '900px',
              margin: '2rem auto',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <Compass size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1e1b4b', marginBottom: '0.5rem' }}>
                Active Quests & Challenges
              </h2>
              <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
                Connected to User ID: <strong>{user?.id}</strong>. Ready for Person C's quiz engine questions!
              </p>
              <button
                onClick={() => setActiveTab('home')}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontWeight: '700',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                }}
              >
                ← Back to Dashboard Home
              </button>
            </div>
          )}

          {/* Knowledge Hub Tab Preview */}
          {activeTab === 'knowledge' && (
            <div style={{
              maxWidth: '900px',
              margin: '2rem auto',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <BookOpen size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1e1b4b', marginBottom: '0.5rem' }}>
                Knowledge Hub Library
              </h2>
              <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
                Articles, Child Rights FAQs and laws. Owned by Person B (Learning Content).
              </p>
              <button
                onClick={() => setActiveTab('home')}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontWeight: '700',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                }}
              >
                ← Back to Dashboard Home
              </button>
            </div>
          )}

          {/* Trophy Case Tab */}
          {activeTab === 'trophy' && (
            <div style={{
              maxWidth: '900px',
              margin: '2rem auto',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Trophy size={28} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e1b4b' }}>
                    {user?.name}'s Trophy Cabinet
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
                    Badges unlocked through verified learning milestones (FR-05 & Person A user schema).
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginBottom: '2rem',
              }}>
                {[
                  { name: 'First Steps', desc: 'Started journey', icon: '🌟', date: 'Earned' },
                  { name: 'Quiz Master', desc: '100% score on safety', icon: '🏆', date: 'Earned' },
                  { name: 'Story Explorer', desc: 'Completed chapter 1', icon: '📖', date: 'Earned' },
                  { name: 'Helper Star', desc: 'Shared rights with friends', icon: '🤝', date: 'Earned' },
                  { name: 'Privacy Guardian', desc: 'Mastered online safety', icon: '🛡️', date: 'Earned' },
                  { name: 'Equal Voice', desc: 'Child rights advocate', icon: '📢', date: 'Earned' },
                  { name: 'Scholar', desc: 'Read 5 articles', icon: '🎓', date: 'Earned' },
                  { name: 'Streak Hero', desc: '7 days in a row', icon: '🔥', date: 'Earned' },
                ].map((b, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '18px',
                    padding: '1.25rem',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{b.icon}</div>
                    <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1e293b' }}>{b.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{b.desc}</div>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      background: '#dcfce7',
                      color: '#15803d',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                    }}>
                      ✓ {b.date}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('home')}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontWeight: '700',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                }}
              >
                ← Back to Dashboard Home
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem',
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '460px',
            padding: '2rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e1b4b', marginBottom: '0.5rem' }}>
              Account & Privacy Settings
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              Person A (Auth & User System) - NFR-03 Security settings.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong>User ID:</strong> {user?.id}
              </div>
              <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong>Role:</strong> {user?.role || 'child'}
              </div>
              <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong>Security:</strong> JWT Auth token active
              </div>
            </div>
            <button
              onClick={() => setIsSettingsOpen(false)}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '0.75rem',
                background: '#4f46e5',
                color: '#ffffff',
                fontWeight: '700',
                borderRadius: '12px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
