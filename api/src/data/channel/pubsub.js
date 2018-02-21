const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require('ioredis');

const REDIS_DOMAIN_NAME = 'redis';
const REDIS_PORT_NUMBER = '6379';


const options = {
  host: REDIS_DOMAIN_NAME,
  port: REDIS_PORT_NUMBER,
  retry_strategy: opts =>
    // reconnect after
    Math.max(opts.attempt * 100, 3000),

};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});


const channelTopic = channelId => `channel:${channelId}`;

module.exports = {
  pubsub,
  channelTopic,
};
