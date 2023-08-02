import { z } from 'zod';

export class SignUp {
  public last_name: string;
  public first_name: string;
  public email: string;
  public password: string;

  constructor(last_name: string, first_name: string, email: string, password: string) {
    this.last_name = last_name;
    this.first_name = first_name;
    this.email = email;
    this.password = password;
  }
}

export const userSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
