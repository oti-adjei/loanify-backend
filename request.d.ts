import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
        controller?: typeof UserController.sendPhoneNumberOtp | typeof RiderController.sendPhoneNumberOtp;
    }
}