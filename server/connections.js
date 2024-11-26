// MySQL:
import mysql from 'mysql2/promise';

export const LOCAL_CONNECTION = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.LOCAL_PASSWORD,
  database: 'email_collector_DB',
});
