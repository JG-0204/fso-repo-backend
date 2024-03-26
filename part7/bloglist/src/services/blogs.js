import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.get(baseUrl, config);
  return request.data;
};

const getById = async blogId => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${blogId}`;

  const response = await axios.get(url, config);
  return response.data;
};

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlogLikes = async blog => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${blog.id}`;

  const response = await axios.put(url, blog, config);
  return response.data;
};

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${blog.id}`;

  const response = await axios.delete(url, config, blog);
  return response.data;
};

const createBlogComment = async (comment, id) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${id}/comments`;
  const body = {
    comment,
    blog: {
      id,
    },
  };

  const response = await axios.post(url, body, config);
  return response.data;
};

export default {
  getAll,
  getById,
  setToken,
  create,
  updateBlogLikes,
  deleteBlog,
  createBlogComment,
};
