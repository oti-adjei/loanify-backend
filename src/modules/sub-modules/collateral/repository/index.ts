import { NullableString } from 'src/shared/helpers/sanitize.input';
import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { CollateralQueries } from '../queries';
import { ApiError } from '../../../../shared/utils/api.error';
import { StatusCodes } from 'http-status-codes';

const _logger = new Logger('CollateralRepository');

export class CollateralRepository {
  static fetchCollateral = async (collateral_id: number) => {
    try {
      const message = await sqlQuest.oneOrNone(CollateralQueries.fetchCollateral, [collateral_id]);
      return message;
    } catch (error) {
      _logger.error(
        '[CollateralRepository]::Something went wrong when fetching chat message',
        error,
      );
      throw error;
    }
  };

  static fetchCollateralsByLoanId = async (Id: number) => {
    try {
      const collateral = await sqlQuest.manyOrNone(CollateralQueries.fetchCollateralsByLoanId, [Id]);
      return collateral;
    } catch (error) {
      _logger.error(
        '[CollateralRepository]::Something went wrong when fetching collateral by loan ID',
        error,
      );
      throw error;
    }
  };

  

  static createCollateral = async (loanId:number, collateralType: string, estimatedValue: number) => {
    try {
      const Collateral = await sqlQuest.one(CollateralQueries.createCollateral, [loanId, collateralType, estimatedValue]);
      return Collateral;
    } catch (error) {
      _logger.error(
        '[CollateralRepository]::Something went wrong when creating collateral',
        error,
      );
      if (error.code === '23503') { // PostgreSQL foreign key violation
       throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid loan_id: the loan does not exist.');
      }
      throw error;
    }
  };

  static updateCollateral = async  (loanId:number, collateralType: NullableString, estimatedValue: number,collateral_id: number ) => {
    try {
      const Collateral = await sqlQuest.one(CollateralQueries.updateCollateral, [loanId, collateralType, estimatedValue, collateral_id]);
      return Collateral;
    } catch (error) {
      _logger.error(
        '[CollateralRepository]::Something went wrong when updating chat message',
        error,
      );
      throw error;
    }
  };

  static deleteCollateral = async (collateral_id: number) => {
    try {
      const Collateral = await sqlQuest.oneOrNone(CollateralQueries.deleteCollateral, [collateral_id]);
      return Collateral;
    } catch (error) {
      _logger.error(
        '[CollateralRepository]::Something went wrong when deleting chat message',
        error,
      );
      throw error;
    }
  };
}
