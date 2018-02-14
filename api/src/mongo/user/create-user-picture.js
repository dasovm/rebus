const { UserPicture } = require('./../schema');


// todo: validate picture object.
// should throw error if invalid
const validatePicture = picture => null;

const createUserPicture = (userId, picture) => new Promise((resolve, reject) => {
  try {
    validatePicture(picture);
  } catch (validationError) {
    reject(validationError);
    return;
  }


  const pictureModel = new UserPicture({
    ...picture,
    userId,
  });

  pictureModel.save(saveError => {
    if (saveError) {
      reject(saveError);
      return;
    }
    resolve(pictureModel);
  });
});

const createUserPictures = (userId, pictures) =>
  Promise.all(pictures.map(picture => createUserPicture(userId, picture)));


module.exports = {
  createUserPicture,
  createUserPictures,
};
