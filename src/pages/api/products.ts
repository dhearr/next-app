import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, getDb } from "@/lib/mongodb/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const db = await connectDatabase();
    const collection = db.collection("my-next-app");

    const data = await collection.find({}).toArray();

    res.status(200).json(data);
    // console.log(data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
