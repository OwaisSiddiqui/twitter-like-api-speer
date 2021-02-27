# twitter-like-api-speer
Twitter -like REST API using Node.js for Speer Technologies assessment

# Structure
The server is hosted on localhost. The database is on a local MongoDB databse instance. The session management uses a local redis database.

# Installation
You need both MongoDB and Redis installed on your computer for the server to work.

You also need a `.env` file with the following values defined:
```
PORT=3000
MONGODB_CONNECTION_STRING=mongodb://localhost:27017
DB=twitter
HOST=localhost
REDIS_PORT=6379
```
You can change them or use the ones above.

```
git clone https://github.com/OwaisSiddiqui/twitter-like-api-speer
cd twitter-like-api-speer
npm i
npm run dev
```

# Testing
To run tests:
```
npm run test
```
