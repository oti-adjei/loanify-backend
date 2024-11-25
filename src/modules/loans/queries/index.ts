const fetchLoan = `
SELECT * FROM loans WHERE loan_id = $1
`;

const fetchLoansByUserId = `
SELECT * FROM loans WHERE user_id = $1
`;

const fetchAllLoans = `
SELECT * FROM loans
`;

const fetchLoanStatus = `
SELECT status FROM loans WHERE loan_id = $1
`;

const createLoan = `
INSERT INTO loans (user_id, loan_amount, loan_term, interest_rate, purpose, application_date, status)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *
`;

const updateLoan = `
UPDATE loans
SET loan_amount = $1, loan_term = $2, interest_rate = $3, purpose = $4, application_date = $5, status = $6
WHERE id = $7
RETURNING *
`;

const deleteLoan = `
DELETE FROM loans WHERE id = $1
RETURNING *
`;

export const LoanQueries = {
  fetchLoan,
  fetchLoansByUserId,
  fetchAllLoans,
  fetchLoanStatus,
  createLoan,
  updateLoan,
  deleteLoan,
};