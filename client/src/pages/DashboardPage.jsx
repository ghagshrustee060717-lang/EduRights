import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import LevelCard from '../components/LevelCard';
import StatsRow from '../components/StatsRow';
import AdventureCard from '../components/AdventureCard';
import TrophyPreview from '../components/TrophyPreview';
import RecommendedQuests from '../components/RecommendedQuests';
import ProgressSection from '../components/ProgressSection';
import ProfileModal from '../components/ProfileModal';
import QuizPage from '../quiz/QuizPage';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Map, Compass, BookOpen, Trophy, Award, Lock, ArrowRight } from 'lucide-react';

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeQuizModuleId, setActiveQuizModuleId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, celebrate } = useAuth();

  // If taking a quiz, show the interactive QuizPage with back navigation
  if (activeQuizModuleId) {
    return (
      <QuizPage
        moduleId={activeQuizModuleId}
        onExit={() => {
          setActiveQuizModuleId(null);
          setActiveTab('progress');
        }}
      />
    );
  }

  const handleQuestSelected = (quest) => {
    celebrate();
    if (quest?.moduleId) {
      setActiveQuizModuleId(quest.moduleId);
    }
  };

  const systemBadges = [
    { badgeId: 'first-step', name: 'First Step', icon: '🏆', desc: 'Completed your first quiz' },
    { badgeId: 'quiz-master', name: 'Quiz Master', icon: '🌟', desc: 'Scored 100% on a rights quiz' },
    { badgeId: 'point-collector', name: 'Point Collector', icon: '⭐', desc: 'Earned 100+ XP points' },
    { badgeId: 'rising-star', name: 'Rising Star', icon: '🚀', desc: 'Reached Level 2 Explorer' },
    { badgeId: 'privacy-guardian', name: 'Privacy Guardian', icon: '🛡️', desc: 'Mastered online & digital safety' },
    { badgeId: 'equal-voice', name: 'Equal Voice', icon: '📢', desc: 'Shared rights with friends' },
    { badgeId: 'scholar', name: 'Scholar', icon: '🎓', desc: 'Explored knowledge articles' },
    { badgeId: 'streak-hero', name: 'Streak Hero', icon: '🔥', desc: 'Maintained 7-day learning streak' },
  ];

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
    }}>
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveQuizModuleId(null);
          setActiveTab(tab);
        }}
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
          {/* 1. Home Tab */}
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
                marginBottom: '1.75rem',
              }}>
                <AdventureCard
                  onContinueAdventure={(targetId) => setActiveQuizModuleId(targetId || 'm1')}
                />
                <TrophyPreview onOpenTrophies={() => setActiveTab('trophy')} />
              </div>

              {/* Row 3: Recommended Quests */}
              <RecommendedQuests onSelectQuest={handleQuestSelected} />

              {/* Row 4: Progress Section Preview on Home */}
              <div style={{ marginTop: '2.5rem' }}>
                <ProgressSection onStartQuiz={(modId) => setActiveQuizModuleId(modId)} />
              </div>
            </div>
          )}

          {/* 2. Dedicated Progress Tab (Person C2) */}
          {activeTab === 'progress' && (
            <ProgressSection onStartQuiz={(modId) => setActiveQuizModuleId(modId)} />
          )}

          {/* 3. Quests & Challenges Tab */}
          {activeTab === 'quests' && (
            <div style={{
              maxWidth: '1000px',
              margin: '1.5rem auto',
            }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                marginBottom: '1.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: '#fef3c7',
                    color: '#d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Compass size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>
                      Active Quests & Rights Challenges
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '2px 0 0' }}>
                      Choose a learning mission, answer quiz questions, and earn XP and badges!
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.25rem',
              }}>
                {[
                  {
                    id: 'm1',
                    title: 'Right to Education Quest',
                    xp: 100,
                    icon: '🎓',
                    desc: 'Learn about free education, non-discrimination in schools, and the RTE Act.',
                    badge: 'Education Defender',
                  },
                  {
                    id: 'm2',
                    title: 'Right to Play & Leisure',
                    xp: 100,
                    icon: '⚽',
                    desc: 'Discover why sports, recreational games, and creativity are legal rights.',
                    badge: 'Play Champion',
                  },
                  {
                    id: 'm3',
                    title: 'Right to Safety & Protection',
                    xp: 60,
                    icon: '🛡️',
                    desc: 'Master the rules of personal safety, Childline 1098, and safe environments.',
                    badge: 'Safety Sentinel',
                  },
                  {
                    id: 'm4',
                    title: 'Digital Privacy & Security',
                    xp: 40,
                    icon: '🔒',
                    desc: 'Protect your personal identity, passwords, and digital boundaries online.',
                    badge: 'Privacy Shield',
                  },
                ].map((q) => {
                  const isDone = user?.completedModules?.some((m) => m.moduleId === q.id);

                  return (
                    <div
                      key={q.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        border: isDone ? '1.5px solid #86efac' : '1px solid #e2e8f0',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '2rem' }}>{q.icon}</span>
                          <span style={{
                            background: isDone ? '#dcfce7' : '#fef3c7',
                            color: isDone ? '#15803d' : '#b45309',
                            fontSize: '0.78rem',
                            fontWeight: '800',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                          }}>
                            {isDone ? '✓ Completed' : `+${q.xp} XP`}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e1b4b', margin: '0 0 0.4rem' }}>
                          {q.title}
                        </h3>
                        <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 1rem', lineHeight: 1.45 }}>
                          {q.desc}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveQuizModuleId(q.id)}
                        style={{
                          background: isDone ? '#f1f5f9' : '#4f46e5',
                          color: isDone ? '#475569' : '#ffffff',
                          border: 'none',
                          padding: '0.65rem 1rem',
                          borderRadius: '12px',
                          fontWeight: '800',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <span>{isDone ? 'Retake Quiz' : 'Start Quest Quiz'}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Trophy Case Tab */}
          {activeTab === 'trophy' && (
            <div style={{
              maxWidth: '960px',
              margin: '1.5rem auto',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    background: '#fef3c7',
                    color: '#d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Trophy size={30} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>
                      {user?.name ? `${user.name}'s Trophy Cabinet` : 'Trophy Cabinet'}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '3px 0 0' }}>
                      Collect badges as you master children's rights laws and complete quiz milestones.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('progress')}
                  style={{
                    background: '#4f46e5',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                >
                  View Learning Progress →
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.25rem',
                marginBottom: '2rem',
              }}>
                {systemBadges.map((badge) => {
                  const earned = user?.badgesEarned?.find(
                    (b) => b.badgeId === badge.badgeId || b.name === badge.name
                  );
                  const isUnlocked = !!earned;

                  return (
                    <div
                      key={badge.badgeId}
                      style={{
                        background: isUnlocked ? '#fefce8' : '#f8fafc',
                        border: isUnlocked ? '1.5px solid #fde047' : '1px solid #e2e8f0',
                        borderRadius: '18px',
                        padding: '1.25rem 1rem',
                        textAlign: 'center',
                        opacity: isUnlocked ? 1 : 0.6,
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <div style={{
                        fontSize: '2.2rem',
                        marginBottom: '0.5rem',
                        filter: isUnlocked ? 'none' : 'grayscale(1)',
                      }}>
                        {isUnlocked ? badge.icon : '🔒'}
                      </div>
                      <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1e293b' }}>
                        {badge.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '3px', lineHeight: 1.3 }}>
                        {badge.desc}
                      </div>
                      <span style={{
                        display: 'inline-block',
                        marginTop: '0.65rem',
                        background: isUnlocked ? '#dcfce7' : '#f1f5f9',
                        color: isUnlocked ? '#15803d' : '#64748b',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                      }}>
                        {isUnlocked ? '✓ Unlocked' : 'Locked'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. Knowledge Hub Tab */}
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
                Articles, Child Rights FAQs, legal charters, and interactive stories to help you learn your rights.
              </p>
              <button
                onClick={() => setActiveTab('progress')}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: '700',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                }}
              >
                Go to My Progress & Quizzes
              </button>
            </div>
          )}

          {/* 6. Interactive World Map Tab */}
          {activeTab === 'map' && (
            <div style={{
              maxWidth: '1080px',
              margin: '1.5rem auto',
            }}>
              {/* Header */}
              <div style={{
                background: 'linear-gradient(135deg, #0369a1 0%, #1e1b4b 100%)',
                borderRadius: '24px',
                padding: '2rem 2.5rem',
                color: '#ffffff',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: '0 10px 30px rgba(3, 105, 161, 0.25)',
              }}>
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255,255,255,0.15)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    color: '#fbbf24',
                    marginBottom: '0.5rem',
                  }}>
                    <Map size={14} />
                    <span>Archipelago of Children's Rights</span>
                  </div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0 0 0.35rem' }}>
                    Adventure World Map
                  </h2>
                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: 0, maxWidth: '550px' }}>
                    Sail between the Islands of Rights! Complete each module's challenge quiz to conquer that island and earn its seal.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('progress')}
                    style={{
                      background: '#fbbf24',
                      color: '#1e1b4b',
                      border: 'none',
                      fontWeight: '800',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    View Scorecard →
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('home')}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.3)',
                      fontWeight: '700',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    ← Back Home
                  </button>
                </div>
              </div>

              {/* Island Archipelago Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
              }}>
                {[
                  {
                    id: 'm1',
                    islandName: 'Education Isle',
                    law: 'Right to Education (RTE Act 2009)',
                    desc: 'Where every child is granted free books, caring teachers, and fair learning environments.',
                    icon: '🏝️',
                    subIcon: '🎓',
                    theme: '#4f46e5',
                    bg: '#eef2ff',
                    border: '#c7d2fe',
                    xp: 100,
                  },
                  {
                    id: 'm2',
                    islandName: 'Recreation Atoll',
                    law: 'Right to Play (UNCRC Article 31)',
                    desc: 'A sunlit island filled with playgrounds, team sports, open parks, and joyful games.',
                    icon: '⚽',
                    subIcon: '🎡',
                    theme: '#059669',
                    bg: '#f0fdf4',
                    border: '#bbf7d0',
                    xp: 100,
                  },
                  {
                    id: 'm3',
                    islandName: 'Safety Harbor',
                    law: 'Protection & Safety (POCSO & 1098)',
                    desc: 'A fortified harbor that shields children from harm, violence, and dangerous work.',
                    icon: '🛡️',
                    subIcon: '⚓',
                    theme: '#0284c7',
                    bg: '#f0f9ff',
                    border: '#bae6fd',
                    xp: 60,
                  },
                  {
                    id: 'm4',
                    islandName: 'Privacy Citadel',
                    law: 'Digital Rights & Privacy',
                    desc: 'A modern tower keeping personal boundaries, passwords, and private data secure.',
                    icon: '🏰',
                    subIcon: '🔒',
                    theme: '#7c3aed',
                    bg: '#faf5ff',
                    border: '#e9d5ff',
                    xp: 40,
                  },
                ].map((island, index) => {
                  const isConquered = user?.completedModules?.some((m) => m.moduleId === island.id);

                  return (
                    <div
                      key={island.id}
                      style={{
                        background: island.bg,
                        border: `2px solid ${isConquered ? '#86efac' : island.border}`,
                        borderRadius: '24px',
                        padding: '1.75rem',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                      <div>
                        {/* Status Stamp */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <div style={{
                            fontSize: '2.5rem',
                            width: '60px',
                            height: '60px',
                            borderRadius: '18px',
                            background: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                          }}>
                            {island.icon}
                          </div>

                          <div style={{
                            background: isConquered ? '#dcfce7' : '#ffffff',
                            color: isConquered ? '#15803d' : island.theme,
                            border: `1px solid ${isConquered ? '#86efac' : island.border}`,
                            fontWeight: '800',
                            fontSize: '0.78rem',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}>
                            <span>{isConquered ? '⭐ Island Conquered' : `+${island.xp} XP Available`}</span>
                          </div>
                        </div>

                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: island.theme, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Island #{index + 1} • {island.law}
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#1e1b4b', margin: '0.2rem 0 0.5rem' }}>
                          {island.islandName}
                        </h3>
                        <p style={{ fontSize: '0.86rem', color: '#475569', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                          {island.desc}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveQuizModuleId(island.id)}
                        style={{
                          background: isConquered ? '#ffffff' : island.theme,
                          color: isConquered ? island.theme : '#ffffff',
                          border: isConquered ? `2px solid ${island.theme}` : 'none',
                          fontWeight: '800',
                          fontSize: '0.88rem',
                          padding: '0.75rem 1.25rem',
                          borderRadius: '14px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          boxShadow: isConquered ? 'none' : `0 4px 12px ${island.theme}40`,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span>{isConquered ? '↻ Retake Island Challenge' : 'Explore & Take Quiz'}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
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
              Manage your personal preferences, avatar profile, and account safety.
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
                border: 'none',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
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
