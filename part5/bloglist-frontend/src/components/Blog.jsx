import { useState } from 'react';

const Blog = ({ blog, likeUpdater, deleteBlog, currUser }) => {
  const [showDetails, setShowDetails] = useState(false);
  const addedBy = blog.user.name;

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

  const handleLikeButton = (e) => {
    e.preventDefault();

    likeUpdater(blog);
  };

  const handleRemoveButton = (e) => {
    e.preventDefault();

    deleteBlog(blog);
  };

  const showRemoveButton = () => {
    if (currUser === addedBy) {
      return (
        <button onClick={handleRemoveButton} data-cy="removeBlog">
          remove
        </button>
      );
    }
  };

  return (
    <>
      <div style={blogStyle} data-cy="blog">
        {blog.title} {blog.author}
        <button
          onClick={() => setShowDetails(showDetails ? false : true)}
          data-cy="viewBlog"
        >
          {showDetails ? 'hide' : 'view'}
        </button>
        {showDetails && (
          <div style={blogDetailsStyle} data-cy="blogDetails">
            {blog.url}
            <div>
              {blog.likes}
              <button onClick={handleLikeButton} data-cy="likeBlog">
                like
              </button>
            </div>
            {addedBy}
            {showRemoveButton()}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
