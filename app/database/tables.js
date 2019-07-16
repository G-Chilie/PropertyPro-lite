const users = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    is_admin BOOLEAN DEFAULT false,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    address VARCHAR(200) DEFAULT NULL
)`; 

const propertys = `CREATE TABLE IF NOT EXISTS propertys (
    id,
    owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    owner_email VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    city VARCHAR(100),
    status VARCHAR(100) DEFAULT('Available'),
    price Numeric(12, 2) NOT NULL,
    address VARCHAR(100) NOT NULL,
    type VARCHAR(200) NOT NULL,
    image_url VARCHAR(200) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)`;

const flags = `CREATE TABLE IF NOT EXISTS flags (
    id,
    property_id INTEGER REFERENCES propertys(id) ON DELETE CASCADE ON UPDATE CASCADE,
    reason VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

export default {
  users,
  propertys,
  flags,
};
