import { Query } from 'mongoose';
import { createClient } from 'redis';
import { promisify } from 'util';

// Create redis client.
const client = createClient(process.env.REDIS_URL);

// Promisify client.get function (to use async/await syntax instead of callbacks)
client.hget = promisify(client.hget);

// Store a reference to the original mongoose exec function.
const exec = Query.prototype.exec;

/**
 * Function that if used, sets the useCache property to true, therefore
 * enables custom exec function to perform Redis caching.
 * @param {Object} options
 */
Query.prototype.cache = function (
  { time, key } = { time: 60, key: this.mongooseCollection.name }
) {
  this.useCache = true;
  this.time = time;
  this.hashKey = JSON.stringify(key);

  return this;
};

/**
 * Overwrite exec function in order to inject caching logic.
 * */
Query.prototype.exec = async function () {
  // Check if the Query.prototype.cache was called and the values need to be cached.
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

  // See if there is a value for the key in Redis.
  const cacheJSONValue = await client.hget(this.hashKey, key);

  // If there is, parse the JSON redis data, convert to mongoose models and return it.
  if (cacheJSONValue) {
    const cacheValue = JSON.parse(cacheJSONValue);

    // Log stating the response is from Redis cache.
    console.log(
      `(Caching middleware) Response from Redis | hashKey: ${this.hashKey} | key: ${key}`
    );
    // Turn the record or array of records into mongoose models and return them.
    return Array.isArray(cacheValue)
      ? cacheValue.map(record => new this.model(record))
      : new this.model(cacheValue);
  }

  // Otherwise, issue the query and store the result in Redis.
  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, this.time);

  // Log stating the response is from MongoDB
  console.log('(Caching middleware) Response from MongoDB.');

  // Return MongoDB result.
  return result;
};

// Export cache clearing function.
export const clearHash = hash => client.del(JSON.stringify(hash));
