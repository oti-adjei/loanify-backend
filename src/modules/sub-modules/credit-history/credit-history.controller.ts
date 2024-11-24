import { ResponseHandler } from '../../../shared/helpers/response.handler';
import Logger from '../../../config/logger';
import { CreditHistoryService } from './service';
import { StatusCodes } from 'http-status-codes';
import { FetchCreditHistoryByIdSchema, CreateCreditHistorySchema, UpdateCreditHistorySchema, DeleteCreditHistorySchema, FetchCreditHistoryByUserIdSchema } from './validation';

const _logger = new Logger('CreditHistoryController');

export class CreditHistoryController {
  static fetchCreditHistory = async (req: any, res: any) => {
    try {
      const { id } = req.params as FetchCreditHistoryByIdSchema;

      const creditHistory = await CreditHistoryService.fetchCreditHistory(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Credit history fetched successfully',
        code: StatusCodes.OK,
        data: creditHistory,
      });
    } catch (error) {
      _logger.error(
        '[CreditHistoryController]::Something went wrong when fetching credit history',
        error,
      );
      throw error;
    }
  };

  static fetchCreditHistoriesByUserId = async (req: any, res: any) => {
    try {
      const { userId } = req.params as FetchCreditHistoryByUserIdSchema;

      const creditHistories = await CreditHistoryService.fetchCreditHistoriesByUserId(userId);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Credit histories fetched successfully',
        code: StatusCodes.OK,
        data: creditHistories,
      });
    } catch (error) {
      _logger.error(
        '[CreditHistoryController]::Something went wrong when fetching credit histories by user ID',
        error,
      );
      throw error;
    }
  };

  static createCreditHistory = async (req: any, res: any) => {
    try {
      const { userId, creditorName, accountNumber, creditLimit, outstandingBalance, paymentHistory } = req.body as CreateCreditHistorySchema;

      const creditHistory = await CreditHistoryService.createCreditHistory(userId, creditorName, accountNumber, creditLimit, outstandingBalance, paymentHistory);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Credit history created successfully',
        code: StatusCodes.CREATED,
        data: creditHistory,
      });
    } catch (error) {
      _logger.error(
        '[CreditHistoryController]::Something went wrong when creating credit history',
        error,
      );
      throw error;
    }
  };

  static updateCreditHistory = async (req: any, res: any) => {
    try {
      const { id } = req.params as UpdateCreditHistorySchema;
      const { creditorName, accountNumber, creditLimit, outstandingBalance, paymentHistory } = req.body as UpdateCreditHistorySchema;

      const creditHistory = await CreditHistoryService.updateCreditHistory(id, creditorName, accountNumber, creditLimit, outstandingBalance, paymentHistory);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Credit history updated successfully',
        code: StatusCodes.OK,
        data: creditHistory,
      });
    } catch (error) {
      _logger.error(
        '[CreditHistoryController]::Something went wrong when updating credit history',
        error,
      );
      throw error;
    }
  };

  static deleteCreditHistory = async (req: any, res: any) => {
    try {
      const { id } = req.params as DeleteCreditHistorySchema;

      const creditHistory = await CreditHistoryService.deleteCreditHistory(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Credit history deleted successfully',
        code: StatusCodes.OK,
        data: creditHistory,
      });
    } catch (error) {
      _logger.error(
        '[CreditHistoryController]::Something went wrong when deleting credit history',
        error,
      );
      throw error;
    }
  };
}
