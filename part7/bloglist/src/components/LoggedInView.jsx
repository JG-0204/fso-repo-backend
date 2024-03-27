import { useRef } from 'react';

import { sortByLike } from '../util';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const LoggedInView = ({ blogs }) => {
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
      {showNewBlogForm()}

      <div className='flex flex-col gap-2'>
        {sortByLike(blogs).map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default LoggedInView;
