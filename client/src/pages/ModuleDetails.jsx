import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const module = modules.find((m) => m.id === id);
  const [completed, setCompleted] = useState(getCompletedModules());
  const [feedback, setFeedback] = useState(getModuleFeedback());

  const moduleIndex = modules.findIndex((m) => m.id === id);

  const unlocked = module
    ? isModuleUnlocked(moduleIndex, completed, modules)
    : false;

  const isCompleted = completed.includes(id);
  const selectedFeedback = feedback[id];

  useEffect(() => {
    if (module && !unlocked) {
      navigate("/");
    }
  }, [module, unlocked, navigate]);

  if (!module) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F8F9FD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "var(--sans)",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "2rem",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            🔍
          </div>

          <h2
            style={{
              color: "#5B5FDE",
              marginBottom: "0.5rem",
              fontFamily: "var(--heading)",
            }}
          >
            Module Not Found
          </h2>

          <p style={{ color: "#6B6375" }}>
            We couldn't find this learning adventure.
          </p>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "999px",
              background: "#5B5FDE",
              color: "#FFFFFF",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--sans)",
            }}
          >
            ← Back to Modules
          </button>
        </div>
      </div>
    );
  }

  if (!unlocked) return null;

  const colors = [
    "#5B5FDE",
    "#FFC700",
    "#2ECC71",
    "#FF6B6B",
  ];

  const color = colors[moduleIndex % colors.length];

  const icons = ["📚", "🛡️", "⭐", "🌈"];
  const icon = icons[moduleIndex % icons.length];

  const handleComplete = () => {
    const updated = markModuleComplete(module.id);
    setCompleted(updated);
  };

  const handleFeedback = (emoji) => {
    const updated = saveModuleFeedback(module.id, emoji);
    setFeedback({ ...updated });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FD",
        padding: "1.5rem 1rem 4rem",
        fontFamily: "var(--sans)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            border: "none",
            background: "transparent",
            color: "#5B5FDE",
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: "pointer",
            padding: "0.5rem 0",
            marginBottom: "1rem",
            fontFamily: "var(--sans)",
          }}
        >
          ← Back to Adventure Map
        </button>

        {/* Hero Section */}
        <div
          style={{
            background: `linear-gradient(135deg, ${color}, ${
              color === "#FFC700" ? "#FFD84D" : `${color}CC`
            })`,
            borderRadius: "28px",
            padding: "2rem",
            color:
              color === "#FFC700" ? "#08060D" : "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 12px 30px ${color}35`,
            marginBottom: "1.5rem",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              right: "-45px",
              top: "-45px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.10)",
              left: "-30px",
              bottom: "-30px",
            }}
          />

          {/* Module Number */}
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background:
                color === "#FFC700"
                  ? "rgba(255,255,255,0.75)"
                  : "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1.2rem",
              marginBottom: "1rem",
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--heading)",
            }}
          >
            {moduleIndex + 1}
          </div>

          <div
            style={{
              fontSize: "3rem",
              marginBottom: "0.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {icon}
          </div>

          <h1
            style={{
              margin: "0 0 0.5rem",
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: "1.2",
              padding: "0.1em 0",
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--heading)",
            }}
          >
            {module.title}
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "1rem",
              opacity: 0.9,
              fontWeight: 600,
              position: "relative",
              zIndex: 1,
            }}
          >
            {module.topic}
          </p>
        </div>

        {/* Learning Content */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "1.5rem",
            boxShadow: "0 8px 24px rgba(91, 95, 222, 0.08)",
            border: "2px solid #EEF0FF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.3rem",
            }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "#FFF4CC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              💡
            </span>

            <h2
              style={{
                margin: 0,
                color: "#08060D",
                fontSize: "1.3rem",
                fontWeight: 800,
                fontFamily: "var(--heading)",
              }}
            >
              Let's Learn!
            </h2>
          </div>

          {/* Content blocks */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {module.content.map((block, i) => (
              <div
                key={i}
                style={{
                  background:
                    i % 2 === 0 ? "#F8F9FD" : "#FFFDF4",
                  borderRadius: "18px",
                  padding: "1rem 1.1rem",
                  borderLeft: `5px solid ${
                    colors[i % colors.length]
                  }`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.8rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      minWidth: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: colors[i % colors.length],
                      color:
                        colors[i % colors.length] === "#FFC700"
                          ? "#08060D"
                          : "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      fontFamily: "var(--heading)",
                    }}
                  >
                    {i + 1}
                  </span>

                  <p
                    style={{
                      margin: 0,
                      color: "#4F4A58",
                      lineHeight: 1.7,
                      fontSize: "0.98rem",
                    }}
                  >
                    {block}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Completion Section */}
          <div
            style={{
              marginTop: "1.8rem",
              paddingTop: "1.5rem",
              borderTop: "2px solid #F0F0F5",
              textAlign: "center",
            }}
          >
            {isCompleted ? (
              <div
                style={{
                  background: "#E9F9EF",
                  border: "2px solid #2ECC71",
                  borderRadius: "18px",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    marginBottom: "0.3rem",
                  }}
                >
                  🎉
                </div>

                <div
                  style={{
                    color: "#1E8449",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    fontFamily: "var(--heading)",
                  }}
                >
                  Adventure Completed!
                </div>

                <p
                  style={{
                    margin: "0.4rem 0 0",
                    color: "#4F7A5A",
                    fontSize: "0.9rem",
                  }}
                >
                  Great job, Explorer! You unlocked the next
                  adventure. 🚀
                </p>

                <button
                  onClick={() => navigate("/")}
                  style={{
                    marginTop: "1rem",
                    padding: "0.7rem 1.4rem",
                    border: "none",
                    borderRadius: "999px",
                    background: "#2ECC71",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--sans)",
                  }}
                >
                  Continue Adventure →
                </button>
              </div>
            ) : (
              <>
                <p
                  style={{
                    color: "#6B6375",
                    marginBottom: "1rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Finished learning this adventure?
                </p>

                <button
                  onClick={handleComplete}
                  style={{
                    width: "100%",
                    maxWidth: "360px",
                    padding: "1rem 1.5rem",
                    borderRadius: "999px",
                    border: "none",
                    background: "#FFC700",
                    color: "#08060D",
                    fontWeight: 800,
                    fontSize: "1rem",
                    cursor: "pointer",
                    fontFamily: "var(--sans)",
                    boxShadow:
                      "0 8px 18px rgba(255,199,0,0.3)",
                    transition:
                      "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-3px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 22px rgba(255,199,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 18px rgba(255,199,0,0.3)";
                  }}
                >
                  ⭐ Mark Adventure as Complete
                </button>
              </>
            )}
          </div>

          {/* Feedback Section */}
          <div
            style={{
              marginTop: "1.5rem",
              paddingTop: "1.5rem",
              borderTop: "2px solid #F0F0F5",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#08060D",
                fontWeight: 800,
                fontSize: "1rem",
                marginBottom: "1rem",
                fontFamily: "var(--heading)",
              }}
            >
              How did this adventure make you feel?
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.8rem",
                flexWrap: "wrap",
              }}
            >
              {FEEDBACK_OPTIONS.map((option) => {
                const isSelected = selectedFeedback === option.emoji;
                return (
                  <button
                    key={option.emoji}
                    onClick={() => handleFeedback(option.emoji)}
                    title={option.label}
                    aria-label={option.label}
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "20px",
                      border: isSelected
                        ? "3px solid #5B5FDE"
                        : "2px solid #EEF0FF",
                      background: isSelected ? "#EEF0FF" : "#FFFFFF",
                      fontSize: "1.8rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: isSelected
                        ? "scale(1.1)"
                        : "scale(1)",
                      boxShadow: isSelected
                        ? "0 8px 18px rgba(91, 95, 222, 0.25)"
                        : "0 4px 10px rgba(0,0,0,0.04)",
                      transition:
                        "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.transform = "scale(1.06)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}
                  >
                    {option.emoji}
                  </button>
                );
              })}
            </div>

            {selectedFeedback && (
              <p
                style={{
                  marginTop: "0.9rem",
                  color: "#6B6375",
                  fontSize: "0.85rem",
                }}
              >
                Thanks for sharing how you feel! 💜
              </p>
            )}
          </div>
        </div>

        {/* Bottom encouragement */}
        <div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#6B6375",
            fontSize: "0.85rem",
          }}
        >
          🌟 Every right you learn makes you a stronger Explorer!
        </div>
      </div>
    </div>
  );
}

export default ModuleDetails;