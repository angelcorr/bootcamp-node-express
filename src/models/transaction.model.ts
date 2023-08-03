export class Transaction {
  private id: string;
  private source_account_id: string;
  private deliver_account_id: string;
  private time: Date;
  private description: string;
  private amount: number;
  private currencyId: number;
  private exchange_date: Date;

  constructor(
    id: string,
    source_account_id: string,
    deliver_account_id: string,
    time: Date,
    description: string,
    amount: number,
    currencyId: number,
    exchange_date: Date,
  ) {
    this.id = id;
    this.source_account_id = source_account_id;
    this.deliver_account_id = deliver_account_id;
    this.time = time;
    this.description = description;
    this.amount = amount;
    this.currencyId = currencyId;
    this.exchange_date = exchange_date;
  }
}
