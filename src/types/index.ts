import type { Response } from 'express';

export interface UserRequiredProps {
  id: number;
  name: string;
  email: string;
}

export interface UserNotRequiredProps {
  id?: number | undefined;
  name?: string | undefined;
  email?: string | undefined;
}

export interface CreateUserProps {
  data: UserRequiredProps;
  res: Response;
}

export interface UserIdProps {
  id: number;
}

export interface UpdateUserProps {
  id: number;
  data: UserNotRequiredProps;
  res: Response;
}
