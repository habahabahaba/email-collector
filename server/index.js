// 3rd party:
import { faker } from '@faker-js/faker';
// Database:
import { LOCAL_CONNECTION } from './connections.js';

// // Print a random number
// console.log(faker.number.int());
// // Print a random email
// console.log(faker.internet.email());
// // Print a random past date
// console.log(faker.date.past());

console.log('Getting current time from the database:');
const currTimeQuery = /* sql */ `
SELECT NOW() AS result;
`;

try {
  const [results] = await LOCAL_CONNECTION.query(currTimeQuery);

  console.log(results[0]['result']);
} catch (err) {
  console.log(err);
}

console.log('Getting number 6 from the database:');
const twoPlusFourQuery = /* sql */ `
SELECT 2 + 4 AS result;
`;

try {
  const [results] = await LOCAL_CONNECTION.query(twoPlusFourQuery);

  console.log(results[0]['result']);
} catch (err) {
  console.log(err);
}

console.log('Getting number current DATE, TIME, NOW from the database:');
const currDateTimeNowQuery = /* sql */ `
 SELECT 
    CURTIME() AS 'time',
    CURDATE() AS 'date',
    NOW() AS 'now'
`;

try {
  const [results] = await LOCAL_CONNECTION.query(currDateTimeNowQuery);

  for (let key in results[0]) {
    console.log(`${key}: ${results[0][key]}`);
  }
} catch (err) {
  console.log(err);
}

// closing the connection:
LOCAL_CONNECTION.end();
