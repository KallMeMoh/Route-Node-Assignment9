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

    if (note.userId !== req.userId)
      return res.status(401).json({ message: 'You are not the owner' });

    const { title, content } = req.body;

    note.title = title;
    note.content = content;

    const updatedNote = await note.save();

    return res.status(200).json({ message: 'updated', note: updatedNote });
  } catch (error) {
    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    next(error);
  }
};

export const replaceNoteService = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.noteId);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.userId !== req.userId)
      return res.status(401).json({ message: 'You are not the owner' });

    const { title, content, userId } = req.body;

    note.title = title;
    note.content = content;
    note.userId = userId;

    const updatedNote = await note.save();

    return res.status(200).json({ message: 'updated', note: updatedNote });
  } catch (error) {
    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    next(error);
  }
};

export const updateAllService = async (req, res, next) => {
  try {
    const { matchedCount } = await NoteModel.updateMany(
      { _id: req.userId },
      {
        $set: {
          title: req.body.title,
        },
      },
      {
        runValidators: true,
      },
    );

    if (matchedCount > 0)
      return res.status(404).json({ message: 'No note found' });

    return res.status(200).json({ message: 'All notes updated' });
  } catch (error) {
    if (error.name === 'ValidationError')
      return res.status(400).json({ errors: error.errors });

    next(error);
  }
};

export const deleteNoteService = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.userId);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.userId !== req.userId)
      return res.status(401).json({ message: 'You are not the owner' });

    return res.status(200).json({ message: 'deleted', note });
  } catch (error) {
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
    next(error);
  }
};

export const getNoteService = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.noteId);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.userId !== req.userId)
      return res.status(401).json({ message: 'You are not the owner' });

    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const getNoteByContentService = async (req, res, next) => {
  try {
    const note = await NoteModel.findOne({
      content: { $like: `%${req.body.content}%` },
    });

    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.userId !== req.userId)
      return res.status(401).json({ message: 'You are not the owner' });

    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
