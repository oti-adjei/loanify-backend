import sqlQuestFactory, { SqlQuest } from '@bitreel/sql-quest';
import Env from '../../shared/utils/env';
import Deasyncify from 'deasyncify';
import Logger from '../logger';
import * as process from 'process';

export const sqlQuest: SqlQuest = sqlQuestFactory({
  databaseUrl: Env.get<string>('LOANIFY_DATABASE_URL'),
});

let retry = 3;

export async function connectDB(): Promise<SqlQuest> {
  const logger = new Logger(connectDB.name);

  const [, err] = await Deasyncify.watch(sqlQuest.connect());

  if (err != null) {
    logger.error(err);
    if (retry > 0) {
      logger.log(`Error connecting to database, retrying... (${retry} left)`);
      retry -= 1;
      await connectDB();
    }

    process.exit(1);
  }

  logger.log('Connected to postgres database');

  return sqlQuest;
}
