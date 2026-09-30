import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Trophy,
  Zap,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Flame,
  BookOpen,
  Calendar,
  Check,
} from 'lucide-react';

export const ProgressSection = ({ onStartQuiz }) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // 'all' | 'quizzes' | 'badges'

  const completedModules = user?.completedModules || [];
  const moduleScoreTotal = completedModules.reduce((sum, m) => sum + (Number(m.score) || 0), 0);
  const totalPoints = (user?.role === 'child' && completedModules.length > 0 && user?.email !== 'aarav@edurights.org')
    ? moduleScoreTotal
    : (user?.totalPoints ?? 0);
  const currentLevel = user?.currentLevel ?? 1;
  const levelTitle = user?.levelTitle || 'Level 1 Beginner';
  const nextLevelPoints = user?.nextLevelPoints || 500;
  const badgesEarned = user?.badgesEarned || [];
  const streakDays = user?.streakDays || 1;

  // Level roadmap
  const levels = [
    { level: 1, title: 'Beginner', minXp: 0, maxXp: 500 },
    { level: 2, title: 'Learner', minXp: 500, maxXp: 1000 },
    { level: 3, title: 'Explorer', minXp: 1000, maxXp: 1500 },
    { level: 4, title: 'Achiever', minXp: 1500, maxXp: 2000 },
    { level: 5, title: 'Champion', minXp: 2000, maxXp: 2000 },
  ];

  // Available modules
  const allModules = [
    {
      id: 'm1',
      title: 'Right to Education',
      chapter: 'RTE Act 2009',
      totalXp: 100,
      description: 'Free & compulsory education, non-discrimination & equal rights in schools.',
    },
    {
      id: 'm2',
      title: 'Right to Play',
      chapter: 'UNCRC Article 31',
      totalXp: 100,
      description: 'Rest, leisure, and recreational activities for healthy childhood development.',
    },
    {
      id: 'm3',
      title: 'Right to Safety',
      chapter: 'POCSO & Childline 1098',
      totalXp: 60,
      description: 'Protection from harm, child abuse safety rules, and emergency help lines.',
    },
    {
      id: 'm4',
      title: 'Right to Privacy',
      chapter: 'Digital Rights',
      totalXp: 40,
      description: 'Online safety, personal space, and protecting private information.',
    },
  ];

  // System badges master catalog
  const systemBadges = [
    {
      badgeId: 'first-step',
      name: 'First Step',
      icon: '🏆',
      criteria: 'Complete your first quiz',
    },
    {
      badgeId: 'quiz-master',
      name: 'Quiz Master',
      icon: '🌟',
      criteria: 'Score 100% on any module quiz',
    },
    {
      badgeId: 'point-collector',
      name: 'Point Collector',
      icon: '⭐',
      criteria: 'Accumulate 100 or more total XP',
    },
    {
      badgeId: 'rising-star',
      name: 'Rising Star',
      icon: '🚀',
      criteria: 'Reach Level 2 with 500+ XP',
    },
    {
      badgeId: 'privacy-guardian',
      name: 'Privacy Guardian',
      icon: '🛡️',
      criteria: 'Complete the Right to Privacy module',
    },
    {
      badgeId: 'equal-voice',
      name: 'Equal Voice',
      icon: '📢',
      criteria: 'Share child rights with classmates',
    },
    {
      badgeId: 'scholar',
      name: 'Scholar',
      icon: '🎓',
      criteria: 'Explore all rights in Knowledge Hub',
    },
    {
      badgeId: 'streak-hero',
      name: 'Streak Hero',
      icon: '🔥',
      criteria: 'Keep a 7-day learning streak',
    },
  ];

  // Calculate XP progress percentage
  const currentLevelInfo = levels.find((l) => l.level === currentLevel) || levels[0];
  const levelMin = currentLevelInfo.minXp;
  const levelMax = currentLevelInfo.maxXp;
  const progressPercent =
    levelMax > levelMin
      ? Math.min(Math.max(Math.round(((totalPoints - levelMin) / (levelMax - levelMin)) * 100), 0), 100)
      : 100;

  const moduleCompletionPercent = Math.round((completedModules.length / allModules.length) * 100);

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
      {/* Top Banner: Gamification Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
          borderRadius: '24px',
          padding: '2rem 2.5rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 12px 32px rgba(30, 27, 75, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: '800',
                color: '#fbbf24',
                marginBottom: '0.75rem',
              }}
            >
              <Sparkles size={14} />
              <span>Gamification & Learning Progress</span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', margin: '0 0 0.5rem' }}>
              {user?.name ? `${user.name}'s Adventure Progress` : 'Your Adventure Progress'}
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '600px', margin: 0, lineHeight: 1.5 }}>
              Track your quiz scores, test your legal rights knowledge, level up your hero rank, and unlock collectible badges!
            </p>
          </div>

          {/* Quick Stats Pill Header */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                borderRadius: '18px',
                padding: '1rem 1.25rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                minWidth: '100px',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24' }}>
                ⚡ {totalPoints}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>
                Total XP
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                borderRadius: '18px',
                padding: '1rem 1.25rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                minWidth: '100px',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8' }}>
                Lv. {currentLevel}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>
                Rank
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                borderRadius: '18px',
                padding: '1rem 1.25rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                minWidth: '100px',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#34d399' }}>
                {badgesEarned.length} / {systemBadges.length}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>
                Badges
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Level Progression Journey */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '1.75rem 2rem',
          border: '1px solid #eef2f6',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Level Progression
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1e1b4b', margin: '0.2rem 0 0' }}>
              {levelTitle} (Level {currentLevel})
            </h2>
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748b' }}>
            <span style={{ color: '#4f46e5', fontWeight: '900' }}>{totalPoints} XP</span> earned •{' '}
            {nextLevelPoints > totalPoints ? (
              <span>
                <strong>{nextLevelPoints - totalPoints} XP</strong> needed for next level
              </span>
            ) : (
              <span>Max level reached!</span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            height: '14px',
            background: '#e2e8f0',
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4f46e5 0%, #10b981 100%)',
              borderRadius: '9999px',
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
            }}
          />
        </div>

        {/* Step Milestones */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.75rem',
            textAlign: 'center',
          }}
        >
          {levels.map((lvl) => {
            const isPassed = currentLevel > lvl.level;
            const isCurrent = currentLevel === lvl.level;
            const isLocked = currentLevel < lvl.level;

            return (
              <div
                key={lvl.level}
                style={{
                  background: isCurrent ? '#fef3c7' : isPassed ? '#f0fdf4' : '#f8fafc',
                  border: isCurrent
                    ? '2px solid #f59e0b'
                    : isPassed
                    ? '1px solid #bbf7d0'
                    : '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '0.85rem 0.5rem',
                  opacity: isLocked ? 0.7 : 1,
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isCurrent
                      ? '#f59e0b'
                      : isPassed
                      ? '#10b981'
                      : '#cbd5e1',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.4rem',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                  }}
                >
                  {isPassed ? <Check size={16} strokeWidth={3} /> : lvl.level}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#1e1b4b' }}>
                  {lvl.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px', fontWeight: '600' }}>
                  {lvl.minXp} XP
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Grid with Quiz Scores & Completed Modules + Badges Showcase */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.75rem', marginBottom: '2rem' }}>
        {/* Left Card: Completed Modules & Quiz Scores */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '1.75rem',
            border: '1px solid #eef2f6',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Module Progress
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e1b4b', margin: '0.2rem 0 0' }}>
                Quiz Scores & Completion
              </h3>
            </div>
            <div
              style={{
                background: '#e0e7fe',
                color: '#4338ca',
                fontSize: '0.8rem',
                fontWeight: '800',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
              }}
            >
              {completedModules.length} of {allModules.length} completed ({moduleCompletionPercent}%)
            </div>
          </div>

          {/* Module List with Scores and Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>
            {allModules.map((mod) => {
              const attempt = completedModules.find((c) => c.moduleId === mod.id);
              const isCompleted = !!attempt;

              return (
                <div
                  key={mod.id}
                  style={{
                    background: isCompleted ? '#f8fafc' : '#ffffff',
                    border: isCompleted ? '1px solid #cbd5e1' : '1px dashed #cbd5e1',
                    borderRadius: '18px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: isCompleted ? '#dcfce7' : '#e0e7fe',
                        color: isCompleted ? '#15803d' : '#4f46e5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {isCompleted ? <CheckCircle2 size={22} /> : <BookOpen size={20} />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', color: '#1e1b4b' }}>
                          {mod.title}
                        </h4>
                        {isCompleted && (
                          <span
                            style={{
                              background: '#dcfce7',
                              color: '#15803d',
                              fontSize: '0.7rem',
                              fontWeight: '800',
                              padding: '2px 8px',
                              borderRadius: '9999px',
                            }}
                          >
                            ✓ Passed
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                        {mod.chapter} • Max {mod.totalXp} XP
                      </div>
                    </div>
                  </div>

                  {/* Right Score / Button */}
                  <div>
                    {isCompleted ? (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1rem', fontWeight: '900', color: '#059669' }}>
                          +{attempt.score} XP
                        </div>
                        <button
                          type="button"
                          onClick={() => onStartQuiz && onStartQuiz(mod.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#4f46e5',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '2px 0',
                          }}
                        >
                          <RotateCcw size={12} />
                          Retake
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onStartQuiz && onStartQuiz(mod.id)}
                        style={{
                          background: '#4f46e5',
                          color: '#ffffff',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '12px',
                          fontSize: '0.82rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          boxShadow: '0 4px 10px rgba(79, 70, 229, 0.25)',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                      >
                        <span>Take Quiz</span>
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Earned Badges & Trophy Cabinet */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '1.75rem',
            border: '1px solid #eef2f6',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Achievements
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e1b4b', margin: '0.2rem 0 0' }}>
                Earned Badges ({badgesEarned.length})
              </h3>
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#d97706' }}>
              🏆 {badgesEarned.length} Unlocked
            </div>
          </div>

          {/* Badges Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.85rem',
              flex: 1,
            }}
          >
            {systemBadges.map((badge) => {
              const earned = badgesEarned.find(
                (b) => b.badgeId === badge.badgeId || b.name === badge.name
              );
              const isUnlocked = !!earned;

              return (
                <div
                  key={badge.badgeId}
                  style={{
                    background: isUnlocked ? '#fefce8' : '#f8fafc',
                    border: isUnlocked ? '1.5px solid #fde047' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '0.9rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    opacity: isUnlocked ? 1 : 0.65,
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    if (isUnlocked) e.currentTarget.style.transform = 'scale(1.03)';
                  }}
                  onMouseOut={(e) => {
                    if (isUnlocked) e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: isUnlocked ? '#fef08a' : '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      marginBottom: '0.4rem',
                      boxShadow: isUnlocked ? '0 4px 12px rgba(250, 204, 21, 0.35)' : 'none',
                    }}
                  >
                    {isUnlocked ? badge.icon : <Lock size={18} color="#94a3b8" />}
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1e1b4b' }}>
                    {badge.name}
                  </div>

                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px', lineHeight: 1.3 }}>
                    {isUnlocked ? (earned.description || badge.criteria) : badge.criteria}
                  </div>

                  <span
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: isUnlocked ? '#dcfce7' : '#f1f5f9',
                      color: isUnlocked ? '#15803d' : '#64748b',
                    }}
                  >
                    {isUnlocked ? '✓ Unlocked' : 'Locked'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
