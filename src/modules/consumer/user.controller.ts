import { ResponseHandler } from '../../shared/helpers/response.handler';
import { Request, Response } from 'express';
import Logger from '../../config/logger';
import { UserService } from './service';
import { StatusCodes } from 'http-status-codes';
import { FetchUserByIdSchema, FetchUserByEmailSchema, CreateUserSchema, UpdateUserSchema, DeleteUserSchema, SendPhoneNumberOtpValidator, VerifyPhoneNumberOtpValidator } from './validation';
// import { RiderService } from '../courier/service';

const _logger = new Logger('UserController');

export class UserController {
  static fetchUser = async (req: any, res: any) => {
    try {
      const { id } = req.params as FetchUserByIdSchema;

      const user = await UserService.fetchUser(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User fetched successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong when fetching user',
        error,
      );
      throw error;
    }
  };

  static fetchUserByEmail = async (req: any, res: any) => {
    try {
      const { email } = req.params as FetchUserByEmailSchema;

      const user = await UserService.fetchUserByEmail(email);
      
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User fetched successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong when fetching user by email',
        error,
      );
      throw error;
    }
  };
  static fetchAllUsers = async (req: any, res: any) => {
    try {
      const user = await UserService.fetchAllUsers()
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User fetched successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong when fetching user by email',
        error,
      );
      throw error;
    }
  };

  static createUser = async (req: any, res: any) => {
    try {
      const payload = req.body as CreateUserSchema;

      const user = await UserService.createPersonalUser(payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User created successfully',
        code: StatusCodes.CREATED,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong when creating user',
        error,
      );
      throw error;
    }
  };

  static updateUser = async (req: any, res: any) => {
    try {
      const { id } = req.params as UpdateUserSchema;
      const payload = req.body as Partial<UpdateUserSchema>;

      const user = await UserService.updateUser(id, payload);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User updated successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong when updating user',
        error,
      );
      throw error;
    }
  };

  static deleteUser = async (req: any, res: any) => {
    try {
      const { id } = req.params as DeleteUserSchema;

      const user = await UserService.deleteUser(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User deleted successfully',
        code: StatusCodes.NO_CONTENT,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong when deleting user',
        error,
      );
      throw error;
    }
  };

  static login = async (req: any, res: any) => {
    try {
      _logger.log('[UserController]::Logging in user');
      const payload = req.body;

      const user = await UserService.login(payload) ;

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User logged in successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (error) {
      _logger.error(
        '[UserController]::Something went wrong while logging in',
        error,
      );
      throw error;
    }
  };

  static sendPhoneNumberOtp = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Sending phone number otp');
      const payload = req.body as SendPhoneNumberOtpValidator;
      let otp;
     
      otp = await UserService.sendPhoneNumberOtp(payload);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Phone number otp sent successfully',
        code: StatusCodes.OK,
        data: otp,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when sending phone number otp',
        err,
      );
      throw err;
    }8
  };

  static verifyPhoneNumberOtp = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Verifying phone number otp');
      const payload = req.body as VerifyPhoneNumberOtpValidator;
      const userId = (req as any).userId;


      let user
     
      user = await UserService.verifyPhoneNumberOtp(payload,userId);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Phone number verified successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when verifying phone number otp',
        err,
      );
      throw err;
    }
  };
}


