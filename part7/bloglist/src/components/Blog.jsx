import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div data-cy='blog'>
      <Link to={`${blog.id}`} className='link font-bold hover:text-neutral'>
        {blog.title} by {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
