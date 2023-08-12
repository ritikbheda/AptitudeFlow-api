import express from 'express';
import { Usertests } from '../../models/userTests';
import requireAuth from '../../middleware/auth';
import requireRole from '../../middleware/requireRole';
require('dotenv').config();

const jwt = require('jsonwebtoken');

const router = express.Router();

// Test route with time-limited access
router.get('/:token', requireAuth, requireRole('user'), async (req, res) => {
  const userTestID = req.params.token;

  const userTestExpiresAt = await Usertests.findById({
    _id: userTestID,
  }).select('expires_at');

  if (!userTestExpiresAt?.expires_at) {
    return res.status(401).json({ message: 'no such test found' });
  }

  try {
    const decode = jwt.verify(
      userTestExpiresAt.expires_at,
      process.env.TEST_EXPIREAT_KEY!
    );

    // test is still going on

    const userTest = await Usertests.findById({ _id: userTestID }).select(
      '-testQuestions.answer -expires_at -responses -result'
    );

    res.send({ userTest, test_available: true, exp: decode.exp });
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      const userTest = await Usertests.findById({ _id: userTestID }).select(
        '-expires_at'
      );

      res.send({ userTest, test_available: false });
    } else {
      console.error(err);
      throw new Error('some error while jwt parsing');
    }
  }
});

export { router as testToken };
