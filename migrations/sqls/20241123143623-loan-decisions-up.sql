/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS loan_decisions (
    decision_id SERIAL PRIMARY KEY,
    loan_id INTEGER REFERENCES loans(loan_id),
    decision_date DATE,
    decision_status VARCHAR(20),
    reason TEXT,
    approved_by INTEGER REFERENCES users(user_id)
);