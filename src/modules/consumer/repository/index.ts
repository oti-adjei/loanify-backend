import { UserAccount, UserAccountEmail, } from '../../../shared/helpers/sanitize.input';
import { sqlQuest } from '../../../config/database';
import Logger from '../../../config/logger';
import { userQueries } from '../queries';
import { UpdateUserSchema } from '../validation';

const _logger = new Logger('UserRepository');


export class UserRepository {
  static createPersonalUser = async (first_name: string,
   last_name: string,
    email: string,
    password: string,
    ghana_ecowas_number: string,
    phone_number: string,
    home_address: string,
    date_of_birth: string,
    occupation: string,
    income: number,
    expenses: number
    ) => {
    try {
      const  user = await sqlQuest.one(userQueries.createPersonalUser, [first_name, last_name, email, password, ghana_ecowas_number, phone_number, home_address, date_of_birth, occupation, income, expenses,]);
     
      return { user };
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

  static updateUser = async (
    id: number,
    sanitizedPayload: Partial<UpdateUserSchema> // This will contain only the fields to update
  ) => {
    try {
      // Extract the keys from the sanitized payload
      const {
        first_name,
        last_name,
        email,
        password,
        ghana_ecowas_number,
        phone_number,
        home_address,
        date_of_birth,
        occupation,
        income,
        expenses,
      } = sanitizedPayload;
     
      const user = await sqlQuest.one(userQueries.updateUser, [
        first_name,
        last_name,
        email,
        password,
        ghana_ecowas_number,
        phone_number,
        home_address,
        date_of_birth,   
        occupation,
        income,
        expenses,
        id
        ]);
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
  static upadteOtp = async (userId: string, otp: string): Promise<void> => {
    try {
      await sqlQuest.none(userQueries.updateOtp, [otp, userId]);
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
