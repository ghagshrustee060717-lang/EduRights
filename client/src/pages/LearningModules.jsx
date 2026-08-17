import { useNavigate } from "react-router-dom";
import { modules } from "../data/modules";
import ModuleCard from "../components/ModuleCard";

function LearningModules() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Learning Modules</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onClick={() => navigate(`/module/${module.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default LearningModules;