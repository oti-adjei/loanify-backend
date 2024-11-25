import { sqlQuest } from '../../../config/database';
import Logger from '../../../config/logger';
import { LoanQueries } from '../queries';

const _logger = new Logger('LoansRepository');

export class LoanRepository {
  static async fetchLoan(id: number): Promise<any | null> {
    try {
      const loan = await sqlQuest.oneOrNone(LoanQueries.fetchLoan, [id]);
      return loan;
    } catch (error) {
      _logger.error(
        '[LoanRepository]::Something went wrong when fetching loan',
        error,
      );
      throw error;
    }
  }

  static async fetchLoansByUserId(userId: number): Promise<any[]> {
    try {
      const loans = await sqlQuest.manyOrNone(LoanQueries.fetchLoansByUserId, [userId]);
      return loans;
    } catch (error) {
      _logger.error(
        '[LoanRepository]::Something went wrong when fetching loans by user ID',
        error,
      );
      throw error;
    }
  }

  static async fetchAllLoans(): Promise<any[]> {
    try {
      const loans = await sqlQuest.manyOrNone(LoanQueries.fetchAllLoans);
      return loans;
    } catch (error) {
      _logger.error(
        '[LoanRepository]::Something went wrong when fetching all loans',
        error,
      );
      throw error;
    }
  }
  static async fetchLoanStatus(loanId: number): Promise<any[]> {
    try {
      const loanStatuses = await sqlQuest.manyOrNone(LoanQueries.fetchLoanStatus, [loanId]);
      return loanStatuses;
    } catch (error) {
      _logger.error(
        '[LoanRepository]::Something went wrong when fetching loan statuses',
        error,
      );
      throw error;
    }
  }

  static async createLoan(userId: number, loanAmount: number, loanTerm: number, interestRate: number, purpose: string, applicationDate: Date, status: string): Promise<any> {
    try {
      const loan = await sqlQuest.one(LoanQueries.createLoan, [userId, loanAmount, loanTerm, interestRate, purpose, applicationDate, status]);
      return loan;
    } catch (error) {
      _logger.error(
        '[LoanRepository]::Something went wrong when creating loan',
        error,
      );
      throw error;
    }
  }

  static async updateLoan(id: number, loanAmount: number | null, loanTerm: number | null, interestRate: number | null, purpose: string | null, applicationDate: Date | null, status: string | null): Promise<any> {
    try {
      const loan = await sqlQuest.one(LoanQueries.updateLoan, [loanAmount, loanTerm, interestRate, purpose, applicationDate, status, id]);
      return loan;
    } catch (error) {
      _logger.error(
        '[LoanRepository]::Something went wrong when updating loan',
        error,
      );
      throw error;
    }
  }

  static async deleteLoan(id: number): Promise<any | null> {
    try {
      const loan = await sqlQuest.oneOrNone(LoanQueries.deleteLoan, [id]);
      return loan;
    } catch (error) {
      _logger.error(
        '[LoanRepository]::Something went wrong when deleting loan',
        error,
      );
      throw error;
    }
  }
}
