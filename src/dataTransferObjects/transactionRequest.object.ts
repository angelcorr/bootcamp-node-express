import { z } from 'zod';

export type TransactionRequest = {
  page: number;
  pageSize: number;
  userId: string;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  accountId: string | undefined;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
};

export const transactionRequestSchema = z
  .object({
    page: z.coerce.number().positive(),
    pageSize: z.coerce.number().positive(),
    userId: z.string().uuid(),
    dateFrom: z.string().datetime(),
    dateTo: z.string().datetime(),
    sortBy: z.enum(['id', 'accountId', 'time', 'description']),
    sortOrder: z.enum(['DESC', 'ASC']),
  })
  .partial();
