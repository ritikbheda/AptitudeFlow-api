import express from 'express';
import { Testset } from '../../models/testSet';
import requireAuth from '../../middleware/auth';
import requireRole from '../../middleware/requireRole';

const router = express.Router();

router.put('/:id', requireAuth, requireRole('company'), async (req, res) => {
  const TestsetId = req.params.id;
  const body = req.body;

  try {
    if (
      (!body.hasOwnProperty('time_limit') ||
        typeof body.time_limit === 'number') && // condition check: either time_limit is not present
      (!body.hasOwnProperty('copy_allowed') || // or if present, it should be of type number
        typeof body.copy_allowed === 'boolean')
    ) {
      const testSet = await Testset.updateOne(
        { _id: TestsetId },
        {
          time_limit: body.time_limit,
          copy_allowed: body.copy_allowed,
          name: body.name,
        }
      );
      res.status(201).send(testSet);
    } else {
      res
        .status(500)
        .send({ result: 'some problem with time_limit or copy_allowed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ result: 'an error occured' });
  }
});

export { router as editTestset };
