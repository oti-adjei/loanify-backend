import { ApiError } from '../../../../shared/utils/api.error';
import Logger from '../../../../config/logger';
import { LoanDecisionRepository, } from '../repository';
import { StatusCodes } from 'http-status-codes';
import { NullableString } from 'src/shared/helpers/sanitize.input';

const _logger = new Logger('LoanDecisionsService');

export class LoanDecisionService {
  static fetchLoanDecision = async (id: number) => {
    try {
      const loanDecision = await LoanDecisionRepository.fetchLoanDecision(id);
      if (!loanDecision) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Loan decision not found');
      }
      return loanDecision;
    } catch (error) {
      _logger.error(
        '[LoanDecisionService]::Something went wrong when fetching loan decision',
        error,
      );
      throw error;
    }
  };

  static fetchLoanDecisionsByLoanId = async (loanId: number) => {
    try {
      const loanDecisions = await LoanDecisionRepository.fetchLoanDecisionsByLoanId(loanId);
      if (!loanDecisions || loanDecisions.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No loan decisions found for the given loan ID');
      }
      return loanDecisions;
    } catch (error) {
      _logger.error(
        '[LoanDecisionService]::Something went wrong when fetching loan decisions by loan ID',
        error,
      );
      throw error;
    }
  };

  static createLoanDecision = async (loanId: number, decisionDate: Date, decisionStatus: string, reason: NullableString, approvedBy: number) => {
    try {
      const loanDecision = await LoanDecisionRepository.createLoanDecision(loanId, decisionDate, decisionStatus, reason, approvedBy);
      return loanDecision;
    } catch (error) {
      _logger.error(
        '[LoanDecisionService]::Something went wrong when creating loan decision',
        error,
      );
      throw error;
    }
  };

  static updateLoanDecision = async (id: number, decisionDate: Date | null, decisionStatus: string | null, reason: string | null, approvedBy: number | null) => {
    try {
      const loanDecision = await LoanDecisionRepository.updateLoanDecision(id, decisionDate, decisionStatus, reason, approvedBy);
      if (!loanDecision) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Loan decision not found');
      }
      return loanDecision;
    } catch (error) {
      _logger.error(
        '[LoanDecisionService]::Something went wrong when updating loan decision',
        error,
      );
      throw error;
    }
  };

  static deleteLoanDecision = async (id: number) => {
    try {
      const loanDecision = await LoanDecisionRepository.deleteLoanDecision(id);
      if (!loanDecision) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Loan decision not found');
      }
      return loanDecision;
    } catch (error) {
      _logger.error(
        '[LoanDecisionService]::Something went wrong when deleting loan decision',
        error,
      );
      throw error;
    }
  };
}
