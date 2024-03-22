import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import { store } from './store';
import { Provider } from 'react-redux';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Users from './components/Users';
import App from './App';

import userService from './services/users';
import User from './components/User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/users',
    element: <Users />,
    loader: async () => {
      const users = await userService.getUsers();
      return users;
    },
  },
  {
    path: '/users/:id',
    element: <User />,
    loader: async ({ params }) => {
      const id = params.id;
      const user = await userService.getUserById(id);
      return user;
    },
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
