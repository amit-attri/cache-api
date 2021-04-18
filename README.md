# cache-api
A cache service which enables user to get and set a key with random value. Cache also supports
TTL time of a record. Size of the cache can be configured from environment variables.
This service automatically handles the overflow of cache.

Pre-requisites
1. Node v12.18.3
2. MongoDB v4.4.5

Run:
1. Set the MONGO_CACHE_DB_URL in process.env
2. Set the SERVICE_PORT in process.env (Not mandatory, default is 8000)
3. Set the MAX_CACHE_SIZE in process.env (Not mandatory, default is 5)
4. Set the CACHE_TTL in process.env (Not mandatory, default is 1 (minutes))
5. npm start

Test:
npm run test

Folder Structure
1. src/app : This module is responsible for initialising the service (DB connections, express layer, connecting to port etc)
2. src/route: This module contains all the routes in application. Routes can be separated by entities (for example cache_routes)
3. src/controller: This module contains the handler of each route and presentation layer for client
4. src/service: This module contains all the business logic. This can contain multiple modules based entity type, Each entity has its separate Dao layer.
5. src/exception: This module contains all the handled exception
6. src/utils: This module contains all the utilities like (logger, response handlers etc)

End Points:
1. GET /cache/:key
returns the cached data for a given key If the key is not found in the cache:
■ Create a random string
■ Update the cache with this random string
■ Return the random string
If the key is found in the cache:
■ Get the data for this key
■ Return the data
2. GET /cache
returns all stored keys in the cache
3. PUT /cache/:key
creates/updates the data for a given key
4. DELETE /cache/:key
removes a given key from the cache
5. DELETE /cache
removes all keys from the cache

