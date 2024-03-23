import { useLoaderData, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';

const BlogView = () => {
  const dispatch = useDispatch();
  const { currBlogId, author } = useLoaderData();
  const navigate = useNavigate();

  const currUser = useSelector(state => state.login);
  const blogs = useSelector(state => state.blogs);

  const blog = blogs.find(blog => blog.id === currBlogId);

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
      navigate('/');
    }
  };

  const showRemoveButton = () => {
    if (currUser.id === author.id) {
      return (
        <button onClick={handleRemoveButton} data-cy='removeBlog'>
          remove
        </button>
      );
    }
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} like/s
        <button onClick={() => dispatch(likeBlog(blog))} data-cy='likeBlog'>
          like
        </button>
      </p>

      <p>added by {author.username}</p>
      {showRemoveButton()}
    </div>
  );
};

export default BlogView;
