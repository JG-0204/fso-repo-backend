require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_KEY = process.env.JWT_KEY;

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_KEY,
};
