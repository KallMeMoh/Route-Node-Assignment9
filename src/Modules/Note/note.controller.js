import { Router } from 'express';
import {
  createNoteService,
  deleteNoteService,
  getDetailedNoteService,
  getNoteByContentService,
  getNoteService,
  getSortedNotesService,
  replaceNoteService,
  updateAllService,
  updateNoteService,
} from './note.service.js';

export const noteRouter = Router();

noteRouter.post('/', createNoteService);

noteRouter.put('/replace/:noteId', replaceNoteService);

noteRouter.patch('/all', updateAllService);

// /notes/paginate-sort?page=2&limit=3
noteRouter.get('/paginate-sort', getSortedNotesService);

// /notes/note-by-content?content=Workout Plan
noteRouter.get('/note-by-content', getNoteByContentService);

noteRouter.get('/note-with-user', getDetailedNoteService);

noteRouter.get('/aggregate', () => {});

noteRouter.delete('/', () => {});

noteRouter.get('/:noteId', getNoteService);

noteRouter.patch('/:noteId', updateNoteService);

noteRouter.delete('/:noteId', deleteNoteService);
