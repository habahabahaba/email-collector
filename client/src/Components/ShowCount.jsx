// Queries:
import { getTotalCount } from '../queries';
// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useEffect, useState } from 'react';
// Context:
// Components:
// CSS:

const ShowCount = () => {
  // State:
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { total_users } = await getTotalCount();
      setCount(total_users);
    })();
  }, [setCount]);

  // JSX:
  return <span>{count}</span>;
};

export default ShowCount;
