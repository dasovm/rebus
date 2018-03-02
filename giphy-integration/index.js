const gphApiClient = require('giphy-js-sdk-core');

const client = gphApiClient('9X6cjVQ00kOzDF9nxvCh27qNu9azT9vQ');

// Gif fetch by input text
const requestGifs = (text, limit) => client.search('gifs', { q: text, limit })
  .then(response => {
    const gifArray = [];
    response.data.forEach(gifObject => {
      gifArray.push(gifObject.images.original.gif_url);
    });
    return gifArray;
  })
  .catch(err => {
    console.log(err.message);
  });
