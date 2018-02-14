const typeDef = `

  root Schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    viewer: Viewer
  }

  type Viewer {
    user: User!
    token: String!
  }

  type User {
    _id: ID!

    name: String!

    # Url to a picture.
    picture: String!

    # null if user not created.
    values: [ValueCategory]
  }

  type ValueCategory {
    type: ValueCategoryEnum!
    values: [Value!]!
  }

  type Value {
    _id: ID!
    category: ValueCategoryEnum!
    name: String
  }

  type Mutation {
    # Login with your facebook token.
    login(
      token: String!
    ): Viewer

    # Register your selected values.
    register(
      values: [InputValueCategory!]!
    ): User
  }

  enum ValueCategoryEnum {
    foundation
    self_fulfillment
    greater_good
  }

  input InputValueCategory {
    type: ValueCategoryEnum!

    # At least 9 values, at least 6 primary values.
    values: [InputValue!]!
  }

  input InputValue {
    _id: ID!
    primary: Boolean!
  }
`;

export default typeDef;
