import { ResponseHandler } from '../../../shared/helpers/response.handler';
import Logger from '../../../config/logger';
import { LoanDecisionService } from './service';
import { StatusCodes } from 'http-status-codes';
import { FetchLoanDecisionByIdSchema, CreateLoanDecisionSchema, UpdateLoanDecisionSchema, DeleteLoanDecisionSchema, FetchLoanDecisionsByLoanIdSchema } from './validation';

const _logger = new Logger('LoanDecisionsController');

export class LoanDecisionController {
  static fetchLoanDecision = async (req: any, res: any) => {
    try {
      const { id } = req.params as FetchLoanDecisionByIdSchema;

      const loanDecision = await LoanDecisionService.fetchLoanDecision(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan decision fetched successfully',
        code: StatusCodes.OK,
        data: loanDecision,
      });
    } catch (error) {
      _logger.error(
        '[LoanDecisionController]::Something went wrong when fetching loan decision',
        error,
      );
      throw error;
    }
  };

  static fetchLoanDecisionsByLoanId = async (req: any, res: any) => {
    try {
      const { loanId } = req.params as FetchLoanDecisionsByLoanIdSchema;

      const loanDecisions = await LoanDecisionService.fetchLoanDecisionsByLoanId(loanId);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan decisions fetched successfully',
        code: StatusCodes.OK,
        data: loanDecisions,
      });
    } catch (error) {
      _logger.error(
        '[LoanDecisionController]::Something went wrong when fetching loan decisions by loan ID',
        error,
      );
      throw error;
    }
  };

  static createLoanDecision = async (req: any, res: any) => {
    try {
      const { loanId, decisionDate, decisionStatus, reason, approvedBy } = req.body as CreateLoanDecisionSchema;

      const loanDecision = await LoanDecisionService.createLoanDecision(loanId, decisionDate, decisionStatus, reason, approvedBy);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan decision created successfully',
        code: StatusCodes.CREATED,
        data: loanDecision,
      });
    } catch (error) {
      _logger.error(
        '[LoanDecisionController]::Something went wrong when creating loan decision',
        error,
      );
      throw error;
    }
  };

  static updateLoanDecision = async (req: any, res: any) => {
    try {
      const { id } = req.params as UpdateLoanDecisionSchema;
      const { decisionDate, decisionStatus, reason, approvedBy } = req.body as UpdateLoanDecisionSchema;

      const loanDecision = await LoanDecisionService.updateLoanDecision(id, decisionDate, decisionStatus, reason, approvedBy);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan decision updated successfully',
        code: StatusCodes.OK,
        data: loanDecision,
      });
    } catch (error) {
      _logger.error(
        '[LoanDecisionController]::Something went wrong when updating loan decision',
        error,
      );
      throw error;
    }
  };

  static deleteLoanDecision = async (req: any, res: any) => {
    try {
      const { id } = req.params as DeleteLoanDecisionSchema;

      const loanDecision = await LoanDecisionService.deleteLoanDecision(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Loan decision deleted successfully',
        code: StatusCodes.OK,
        data: loanDecision,
      });
    } catch (error) {
      _logger.error(
        '[LoanDecisionController]::Something went wrong when deleting loan decision',
        error,
      );
      throw error;
    }
  };
}
