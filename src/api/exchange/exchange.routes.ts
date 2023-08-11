import express from 'express';
import { ExchangeController, exchangeController } from './exchange.controller';

class ExchangeRoutes {
  private exchangeController;
  private exchangeRouter;

  constructor(exchangeController: ExchangeController) {
    this.exchangeController = exchangeController;
    this.exchangeRouter = express.Router();
    this.setRoutes();
  }

  public getRouter(): express.Router {
    return this.exchangeRouter;
  }

  private setRoutes() {
    this.exchangeRouter.get('/', this.exchangeController.getExchanges);
  }
}

export const exchangeRouter = new ExchangeRoutes(exchangeController);
