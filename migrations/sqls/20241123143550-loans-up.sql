/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS loans (
    loan_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    loan_amount DECIMAL(10,2),
    loan_term INTEGER,
    interest_rate DECIMAL(5,2),
    purpose TEXT,
    application_date DATE,
    status VARCHAR(20)
);