import { FilterType } from "@/types/filter.type";
import { MongoClient, Db, ObjectId } from "mongodb";

let client: MongoClient;
let db: Db;

export const connectDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    const dbName = process.env.MONGODB_DB_NAME as string;

    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      // console.log("Connected to MongoDB");
      db = client.db(dbName);
    }

    return db;
  } catch (error) {
    console.error("Error while connecting to database:", error);
    throw error;
  }
};

export const findOneDocument = async (
  collectionName: string,
  filter: FilterType
) => {
  try {
    const db = await connectDatabase();
    const collection = db.collection(collectionName);

    const result = await collection.findOne(filter);

    return result;
  } catch (error) {
    console.error("Error while finding document:", error);
    throw error;
  }
};

// export const getDb = () => {
//   if (!db) {
//     throw new Error("Db not initialized");
//   }
//   return db;
// };
