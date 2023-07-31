export class Currency {
  private id: number;
  private currency_type: number;

  constructor(id: number, currency_type: number) {
    this.id = id;
    this.currency_type = currency_type;
  }
}
