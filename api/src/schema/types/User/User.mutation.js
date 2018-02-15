const { createUser, createUserPictures, getUser } = require('./../../../mongo/user');
const { setValuesFromSlugs, setValueFormData } = require('./../../../mongo/values');
const { fetchProfile, fetchPictures, errors: { FacebookAuthError } } = require('./../../../lib/facebook');
const { generateUserToken } = require('./../../../auth/authentication');
const { extractUserIdFromContext } = require('./../../../auth/authorization');

const _fetchProfile = ({ fbToken, ...rest }) => fetchProfile(fbToken)
  .then(profile => ({ fbToken, profile, ...rest }));

const _fetchPictures = ({ fbToken, ...rest }) => fetchPictures(fbToken)
  .then(images => ({ fbToken, images, ...rest }));

const _createUser = ({ fbToken, profile, ...rest }) => createUser({
  facebookToken: fbToken,
  ...profile,
}).then(user => ({ user, fbToken, ...rest }));


const _createPictures = ({ user, images, ...rest }) => {
  const pictures = [];

  if (images.small) {
    pictures.push({
      ...images.small,
      type: 'small',
    });
  }

  if (images.large) {
    pictures.push({
      ...images.large,
      type: 'large',
    });
  }

  return createUserPictures(user._id, pictures)
    .then(() => ({ user, ...rest }));
};


const _generateToken = ({ user, ...rest }) => ({ user, ...rest, jwtToken: generateUserToken(user) });

// Input to #setValues will contain all relevant information for the singup phase.
// This needs to parsed into the actual value slugs that are later used for matching.
const parseValueSlugs = valueCategories => {
  // Remove categories since the only thing needed for value connections are
  // value slugs.
  const onlyValues = [];
  valueCategories.forEach(category => {
    onlyValues.push(...category.values);
  });

  return onlyValues
    .filter(({ prioritized }) => prioritized && prioritized.active === true)
    .map(({ _id }) => _id);
};

module.exports = {
  // todo: This should also log the user in and connect
  // to correct user if the user has already registered (on this endpoint)

  login: (_, { token }, ctx) =>
    Promise.resolve({ fbToken: token })
      .then(_fetchProfile)
      .then(_fetchPictures)
      .then(_createUser)
      .then(_createPictures)
      .then(_generateToken)
      .then(({ user, jwtToken }) => ({ user, token: jwtToken }))
      .catch(err => {
        if (err instanceof FacebookAuthError) {
          throw err;
        } else {
          console.error(err);
          throw new Error('Unknown error.');
        }
      }),

};
