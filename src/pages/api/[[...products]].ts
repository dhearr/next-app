import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, findOneDocument } from "@/lib/mongodb/service";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const db = await connectDatabase();
    const collection = db.collection(
      process.env.MONGODB_COLLECTION_NAME as string
    );

    if (
      req.query.products![1] &&
      /^[0-9a-fA-F]{24}$/.test(req.query.products![1])
    ) {
      const filter = { _id: new ObjectId(req.query.products![1]) };
      const data = await findOneDocument(
        process.env.MONGODB_COLLECTION_NAME as string,
        filter
      );
      res.status(200).json({ status: true, statusCode: 200, data });
    } else if (req.query.products && req.query.products[1]) {
      res
        .status(400)
        .json({ status: false, statusCode: 400, error: "Invalid id format" });
    }

    const data = await collection.find({}).toArray();

    res.status(200).json({ status: true, statusCode: 200, data });
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method not allowed" });
  }
}
