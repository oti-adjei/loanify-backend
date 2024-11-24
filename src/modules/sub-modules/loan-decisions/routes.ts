import express from 'express';

import { ValidationMiddleware } from '../../../shared/validators/middleware';
import {fetchLoanDecisionByIdSchema, fetchLoanDecisionsByLoanIdSchema, createLoanDecisionSchema, updateLoanDecisionSchema, deleteLoanDecisionSchema}from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
import { LoanDecisionController } from './loan-decisions.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;
 

// Route definitions
router.get(
  '/:id',
  validateRequest(fetchLoanDecisionByIdSchema),
  tryCatch(LoanDecisionController.fetchLoanDecision)
);

router.get(
  '/loan/:loanId',
  validateRequest(fetchLoanDecisionsByLoanIdSchema),
  tryCatch(LoanDecisionController.fetchLoanDecisionsByLoanId)
);

router.post(
  '/',
  validateRequest(createLoanDecisionSchema),
  tryCatch(LoanDecisionController.createLoanDecision)
);

router.put(
  '/:id',
  validateRequest(updateLoanDecisionSchema),
  tryCatch(LoanDecisionController.updateLoanDecision)
);

router.delete(
  '/:id',
  validateRequest(deleteLoanDecisionSchema),
  tryCatch(LoanDecisionController.deleteLoanDecision)
);

// Export the router
module.exports = router;
