import pool from '../config/connection';

class Property {
  static async create(values) {
    const client = await pool.connect();
    let property;
    const text = `INSERT INTO propertys(owner, price, state, address, type, image_url)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    try {
      property = await client.query({ text, values });
      if (property.rowCount) {
        property = property.rows[0];
        return property;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      await client.release();
    }
  }

  static async update(id, data) {
    const values = [data.value, id];
    const client = await pool.connect();
    let property;
    const text = `UPDATE propertys SET ${data.name} = $1 WHERE id = $2 RETURNING *`;
    try {
      property = await client.query({ text, values });
      if (property.rowCount) {
        return property.rows[0];
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  static async getAll() {
    const client = await pool.connect();
    let propertys;
    const text = 'SELECT * FROM propertys';
    try {
      propertys = await client.query({ text });
      if (propertys.rows && propertys.rowCount) {
        return propertys.rows;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  static async getById(id) {
    const values = [id];
    const client = await pool.connect();
    let property;
    const text = 'SELECT * FROM propertys WHERE id = $1 LIMIT 1';
    try {
      property = await client.query({ text, values });
      if (property.rows && property.rowCount) {
        property = property.rows[0];
        return property;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  static async getByType(type) {
    const values = [type];
    const client = await pool.connect();
    let propertys;
    const text = 'SELECT * FROM propertys WHERE type = $1';
    try {
      propertys = await client.query({ text, values });
      if (propertys.rows && propertys.rowCount) {
        propertys = propertys.rows;
        return propertys;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  static async delete(id) {
    const values = [id];
    const client = await pool.connect();
    let property;
    const text = 'DELETE FROM propertys WHERE id = $1 RETURNING id';
    try {
      property = await client.query({ text, values });
      if (property.rowCount) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
}
export default Property;