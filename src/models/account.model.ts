export class Account {
  private id: string;
  private capital: number;
  public userId: string;
  private currencyId: number;

  constructor(id: string, capital: number, userId: string, currencyId: number) {
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
