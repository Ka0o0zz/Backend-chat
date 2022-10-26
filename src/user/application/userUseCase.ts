import { UserRepository } from "../domain/user.repository";
import { UserValue } from "../domain/user.value";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public registerUser = async ({
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
    const userValue = new UserValue({ name, lastName, email, phone, password });
    const userCreate = await this.userRepository.registerUser(userValue);
    return userCreate;
  };
}
