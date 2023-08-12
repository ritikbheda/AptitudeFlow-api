import express from 'express';
import { Question } from '../../models/question';
import { Testset } from '../../models/testSet';
import requireAuth from '../../middleware/auth';
import requireRole from '../../middleware/requireRole';

const router = express.Router();

router.post('/', requireAuth, requireRole('company'), async (req, res) => {
  try {
    const formData = req.body;
    const newQuestion = await Question.build(formData);
    const questionSaved = await newQuestion.save();

    if (formData.hasOwnProperty('testset_id')) {
      try {
        await Testset.findByIdAndUpdate(
          formData.testset_id,
          { $push: { questions: questionSaved._id } },
          { new: true }
        ); // update testset with question id
      } catch (err) {
        questionSaved.testset_id = '';
        await questionSaved.save();
        // removed the above saved testset_id as it is not valid
      }
    }

    return res.status(201).json(questionSaved);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Question could not be saved, try again' });
  }
});

export { router as createQuestion };
