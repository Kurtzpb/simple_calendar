module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/simple_calendar',

  TOKEN_SECRET:
    process.env.TOKEN_SECRET ||
    'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',

  LISTEN_PORT: process.env.LISTEN_PORT || 3000
};
