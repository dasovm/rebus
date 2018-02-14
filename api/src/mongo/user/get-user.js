const { User } = require('./../schema');

const getUser = userId => new Promise((resolve, reject) => {
  User.findOne({ _id: userId }, (findError, user) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(user);
  })
});


module.exports = getUser;
