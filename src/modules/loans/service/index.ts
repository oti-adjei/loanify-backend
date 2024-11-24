import { ApiError } from '../../../shared/utils/api.error';
import Logger from '../../../config/logger';
import { LoanRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';

const _logger = new Logger('LoansService');

export class LoanService {
  static fetchLoan = async (id: number) => {
    try {
      const loan = await LoanRepository.fetchLoan(id);
      if (!loan) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Loan not found');
      }
      return loan;
    } catch (error) {
      _logger.error(
        '[LoanService]::Something went wrong when fetching loan',
        error,
      );
      throw error;
    }
  };

  static fetchLoansByUserId = async (userId: number) => {
    try {
      const loans = await LoanRepository.fetchLoansByUserId(userId);
      if (!loans || loans.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No loans found for the given user ID');
      }
      return loans;
    } catch (error) {
      _logger.error(
        '[LoanService]::Something went wrong when fetching loans by user ID',
        error,
      );
      throw error;
    }
  };

  static createLoan = async (userId: number, loanAmount: number, loanTerm: number, interestRate: number, purpose: string, applicationDate: Date, status: string) => {
    try {
      const loan = await LoanRepository.createLoan(userId, loanAmount, loanTerm, interestRate, purpose, applicationDate, status);
      return loan;
    } catch (error) {
      _logger.error(
        '[LoanService]::Something went wrong when creating loan',
        error,
      );
      throw error;
    }
  };

  static updateLoan = async (id: number, loanAmount: number, loanTerm: number, interestRate: number, purpose: string, applicationDate: Date, status: string) => {
    try {
      const loan = await LoanRepository.updateLoan(id, loanAmount, loanTerm, interestRate, purpose, applicationDate, status);
      if (!loan) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Loan not found');
      }
      return loan;
    } catch (error) {
      _logger.error(
        '[LoanService]::Something went wrong when updating loan',
        error,
      );
      throw error;
    }
  };

  static deleteLoan = async (id: number) => {
    try {
      const loan = await LoanRepository.deleteLoan(id);
      if (!loan) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Loan not found');
      }
      return loan;
    } catch (error) {
      _logger.error(
        '[LoanService]::Something went wrong when deleting loan',
        error,
      );
      throw error;
    }
  };
}
