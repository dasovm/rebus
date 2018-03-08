const isProduction = (window && window.location && window.location.hostname) === 'rebus.vaquita.se';

export const graphQLEndpoint = isProduction ? 'http://api.rebus.vaquita.se/graphql' : 'http://localhost:3000/graphql';
export const wsEndpoint = isProduction ? 'ws://api.rebus.vaquita.se/subscriptions' : 'ws://localhost:3000/subscriptions';