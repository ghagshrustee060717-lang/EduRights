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

  const {
    user,
    loading: authLoading,
    saveProfile,
  } = useAuth();

  const [completed, setCompleted] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);

  const [languageSaving, setLanguageSaving] = useState(false);
  const [languageMessage, setLanguageMessage] = useState("");

  /* ============================================
     LOAD PROGRESS
  ============================================ */

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
      setFeedback(getModuleFeedback());
      setProfileLoading(false);
    } else {
      setCompleted(getCompletedModules());
      setFeedback(getModuleFeedback());
      setProfileLoading(false);
    }
  }, [user, authLoading]);

  /* ============================================
     LANGUAGE
  ============================================ */

  const handleLanguageChange = async (event) => {
    const language = event.target.value;

    try {
      setLanguageSaving(true);
      setLanguageMessage("");

      await saveProfile({ language });

      setLanguageMessage(
        "Language updated successfully! 🌐"
      );
    } catch (error) {
      console.error(
        "Failed to update language:",
        error
      );

      setLanguageMessage(
        "Couldn't update language. Please try again."
      );
    } finally {
      setLanguageSaving(false);
    }
  };

  /* ============================================
     XP / LEVEL
  ============================================ */

  const localXP = getXP(completed);
  const localLevelInfo = getLevelInfo(localXP);

  const xp = user
    ? Number(user.totalPoints || 0)
    : localXP;

  /*
   * Level thresholds:
   *
   * Level 1 = 0 XP
   * Level 2 = 100 XP
   * Level 3 = 250 XP
   * Level 4 = 500 XP
   * Level 5 = 1000 XP
   *
   * The progress bar shows progress INSIDE
   * the current level, not total XP progress.
   */

  const levelInfo = user
    ? (() => {
        const level = Number(
          user.currentLevel || 1
        );

        const totalXP = Number(
          user.totalPoints || 0
        );

        const nextLevelXP = Number(
          user.nextLevelPoints || 500
        );

        const levelStartXP = {
          1: 0,
          2: 100,
          3: 250,
          4: 500,
          5: 1000,
        };

        /* ---------- MAX LEVEL ---------- */

        if (level >= 5) {
          return {
            level: 5,
            title:
              user.levelTitle ||
              "Rights Champion",
            currentXP: totalXP,
            progressPercent: 100,
            nextLevelXP: 1000,
            nextLevelTitle: "Max Level",
            isMaxLevel: true,
          };
        }

        /* ---------- CURRENT LEVEL ---------- */

        const startXP =
          levelStartXP[level] ?? 0;

        const levelXPRange =
          nextLevelXP - startXP;

        const earnedInCurrentLevel =
          totalXP - startXP;

        const progressPercent =
          levelXPRange > 0
            ? Math.min(
                100,
                Math.max(
                  0,
                  Math.round(
                    (earnedInCurrentLevel /
                      levelXPRange) *
                      100
                  )
                )
              )
            : 0;

        return {
          level,
          title:
            user.levelTitle ||
            `Level ${level}`,
          currentXP: totalXP,
          progressPercent,
          nextLevelXP,
          nextLevelTitle: `Level ${
            level + 1
          }`,
          isMaxLevel: false,
        };
      })()
    : localLevelInfo;

  /* ============================================
     BADGES
  ============================================ */

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
              `Explorer Badge ${
                index + 1
              }`,

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

  /* ============================================
     MODULE COMPLETION %
  ============================================ */

  const completionPercent =
    modules.length > 0
      ? Math.round(
          (completed.length /
            modules.length) *
            100
        )
      : 0;

  /* ============================================
     LOADING STATE
  ============================================ */

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

        {/* =================================
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

        {/* =================================
            HERO
        ================================= */}

        <section className="profile-hero">
          <div className="profile-hero-circle-one" />
          <div className="profile-hero-circle-two" />

          {/* Avatar */}
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

          {/* Current Level */}
          <span className="profile-level">
            LEVEL {levelInfo.level}
          </span>

          {/* User Name */}
          <h1>
            {user?.name
              ? `${user.name}'s Adventure`
              : levelInfo.title}
          </h1>

          {/* XP */}
          <div className="profile-xp">
            <Zap size={18} />
            {xp} XP
          </div>

          {/* =================================
              LEVEL PROGRESS
          ================================= */}

          <div className="profile-xp-progress">

            {/* Progress Bar */}
            <div className="profile-xp-track">
              <div
                className="profile-xp-fill"
                style={{
                  width: `${levelInfo.progressPercent}%`,
                }}
              />
            </div>

            {/* Current Level → Next Level */}
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                marginBottom: "4px",
                fontSize: "13px",
                fontWeight: 800,
                color:
                  "rgba(255, 255, 255, 0.9)",
                letterSpacing: "0.5px",
              }}
            >
              {levelInfo.isMaxLevel ? (
                "🏆 MAX LEVEL"
              ) : (
                <>
                  LEVEL {levelInfo.level} →{" "}
                  {levelInfo.nextLevelTitle.toUpperCase()}
                </>
              )}
            </div>

            {/* XP Remaining + Percentage */}
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

        {/* =================================
            QUICK STATS
        ================================= */}

        <section className="profile-stats">

          {/* Adventures */}
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

          {/* Total XP */}
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

          {/* Badges */}
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

          {/* Module Progress */}
          <div className="profile-stat-card">
            <div className="profile-stat-icon coral">
              <Target size={22} />
            </div>

            <div>
              <span>Module Progress</span>

              <strong>
                {completionPercent}%
              </strong>
            </div>
          </div>

        </section>

        {/* =================================
            LANGUAGE
        ================================= */}

        {user && (
          <section
            className="profile-card"
            style={{
              marginTop: "24px",
            }}
          >
            <div className="profile-card-heading">

              <div className="profile-card-title">

                <div className="profile-card-title-icon blue">
                  🌐
                </div>

                <div>
                  <span>
                    LEARNING PREFERENCE
                  </span>

                  <h2>
                    Language
                  </h2>
                </div>

              </div>

            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <select
                value={user?.language || "en"}
                onChange={
                  handleLanguageChange
                }
                disabled={languageSaving}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border:
                    "1px solid #e2e8f0",
                  background: "#ffffff",
                  color: "#1e293b",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: languageSaving
                    ? "wait"
                    : "pointer",
                  minWidth: "220px",
                  outline: "none",
                }}
              >
                <option value="en">
                  🇬🇧 English
                </option>

                <option value="hi">
                  🇮🇳 हिंदी
                </option>

                <option value="es">
                  🇪🇸 Español
                </option>

                <option value="fr">
                  🇫🇷 Français
                </option>
              </select>

              {languageSaving && (
                <span
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                  }}
                >
                  Saving...
                </span>
              )}

              {!languageSaving &&
                languageMessage && (
                  <span
                    style={{
                      color:
                        languageMessage.includes(
                          "successfully"
                        )
                          ? "#059669"
                          : "#dc2626",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {languageMessage}
                  </span>
                )}
            </div>
          </section>
        )}

        {/* =================================
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

                <h2>
                  Badges
                </h2>
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

                <h3>
                  {badge.label}
                </h3>

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

        {/* =================================
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

        {/* =================================
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

/*
 * Small icon component so we don't
 * need another package/import.
 */

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