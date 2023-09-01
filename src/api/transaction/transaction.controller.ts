import { Request, Response } from 'express';
import { services } from '../../services';
import { TransactionService } from '../../services/transaction.services';
import { UserService } from '../../services/user.services';
import UnauthorizedError from '../../customErrors/unauthorizedError';
import { User } from '../../entity';

export class TransactionController {
  private transactionService;
  private userService;

  constructor(transactionService: TransactionService, userService: UserService) {
    this.transactionService = transactionService;
    this.userService = userService;
  }

  public createTransaction = async (req: Request, res: Response) => {
    const { sourceAccountId, deliverAccountId, description, amount } = req.body;
    const { id } = req.user as User;
    if (!id) {
      throw new UnauthorizedError('You must log in');
    }

    const userAccounts = await this.userService.getUserAccounts(id);
    const findSourceUserAccount = userAccounts.find((account) => account.id === sourceAccountId);

    if (!findSourceUserAccount) {
      throw new UnauthorizedError('Unauthorized');
    }

    const transactionData = {
      sourceAccountId,
      deliverAccountId,
      description,
      amount,
    };
    const transaction = await this.transactionService.create(transactionData);
    res.status(200).send({ transaction });
  };

  public getTransactions = async (req: Request, res: Response) => {
    let page = Number(req.query.page);
    let pageSize = Number(req.query.pageSize);
    const user = req.user as User;

    if (!user) {
      throw new UnauthorizedError('You must log in');
    }

    if (!page) {
      page = 0;
    }

    if (!pageSize) {
      pageSize = 10;
    }

    const transactions = await this.transactionService.getTransactions({ page, pageSize, user: user.id });
    res.status(200).send({ data: transactions });
  };
}

export const transactionController = new TransactionController(
  services.transactionService,
  services.userService,
);
