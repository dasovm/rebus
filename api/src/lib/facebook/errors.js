const util = require('util');

function FacebookAuthError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}
util.inherits(FacebookAuthError, Error);


module.exports = {
  FacebookAuthError,
};
