const InputValueCategory = `
  input InputValueCategory {
    name: ValueCategoryEnum!

    # At least 9 values, at least 6 primary values.
    values: [InputValue!]!
  }
`;

const InputSelection = `
  input InputSelection {
    active: Boolean!
    changed: Date!
    added: Date!
  }
`;

const InputValue = `
  input InputValue {
    _id: ID!
    selected: InputSelection!
    prioritized: InputSelection
  }
`;

module.exports = () => [
  InputValueCategory,
  InputSelection,
  InputValue,
  require('../scalars/Date.graphql'),
];
