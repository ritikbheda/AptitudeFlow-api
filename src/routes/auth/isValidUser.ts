import { Request, Response, Router } from 'express';
import { AuthUser } from '../../models/authUser';

// https://chat.openai.com/share/53ad2e92-bde3-4574-82b1-0e04bfb0f205
const router = Router();

router.get('/:token', async (req: Request, res: Response) => {
  const { token } = req.params;

  if (!token || typeof token !== 'string') {
    return res.json({ isValidLink: false });
  }

  try {
    // Find the user by the email confirmation token

    // console.log('the token is:', token);
    const user = await AuthUser.findOne({ emailConfirmationToken: token });
    // console.log('the user is', user);
    if (!user) {
      return res.json({ isValidLink: false });
    }

    return res.json({ isValidLink: true, email: user.email });
  } catch (err) {
    res.json({ isValidLink: false });
  }
});

export { router as isValidUser };
