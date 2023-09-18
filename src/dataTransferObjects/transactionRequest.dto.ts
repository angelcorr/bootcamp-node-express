import { z } from 'zod';
import { Pagination } from './pagination.dto';

export type TransactionRequestDto = Pagination & {
  userId: string | undefined;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  accountId: string | undefined;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
  graphql?: boolean;
};

export const transactionRequestSchema = z
  .object({
    page: z.coerce.number().positive(),
    pageSize: z.coerce.number().positive(),
    dateFrom: z.string().datetime(),
    dateTo: z.string().datetime(),
    sortBy: z.enum(['id', 'accountId', 'time', 'description']),
    sortOrder: z.enum(['DESC', 'ASC']),
  })
  .partial();
