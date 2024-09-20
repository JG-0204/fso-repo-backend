import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setToken } = useOutletContext();

  const [loginUser, { data, loading }] = useMutation(LOGIN);

  const navigate = useNavigate();

  useEffect(() => {
    const saveTokenToLocalStorage = () => {
      if (data) {
        const token = data.login.value;
        if (token) setToken(token);
        window.localStorage.setItem('user-token', token);
        navigate('/authors');
      }
    };

    saveTokenToLocalStorage();
  }, [data, setToken, navigate]);

  const submit = (event) => {
    event.preventDefault();

    loginUser({ variables: { username, password } });

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h3>Log-in</h3>
      <form
        onSubmit={submit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
        }}
      >
        <label htmlFor="username-input">
          Username:
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={() => setPassword('admin')}
          />
        </label>
        <div>
          <button type="submit">{loading ? 'logging in...' : 'login'}</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
