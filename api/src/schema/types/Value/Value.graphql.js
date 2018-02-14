const Value = `
  type Value {
    _id: ID!
    category: ValueCategoryEnum!
    name: String!
    description: String
  }
`;

module.exports = () => [
  Value,
];
