import mongoose from 'mongoose';

const badgeStatusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    badgeId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '🏆',
    },
    description: {
      type: String,
      default: '',
    },
    isUnlocked: {
      type: Boolean,
      default: true,
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BadgeStatus || mongoose.model('BadgeStatus', badgeStatusSchema);
