const Blog = require('../models/blog');

const sampleBlogs = [
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'URL 1',
    likes: 1,
  },
  {
    title: 'Title 2',
    author: 'Author 2',
    url: 'URL 2',
    likes: 2,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  sampleBlogs,
  blogsInDb,
};
