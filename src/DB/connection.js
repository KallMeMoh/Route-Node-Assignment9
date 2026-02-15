import mongoose from 'mongoose';
import { MONGODB_URI } from '../../config/config.service.js';

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('DB connected successfully');
  } catch (error) {
    console.log({
      message: 'DB connection error',
      error,
    });
  }
}
