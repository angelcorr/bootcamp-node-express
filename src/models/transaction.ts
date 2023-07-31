export class Transaction {
  private id: string;
  private source_account_id: string;
  private deliver_account_id: string;
  private time: string;
  private description: string;
  private amount: number;
  private currency_id: number;
  private exchange_date: Date;

  constructor(
    id: string,
    source_account_id: string,
    deliver_account_id: string,
    time: string,
    description: string,
    amount: number,
    currency_id: number,
    exchange_date: Date,
  ) {
    this.id = id;
    this.source_account_id = source_account_id;
    this.deliver_account_id = deliver_account_id;
    this.time = time;
    this.description = description;
    this.amount = amount;
    this.currency_id = currency_id;
    this.exchange_date = exchange_date;
  }
}
