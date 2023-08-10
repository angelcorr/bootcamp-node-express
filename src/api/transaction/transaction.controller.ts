import { Request, Response } from 'express';
import { services } from '../../services';
import { TransactionService } from '../../services/transaction.services';

export class TransactionController {
  private transactionService;

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  public createTransaction = (req: Request, res: Response) => {
    const { sourceAccountId, deliverAccountId, time, description, amount, currencyId, exchangeDate } =
      req.body;
    const transactionData = {
      sourceAccountId,
      deliverAccountId,
      time,
      description,
      amount,
      currencyId,
      exchangeDate,
    };

    const transaction = this.transactionService.create(transactionData);
    res.status(200).send({ transaction });
  };
}

export const transactionController = new TransactionController(services.transactionService);
