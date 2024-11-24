import express from 'express';

import { ValidationMiddleware } from '../../shared/validators/middleware';
import {fetchLoanByIdSchema, fetchLoansByUserIdSchema, createLoanSchema, updateLoanSchema, deleteLoanSchema}from './validation';
import { tryCatch } from '../../shared/helpers/try.catch.helper';
import { LoanController } from './loans.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;



// Route definitions
router.get(
  '/:id',
  validateRequest(fetchLoanByIdSchema),
  tryCatch(LoanController.fetchLoan)
);

router.get(
  '/user/:userId',
  validateRequest(fetchLoansByUserIdSchema),
  tryCatch(LoanController.fetchLoansByUserId)
);

router.post(
  '/',
  validateRequest(createLoanSchema),
  tryCatch(LoanController.createLoan)
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