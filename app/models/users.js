import pool from '../config/connection';

class User {
  static async create(values) {
    const client = await pool.connect();
    let user;
    const text = `INSERT INTO users(first_name, last_name, email, password, phoneNumber, address)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email, isAdmin, phone, passportUrl, address, createdOn`;
    try {
      user = await client.query({ text, values });
      if (user.rowCount) {
        user = user.rows[0];
        return user;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      await client.release();
    }
  }


}
export default User;