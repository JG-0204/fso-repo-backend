import React from 'react';
import '@testing-library/jest-dom';
import { getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('', async () => {
  const handleAddBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm addBlog={handleAddBlog} />);

  const titleInput = screen.getByPlaceholderText('blog title');
  const authorInput = screen.getByPlaceholderText('blog author');
  const urlInput = screen.getByPlaceholderText('blog url');

  await userEvent.type(titleInput, 'a title');
  await userEvent.type(authorInput, 'an author');
  await userEvent.type(urlInput, 'a url');

  const addBlogButton = screen.getByText('create');
  await user.click(addBlogButton);

  // check if handler is called, expected 1
  expect(handleAddBlog.mock.calls).toHaveLength(1);

  // check if content is the same as the inputted value
  expect(handleAddBlog.mock.calls[0][0]).toEqual({
    title: 'a title',
    author: 'an author',
    url: 'a url',
  });
});
