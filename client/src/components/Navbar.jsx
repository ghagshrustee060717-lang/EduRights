import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Home,
  Shield,
} from "lucide-react";

function Navbar() {
  const location = useLocation();

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

  return (
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

        {/* Navigation */}
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
      </div>
    </nav>
  );
}

export default Navbar;