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

const Gif = `
  type Gif {
    url: String!
  }
`;


const Content = `
  interface Content {
    type: String
  }

  type Text implements Content {
    type: String
    text: String!
  }

  type Rebus implements Content {
    type: String
    gifs: [Gif]!
  }
`;

const Message = `
  type Message {
    _id: ID!

    sender: User!

    channel: Channel!

    date: Date!

    content: Content
    
  }
`;

const MessageConnection = `
  type MessageConnection {
    messages: [Message]!
    hasMore: Boolean!
  }
`;

const Channel = `
  type Channel {
    _id: ID!

    name: String!

    members: [User]!

    messages(skip: Int = 0, limit: Int = 20): MessageConnection!
  }
`;

const User = `
  type User {
    _id: ID!

    name: String!

    pictures: UserPictures

    channels: [Channel]!
    
  }
`;

module.exports = () => [
  User,
  UserPictures,
  UserPicture,
  Gif,
  Content,
  Message,
  MessageConnection,
  Channel,
  require('./../Value/ValueCategory.graphql'),
];
