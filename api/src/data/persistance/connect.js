/**
 * Handles connecttion to database.
 * Should throw error if connection unsuccessful.
 */
const mongoose = require('mongoose');

const { MONGO_URL } = process.env;
if (!MONGO_URL) {
  console.error('Environment', process.env);
  throw new Error('Environment variable MONGO_URL not defined');
}

module.exports = () => mongoose.connect(MONGO_URL)
  .then(() => console.info(`Connected to mongo at ${MONGO_URL}`))

  // The caller cant be trusted to wait for the returned promise to resolved or rejected.
  // Will throw error in main scope to kill process.
  .catch(err => setTimeout(() => {
    throw err;
  }), 0);
