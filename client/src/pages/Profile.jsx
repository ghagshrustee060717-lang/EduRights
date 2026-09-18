import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Zap,
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  Target,
} from "lucide-react";

import { modules } from "../data/modules";

import {
  getCompletedModules,
  getModuleFeedback,
  getXP,
  getLevelInfo,
  getBadges,
} from "../utils/progress";

function Profile() {
  const navigate = useNavigate();

  const [completed, setCompleted] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    setCompleted(getCompletedModules());
    setFeedback(getModuleFeedback());
  }, []);

  const xp = getXP(completed);
  const levelInfo = getLevelInfo(xp);

  const badges = getBadges(
    completed,
    feedback,
    modules
  );

  const unlockedCount = badges.filter(
    (badge) => badge.unlocked
  ).length;

  const completionPercent =
    modules.length > 0
      ? Math.round(
          (completed.length / modules.length) * 100
        )
      : 0;

  return (
    <main className="profile-page">
      <div className="profile-bg profile-bg-one" />
      <div className="profile-bg profile-bg-two" />

      <div className="profile-container">

        {/* ================================
            BACK
        ================================= */}

        <button
          type="button"
          className="profile-back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to Adventure Map
        </button>

        {/* ================================
            HERO
        ================================= */}

        <section className="profile-hero">
          <div className="profile-hero-circle-one" />
          <div className="profile-hero-circle-two" />

          <div className="profile-avatar">
            🧭
          </div>

          <span className="profile-level">
            LEVEL {levelInfo.level}
          </span>

          <h1>{levelInfo.title}</h1>

          <div className="profile-xp">
            <Zap size={18} />
            {levelInfo.currentXP} XP
          </div>

          <div className="profile-xp-progress">
            <div className="profile-xp-track">
              <div
                className="profile-xp-fill"
                style={{
                  width: `${levelInfo.progressPercent}%`,
                }}
              />
            </div>

            <div className="profile-xp-text">
              {levelInfo.isMaxLevel ? (
                <span>
                  🎉 Max level reached!
                </span>
              ) : (
                <span>
                  {levelInfo.nextLevelXP -
                    levelInfo.currentXP}{" "}
                  XP to reach{" "}
                  <strong>
                    {levelInfo.nextLevelTitle}
                  </strong>
                </span>
              )}

              <strong>
                {levelInfo.progressPercent}%
              </strong>
            </div>
          </div>
        </section>

        {/* ================================
            QUICK STATS
        ================================= */}

        <section className="profile-stats">

          <div className="profile-stat-card">
            <div className="profile-stat-icon purple">
              <Trophy size={22} />
            </div>

            <div>
              <span>Adventures</span>
              <strong>
                {completed.length}/{modules.length}
              </strong>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon gold">
              <Zap size={22} />
            </div>

            <div>
              <span>Total XP</span>
              <strong>{xp} XP</strong>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon green">
              <Award size={22} />
            </div>

            <div>
              <span>Badges</span>
              <strong>
                {unlockedCount}/{badges.length}
              </strong>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon coral">
              <Target size={22} />
            </div>

            <div>
              <span>Progress</span>
              <strong>
                {completionPercent}%
              </strong>
            </div>
          </div>

        </section>

        {/* ================================
            BADGES
        ================================= */}

        <section className="profile-card">

          <div className="profile-card-heading">
            <div className="profile-card-title">
              <div className="profile-card-title-icon">
                <Award size={21} />
              </div>

              <div>
                <span>YOUR COLLECTION</span>
                <h2>Badges</h2>
              </div>
            </div>

            <div className="profile-badge-count">
              {unlockedCount} / {badges.length}
            </div>
          </div>

          <div className="badge-grid">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`badge-card ${
                  badge.unlocked
                    ? "badge-unlocked"
                    : "badge-locked"
                }`}
              >
                <div className="badge-icon">
                  {badge.unlocked ? (
                    badge.icon
                  ) : (
                    <Lock size={25} />
                  )}
                </div>

                <h3>{badge.label}</h3>

                <p>{badge.description}</p>

                {badge.unlocked && (
                  <div className="badge-earned">
                    <CheckCircle2 size={13} />
                    Earned
                  </div>
                )}

                {!badge.unlocked && (
                  <div className="badge-locked-text">
                    Keep exploring
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================================
            MODULE PROGRESS
        ================================= */}

        <section className="profile-card">

          <div className="profile-card-heading">
            <div className="profile-card-title">
              <div className="profile-card-title-icon blue">
                <BookProgressIcon />
              </div>

              <div>
                <span>YOUR JOURNEY</span>
                <h2>Adventure Progress</h2>
              </div>
            </div>

            <div className="profile-badge-count">
              {completionPercent}%
            </div>
          </div>

          <div className="profile-module-list">
            {modules.map((module, index) => {
              const isComplete =
                completed.includes(module.id);

              const isUnlocked =
                index === 0 ||
                completed.includes(
                  modules[index - 1].id
                );

              return (
                <div
                  key={module.id}
                  className={`profile-module ${
                    isComplete
                      ? "profile-module-complete"
                      : ""
                  }`}
                >
                  <div className="profile-module-number">
                    {isComplete ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <div className="profile-module-info">
                    <h3>{module.title}</h3>
                    <p>{module.topic}</p>
                  </div>

                  <div
                    className={`profile-module-status ${
                      isComplete
                        ? "complete"
                        : isUnlocked
                        ? "available"
                        : "locked"
                    }`}
                  >
                    {isComplete
                      ? "Completed"
                      : isUnlocked
                      ? "Available"
                      : "Locked"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================
            ENCOURAGEMENT
        ================================= */}

        <div className="profile-encouragement">
          <Sparkles size={18} />

          <span>
            Keep exploring to earn more XP and unlock
            every badge! 🌟
          </span>

          <Sparkles size={18} />
        </div>

      </div>
    </main>
  );
}


/* Small icon component so we don't
   need another package/import. */
function BookProgressIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  );
}

export default Profile;