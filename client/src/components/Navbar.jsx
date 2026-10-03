import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Home,
  Shield,
  LogIn,
  UserPlus,
  LogOut,
  User,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

function Navbar() {
  const location = useLocation();

  const { user, isAuthenticated, logout } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const links = [
    {
      to: "/",
      label: "Learning",
      icon: Home,
    },
    {
      to: "/knowledge-hub",
      label: "Knowledge Hub",
      icon: BookOpen,
    },
    {
      to: "/progress",
      label: "My Progress",
      icon: Trophy,
    },
  ];

  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <Shield size={22} strokeWidth={2.5} />
            </div>

            <span className="navbar-brand">
              <span>Edu</span>
              <strong>Rights</strong>
            </span>
          </Link>

          {/* Main Navigation */}
          <div className="navbar-links">
            {links.map((link) => {
              const Icon = link.icon;

              const active =
                link.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`navbar-link ${
                    active ? "navbar-link-active" : ""
                  }`}
                >
                  <Icon size={18} strokeWidth={2.2} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Authentication Area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {!isAuthenticated ? (
              <>
                {/* Login */}
                <button
                  type="button"
                  onClick={openLogin}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "9px 14px",
                    borderRadius: "10px",
                    background: "transparent",
                    color: "#4f46e5",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: "1px solid #c7d2fe",
                  }}
                >
                  <LogIn size={16} />
                  <span>Log In</span>
                </button>

                {/* Get Started */}
                <button
                  type="button"
                  onClick={openRegister}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg, #4f46e5, #6366f1)",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 800,
                    boxShadow: "0 5px 14px rgba(79,70,229,0.20)",
                  }}
                >
                  <UserPlus size={16} />
                  <span>Get Started</span>
                </button>
              </>
            ) : (
              <>
                {/* Logged-in user */}
                <Link
                  to="/progress"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 11px",
                    borderRadius: "10px",
                    background: "#eef2ff",
                    color: "#4338ca",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ffffff",
                      overflow: "hidden",
                      fontSize: "18px",
                    }}
                  >
                    {user?.avatar === "superhero-aarav"
                      ? "🦸‍♂️"
                      : user?.avatar === "explorer-maya"
                      ? "🧭"
                      : user?.avatar === "tech-leo"
                      ? "🚀"
                      : user?.avatar === "scout-tara"
                      ? "⭐"
                      : "👤"}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      lineHeight: 1.2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Welcome
                    </span>

                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: "#312e81",
                        maxWidth: "110px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user?.name || "Explorer"}
                    </span>
                  </div>
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={logout}
                  title="Log out"
                  style={{
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    background: "#fff1f2",
                    color: "#e11d48",
                  }}
                >
                  <LogOut size={17} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={closeAuthModal}
      />
    </>
  );
}

export default Navbar;