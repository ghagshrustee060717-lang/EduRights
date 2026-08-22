import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Learning Modules", icon: "🗺️" },
    { to: "/knowledge-hub", label: "Knowledge Hub", icon: "📚" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#FFFFFF",
        borderBottom: "1px solid #EEF0FF",
        boxShadow: "0 4px 16px rgba(91, 95, 222, 0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0.9rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Logo / wordmark */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #5B5FDE, #7B7FF0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              boxShadow: "0 6px 14px rgba(91, 95, 222, 0.3)",
              flexShrink: 0,
            }}
          >
            🛡️
          </span>
          <span
            style={{
              fontFamily: "var(--heading)",
              fontWeight: 800,
              fontSize: "1.35rem",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#08060D" }}>Edu</span>
            <span style={{ color: "#5B5FDE" }}>Rights</span>
          </span>
        </Link>

        {/* Nav tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            background: "#F8F9FD",
            padding: "0.35rem",
            borderRadius: "999px",
            border: "1px solid #EEF0FF",
          }}
        >
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.55rem 1.1rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontFamily: "var(--sans)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  background: active ? "#5B5FDE" : "transparent",
                  color: active ? "#FFFFFF" : "#6B6375",
                  boxShadow: active
                    ? "0 6px 14px rgba(91, 95, 222, 0.35)"
                    : "none",
                  transition: "all 0.18s ease",
                }}
              >
                <span>{link.icon}</span>
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