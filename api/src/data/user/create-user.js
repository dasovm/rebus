const { User } = require('./../persistance/schema');
const { generateSecret } = require('./../../auth/authentication');

const validateUser = ({ facebookId, name, picture }) => {
  if (!facebookId) {
    throw new Error('Facebook ID not provided.');
  }

  if (!name) {
    throw new Error('Name not provided');
  }

  if (!picture) {
    throw new Error('Picture not provided');
  }
};

/**
 *
 * @param {Object} user - The user to create
 * @param {String} user.facebookId
 * @param {String} user.name
 * @param {String} user.picture
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
    createdAt: new Date(),
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
