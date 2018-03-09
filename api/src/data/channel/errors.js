const util = require('util');

function ChannelNameError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}
util.inherits(ChannelNameError, Error);


function ChannelColorError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}
util.inherits(ChannelColorError, Error);


module.exports = {
  ChannelNameError,
  ChannelColorError,
};
