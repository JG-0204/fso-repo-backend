const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

usersRouter.get('/:id', async (request, response, next) => {
  const user = await User.findById(request.params.id).populate('blogs', {
    title: 1,
  });
  return response.status(201).json(user);
});

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  if (password.length < 3)
    return response.status(400).json({
      error: 'password length is less than 3',
    });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
