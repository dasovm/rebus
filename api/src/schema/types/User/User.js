const { getUserPictures } = require('./../../../mongo/user');
const { getValuesWrappedInCategory } = require('./../../../mongo/values');

module.exports = {
  values: ({ _id }) => {
    // todo: add i18n support
    const language = 'en';
    return getValuesWrappedInCategory(_id, language);
  },


  pictures: ({ _id }) => getUserPictures(_id)
    .then(pictures => {
      const _pictures = {};
      pictures.forEach(picture => {
        _pictures[picture.type] = picture;
      });
      return _pictures;
    }),
};
