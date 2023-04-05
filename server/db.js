const { Pool } = require('pg');
require('dotenv').config();

const env = process.env.NODE_ENV === 'dev' ? true : false;

const poolConfig = {
  host: env ? process.env.DB_HOST : process.env.DB_HOST_TEST,
  user: env ? process.env.DB_USER : process.env.DB_USER_TEST,
  password: env ? process.env.DB_PASS : process.env.DB_PASS_TEST,
  port: env ? process.env.DB_PORT : process.env.DB_PORT_TEST,
  database: env ? process.env.DB_NAME : process.env.DB_NAME_TEST,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

const pool = new Pool(poolConfig);

pool.on('error', (err, client) => {
  console.error('  Unexpected error on the database connection: ', err);
});

pool.on('connect', (client) => {
  console.log('  Database connection made.')
});

module.exports = pool;