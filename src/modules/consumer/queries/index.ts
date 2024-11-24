export const userQueries = {
  fetchUser: 'SELECT * FROM users WHERE id = $1',
 fetchAllUsers :`SELECT surname, first_name, email, ghana_ecowas_number, mobile_number, whatsapp_number, city, user_type, is_verified FROM personal;`,
  fetchUserByEmail: 'SELECT * FROM personal WHERE email = $1',
  updateUser: 'UPDATE users SET name = COALESCE($1, name),email = COALESCE($2, email),password = COALESCE($3, password) WHERE id = $4 RETURNING *;',
  deleteUser: 'DELETE FROM users WHERE id = $1 RETURNING *',
  checkIfUserExists: `SELECT * FROM personal WHERE LOWER("email") = LOWER($1);`,
  createPersonalUser: 'INSERT INTO personal (first_name, surname , email, ghana_ecowas_number, mobile_number, whatsapp_number, city , password,type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
  getUserByPhoneNumber: `SELECT id, first_name, surname , email, ghana_ecowas_number, mobile_number, whatsapp_number, city , password FROM personal WHERE mobile_number = $1`,
  storeOtp :`INSERT INTO otp (user_id, user_type) VALUES ($1, $2) RETURNING *`,
  updateOtp :`UPDATE otp SET otp = $1 WHERE user_id = $2 AND user_type = $3`,
  updateVerifiedfield :`UPDATE personal SET is_verified = true WHERE id = $1`,
  checkVerified :`SELECT is_verified FROM personal WHERE id = $1`,
  fetchOtp: 'SELECT * FROM otp WHERE user_id =$1 AND user_type = $2'
};
