import bcrypt from 'bcrypt';
import { AuthUser } from '../models/authUser';

export const createUser = async (
  email: string,
  password: string,
  name: string,
  role: string,
  emailConfirmationToken: string,
  companyID?: string
) => {
  const existingUser = await AuthUser.findOne({ email });

  if (existingUser) {
    throw new Error('Email already registered');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new AuthUser({
    email,
    password: hashedPassword,
    name,
    role,
    emailConfirmationToken,
    companyID,
  });
  return await user.save();
};
