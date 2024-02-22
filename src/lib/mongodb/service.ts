import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI as string;
  const dbName = process.env.MONGODB_DB_NAME as string;

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    // console.log("Connected to MongoDB");
    db = client.db(dbName);
  }

  return db;
};

export const getDb = () => {
  if (!db) {
    throw new Error("Db not initialized");
  }
  return db;
};
