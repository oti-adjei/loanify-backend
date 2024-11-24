import express from 'express';
import { userRouter } from '../../modules/consumer/routes';
import { loanRouter } from '../../modules/loans/routes';
import { creditHistoryRouter } from '../../modules/sub-modules/credit-history/routes';


const appRouter = express.Router();

appRouter.use('/loans', loanRouter);
appRouter.use('/user', userRouter);
appRouter.use('/credit-history', creditHistoryRouter);

export const Router = appRouter;
