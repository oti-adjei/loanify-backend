import express from 'express';

import { ValidationMiddleware } from '../../../shared/validators/middleware';
import {fetchCollateralByIdSchema, createCollateralSchema, updateCollateralSchema, deleteCollateralSchema } from './validation';
import { tryCatch } from '../../../shared/helpers/try.catch.helper';
import { CollateralController } from './collateral.controller';



const router = express.Router();

const { validateRequest } = ValidationMiddleware;

// Route definitions

router.post(
  '/',
  validateRequest(createCollateralSchema),
  tryCatch(CollateralController.createCollateral)
);

router.get(
  '/sender/:id',
  validateRequest(fetchCollateralByIdSchema),
  tryCatch(CollateralController.fetchCollateralsByLoanId)
);

router.get(
  '/:id',
  validateRequest(fetchCollateralByIdSchema),
  tryCatch(CollateralController.fetchCollateral
));

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
export const collateralRouter = router;
