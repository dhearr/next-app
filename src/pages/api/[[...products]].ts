import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, findOneDocument } from "@/lib/mongodb/service";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Memeriksa jika metode permintaan adalah GET
  if (req.method == "GET") {
    try {
      // Menghubungkan ke database MongoDB
      const db = await connectDatabase();
      // Mendapatkan koleksi produk dari database
      const collection = db.collection(
        process.env.MONGODB_COLLECTION_PRODUCTS as string
      );

      // Memeriksa jika ada parameter products di query dan validasi format id
      if (
        req.query.products &&
        req.query.products[1] &&
        /^[0-9a-fA-F]{24}$/.test(req.query.products[1])
      ) {
        // Jika format id valid, mencari produk berdasarkan id
        const filter = { _id: new ObjectId(req.query.products[1]) };
        const data = await findOneDocument(
          process.env.MONGODB_COLLECTION_PRODUCTS as string,
          filter
        );
        // Memberikan respons dengan data produk yang ditemukan
        res.status(200).json({ status: true, statusCode: 200, data });
      } else if (req.query.products && req.query.products[1]) {
        // Jika format id tidak valid, memberikan respons dengan status 400 dan pesan kesalahan
        res
          .status(400)
          .json({ status: false, statusCode: 400, error: "Invalid id format" });
      }

      // Jika tidak ada parameter products di query, mendapatkan semua produk dari koleksi
      const data = await collection.find({}).toArray();
      // Memberikan respons dengan semua data produk
      res.status(200).json({ status: true, statusCode: 200, data });
    } catch (error) {
      // Menangkap dan menampilkan kesalahan jika terjadi kesalahan saat mengakses database
      console.error("Error while fetching products:", error);
      res
        .status(500)
        .json({
          status: false,
          statusCode: 500,
          message: "Internal Server Error",
        });
    }
  } else {
    // Jika metode permintaan bukan GET, memberikan respons dengan status 405 (Method Not Allowed)
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method not allowed" });
  }
}
