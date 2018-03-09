const { ChannelNameError, ChannelColorError } = require('./errors');

const validateChannelName = name => {
  if (name.length < 2) {
    throw new ChannelNameError(`Channel name too short. Must be longer than two characters, was ${name.length}.`);
  }

  if (name.length > 63) {
    throw new ChannelNameError(`Channel name too long. Must not be longer than 63 characters, was ${name.length}`);
  }
};

const validateChannelColor = color => {
  if (!color) return;
  if (color.length !== 7 || color[0] !== '#') {
    throw new ChannelColorError(`Channel color must be a valid 6-digit hex color, was ${color}`);
  }
};


module.exports = {
  validateChannelColor,
  validateChannelName,
};
