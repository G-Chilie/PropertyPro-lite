const users = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    address VARCHAR(200) DEFAULT NULL
)`; 

const propertys = `CREATE TABLE IF NOT EXISTS propertys (
    id VARCHAR(100),
    owner VARCHAR(100),
    owner_email VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    status VARCHAR(100) DEFAULT('Available'),
    price Numeric(12, 2),
    address VARCHAR(100),
    type VARCHAR(200),
    image_url VARCHAR(200),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)`;

const flags = `CREATE TABLE IF NOT EXISTS flags (
    id VARCHAR(100),
    property_id VARCHAR(100),
    reason VARCHAR(100),
    description VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

export default {
  users,
  propertys,
  flags,
};
