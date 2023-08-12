import express from 'express';
import { Question } from '../../models/question';
import { Testset } from '../../models/testSet';
import requireAuth from '../../middleware/auth';
import requireRole from '../../middleware/requireRole';

const router = express.Router();

router.delete('/:id', requireAuth, requireRole('company'), async (req, res) => {
  const deleteID = req.params.id;

  const deleteDocument = await Question.findByIdAndDelete({ _id: deleteID });

  const updatedTestset = await Testset.findByIdAndUpdate(
    { _id: deleteDocument?.testset_id },
    { $pull: { Questions: deleteDocument?._id } },
    { new: true }
  );

  // console.log(updatedTestset);

  return res.status(204).json(deleteDocument);
});

export { router as deleteQuestion };
