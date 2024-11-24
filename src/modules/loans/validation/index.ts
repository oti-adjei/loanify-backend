import z from 'zod';

export const fetchLoanByIdSchema = z.object({
  id: z.number(),
});

export const fetchLoansByUserIdSchema = z.object({
  userId: z.number(),
});

export const createLoanSchema = z.object({
  userId: z.number(),
  loanAmount: z.number(),
  loanTerm: z.number(),
  interestRate: z.number(),
  purpose: z.string(),
  applicationDate: z.date(),
  status: z.enum(['pending', 'approved', 'rejected']),
});

export const updateLoanSchema = z.object({
  id: z.number(),
  loanAmount: z.number(),
  loanTerm: z.number(),
  interestRate: z.number(),
  purpose: z.string(),
  applicationDate: z.coerce.date(),
  status: z.enum(['pending', 'approved', 'rejected']),
});

export const deleteLoanSchema = z.object({
  id: z.number(),
});

export type FetchLoanByIdSchema = z.infer<typeof fetchLoanByIdSchema>;
export type FetchLoansByUserIdSchema = z.infer<typeof fetchLoansByUserIdSchema>;
export type CreateLoanSchema = z.infer<typeof createLoanSchema>;
export type UpdateLoanSchema = z.infer<typeof updateLoanSchema>;
export type DeleteLoanSchema = z.infer<typeof deleteLoanSchema>;