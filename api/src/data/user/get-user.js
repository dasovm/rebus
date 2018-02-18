const { User } = require('./../persistance/schema');

const getUser = userId => new Promise((resolve, reject) => {
  User.findOne({ _id: userId }, (findError, user) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(user);
  });
});


const getUserByFacebookId = facebookId => new Promise((resolve, reject) => {
  User.findOne({ facebookId }, (findError, user) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(user);
  });
});

module.exports = {
  getUser,
  getUserByFacebookId,
};
