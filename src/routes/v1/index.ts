import express from 'express';
import { userRouter } from '../../modules/consumer/routes';
import { loanRouter } from '../../modules/loans/routes';
import { creditHistoryRouter } from '../../modules/sub-modules/credit-history/routes';
import { collateralRouter } from '../../modules/sub-modules/collateral/routes';
import { LoanDecisionRouter } from '../../modules/sub-modules/loan-decisions/routes';


const appRouter = express.Router();

appRouter.use('/loans', loanRouter);
appRouter.use('/user', userRouter);
appRouter.use('/credit-history', creditHistoryRouter);
appRouter.use('/collateral', collateralRouter);
appRouter.use('/loan-decision', LoanDecisionRouter);

export const Router = appRouter;
