import { Transaction } from 'typeorm';

export type transactionsResponse = [transactions: Transaction[], count: number];
