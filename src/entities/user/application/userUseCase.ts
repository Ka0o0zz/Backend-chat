import { UserRepository } from "../domain/user.repository";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public findUserById = async ({ uuid }: { uuid: string }) => {
    const userCreate = await this.userRepository.findUserById(uuid);
    return userCreate;
  };
}
