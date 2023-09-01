import express from 'express';
import { TransactionController, transactionController } from './transaction.controller';
import { validationBodyHandler, validationHeaderHandler } from '../../middlewares/validationBodyHandler';
import { newTransactionSchema } from '../../dataTransferObjects/newTransaction.object';
import asyncHandler from '../../middlewares/asyncErrorHandler';
import { transactionRequestSchema } from '../../dataTransferObjects/transactionRequest.object';

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

    this.transactionRouter.get(
      '/',
      validationHeaderHandler(transactionRequestSchema),
      asyncHandler(this.transactionController.getTransactions),
    );
  }
}

export const transactionRouter = new TransactionRoutes(transactionController);
