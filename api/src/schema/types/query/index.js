const Query = require('./Query');
const User = require('./../User/User.query');
const Viewer = require('./../Viewer/Viewer.query');

module.exports = {
  ...Query,
  ...User,
  ...Viewer,
};
