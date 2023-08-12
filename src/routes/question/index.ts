import express from 'express';
import { createQuestion } from './createQuestion';
import { editQuestion } from './editQuestion';
import { deleteQuestion } from './deleteQuestion';
import { getQuestion } from './getQuestion';

const router = express.Router();

router.use('/createQuestion', createQuestion);
router.use('/editQuestion', editQuestion);
router.use('/deleteQuestion', deleteQuestion);
router.use('/getQuestion', getQuestion);

export { router as question };
