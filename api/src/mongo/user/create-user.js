const { User } = require('./../schema');
const { generateSecret } = require('./../../auth/authentication');

// todo: validate user object.
// should throw error if invalid
const validateUser = user => null;

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
    tokenSecret
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
