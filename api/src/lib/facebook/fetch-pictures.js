const doRequest = require('./utils');

const fetchPictures = token => Promise.all([
  doRequest('me/picture', { width: 400, redirect: false }, token),
  doRequest('me/picture', { width: 1200, redirect: false }, token),
]).then(([small, large]) => ({
  small: small.data,
  large: large.data,
}));


module.exports = fetchPictures;
