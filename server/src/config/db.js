import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<username>')) {
    console.log('ℹ️  No external MongoDB URI configured. Operating in high-speed resilient in-memory mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB connection skipped (${error.message}). Falling back to local in-memory store for seamless evaluation.`);
    return false;
  }
};
