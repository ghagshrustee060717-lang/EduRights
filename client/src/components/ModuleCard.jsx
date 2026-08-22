function ModuleCard({
  module,
  index = 0,
  onClick,
  locked = false,
  completed = false,
}) {
  const colors = [
    "#5B5FDE",
    "#FFC700",
    "#2ECC71",
    "#FF6B6B",
  ];

  const color = colors[index % colors.length];

  return (
    <div
      onClick={locked ? undefined : onClick}
      style={{
        position: "relative",
        width: "min(100%, 360px)",
        minHeight: "170px",
        boxSizing: "border-box",
        background: locked ? "#E8E8EC" : "#FFFFFF",
        borderRadius: "24px",
        padding: "1.5rem",
        cursor: locked ? "not-allowed" : "pointer",
        opacity: locked ? 0.7 : 1,
        border: `3px solid ${locked ? "#D2D2D7" : color}`,
        boxShadow: locked
          ? "0 4px 10px rgba(0,0,0,0.04)"
          : `0 10px 25px ${color}22`,
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!locked) {
          e.currentTarget.style.transform =
            "translateY(-6px) scale(1.02)";

          e.currentTarget.style.boxShadow =
            `0 16px 30px ${color}35`;
        }
      }}
      onMouseLeave={(e) => {
        if (!locked) {
          e.currentTarget.style.transform =
            "translateY(0) scale(1)";

          e.currentTarget.style.boxShadow =
            `0 10px 25px ${color}22`;
        }
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background: locked ? "#D9D9DE" : `${color}18`,
          right: "-25px",
          bottom: "-30px",
        }}
      />

      {/* Module number */}
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: locked ? "#C8C8CD" : color,
          color:
            color === "#FFC700" && !locked
              ? "#08060D"
              : "#FFFFFF",
          fontWeight: 800,
          fontSize: "1rem",
          marginBottom: "1rem",
          fontFamily: "var(--heading)",
        }}
      >
        {index + 1}
      </div>

      {/* Completed badge */}
      {completed && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#2ECC71",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            boxShadow: "0 4px 10px rgba(46,204,113,0.25)",
          }}
        >
          ✓
        </div>
      )}

      {/* Locked badge */}
      {locked && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#D2D2D7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
          }}
        >
          🔒
        </div>
      )}

      {/* Content */}
      <h3
        style={{
          margin: "0 0 0.4rem",
          color: locked ? "#77747D" : "#08060D",
          fontSize: "1.25rem",
          fontWeight: 800,
          fontFamily: "var(--heading)",
        }}
      >
        {module.title}
      </h3>

      <p
        style={{
          margin: 0,
          color: locked ? "#8A8790" : "#6B6375",
          fontSize: "0.95rem",
          lineHeight: 1.5,
        }}
      >
        {module.topic}
      </p>

      {/* Bottom status */}
      <div
        style={{
          marginTop: "1rem",
          fontSize: "0.82rem",
          fontWeight: 700,
          color: completed
            ? "#1E8449"
            : locked
            ? "#77747D"
            : color,
        }}
      >
        {completed
          ? "✓ Adventure completed"
          : locked
          ? "🔒 Complete the previous module"
          : "▶ Start adventure"}
      </div>
    </div>
  );
}

export default ModuleCard;