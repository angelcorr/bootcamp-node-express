export class Transaction {
  public id: string;
  private sourceAccountId: string;
  private deliverAccountId: string;
  private time: Date;
  private description: string;
  private amount: number;
  private currencyId: string;
  private exchangeDate: Date;

  constructor(
    id: string,
    sourceAccountId: string,
    deliverAccountId: string,
    time: Date,
    description: string,
    amount: number,
    currencyId: string,
    exchangeDate: Date,
  ) {
    this.id = id;
    this.sourceAccountId = sourceAccountId;
    this.deliverAccountId = deliverAccountId;
    this.time = time;
    this.description = description;
    this.amount = amount;
    this.currencyId = currencyId;
    this.exchangeDate = exchangeDate;
  }
}
