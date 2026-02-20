import mongoose from 'mongoose';
import { NoteModel } from '../../DB/Model/Note.model.js';

export const createNoteService = async (req, res, next) => {
  try {
    await NoteModel.create({ ...req.body, userId: req.userId });

    return res.status(201).json({ message: 'Note created' });
  } catch (error) {
    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    next(error);
  }
};

export const updateNoteService = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.noteId);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (!note.userId.equals(req.userId))
      return res.status(401).json({ message: 'You are not the owner' });

    const { title, content } = req.body;

    note.title = title;
    note.content = content;

    const updatedNote = await note.save();

    return res.status(200).json({ message: 'updated', note: updatedNote });
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    next(error);
  }
};

export const replaceNoteService = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.noteId);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (!note.userId.equals(req.userId))
      return res.status(401).json({ message: 'You are not the owner' });

    const { title, content, userId } = req.body;

    note.title = title;
    note.content = content;
    note.userId = userId;

    const updatedNote = await note.save();

    return res.status(200).json({ message: 'updated', note: updatedNote });
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    next(error);
  }
};

export const updateAllService = async (req, res, next) => {
  try {
    const { modifiedCount } = await NoteModel.updateMany(
      { userId: req.userId },
      {
        $set: {
          title: req.body.title,
        },
      },
      {
        runValidators: true,
      },
    );

    console.log(req.userId, modifiedCount);

    if (modifiedCount === 0)
      return res.status(404).json({ message: 'No note found' });

    return res.status(200).json({ message: 'All notes updated' });
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    next(error);
  }
};

export const deleteNoteService = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (!note.userId.equals(req.userId))
      return res.status(401).json({ message: 'You are not the owner' });

    return res.status(200).json({ message: 'deleted', note });
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    next(error);
  }
};

export const getSortedNotesService = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const notes = await NoteModel.find({ userId: req.userId })
      .sort()
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json(notes);
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    next(error);
  }
};

export const getNoteService = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.noteId);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (!note.userId.equals(req.userId))
      return res.status(401).json({ message: 'You are not the owner' });

    return res.status(200).json(note);
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    next(error);
  }
};

export const getNoteByContentService = async (req, res, next) => {
  try {
    const note = await NoteModel.findOne({
      content: req.query?.content,
    });

    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (!note.userId.equals(req.userId))
      return res.status(401).json({ message: 'You are not the owner' });

    return res.status(200).json(note);
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    next(error);
  }
};

export const getDetailedNoteService = async (req, res, next) => {
  try {
    const notes = await NoteModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId',
        },
      },
      { $unwind: '$userId' },
      { $project: { title: 1, createdAt: 1, 'userId.email': 1 } },
    ]);

    return res.status(200).json(notes);
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    next(error);
  }
};

export const aggregateService = async (req, res, next) => {
  try {
    const notes = await NoteModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.userId),
          ...(req.query.title && { title: req.query.title }),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          title: 1,
          userId: 1,
          createdAt: 1,
          'user.email': 1,
          'user.name': 1,
        },
      },
    ]);

    return res.status(200).json(notes);
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    next(error);
  }
};

export const deleteAllNotesService = async (req, res, next) => {
  try {
    const { deletedCount } = await NoteModel.deleteMany({ userId: req.userId });

    if (deletedCount === 0)
      return res.status(404).json({ message: 'No notes found' });

    return res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid note id' });

    next(error);
  }
};
