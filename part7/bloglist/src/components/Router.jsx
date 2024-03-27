import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';

import userService from '../services/users';
import blogService from '../services/blogs';

import App from '../App';
import Users from './Users';
import User from './User';
import BlogView from './BlogView';
import BlogsPage from './BlogsPage';
import LoggedOutView from './LoggedOutView';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/login',
          element: <LoggedOutView />,
        },
        {
          path: '/blogs',
          element: <BlogsPage />,
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
            <div className='flex flex-col items-center mt-10'>
              <p className='font-bold uppercase text-2xl'>
                There was some error
              </p>
              <Link to={'/blogs'} className='link text-lg'>
                Go back
              </Link>
            </div>
          ),
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
