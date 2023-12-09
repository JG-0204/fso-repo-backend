const logger = require('./logger');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('METHOD:', request.method);
  logger.info('PATH:', request.path);
  logger.info('BODY:', request.body);
  logger.info('end of logger---------');
  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' });

  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization');
  let token;
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.replace('Bearer ', '');
  } else {
    token = null;
  }

  request.token = token;
  next();
};

const userExtractor = async (request, response, next) => {
  const token = jwt.verify(request.token, process.env.SECRET);

  if (!token.id) {
    return response.status(401).json({
      error: 'token invalid',
    });
  }

  const user = await User.findById(token.id);

  request.user = user;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
