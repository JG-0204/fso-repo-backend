import { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    addBlog(blog);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          id="titleInput"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="blog title"
        />
      </div>
      <div>
        author:
        <input
          id="authorInput"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="blog author"
        />
      </div>
      <div>
        url:
        <input
          id="urlInput"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="blog url"
        />
      </div>
      <button type="submit" id="addBlogBtn">
        create
      </button>
    </form>
  );
};

export default BlogForm;
