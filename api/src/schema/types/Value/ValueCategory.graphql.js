const ValueCategoryEnum = `
  enum ValueCategoryEnum {
    foundation
    self_fulfillment
    greater_good
  }
`;

const ValueCategory = `
  type ValueCategory {
    name: ValueCategoryEnum!
    values: [Value!]!
  }
`;

module.exports = () => [
  ValueCategory,
  ValueCategoryEnum,
  require('./Value.graphql'),
];
