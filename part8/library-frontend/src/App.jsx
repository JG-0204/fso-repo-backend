import { Outlet, Link } from 'react-router-dom';
import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from './queries';
import { useEffect, useState } from 'react';

import updateCache from './util';

const App = () => {
  const [token, setToken] = useState(null);
  const { data: currUser, loading: currUserLoading } = useQuery(ME, {
    skip: !token,
  });
  const { data: authorsQuery, loading: allAuthorsLoading } =
    useQuery(ALL_AUTHORS);
  const { data: booksQuery, loading: allBooksLoading } = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data?.bookAdded;
      alert(
        `a new book: ${bookAdded.title} by ${bookAdded.author.name} has been added.`
      );
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded);
    },
  });

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
          books: !allBooksLoading ? booksQuery.allBooks : null,
        }}
      />
    </div>
  );
};

export default App;
