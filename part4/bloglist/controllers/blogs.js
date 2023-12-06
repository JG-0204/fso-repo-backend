const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(body.user);

  if (!body.title || !body.url) return response.status(400).end();

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);

  // if (!body.likes) {
  //   blog = new Blog({ ...body, likes: 0 });
  //   return response.status(201).json(await blog.save());
  // }

  // blog = new Blog(body);
  // response.status(201).json(await blog.save());
});

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
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
