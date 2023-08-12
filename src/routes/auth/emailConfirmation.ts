import { Request, Response, Router } from 'express';
import { AuthUser } from '../../models/authUser';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Invalid token' });
  }

  try {
    // Find the user by the email confirmation token

    // console.log('the token is:', token);
    const user = await AuthUser.findOne({ emailConfirmationToken: token });
    // console.log('the user is', user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const updatedUser = await AuthUser.updateOne(
      { _id: user._id },
      {
        isEmailConfirmed: true,
        emailConfirmationToken: '',
      }
    );

    return res.status(200).json({ message: 'Email confirmed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error confirming email' });
  }
});

export { router as emailConfirmation };
