export class Account {
  public id: string;
  private capital: number;
  private account_number: number;
  private user_id: string;
  private currency_id: number;

  constructor(id: string, capital: number, account_number: number, user_id: string, currency_id: number) {
    this.id = id;
    this.capital = capital;
    this.account_number = account_number;
    this.user_id = user_id;
    this.currency_id = currency_id;
  }
}
