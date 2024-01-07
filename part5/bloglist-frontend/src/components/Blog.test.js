import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

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

test('renders only blog title and author', () => {
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

test('when view button is clicked show blog additional details', async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const blogDetails = container.querySelector('.blogDetails');

  expect(blogDetails).not.toBeNull();
  expect(blogDetails.textContent).toContain(blog.url);
  expect(blogDetails.textContent).toContain(blog.likes.toString());
});

test('check if like button is clicked twice will return properly', async () => {
  const updateLike = jest.fn();

  render(<Blog blog={blog} likeUpdater={updateLike} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const likeButton = screen.getByText('like');
  // click like button once
  await user.click(likeButton);
  expect(updateLike.mock.calls).toHaveLength(1);
  // click like button twice
  await user.click(likeButton);
  expect(updateLike.mock.calls).toHaveLength(2);
});
