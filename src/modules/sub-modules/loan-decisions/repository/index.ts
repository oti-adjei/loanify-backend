import { NullableString } from 'src/shared/helpers/sanitize.input';
import { sqlQuest } from '../../../../config/database';
import Logger from '../../../../config/logger';
import { LoanDecisionQueries } from '../queries';

const _logger = new Logger('LoanDecisionsRepository');

export class LoanDecisionRepository {
  static async fetchLoanDecision(id: number): Promise<any | null> {
    try {
      const loanDecision = await sqlQuest.oneOrNone(LoanDecisionQueries.fetchLoanDecision, [id]);
      return loanDecision;
    } catch (error) {
      _logger.error(
        '[LoanDecisionRepository]::Something went wrong when fetching loan decision',
        error,
      );
      throw error;
    }
  }

  static async fetchLoanDecisionsByLoanId(loanId: number): Promise<any[]> {
    try {
      const loanDecisions = await sqlQuest.manyOrNone(LoanDecisionQueries.fetchLoanDecisionsByLoanId, [loanId]);
      return loanDecisions;
    } catch (error) {
      _logger.error(
        '[LoanDecisionRepository]::Something went wrong when fetching loan decisions by loan ID',
        error,
      );
      throw error;
    }
  }

  static async createLoanDecision(loanId: number, decisionDate: Date, decisionStatus: string, reason: NullableString, approvedBy: number): Promise<any> {
    try {
      const loanDecision = await sqlQuest.one(LoanDecisionQueries.createLoanDecision, [loanId, decisionDate, decisionStatus, reason, approvedBy]);
      return loanDecision;
    } catch (error) {
      _logger.error(
        '[LoanDecisionRepository]::Something went wrong when creating loan decision',
        error,
      );
      throw error;
    }
  }

  static async updateLoanDecision(id: number, decisionDate: Date | null, decisionStatus: string | null, reason: string | null, approvedBy: number | null): Promise<any> {
    try {
      const loanDecision = await sqlQuest.one(LoanDecisionQueries.updateLoanDecision, [decisionDate, decisionStatus, reason, approvedBy, id]);
      return loanDecision;
    } catch (error) {
      _logger.error(
        '[LoanDecisionRepository]::Something went wrong when updating loan decision',
        error,
      );
      throw error;
    }
  }

  static async deleteLoanDecision(id: number): Promise<any | null> {
    try {
      const loanDecision = await sqlQuest.oneOrNone(LoanDecisionQueries.deleteLoanDecision, [id]);
      return loanDecision;
    } catch (error) {
      _logger.error(
        '[LoanDecisionRepository]::Something went wrong when deleting loan decision',
        error,
      );
      throw error;
    }
  }
}
