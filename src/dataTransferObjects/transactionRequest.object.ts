import { z } from 'zod';

export type transactionRequest = {
  page: number;
  pageSize: number;
  userId: string;
};

export const transactionRequestSchema = z
  .object({
    page: z.number(),
    pageSize: z.number(),
    userId: z.string(),
  })
  .partial();
