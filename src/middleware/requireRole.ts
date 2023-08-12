import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

interface AuthenticatedRequest extends Request {
  user?: any;
}

const requireRole = (requiredRole: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    try {
      const decoded: any = jwt.verify(token, process.env.AUTH_KEY!);
      const userRole = decoded.role;

      if (userRole !== requiredRole) {
        return res.status(403).json({
          message: 'Insufficient permissions',
          userRole: userRole,
          requiredRole: requiredRole,
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
};

export default requireRole;
