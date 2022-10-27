import { UserRepository } from "../../domain/user.repository";
import UserModel from "../../../models/user.schema";

export class MongoUserRepository implements UserRepository {
  async findUserById(uuid: string): Promise<any> {
    const user = await UserModel.findOne({ uuid });

    if (!user)
      return {
        ok: false,
        msg: "User no found",
      };

    return {
      ok: true,
      user
    };
  }
}
