import React from "react";

const gradeCopy = (percent) => {
  if (percent >= 90) {
    return { title: "Excellent work", note: "You've got this topic down." };
  }

  if (percent >= 70) {
    return { title: "Well done", note: "A strong result — a few to polish." };
  }

  if (percent >= 50) {
    return { title: "Good effort", note: "Review the module and try once more." };
  }

  return {
    title: "Keep going",
    note: "Go back through the lesson, then retake it.",
  };
};

const QuizResult = ({ result, total, onRetry, onExit }) => {
  if (!result) return null;

  const totalQuestions = Number(total) || 0;
  const correct = Number(result.correctAnswers) || 0;

  const percent = Number.isFinite(Number(result.percentage))
    ? Number(result.percentage)
    : totalQuestions > 0
      ? Math.round((correct / totalQuestions) * 100)
      : 0;

  // The EduRights backend returns the earned quiz points as `score`.
  const points =
    Number(result.score) ||
    Number(result.pointsEarned) ||
    Number(result.xp) ||
    0;

  const missed = Math.max(totalQuestions - correct, 0);
  const copy = gradeCopy(percent);

  return (
    <div className="eq-result">
      <div className="eq-result-top">
        <strong className="eq-result-score">
          {percent}
          <small>%</small>
        </strong>
        <h2>{copy.title}</h2>
        <p>{copy.note}</p>
      </div>

      <div className="eq-result-body">
        <div className="eq-result-stats">
          <div className="eq-result-stat">
            <strong>{correct}</strong>
            <span>Correct</span>
          </div>

          <div className="eq-result-stat">
            <strong>{missed}</strong>
            <span>Missed</span>
          </div>

          <div className="eq-result-stat">
            <strong>{points}</strong>
            <span>XP earned</span>
          </div>
        </div>

        <div style={{
          marginTop: '1.25rem',
          padding: '0.85rem 1rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(245, 158, 11, 0.1) 100%)',
          border: '1px solid rgba(79, 70, 229, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          color: '#312e81',
          fontSize: '0.9rem',
          fontWeight: '700',
        }}>
          <span>⚡ Your points and badge progress have been saved to your dashboard!</span>
        </div>

        <div className="eq-result-actions" style={{ marginTop: '1.5rem' }}>
          <button type="button" className="eq-btn eq-btn-primary" onClick={onExit}>
            View in Dashboard Progress
          </button>

          <button type="button" className="eq-btn eq-btn-ghost" onClick={onRetry}>
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
