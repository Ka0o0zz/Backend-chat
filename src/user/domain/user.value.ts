import { v4 as uuid } from "uuid";
import { UserEntity } from "./user.entity";

export class UserValue implements UserEntity {
  uuid?: string;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: number;

  constructor({ name, lastName, email, phone }: { name?:string, lastName?:string, email?:string, phone?:number }) {
    this.uuid = uuid();
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }
}
