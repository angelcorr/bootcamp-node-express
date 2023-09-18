import { z } from 'zod';

export type NewTransactionDto = {
  sourceAccountId: string;
  deliverAccountId: string;
  description: string;
  amount: number;
};

export const newTransactionSchema = z.object({
  sourceAccountId: z.string(),
  deliverAccountId: z.string(),
  description: z.string(),
  amount: z.number().positive(),
});
