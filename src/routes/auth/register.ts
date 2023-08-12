import express, { Request, Response } from 'express';

import { body } from 'express-validator';

import { validate } from './../../middleware/validation';
import { createUser } from './../../utils/userUtils';
import { generateToken } from './../../utils/authUtils';
import { generateEmailConfirmationToken } from './../../utils/tokenUtils';
import { sendConfirmationEmail } from './../../utils/emailUtils';
import { Company } from '../../models/company';

const router = express.Router();

router.post(
  '/',
  validate([
    body('name')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('name must be between 4 and 20 characters'),
    body('email').isEmail().withMessage('email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 charaters'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  ]),
  async (req: Request, res: Response) => {
    try {
      const { email, password, name, role } = req.body;

      const companyDetails = await Company.build({
        testIDs: [],
        users: [],
      });
      await companyDetails.save();

      const emailConfirmationToken = generateEmailConfirmationToken();

      const user = await createUser(
        email,
        password,
        name,
        role,
        emailConfirmationToken,
        companyDetails._id
      );

      // const emaildone = await sendConfirmationEmail(
      //   email,
      //   emailConfirmationToken, 'company'
      // );

      const token = generateToken(
        user._id,
        user.role.toString(),
        companyDetails._id
      );

      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user' });
    }
  }
);

export { router as register };
