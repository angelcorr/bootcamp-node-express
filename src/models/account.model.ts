export class Account {
  public id: string;
  public capital: number;
  public userId: string;
  public currencyId: string;

  constructor(id: string, capital: number, userId: string, currencyId: string) {
    this.id = id;
    this.capital = capital;
    this.userId = userId;
    this.currencyId = currencyId;
  }
}

export enum accountTransactionType {
  add = 'add',
  subtract = 'subtract',
}

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  UYU = 'UYU',
}
