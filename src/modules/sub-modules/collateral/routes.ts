import express from 'express';

import { ValidationMiddleware } from '../../../shared/validators/middleware';
import {fetchCollateralByIdSchema, createCollateralSchema, updateCollateralSchema, deleteCollateralSchema } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
import { CollateralController } from './collateral.controller';



const router = express.Router();

const { validateRequest } = ValidationMiddleware;

// Route definitions
router.get(
  '/:id',
  validateRequest(fetchCollateralByIdSchema),
  tryCatch(CollateralController.fetchCollateral
));

router.get(
  '/sender/:senderId',
  validateRequest(fetchCollateralByIdSchema),
  tryCatch(CollateralController.fetchCollateralsByLoanId)
);

router.post(
  '/',
  validateRequest(createCollateralSchema),
  tryCatch(CollateralController.createCollateral)
);

router.put(
  '/:id',
  validateRequest(updateCollateralSchema),
  tryCatch(CollateralController.updateCollateral)
);

router.delete(
  '/:id',
  validateRequest(deleteCollateralSchema),
  tryCatch(CollateralController.deleteCollateral)
);

// Export the router
module.exports = router;
