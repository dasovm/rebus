const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const schema = require('./schema');
const { middlewares } = require('./auth/authentication');

const { PORT } = process.env;

const app = express();

require('./data/persistance/connect')();
require('./data/persistance/startup')();

const formatAuthErrors = (err, req, res, next) => {
  console.log('formatAuth', err);
  if (err) {
    return res.send({ data: null, errors: [{ message: err }] });
  }
  return next();
};

app.use(
  '/graphql',
  middlewares.verifyToken,
  formatAuthErrors,
  middlewares.populateRequest,
  bodyParser.json(),
  graphqlExpress(request => ({
    schema,
    context: request.context,
  })),
);

app.get('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT || 3000}/subscriptions`,
}));


const ws = createServer(app);
ws.listen(PORT || 3000, () => {
  console.log(`Apollo Server is now running on http://localhost:${PORT || 3000}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
module.exports = app;
