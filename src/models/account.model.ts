export class Account {
  public id: string;
  private capital: number;
  public userId: string;
  private currencyId: string;

  constructor(id: string, capital: number, userId: string, currencyId: string) {
    this.id = id;
    this.capital = capital;
    this.userId = userId;
    this.currencyId = currencyId;
  }
}

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  UYU = 'UYU',
}
