import { useParams, useNavigate } from "react-router-dom";
import { modules } from "../data/modules";

function ModuleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const module = modules.find((m) => m.id === id);

  if (!module) return <p>Module not found.</p>;

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-sm font-semibold"
        style={{ color: "#5B5FDE" }}
      >
        ← Back to modules
      </button>
      <div className="rounded-2xl bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">{module.title}</h2>
        {module.content.map((block, i) => (
          <p key={i} className="mb-3 text-gray-700">{block}</p>
        ))}
      </div>
    </div>
  );
}

export default ModuleDetails;