export class User {
  public id: string;
  private username: string;
  private hash_password: string;

  constructor(id: string, username: string, hash_password: string) {
    this.id = id;
    this.username = username;
    this.hash_password = hash_password;
  }
}
