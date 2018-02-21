const doRequest = require('./utils');

const fetchProfile = token => doRequest('me', { fields: 'id,name' }, token);


module.exports = fetchProfile;
