import { AuthEntity } from "../../domain/auth.entity";
import { AuthRepository } from "../../domain/auth.repository";
import UserModel from "../../../../models/user.schema";
import OTPModel from "../../../../models/otp.schema";
import { encrypt, verifiedPassword } from "../../../../utils/bcrypt.handle";
import { generateToken } from "../../../../utils/jwt";
import { randomOTPCode } from "../../../../utils/radomOTPCode";
import { sendSMS } from "../../../../utils/sms";

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

    const passwordHash = await encrypt(`${userIn.password}`);

    const user: any = await UserModel.create({
      ...userIn,
      password: passwordHash,
    });

    return {
      ok: true,
      data: {
        uuid: user.uuid,
      },
    };
  }

  async generateOTP(uuid: string): Promise<any> {
    const findUser: any = await UserModel.findOne({ uuid });

    if (!findUser)
      return {
        ok: false,
        msg: "Access denied",
      };

    if (findUser.verified)
      return {
        ok: false,
        msg: "Your account has already been verified",
      };

    //generate and save random OTP code
    const OTPCODE = randomOTPCode();
    await OTPModel.create({ uuidUser: uuid, otp: OTPCODE });

    //send sms with OTP verify
    sendSMS(OTPCODE);

    return {
      ok: true,
    };
  }

  async verifyOTP({ uuid, otp }: { uuid: string; otp: number }): Promise<any> {
    const otpCode = await OTPModel.findOne({ uuid, otp });

    if (!otpCode)
      return {
        ok: false,
        msg: "Invalid code",
      };

    await otpCode.delete();

    const user: any = await UserModel.findOneAndUpdate(
      { uuid },
      { verified: true }
    );

    const token = await generateToken(user.uuid);

    return {
      ok: true,
      data: {
        uuid: user.uuid,
        name: user.name,
        lastName: user.lastName,
        token,
      },
    };
  }

  async login({ email, password }: AuthEntity): Promise<any> {
    const findUser: any = await UserModel.findOne({ email });
    if (!findUser)
      return {
        ok: false,
        msg: "Unregistered account",
      };

    const validPassword = verifiedPassword(`${password}`, findUser.password);

    if (!validPassword)
      return {
        ok: false,
        msg: "Invalid password",
      };

    const token = await generateToken(findUser.uuid);
    return {
      ok: true,
      data: {
        uuid: findUser.uuid,
        name: findUser.name,
        lastName: findUser.lastName,
        token,
      },
    };
  }
}
