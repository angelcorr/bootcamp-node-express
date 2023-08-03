export class Account {
  private id: string;
  private capital: number;
  private userId: string;
  private currency_id: number;

  constructor(id: string, capital: number, userId: string, currency_id: number) {
    this.id = id;
    this.capital = capital;
    this.userId = userId;
    this.currency_id = currency_id;
  }
}

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  UYU = 'UYU',
}
