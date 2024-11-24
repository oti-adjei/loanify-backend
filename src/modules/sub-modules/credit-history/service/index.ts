import { ApiError } from '../../../../shared/utils/api.error';
import Logger from '../../../../config/logger';
import { CreditHistoryRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';

const _logger = new Logger('CreditHistoryService');

export class CreditHistoryService {
  static fetchCreditHistory = async (id: number) => {
    try {
      const creditHistory = await CreditHistoryRepository.fetchCreditHistory(id);
      if (!creditHistory) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Credit history not found');
      }
      return creditHistory;
    } catch (error) {
      _logger.error(
        '[CreditHistoryService]::Something went wrong when fetching credit history',
        error,
      );
      throw error;
    }
  };

  static fetchCreditHistoriesByUserId = async (userId: number) => {
    try {
      const creditHistories = await CreditHistoryRepository.fetchCreditHistoriesByUserId(userId);
      if (!creditHistories || creditHistories.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No credit histories found for the given user ID');
      }
      return creditHistories;
    } catch (error) {
      _logger.error(
        '[CreditHistoryService]::Something went wrong when fetching credit histories by user ID',
        error,
      );
      throw error;
    }
  };

  static createCreditHistory = async (userId: number, creditorName: string, accountNumber: string, creditLimit: number, outstandingBalance: number, paymentHistory: string) => {
    try {
      const creditHistory = await CreditHistoryRepository.createCreditHistory(userId, creditorName, accountNumber, creditLimit, outstandingBalance, paymentHistory);
      return creditHistory;
    } catch (error) {
      _logger.error(
        '[CreditHistoryService]::Something went wrong when creating credit history',
        error,
      );
      throw error;
    }
  };

  static updateCreditHistory = async (id: number, creditorName: string | null, accountNumber: string | null, creditLimit: number | null, outstandingBalance: number | null, paymentHistory: string | null) => {
    try {
      const creditHistory = await CreditHistoryRepository.updateCreditHistory(id, creditorName, accountNumber, creditLimit, outstandingBalance, paymentHistory);
      if (!creditHistory) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Credit history not found');
      }
      return creditHistory;
    } catch (error) {
      _logger.error(
        '[CreditHistoryService]::Something went wrong when updating credit history',
        error,
      );
      throw error;
    }
  };

  static deleteCreditHistory = async (id: number) => {
    try {
      const creditHistory = await CreditHistoryRepository.deleteCreditHistory(id);
      if (!creditHistory) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Credit history not found');
      }
      return creditHistory;
    } catch (error) {
      _logger.error(
        '[CreditHistoryService]::Something went wrong when deleting credit history',
        error,
      );
      throw error;
    }
  };
}
