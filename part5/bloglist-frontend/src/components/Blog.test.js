import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders only blog title and author', () => {
  const blog = {
    title: 'sample title',
    author: 'sample author',
    likes: 0,
    url: 'sample url',
    user: {
      id: '6586b1fb00741b946b6ba18a',
      name: 'Arto Hellas',
    },
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blog');

  // checking for url
  expect(div.textContent).not.toContain(blog.url);
  // checking for likes
  expect(div.textContent).not.toContain(blog.likes.toString());

  // checking for title and author
  expect(div.textContent).toContain(blog.title);
  expect(div.textContent).toContain(blog.author);
});
