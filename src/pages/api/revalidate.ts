import type { NextApiRequest, NextApiResponse } from "next";

// Tipe respons yang diharapkan
type Data = {
  revalidated: boolean;
  message?: string;
};

// Handler untuk API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Memeriksa apakah token yang diberikan sesuai dengan token yang diharapkan
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    // Jika tidak, memberikan respons dengan status 401 (Unauthorized)
    // dan memberikan pesan untuk memasukkan token yang benar
    return res
      .status(401)
      .json({ revalidated: false, message: "Insert current token" });
  }

  // Memeriksa jenis data yang diminta untuk direvalidasi
  if (req.query.data === "product") {
    try {
      // Jika data adalah "product", maka melakukan revalidasi data produk
      await res.revalidate("/product/static");
      // Memberikan respons dengan status 200 (OK) dan menandakan bahwa data telah direvalidasi
      return res.json({ revalidated: true });
    } catch (error) {
      // Jika terjadi kesalahan dalam proses revalidasi, memberikan respons dengan status 500 (Internal Server Error)
      return res.status(500).send({ revalidated: false });
    }
  }

  // Jika tidak ada jenis data yang diminta, memberikan respons dengan status 200 (OK)
  // dan memberikan pesan untuk memilih data yang akan direvalidasi
  return res.json({
    revalidated: false,
    message: "Select your data revalidated",
  });
}
