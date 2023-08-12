import express from 'express';
import { Usertests } from '../../models/userTests';
import { countSimilarAnswers } from '../../utils/countSimilarAnswer';

const router = express.Router();

router.post('/:userTestID', async (req, res) => {
  /**
   * - Probable limitation right now: if the student submits the exam late, it would still accept the responses
   * - So, currently, the frontend needs some functionality that the exam be automatically submitted if the
   *   time is up.
   *
   * accept from body
   * [{
   *  "_id": "sdfsdf",
   *  "answer": ["asn", "asd"]
   * },
   * {
   *  "_id": "sdfsdf",
   *  "answer": "asn"
   * }]
   */

  const { userTestID } = req.params;
  const { responses } = req.body;

  try {
    const userTestAnswers = await Usertests.findById({
      _id: userTestID,
    });
    if (userTestAnswers) {
      const marks = countSimilarAnswers(
        userTestAnswers?.testQuestions,
        responses
      );

      userTestAnswers.responses! = responses;
      userTestAnswers.result! = marks;
      const updatedUserTestAnswers = await userTestAnswers.save();

      res.status(200).json(updatedUserTestAnswers);
    } else {
    }
  } catch (err) {
    res.status(200).json({ message: 'could not find the document' });
  }
});

export { router as submitTest };
