import pg from 'pg';

const { DB_HOST, DB_PORT = '5432', DB_USER, DB_PASS, DB_NAME } = process.env;

export const pool = new pg.Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});
