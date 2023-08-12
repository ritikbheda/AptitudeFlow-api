import express from 'express';
import { register } from './register';
import { login } from './login';
import { logout } from './logout';
import { emailConfirmation } from './emailConfirmation';
import { createUser } from './createUser';
import { registerUser } from './registerUser';
import { isValidUser } from './isValidUser';

const router = express.Router();

router.use('/login', login);
router.use('/register', register);
router.use('/logout', logout);
router.use('/emailConfirmation', emailConfirmation);
router.use('/createUser', createUser);
router.use('/registerUser', registerUser);
router.use('/isValidUser', isValidUser);

export { router as authRoutes };
