import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { likeBlog, deleteBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, currUser }) => {
  const dispatch = useDispatch();

  const [showDetails, setShowDetails] = useState(false);
  const author = blog.user.id ?? blog.user;

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5,
  };

  const blogDetailsStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
  };

  const handleRemoveButton = e => {
    e.preventDefault();

    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`);
    if (confirm) {
      dispatch(deleteBlog(blog));
      dispatch(
        showNotification(
          `A blog ${blog.title} by ${blog.author} has been deleted.`
        )
      );
    }
  };

  const showRemoveButton = () => {
    if (currUser.id === author) {
      return (
        <button onClick={handleRemoveButton} data-cy='removeBlog'>
          remove
        </button>
      );
    }
  };

  return (
    <>
      <div style={blogStyle} data-cy='blog'>
        {blog.title} {blog.author}
        <button
          onClick={() => setShowDetails(showDetails ? false : true)}
          data-cy='viewBlog'>
          {showDetails ? 'hide' : 'view'}
        </button>
        {showDetails && (
          <div style={blogDetailsStyle} data-cy='blogDetails'>
            {blog.url}
            <div>
              {blog.likes}
              <button
                onClick={() => dispatch(likeBlog(blog))}
                data-cy='likeBlog'>
                like
              </button>
            </div>
            {author.name}
            {showRemoveButton()}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
