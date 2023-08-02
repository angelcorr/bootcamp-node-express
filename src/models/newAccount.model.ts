export class NewAccount {
  public capital: number;
  public user_id: string;
  public currency_id: number;

  constructor(capital: number, user_id: string, currency_id: number) {
    this.capital = capital;
    this.user_id = user_id;
    this.currency_id = currency_id;
  }
}
