module.exports = {
  __resolveType: content => {
    switch (content.type) {
      case 'REBUS':
        return 'Rebus';
      case 'TEXT':
        return 'Text';
      default:
        return null;
    }
  },
};
