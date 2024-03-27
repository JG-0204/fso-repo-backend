import { useLoaderData, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';
import Comments from './Comments';

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
      navigate('/blogs');
    }
  };

  const showRemoveButton = () => {
    if (currUser.id === author.id) {
      return (
        <button
          onClick={handleRemoveButton}
          data-cy='removeBlog'
          className='btn btn-sm btn-warning uppercase'>
          remove
        </button>
      );
    }
  };

  return (
    <div>
      <h2 className='font-bold text-3xl mb-5'>{blog.title}</h2>

      <p className='mb-3'>
        <a href={blog.url} target='_blank' className='link'>
          {blog.url}
        </a>
      </p>
      <div className='mb-5 flex gap-5 items-center'>
        <button
          className='btn btn-sm btn-neutral uppercase'
          onClick={() => dispatch(likeBlog(blog))}
          data-cy='likeBlog'>
          like
        </button>
        <p>{blog.likes} like/s</p>
      </div>
      <div className='flex gap-10 items-center mb-10'>
        <p>Added by: {author.username}</p>
        {showRemoveButton()}
      </div>

      <h3 className='font-bold text-2xl mb-3'>
        Comments ({blog?.comments?.length})
      </h3>
      <Comments blogId={currBlogId} />
      <ul className='flex flex-col gap-2'>
        {blog.comments.map(comment => (
          <li key={comment.id} className=' font-bold py-1 px-2'>
            {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
