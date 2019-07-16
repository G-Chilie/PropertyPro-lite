import passwordHash from 'password-hash';
import debug from 'debug';
import pool from '../config/connection';

const debugg = debug('seed');

const password = passwordHash.generate('secret');

const userA = `INSERT INTO users(first_name, last_name, email, phone_number, password, address )
                VALUES('John', 'Doe', 'john.user@gmail.com', '08163446686', '${password}', '111 str, Peace Estate, Lagos, Nigeria')`;

const userB = `INSERT INTO users(first_name, last_name, email, phone_number, password, address )
                VALUES('Bill', 'Gates', 'bill.user@gmail.com', '08163433486', '${password}', '111 str, Ajao Estate, Lagos, Nigeria')`;

const admin = `INSERT INTO users(first_name, last_name, is_admin, email, phone_number, password, address)
                VALUES('Chinwe', 'Okonkwo', true, 'chinwe.admin@gmail.com', '07066554435', '${password}', '707 str, Ikeja GRA, Lagos, Nigeria')`;

const propertyA = `INSERT INTO propertys(owner, status, state, price, address, type, image_url, owner_email)
                VALUES(1, 'available', 'Lagos', '6500000', '111 str, Peace Estate, Lagos, Nigeria', '1_bedroom', 'https://res.cloudinary.com/chinwecloud/image/upload/v1562767247/sample.jpg', 'john.user@gmail.com')`;

const propertyB = `INSERT INTO propertys(owner, status, state, price, address, type, image_url, owner_email)
                VALUES(2, 'available', 'Lagos', '7500000', '111 str, Ajao Estate, Lagos, Nigeria', '2_bedroom', 'https://res.cloudinary.com/chinwecloud/image/upload/v1562767247/sample.jpg', 'bill.user@gmail.com')`;

const flag = `INSERT INTO flags(property_id, reason, description)
                VALUES(2, 'Fake images', 'The images being displayed are not original images of the vehicle')`;

(async function seed() {
    const client = await pool.connect();
    debugg('seeding database...');
    try {
        await client.query(userA);
        await client.query(userB);
        await client.query(admin);
        await client.query(propertyA)
        await client.query(propertyB)
        await client.query(flag);
    } catch (err) {
        debugg(err)
        return;
    } finally {
        await client.release();
        debugg('seeding completed');
    }
    debugg('Exiting...');
}());