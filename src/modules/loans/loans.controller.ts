import { ResponseHandler } from '../../shared/helpers/response.handler';
import Logger from '../../config/logger';
import { LoanService } from './service';
import { StatusCodes } from 'http-status-codes';
import { DeleteLoanSchema, CreateLoanSchema, FetchLoanByIdSchema, FetchLoansByUserIdSchema, UpdateLoanSchema } from './validation';

const _logger = new Logger('LoansController');

export class LoanController {
  static fetchLoan = async (req: any, res: any) => {
    try {
      const { id } = req.params as FetchLoanByIdSchema;

      const loan = await LoanService.fetchLoan(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan fetched successfully',
        code: StatusCodes.OK,
        data: loan,
      });
    } catch (error) {
      _logger.error(
        '[LoanController]::Something went wrong when fetching loan',
        error,
      );
      throw error;
    }
  };

  static fetchLoansByUserId = async (req: any, res: any) => {
    try {
      const { userId } = req.params as FetchLoansByUserIdSchema;

      const loans = await LoanService.fetchLoansByUserId(userId);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loans fetched successfully',
        code: StatusCodes.OK,
        data: loans,
      });
    } catch (error) {
      _logger.error(
        '[LoanController]::Something went wrong when fetching loans by user ID',
        error,
      );
      throw error;
    }
  };

  static createLoan = async (req: any, res: any) => {
    try {
      const { userId, loanAmount, loanTerm, interestRate, purpose, applicationDate, status } = req.body as CreateLoanSchema;

      const loan = await LoanService.createLoan(userId, loanAmount, loanTerm, interestRate, purpose, applicationDate, status);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan created successfully',
        code: StatusCodes.CREATED,
        data: loan,
      });
    } catch (error) {
      _logger.error(
        '[LoanController]::Something went wrong when creating loan',
        error,
      );
      throw error;
    }
  };

  static updateLoan = async (req: any, res: any) => {
    try {
      const { id } = req.params as UpdateLoanSchema;
      const { loanAmount, loanTerm, interestRate, purpose, applicationDate, status } = req.body as UpdateLoanSchema;

      const loan = await LoanService.updateLoan(id, loanAmount, loanTerm, interestRate, purpose, applicationDate, status);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan updated successfully',
        code: StatusCodes.OK,
        data: loan,
      });
    } catch (error) {
      _logger.error(
        '[LoanController]::Something went wrong when updating loan',
        error,
      );
      throw error;
    }
  };

  static deleteLoan = async (req: any, res: any) => {
    try {
      const { id } = req.params as DeleteLoanSchema;

      const loan = await LoanService.deleteLoan(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan deleted successfully',
        code: StatusCodes.OK,
        data: loan,
      });
    } catch (error) {
      _logger.error(
        '[LoanController]::Something went wrong when deleting loan',
        error,
      );
      throw error;
    }
  };
}
