import { ResponseHandler } from '../../../shared/helpers/response.handler';
import Logger from '../../../config/logger';
import { CollateralService } from './service';
import { StatusCodes } from 'http-status-codes';
import { FetchCollateralByIdSchema,CreateCollateralSchema, UpdateCollateralSchema, DeleteCollateralSchema, FetchCollateralsByLoanIdSchema } from './validation';

const _logger = new Logger('CollateralController');

export class CollateralController {
  static fetchCollateral = async (req: any, res: any) => {
    try {
      const { id } = req.params as FetchCollateralByIdSchema;

      const collateral = await CollateralService.fetchCollateral(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Collateral fetched successfully',
        code: StatusCodes.OK,
        data: collateral,
      });
    } catch (error) {
      _logger.error(
        '[CollateralController]::Something went wrong when fetching collateral',
        error,
      );
      throw error;
    }
  };

  static fetchCollateralsByLoanId = async (req: any, res: any) => {
    try {
      const { loanId } = req.params as FetchCollateralsByLoanIdSchema;

      const collaterals = await CollateralService.fetchCollateralsByLoanId(loanId);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Collaterals fetched successfully',
        code: StatusCodes.OK,
        data: collaterals,
      });
    } catch (error) {
      _logger.error(
        '[CollateralController]::Something went wrong when fetching collaterals by loan ID',
        error,
      );
      throw error;
    }
  };

  static createCollateral = async (req: any, res: any) => {
    try {
      const { loanId, collateralType, estimatedValue } = req.body as CreateCollateralSchema;

      const collateral = await CollateralService.createCollateral(loanId, collateralType, estimatedValue);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Collateral created successfully',
        code: StatusCodes.CREATED,
        data: collateral,
      });
    } catch (error) {
      _logger.error(
        '[CollateralController]::Something went wrong when creating collateral',
        error,
      );
      throw error;
    }
  };

  static updateCollateral = async (req: any, res: any) => {
    try {
      const { id } = req.params as UpdateCollateralSchema;
      const { collateralType,loanId, estimatedValue } = req.body as UpdateCollateralSchema;

      const collateral = await CollateralService.updateCollateral(id, collateralType,loanId, estimatedValue);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Collateral updated successfully',
        code: StatusCodes.OK,
        data: collateral,
      });
    } catch (error) {
      _logger.error(
        '[CollateralController]::Something went wrong when updating collateral',
        error,
      );
      throw error;
    }
  };

  static deleteCollateral = async (req: any, res: any) => {
    try {
      const { id } = req.params as DeleteCollateralSchema;

      const collateral = await CollateralService.deleteCollateral(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Collateral deleted successfully',
        code: StatusCodes.OK,
        data: collateral,
      });
    } catch (error) {
      _logger.error(
        '[CollateralController]::Something went wrong when deleting collateral',
        error,
      );
      throw error;
    }
  };
}