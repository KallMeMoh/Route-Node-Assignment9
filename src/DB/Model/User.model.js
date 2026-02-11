import { model, Schema } from 'mongoose';

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      unique: [true, 'E-msil already in use'],
      required: [true, 'E-mail is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'Age must be at least 18'],
      max: [60, 'Age must be at most 60'],
    },
  },
  {
    timestamps: false,
  },
);

export const UserModel = model('User', UserSchema);
