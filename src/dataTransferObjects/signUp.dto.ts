import { z } from 'zod';

export type SignUpDto = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
};

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});
