import { AuthEntity } from "./auth.entity";

export interface AuthRepository {
  register(user: AuthEntity): Promise<AuthEntity | null>;
  login(user: AuthEntity): Promise<AuthEntity | null>;
  generateOTP(uuid: string): Promise<AuthEntity | null>;
  verifyOTP({
    uuid,
    otp,
  }: {
    uuid: string;
    otp: number;
  }): Promise<AuthEntity | null>;
}
