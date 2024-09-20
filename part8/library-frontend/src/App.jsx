import { Outlet, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from './queries';
import { useEffect, useState } from 'react';

const App = () => {
  const [token, setToken] = useState(null);
  const { data, loading } = useQuery(ME);

  useEffect(() => {
    const userToken = localStorage.getItem('user-token');
    if (userToken) setToken(userToken);
  }, []);

  if (loading) return <h1>loading....</h1>;

  const logout = () => {
    setToken(null);
    localStorage.clear();
  };

  return (
    <div>
      {token && <h3>login as {data?.me.username}</h3>}

      <div style={{ display: 'flex', gap: '3px' }}>
        <button>
          <Link to="authors">authors</Link>
        </button>
        <button>
          <Link to="books">books</Link>
        </button>
        {token ? (
          <div>
            <button>
              <Link to="create">add book</Link>
            </button>
            <button>
              <Link to="recommend">recommend</Link>
            </button>
            <button onClick={() => logout()}>logout</button>
          </div>
        ) : (
          <button>
            <Link to="login">login</Link>
          </button>
        )}
      </div>
      <Outlet
        context={{
          setToken: setToken,
          token: token,
          loggedInUser: data ? data.me : null,
        }}
      />
    </div>
  );
};

export default App;
