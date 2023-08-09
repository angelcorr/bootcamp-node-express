import { Request, Response } from 'express';
import { services } from '../../services';
import { ExchangeService } from '../../services/exchange.services';
import UnauthorizedError from '../../customErrors/unauthorizedError';
import { User } from '../../models';

export class ExchangeController {
  private exchangeService;

  constructor(exchangeService: ExchangeService) {
    this.exchangeService = exchangeService;
  }

  public getExchanges = (req: Request, res: Response) => {
    const user = req.user as User;
    console.log('user: ', user);
    if (!user) {
      throw new UnauthorizedError('Invalid user');
    }

    const exchanges = this.exchangeService.getAll();
    res.status(200).send({ exchanges });
  };
}

export const exchangeController = new ExchangeController(services.exchangeService);
