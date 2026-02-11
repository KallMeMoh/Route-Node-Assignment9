import express from 'express';
import { PORT } from '../config/config.service.js';

export default async function bootstrap() {
  const app = express();

  app.use(express.json());

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
