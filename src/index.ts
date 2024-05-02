import express, { json } from 'express';

import userRoutes from './routes/users.routes';
import { PORT } from './config';

const app = express();

app.use(json());
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
