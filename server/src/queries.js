// Connections:
import { LOCAL_POOL, LOCAL_CONNECTION } from './connections.js';
// 3rd party:
import { faker } from '@faker-js/faker';

export function queryBuilder(
  sql,
  cb = (resolved) => {
    console.log(JSON.stringify(resolved, null, 2));
    return resolved;
  }
) {
  return async (
    valuesArr = [],
    closeConnection = false,
    connection = LOCAL_CONNECTION
  ) => {
    try {
      const resolved = await connection.execute(sql, valuesArr);

      return cb(resolved);
    } catch (err) {
      console.log(err);
    } finally {
      if (closeConnection) {
        await connection.end();
      }
    }
  };
}

export const getAllFromUsers = queryBuilder(
  /* sql */ `
     SELECT * FROM users
    ;`,
  (resolved) => {
    const [results] = resolved;

    results.forEach((res) => {
      for (let key in res) {
        console.log(`${key}: ${res[key]}`);
      }
      console.log('------------------');
    });

    return results;
  }
);

export const getCountFromUsers = queryBuilder(
  /* sql */ `
     SELECT 
        COUNT(*) AS 'count' 
     FROM 
        users 
    ;`,
  (resolved) => {
    const [results] = resolved;

    console.log(`Total number of users is ${results[0]['count']}.`);

    return results[0]['count'];
  }
);

export const addUserToUsers = queryBuilder(/* sql */ `
     INSERT INTO 
        users (email)
    VALUES (?)
    ;`);

export const addNFakeUsersToUsers = (N = 5) => {
  if (N < 1) return false;

  const valuesArr = [];
  for (let i = 0; i < N; i++) {
    valuesArr.push(faker.internet.email());
    valuesArr.push(faker.date.between({ from: '2000-01-01', to: Date.now() }));
  }

  return queryBuilder(/* sql */ `
    INSERT INTO 
       users (email, created_at)
   VALUES ${'(?, ?), '.repeat(N - 1) + '(?, ?)'}
   ;`)(valuesArr);
};
