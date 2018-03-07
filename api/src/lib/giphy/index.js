const gphApiClient = require('giphy-js-sdk-core');
const Promise = require('promise');

const client = gphApiClient('9X6cjVQ00kOzDF9nxvCh27qNu9azT9vQ');

// Search for a gif given an input
const requestGif = (text, preferredFormat) => client.search('gifs', { q: text, limit: 1 })
  .then(response => {
    const gifArray = [];
    response.data.forEach(gifObject => {
      let url;
      if (preferredFormat === 'original') {
        url = gifObject.images.original.gif_url;
      } else if (preferredFormat === 'webp') {
        if (gifObject.images.original.webp_url != null) {
          url = gifObject.images.original.webp_url;
        } else {
          url = gifObject.images.original.gif_url;
        }
      } else if (preferredFormat === 'mp4') {
        if (gifObject.images.original.mp4_url != null) {
          url = gifObject.images.original.mp4_url;
        } else {
          url = gifObject.images.original.gif_url;
        }
      } else {
        url = gifObject.images.original.gif_url;
      }
      gifArray.push(url);
    });
    return gifArray;
  })
  .catch(err => {
    console.log(err.message);
  });

// Translate input to find matching gif
const translateTextToGif = (text, preferredFormat) => client.translate('gifs', { s: text })
  .then(response => {
    if (preferredFormat === 'webp') {
      if (response.data.images.original.webp_url != null) {
        return response.data.images.original.webp_url;
      } else {
        return response.data.images.original.gif_url;
      }
    } else if (preferredFormat === 'mp4') {
      if (response.data.images.original.mp4_url != null) {
        return response.data.images.original.mp4_url;
      } else {
        return response.data.images.original.gif_url;
      }
    }
    // No special format requested
    return response.data.images.original.gif_url;
  })
  .catch(err => {
    console.log(err.message);
  });

// Request a random gif
const requestRandomGif = preferredFormat => client.random('gifs', {})
  .then(response => {
    if (preferredFormat === 'webp') {
      if (response.data.images.original.webp_url != null) {
        return response.data.images.original.webp_url;
      } else {
        return response.data.images.original.gif_url;
      }
    } else if (preferredFormat === 'mp4') {
      if (response.data.images.original.mp4_url != null) {
        return response.data.images.original.mp4_url;
      } else {
        return response.data.images.original.gif_url;
      }
    }
    // No special format requested
    return response.data.images.original.gif_url;
  })
  .catch(err => {
    console.log(err.message);
  });

// Request trending gifs
const requestTrendingGifs = (text, preferredFormat, limit) => client.trending('gifs', { limit })
  .then(response => {
    const gifArray = [];
    response.data.forEach(gifObject => {
      let url;
      if (preferredFormat === 'original') {
        url = gifObject.images.original.gif_url;
      } else if (preferredFormat === 'webp') {
        if (gifObject.images.original.webp_url != null) {
          url = gifObject.images.original.webp_url;
        } else {
          url = gifObject.images.original.gif_url;
        }
      } else if (preferredFormat === 'mp4') {
        if (gifObject.images.original.mp4_url != null) {
          url = gifObject.images.original.mp4_url;
        } else {
          url = gifObject.images.original.gif_url;
        }
      } else {
        url = gifObject.images.original.gif_url;
      }
      // Add gif url to array
      gifArray.push(url);
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
const buildRebus = (text, preferredFormat) => {
  const words = analyzeInput(text);
  const promises = [];

  words.forEach(word => {
    promises.push(requestGif(word, preferredFormat.toLowerCase()).then(gif => gif));
  });
  return Promise.all(promises);
};

module.exports = {
  buildRebus,
};
