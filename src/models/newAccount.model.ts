export class NewAccount {
  public capital: number;
  public userId: string;
  public currencyId: number;

  constructor(capital: number, userId: string, currencyId: number) {
    this.capital = capital;
    this.userId = userId;
    this.currencyId = currencyId;
  }
}
