import { ApiError } from '../../../shared/utils/api.error';
import Logger from '../../../config/logger';
import { UserRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';
import {
  sanitizeInput,
  NullableString,

} from '../../../shared/helpers/sanitize.input';
import {
  ConsumerUserType,
  CreateUserSchema,
  LoginValidator,
  SendPhoneNumberOtpValidator,
  VerifyPhoneNumberOtpValidator,
} from '../validation/index';
import { GenericHelper } from '../../../shared/helpers/generic.helper';
import Env from '../../../shared/utils/env';
import * as jwt from 'jsonwebtoken';
// import logger from '../../../../config/logger';

const _logger = new Logger('UserService');
export class UserService {
  static fetchUser = async (id: number) => {
    try {
      const user = await UserRepository.fetchUser(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error(
        '[UserService]::Something went wrong when fetching user',
        error,
      );
      throw error;
    }
  };

  static fetchUserByEmail = async (email: string) => {
    try {
      const user = await UserRepository.fetchUserByEmail(email);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error(
        '[UserService]::Something went wrong when fetching user by email',
        error,
      );
      throw error;
    }
  };

  static fetchAllUsers = async () => {
    try {
      const user = await UserRepository.fetchAllUsers();
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error(
        '[UserService]::Something went wrong when fetching user by email',
        error,
      );
      throw error;
    }
  };

  static createPersonalUser = async (
    request: CreateUserSchema,
  ): Promise<any> => {
    try {
      const {
        first_name,
        surname,
        email,
        ghana_ecowas_number,
        mobile_number,
        whatsapp_number,
        city,
        password,
        type
      } = request;

      const salt = await GenericHelper.GenerateSalt();

      const HashedPassword = await GenericHelper.GeneratePasswordHash(
        password,
        salt,
      );

      request.password = HashedPassword;

      const verifyUser = await UserRepository.checkIfUserExists(email);

      if (verifyUser) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          'User with email already exists',
        );
      }

      const user = await UserRepository.createPersonalUser(
        first_name,
        surname,
        email,
        ghana_ecowas_number,
        mobile_number,
        whatsapp_number,
        city,
        request.password,
        type as ConsumerUserType,
      );
      if (!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot create user');
      }
    } catch (error) {
      _logger.error(
        '[UserService]::Something went wrong when creating user',
        error,
      );
      throw error;
    }
  };

  static updateUser = async (
    id: number,
    name: NullableString,
    email: NullableString,
    password: NullableString,
  ) => {
    // Convert undefined values to null
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    try {
      const user = await UserRepository.updateUser(
        id,
        sanitizedName,
        sanitizedEmail,
        sanitizedPassword,
      );
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error(
        '[UserService]::Something went wrong when updating user',
        error,
      );
      throw error;
    }
  };

  static deleteUser = async (id: number) => {
    try {
      const user = await UserRepository.deleteUser(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return user;
    } catch (error) {
      _logger.error(
        '[UserService]::Something went wrong when deleting user',
        error,
      );
      throw error;
    }
  };

  static login = async (request: LoginValidator): Promise<any> => {
    try {
      const { email, password } = request;

      const user = await UserRepository.fetchUserByEmail(email);

      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const isPasswordValid = await GenericHelper.compareHash(
        password,
        user.password as string,
      );
      if (!isPasswordValid) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid password');
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        Env.get('ENVOYER_SECRET') as string,
        { expiresIn: '1d', algorithm: 'HS256' },
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userDetails } = user;
      return { ...userDetails, token };
    } catch (err) {
      _logger.error('[UserService]::Something went wrong when logging in');
      throw err;
    }
  };

  static sendPhoneNumberOtp = async (
    request: SendPhoneNumberOtpValidator,
  ): Promise<any> => {
    try {
      const { mobile_number,type } = request;

      const user = await UserRepository.getUserByPhoneNumber(mobile_number);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const otp = GenericHelper.generateRandomNumber(6);

      const hashedOtp = GenericHelper.hashOtp(
        otp,
        Env.get('ENVOYER_SECRET'),
        '5m',
      );
      console.log("========hashed otp no nie",hashedOtp);
      await UserRepository.upadteOtp(user.user_id, hashedOtp,type);

      await GenericHelper.sendSMS(mobile_number, otp);
      return { otp, id: user.user_id };
    } catch (error) {
      _logger.error(
        '[UserService]::Something went wrong when sending phone number otp',
      );
      throw error;
    }
  };

  static verifyPhoneNumberOtp = async (
    request: VerifyPhoneNumberOtpValidator,
    userId?: number,
  ): Promise<any> => {

    try {
      const { otp,type } = request;
      console.log(otp);

      const verifiedStatus = await UserRepository.checkIfVerified(userId)

      if(verifiedStatus.is_verified === true){
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User already verified');
      }

      console.log("======== verified status",verifiedStatus);

      // const isOtpValid =  await GenericHelper.verifyOtp(
     await GenericHelper.verifyOtp(
        otp,
        Env.get('ENVOYER_SECRET'),
        userId,
        type
      );
      
      const isVerified = UserRepository.setIsVerified(userId)

      if(!isVerified){
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Couldnt set is verified');
      }
      return "User Veified successfully";
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying phone number otp',
      );
      throw err;
    }
  };
}
