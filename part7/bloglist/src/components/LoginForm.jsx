import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          data-cy='username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          data-cy='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' data-cy='login'>
        login
      </button>
    </form>
  );
};

export default LoginForm;
