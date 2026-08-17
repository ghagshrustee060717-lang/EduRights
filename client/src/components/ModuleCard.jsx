function ModuleCard({ module, onClick, locked = false }) {
  return (
    <div
      onClick={locked ? undefined : onClick}
      className={`rounded-2xl p-5 w-56 shadow-md transition-transform ${
        locked
          ? "bg-gray-200 opacity-60 cursor-not-allowed"
          : "bg-white cursor-pointer hover:scale-105"
      }`}
      style={{ borderTop: locked ? "none" : "4px solid #5B5FDE" }}
    >
      <h3 className="font-bold text-lg">{module.title}</h3>
      <p className="text-gray-500">{module.topic}</p>
      {locked && <span className="text-sm">🔒 Locked</span>}
    </div>
  );
}

export default ModuleCard;