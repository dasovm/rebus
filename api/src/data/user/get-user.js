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


const getUsers = userIds => new Promise((resolve, reject) => {
  User.find({ _id: { $in: userIds } }, (findError, users) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(users);
  });
});

module.exports = {
  getUser,
  getUsers,
  getUserByFacebookId,
};
