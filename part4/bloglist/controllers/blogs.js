const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.url) return response.status(400).end();

  let blog;

  if (!body.likes) {
    blog = new Blog({ ...body, likes: 0 });
    return response.status(201).json(await blog.save());
  }

  blog = new Blog(body);
  response.status(201).json(await blog.save());
});

blogsRouter.get('/', async (request, response, next) => {
  response.json(await Blog.find({}));
});

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  response.status(201).json(blog);
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(newBlog);
});

module.exports = blogsRouter;
