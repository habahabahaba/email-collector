// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useState } from 'react';
// Context:
// Components:
// CSS:

const EmailForm = () => {
  const [isPending, setIsPending] = useState(false);
  // JSX:
  return (
    <form
      className='email-form'
      method='POST'
      action={import.meta.env.VITE_USER_ADD_ENDPOINT}
    >
      <input
        type='email'
        name='email'
        placeholder='add email...'
        className='input'
      />
      <button type='submit'>{isPending ? 'Joining...' : 'Join'}</button>
    </form>
  );
};

export default EmailForm;
