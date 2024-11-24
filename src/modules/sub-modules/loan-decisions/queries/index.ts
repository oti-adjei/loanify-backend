const fetchLoanDecision = `
SELECT * FROM loan_decisions WHERE id = $1
`;

const fetchLoanDecisionsByLoanId = `
SELECT * FROM loan_decisions WHERE loan_id = $1
`;

const createLoanDecision = `
INSERT INTO loan_decisions (loan_id, decision_date, decision_status, reason, approved_by)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
`;

const updateLoanDecision = `
UPDATE loan_decisions
SET decision_date = $1, decision_status = $2, reason = $3, approved_by = $4
WHERE id = $5
RETURNING *
`;

const deleteLoanDecision = `
DELETE FROM loan_decisions WHERE id = $1
RETURNING *
`;

export const LoanDecisionQueries = {
  fetchLoanDecision,
  fetchLoanDecisionsByLoanId,

  createLoanDecision,
  updateLoanDecision,
  deleteLoanDecision,
};