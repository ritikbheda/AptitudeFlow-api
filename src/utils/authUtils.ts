import jwt from 'jsonwebtoken';
require('dotenv').config();

export const generateToken = (
  userId: string,
  role: string,
  companyID?: string
) => {
  return jwt.sign(
    { id: userId, role, companyID: companyID },
    process.env.AUTH_KEY!,
    {
      expiresIn: '1h',
    }
  );
};
