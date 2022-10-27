import { hash, genSaltSync, compareSync } from "bcryptjs";

export const encrypt = async (password: string) => {
  const salt = genSaltSync();
  const passwordHash = await hash(password, salt);
  return passwordHash;
};

export const verifiedPassword = (password: string, passwordHash: string) =>
  compareSync(password, passwordHash);
