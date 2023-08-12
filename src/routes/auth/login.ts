import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { body } from 'express-validator';
import { AuthUser } from '../../models/authUser';
import { validate } from './../../middleware/validation';
import { generateToken } from './../../utils/authUtils';

const router = express.Router();

router.post(
  '/',
  validate([
    body('email').isEmail().withMessage('email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 charaters'),
  ]),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await AuthUser.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password.toString()
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(
        user._id,
        user.role.toString(),
        user.companyID
      );

      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

      res.json({ message: 'login successful' });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in' });
    }
  }
);

export { router as login };
