const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const schema = require('./schema');
const { middlewares } = require('./auth/authentication');

const { PORT } = process.env;

const app = express();

require('./mongo/connect')();
require('./mongo/startup')();

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

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.listen(PORT || 3000, () => {
  console.log(`Listening on port ${PORT || 3000}`);
});

module.exports = app;
