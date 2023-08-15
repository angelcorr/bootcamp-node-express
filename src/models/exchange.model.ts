export class Exchange {
  private currencyId: string;
  private date: Date;
  private rate: number;

  constructor(currencyId: string, date: Date, rate: number) {
    this.currencyId = currencyId;
    this.date = date;
    this.rate = rate;
  }
}
