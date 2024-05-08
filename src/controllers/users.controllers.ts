import type { Request, Response } from 'express';

import { validatePartialUser, validateUser } from '../schemas/users';
import type { UserRequiredProps } from '../types';

export class UserController {
  userModel: any;
  constructor({ userModel }: any) {
    this.userModel = userModel;
  }

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userModel.getAll();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  };

  getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await this.userModel.getUser({ id: Number(id) });
      if (user?.length === 0) {
        return res.status(404).json({ message: 'user not found' });
      }
      res.json(user?.[0]);
    } catch (error) {
      console.log(error);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const { data, error } = validateUser(req.body as UserRequiredProps);
      if (data === undefined) {
        return res.status(400).json({ message: error });
      }

      const user = await this.userModel.createUser({ res, data });
      res.status(201).json(user?.[0]);
    } catch (error) {
      console.log(error);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.userModel.deleteUser({ id: Number(id) });
    if (result === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.sendStatus(204);
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { data, error } = validatePartialUser(req.body);
      if (data === undefined) {
        return res.status(400).json(error);
      }

      const user = await this.userModel.updateUser({
        id: Number(id),
        data,
        res,
      });
      if (user?.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user?.[0]);
    } catch (error) {
      console.log(error);
    }
  };
}
