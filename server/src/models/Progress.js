import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    moduleId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: '',
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPossibleScore: {
      type: Number,
      default: 100,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'completed',
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Progress || mongoose.model('Progress', progressSchema);
