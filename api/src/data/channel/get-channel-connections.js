const { UserChannelConnection } = require('./../persistance/schema');


const getChannelConnections = query => new Promise((resolve, reject) => {
  UserChannelConnection.find(query, (findError, connections) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(connections);
  });
});


module.exports = getChannelConnections;
