
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import AuthModal from "./components/AuthModal";
import QuizPage from "./quiz/QuizPage";

import Navbar from "./components/Navbar";
import LearningModules from "./pages/LearningModules";
import ModuleDetails from "./pages/ModuleDetails";
import KnowledgeHub from "./pages/KnowledgeHub";
import Profile from "./pages/Profile";
import { modules } from "./data/modules";

import "./App.css";

function ModuleQuizRoute({ onExit }) {
  const { moduleId } = useParams();
  const module = modules.find((item) => item.id === moduleId);

  return (
    <QuizPage
      moduleId={moduleId}
      moduleTitle={module?.title || "Learning Adventure"}
      onExit={onExit}
    />
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#14103e",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            width: "54px",
            height: "54px",
            border: "4px solid rgba(255,255,255,0.1)",
            borderTopColor: "#fbbf24",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />

        <p style={{ marginTop: "1.25rem", fontWeight: "700", color: "#cbd5e1" }}>
          Loading EduRights...
        </p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Learning Modules */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <>
              <Navbar />
              <LearningModules />
            </>
          ) : (
            <>
              <LandingPage
                onOpenAuth={openAuth}
                onNavigateDashboard={() => navigate("/")}
              />
              <AuthModal
                isOpen={authModalOpen}
                initialMode={authMode}
                onClose={() => setAuthModalOpen(false)}
                onSuccess={() => {
                  setAuthModalOpen(false);
                  navigate("/");
                }}
              />
            </>
          )
        }
      />

      <Route path="/welcome" element={<Navigate to="/" replace />} />

      {/* Original Dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardPage
              onNavigateLanding={() => navigate("/")}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Module Details */}
      <Route
        path="/module/:id"
        element={
          isAuthenticated ? (
            <>
              <Navbar />
              <ModuleDetails />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Knowledge Hub */}
      <Route
        path="/knowledge-hub"
        element={
          isAuthenticated ? (
            <>
              <Navbar />
              <KnowledgeHub />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* User Progress / Profile */}
      <Route
        path="/progress"
        element={
          isAuthenticated ? (
            <>
              <Navbar />
              <Profile />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Quiz */}
      <Route
        path="/quiz/:moduleId"
        element={
          isAuthenticated ? (
            <ModuleQuizRoute onExit={() => navigate("/progress")} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/quiz"
        element={
          isAuthenticated ? (
            <QuizPage
              moduleId="m1"
              onExit={() => navigate("/")}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppContent />;
}
