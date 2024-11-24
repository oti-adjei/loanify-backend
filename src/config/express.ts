import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { ApiError } from '../shared/utils/api.error';
import { ROUTES, Router } from '../routes/routes';

const App = (): Express => {
  const app = express();

  const corsOptions = {
    origin: '*',
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.disable('x-powered-by');
  app.use(ROUTES.V1_PATH, Router);
  app.get('/', (_: Request, res: Response) => {
    res.send('Envoyer Express + TypeScript Server');
  });

  app.use(ApiError.appError);

  app.use(ApiError.genericError);

  return app;
};

export default App;
