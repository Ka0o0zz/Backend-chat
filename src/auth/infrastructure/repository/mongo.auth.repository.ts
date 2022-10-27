import { AuthEntity } from "../../domain/auth.entity";
import { AuthRepository } from "../../domain/auth.repository";
import UserModel from "../../../models/user.schema";
import { encrypt, verifiedPassword } from "../../../utils/bcrypt.handle";
import { generateToken } from "../../../utils/jwt";

export class MongoAuthRepository implements AuthRepository {
  async register(userIn: AuthEntity): Promise<any> {
    const thereEmail = await UserModel.findOne({ email: userIn.email });
    if (thereEmail)
      return {
        ok: false,
        msg: "This email is already registered, do you want to recover the password?",
      };

    const therePhone = await UserModel.findOne({ phone: userIn.phone });
    if (therePhone)
      return {
        ok: false,
        msg: "This phone is already registered, do you want to recover the password?",
      };

    const passwordHash = await encrypt(userIn.password);

    UserModel.create({ ...userIn, password: passwordHash });

    return {
      ok: true,
    };
  }

  async login({ email, password }: AuthEntity): Promise<any> {
    const findUser: any = await UserModel.findOne({ email });
    if (!findUser)
      return {
        ok: false,
        msg: "Unregistered account",
      };

    const validPassword = verifiedPassword(password, findUser.password);

    if (!validPassword)
      return {
        ok: false,
        msg: "Invalid password",
      };

    const token = await generateToken(findUser.uuid);
    return {
      ok: true,
      token,
      uuid: findUser.uuid,
      name: findUser.name,
      lastName: findUser.lastName,
    };
  }
}
