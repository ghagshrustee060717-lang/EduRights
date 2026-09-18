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

const FEEDBACK_OPTIONS = [
  { emoji: "😡", label: "Didn't like it" },
  { emoji: "😐", label: "It was okay" },
  { emoji: "😊", label: "I liked it" },
  { emoji: "🤩", label: "I loved it!" },
];

function ModuleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const module = modules.find(
    (m) => String(m.id) === String(id)
  );

  const moduleIndex = modules.findIndex(
    (m) => String(m.id) === String(id)
  );

  const [completed, setCompleted] = useState(
    getCompletedModules()
  );

  const [feedback, setFeedback] = useState(
    getModuleFeedback()
  );

  const unlocked = module
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

  useEffect(() => {
    if (module && !unlocked) {
      navigate("/");
    }
  }, [module, unlocked, navigate]);

  /* ================================
     MODULE NOT FOUND
  ================================= */

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
              We couldn't find this learning adventure.
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

  /* ================================
     LOCKED MODULE
  ================================= */

  if (!unlocked) {
    return (
      <main className="details-page">
        <div className="details-container">
          <button
            type="button"
            className="details-back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back to Adventure Map
          </button>

          <section className="locked-module-card">
            <div className="locked-icon">
              <Lock size={32} />
            </div>

            <span className="details-kicker">
              ADVENTURE LOCKED
            </span>

            <h1>{module.title}</h1>

            <p>
              Complete the previous adventure to unlock
              this module.
            </p>

            <button
              type="button"
              className="details-primary-button"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={18} />
              Go Back to Modules
            </button>
          </section>
        </div>
      </main>
    );
  }

  /* ================================
     COMPLETE MODULE
  ================================= */

  const handleComplete = () => {
    const updated = markModuleComplete(module.id);
    setCompleted(updated);
  };

  /* ================================
     FEEDBACK
  ================================= */

  const handleFeedback = (emoji) => {
    const updated = saveModuleFeedback(
      module.id,
      emoji
    );

    setFeedback({ ...updated });
  };

  /* ================================
     COLORS
  ================================= */

  const colors = [
    "#4f46e5",
    "#fbbf24",
    "#10b981",
    "#f43f5e",
  ];

  const color =
    colors[moduleIndex % colors.length];

  return (
    <main className="details-page">
      <div className="details-container">

        {/* ================================
            BACK BUTTON
        ================================= */}

        <button
          type="button"
          className="details-back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to Adventure Map
        </button>

        {/* ================================
            HERO
        ================================= */}

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

          <h1>{module.title}</h1>

          <p>{module.topic}</p>

          {isCompleted && (
            <div className="details-completed-pill">
              <CheckCircle2 size={16} />
              Completed
            </div>
          )}
        </section>

        {/* ================================
            LEARNING CONTENT
        ================================= */}

        <section className="details-content-card">

          <div className="lesson-heading">
            <div className="lesson-heading-icon">
              <Lightbulb size={21} />
            </div>

            <div>
              <span>LET'S LEARN</span>
              <h2>Discover Your Rights</h2>
            </div>
          </div>

          <div className="lesson-blocks">
            {module.content.map((block, index) => (
              <div
                key={index}
                className="lesson-block"
                style={{
                  "--block-color":
                    colors[index % colors.length],
                }}
              >
                <div className="lesson-number">
                  {index + 1}
                </div>

                <p>{block}</p>
              </div>
            ))}
          </div>

          {/* ================================
              COMPLETION
          ================================= */}

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
                    Great job, Explorer! You unlocked
                    the next adventure. 🚀
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
                      transform: "rotate(180deg)",
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
                    Mark it complete to unlock the
                    next learning adventure.
                  </p>
                </div>

                <button
                  type="button"
                  className="details-complete-button"
                  onClick={handleComplete}
                >
                  ⭐ Mark as Complete
                </button>
              </div>
            )}
          </div>

          {/* ================================
              FEEDBACK
          ================================= */}

          <div className="feedback-section">
            <div className="feedback-heading">
              <h3>
                How did this adventure make you feel?
              </h3>

              <p>
                Your feedback helps us make learning
                better! 💜
              </p>
            </div>

            <div className="feedback-options">
              {FEEDBACK_OPTIONS.map((option) => {
                const isSelected =
                  selectedFeedback === option.emoji;

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
                      handleFeedback(option.emoji)
                    }
                    title={option.label}
                    aria-label={option.label}
                  >
                    <span>{option.emoji}</span>
                    <small>{option.label}</small>
                  </button>
                );
              })}
            </div>

            {selectedFeedback && (
              <p className="feedback-thanks">
                Thanks for sharing how you feel! 💜
              </p>
            )}
          </div>
        </section>

        {/* ================================
            FOOTER
        ================================= */}

        <div className="details-footer-message">
          <Sparkles size={16} />
          Every right you learn makes you a stronger
          Explorer!
          <Sparkles size={16} />
        </div>
      </div>
    </main>
  );
}

export default ModuleDetails;