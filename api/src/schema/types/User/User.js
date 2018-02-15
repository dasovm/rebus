const { getUserPictures } = require('./../../../mongo/user');
const { getValuesWrappedInCategory } = require('./../../../mongo/values');

module.exports = {

  pictures: ({ _id }) => getUserPictures(_id)
    .then(pictures => {
      const _pictures = {};
      pictures.forEach(picture => {
        _pictures[picture.type] = picture;
      });
      return _pictures;
    }),
};
