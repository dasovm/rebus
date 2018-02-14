const doRequest = require('./utils');

const fetchPictures = token => Promise.all([
  doRequest('me/picture', { width: 400, redirect: false }, token),
  doRequest('me/picture', { width: 1200, redirect: false }, token),
]).then(([small, large]) => ({
  small: small.data,
  large: large.data,
}));


// eslint-disable-next-line
// fetchPictures('EAACEdEose0cBAPxdNmKOiPmAZAoZAl38ZAvkqupIFK0mxmEebkqtXeaEYv96sGsiUtn9HdvbKVljZA2M7RwmZCOATQOrcONbJ8YbVnIJOgZBgYswmPTS2PNEjyq7BdNZBqLyllTEp1KEHqRUgnoIMnhIhiUP8vXwWCS99UymlaFNC68kXq8IdgtEitCZCGWTpT8ZD')
//   .then(console.log)
//   .catch(console.error);

module.exports = fetchPictures;
