const fetchCollateral = `
SELECT * FROM collateral WHERE id = $1
`;

const fetchCollateralsByLoanId = `
SELECT * FROM collateral WHERE loan_id = $1
`;

const createCollateral = `
INSERT INTO collateral (loan_id, collateral_type, estimated_value)
VALUES ($1, $2, $3)
RETURNING *
`;

const updateCollateral = `
UPDATE collateral
SET collateral_type = $1, estimated_value = $2
WHERE id = $3
RETURNING *
`;

const deleteCollateral = `
DELETE FROM collateral WHERE id = $1
RETURNING *
`;

export const CollateralQueries = {
  fetchCollateral,
  fetchCollateralsByLoanId,

  createCollateral,
  updateCollateral,
  deleteCollateral,
};