import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    appendBlog: (state, action) => state.concat(action.payload),
    updateBlog: (state, action) => {
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
    removeBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogsSlice.actions;

export const fetchBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.updateBlogLikes(blog);
    dispatch(updateBlog(likedBlog));
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.deleteBlog(blog);
    dispatch(removeBlog(blog.id));
  };
};

export default blogsSlice.reducer;
