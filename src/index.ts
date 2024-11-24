import { configDotenv } from 'dotenv';
import http from 'http';
import { AppEnv } from './shared/enums';
import { Express } from 'express';
import App from './config/express';
import Env from './shared/utils/env';
import { envValidatorSchema } from './shared/validators/env-validator';
import Logger from './config/logger';
import { connectDB } from './config/database';

configDotenv();


const main = async (App: (...args: any[]) => Express) => {
  const logger = new Logger(App.name);

  await Env.validateEnv(envValidatorSchema);
  await connectDB();

  const app = App();


  const server = http.createServer(app);

  const PORT = Env.get<number>('PORT') || 8080;
  const NODE_ENV = Env.get<string>('LOANIFY_NODE_ENV');

  NODE_ENV !== AppEnv.PRODUCTION &&
    server.on('listening', () => {
      logger.log(`listening on http://localhost:${PORT}`);
    });

  server.listen(PORT);


};

main(App);
