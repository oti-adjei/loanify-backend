import { z } from 'zod';
import { AppEnv } from '../enums';

export interface EnvProps {
  PORT: number;
  LOANIFY_NODE_ENV: string;
  LOANIFY_DATABASE_URL: string;
  APP_NAME: string;
  LOANIFY_SALT_ROUNDS: number;
  LOANIFY_SECRET: string;
  LOANIFY_DOMAIN: string;
}

export const envValidatorSchema = z.object({
  PORT: z.string().default('8000'),
  LOANIFY_NODE_ENV: z.string().default(AppEnv.DEVELOPMENT),

  LOANIFY_DATABASE_URL: z.string(),

  APP_NAME: z.string(),

  LOANIFY_SALT_ROUNDS: z.number(),

  LOANIFY_SECRET: z.string(),

  LOANIFY_DOMAIN: z.string(),
});
