export const userQueries = {
  fetchUser: 'SELECT * FROM users WHERE user_id = $1',
 fetchAllUsers :`SELECT user_id, first_name,last_name,email,ghana_ecowas_number,home_address,date_of_birth,occupation,income,expenses,is_verified FROM users`,
  fetchUserByEmail: 'SELECT * FROM users WHERE email = $1',
  updateUser: `
      UPDATE users
      SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email = COALESCE($3, email),
        password = COALESCE($4, password),
        ghana_ecowas_number = COALESCE($5, ghana_ecowas_number),
        phone_number = COALESCE($6, phone_number),
        home_address = COALESCE($7, home_address),
        date_of_birth = COALESCE($8, date_of_birth),
        occupation = COALESCE($9, occupation),
        income = COALESCE($10, income),
        expenses = COALESCE($11, expenses)
      WHERE user_id = $12
      RETURNING *;
    `,
  deleteUser: 'DELETE FROM users WHERE user_id = $1 RETURNING *',
  checkIfUserExists: `SELECT * FROM users WHERE LOWER("email") = LOWER($1);`,
  createPersonalUser: 'INSERT INTO users (first_name, last_name, email, password, ghana_ecowas_number, phone_number, home_address, date_of_birth, occupation, income, expenses) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
  getUserByPhoneNumber: `SELECT user_id, first_name,last_name,email,,ghana_ecowas_number,home_address,date_of_birth,occupation,income,expenses FROM users WHERE phone_number = $1`,
  storeOtp :`INSERT INTO otp (user_id, otp) VALUES ($1, $2) RETURNING *`,
  updateOtp :`UPDATE otp SET otp = $1 WHERE user_id = $2`,
  updateVerifiedfield :`UPDATE users SET is_verified = true WHERE user_id = $1`,
  checkVerified :`SELECT is_verified FROM users WHERE user_id = $1`,
  fetchOtp: 'SELECT * FROM otp WHERE user_id =$1'
};
