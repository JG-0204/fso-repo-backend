const { info, error } = require('./logger');

const requestLogger = (request, response, next) => {
  info('METHOD:', request.method);
  info('PATH:', request.path);
  info('BODY:', request.body);
  info('end of logger---------');
  next();
};

module.exports = { requestLogger };
