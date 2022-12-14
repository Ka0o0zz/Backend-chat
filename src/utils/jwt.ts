import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "OasdMt0E*TsadasdSW";

export const generateToken = async (uuid: string) => {
  const jwt = await sign({ uuid }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return jwt;
};

export const verifiedToken = (jwt: string) => {
  const check = verify(jwt, JWT_SECRET);
  return check;
};
