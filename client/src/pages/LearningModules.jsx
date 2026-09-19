import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Zap,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { modules as fallbackModules } from "../data/modules";
import ModuleCard from "../components/ModuleCard";
import ProgressBar from "../components/ProgressBar";

import { getModules } from "../services/api";

import {
  getCompletedModules,
  isModuleUnlocked,
  getModuleFeedback,
  getXP,
  getLevelInfo,
  getBadges,
} from "../utils/progress";

function LearningModules() {
  const navigate = useNavigate();

  const [modules, setModules] = useState(fallbackModules);
  const [completed, setCompleted] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const loadModules = async () => {
      try {
       const data = await getModules();

        const backendModules = (data.modules || []).map((module) => ({
          id: module.moduleId,
          title: module.title,
          topic: module.topic,
          content: module.content || [],
        }));

        if (backendModules.length > 0) {
          setModules(backendModules);
        }
      } catch (error) {
        console.error("Module API error:", error);
        setApiError("Using saved learning content.");
      } finally {
        setLoading(false);
      }
    };

    loadModules();

    setCompleted(getCompletedModules());
    setFeedback(getModuleFeedback());
  }, []);

  const percent =
    modules.length > 0
      ? Math.round((completed.length / modules.length) * 100)
      : 0;

  const xp = getXP(completed);
  const levelInfo = getLevelInfo(xp);
  const badges = getBadges(completed, feedback, modules);

  const unlockedBadges = badges.filter(
    (badge) => badge.unlocked
  );

  return (
    <main className="learning-page">
      {/* Decorative background */}
      <div className="learning-bg learning-bg-one" />
      <div className="learning-bg learning-bg-two" />
      <div className="learning-bg learning-bg-three" />

      <div className="learning-container">
        {/* ================================
            HERO SECTION
        ================================= */}

        <section className="learning-hero">
          <div className="learning-eyebrow">
            <Sparkles size={16} />
            YOUR LEARNING ADVENTURE
          </div>

          <h1>
            Explore Your{" "}
            <span>Rights!</span>
          </h1>

          <p>
            Complete each adventure to unlock the next one
            and become a Child Rights Explorer! 🚀
          </p>
        </section>

        {/* ================================
            PROGRESS CARD
        ================================= */}

        <section className="learning-progress-card">
          <div className="progress-main">
            <div className="progress-icon">
              <Trophy size={27} strokeWidth={2.4} />
            </div>

            <div className="progress-content">
              <div className="progress-heading">
                <div>
                  <h2>Your Progress</h2>
                  <p>
                    {completed.length} of {modules.length}{" "}
                    modules completed
                  </p>
                </div>

                <div className="progress-percentage">
                  {percent}%
                </div>
              </div>

              <ProgressBar percent={percent} />
            </div>
          </div>

          {/* Stats */}
          <div className="learning-stats">
            <div className="learning-stat">
              <div className="stat-icon stat-icon-purple">
                <Zap size={18} />
              </div>

              <div>
                <span>Experience</span>
                <strong>{xp} XP</strong>
              </div>
            </div>

            <div className="learning-stat">
              <div className="stat-icon stat-icon-gold">
                <Award size={18} />
              </div>

              <div>
                <span>Level</span>
                <strong>
                  {levelInfo.level} · {levelInfo.title}
                </strong>
              </div>
            </div>

            <div className="learning-stat">
              <div className="stat-icon stat-icon-green">
                <Trophy size={18} />
              </div>

              <div>
                <span>Badges</span>
                <strong>
                  {unlockedBadges.length} earned
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="progress-view-button"
              onClick={() => navigate("/progress")}
            >
              View progress
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* ================================
            ADVENTURE SECTION
        ================================= */}

        <section className="adventure-section">
          <div className="adventure-heading">
            <div>
              <span className="section-kicker">
                YOUR JOURNEY
              </span>

              <h2>Choose an adventure</h2>

              <p>
                Learn something new, complete the module,
                and unlock your next challenge.
              </p>
            </div>

            <div className="adventure-count">
              {completed.length}/{modules.length}
            </div>
          </div>

          {loading && (
            <p className="learning-api-message">
              Loading learning modules...
            </p>
          )}

          {!loading && apiError && (
            <p className="learning-api-message">
              {apiError}
            </p>
          )}

          {/* Adventure map */}
          <div className="adventure-map">
            <div className="adventure-line" />

            <div className="adventure-list">
              {modules.map((module, index) => {
                const unlocked = isModuleUnlocked(
                  index,
                  completed,
                  modules
                );

                const isCompleted = completed.includes(
                  module.id
                );

                return (
                  <div
                    key={module.id}
                    className={`adventure-item ${
                      index % 2 === 0
                        ? "adventure-item-left"
                        : "adventure-item-right"
                    }`}
                  >
                    <div className="adventure-node">
                      {index + 1}
                    </div>

                    <ModuleCard
                      module={module}
                      index={index}
                      locked={!unlocked}
                      completed={isCompleted}
                      onClick={() =>
                        navigate(`/module/${module.id}`)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================
            BOTTOM MESSAGE
        ================================= */}

        <div className="learning-footer-message">
          <Sparkles size={17} />

          <span>
            Keep learning — every module makes you stronger!
          </span>

          <Sparkles size={17} />
        </div>
      </div>
    </main>
  );
}

export default LearningModules;