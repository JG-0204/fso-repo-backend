const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const { requestLogger } = require('./utils/middleware');
const { info, error } = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

info(`connecting to ${config.MONGODB_URI}`);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('CONNECTED TO DB.');
  })
  .catch((err) => {
    info(`ERROR CONNECTING TO DB`);
    error(err.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/blogs', blogsRouter);

module.exports = app;
