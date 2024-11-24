import z from 'zod';

export const fetchLoanDecisionByIdSchema = z.object({
  id: z.number(),
});

export const fetchLoanDecisionsByLoanIdSchema = z.object({
  loanId: z.number(),
});

export const createLoanDecisionSchema = z.object({
  loanId: z.number(),
  decisionDate: z.date(),
  decisionStatus: z.enum(['approved', 'rejected', 'pending']),
  reason: z.string().optional(),
  approvedBy: z.number(), // Assuming approvedBy is a user ID
});

export const updateLoanDecisionSchema = z.object({
  id: z.number(),
  decisionDate: z.date(),
  decisionStatus: z.enum(['approved', 'rejected', 'pending']),
  reason: z.string(),
  approvedBy: z.number(),
});

export const deleteLoanDecisionSchema = z.object({
  id: z.number(),
});

export type FetchLoanDecisionByIdSchema = z.infer<typeof fetchLoanDecisionByIdSchema>;
export type FetchLoanDecisionsByLoanIdSchema = z.infer<typeof fetchLoanDecisionsByLoanIdSchema>;
export type CreateLoanDecisionSchema = z.infer<typeof createLoanDecisionSchema>;
export type UpdateLoanDecisionSchema = z.infer<typeof updateLoanDecisionSchema>;
export type DeleteLoanDecisionSchema = z.infer<typeof deleteLoanDecisionSchema>;