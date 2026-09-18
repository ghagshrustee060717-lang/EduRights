function ProgressBar({ percent = 0, label }) {
  const safePercent = Math.min(
    100,
    Math.max(0, percent)
  );

  return (
    <div className="progress-wrapper">
      {label && (
        <div className="progress-label">
          <span>{label}</span>
          <strong>{safePercent}%</strong>
        </div>
      )}

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${safePercent}%`,
          }}
        >
          <div className="progress-shine" />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;