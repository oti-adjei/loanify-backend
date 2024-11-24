import z from 'zod';

export const fetchCollateralByIdSchema = z.object({
  id: z.number(),
});

export const fetchCollateralsByLoanIdSchema = z.object({
  loanId: z.number(),
});

export const createCollateralSchema = z.object({
  loanId: z.number(),
  collateralType: z.string(),
  estimatedValue: z.number(),
});

export const updateCollateralSchema = z.object({
  id: z.number(),
  loanId: z.number(),
  collateralType: z.string(),
  estimatedValue: z.number(),
});

export const deleteCollateralSchema = z.object({
  id: z.number(),
});

export type FetchCollateralByIdSchema = z.infer<typeof fetchCollateralByIdSchema>;
export type FetchCollateralsByLoanIdSchema = z.infer<typeof fetchCollateralsByLoanIdSchema>;
export type CreateCollateralSchema = z.infer<typeof createCollateralSchema>;
export type UpdateCollateralSchema = z.infer<typeof updateCollateralSchema>;
export type DeleteCollateralSchema = z.infer<typeof deleteCollateralSchema>;
