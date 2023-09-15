import { Currency } from '../entity';
import { repositories } from '../repositories';
import { CurrencyRepository } from '../repositories/currency.repository';
import IService from '../interfaces/service.interface';

export class CurrencyService implements IService<Currency, Currency> {
  private currencyRepository;

  constructor(currencyRepository: CurrencyRepository) {
    this.currencyRepository = currencyRepository;
  }

  public getOne = async (code: string): Promise<Currency> => {
    return await this.currencyRepository.getByCode(code);
  };

  public create = async (currency: Currency): Promise<Currency> => {
    return await this.currencyRepository.add(currency);
  };

  public getCurrencies = async (): Promise<Currency[]> => {
    return await this.currencyRepository.getAll();
  };

  public getOneById = async (id: number): Promise<Currency> => {
    return await this.currencyRepository.getCurrencyById(id);
  };
}

export const currencyService = new CurrencyService(repositories.currencyRepository);