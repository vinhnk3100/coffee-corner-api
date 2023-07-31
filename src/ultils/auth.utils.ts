import { hashSync, compareSync } from 'bcrypt';

export const hashPassword = async (rawPassword: string): Promise<any> => {
  const hashPassword = hashSync(rawPassword, 10);
  return hashPassword;
};

export const comparePassword = async (
  rawPassword: string,
  hashedPassword: string,
): Promise<any> => {
  const result = compareSync(rawPassword, hashedPassword);
  return result;
};
