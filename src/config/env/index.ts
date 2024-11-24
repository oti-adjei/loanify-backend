import { configDotenv } from 'dotenv';
import development from './development';
import test from './test';

configDotenv();

const defaults = {
  LOANIFY_NODE_ENV: process.env.LOANIFY_NODE_ENV,
  LOANIFY_PORT: process.env.LOANIFY_PORT,
  LOANIFY_DATABASE_URL: process.env.LOANIFY_DATABASE_URL,
  APP_NAME: process.env.APP_NAME,
  LOANIFY_DOMAIN: process.env.LOANIFY_DOMAIN,
  LOANIFY_SALT_ROUNDS: parseInt(process.env.LOANIFY_SALT_ROUNDS as string),
  LOANIFY_SECRET: process.env.LOANIFY_SECRET,
};

export default {
  development: { ...defaults, ...development },
  test: { ...defaults, ...test },
}[process.env.LOANIFY_NODE_ENV || 'development'];
