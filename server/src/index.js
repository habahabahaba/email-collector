// 3rd party:
import { faker } from '@faker-js/faker';
// Database:
import { LOCAL_CONNECTION } from './connections.js';
import {
  getAllFromUsers,
  getCountFromUsers,
  addUserToUsers,
  addNFakeUsersToUsers,
  clearAllFromUsers,
} from './queries.js';

// console.log(
//   'Date from faker: ',
//   faker.date.between({ from: '2015-01-01', to: Date.now() })
// );
// console.log('Date from JS: ', new Date());

clearAllFromUsers();
addNFakeUsersToUsers(10, '2015-01-01');
getAllFromUsers();
getCountFromUsers();

// closing the connection:
LOCAL_CONNECTION.end();
