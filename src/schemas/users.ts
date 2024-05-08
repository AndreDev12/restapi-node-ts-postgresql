import { z } from 'zod';

import type { UserRequiredProps } from '../types';

const userSchema = z.object({
  id: z
    .number({
      invalid_type_error: 'User id must be a number',
      required_error: 'User id is required',
    })
    .int()
    .positive(),
  name: z.string({
    invalid_type_error: 'User name must be a string',
    required_error: 'User name is required',
  }),
  email: z
    .string({
      invalid_type_error: 'User email must be a string',
      required_error: 'User email is required',
    })
    .email({ message: 'The email entered is not correct' }),
});

export function validateUser(input: UserRequiredProps) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input: unknown) {
  return userSchema.partial().safeParse(input);
}
