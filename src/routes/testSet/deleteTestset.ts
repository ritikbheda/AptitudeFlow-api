import express from 'express';
import { Testset } from '../../models/testSet';
import requireAuth from '../../middleware/auth';
import requireRole from '../../middleware/requireRole';
import jwtParser from '../../utils/jwtParser';
import { Company } from '../../models/company';

const router = express.Router();

router.delete('/:id', requireAuth, requireRole('company'), async (req, res) => {
  // delete all questions first
  // read above comment
  try {
    // res.send(companyUpdate);
    // TODO: check if the logged in company owns that testset
    // TODO: update all collections affected
    const deleted = await Testset.findByIdAndDelete(req.params.id);
    const { companyID } = jwtParser(req.cookies.jwt);

    const companyUpdate = await Company.findByIdAndUpdate(
      { _id: companyID },
      { $pull: { testIDs: deleted?._id } },
      { new: true }
    );

    // console.log('companyUpdate: ', companyUpdate);

    if (deleted) {
      res.send(deleted);
    } else {
      res.send({ result: '' });
    }
  } catch (err) {
    console.error(err);
  }
});

export { router as deleteTestset };
