import { AuthRepository } from "../domain/auth.repository";
import { AuthValue } from "../domain/auth.value";

export class AuthUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  public register = async ({
    name,
    lastName,
    email,
    phone,
    password,
  }: {
    name: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
  }) => {
    const userValue = new AuthValue({ name, lastName, email, phone, password });
    const userCreate = this.authRepository.register(userValue);
    return userCreate;
  };

  public login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const user = new AuthValue({ email, password });
    const userLogin = this.authRepository.login(user);
    return userLogin;
  };
}
