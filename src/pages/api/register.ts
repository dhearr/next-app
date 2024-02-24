// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "@/lib/mongodb/service";

// Tipe respons yang diharapkan
type Data = {
  status: boolean;
  message: string;
};

// Handler untuk API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Memeriksa metode permintaan
  if (req.method === "POST") {
    // Jika metode adalah POST, menjalankan registrasi pengguna
    await registerUser(
      // Menggunakan data yang dikirimkan dalam tubuh permintaan
      req.body,
      // Callback yang akan dijalankan setelah pendaftaran selesai
      ({ status, message }: { status: boolean; message: string }) => {
        // Jika pendaftaran berhasil
        if (status) {
          // Memberikan respons dengan status 200 dan pesan berhasil
          res.status(200).json({ status: true, message });
        } else {
          // Jika pendaftaran gagal, memberikan respons dengan status 400 dan pesan kesalahan
          res.status(400).json({ status: false, message });
        }
      }
    );
  } else {
    // Jika metode permintaan bukan POST, memberikan respons dengan status 405 (Method Not Allowed)
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}
