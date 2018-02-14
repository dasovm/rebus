const doRequest = require('./utils');

const fetchProfile = token => doRequest('me', { fields: 'id,name,birthday' }, token)
  .then(body => ({
    ...body,
    birthday: new Date(body.birthday),
  }));

// eslint-disable-next-line
// fetchProfile('EAACEdEose0cBAPxdNmKOiPmAZAoZAl38ZAvkqupIFK0mxmEebkqtXeaEYv96sGsiUtn9HdvbKVljZA2M7RwmZCOATQOrcONbJ8YbVnIJOgZBgYswmPTS2PNEjyq7BdNZBqLyllTEp1KEHqRUgnoIMnhIhiUP8vXwWCS99UymlaFNC68kXq8IdgtEitCZCGWTpT8ZD')
//   .then(console.log);

module.exports = fetchProfile;
