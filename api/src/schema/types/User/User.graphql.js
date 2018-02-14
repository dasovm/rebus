const UserPicture = `
  type UserPicture {
    # Url to a picture.
    width: Int!
    height: Int!
    url: String!
  }
`;


const UserPictures = `
  type UserPictures {
    # Url to a picture.
    small: UserPicture!
    large: UserPicture!
  }
`;

const User = `
  type User {
    _id: ID!

    name: String!

    pictures: UserPictures

    values: [ValueCategory]

    # Sorted on best match (more values is better).
    matches: [User]
  }
`;

module.exports = () => [
  User,
  UserPictures,
  UserPicture,
  require('./../Value/ValueCategory.graphql'),
];
