import express from 'express';
import { json } from 'body-parser';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
// import { GetQuestion } from './routes/getQuestion';
// import { addQuestion } from './routes/addQuestion';
// import { scrapePage } from './routes/scrapePage';
// import { getQuestionGroup } from './routes/getQuestionGroup';
// import { submitExam } from './routes/submitExam';

import { testset } from './routes/testSet';
import { question } from './routes/question';

import { authRoutes } from './routes/auth';
import { userTests } from './routes/userTests';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000'];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    // Check if the request origin is in the allowed origins list
    if (allowedOrigins.includes(origin || '') || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

// app.use(GetQuestion);
// app.use(addQuestion);
// app.use(scrapePage);
// app.use(getQuestionGroup);
// app.use(submitExam);
app.use('/testset', testset);
app.use('/question', question);
app.use('/userTests', userTests);

app.use('/auth', authRoutes);
app.all('*', async (req, res) => {
  res.send('all');
});

export { app };
