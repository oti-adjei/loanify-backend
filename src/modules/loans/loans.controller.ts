import { ResponseHandler } from '../../shared/helpers/response.handler';
import Logger from '../../config/logger';
import { LoanService } from './service';
import { StatusCodes } from 'http-status-codes';
import { DeleteLoanSchema, CreateLoanSchema, FetchLoanByIdSchema,FetchLoanStatusSchema, FetchLoansByUserIdSchema, UpdateLoanSchema } from './validation';

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

  static fetchAllLoans = async (req: any, res: any) => {
    try {
      const loans = await LoanService.fetchAllLoans();
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loans fetched successfully',
        code: StatusCodes.OK,
        data: loans,
      });
    } catch (error) {
      _logger.error(
        '[LoanController]::Something went wrong when fetching all loans',
        error,
      );
      throw error;
    }
  };

  static fetchLoanStatus = async (req: any, res: any) => {
    try {
      const { loanId } = req.params as FetchLoanStatusSchema;
      const loan = await LoanService.fetchLoanStatus(loanId);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan status fetched successfully',
        code: StatusCodes.OK,
        data: loan,
      });
    } catch (error) {
      _logger.error(
        '[LoanController]::Something went wrong when fetching loan status',
        error,
      );
      throw error;
    }
  };

  static createLoan = async (req: any, res: any) => {
    try {
      const { userId, loanAmount, loanTerm, interestRate, purpose, applicationDate, status } = req.body as CreateLoanSchema;
      //make applicationDate a Date object
      let newApplicationDate = new Date(applicationDate);

      const loan = await LoanService.createLoan(userId, loanAmount, loanTerm, interestRate, purpose, newApplicationDate, status);
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

      //make applicationDate a Date object
      let newApplicationDate = new Date(applicationDate);

      const loan = await LoanService.updateLoan(id, loanAmount, loanTerm, interestRate, purpose, newApplicationDate, status);
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
      return res.status(error.status || 500).json({
        status: 'error',
        message: error.message || 'Something went wrong',
        details: error.details || error.message, // Additional error details
        code: error.code || 'INTERNAL_SERVER_ERROR', // You can use custom error codes
      });
      // throw error;
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
