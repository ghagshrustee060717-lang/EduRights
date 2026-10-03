import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Calendar,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { loginUser, registerUser } from "../services/api";
import { AVATARS } from "../utils/avatars";

function AuthModal({ isOpen, initialMode = "login", onClose, onSuccess }) {
  const { login, register } = useAuth();

  const [mode, setMode] = useState(initialMode);

  const [name, setName] = useState("");
  const [age, setAge] = useState("10");
  const [language, setLanguage] = useState("en");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]?.id || "");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) {
    return null;
  }

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await loginUser(email.trim(), password);

      login(response);

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name or nickname.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
        age: Number(age),
        language,
        avatar: selectedAvatar,
        role: "child",
      });

      register(response);

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(15, 23, 42, 0.68)",
        backdropFilter: "blur(6px)",
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          maxHeight: "92vh",
          overflowY: "auto",
          background: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 24px 70px rgba(15, 23, 42, 0.28)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            padding: "28px 28px 24px",
            color: "#ffffff",
            borderRadius: "24px 24px 0 0",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.16)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <Sparkles size={22} />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              EduRights
            </span>
          </div>

          <h2
            style={{
              fontSize: "25px",
              fontWeight: 800,
              marginBottom: "5px",
            }}
          >
            {mode === "login"
              ? "Welcome back! 👋"
              : "Start your adventure! 🚀"}
          </h2>

          <p
            style={{
              fontSize: "14px",
              opacity: 0.88,
            }}
          >
            {mode === "login"
              ? "Continue learning about your rights."
              : "Create your account and begin learning."}
          </p>
        </div>

        {/* Login / Register tabs */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            margin: "20px 24px 0",
            padding: "5px",
            background: "#f1f5f9",
            borderRadius: "12px",
          }}
        >
          <button
            type="button"
            onClick={() => switchMode("login")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "9px",
              background: mode === "login" ? "#ffffff" : "transparent",
              color: mode === "login" ? "#4f46e5" : "#64748b",
              fontWeight: 700,
              boxShadow:
                mode === "login"
                  ? "0 2px 8px rgba(15,23,42,0.08)"
                  : "none",
            }}
          >
            Log In
          </button>

          <button
            type="button"
            onClick={() => switchMode("register")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "9px",
              background: mode === "register" ? "#ffffff" : "transparent",
              color: mode === "register" ? "#4f46e5" : "#64748b",
              fontWeight: 700,
              boxShadow:
                mode === "register"
                  ? "0 2px 8px rgba(15,23,42,0.08)"
                  : "none",
            }}
          >
            Register
          </button>
        </div>

        <form
          onSubmit={mode === "login" ? handleLogin : handleRegister}
          style={{
            padding: "20px 24px 26px",
          }}
        >
          {/* Registration-only fields */}
          {mode === "register" && (
            <>
              {/* Name */}
              <div style={{ marginBottom: "14px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "7px",
                    color: "#334155",
                  }}
                >
                  Name / Nickname
                </label>

                <div style={{ position: "relative" }}>
                  <User
                    size={18}
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8",
                    }}
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 40px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>

              {/* Age + Language */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      marginBottom: "7px",
                      color: "#334155",
                    }}
                  >
                    Age
                  </label>

                  <div style={{ position: "relative" }}>
                    <Calendar
                      size={17}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#94a3b8",
                      }}
                    />

                    <input
                      type="number"
                      min="6"
                      max="18"
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 12px 12px 38px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      marginBottom: "7px",
                      color: "#334155",
                    }}
                  >
                    Language
                  </label>

                  <div style={{ position: "relative" }}>
                    <Globe
                      size={17}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#94a3b8",
                      }}
                    />

                    <select
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 12px 12px 38px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        background: "#ffffff",
                      }}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Avatar selection */}
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "9px",
                    color: "#334155",
                  }}
                >
                  Choose your avatar
                </label>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "8px",
                  }}
                >
                  {AVATARS.map((avatar) => {
                    const selected = selectedAvatar === avatar.id;

                    return (
                      <button
                        type="button"
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        title={avatar.name}
                        style={{
                          padding: "10px 5px",
                          borderRadius: "12px",
                          background: avatar.bg,
                          border: selected
                            ? `3px solid ${avatar.border}`
                            : "2px solid transparent",
                          boxShadow: selected
                            ? "0 3px 10px rgba(15,23,42,0.12)"
                            : "none",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "28px",
                            lineHeight: 1,
                            marginBottom: "5px",
                          }}
                        >
                          {avatar.emoji}
                        </div>

                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#475569",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {avatar.name.split(" ")[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "7px",
                color: "#334155",
              }}
            >
              Email
            </label>

            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "13px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 40px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "7px",
                color: "#334155",
              }}
            >
              Password
            </label>

            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "13px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimum 6 characters"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 40px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                marginBottom: "14px",
                padding: "11px 13px",
                borderRadius: "10px",
                background: "#fff1f2",
                border: "1px solid #fecdd3",
                color: "#be123c",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "13px 16px",
              borderRadius: "11px",
              background: submitting
                ? "#a5b4fc"
                : "linear-gradient(135deg, #4f46e5, #6366f1)",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 800,
              boxShadow: "0 8px 18px rgba(79,70,229,0.22)",
            }}
          >
            {submitting
              ? "Please wait..."
              : mode === "login"
              ? "Log In"
              : "Create Account"}

            {!submitting && <ArrowRight size={18} />}
          </button>

          {/* Bottom switch */}
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() =>
                switchMode(mode === "login" ? "register" : "login")
              }
              style={{
                background: "transparent",
                color: "#4f46e5",
                fontWeight: 800,
                padding: 0,
              }}
            >
              {mode === "login" ? "Register" : "Log In"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;