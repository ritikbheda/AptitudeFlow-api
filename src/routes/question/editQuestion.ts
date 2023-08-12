import express from 'express';
import { Question } from '../../models/question';
import requireAuth from '../../middleware/auth';
import requireRole from '../../middleware/requireRole';

const router = express.Router();

router.put('/:id', requireAuth, requireRole('company'), async (req, res) => {
  const questionId = req.params.id;
  const body = req.body;

  try {
    // high chance ERROR from here.
    // we only checking if answer is string, need to check if it is array as well
    if (
      (!body.hasOwnProperty('question') || typeof body.question === 'string') &&
      (!body.hasOwnProperty('options') || Array.isArray(body.options)) &&
      (!body.hasOwnProperty('answer') || typeof body.answer === 'string')
    ) {
      const questionEdited = await Question.updateOne(
        { _id: questionId },
        {
          question: body.question,
          options: body.options,
          answer: body.answer,
        }
      );
      res.status(201).send(questionEdited);
    } else {
      res
        .status(500)
        .send({ result: 'some problem with request data at edit question' });
    }
  } catch (err) {
    res.status(500).send({ result: 'an error occured' });
  }
});

export { router as editQuestion };
