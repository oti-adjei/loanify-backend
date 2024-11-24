import z from 'zod';


export enum ConsumerUserType {
  Business = 'business',
  Personal = 'personal',
  FreightForwarders = 'freight_forwarders',
  ClearingAgent = 'clearing_agent',
}

export enum SendUserType {
  Business = 'business',
  Personal = 'personal',
  FreightForwarders = 'freight_forwarders',
  ClearingAgent = 'clearing_agent',
  Rider = 'rider',
  Driver = 'driver',
}

export const fetchUserByIdSchema = z.object({
  id: z.coerce.number(),
});

export const fetchUserByEmailSchema = z.object({
  email: z.string().email(),
});

export const loginValidator = z.object({
  email: z.string().email('This field must be a valid email address.'),
  password: z.string()
});


export const verifyPhoneNumberOtpValidator = z.object({
  otp: z.number(),
  type: z.nativeEnum(SendUserType),
});

export const sendPhoneNumberOtpValidator = z.object({
  mobile_number: z.string(),
  type: z.nativeEnum(SendUserType),
});

export const fetchAllUserSchema = z.object({
  first_name: z.string(),
  surname : z.string(),
  ghana_ecowas_number: z.string(),
  mobile_number: z.string(),
  whatsapp_number: z.string(),
  city: z.string(),
  email: z.string(),
  type: z.nativeEnum(ConsumerUserType),
  });

export const createUserSchema = z.object({
  first_name: z.string().min(3).max(255),
  surname : z.string().min(3).max(255),
  ghana_ecowas_number: z.string(),
  mobile_number: z.string(),
  whatsapp_number: z.string(),
  city: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()-_=+{};:'"\\|,.<>?/]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    ),
    type: z.nativeEnum(ConsumerUserType),
  });

export const updateUserSchema = z.object({
  id: z.coerce.number(),
  name: z.string().nullish(),
  email: z.string().email().nullish(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()-_=+{};:'"\\|,.<>?/]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    ).nullish(),
});

export const deleteUserSchema = z.object({
  id: z.coerce.number(),
});

export type FetchUserByIdSchema = z.infer<typeof fetchUserByIdSchema>;
export type FetchUserByEmailSchema = z.infer<typeof fetchUserByEmailSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
export type LoginValidator = z.infer<typeof loginValidator>;
export type SendPhoneNumberOtpValidator = z.infer<typeof sendPhoneNumberOtpValidator>;
export type VerifyPhoneNumberOtpValidator = z.infer<typeof verifyPhoneNumberOtpValidator>;

