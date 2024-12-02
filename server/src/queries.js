// Connections:
import { LOCAL_POOL, LOCAL_CONNECTION } from './connections.js';
// 3rd party:
import { faker } from '@faker-js/faker';

export function queryBuilder(
  sql,
  cb = (resolved) => {
    console.log('Query results: ', JSON.stringify(resolved, null, 2));
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
    SELECT 
        * 
    FROM users
    ORDER BY created_at DESC
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

    console.log(`
Total number of users is ${results[0]['count']}.`);

    return { total_users: results[0]['count'] };
  }
);

export const addUserToUsers = queryBuilder(
  /* sql */ `
     INSERT INTO 
        users (email)
    VALUES (?)
    ;`,
  (resolved) => {
    const [results] = resolved;

    console.log('[addUserToUsers]results: ', results);

    return results;
  }
);

export const addNFakeUsersToUsers = (
  N = 5,
  fromDate = '2000-01-01',
  closeConnection = false,
  connection = LOCAL_CONNECTION
) => {
  if (N < 1) return false;

  // // Works only with .query(), NOT with .execute():
  //   const valuesArr = Array.from({ length: N }, () => [
  //     faker.internet.email(),
  //     faker.date.between({ from: fromDate, to: Date.now() }),
  //   ]);
  //   return queryBuilder(/* sql */ `
  //     INSERT INTO
  //         users (email, created_at)
  //     VALUES ?
  //    ;`)([valuesArr], closeConnection, connection);

  // Works with connection.execute():
  const valuesArr = [];
  for (let i = 0; i < N; i++) {
    valuesArr.push(faker.internet.email());
    valuesArr.push(faker.date.between({ from: fromDate, to: Date.now() }));
  }

  return queryBuilder(/* sql */ `
    INSERT INTO
       users (email, created_at)
   VALUES ${new Array(N).fill('(?, ?)').join(', ')}
   ;`)(valuesArr, closeConnection, connection);
};

export const clearAllFromUsers = queryBuilder(/* sql */ `
    TRUNCATE users
   ;`);

export const getEarliestDateFromUsers = (
  dateFormat = '%Y-%b-%d %H:%i',
  closeConnection = false,
  connection = LOCAL_CONNECTION
) =>
  queryBuilder(
    /* sql */ `
    SELECT
    DATE_FORMAT (
            MIN(created_at) OVER(), 
            ?
        ) AS earliest_date
    FROM
        users
    LIMIT 1
   ;`,
    (resolved) => {
      const [results] = resolved;

      console.log(`
The earliest date is ${results[0]['earliest_date']}.`);

      return results[0]['earliest_date'];
    }
  )([dateFormat], closeConnection, connection);

export const getEarliestUsersFromUsers = queryBuilder(
  /* sql */ `
SELECT
  email,
  created_at
FROM
  users
WHERE
  created_at = (
    SELECT
     MIN(created_at)
    FROM
      users
  )
   ;`,

  (resolved) => {
    const [results] = resolved;

    console.log(
      `
The earliest ${results.length > 1 ? results.length + 'users are' : 'user is'}:`
    );
    results.forEach((res) => {
      for (let key in res) {
        console.log(`${key}: ${res[key]}`);
      }
      console.log('------------------');
    });

    return results;
  }
);

function countByCB(
  groupByCol,
  countCol = 'count',
  message = `
Count by ${groupByCol}:`
) {
  return (resolved) => {
    const [results] = resolved;
    console.log(message);
    const resultObj = results.reduce((resultObj, res) => {
      console.log(`${res[groupByCol]}: ${res[countCol]}`);
      resultObj[res[groupByCol]] = res[countCol];
      return resultObj;
    }, {});

    return resultObj;
  };
}

export const getUsersCountByMonthFromUsers = queryBuilder(
  /* sql */ `
SELECT
  MONTHNAME(created_at) AS 'month',
  COUNT(*) AS 'count'
FROM
  users
GROUP BY
  month
ORDER BY count DESC
   ;`,
  countByCB(
    'month',
    'count',
    `
Join-dates count by month (descending):`
  )
);

export const getUsersCountByYearFromUsers = queryBuilder(
  /* sql */ `
SELECT
  YEAR(created_at) AS 'year',
  COUNT(*) AS 'count'
FROM
  users
GROUP BY
  year
ORDER BY count DESC
   ;`,
  countByCB(
    'year',
    'count',
    `
Join-dates count by year (descending):`
  )
);

export const getUsersCountByEmailProviderFromUsers = queryBuilder(
  /* sql */ `
SELECT
  IFNULL(
    REGEXP_REPLACE(email, '^.+@([a-zA-Z0-9\-\_]+)\.[a-z0-9\-\_\.]+$', '$1'),
    'invalid_email'
  ) AS provider,
  COUNT(*) AS total_users
FROM
  users
GROUP BY
  provider
ORDER BY
  total_users DESC
   ;`,
  countByCB(
    'provider',
    'total_users',
    `
User count by email-provider (descending):`
  )
);
