import express from 'express';
import { createTestset } from './createTestset';
import { deleteTestset } from './deleteTestset';
import { editTestset } from './editTestset';
import { getTestset } from './getTestset';

const router = express.Router();

router.use('/createTestset', createTestset);
router.use('/deleteTestset', deleteTestset);
router.use('/editTestset', editTestset);
router.use('/getTestset', getTestset);

export { router as testset };
