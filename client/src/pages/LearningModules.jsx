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
        padding: "2.5rem 1rem 4rem",
        fontFamily: "var(--sans)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background blobs */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "-100px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "#5B5FDE",
          opacity: 0.08,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "-120px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#FFC700",
          opacity: 0.12,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-80px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: "#2ECC71",
          opacity: 0.08,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          right: "5%",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "#FF6B6B",
          opacity: 0.08,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#FFF4CC",
            color: "#8A6D00",
            padding: "0.45rem 1.1rem",
            borderRadius: "999px",
            fontSize: "0.85rem",
            fontWeight: 800,
            marginBottom: "1.1rem",
            fontFamily: "var(--sans)",
          }}
        >
          🌟 YOUR LEARNING ADVENTURE
        </div>

        <h1
          style={{
            margin: "0",
            fontFamily: "var(--heading)",
            fontSize: "clamp(2.2rem, 6vw, 3.4rem)",
            fontWeight: 800,
            lineHeight: "1.2",
            padding: "0.15em 0",
            letterSpacing: "-0.02em",
            background:
              "linear-gradient(90deg, #5B5FDE 0%, #7B5FDE 50%, #FF6B6B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
          }}
        >
          Explore Your Rights!
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0.3rem 0 1rem",
          }}
        >
          <svg width="140" height="14" viewBox="0 0 140 14" fill="none">
            <path
              d="M2 10C20 2 35 2 50 8C65 14 80 2 95 6C110 10 122 4 138 8"
              stroke="#FFC700"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p
          style={{
            margin: "0 auto 1.8rem",
            maxWidth: "600px",
            color: "#6B6375",
            fontSize: "1rem",
            lineHeight: 1.6,
            fontFamily: "var(--sans)",
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
            padding: "1.4rem 1.6rem",
            marginBottom: "3rem",
            boxShadow: "0 10px 28px rgba(91, 95, 222, 0.12)",
            border: "2px solid #EEF0FF",
            display: "flex",
            alignItems: "center",
            gap: "1.1rem",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #FFC700, #FFD84D)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
              boxShadow: "0 6px 14px rgba(255, 199, 0, 0.35)",
            }}
          >
            🏆
          </div>

          <div style={{ flex: 1 }}>
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
                  fontWeight: 800,
                  fontFamily: "var(--heading)",
                  fontSize: "1.05rem",
                }}
              >
                Your Progress
              </span>

              <span
                style={{
                  background: "#E9F9EF",
                  color: "#1E8449",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 800,
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
      </div>

      {/* Adventure Map */}
      <div
        style={{
          position: "relative",
          maxWidth: "850px",
          margin: "0 auto",
          zIndex: 1,
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
          fontFamily: "var(--sans)",
          position: "relative",
          zIndex: 1,
        }}
      >
        ⭐ Keep learning — every module makes you stronger!
      </div>
    </div>
  );
}

export default LearningModules;