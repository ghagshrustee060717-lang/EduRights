import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name/nickname'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    age: {
      type: Number,
      min: [6, 'Target age is 6-18'],
      max: [18, 'Target age is 6-18'],
      default: 10,
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'hi', 'es', 'fr'],
    },
    avatar: {
      type: String,
      default: 'superhero-aarav',
    },
    role: {
      type: String,
      enum: ['child', 'parent', 'educator', 'admin'],
      default: 'child',
    },
    // Gamification state attached to user profile (Person A shell + Person C sync)
    currentLevel: {
      type: Number,
      default: 1,
    },
    levelTitle: {
      type: String,
      default: 'Level 1 Beginner',
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    nextLevelPoints: {
      type: Number,
      default: 500,
    },
    streakDays: {
      type: Number,
      default: 7,
    },
    badgesEarned: [
      {
        badgeId: String,
        name: String,
        icon: String,
        description: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    completedModules: [
      {
        moduleId: String,
        title: String,
        score: Number,
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Method to verify password against bcrypt hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Method to return public safe profile (strips passwordHash)
userSchema.methods.toProfileJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    age: this.age,
    language: this.language,
    avatar: this.avatar,
    role: this.role,
    currentLevel: this.currentLevel,
    levelTitle: this.levelTitle,
    totalPoints: this.totalPoints,
    nextLevelPoints: this.nextLevelPoints,
    streakDays: this.streakDays,
    badgesEarned: this.badgesEarned,
    completedModules: this.completedModules,
    createdAt: this.createdAt,
  };
};

export default mongoose.models.User || mongoose.model('User', userSchema);
