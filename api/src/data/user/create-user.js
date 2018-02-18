const { User } = require('./../persistance/schema');
const { generateSecret } = require('./../../auth/authentication');

// todo: validate user object.
// should throw error if invalid
const validateUser = user => null;

/**
 *
 * @param {Object} user - The user to create
 * @param {String} user.facebookId
 * @param {String} user.name
 * @param {String} user.pictureUrl
 * @returns {Promise<User>}
 */
const createUser = user => new Promise((resolve, reject) => {
  try {
    validateUser(user);
  } catch (validationError) {
    reject(validationError);
    return;
  }

  const tokenSecret = generateSecret();

  const userModel = new User({
    ...user,
    tokenSecret,
  });

  userModel.save(saveError => {
    if (saveError) {
      reject(saveError);
      return;
    }
    resolve(userModel);
  });
});


module.exports = createUser;
