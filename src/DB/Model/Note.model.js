import { model, Schema } from 'mongoose';

const NoteSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      validate: {
        validator: (title) => title.toUpperCase() !== title,
        message: 'Title must not be fully uppercase',
      },
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const NoteModel = model('Note', NoteSchema);
