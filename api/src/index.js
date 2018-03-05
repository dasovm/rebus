const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const { execute, subscribe } = require('graphql');
const cors = require('cors');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const schema = require('./schema');
const { middlewares } = require('./auth/authentication');

const { PORT = 3000, EXTERNAL_PORT = 3000, EXTERNAL_HOST = 'localhost' } = process.env;

const app = express();

require('./data/persistance/connect')();
require('./data/persistance/startup')();

const whitelist = ['*'];
const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use('*', cors(corsOptions));
app.options('*', cors(corsOptions));

const formatAuthErrors = (err, req, res, next) => {
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
  subscriptionsEndpoint: `ws://${EXTERNAL_HOST}:${EXTERNAL_PORT}/subscriptions`,
}));


const ws = createServer(app);
ws.listen(PORT, () => {
  console.log(`Apollo Server is now running on http://${EXTERNAL_HOST}:${EXTERNAL_PORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  const subserver = new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
module.exports = app;
