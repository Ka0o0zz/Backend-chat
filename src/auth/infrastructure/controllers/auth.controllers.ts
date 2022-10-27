import { Request, Response } from "express";
import { AuthUseCase } from "../../application/authUseCase";

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  public registerCtrl = async ({ body }: Request, res: Response) => {
    try {
      const response: any = await this.authUseCase.register(body);
      if (!response.ok) {
        res.status(500).json({
          ok: false,
          mgs: response.msg,
        });
        return;
      }
      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        mgs: "Invalid data",
      });
    }
  };

  public loginCtrl = async ({ body }: Request, res: Response) => {
    try {
      const response: any = await this.authUseCase.login(body);
      if (!response.ok) {
        res.status(500).json({
          ok: false,
          mgs: response.msg,
        });
        return;
      }
      res.status(200).json({
        ...response,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        mgs: "Invalid data",
      });
    }
  };
}
