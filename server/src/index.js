// 3rd party:
import { faker } from '@faker-js/faker';
// Database:
import { LOCAL_CONNECTION } from './connections.js';
import { getAllFromTable, getCountFromTable } from './queries.js';

const allFromUsersQ = getAllFromTable('users');

try {
  const [results] = await LOCAL_CONNECTION.query(allFromUsersQ);

  results.forEach((res) => {
    for (let key in res) {
      console.log(`${key}: ${results[0][key]}`);
    }
    console.log('------------------');
  });
} catch (err) {
  console.log(err);
}

const [countFromUsersQ, col] = getCountFromTable('users');

try {
  const [results] = await LOCAL_CONNECTION.query(countFromUsersQ);

  console.log(`Total number of users is ${results[0][col]}.`);
} catch (err) {
  console.log(err);
}

// closing the connection:
LOCAL_CONNECTION.end();
