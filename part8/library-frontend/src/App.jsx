import { Outlet, Link } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ME } from './queries';
import { useEffect, useState } from 'react';

const App = () => {
  const [token, setToken] = useState(null);
  const { data: currUser, loading: currUserLoading } = useQuery(ME, {
    skip: !token,
  });
  const { data: authorsQuery, loading: allAuthorsLoading } =
    useQuery(ALL_AUTHORS);
  const client = useApolloClient();

  useEffect(() => {
    const userToken = localStorage.getItem('user-token');
    if (userToken) setToken(userToken);
  }, []);

  if (currUserLoading) return <h1>loading....</h1>;

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      {token && <h3>login as {currUser?.me.username}</h3>}

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
          loggedInUser: currUser ? currUser.me : null,
          authors: !allAuthorsLoading ? authorsQuery.allAuthors : null,
        }}
      />
    </div>
  );
};

export default App;
