export class NewUser {
  public first_name: string;
  public last_name: string;
  public email: string;
  public hash_password: string;

  constructor(first_name: string, last_name: string, email: string, hash_password: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.hash_password = hash_password;
  }
}
