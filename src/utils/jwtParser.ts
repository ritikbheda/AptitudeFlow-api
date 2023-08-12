import jwt from 'jsonwebtoken';
require('dotenv').config();

const jwtParser = (token: any) => {
  // const token = req.cookies.0jwt;

  if (!token) {
    // return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.AUTH_KEY!);
    // const userRole = decoded.role;
    return decoded;
  } catch (err) {
    throw new Error('some error while jwt parsing');
  }
};

export default jwtParser;
