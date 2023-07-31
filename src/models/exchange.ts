export class Exchange {
  private currency_id: number;
  private date: Date;
  private exchange_number: number;

  constructor(currency_id: number, date: Date, exchange_number: number) {
    this.currency_id = currency_id;
    this.date = date;
    this.exchange_number = exchange_number;
  }
}
