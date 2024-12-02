// MySQL:
import mysql from 'mysql2/promise';

export const LOCAL_CONNECTION = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'email_collector_DB',
});

export const LOCAL_POOL = mysql.createPool({
  host: process.env.DB_HOST,
  user: 'root',
  database: 'email_collector_DB',
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 5000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10,
});
