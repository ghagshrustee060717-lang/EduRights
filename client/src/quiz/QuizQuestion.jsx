import React from "react";
import { Check } from "lucide-react";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

const readOption = (option) => {
  if (typeof option === "string") {
    return { value: option, label: option };
  }

  if (!option || typeof option !== "object") {
    return { value: "", label: "" };
  }

  const value = option.value ?? option.id ?? option.text ?? option.label ?? "";
  const label = option.label ?? option.text ?? String(value);

  return { value, label };
};

const QuizQuestion = ({ question, selectedAnswer, onSelectAnswer }) => {
  if (!question) return null;

  const prompt =
    question.questionText ??
    question.text ??
    question.question ??
    question.title ??
    "";

  const options = Array.isArray(question.options)
    ? question.options
    : Array.isArray(question.choices)
      ? question.choices
      : [];

  return (
    <section className="eq-question-block" aria-label="Quiz question">
      <div className="eq-question">
        <h2>{prompt}</h2>
        {question.hint && <p>{question.hint}</p>}
      </div>

      {options.length > 0 ? (
        <div className="eq-options" role="radiogroup" aria-label={prompt}>
          {options.map((option, index) => {
            const { value, label } = readOption(option);
            const picked = selectedAnswer === value;

            return (
              <button
                key={`${String(value)}-${index}`}
                type="button"
                role="radio"
                aria-checked={picked}
                className={`eq-option${picked ? " is-picked" : ""}`}
                onClick={() => onSelectAnswer(value)}
                disabled={!value}
              >
                <span className="eq-option-key" aria-hidden="true">
                  {LETTERS[index] ?? index + 1}
                </span>
                <span className="eq-option-body">{label}</span>
                <span className="eq-option-tick" aria-hidden="true">
                  <Check size={13} strokeWidth={3.5} />
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="eq-foot-status" role="alert">
          No answer options are available for this question.
        </p>
      )}
    </section>
  );
};

export default QuizQuestion;
