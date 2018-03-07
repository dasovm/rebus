const { Message } = require('./../persistance/schema');

const getMessages = (channelId, skip, limit) => new Promise((resolve, reject) => {
  Message.find({ channelId }, null, { skip, limit, sort: { sentAt: 1 } }, (findError, messages) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(messages);
  });
});


module.exports = {
  getMessages,
};
