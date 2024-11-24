import express from 'express';

import { ValidationMiddleware } from '../../../shared/validators/middleware';
import { fetchCreditHistoryByIdSchema, createCreditHistorySchema, updateCreditHistorySchema, deleteCreditHistorySchema } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
import { CreditHistoryController } from './credit-history.controller';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;




// Route definitions
router.get(
  '/:id',
  validateRequest(fetchCreditHistoryByIdSchema),
  tryCatch(CreditHistoryController.fetchCreditHistory
));

router.get(
  '/user/:userId',
  validateRequest(fetchCreditHistoryByIdSchema),
  tryCatch(CreditHistoryController.fetchCreditHistoriesByUserId)
);

router.post(
  '/',
  validateRequest(createCreditHistorySchema),
  tryCatch(CreditHistoryController.createCreditHistory)
);

router.put(
  '/:id',
  validateRequest(updateCreditHistorySchema),
  tryCatch(CreditHistoryController.updateCreditHistory)
);

router.delete(
  '/:id',
  validateRequest(deleteCreditHistorySchema),
  tryCatch(CreditHistoryController.deleteCreditHistory)
);

// Export the router
export const creditHistoryRouter = router;