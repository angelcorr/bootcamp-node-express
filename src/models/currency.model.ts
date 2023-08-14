export class Currency {
  public id: string;
  public type: string;
  public code: string;

  constructor(id: string, type: string, code: string) {
    this.id = id;
    this.type = type;
    this.code = code;
  }
}
