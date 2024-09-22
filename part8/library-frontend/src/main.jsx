import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import App from './App.jsx';
import Authors from './components/Authors.jsx';
import Books from './components/Books.jsx';
import BookForm from './components/BookForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import RecommendedBooks from './components/RecommendedBooks.jsx';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
  const userToken = localStorage.getItem('user-token');

  return {
    headers: {
      ...headers,
      authorization: userToken ? `Bearer ${userToken}` : null,
    },
  };
});

const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000' }));
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'authors',
        element: <Authors />,
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: '/create',
        element: <BookForm />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/recommend',
        element: <RecommendedBooks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
