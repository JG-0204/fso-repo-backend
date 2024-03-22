import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';

import { sortByLike } from '../util';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const LoggedInView = ({ blogs, user }) => {
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const showNewBlogForm = () => {
    return (
      <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    );
  };

  return (
    <div>
      <p>
        {user.name} logged in
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </p>
      {showNewBlogForm()}

      <div>
        {sortByLike(blogs).map(blog => (
          <Blog blog={blog} key={blog.id} currUser={user} />
        ))}
      </div>
    </div>
  );
};

export default LoggedInView;
