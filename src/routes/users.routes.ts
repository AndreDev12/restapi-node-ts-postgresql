import { Router } from 'express';

import { UserController } from '../controllers/users.controllers';

export function userRouter({ userModel }: any) {
  const router = Router();

  const userController = new UserController({ userModel });

  router.get('/users', userController.getUsers);
  router.get('/users/:id', userController.getUser);
  router.post('/users', userController.createUser);
  router.delete('/users/:id', userController.deleteUser);
  router.put('/users/:id', userController.updateUser);

  return router;
}
