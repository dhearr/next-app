import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export const connectDatabase = async () => {
  const uri = "mongodb://127.0.0.1:27017";
  const dbName = "next-app";

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
