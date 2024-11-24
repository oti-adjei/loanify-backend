import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { CreditHistoryQueries } from '../queries';

const _logger = new Logger('CreditHistoryRepository');

export class CreditHistoryRepository {
  static async fetchCreditHistory(id: number): Promise<any | null> {
    try {
      const creditHistory = await sqlQuest.oneOrNone(CreditHistoryQueries.fetchCreditHistory, [id]);
      return creditHistory;
    } catch (error) {
      _logger.error(
        '[CreditHistoryRepository]::Something went wrong when fetching credit history',
        error,
      );
      throw error;
    }
  }

  static async fetchCreditHistoriesByUserId(userId: number): Promise<any[]> {
    try {
      const creditHistories = await sqlQuest.manyOrNone(CreditHistoryQueries.fetchCreditHistoriesByUserId, [userId]);
      return creditHistories;
    } catch (error) {
      _logger.error(
        '[CreditHistoryRepository]::Something went wrong when fetching credit histories by user ID',
        error,
      );
      throw error;
    }
  }

  static async createCreditHistory(userId: number, creditorName: string, accountNumber: string, creditLimit: number, outstandingBalance: number, paymentHistory: string): Promise<any> {
    try {
      const creditHistory = await sqlQuest.one(CreditHistoryQueries.createCreditHistory, [userId, creditorName, accountNumber, creditLimit, outstandingBalance, paymentHistory]);
      return creditHistory;
    } catch (error) {
      _logger.error(
        '[CreditHistoryRepository]::Something went wrong when creating credit history',
        error,
      );
      throw error;
    }
  }

  static async updateCreditHistory(id: number, creditorName: string | null, accountNumber: string | null, creditLimit: number | null, outstandingBalance: number | null, paymentHistory: string | null): Promise<any> {
    try {
      const creditHistory = await sqlQuest.one(CreditHistoryQueries.updateCreditHistory, [creditorName, accountNumber, creditLimit, outstandingBalance, paymentHistory, id]);
      return creditHistory;
    } catch (error) {
      _logger.error(
        '[CreditHistoryRepository]::Something went wrong when updating credit history',
        error,
      );
      throw error;
    }
  }

  static async deleteCreditHistory(id: number): Promise<any | null> {
    try {
      const creditHistory = await sqlQuest.oneOrNone(CreditHistoryQueries.deleteCreditHistory, [id]);
      return creditHistory;
    } catch (error) {
      _logger.error(
        '[CreditHistoryRepository]::Something went wrong when deleting credit history',
        error,
      );
      throw error;
    }
  }
}
