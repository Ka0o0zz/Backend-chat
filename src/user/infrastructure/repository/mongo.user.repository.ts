import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import bcrypt from "bcryptjs";
import UserModel from "../model/user.schema";

export class MongoUserRepository implements UserRepository {
  async findUserById(uuid: string): Promise<any> {
    const user = await UserModel.findOne({ uuid });
    return user;
  }
  async registerUser(userIn: UserEntity): Promise<any> {
    const therePhone = await UserModel.findOne({ phone: userIn.phone });
    if (therePhone?.phone) return;

    const user = new UserModel(userIn);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(userIn.password, salt);

    await user.save();
    return user;
  }
}
