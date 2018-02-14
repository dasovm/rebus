const request = require('request');
const { FacebookAuthError } = require('./errors');

const apiRoot = 'https://graph.facebook.com';
const apiVersion = 'v2.12';

const buildQueryParams = (access_token, data) => {
  const params = {
    ...data,
    access_token,
  };
  const fields = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

  if (fields.length > 0) {
    return `?${fields}`;
  }
  return '';
};

const doRequest = (endpoint, data, access_token) => new Promise((resolve, reject) => {
  request(`${apiRoot}/${apiVersion}/${endpoint}${buildQueryParams(access_token, data)}`, (error, response, body) => {
    if (error) {
      reject(error);
      return;
    }

    if (response.statusCode >= 400 && response.statusCode <= 499) {
      reject(new FacebookAuthError('Invalid token.'));
      return;
    }

    if (response.statusCode !== 200) {
      reject(new Error(`Unknown error. Status code: ${response.statusCode}`));
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch (err) {
      reject(err);
      return;
    }

    resolve(parsedBody);
  });
});


module.exports = doRequest;
