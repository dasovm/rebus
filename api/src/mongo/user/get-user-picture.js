const { UserPicture } = require('./../schema');

const getUserPictures = userId => new Promise((resolve, reject) => {
  UserPicture.find({ userId }, (findError, pictures) => {
    if (findError) {
      reject(findError);
      return;
    }
    resolve(pictures);
  });
});


const getUserPicture = (userId, type) => new Promise((resolve, reject) => {
  UserPicture.findOne({ userId, type }, (findError, picture) => {
    if (findError) {
      reject(findError);
      return;
    }
    resolve(picture);
  });
});

module.exports = {
  getUserPictures,
  getUserPicture
};
