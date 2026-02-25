const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/attendance',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  DEFAULT_SESSION_MINUTES: Number(process.env.DEFAULT_SESSION_MINUTES || 5)
};
