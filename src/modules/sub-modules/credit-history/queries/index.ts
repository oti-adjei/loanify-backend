const fetchCreditHistory = `
SELECT * FROM credit_history WHERE id = $1
`;

const fetchCreditHistoriesByUserId = `
SELECT * FROM credit_history WHERE user_id = $1
`;

const createCreditHistory = `
INSERT INTO credit_history (user_id, creditor_name, account_number, credit_limit, outstanding_balance, payment_history)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *
`;

const updateCreditHistory = `
UPDATE credit_history
SET creditor_name = $1, account_number = $2, credit_limit = $3, outstanding_balance = $4, payment_history = $5
WHERE id = $6
RETURNING *
`;

const deleteCreditHistory = `
DELETE FROM credit_history WHERE id = $1
RETURNING *
`;

export const CreditHistoryQueries = {
  fetchCreditHistory,
  fetchCreditHistoriesByUserId,

  createCreditHistory,
  updateCreditHistory,
  deleteCreditHistory,
};