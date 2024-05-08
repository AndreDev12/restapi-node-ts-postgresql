import express, { json } from 'express';
import morgan from 'morgan';

import { userRouter } from './routes/users.routes';
import { PORT } from './config';

export function createApp({ userModel }: any) {
  const app = express();

  app.use(morgan('dev'));
  app.use(json());
  app.use('/', userRouter({ userModel }));

  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
}
