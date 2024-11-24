import { ApiError } from '../../../../shared/utils/api.error';
import Logger from '../../../../config/logger';
import { CollateralRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';

const _logger = new Logger('CollateralService');

export class CollateralService {
  static fetchCollateral = async (id: number) => {
    try {
      const collateral = await CollateralRepository.fetchCollateral(id);
      if (!collateral) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Collateral not found');
      }
      return collateral;
    } catch (error) {
      _logger.error(
        '[CollateralService]::Something went wrong when fetching collateral',
        error,
      );
      throw error;
    }
  };

  static fetchCollateralsByLoanId = async (loanId: number) => {
    try {
      const collaterals = await CollateralRepository.fetchCollateralsByLoanId(loanId);
      if (!collaterals || collaterals.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No collaterals found for the given loan ID');
      }
      return collaterals;
    } catch (error) {
      _logger.error(
        '[CollateralService]::Something went wrong when fetching collaterals by loan ID',
        error,
      );
      throw error;
    }
  };

  static createCollateral = async (loanId: number, collateralType: string, estimatedValue: number) => {
    try {
      const collateral = await CollateralRepository.createCollateral(loanId, collateralType, estimatedValue);
      return collateral;
    } catch (error) {
      _logger.error(
        '[CollateralService]::Something went wrong when creating collateral',
        error,
      );
      throw error;
    }
  };

  static updateCollateral = async (id: number, collateralType: string | null, loanId: number | null, estimatedValue: number | null) => {
    if (loanId === null ) {
      throw new Error('Loan ID is required for updating collateral');
    }
    try {
      const collateral = await CollateralRepository.updateCollateral(loanId, collateralType, estimatedValue?? 0, id);
      if (!collateral) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Collateral not found');
      }
      return collateral;
    } catch (error) {
      _logger.error(
        '[CollateralService]::Something went wrong when updating collateral',
        error,
      );
      throw error;
    }
  };

  static deleteCollateral = async (id: number) => {
    try {
      const collateral = await CollateralRepository.deleteCollateral(id);
      if (!collateral) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Collateral not found');
      }
      return collateral;
    } catch (error) {
      _logger.error(
        '[CollateralService]::Something went wrong when deleting collateral',
        error,
      );
      throw error;
    }
  };
}
