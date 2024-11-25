import z from 'zod';



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
  });

export const sendPhoneNumberOtpValidator = z.object({
  mobile_number: z.string(),
  });

export const fetchAllUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  ghana_ecowas_number: z.string(),
  mobile_number: z.string(),
  email: z.string(),
  });

export const createUserSchema = z.object({
  first_name: z.string().min(3).max(50),
  last_name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()-_=+{};:'"\\|,.<>?/]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    ),
  ghana_ecowas_number: z.string().min(12).max(15),
  phone_number: z.string().min(10).max(20),
  home_address: z.string(),
  date_of_birth: z.coerce.string().date(),
  occupation: z.string(),
  income: z.number().optional(),
  expenses: z.number().optional(),
  });

export const updateUserSchema = z.object({
  id: z.coerce.number(),
  first_name: z.string().min(3).max(50).optional(),
  last_name: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()-_=+{};:'"\\|,.<>?/]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    ).optional(),
  ghana_ecowas_number: z.string().min(20).max(20).optional(),
  phone_number: z.string().min(10).max(20).optional(),
  home_address: z.string().optional(),
  date_of_birth: z.string().datetime().optional(),
  occupation: z.string().optional(),
  income: z.number().optional(),
  expenses: z.number().optional(),
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