function ProgressBar({ percent = 0, label }) {
  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      {label && (
        <p
          style={{
            marginBottom: "6px",
            fontSize: "0.9rem",
            color: "#6b6375",
            fontWeight: 700,
            fontFamily: "var(--sans)",
          }}
        >
          {label}
        </p>
      )}
      <div
        style={{
          background: "#E5E4E7",
          borderRadius: "999px",
          height: "16px",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #5B5FDE, #2ECC71)",
            height: "100%",
            borderRadius: "999px",
            transition: "width 0.5s ease",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.35), transparent)",
              width: "40%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;