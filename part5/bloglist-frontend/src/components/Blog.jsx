import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

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

  return (
    <>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(showDetails ? false : true)}>
          {showDetails ? 'hide' : 'view'}
        </button>
        {showDetails && (
          <div style={blogDetailsStyle}>
            {blog.url}
            <div>
              {blog.likes} <button>like</button>
            </div>
            {blog.author}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
