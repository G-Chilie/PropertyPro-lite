import pool from '../config/connection';

class Property {
    static async create(values) {
        const client = await pool.connect();
        let property;
        const text = `INSERT INTO propertys(owner, price, state, address, type, image_url)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        try {
            property = await client.query({ text, values });
            if (Property.rowCount) {
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

      
}

export default Property;