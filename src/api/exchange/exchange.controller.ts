import { Request, Response } from 'express';
import { services } from '../../services';
import { ExchangeService } from '../../services/exchange.service';

export class ExchangeController {
  private exchangeService;

  constructor(exchangeService: ExchangeService) {
    this.exchangeService = exchangeService;
  }

  public getExchanges = async (req: Request, res: Response) => {
    const exchanges = await this.exchangeService.getExchanges();
    res.status(200).send({ exchanges });
  };
}

export const exchangeController = new ExchangeController(services.exchangeService);
