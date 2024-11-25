import express from 'express';
import { UserController } from './user.controller';
import { ValidationMiddleware } from '../../shared/validators/middleware';
import { fetchUserByIdSchema, fetchUserByEmailSchema, createUserSchema, updateUserSchema, deleteUserSchema, loginValidator, sendPhoneNumberOtpValidator, verifyPhoneNumberOtpValidator, } from './validation';
import { tryCatch } from '../../shared/helpers/try.catch.helper';
import {getUserverifyToken } from "./middleware/verifytoken";

const router = express.Router();

const { validateRequest } = ValidationMiddleware;


router.get(
  '/all',
  tryCatch(UserController.fetchAllUsers),
);

router.post(
  '/login',
  validateRequest(loginValidator),
  tryCatch(UserController.login),
);

router.post(
  '/send/phone-number-otp',
  validateRequest(sendPhoneNumberOtpValidator),
  tryCatch(UserController.sendPhoneNumberOtp),
);
router.post(
  '/send/verify-otp',
  getUserverifyToken,
  validateRequest(verifyPhoneNumberOtpValidator),
  tryCatch(UserController.verifyPhoneNumberOtp),
);

router.post(
  '/users',
  validateRequest(createUserSchema),
  tryCatch(UserController.createUser),
);

router.get(
  '/email/:email',
  validateRequest(fetchUserByEmailSchema),
  tryCatch(UserController.fetchUserByEmail),
);

router.get(
  '/:id',
  validateRequest(fetchUserByIdSchema),
  tryCatch(UserController.fetchUser),
);

router.put(
  '/:id',
  validateRequest(updateUserSchema),
  tryCatch(UserController.updateUser),
);

router.delete(
  '/:id',
  validateRequest(deleteUserSchema),
  tryCatch(UserController.deleteUser),
);

export const userRouter = router;
