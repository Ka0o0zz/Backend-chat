import { Request, Response } from "express";
import { UserUseCase } from "../../application/userUseCase";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public findUserByIdCtrl = async (
    { params: { uuid } }: Request,
    res: Response
  ) => {
    const response: any = await this.userUseCase.findUserById({ uuid });

    if (!response.ok) {
      res.status(500).json({
        ok: false,
        msg: response.msg,
      });
      return;
    }

    res.status(200).json({
      ...response,
    });
  };
}
