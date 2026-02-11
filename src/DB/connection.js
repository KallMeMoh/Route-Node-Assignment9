import mongoose from 'mongoose';
import { MONGODB_URI } from '../../config/config.service';

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log({
      message: 'DB connection error',
      error,
    });
  }
}
