/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS collateral (
    collateral_id SERIAL PRIMARY KEY,
    loan_id INTEGER REFERENCES loans(loan_id),
    collateral_type VARCHAR(50),
    estimated_value DECIMAL(10,2)
);