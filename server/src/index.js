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
  getUsersCountByEmailProviderFromUsers,
} from './queries.js';

// console.log(
//   'Date from faker: ',
//   faker.date.between({ from: '2015-01-01', to: Date.now() })
// );
// console.log('Date from JS: ', new Date());

clearAllFromUsers();
addNFakeUsersToUsers(150, '2015-01-01');
getAllFromUsers();
getCountFromUsers();
getEarliestDateFromUsers('%M %D %Y');
getEarliestUsersFromUsers();
getUsersCountByMonthFromUsers();
getUsersCountByEmailProviderFromUsers();
// closing the connection:
LOCAL_CONNECTION.end();
