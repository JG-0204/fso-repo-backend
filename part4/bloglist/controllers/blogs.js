const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const currBlog = await blog.save();
  response.status(201).json(currBlog);
});

blogsRouter.get('/', async (request, response) => {
  response.json(await Blog.find({}));
});

module.exports = blogsRouter;
