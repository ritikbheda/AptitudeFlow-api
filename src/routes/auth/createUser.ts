import express from 'express';
import requireAuth from '../../middleware/auth';
import requireRole from '../../middleware/requireRole';
import { AuthUser } from '../../models/authUser';
import jwtParser from '../../utils/jwtParser';
import { Company } from '../../models/company';
import { generateEmailConfirmationToken } from '../../utils/tokenUtils';
import { sendConfirmationEmail } from '../../utils/emailUtils';

const router = express.Router();

router.post('/', requireAuth, requireRole('company'), async (req, res) => {
  // add user to auth
  // add new user to comapny database
  // send email link to user
  // make email confirmation link, so that user can click that through email and can confirm email+register
  // create a new user? when user confirms his email and sets his password
  try {
    const { email } = req.body;
    const { companyID } = jwtParser(req.cookies.jwt);

    const emailConfirmationToken = generateEmailConfirmationToken();

    // make email confirmation
    const newAuthUser = AuthUser.build({
      email: email,
      name: 'name',
      password: 'password',
      role: 'user',
      isEmailConfirmed: false,
      emailConfirmationToken: emailConfirmationToken,
      companyID: companyID,
    });

    const newAuthUserSaved = await newAuthUser.save();

    await sendConfirmationEmail(email, emailConfirmationToken, 'user');
    res.status(201).json(newAuthUserSaved);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'something went wrong while creating new user' });
  }
  // may be we can add a feature to add a list of student users who havent registered yet
  // (something like a new array in company collection that StudentsPendingRegistration: Array<string>)
});

export { router as createUser };
