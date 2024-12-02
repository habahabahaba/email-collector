// CSS:
import './App.css';
// Components:
import ShowCount from './Components/ShowCount';
import EmailForm from './Components/EmailForm';

function App() {
  return (
    <div className='background'>
      <h1>Email Collector {!import.meta.env.PROD ? '(DEV)' : null}</h1>
      <section>
        Enter your email to join{' '}
        <strong>
          <ShowCount />
        </strong>{' '}
        others on our list. The spam must flow.
      </section>
      <EmailForm />
    </div>
  );
}

export default App;
