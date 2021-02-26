import mongodb, { MongoClient } from "mongodb";

let connectionString: undefined | string = process.env.MONGODB_CONNECTION_STRING;
let dbName: undefined | string = process.env.DB;

let cachedClient: null | mongodb.MongoClient = null;
let cachedDb: null | mongodb.Db = null;

export default async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!connectionString) {
    throw new Error(
      "Please define the MONGODB_CONNECTION_STRING environment variable inside .env"
    );
  }

  if (!dbName) {
    throw new Error(
      "Please define the DB environment variable inside .env"
    );
  }

  const client = await MongoClient.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  console.log("Connected to database.")
  return { client, db };
}