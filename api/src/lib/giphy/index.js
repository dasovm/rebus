const gphApiClient = require('giphy-js-sdk-core');
const wordnet = require('wordnet');
const Promise = require('promise');

const client = gphApiClient('9X6cjVQ00kOzDF9nxvCh27qNu9azT9vQ');

// Search for a gif given an input
const requestGif = (text, preferredFormat) => client.search('gifs', { q: text, limit: 20 })
  .then(response => {
    const gifArray = [];
    // Choose a random gif to prevent same gifs for specific input
    const nbrOfGifs = response.data.length;

    if (nbrOfGifs === 0) {
      return null;
    }

    console.log('found', nbrOfGifs);
    const randomGifIndex = Math.floor(Math.random() * nbrOfGifs);
    const gifObject = response.data[randomGifIndex];
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
      }
      return response.data.images.original.gif_url;
    } else if (preferredFormat === 'mp4') {
      if (response.data.images.original.mp4_url != null) {
        return response.data.images.original.mp4_url;
      }
      return response.data.images.original.gif_url;
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
      }
      return response.data.images.original.gif_url;
    } else if (preferredFormat === 'mp4') {
      if (response.data.images.original.mp4_url != null) {
        return response.data.images.original.mp4_url;
      }
      return response.data.images.original.gif_url;
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

const getDictionary = new Promise((resolve, reject) => {
  wordnet.list((err, list) => {
    if (err) {
      reject(err);
    } else {
      resolve(trim(list));
    }
  });
}).then(dictionary => dictionary).catch(err => {
  console.log('An error occurred: %s', err);
});

const getWords = (input, list) => {
  let matches = [];
  let result = [];
  let regex;
  const indexes = [];
  const orderedMatches = [];

  list.forEach(word => {
    regex = new RegExp(`${word}`, 'i');
    result = input.match(regex);
    if (result != null) {
      // Only save word
      matches.push(result[0].toLowerCase());
    }
  });

  // Restore order of found words with respect to input
  matches.forEach(word => {
    indexes.push(input.indexOf(word));
  });

  let minIndex = 0;
  for (let i = 0; i < matches.length; i++) {
    const min = Math.min.apply(0, indexes);
    minIndex = indexes.indexOf(min);
    indexes[minIndex] = Number.POSITIVE_INFINITY;
    orderedMatches.push(matches[minIndex]);
  }
  matches = orderedMatches;
  return matches;
};

const interpretWord = text => {
  wordnet.lookup(text, (err, definitions) => {
    if (definitions != null) {
      definitions.forEach(definition => {
        const words = [];
        definition.meta.words.forEach(word => {
          words.push(word.word);
        });
        console.log(`${definition.glossary} ${words}`);
      });
    }
  });
};

// Build a rebus given an input text
const buildRebus = (text, preferredFormat) => {
  const promises = [];
  let parsedWords = [];
  let words = [];

  // Perform simple checks
  if (text.length < 4) {
    console.info('Simple check');
    // Input too small, fetch gif by clear input
    promises.push(requestGif(text, preferredFormat.toLowerCase()).then(gif => gif));
    return Promise.all(promises);
  }

  // Input sufficiently large
  // Try split by space and case
  parsedWords = analyzeInput(text);
  if (parsedWords.length > 1) {
    console.info('Split by space and case');
    return Promise
      .all(parsedWords.map(word => requestGif(word, preferredFormat.toLowerCase)))
      .then(gifs => gifs.filter(gif => gif !== undefined && gif !== null));
  }

  // We don't need super detailed analysis
  const maxWords = Math.floor(text.length / 3);

  // We did not found any words by simple checks
  // Perform text analysis
  console.info('dictionary check');
  return getDictionary.then(dictionary => {
    parsedWords.forEach(word => {
      const readWords = getWords(word, dictionary);
      words = words.concat(readWords);
    });
    // Remove words if necessary
    if (words.length > maxWords) {
      // Trim away shortest words
      const wordsToRemove = words.length - maxWords;
      for (let i = 0; i < wordsToRemove; i++) {
        const w = words.slice().sort((a, b) => b.length - a.length).pop();
        words.splice(words.indexOf(w), 1);
      }
    }
    words.forEach(word => {
      promises.push(requestGif(word, preferredFormat.toLowerCase()).then(gif => gif));
    });
    return Promise.all(promises);
  });
};

module.exports = {
  buildRebus,
};
