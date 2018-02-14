const Query = require('./schema/types/query/index.graphql');
const Mutation = require('./schema/types/mutation/index.graphql');

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = [
  SchemaDefinition,
  Query,
  Mutation,
];
