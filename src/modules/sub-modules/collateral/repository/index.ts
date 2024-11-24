import { NullableString } from 'src/shared/helpers/sanitize.input';
import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { CollateralQueries } from '../queries';

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
      const messages = await sqlQuest.manyOrNone(CollateralQueries.fetchCollateralsByLoanId, [Id]);
      return messages;
    } catch (error) {
      _logger.error(
        '[CollateralRepository]::Something went wrong when fetching chat messages by sender ID',
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
        '[CollateralRepository]::Something went wrong when creating chat message',
        error,
      );
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
