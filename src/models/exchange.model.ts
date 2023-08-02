export class Exchange {
  private currency_id: number;
  private date: Date;
  private rate: number;

  constructor(currency_id: number, date: Date, rate: number) {
    this.currency_id = currency_id;
    this.date = date;
    this.rate = rate;
  }
}
