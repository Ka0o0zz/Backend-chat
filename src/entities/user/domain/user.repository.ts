import { UserEntity } from "./user.entity";

export interface UserRepository {
  findUserById(uuid: string): Promise<UserEntity | null>;
}
