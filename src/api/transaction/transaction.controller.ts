import { Request, Response } from 'express';
import { services } from '../../services';
import { TransactionService } from '../../services/transaction.services';
import { CurrencyService } from '../../services/currency.services';

export class TransactionController {
  private transactionService;
  private currencyService;

  constructor(transactionService: TransactionService, currencyService: CurrencyService) {
    this.transactionService = transactionService;
    this.currencyService = currencyService;
  }

  public createTransaction = async (req: Request, res: Response) => {
    const { sourceAccountId, deliverAccountId, description, amount, currencyId } = req.body;
    const transactionData = {
      sourceAccountId,
      deliverAccountId,
      description,
      amount,
      currencyId,
      exchangeDate: new Date(),
    };
    const transaction = await this.transactionService.create(transactionData);
    res.status(200).send({ transaction });
  };
}

export const transactionController = new TransactionController(
  services.transactionService,
  services.currencyService,
);
