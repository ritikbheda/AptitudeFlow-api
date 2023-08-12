import express from 'express';
import { Testset } from '../../models/testSet';
import requireAuth from '../../middleware/auth';
import requireRole from '../../middleware/requireRole';
import jwtParser from '../../utils/jwtParser';
import { Company } from '../../models/company';
import { testset } from '.';

const router = express.Router();

router.post('/', requireAuth, requireRole('company'), async (req, res) => {
  const formData = req.body;

  try {
    const newTestset = Testset.build(formData);
    await newTestset.save();

    const { companyID } = jwtParser(req.cookies.jwt);

    const companyUpdate = await Company.updateOne(
      { _id: companyID },
      { $push: { testIDs: newTestset._id } },
      { new: true }
    );

    res.send(newTestset);
  } catch (err) {
    res.status(500).json({ message: 'error while adding testSet' });
  }
});

export { router as createTestset };
