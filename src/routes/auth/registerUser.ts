import bcrypt from 'bcrypt';
import express from 'express';
import { body } from 'express-validator';
import { validate } from '../../middleware/validation';
import { AuthUser } from '../../models/authUser';
import { User } from '../../models/user';
import { Company } from '../../models/company';

const router = express.Router();

router.post(
  '/',
  validate([
    body('name')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('name must be between 4 and 20 characters'),
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
  async (req, res) => {
    try {
      // there is nothing this token does???
      const { token } = req.body;
      const { name, password } = req.body;
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: 'Invalid token' });
      }
      // find the user and update authUser

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // console.log('hashedPassword: ', hashedPassword);

      const newUser = User.build({ testsTaken: [] });
      const userSaved = await newUser.save();

      const updateAuthUser = await AuthUser.findOneAndUpdate(
        { emailConfirmationToken: token },
        {
          name: name,
          password: hashedPassword,
          companyID: userSaved._id,
          isEmailConfirmed: true,
          emailConfirmationToken: '',
        },
        { new: false }
      );

      const updateCompany = await Company.findByIdAndUpdate(
        { _id: updateAuthUser?.companyID },
        { $push: { users: newUser._id } },
        { new: true }
      );

      res.status(201).json({ updateAuthUser, userSaved });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'something went wrong in registerUser' });
    }
  }
);

export { router as registerUser };
