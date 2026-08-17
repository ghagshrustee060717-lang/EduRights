function ProgressBar({ percent = 0, label }) {
  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto 2rem" }}>
      {label && (
        <p style={{ marginBottom: "6px", fontSize: "0.9rem", color: "#6b6375", fontWeight: 600 }}>
          {label}
        </p>
      )}
      <div
        style={{
          background: "#e5e4e7",
          borderRadius: "999px",
          height: "14px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            background: "#2ECC71",
            height: "100%",
            borderRadius: "999px",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;