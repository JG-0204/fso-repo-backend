const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const user = request.user;

  if (!body.title || !body.url) return response.status(400).end();

  if (!body.likes) body.likes = 0;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response, next) => {
  const blogId = request.body.id;

  const blogToUpdate = await Blog.findById(blogId);

  const updatedBlog = {
    ...blogToUpdate.toObject(),
    likes: blogToUpdate.likes + 1,
  };

  const newBlog = await Blog.findByIdAndUpdate(blogId, updatedBlog, {
    new: true,
  }).populate('comments', {
    content: 1,
    id: 1,
  });

  response.json(newBlog);
});

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', { content: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate('comments', {
    content: 1,
    id: 1,
  });
  response.status(200).json(blog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  const user = request.user;

  if (!(blog.user.toString() === user.id)) {
    return response.status(401).json({
      error: 'invalid user',
    });
  }

  await Blog.deleteOne(blog);

  return response.status(204).end();
});

module.exports = blogsRouter;
