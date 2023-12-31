import express from 'express';
import { TransactionController, transactionController } from './transaction.controller';
import { bodyHandlerValidation, queryParamsHandlerValidation } from '../../middlewares/zodValidationHandler';
import { newTransactionSchema } from '../../dataTransferObjects/newTransaction.dto';
import asyncHandler from '../../middlewares/asyncErrorHandler';
import { transactionRequestSchema } from '../../dataTransferObjects/transactionRequest.dto';

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
      bodyHandlerValidation(newTransactionSchema),
      asyncHandler(this.transactionController.createTransaction),
    );

    this.transactionRouter.get(
      '/',
      queryParamsHandlerValidation(transactionRequestSchema),
      asyncHandler(this.transactionController.getTransactions),
    );
  }
}

export const transactionRouter = new TransactionRoutes(transactionController);
