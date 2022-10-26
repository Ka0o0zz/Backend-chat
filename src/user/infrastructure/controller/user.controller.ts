import { Request, Response } from "express";
import { UserUseCase } from "../../application/userUseCase";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public getCtrl() {}

  public insertCtrl = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      const user = await this.userUseCase.registerUser(body);
      if (!user?.uuid) {
        res.status(500).json({
          ok: false,
          mgs: "This phone already exists",
        });
        return;
      }
      res.status(200).json({
        ok: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        mgs: "Invalid data",
      });
    }
  };
}
