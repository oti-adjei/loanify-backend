import { UserAccount, UserAccountEmail, } from '../../../shared/helpers/sanitize.input';
import { sqlQuest } from '../../../config/database';
import Logger from '../../../config/logger';
import { userQueries } from '../queries';
import { ConsumerUserType } from '../validation';

const _logger = new Logger('UserRepository');


export class UserRepository {
  static createPersonalUser = async (first_name: string,
    surname: string,
    email: string,
    ghana_ecowas_number: string,
    mobile_number: string,
    whatsapp_number: string,
    city: string,
    password: string,
    type: ConsumerUserType ) => {
    try {
      const  user = await sqlQuest.one(userQueries.createPersonalUser, [first_name, surname , email, ghana_ecowas_number, mobile_number, whatsapp_number, city , password,type]);
      const storeuser = await sqlQuest.one(userQueries.storeOtp, [user.id,type ]);

      return { user , storeuser };
    } catch (error) {
      _logger.error(
        '[UserRepository]::Something went wrong when creating user',
        error,
      );
      throw error;
    }
  };
  static fetchUser = async (id: number) => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.fetchUser, [id]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Something went wrong when fetching user',
        error,
      );
      throw error;
    }
  };

  static fetchAllUsers = async () => {
    try {
      const user = await sqlQuest.manyOrNone(userQueries.fetchAllUsers,);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Something went wrong when fetching user',
        error,
      );
      throw error;
    }
  };

  static fetchUserByEmail = async (email: string) => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.fetchUserByEmail, [email]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Something went wrong when fetching user by email',
        error,
      );
      throw error;
    }
  };

  static updateUser = async (id: number, name: string | null, email: string | null, password: string | null) => {
    try {
      const user = await sqlQuest.one(userQueries.updateUser, [name, email, password, id]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Something went wrong when updating user',
        error,
      );
      throw error;
    }
  };

  static deleteUser = async (id: number) => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.deleteUser, [id]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Something went wrong when deleting user',
        error,
      );
      throw error;
    }
  };

  static getUserByPhoneNumber = async (
    phoneNumber: string,
  ): Promise<UserAccount> => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.getUserByPhoneNumber, [
        phoneNumber,
      ]);
      return user;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when getting user by phone number',
        err,
      );
      throw err;
    }
  };

  static checkIfUserExists = async (
    email: string,
  ): Promise<UserAccountEmail> => {
    try {
      const userExists = await sqlQuest.oneOrNone(
        userQueries.checkIfUserExists,
        [email],
      );
      return userExists;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when checking if user exists',
        err,
      );
      throw err;
    }
  };
  static fetchOtp = async (id: number| undefined, type: string | undefined) => {
    try {
      console.log( "From user repository fetching otp id",id)
      const user = await sqlQuest.oneOrNone(userQueries.fetchOtp, [id,type]);

      console.log( "From user repository fetching otp user ========= ",user)
      return user.otp;
      
    } catch (error) {
      _logger.error(
        '[UserRepository]::Something went wrong when fetching user',
        error,
      );
      throw error;
    }
  };
  static checkIfVerified = async (userId: number| undefined) => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.checkVerified, [userId]);
      console.log( "From user repository user ========= ",user);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Something went wrong when cheking verification status',
        error,
      );
      throw error;
    }
  };
  static setIsVerified = async (userId: number | undefined) => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.updateVerifiedfield, [userId]);
      return user;
    } catch (error) {
      _logger.error(
        '[UserRepository]::Something went wrong when setting verification field',
        error,
      );
      throw error;
    }
  };

  static storeOtp = async (userId: string, otp: string): Promise<void> => {
    try {
      await sqlQuest.none(userQueries.storeOtp, [userId, otp]);
      return;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when storing otp',
        err,
      );
      throw err;
    }
  };
  static upadteOtp = async (userId: string, otp: string,type:string): Promise<void> => {
    try {
      await sqlQuest.none(userQueries.updateOtp, [otp, userId, type]);
      return;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when updating otp',
        err,
      );
      throw err;
    }
  };

}
