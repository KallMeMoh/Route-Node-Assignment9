import { NoteModel } from '../../DB/Model/Note.model';

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
