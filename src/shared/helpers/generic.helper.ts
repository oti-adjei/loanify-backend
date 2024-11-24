import crypto from 'crypto';
import { sqlQuest } from '../../config/database';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Logger from '../../config/logger';
import Env from '../utils/env';
import { userQueries } from '../../modules/consumer/queries/index';
import { UserTokenType } from './sanitize.input';
import { UserRepository } from '../../modules/consumer/repository';
import { ApiError } from '../utils/api.error';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
//import Env from '../utils/env';

const _logger = new Logger('GenericHelper');

interface PaginationProps {
  page: number;
  limit: number;
  getCount: string;
  getResources: string;
  params: string[];
  countParams: string[];
}
export class GenericHelper {
  static generateId(): string {
    return crypto.randomUUID().replace(/-/g, '');
  }

  static fetchResourceByPage({
    page,
    limit,
    getCount,
    getResources,
    params = [],
    countParams = [],
  }: PaginationProps) {
    const offSet = (+page - 1) * +limit;
    const fetchCount = sqlQuest.oneOrNone(getCount, [...countParams]);
    const fetchCountResource = sqlQuest.any(getResources, [
      offSet,
      +limit,
      ...params,
    ]);
    return Promise.all([fetchCount, fetchCountResource]);
  }

  static generateOTP(length: number): string {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }

  static calcPages(total: number, limit: number) {
    const displayPage = Math.floor(total / limit);
    return total % limit ? displayPage + 1 : displayPage;
  }

  static verifyUserToken = async (token: string) => {
    const userInfo = jwt.verify(token, Env.get('SECRET')) as UserTokenType;
    _logger.log(
      ` Finished verifying jwt with data - ${JSON.stringify(userInfo)}`,
    );
    return await sqlQuest.oneOrNone(userQueries.fetchUser, [userInfo.id]);
  };

  static compareHash = async (text: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(text, hash);
  };

  static GenerateSalt = async () => {
    return await bcrypt.genSalt(Env.get('LOANIFY_SALT_ROUNDS'));
  };

  static GeneratePasswordHash = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
  };

  static generateRandomNumber = (length: number): number => {
    if (length <= 0) {
      throw new Error('Length must be greater than 0');
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  static hashOtp = (otp: number, secret: string, expTime: string): string => {
    return jwt.sign({ otp }, secret, {
      expiresIn: expTime,
    });
  };
  static verifyOtp = async (
    enteredOtp: number,
    secret: string,
    userId?: number,
    userType?: string,
  ): Promise<any> => {
    try {
      // Get the row from the otp table using the userId
      const otpcheck = await UserRepository.fetchOtp(userId,userType);
      console.log('====== Fetched User id=====', otpcheck);

      console.log("entered OTP", enteredOtp);

      console.log(secret);

      const decodedToken = (await jwt.verify(otpcheck, secret)) as {
        otp: number;
        iat: number;
        exp: number;
      };

      if (!decodedToken || !decodedToken.otp || !decodedToken.exp) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid decoded token');
      }

      _logger.log(
        `[GenericHelper]::Decoded token - ${JSON.stringify(decodedToken)}`,
      );
      console.log('===========DECODED TOKEN := ', decodedToken);
      _logger.log(
        `[GenericHelper]::DECODED TOKEN OTP IS - ${JSON.stringify(decodedToken.otp)}`,
      );
      console.log('========== . DECODED TOKEN OTP IS := ', decodedToken.otp);

      // Check if the OTP matches
      if (enteredOtp !== decodedToken.otp) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid OTP');
      }

      return true;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token has expired');
      } else if (err.name === 'JsonWebTokenError') {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token signature');
      } else if (err.name === 'NotBeforeError') {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token not active yet');
      } else if (err instanceof ApiError) {
        throw err; // Re-throw known ApiErrors
      } else {
        _logger.error(
          '[GenericHelper]::Something went wrong when verifying otp',
          err,
        );
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error');
      }
    }
  };

  static readonly monthsDiff = (date1: string, date2: string) => {
    const start = new Date(date1);
    const end = new Date(date2);

    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();

    const totalMonths = yearsDiff * 12 + monthsDiff;

    return totalMonths;
  };

  static sendSMS = async (mobileNumber:string, otp: number) => {
    const endPoint = process.env.MNOTIFY_ENDPOINT || 'https://api.mnotify.com/api/sms/quick';
    const apiKey = process.env.MNOTIFY_API_KEY || 'HcZJ34fUseR9RkiOLLsWGR3WD';
    const data = {
      recipient: [mobileNumber],
      sender: 'Envoyer GH',
      message: 'Welcome to Envoyer Ghana. Please enjoy the experience. Your OTP is ' + otp,
    };
    const url = `${endPoint}?key=${apiKey}`;
    
    console.log("========url", url);
  
    try {
      const response = await axios.post(url, data);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
        console.log('Data:', error.response.data);
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Response not acceptable');
      } else if (error.request) {
        console.log('Request:', error.request);
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Request made but no response was received');
      } else {
        console.log('Error Message:', error.message);
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Bad request');
      }
      console.log('Config:', error.config);
    }
  };
}


// export function OtpTypeMiddleware(req:Request, res:Response, next:NextFunction) {
//   const { type } = req.body;
//   if (type === 'user') {
//     (req as any).controller = UserController.sendPhoneNumberOtp;
// } else if (type === 'rider') {
//     (req as any).controller = RiderController.sendPhoneNumberOtp;
// } else {
//     return res.status(400).json({ message: 'Invalid type provided' });
// }
//   next();
// }