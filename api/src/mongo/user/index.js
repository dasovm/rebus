module.exports = {
  createUser: require('./create-user'),
  ...require('./create-user-picture'),
  getUser: require('./get-user'),
  ...require('./get-user-picture'),
};
