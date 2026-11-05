
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
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

function Navbar({ onOpenAuth, onNavigateDashboard }) {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

 const openLogin = () => {
  if (onOpenAuth) {
    onOpenAuth("login");
    return;
  }
  setAuthMode("login");
  setAuthModalOpen(true);
};

const openRegister = () => {
  if (onOpenAuth) {
    onOpenAuth("register");
    return;
  }
  setAuthMode("register");
  setAuthModalOpen(true);
};

 const links = [
  { to: "/", label: "Learning", icon: Home },
  { to: "/quiz", label: "Take Quiz", icon: Trophy },
  { to: "/knowledge-hub", label: "Knowledge Hub", icon: BookOpen },
  { to: "/progress", label: "My Progress", icon: Trophy },
];
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <Shield size={22} strokeWidth={2.5} />
            </div>
            <span className="navbar-brand">
              <span>Edu</span>
              <strong>Rights</strong>
            </span>
          </Link>

          {isAuthenticated && (
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
          )}

          <div className="navbar-auth-actions">
            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  className="navbar-auth-button navbar-auth-login"
                  onClick={openLogin}
                >
                  <LogIn size={16} /> Log In
                </button>
                <button
                  type="button"
                  className="navbar-auth-button navbar-auth-start"
                  onClick={openRegister}
                >
                  <UserPlus size={16} /> Get Started
                </button>
              </>
            ) : (
              <>
                <Link to="/progress">
                  {user?.name || "Explorer"}
                </Link>
                <button type="button" onClick={logout} title="Log out">
                  <LogOut size={17} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
