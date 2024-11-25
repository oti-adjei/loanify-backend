import express from 'express';

import { ValidationMiddleware } from '../../shared/validators/middleware';
import {fetchLoanByIdSchema, fetchLoansByUserIdSchema, createLoanSchema, updateLoanSchema, deleteLoanSchema, fetchLoanStatusSchema}from './validation';
import { tryCatch } from '../../shared/helpers/try.catch.helper';
import { LoanController } from './loans.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;



// Route definitions

router.get(
  '/all',
  tryCatch(LoanController.fetchAllLoans)
);

router.post(
  '/',
  validateRequest(createLoanSchema),
  tryCatch(LoanController.createLoan)
);

//loan status
router.get(
  '/status/:loanId',
  validateRequest(fetchLoanStatusSchema),
  tryCatch(LoanController.fetchLoanStatus)
)


router.get(
  '/user/:userId',
  validateRequest(fetchLoansByUserIdSchema),
  tryCatch(LoanController.fetchLoansByUserId)
);



router.get(
  '/:id',
  validateRequest(fetchLoanByIdSchema),
  tryCatch(LoanController.fetchLoan)
);

router.put(
  '/:id',
  validateRequest(updateLoanSchema),
  tryCatch(LoanController.updateLoan)
);

router.delete(
  '/:id',
  validateRequest(deleteLoanSchema),
  tryCatch(LoanController.deleteLoan)
);

// Export the router
export const loanRouter = router;