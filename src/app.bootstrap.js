import express from 'express';
import { PORT } from '../config/config.service.js';
import { connectDB } from './DB/connection.js';
import { authRouter } from './Modules/Auth/auth.controller.js';
import { userRouter } from './Modules/User/user.controller.js';
import { noteRouter } from './Modules/Note/note.controller.js';
import { authMiddleware } from './middlewares/authentication.js';

export default async function bootstrap() {
  const app = express();

  await connectDB();

  app.use(express.json());

  app.use('/auth', authRouter);
  app.use('/users', authMiddleware, userRouter);
  app.use('/notes', authMiddleware, noteRouter);

  app.use('{/*dummy}', (req, res) => {
    return res.status(404).json({ message: 'Page not found' });
  });

  app.use((err, req, res, next) => {
    return res.status(500).json({
      message: 'Internal server error',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
