/* eslint-disable no-console */
const gphApiClient = require('giphy-js-sdk-core');

const client = gphApiClient('9X6cjVQ00kOzDF9nxvCh27qNu9azT9vQ');

// Gif search by text
const requestGifs = (text, limit) => {
  const gifArray = [];
  client.search('gifs', { q: text, limit })
    .then(response => {
      response.data.forEach(gifObject => {
        console.log(gifObject);
        gifArray.push(gifObject);
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  return gifArray;
};