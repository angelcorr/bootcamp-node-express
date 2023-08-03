export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public hashPassword: string;

  constructor(id: string, firstName: string, lastName: string, email: string, hashPassword: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hashPassword = hashPassword;
  }
}
