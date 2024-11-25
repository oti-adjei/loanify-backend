import z from 'zod';

export const fetchLoanByIdSchema = z.object({
  id: z.coerce.number(),
});

export const fetchLoansByUserIdSchema = z.object({
  userId: z.coerce.number(),
});

export const fetchLoanStatusSchema = z.object({
  loanId: z.coerce.number(),
})

export const createLoanSchema = z.object({
  userId: z.number(),
  loanAmount: z.number(),
  loanTerm: z.number(),
  interestRate: z.number(),
  purpose: z.string(),
  applicationDate: z.coerce.string().date(),
  status: z.enum(['pending', 'approved', 'rejected']),
});

export const updateLoanSchema = z.object({
  id: z.number(),
  loanAmount: z.number(),
  loanTerm: z.number(),
  interestRate: z.number(),
  purpose: z.string(),
  applicationDate: z.coerce.string().date(),
  status: z.enum(['pending', 'approved', 'rejected']),
});

export const deleteLoanSchema = z.object({
  id: z.number(),
});

export type FetchLoanByIdSchema = z.infer<typeof fetchLoanByIdSchema>;
export type FetchLoansByUserIdSchema = z.infer<typeof fetchLoansByUserIdSchema>;
export type FetchLoanStatusSchema = z.infer<typeof fetchLoanStatusSchema>;
export type CreateLoanSchema = z.infer<typeof createLoanSchema>;
export type UpdateLoanSchema = z.infer<typeof updateLoanSchema>;
export type DeleteLoanSchema = z.infer<typeof deleteLoanSchema>;