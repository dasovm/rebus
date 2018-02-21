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


module.exports = () => [
  Gif,
  Content,
];
