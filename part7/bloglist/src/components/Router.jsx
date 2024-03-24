import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';

import Users from './Users';
import App from '../App';

import userService from '../services/users';
import blogService from '../services/blogs';
import User from './User';

import BlogView from './BlogView';

import { useSelector } from 'react-redux';

const Router = () => {
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
        const userId = params.id;
        const user = await userService.getUserById(userId);
        return user;
      },
    },
    {
      path: 'blogs/:id',
      element: <BlogView />,
      loader: async ({ params }) => {
        const blog = await blogService.getById(params.id);
        const currBlogId = blog.id;
        const author = await userService.getUserById(blog.user);
        return { currBlogId, author };
      },
      errorElement: (
        <div>
          <p>There was some error</p>
          <Link to={'/'}>Go back</Link>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
