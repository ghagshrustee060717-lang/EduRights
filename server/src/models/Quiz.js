import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (options) {
          return options.length === 4;
        },
        message: 'Each question must have exactly 4 options',
      },
    },

    correctAnswer: {
    type: String,
    required: true,
    validate: {
        validator: function (answer) {
        return this.options.includes(answer);
        },
        message: 'Correct answer must be one of the provided options',
    },
    },

    points: {
      type: Number,
      default: 10,
      min: 0,
    },
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema(
  {
    moduleId: {
      type: String,
      required: true,
      trim: true,
    },

    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator: function (questions) {
          return questions.length > 0;
        },
        message: 'Quiz must contain at least one question',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);