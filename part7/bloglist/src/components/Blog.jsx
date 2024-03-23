import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5,
  };

  return (
    <>
      <div style={blogStyle} data-cy='blog'>
        <Link to={`blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </>
  );
};

export default Blog;
