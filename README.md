# user-api
User REST API using Node.js

# Structure
The server is hosted on localhost. The database is on a local MongoDB databse instance. The session management uses a local redis database.

# Installation
You need both MongoDB and Redis local servers installed and have Redis server (e.g. using `redis-server` in the terminal) running on your computer before starting the app for it to work.

You also need a `.env` file with the following values defined:
```
PORT=3000
MONGODB_CONNECTION_STRING=mongodb://localhost:27017
DB=UsersAPI
HOST=localhost
REDIS_PORT=6379
```
You can change them or use the ones above.

```
git clone https://github.com/OwaisSiddiqui/user-api
cd user-api
npm i
npm run build
npm run start
```

# Testing
To run tests:
```
npm run test
```
