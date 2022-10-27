import { AuthEntity } from "./auth.entity";

export interface AuthRepository {
  register(user: AuthEntity): Promise<AuthEntity | null>;
  login(user:AuthEntity): Promise<AuthEntity | null>;
}
