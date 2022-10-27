import { NextFunction, Request, Response } from "express";
import { verifiedToken } from "../utils/jwt";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtUser = req.headers.authorization || "";
    const jwt = jwtUser.split(" ")[1];

    const checkToken = verifiedToken(jwt);

    if (!checkToken) {
      res.status(401).json({
        ok: false,
        msg: "Invalid Token",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "You don't have permissions",
    });
  }
};
