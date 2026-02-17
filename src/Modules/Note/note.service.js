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
