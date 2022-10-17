import { hash, compare } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  const hashedPassword = await hash(password, saltOrRounds);
  return hashedPassword;
};

export const comparePassword = (
  inputPassword: string,
  hashedPassword: string,
) => compare(inputPassword, hashedPassword);
