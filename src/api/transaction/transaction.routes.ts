import express from 'express';
import { TransactionController, transactionController } from './transaction.controller';
import passport from '../../middlewares/passport';
import validationBodyHandler from '../../middlewares/validationBodyHandler';
import { newTransactionSchema } from '../../models';

class ExchangeRoutes {
  private transactionController;
  private transactionRouter;

  constructor(transactionController: TransactionController) {
    this.transactionController = transactionController;
    this.transactionRouter = express.Router();
    this.setRoutes();
  }

  public getRouter(): express.Router {
    return this.transactionRouter;
  }

  private setRoutes() {
    this.transactionRouter.post(
      '/',
      validationBodyHandler(newTransactionSchema),
      passport.authenticate('jwt', { session: false }),
      this.transactionController.createTransaction,
    );
  }
}

export const transactionRouter = new ExchangeRoutes(transactionController);
