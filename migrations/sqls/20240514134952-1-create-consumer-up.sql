
-- CREATE TABLE IF NOT EXISTS personal (
--   id SERIAL PRIMARY KEY,
--   surname VARCHAR(255) NOT NULL,
--   first_name VARCHAR(255) NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   ghana_ecowas_number VARCHAR(255) UNIQUE NOT NULL,
--   mobile_number VARCHAR(255) NOT NULL,
--   whatsapp_number VARCHAR(255),
--   city VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   type VARCHAR(50) NOT NULL CHECK (type IN ('business', 'personal', 'freight_forwarders', 'clearing_agent')),
--   is_verified BOOLEAN DEFAULT false
-- );

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ghana_ecowas_number VARCHAR(20) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,  
    home_address TEXT,
    date_of_birth DATE,
    occupation VARCHAR(50),
    income DECIMAL(10,2),
    expenses DECIMAL(10,2),
    is_verified BOOLEAN DEFAULT false
);

