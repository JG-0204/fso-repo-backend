import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';

import { showNotification } from '../reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();

    try {
      await dispatch(loginUser(username, password));
      navigate('/blogs');
    } catch (err) {
      dispatch(
        showNotification(
          'Wrong username or password! Enter a proper account.',
          err.message
        )
      );
    }

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-3'>
      <label className='input input-bordered input-neutral flex items-center gap-2 '>
        User:
        <input
          id='username'
          data-cy='username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label className='input input-bordered input-neutral flex items-center gap-2 '>
        Password:
        <input
          id='password'
          data-cy='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button
        type='submit'
        data-cy='login'
        className='btn btn-neutral uppercase'>
        login
      </button>
    </form>
  );
};

export default LoginForm;
