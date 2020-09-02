import { Query } from 'mongoose';
import { createClient } from 'redis';
import { promisify } from 'util';

// Create redis client.
const client = createClient(process.env.REDIS_URL);

// Promisify client.get function.
client.hget = promisify(client.hget);

// Store a reference to the existing mongoose Query constructor.
const exec = Query.prototype.exec;

Query.prototype.cache = function (options = { time: 60 }) {
  this.useCache = true;
  this.time = options.time;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

  return this;
};

// Overwrite exec function to inject caching logic.
Query.prototype.exec = async function () {
  // Check if values need to be cached.
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }
  /**
   * Create a unique key based on the collection we are operating on,
   * as well as query parameters. Stringify it before using it.
   */
  const key = JSON.stringify({
    ...this.getQuery(),
  });

  // See if we have a value for key in Redis.
  const cacheJSONValue = await client.hget(this.hashKey, key);

  // If we do, parse the JSON redis data, convert to mongoose models and return it.
  if (cacheJSONValue) {
    const cacheValue = JSON.parse(cacheJSONValue);

    console.log(`Response from Redis | hashKey: ${this.hashKey} | key: ${key}`);
    // Turn the record or array of records into mongoose models and return them.
    return Array.isArray(cacheValue)
      ? cacheValue.map(record => new this.model(record))
      : new this.model(cacheValue);
  }

  // Otherwise, issue the query and store the result in Redis.
  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, this.time);

  console.log('Response from MongoDB.');
  return result;
};

export const clearHash = hash => client.del(JSON.stringify(hash));
