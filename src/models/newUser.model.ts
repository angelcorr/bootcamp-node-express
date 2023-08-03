export class NewUser {
  public firstName: string;
  public lastName: string;
  public email: string;
  public hashPassword: string;

  constructor(firstName: string, lastName: string, email: string, hashPassword: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hashPassword = hashPassword;
  }
}
