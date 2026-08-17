import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { modules } from "../data/modules";
import ModuleCard from "../components/ModuleCard";
import ProgressBar from "../components/ProgressBar";
import { getCompletedModules, isModuleUnlocked } from "../utils/progress";

function LearningModules() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setCompleted(getCompletedModules());
  }, []);

  const percent =
    modules.length > 0
      ? Math.round((completed.length / modules.length) * 100)
      : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FD",
        padding: "2rem 1rem 4rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#FFF4CC",
            color: "#5B5FDE",
            padding: "0.45rem 1rem",
            borderRadius: "999px",
            fontSize: "0.85rem",
            fontWeight: 700,
            marginBottom: "0.8rem",
          }}
        >
          🌟 YOUR LEARNING ADVENTURE
        </div>

        <h1
          style={{
            margin: "0",
            color: "#5B5FDE",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
          }}
        >
          Explore Your Rights!
        </h1>

        <p
          style={{
            margin: "0.7rem auto 1.8rem",
            maxWidth: "600px",
            color: "#6B6375",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Complete each adventure to unlock the next one and become a
          Child Rights Explorer! 🚀
        </p>

        {/* Progress Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "1.3rem 1.5rem",
            marginBottom: "3rem",
            boxShadow: "0 8px 24px rgba(91, 95, 222, 0.10)",
            border: "2px solid #EEF0FF",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                color: "#08060D",
                fontWeight: 700,
              }}
            >
              🏆 Your Progress
            </span>

            <span
              style={{
                background: "#E9F9EF",
                color: "#1E8449",
                padding: "0.3rem 0.7rem",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 700,
              }}
            >
              {percent}%
            </span>
          </div>

          <ProgressBar
            percent={percent}
            label={`${completed.length} of ${modules.length} modules completed`}
          />
        </div>
      </div>

      {/* Adventure Map */}
      <div
        style={{
          position: "relative",
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        {/* Connecting line */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            bottom: "20px",
            left: "50%",
            width: "6px",
            transform: "translateX(-50%)",
            background:
              "linear-gradient(to bottom, #5B5FDE, #FFC700, #2ECC71, #FF6B6B)",
            borderRadius: "999px",
            opacity: 0.25,
            zIndex: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {modules.map((module, index) => {
            const unlocked = isModuleUnlocked(
              index,
              completed,
              modules
            );

            return (
              <div
                key={module.id}
                style={{
                  display: "flex",
                  justifyContent:
                    index % 2 === 0 ? "flex-start" : "flex-end",
                  width: "100%",
                }}
              >
                <ModuleCard
                  module={module}
                  index={index}
                  locked={!unlocked}
                  completed={completed.includes(module.id)}
                  onClick={() =>
                    navigate(`/module/${module.id}`)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom message */}
      <div
        style={{
          textAlign: "center",
          marginTop: "3rem",
          color: "#6B6375",
          fontSize: "0.9rem",
        }}
      >
        ⭐ Keep learning — every module makes you stronger!
      </div>
    </div>
  );
}

export default LearningModules;