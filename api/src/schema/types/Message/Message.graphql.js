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


module.exports = () => [
  Gif,
  Content,
  Message,
  require('./../Channel/Channel.graphql'),
  require('./../scalars/Date.graphql'),
];
