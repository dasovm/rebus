const Query = require('./schema/types/query/index.graphql');
const Mutation = require('./schema/types/mutation/index.graphql');
const Subscription = require('./schema/types/subscription/index.graphql');

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

module.exports = [
  SchemaDefinition,
  Query,
  Mutation,
  Subscription,
];
