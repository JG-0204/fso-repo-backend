const commentRouter = require('express').Router();
const Comment = require('../models/comment');

commentRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const blog = request.blog;

  const comment = new Comment({
    content: body.comment,
    blog: blog._id,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = commentRouter;
