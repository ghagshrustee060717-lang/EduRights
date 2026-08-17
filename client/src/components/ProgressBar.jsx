function ProgressBar({ percent = 0 }) {
  return (
    <div style={{ background: "#eee", borderRadius: "8px", height: "10px", width: "100%" }}>
      <div
        style={{
          width: `${percent}%`,
          background: "#4caf50",
          height: "100%",
          borderRadius: "8px"
        }}
      />
    </div>
  );
}

export default ProgressBar;