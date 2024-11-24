import z from 'zod';

export const fetchCreditHistoryByIdSchema = z.object({
  id: z.number(),
});

export const fetchCreditHistoryByUserIdSchema = z.object({
  userId: z.number(),
});

export const createCreditHistorySchema = z.object({
  userId: z.number(),
  creditorName: z.string(),
  accountNumber: z.string(),
  creditLimit: z.number(),
  outstandingBalance: z.number(),
  paymentHistory: z.string(),
});

export const updateCreditHistorySchema = z.object({
  id: z.number(),
  creditorName: z.string(),
  accountNumber: z.string(),
  creditLimit: z.number(),
  outstandingBalance: z.number(),
  paymentHistory: z.string(),
});

export const deleteCreditHistorySchema = z.object({
  id: z.number(),
});

export type FetchCreditHistoryByIdSchema = z.infer<typeof fetchCreditHistoryByIdSchema>;
export type FetchCreditHistoryByUserIdSchema = z.infer<typeof fetchCreditHistoryByUserIdSchema>;
export type CreateCreditHistorySchema = z.infer<typeof createCreditHistorySchema>;
export type UpdateCreditHistorySchema = z.infer<typeof updateCreditHistorySchema>;
export type DeleteCreditHistorySchema = z.infer<typeof deleteCreditHistorySchema>;