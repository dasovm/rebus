const doRequest = require('./utils');

const fetchPicture = token => doRequest('me/picture', { width: 400, redirect: false }, token)
  .then(({ data }) => data);


module.exports = fetchPicture;
