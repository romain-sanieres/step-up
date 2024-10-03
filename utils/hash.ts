import bcrypt from "bcryptjs";

export function hashPassword(password: any) {
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
