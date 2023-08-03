export class Exchange {
  private currencyId: number;
  private date: Date;
  private rate: number;

  constructor(currencyId: number, date: Date, rate: number) {
    this.currencyId = currencyId;
    this.date = date;
    this.rate = rate;
  }
}
