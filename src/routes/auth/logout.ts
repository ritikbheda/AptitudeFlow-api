import { Request, Response, Router } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging out' });
  }
});

export { router as logout };
