const mongoose = require('mongoose');

const { Schema } = mongoose;


const usersSchema = new Schema({
  name: String,
  facebookId: String,
  createdAt: Date,
  tokenSecret: String,
  picture: String,
});


const channelSchema = new Schema({
  name: String,
  color: String,
  createdAt: Date,
});


const userChannelConnection = new Schema({
  userId: Schema.Types.ObjectId,
  channelId: Schema.Types.ObjectId,
});


const messageSchema = new Schema({
  userId: Schema.Types.ObjectId,
  channelId: Schema.Types.ObjectId,
  text: String,
  gifs: [String],
  sentAt: Date,
});


// eslint-disable-next-line new-cap
const toObjectId = id => mongoose.Types.ObjectId(id);
const createObjectId = () => new mongoose.Types.ObjectId();
const toPOJO = doc => doc.toObject();

module.exports = {
  User: mongoose.model('Users', usersSchema),
  Channel: mongoose.model('Channels', channelSchema),
  UserChannelConnection: mongoose.model('UserChannelConnections', userChannelConnection),
  Message: mongoose.model('Message', messageSchema),
  toObjectId,
  createObjectId,
  toPOJO,
};
