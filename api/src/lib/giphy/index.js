const gphApiClient = require('giphy-js-sdk-core');
const Promise = require('promise');

const client = gphApiClient('9X6cjVQ00kOzDF9nxvCh27qNu9azT9vQ');

const requestGif = text => client.search('gifs', { q: text, limit: 1 })
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

// Split text by space
const checkSplit = text => {
  const textArray = [];
  const words = text.split(' ');

  if (words.length > 0) {
    words.forEach(word => {
      textArray.push(word);
    });
  } else {
    textArray.push(text);
  }
  return textArray;
};

// Trim text to remove very short words
const trim = words => {
  const trimmedWords = words;
  for (let i = 0; i < words.length; i += 1) {
    if (words[i].length <= 2) {
      trimmedWords.splice(i, 1);
    }
  }
  return trimmedWords;
};

// Split text by uppercase
const checkCase = text => {
  const textArray = [];
  const words = text.split(/(?=[A-Z])/);

  if (words.length > 0) {
    words.forEach(word => {
      textArray.push(word);
    });
  } else {
    textArray.push(text);
  }
  return textArray;
};

// Analyze the input text
const analyzeInput = text => {
  // Check for spacing
  let words = checkSplit(text);
  if (words.length < 2) {
    // Check for casing
    words = checkCase(text);
  }
  return trim(words);
};

// Build a rebus given an input text
const buildRebus = text => {
  const words = analyzeInput(text);
  const promises = [];

  words.forEach(word => {
    promises.push(requestGif(word).then(gif => {
      return gif;
    }));
  });
  return Promise.all(promises);
};

module.exports = {
  buildRebus,
};
