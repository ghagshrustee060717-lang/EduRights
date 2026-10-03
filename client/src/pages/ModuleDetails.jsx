import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  BookOpen,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import { modules } from "../data/modules";

import {
  getCompletedModules,
  markModuleComplete,
  isModuleUnlocked,
  getModuleFeedback,
  saveModuleFeedback,
} from "../utils/progress";

import { useAuth } from "../context/AuthContext";
import { awardUserPoints } from "../services/api";

const FEEDBACK_OPTIONS = [
  { emoji: "😡", label: "Didn't like it" },
  { emoji: "😐", label: "It was okay" },
  { emoji: "😊", label: "I liked it" },
  { emoji: "🤩", label: "I loved it!" },
];

function ModuleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    user,
    token,
    loading: authLoading,
    isAuthenticated,
    refreshProfile,
  } = useAuth();

  const module = modules.find(
    (m) => String(m.id) === String(id)
  );

  const moduleIndex = modules.findIndex(
    (m) => String(m.id) === String(id)
  );

  const [completed, setCompleted] = useState([]);
  const [progressLoaded, setProgressLoaded] = useState(false);

  const [feedback, setFeedback] = useState(
    getModuleFeedback()
  );

  const [savingProgress, setSavingProgress] =
    useState(false);

  const [progressError, setProgressError] =
    useState("");

  /*
   * ============================================
   * LOAD ACCOUNT-SPECIFIC PROGRESS
   * ============================================
   */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (user) {
      const backendCompleted =
        Array.isArray(user.completedModules)
          ? user.completedModules.map(
              (item) => item.moduleId
            )
          : [];

      setCompleted(backendCompleted);
    } else {
      setCompleted(getCompletedModules());
    }

    setFeedback(getModuleFeedback());

    /*
     * VERY IMPORTANT:
     * Don't check whether the module is locked
     * until progress has been loaded.
     */
    setProgressLoaded(true);
  }, [user, authLoading]);

  /*
   * ============================================
   * LANGUAGE
   * ============================================
   */

  const selectedLanguage =
    user?.language || "en";

  const translatedModule =
    module?.languageVariants?.[
      selectedLanguage
    ] ||
    module?.languageVariants?.en ||
    module;

  /*
   * ============================================
   * UNLOCK STATUS
   * ============================================
   */

  const unlocked =
    progressLoaded && module
      ? isModuleUnlocked(
          moduleIndex,
          completed,
          modules
        )
      : false;

  const isCompleted = module
    ? completed.includes(module.id)
    : false;

  const selectedFeedback = module
    ? feedback[module.id]
    : null;

  /*
   * ============================================
   * REDIRECT ONLY AFTER PROGRESS LOADS
   * ============================================
   */

  useEffect(() => {
    if (
      authLoading ||
      !progressLoaded ||
      !module
    ) {
      return;
    }

    if (!unlocked) {
      navigate("/");
    }
  }, [
    authLoading,
    progressLoaded,
    module,
    unlocked,
    navigate,
  ]);

  /*
   * ============================================
   * MODULE NOT FOUND
   * ============================================
   */

  if (!module) {
    return (
      <main className="details-page">
        <div className="details-container">
          <div className="details-empty">
            <div className="details-empty-icon">
              <BookOpen size={34} />
            </div>

            <span className="details-kicker">
              OOPS!
            </span>

            <h1>Module Not Found</h1>

            <p>
              We couldn't find this learning
              adventure.
            </p>

            <button
              type="button"
              className="details-primary-button"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={18} />
              Back to Modules
            </button>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ============================================
   * WAIT FOR PROGRESS
   * ============================================
   */

  if (
    authLoading ||
    !progressLoaded
  ) {
    return (
      <main className="details-page">
        <div className="details-container">
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5B5FDE",
              fontWeight: 800,
              fontSize: "1.05rem",
            }}
          >
            Loading your adventure... 🚀
          </div>
        </div>
      </main>
    );
  }

  /*
   * If the module is genuinely locked,
   * the effect above will take the user back.
   */
  if (!unlocked) {
    return null;
  }

  /*
   * ============================================
   * COMPLETE MODULE
   * ============================================
   */

  const handleComplete = async () => {
    if (
      isCompleted ||
      savingProgress
    ) {
      return;
    }

    setProgressError("");

    /*
     * Update the UI immediately.
     */
    const updated = completed.includes(
      module.id
    )
      ? completed
      : [...completed, module.id];

    setCompleted(updated);

    /*
     * Logged-out users:
     * use localStorage.
     */
    if (!isAuthenticated || !token) {
      markModuleComplete(module.id);
      return;
    }

    /*
     * Logged-in users:
     * save to MongoDB.
     */
    try {
      setSavingProgress(true);

      await awardUserPoints(token, {
        points: 100,

        completedModule: {
          moduleId: module.id,
          title: module.title,
          score: 100,
        },
      });

      await refreshProfile();
    } catch (error) {
      console.error(
        "Failed to save module progress:",
        error
      );

      setProgressError(
        "Your module was completed, but we couldn't save your progress to your account. Please try again."
      );
    } finally {
      setSavingProgress(false);
    }
  };

  /*
   * ============================================
   * FEEDBACK
   * ============================================
   */

  const handleFeedback = (emoji) => {
    const updated = saveModuleFeedback(
      module.id,
      emoji
    );

    setFeedback({
      ...updated,
    });
  };

  /*
   * ============================================
   * COLORS
   * ============================================
   */

  const colors = [
    "#4f46e5",
    "#fbbf24",
    "#10b981",
    "#f43f5e",
  ];

  const color =
    colors[moduleIndex % colors.length];

  /*
   * ============================================
   * MAIN UI
   * ============================================
   */

  return (
    <main className="details-page">
      <div className="details-container">

        {/* BACK BUTTON */}

        <button
          type="button"
          className="details-back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to Adventure Map
        </button>

        {/* HERO */}

        <section
          className="details-hero"
          style={{
            "--hero-color": color,
          }}
        >
          <div className="details-hero-circle-one" />
          <div className="details-hero-circle-two" />

          <div className="details-module-number">
            {moduleIndex + 1}
          </div>

          <div className="details-hero-icon">
            <BookOpen
              size={32}
              strokeWidth={2.3}
            />
          </div>

          <span className="details-hero-kicker">
            ADVENTURE {moduleIndex + 1}
          </span>

          <h1>
            {translatedModule.title}
          </h1>

          <p>
            {translatedModule.topic}
          </p>

          {isCompleted && (
            <div className="details-completed-pill">
              <CheckCircle2 size={16} />
              Completed
            </div>
          )}
        </section>

        {/* CONTENT */}

        <section className="details-content-card">

          <div className="lesson-heading">
            <div className="lesson-heading-icon">
              <Lightbulb size={21} />
            </div>

            <div>
              <span>LET'S LEARN</span>

              <h2>
                Discover Your Rights
              </h2>
            </div>
          </div>

          <div className="lesson-blocks">

            {translatedModule.content.map(
              (block, index) => (
                <div
                  key={index}
                  className="lesson-block"
                  style={{
                    "--block-color":
                      colors[
                        index %
                          colors.length
                      ],
                  }}
                >
                  <div className="lesson-number">
                    {index + 1}
                  </div>

                  <p>{block}</p>
                </div>
              )
            )}

          </div>

          {/* COMPLETION */}

          <div className="lesson-completion">

            {isCompleted ? (

              <div className="completion-success">

                <div className="completion-success-icon">
                  <CheckCircle2 size={28} />
                </div>

                <div>
                  <h3>
                    Adventure Completed! 🎉
                  </h3>

                  <p>
                    Great job, Explorer!
                    You unlocked the next
                    adventure. 🚀
                  </p>
                </div>

                <button
                  type="button"
                  className="completion-continue-button"
                  onClick={() => navigate("/")}
                >
                  Continue Adventure

                  <ArrowLeft
                    size={17}
                    style={{
                      transform:
                        "rotate(180deg)",
                    }}
                  />
                </button>

              </div>

            ) : (

              <div className="completion-prompt">

                <div className="completion-prompt-icon">
                  <Sparkles size={23} />
                </div>

                <div className="completion-prompt-text">

                  <h3>
                    Finished this adventure?
                  </h3>

                  <p>
                    Mark it complete to
                    unlock the next learning
                    adventure.
                  </p>

                </div>

                <button
                  type="button"
                  className="details-complete-button"
                  onClick={handleComplete}
                  disabled={savingProgress}
                >
                  {savingProgress
                    ? "Saving Progress..."
                    : "⭐ Mark as Complete"}
                </button>

              </div>

            )}

            {progressError && (
              <p
                style={{
                  marginTop: "1rem",
                  color: "#dc2626",
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}
              >
                {progressError}
              </p>
            )}

          </div>

          {/* FEEDBACK */}

          <div className="feedback-section">

            <div className="feedback-heading">

              <h3>
                How did this adventure
                make you feel?
              </h3>

              <p>
                Your feedback helps us
                make learning better! 💜
              </p>

            </div>

            <div className="feedback-options">

              {FEEDBACK_OPTIONS.map(
                (option) => {

                  const isSelected =
                    selectedFeedback ===
                    option.emoji;

                  return (
                    <button
                      type="button"
                      key={option.emoji}
                      className={`feedback-option ${
                        isSelected
                          ? "feedback-option-selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleFeedback(
                          option.emoji
                        )
                      }
                      title={option.label}
                      aria-label={option.label}
                    >
                      <span>
                        {option.emoji}
                      </span>

                      <small>
                        {option.label}
                      </small>
                    </button>
                  );
                }
              )}

            </div>

            {selectedFeedback && (
              <p className="feedback-thanks">
                Thanks for sharing how
                you feel! 💜
              </p>
            )}

          </div>

        </section>

        {/* FOOTER */}

        <div className="details-footer-message">
          <Sparkles size={16} />

          Every right you learn makes
          you a stronger Explorer!

          <Sparkles size={16} />
        </div>

      </div>
    </main>
  );
}

export default ModuleDetails;