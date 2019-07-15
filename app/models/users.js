import pool from '../config/connection';

class User {
  static async create(values) {
    const client = await pool.connect();
    let user;
    const text = `INSERT INTO users(first_name, last_name, email, password, phone_number, address)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, email, is_admin, password, phone_number, address`;
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

  static async findById(id) {
    const values = [id];
    const client = await pool.connect();
    let user;
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      user = await client.query({ text, values });
      if (user.rows && user.rowCount) {
        user = user.rows[0];
        return user;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }


  static async findByEmail(email) {
    const values = [email];
    const client = await pool.connect();
    let user;
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      user = await client.query({ text, values });
      if (user.rows && user.rowCount) {
        user = user.rows[0];
        return user;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

}
export default User;