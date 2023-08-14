import express from 'express';
import { ExchangeController, exchangeController } from './exchange.controller';
import passport from '../../middlewares/passport';

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
    this.exchangeRouter.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.exchangeController.getExchanges,
    );
  }
}

export const exchangeRouter = new ExchangeRoutes(exchangeController);
