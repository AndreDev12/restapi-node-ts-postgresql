import { Router } from 'express';

import { UserController } from '../controllers/users.controllers';

const router = Router();

router.get('/users', UserController.getUsers);

router.get('/users/:id', UserController.getUser);

router.post('/users', UserController.createUser);

router.delete('/users/:id', UserController.deleteUser);

router.put('/users/:id', UserController.updateUser);

export default router;
