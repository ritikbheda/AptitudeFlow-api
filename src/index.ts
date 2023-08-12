import mongoose from 'mongoose';
require('dotenv').config();

import { app } from './app';

async function start() {
  try {
    const requiredVariables = [
      'MONGODB_URL',
      'AUTH_KEY',
      'TEST_EXPIREAT_KEY',
      'SENDGRID_EMAIL_API_KEY',
      'SENDGRID_CONFIRM_EMAIL_TEMP',
    ];
    const missingVariables = [];
    for (const variable of requiredVariables) {
      if (!process.env[variable]) {
        missingVariables.push(variable);
      }
    }

    if (missingVariables.length > 0) {
      console.warn(
        `Warning: The following required environment variables are missing or undefined: ${missingVariables.join(
          ', '
        )}`
      );
    }

    try {
      await mongoose.connect(process.env.MONGODB_URL!);
      console.log('connected to mongoDB');
    } catch (err) {
      console.error(err);
    }

    app.listen(8888, () => {
      console.log('app listening to 3000');
    });
  } catch {}
}

start().catch(console.dir);
