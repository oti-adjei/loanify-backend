# Loanify Application

Loanify is a simple yet robust web interface and API designed to streamline the process of applying for and managing loans. It features secure backend services and optional frontend functionality to provide users with an intuitive experience.

---

## **Features**

### **Core API Endpoints**

   **Postman Doumentation** :-https://elements.getpostman.com/redirect?entityId=15310325-2b381eee-cfbb-4a3c-bb69-0b39a1fe34cb&entityType=collection

1. **Loan Application**
   - **Endpoint**: `POST /apply-loan`
   - **Description**: Submit a loan application with customer details, loan amount, and tenure.
   - **Request Body (JSON)**:
     ```json
     {
       "firstName": "John",
       "lastName": "Doe",
       "email": "john.doe@example.com",
       "loanAmount": 10000.00,
       "tenure": 12
     }
     ```
   - **Response**:
     - On success: Loan application ID and status.
     - On failure: Validation errors.

2. **Check Loan Status**
   - **Endpoint**: `GET /loan-status/{applicationID}`
   - **Description**: Retrieve the current status of a loan application.
   - **Response**:
     ```json
     {
       "applicationID": 1,
       "status": "Pending"
     }
     ```


**Project To-Do List**

### **Frontend Development**
* [✅] Design inspiration for the user interface for loan application and status check
* [⏳] Implement Flutter for the frontend
* [⏳] Integrate the frontend with the backend API

### **Backend Development**
* [✅] Set up the backend framework (Django, Flask, Spring Boot, etc.)
* [✅] Implement API endpoints for loan application and status check
* [✅] Validate input data and handle errors
* [✅] Implement database interactions (PostgreSQL, MySQL, MongoDB, etc.)
* [✅] Secure sensitive data (e.g., encryption)
* [✅] Implement logging and error tracking

### **Infrastructure Setup**
* [✅] Set up the infrastructure (cloud provider: AWS, GCP, Azure, etc.)
* [ ] Configure the network and security settings
* [ ] Set up the database and application server
* [ ] Configure load balancing and auto-scaling
* [ ] Implement monitoring and alerting

### **Deployment**
* [✅] Containerize the application using Docker
* [✅] Set up a CI/CD pipeline (Jenkins, GitLab CI/CD, etc.)
* [⏳] Automate the deployment process using IaC tools (Terraform, Ansible, etc.)
* [ ] Deploy the application to the production environment

### **Security**
* [ ] Implement HTTPS for secure communication
* [ ] Secure database credentials
* [ ] Enable encryption for data at rest and in transit
* [ ] Implement authentication and authorization mechanisms
* [ ] Conduct security testing and vulnerability scanning

### **Documentation**
* [✅] Create detailed technical documentation(POSTMAN)
* [⏳] Document the deployment process
* [ ] Create a project report summarizing the project


### **User Management**
- **Sign Up**: Users can register with their details.
- **Login**: Authenticated access using email and password.
- **CRUD Operations**: Users can update or delete their profiles.

### **Additional Modules**
- **Credit History Management**: Store and retrieve user credit information.
- **Collateral Tracking**: Link collateral assets to loan applications.
- **Loan Decisioning**: Record decisions on loan applications, including approval or rejection reasons.

---

## **Backend Features**
- **Input Validation**: Ensures data completeness and correct format.
- **Database Management**:
  - Securely stores user information, loan details, and related data.
  - Relational structure with robust table definitions.
- **Loan Status Management**: Automatically sets the status of loans to "Pending" upon submission.

---

## **Frontend (Optional)**
- Built with Flutter.
- **Features**:
  - A simple form to apply for loans.
  - A dashboard to check the status of applications.

---

## **Database Schema**

### Users Table
Stores user information, including personal and financial details.
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    occupation VARCHAR(50),
    income DECIMAL(10,2),
    expenses DECIMAL(10,2)
);


```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    occupation VARCHAR(50),
    income DECIMAL(10,2),
    expenses DECIMAL(10,2)
);

```sql
CREATE TABLE loans (
    loan_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    loan_amount DECIMAL(10,2),
    loan_term INTEGER,
    interest_rate DECIMAL(5,2),
    purpose TEXT,
    application_date DATE,
    status VARCHAR(20)
);

```sql
CREATE TABLE credit_history (
    credit_history_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    creditor_name VARCHAR(100),
    account_number VARCHAR(50),
    credit_limit DECIMAL(10,2),
    outstanding_balance DECIMAL(10,2),
    payment_history TEXT
);

```sql
CREATE TABLE collateral (
    collateral_id SERIAL PRIMARY KEY,
    loan_id INTEGER REFERENCES loans(loan_id),
    collateral_type VARCHAR(50),
    estimated_value DECIMAL(10,2)
);

```sql
CREATE TABLE loan_decisions (
    decision_id SERIAL PRIMARY KEY,
    loan_id INTEGER REFERENCES loans(loan_id),
    decision_date DATE,
    decision_status VARCHAR(20),
    reason TEXT,
    approved_by INTEGER REFERENCES users(user_id)
);