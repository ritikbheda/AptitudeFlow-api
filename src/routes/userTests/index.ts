import express from 'express';
import { startTest } from './startTest';
import { submitTest } from './submitTest';
import { testToken } from './testToken';

const router = express.Router();

router.use('/start-test', startTest);
router.use('/test', testToken);
router.use('/submit-test', submitTest);

export { router as userTests };
