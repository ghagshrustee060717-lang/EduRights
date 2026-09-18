import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    topic: {
      type: String,
      required: true,
      trim: true
    },

    content: {
      type: [String],
      default: []
    },

    order: {
      type: Number,
      required: true,
      unique: true
    },

    languageVariants: {
      type: Map,
      of: String,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

const Module = mongoose.model("Module", moduleSchema);

export default Module;