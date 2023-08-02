export class Account {
  private id: string;
  private capital: number;
  private user_id: string;
  private currency_id: number;

  constructor(id: string, capital: number, user_id: string, currency_id: number) {
    this.id = id;
    this.capital = capital;
    this.user_id = user_id;
    this.currency_id = currency_id;
  }
}
