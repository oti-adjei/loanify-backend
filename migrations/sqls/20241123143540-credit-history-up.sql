/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS credit_history (
    credit_history_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    creditor_name VARCHAR(100),
    account_number VARCHAR(50),
    credit_limit DECIMAL(10,2),
    outstanding_balance DECIMAL(10,2),
    payment_history TEXT
);