import { v4 as uuid } from "uuid";
import { AuthEntity } from "./auth.entity";

export class AuthValue implements AuthEntity {
  uuid?: string;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: number;
  password?: string;

  constructor({
    name,
    lastName,
    email,
    phone,
    password,
  }: {
    name?: string;
    lastName?: string;
    email?: string;
    phone?: number;
    password?: string;
  }) {
    this.uuid = uuid();
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
