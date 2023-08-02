export class Currency {
  public id: number;
  public type: string;
  public code: string;

  constructor(id: number, type: string, code: string) {
    this.id = id;
    this.type = type;
    this.code = code;
  }
}
