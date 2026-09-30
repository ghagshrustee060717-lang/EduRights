import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Flame, Zap } from "lucide-react";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import { useAuth } from "../context/AuthContext";
import "./QuizPage.css";

const API = "/api";

const QuizPage = ({ moduleId = "m1", moduleTitle = "Right to Education", onExit }) => {
  const { updateUserGamification, celebrate } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleExit = onExit || (() => {
    if (window.location.pathname === '/quiz') {
      window.location.href = '/';
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  });

  const fetchQuiz = useCallback(async () => {
    if (!moduleId) {
      setQuiz(null);
      setError("A module ID is required to load this quiz.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/quizzes/${moduleId}`);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "We couldn't load this quiz.");
      }

      const loadedQuiz = data.quiz;
      const questions = Array.isArray(loadedQuiz?.questions)
        ? loadedQuiz.questions
        : [];

      if (!loadedQuiz || questions.length === 0) {
        throw new Error("This module does not have any quiz questions yet.");
      }

      setQuiz({ ...loadedQuiz, questions });
      setCurrentQuestion(0);
      setAnswers({});
      setResult(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't load this quiz.");
    } finally {
      setLoading(false);
    }
  }, [moduleId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const questions = Array.isArray(quiz?.questions) ? quiz.questions : [];
  const totalQuestions = questions.length;
  const question = questions[currentQuestion];
  const selectedAnswer = question ? answers[question.id] : undefined;
  const answeredCount = Object.keys(answers).length;
  const isLast = totalQuestions > 0 && currentQuestion === totalQuestions - 1;

  const totalQuizPoints = useMemo(
    () => questions.reduce((sum, item) => sum + (Number(item.points) || 0), 0),
    [questions]
  );

  const selectedPoints = useMemo(
    () =>
      questions.reduce(
        (sum, item) =>
          answers[item.id] ? sum + (Number(item.points) || 0) : sum,
        0
      ),
    [answers, questions]
  );

  const ringSize = 62;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const ringOffset =
    totalQuestions > 0
      ? circumference - (answeredCount / totalQuestions) * circumference
      : circumference;

  const handleSelectAnswer = (answer) => {
    if (!question) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: answer,
    }));
  };

  const handleNext = () => {
    if (selectedAnswer && currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleSubmit = async () => {
    if (!moduleId || !selectedAnswer || submitting) return;

    const token = localStorage.getItem("edurights_token");

    if (!token) {
      setError("Please log in before submitting the quiz.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await fetch(`${API}/quizzes/${moduleId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "We couldn't save your answers.");
      }

      if (data.userProgress) {
        updateUserGamification(data.userProgress);
      } else {
        celebrate();
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't save your answers.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    fetchQuiz();
  };

  /* ---------- loading / error ---------- */

  if (loading) {
    return (
      <div className="eq">
        <div className="eq-center">
          <div className="eq-panel">
            <div className="eq-spinner" />
            <h2>Getting your questions ready</h2>
            <p>This takes just a moment.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="eq">
        <div className="eq-center">
          <div className="eq-panel">
            <h2>This quiz didn't load</h2>
            <p>{error}</p>
            <button type="button" className="eq-btn eq-btn-primary" onClick={fetchQuiz}>
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="eq">
        <div className="eq-center">
          <QuizResult
            result={result}
            total={totalQuestions}
            onRetry={handleRetry}
            onExit={handleExit}
          />
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="eq">
        <div className="eq-center">
          <div className="eq-panel">
            <h2>No question available</h2>
            <p>Please reload the quiz.</p>
            <button type="button" className="eq-btn eq-btn-primary" onClick={fetchQuiz}>
              Reload quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="eq">
      <aside className="eq-rail">
        <button type="button" className="eq-exit" onClick={handleExit}>
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>

        <div className="eq-rail-module">
          <div className="eq-rail-mark" aria-hidden="true">
            🧠
          </div>
          <div>
            <h1>{quiz.title || moduleTitle}</h1>
            <p>{totalQuestions} questions</p>
          </div>
        </div>

        <div className="eq-ring-block">
          <div className="eq-ring-wrap">
            <svg className="eq-ring" width={ringSize} height={ringSize} aria-hidden="true">
              <circle
                className="eq-ring-track"
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
              />
              <circle
                className="eq-ring-fill"
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={ringOffset}
              />
            </svg>
            <span className="eq-ring-value">
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          <div className="eq-ring-text">
            <strong>Answered</strong>
            <span>
              {totalQuestions - answeredCount === 0
                ? "All done — submit when ready"
                : `${totalQuestions - answeredCount} left to go`}
            </span>
          </div>
        </div>

        <ul className="eq-ladder">
          {questions.map((item, index) => {
            const done = Boolean(answers[item.id]);
            const current = index === currentQuestion;

            return (
              <li key={item.id ?? index}>
                <button
                  type="button"
                  className={`eq-rung${done ? " is-done" : ""}${current ? " is-current" : ""}`}
                  onClick={() => setCurrentQuestion(index)}
                  aria-current={current ? "step" : undefined}
                >
                  <span className="eq-rung-index">
                    {done && !current ? <Check size={13} strokeWidth={3} /> : index + 1}
                  </span>
                  <span className="eq-rung-label">Question {index + 1}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="eq-meters">
          <div className="eq-meter">
            <div className="eq-meter-value">
              <Zap size={15} />
              {totalQuizPoints}
            </div>
            <span>XP available</span>
          </div>

          <div className="eq-meter streak">
            <div className="eq-meter-value">
              <Flame size={15} />
              {selectedPoints}
            </div>
            <span>XP selected</span>
          </div>
        </div>
      </aside>

      <main className="eq-stage">
        <div className="eq-stage-inner">
          <div className="eq-head">
            <p className="eq-head-count">
              Question <b>{currentQuestion + 1}</b> of {totalQuestions}
            </p>
            <p className="eq-head-points">
              <Zap size={15} />
              {Number(question.points) || 0} XP
            </p>
          </div>

          <QuizQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
          />

          {error && (
            <p className="eq-foot-status" role="alert">
              {error}
            </p>
          )}

          <div className="eq-foot">
            <button
              type="button"
              className="eq-btn eq-btn-ghost"
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || submitting}
            >
              <ArrowLeft size={17} />
              Previous
            </button>

            <p className={`eq-foot-status${selectedAnswer ? " is-ready" : ""}`}>
              {selectedAnswer ? "Answer saved" : "Pick an answer to continue"}
            </p>

            {isLast ? (
              <button
                type="button"
                className="eq-btn eq-btn-finish"
                onClick={handleSubmit}
                disabled={!selectedAnswer || submitting}
              >
                {submitting ? "Checking answers…" : "See my score"}
              </button>
            ) : (
              <button
                type="button"
                className="eq-btn eq-btn-primary"
                onClick={handleNext}
                disabled={!selectedAnswer || submitting}
              >
                Next question
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
