// Database:
import { LOCAL_CONNECTION } from './connections.js';
import {
  getAllFromUsers,
  getCountFromUsers,
  addUserToUsers,
  addNFakeUsersToUsers,
  clearAllFromUsers,
  getEarliestDateFromUsers,
  getEarliestUsersFromUsers,
  getUsersCountByMonthFromUsers,
  getUsersCountByYearFromUsers,
  getUsersCountByEmailProviderFromUsers,
} from './queries.js';
// Routing:
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import bodyParser from 'body-parser';
// Client
// import * as client from '@email-collector/client';

clearAllFromUsers();
addNFakeUsersToUsers(501, '2000-01-01');
// getAllFromUsers();
getCountFromUsers();
// getEarliestDateFromUsers('%M %D %Y');
// getEarliestUsersFromUsers();
// getUsersCountByMonthFromUsers();
// getUsersCountByYearFromUsers();
getUsersCountByEmailProviderFromUsers();

// Setting up routing:
const app = express();
const port = process.env.CLIENT_PORT;
// Check the current environment
const isProduction = process.env.NODE_ENV === 'production';
const portDEV = process.env.CLIENT_DEV_PORT;
const httpProxyMiddleware = createProxyMiddleware({
  target: `http://localhost:${portDEV}`,
  pathFilter: ['!/joke', '!/total_users', '!/user_add'],
  changeOrigin: true,
});

app.use('/', (req, res, next) => {
  if (!isProduction) {
    httpProxyMiddleware(req, res, next);
  } else {
    res.send('Email-Collector (PRODUCTION)');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/joke', (req, res) => {
  res.send('HA-HA!!!');
});

app.get('/total_users', async (req, res) => {
  const totalUsers = await getCountFromUsers();
  res.type('json');
  res.send(totalUsers);
});

app.post('/user_add', async (req, res) => {
  console.log('join attempt: ', req.body);

  addUserToUsers([req.body.email]);
  res.redirect('./');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// closing the connection:
// LOCAL_CONNECTION.end();
