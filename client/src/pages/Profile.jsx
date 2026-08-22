import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const badges = getBadges(completed, feedback, modules);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FD",
        padding: "1.5rem 1rem 4rem",
        fontFamily: "var(--sans)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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

        {/* Hero */}
        <div
          style={{
            background: "linear-gradient(135deg, #5B5FDE, #7B7FF0)",
            borderRadius: "28px",
            padding: "2rem",
            color: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 12px 30px #5B5FDE35",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
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

          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.4rem",
              margin: "0 auto 1rem",
              position: "relative",
              zIndex: 1,
              border: "3px solid rgba(255,255,255,0.4)",
            }}
          >
            🧭
          </div>

          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              opacity: 0.85,
              marginBottom: "0.3rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            LEVEL {levelInfo.level}
          </div>

          <h1
            style={{
              margin: "0 0 0.6rem",
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
              fontWeight: 800,
              lineHeight: "1.2",
              padding: "0.1em 0",
              fontFamily: "var(--heading)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {levelInfo.title}
          </h1>

          <div
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              opacity: 0.9,
              position: "relative",
              zIndex: 1,
            }}
          >
            ⚡ {levelInfo.currentXP} XP
          </div>

          {/* XP progress bar */}
          <div
            style={{
              maxWidth: "360px",
              margin: "1.2rem auto 0",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.25)",
                borderRadius: "999px",
                height: "14px",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${levelInfo.progressPercent}%`,
                  background: "#FFC700",
                  height: "100%",
                  borderRadius: "999px",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
            <p
              style={{
                margin: "0.5rem 0 0",
                fontSize: "0.8rem",
                fontWeight: 600,
                opacity: 0.9,
              }}
            >
              {levelInfo.isMaxLevel
                ? "🎉 Max level reached!"
                : `${levelInfo.nextLevelXP - levelInfo.currentXP} XP to reach ${levelInfo.nextLevelTitle}`}
            </p>
          </div>
        </div>

        {/* Badges Section */}
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
              justifyContent: "space-between",
              marginBottom: "1.3rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
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
                🎖️
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
                Badges
              </h2>
            </div>

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
              {unlockedCount} / {badges.length}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
            }}
          >
            {badges.map((badge) => (
              <div
                key={badge.id}
                style={{
                  background: badge.unlocked ? "#F8F9FD" : "#F3F3F5",
                  border: `2px solid ${badge.unlocked ? "#EEF0FF" : "#E5E4E7"}`,
                  borderRadius: "18px",
                  padding: "1.1rem",
                  textAlign: "center",
                  opacity: badge.unlocked ? 1 : 0.55,
                }}
              >
                <div
                  style={{
                    fontSize: "2.2rem",
                    marginBottom: "0.5rem",
                    filter: badge.unlocked ? "none" : "grayscale(100%)",
                  }}
                >
                  {badge.unlocked ? badge.icon : "🔒"}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    color: "#08060D",
                    marginBottom: "0.3rem",
                    fontFamily: "var(--heading)",
                  }}
                >
                  {badge.label}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#6B6375",
                    lineHeight: 1.4,
                  }}
                >
                  {badge.description}
                </div>
              </div>
            ))}
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
          🌟 Keep exploring to earn more XP and unlock every badge!
        </div>
      </div>
    </div>
  );
}

export default Profile;