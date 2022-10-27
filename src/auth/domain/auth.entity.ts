export interface AuthEntity {
  uuid?: string;
  name?: string | undefined;
  lastName?: string;
  email?: string;
  phone?: number;
  password: string;
}
