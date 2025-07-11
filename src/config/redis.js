const redis = require('redis');
const logger = require('../utils/logger');

let client;

async function connectRedis() {
  client = redis.createClient({
    url: process.env.REDIS_URL
  });

  client.on('error', (err) => {
    logger.error('Redis error:', err);
  });

  await client.connect();
  logger.info('Redis connected successfully');
}

module.exports = { client, connectRedis };