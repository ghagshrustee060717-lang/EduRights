import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LearningModules from "./pages/LearningModules";
import ModuleDetails from "./pages/ModuleDetails";
import KnowledgeHub from "./pages/KnowledgeHub";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LearningModules />} />
        <Route path="/module/:id" element={<ModuleDetails />} />
        <Route path="/knowledge-hub" element={<KnowledgeHub />} />
      </Routes>
    </>
  );
}

export default App;