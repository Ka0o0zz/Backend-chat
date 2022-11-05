import { Request, Response } from "express";
import { AuthUseCase } from "../../application/authUseCase";

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  public registerCtrl = async ({ body }: Request, res: Response) => {
    try {
      const response: any = await this.authUseCase.register(body);
      if (!response.ok) {
        res.status(500).json({
          ...response,
        });
        return;
      }
      res.status(201).json({
        ...response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Invalid data",
      });
    }
  };

  public loginCtrl = async ({ body }: Request, res: Response) => {
    try {
      const response: any = await this.authUseCase.login(body);
      if (!response.ok) {
        res.status(500).json({
          ...response,
        });
        return;
      }
      res.status(200).json({
        ...response,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Invalid data",
      });
    }
  };

  public generateOTPCtrl = async ({ params }: Request, res: Response) => {
    const { uuid } = params;

    try {
      const response: any = await this.authUseCase.generateOTP({ uuid });
      if (!response.ok) {
        res.status(500).json({
          ...response,
        });
        return;
      }
      res.status(200).json({
        ...response,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Can't generate a code right now, please try again in a few minutes",
      });
    }
  };

  public verifyOTPCtrl = async ({ body }: Request, res: Response) => {
    try {
      const response: any = await this.authUseCase.verifyOTP({ ...body });
      if (!response.ok) {
        res.status(500).json({
          ...response,
        });
        return;
      }
      res.status(200).json({
        ...response,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Can't generate a code right now, please try again in a few minutes",
      });
    }
  };
}
