const { log } = require('./helpers');
const redisDB = require('redis');
const redis = redisDB.createClient();

redis.on('connect', () => {
  log('Connection to Redis database successfull..');
});

redis.on('error', (err) => {
  log('Something went wrong ', + err);
});

module.exports = redis;