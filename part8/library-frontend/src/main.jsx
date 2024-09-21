import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
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
