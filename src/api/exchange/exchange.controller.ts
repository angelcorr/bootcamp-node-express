import { Request, Response } from 'express';
import { services } from '../../services';
import { ExchangeService } from '../../services/exchange.services';

export class ExchangeController {
  private exchangeService;

  constructor(exchangeService: ExchangeService) {
    this.exchangeService = exchangeService;
  }

  public getExchanges = (req: Request, res: Response) => {
    const exchanges = this.exchangeService.getAll();
    res.status(200).send({ exchanges });
  };
}

export const exchangeController = new ExchangeController(services.exchangeService);