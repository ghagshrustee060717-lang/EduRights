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

import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const { user, loading: authLoading } = useAuth();

  const [completed, setCompleted] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);

  /*
   * ============================================
   * LOAD PROGRESS
   * ============================================
   *
   * Logged-in users:
   * Use progress stored in MongoDB through
   * AuthContext.
   *
   * Logged-out users:
   * Keep the existing localStorage behavior.
   */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (user) {
      const backendCompleted = Array.isArray(
        user.completedModules
      )
        ? user.completedModules.map(
            (module) => module.moduleId
          )
        : [];

      setCompleted(backendCompleted);

      /*
       * Feedback is still stored locally for now.
       */
      setFeedback(getModuleFeedback());

      setProfileLoading(false);
    } else {
      /*
       * Fallback for logged-out users.
       */
      setCompleted(getCompletedModules());
      setFeedback(getModuleFeedback());

      setProfileLoading(false);
    }
  }, [user, authLoading]);

  /*
   * ============================================
   * XP / LEVEL
   * ============================================
   */

  const localXP = getXP(completed);
  const localLevelInfo = getLevelInfo(localXP);

  /*
   * For logged-in users, use the backend's
   * totalPoints and level information.
   */
  const xp = user
    ? Number(user.totalPoints || 0)
    : localXP;

  const levelInfo = user
    ? {
        level: Number(user.currentLevel || 1),
        title:
          user.levelTitle ||
          "Level 1 Beginner",
        currentXP: Number(user.totalPoints || 0),
        progressPercent:
          Number(user.nextLevelPoints || 500) > 0
            ? Math.min(
                100,
                Math.round(
                  (Number(user.totalPoints || 0) /
                    Number(
                      user.nextLevelPoints || 500
                    )) *
                    100
                )
              )
            : 0,
        nextLevelXP: Number(
          user.nextLevelPoints || 500
        ),
        nextLevelTitle: `Level ${
          Number(user.currentLevel || 1) + 1
        }`,
        isMaxLevel: false,
      }
    : localLevelInfo;

  /*
   * ============================================
   * BADGES
   * ============================================
   */

  const localBadges = getBadges(
    completed,
    feedback,
    modules
  );

  /*
   * If backend badges exist, use them.
   * Otherwise keep the existing local badge logic.
   */
  const badges =
    user &&
    Array.isArray(user.badgesEarned) &&
    user.badgesEarned.length > 0
      ? modules.map((module, index) => {
          const backendBadge =
            user.badgesEarned.find(
              (badge) =>
                badge.badgeId === module.id
            );

          const localBadge =
            localBadges[index] || {};

          return {
            id:
              backendBadge?.badgeId ||
              localBadge.id ||
              module.id,

            label:
              backendBadge?.name ||
              localBadge.label ||
              `Explorer Badge ${index + 1}`,

            description:
              backendBadge?.description ||
              localBadge.description ||
              "Keep exploring to unlock this badge.",

            icon:
              backendBadge?.icon ||
              localBadge.icon ||
              "🏆",

            unlocked: Boolean(
              backendBadge
            ),
          };
        })
      : localBadges;

  const unlockedCount = badges.filter(
    (badge) => badge.unlocked
  ).length;

  /*
   * ============================================
   * COMPLETION %
   * ============================================
   */

  const completionPercent =
    modules.length > 0
      ? Math.round(
          (completed.length / modules.length) *
            100
        )
      : 0;

  /*
   * ============================================
   * LOADING STATE
   * ============================================
   */

  if (authLoading || profileLoading) {
    return (
      <main className="profile-page">
        <div className="profile-bg profile-bg-one" />
        <div className="profile-bg profile-bg-two" />

        <div
          className="profile-container"
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                marginBottom: "10px",
              }}
            >
              ⏳
            </div>

            <h2
              style={{
                color: "#1e293b",
                marginBottom: "5px",
              }}
            >
              Loading your progress...
            </h2>

            <p>
              Fetching your adventure data.
            </p>
          </div>
        </div>
      </main>
    );
  }

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
            {user?.avatar ===
            "superhero-aarav"
              ? "🦸‍♂️"
              : user?.avatar ===
                "explorer-maya"
              ? "🧭"
              : user?.avatar ===
                "tech-leo"
              ? "🚀"
              : user?.avatar ===
                "scout-tara"
              ? "⭐"
              : "🧭"}
          </div>

          <span className="profile-level">
            LEVEL {levelInfo.level}
          </span>

          <h1>
            {user?.name
              ? `${user.name}'s Adventure`
              : levelInfo.title}
          </h1>

          <div className="profile-xp">
            <Zap size={18} />
            {xp} XP
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
                  {Math.max(
                    0,
                    levelInfo.nextLevelXP -
                      levelInfo.currentXP
                  )}{" "}
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
                {completed.length}/
                {modules.length}
              </strong>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon gold">
              <Zap size={22} />
            </div>

            <div>
              <span>Total XP</span>

              <strong>
                {xp} XP
              </strong>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon green">
              <Award size={22} />
            </div>

            <div>
              <span>Badges</span>

              <strong>
                {unlockedCount}/
                {badges.length}
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
                <span>
                  YOUR COLLECTION
                </span>

                <h2>Badges</h2>
              </div>
            </div>

            <div className="profile-badge-count">
              {unlockedCount} /{" "}
              {badges.length}
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

                <p>
                  {badge.description}
                </p>

                {badge.unlocked && (
                  <div className="badge-earned">
                    <CheckCircle2
                      size={13}
                    />
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
                <span>
                  YOUR JOURNEY
                </span>

                <h2>
                  Adventure Progress
                </h2>
              </div>
            </div>

            <div className="profile-badge-count">
              {completionPercent}%
            </div>
          </div>

          <div className="profile-module-list">
            {modules.map(
              (module, index) => {
                const isComplete =
                  completed.includes(
                    module.id
                  );

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
                        <CheckCircle2
                          size={20}
                        />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="profile-module-info">
                      <h3>
                        {module.title}
                      </h3>

                      <p>
                        {module.topic}
                      </p>
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
              }
            )}
          </div>
        </section>

        {/* ================================
            ENCOURAGEMENT
        ================================= */}

        <div className="profile-encouragement">
          <Sparkles size={18} />

          <span>
            Keep exploring to earn more XP
            and unlock every badge! 🌟
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