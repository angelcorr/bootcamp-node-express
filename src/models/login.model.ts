import { z } from 'zod';

export type Login = {
  email: string;
  password: string;
};

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
