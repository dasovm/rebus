const mongoose = require('mongoose');

module.exports = () => {
  const { MONGO_URL } = process.env;
  if (!MONGO_URL) {
    throw new Error('Environment variable MONGO_URL not defined');
  }
  mongoose.connect(MONGO_URL)
    .then(() => console.info(`Connected to mongo at ${MONGO_URL}`))
    .catch(err => setTimeout(() => {
      throw err;
    }), 0);
};
