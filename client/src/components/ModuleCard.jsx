import {
  Lock,
  Check,
  ArrowRight,
  BookOpen,
} from "lucide-react";

function ModuleCard({
  module,
  index = 0,
  onClick,
  locked = false,
  completed = false,
}) {
  const colors = [
    {
      main: "#4f46e5",
      light: "#eef2ff",
    },
    {
      main: "#f59e0b",
      light: "#fffbeb",
    },
    {
      main: "#10b981",
      light: "#ecfdf5",
    },
    {
      main: "#f43f5e",
      light: "#fff1f2",
    },
  ];

  const color = colors[index % colors.length];

  return (
    <button
      type="button"
      className={`module-card ${locked ? "module-card-locked" : ""}`}
      onClick={locked ? undefined : onClick}
      disabled={locked}
      style={{
        "--module-color": color.main,
        "--module-light": color.light,
      }}
    >
      {/* Decorative circle */}
      <div className="module-card-decoration" />

      {/* Top row */}
      <div className="module-card-top">
        <div className="module-number">
          {index + 1}
        </div>

        {completed && (
          <div className="module-status completed">
            <Check size={16} strokeWidth={3} />
          </div>
        )}

        {locked && (
          <div className="module-status locked">
            <Lock size={15} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Icon */}
      <div className="module-icon">
        <BookOpen size={24} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="module-card-content">
        <h3>{module.title}</h3>

        <p>{module.topic}</p>
      </div>

      {/* Bottom action */}
      <div className="module-card-footer">
        <span>
          {completed
            ? "Adventure completed"
            : locked
            ? "Complete the previous module"
            : "Start adventure"}
        </span>

        {!locked && (
          <ArrowRight size={18} strokeWidth={2.5} />
        )}
      </div>
    </button>
  );
}

export default ModuleCard;