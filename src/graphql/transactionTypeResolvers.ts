import { Transaction } from '../entity';
import { Context } from './types';

export const sourceAccount = async (parent: Transaction) => parent.sourceAccount;

export const deliverAccount = async (parent: Transaction) => parent.deliverAccount;

export const sourceCurrency = async (parent: Transaction, args: unknown, contextValue: Context) =>
  contextValue.currencyService.getOneById(parent.sourceCurrencyId);

export const deliverCurrency = async (parent: Transaction, args: unknown, contextValue: Context) =>
  contextValue.currencyService.getOneById(parent.deliverCurrencyId);

export const sourceExchange = async (parent: Transaction, args: unknown, contextValue: Context) =>
  contextValue.exchangeService.getOne(parent.sourceCurrencyId);

export const deliverExchange = async (parent: Transaction, args: unknown, contextValue: Context) =>
  contextValue.exchangeService.getOne(parent.deliverCurrencyId);
