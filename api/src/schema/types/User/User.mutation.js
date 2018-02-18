const UserData = require('./../../../data/user');
const Facebook = require('./../../../lib/facebook');
const { generateUserToken } = require('./../../../auth/authentication');

// Fetches profile (FacebookId, name) from Facebook API,
const fetchFacebookProfile = ({ fbToken, ...rest }) => Facebook.fetchProfile(fbToken)
  .then(profile => ({ fbToken, profile, ...rest }));

// Fetches a medium sized user image from Facebook API.
const fetchFacebookPicture = ({ fbToken, ...rest }) => Facebook.fetchPicture(fbToken)
  .then(({ url }) => ({ fbToken, picture: url, ...rest }));

// Stores user object.
const createUser = ({
  fbToken, profile: { id, ...profileRest }, picture, ...rest
}) => UserData.createUser({
  facebookToken: fbToken,
  picture,
  facebookId: id,
  ...profileRest,
}).then(user => ({ ...rest, user, fbToken }));


// Generates JWT token for user.
const generateToken = ({ user, ...rest }) => ({ user, ...rest, jwtToken: generateUserToken(user) });


const getExistingUser = ({ profile, ...rest }) => {
  const { id } = profile;
  return UserData.getUserByFacebookId(id)
    .then(user => ({ user, profile, ...rest }));
};

const skipIfExistingUser = method => ({ user, ...rest }) => {
  if (!user) {
    return method({ user, ...rest });
  }
  return { user, ...rest };
};

module.exports = {
  login: (_, { token }) =>
    Promise.resolve({ fbToken: token })
      .then(fetchFacebookProfile)
      .then(getExistingUser)
      .then(skipIfExistingUser(fetchFacebookPicture))
      .then(skipIfExistingUser(createUser))
      .then(generateToken)
      .then(({ user, jwtToken }) => ({ user, token: jwtToken }))
      .catch(err => {
        if (err instanceof Facebook.errors.FacebookAuthError) {
          throw err;
        } else {
          console.error(err);
          throw new Error('Unknown error.');
        }
      }),

};
