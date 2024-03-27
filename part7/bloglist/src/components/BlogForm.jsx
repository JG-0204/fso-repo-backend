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
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <label className='input input-bordered input-neutral flex items-center gap-2 w-8/12'>
        Title
        <input
          className='w-full'
          id='blog-title'
          data-cy='titleInp'
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='What is the 60-30-10 Rule in Design?'
        />
      </label>
      <label className='input input-bordered input-neutral flex items-center gap-2 w-8/12'>
        Author
        <input
          id='blog-author'
          data-cy='authorInp'
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='Ijelekhai Faith Olohijere'
        />
      </label>
      <label className='input input-bordered input-neutral flex items-center gap-2 w-8/12'>
        Url
        <input
          id='blog-url'
          data-cy='urlInp'
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='https://www.freecodecamp.org/news/the-60-30-10-rule-in-design/'
        />
      </label>
      <button
        type='submit'
        data-cy='createBlog'
        className='btn btn-sm uppercase btn-neutral self-start mb-3'>
        create
      </button>
    </form>
  );
};

export default BlogForm;
