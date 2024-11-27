// 3rd party:
import { faker } from '@faker-js/faker';
// Database:
import { LOCAL_CONNECTION } from './connections.js';
import {
  getAllFromUsers,
  getCountFromUsers,
  addUserToUsers,
  addNFakeUsersToUsers,
} from './queries.js';

addNFakeUsersToUsers(10);
getAllFromUsers();
getCountFromUsers(['count']);

// closing the connection:
LOCAL_CONNECTION.end();
