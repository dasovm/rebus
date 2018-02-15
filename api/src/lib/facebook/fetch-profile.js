const doRequest = require('./utils');

const fetchProfile = token => doRequest('me', { fields: 'id,name,birthday' }, token)
  .then(body => ({
    ...body,
    birthday: new Date(body.birthday),
  }));


module.exports = fetchProfile;
