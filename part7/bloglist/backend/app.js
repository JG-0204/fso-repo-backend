const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const commentRouter = require('./controllers/comment');
const middleware = require('./utils/middleware');
const { info, error } = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

info(`connecting to ${config.MONGODB_URI}`);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('CONNECTED TO DB.');
  })
  .catch(err => {
    info(`ERROR CONNECTING TO DB`);
    error(err.message);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs/:id/comments', middleware.blogExtractor, commentRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');

  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
