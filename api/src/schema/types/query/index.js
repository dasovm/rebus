const Query = require('./Query');
const Viewer = require('./../Viewer/Viewer.query');
const Channel = require('./../Channel/Channel.query');

module.exports = {
  ...Query,
  ...Viewer,
  ...Channel,
};
