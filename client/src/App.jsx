import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LearningModules from "./pages/LearningModules";
import ModuleDetails from "./pages/ModuleDetails";
import KnowledgeHub from "./pages/KnowledgeHub";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LearningModules />} />
        <Route path="/module/:id" element={<ModuleDetails />} />
        <Route path="/knowledge-hub" element={<KnowledgeHub />} />
      </Routes>
    </div>
  );
}

export default App;