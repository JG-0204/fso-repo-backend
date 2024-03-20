import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';

import { showNotification } from '../reducers/notificationReducer';

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    dispatch(createBlog(blog));

    dispatch(
      showNotification(
        `A new blog '${blog.title}' by ${blog.author} has been added.`
      )
    );

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          data-cy='titleInp'
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='blog title'
        />
      </div>
      <div>
        author:
        <input
          data-cy='authorInp'
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='blog author'
        />
      </div>
      <div>
        url:
        <input
          data-cy='urlInp'
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='blog url'
        />
      </div>
      <button type='submit' data-cy='createBlog'>
        create
      </button>
    </form>
  );
};

export default BlogForm;
