import express from 'express';
import { body } from 'express-validator';
import { Testset } from '../../models/testSet';
import { Question } from '../../models/question';
import { Usertests } from '../../models/userTests';
import requireRole from '../../middleware/requireRole';
import requireAuth from '../../middleware/auth';
import { validate } from '../../middleware/validation';
import { User } from '../../models/user';
import jwtParser from '../../utils/jwtParser';
require('dotenv').config();

const jwt = require('jsonwebtoken');

const router = express.Router();

router.post(
  '/',
  requireAuth,
  requireRole('user'),
  validate([body('testsetID').exists().withMessage('testsetID required')]),
  async (req, res) => {
    const { testsetID } = req.body;

    // to avoid multiple tests by same user, check if there is any test user as given that as testset_id as tetsetID.
    // if he does, check if it is expired. if it is expired, let the user start the test.
    // if it is not expired, start the test which is started.

    const testset = await Testset.findById(testsetID);

    const questions = await Question.find(
      { _id: { $in: testset?.questions } },
      'question options answer -_id'
    );

    const token = jwt.sign({}, process.env.TEST_EXPIREAT_KEY!, {
      expiresIn: `${testset?.time_limit}m`,
    });

    const newUserTest = await Usertests.build({
      testsetID: testsetID,
      testQuestions: questions as any,
      expires_at: token,
    });

    const saved = await newUserTest.save();

    // although it says companyID, but actually its the userID. need to change the variables in all of the code
    const { companyID } = jwtParser(req.cookies.jwt);

    const updateUser = await User.updateOne(
      { _id: companyID },
      { $push: { testsTaken: saved._id } },
      { new: true }
    );

    const testURL = `localhost:8888/userTests/test/${saved._id}`;

    res.json({ testURL });
  }
);

export { router as startTest };
