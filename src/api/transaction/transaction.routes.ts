import express from 'express';
import { TransactionController, transactionController } from './transaction.controller';
import validationBodyHandler from '../../middlewares/validationBodyHandler';
import { newTransactionSchema } from '../../dataTransferObjects/newTransaction.object';
import asyncHandler from '../../middlewares/asyncErrorHandler';

class TransactionRoutes {
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
      asyncHandler(this.transactionController.createTransaction),
    );
  }
}

export const transactionRouter = new TransactionRoutes(transactionController);
