export class Exchange {
  public currencyId: string;
  public date: Date;
  public rate: number;

  constructor(currencyId: string, date: Date, rate: number) {
    this.currencyId = currencyId;
    this.date = date;
    this.rate = rate;
  }
}
