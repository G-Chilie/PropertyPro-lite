import debug from 'debug';
import pool from '../config/connection';
import tables from './tables';

const debugg =debug('migrate');
(async function migrate() {
    debugg('migrating...');
    const client = await pool.connect();
    try {
        debugg('migrating users...');
        await client.query(tables.users);

        debugg('migrating propertys...');
        await client.query(tables.propertys);

        debugg('migrating flags...');
        await client.query(tables.flags);
    } catch (err) {
        debugg(err);
    }  finally {
        await client.release();
        debugg('migration completed');
    }
    debugg('Exiting...');
}());