export class Transaction {
  private id: string;
  private sourceAccountId: string;
  private deliverAccountId: string;
  private time: Date;
  private description: string;
  private amount: number;
  private currencyId: number;
  private exchangeDate: Date;

  constructor(
    id: string,
    sourceAccountId: string,
    deliverAccountId: string,
    time: Date,
    description: string,
    amount: number,
    currencyId: number,
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
