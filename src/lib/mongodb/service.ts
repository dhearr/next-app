import { FilterType } from "@/types/filter.type";
import { MongoClient, Db } from "mongodb";
import bcrypt from "bcrypt";

// Mendefinisikan variabel klien MongoDB
let client: MongoClient;
// Mendefinisikan variabel database MongoDB
let db: Db;

// Fungsi untuk menghubungkan ke database MongoDB
export const connectDatabase = async () => {
  try {
    // Mendapatkan URI koneksi MongoDB dari variabel lingkungan
    const uri = process.env.MONGODB_URI as string;
    // Mendapatkan nama database MongoDB dari variabel lingkungan
    const dbName = process.env.MONGODB_DB_NAME as string;

    // Membuat koneksi ke MongoDB jika klien belum ada
    if (!client) {
      // Membuat instance klien MongoClient dengan URI koneksi
      client = new MongoClient(uri);
      // Menunggu koneksi ke server MongoDB
      await client.connect();
      // Jika koneksi berhasil, mengambil instance database dari klien
      db = client.db(dbName);
    }

    // Mengembalikan instance database MongoDB
    return db;
  } catch (error) {
    // Menangkap dan menampilkan kesalahan jika koneksi gagal
    console.error("Error while connecting to database:", error);
    throw error;
  }
};

export const findOneDocument = async (
  collectionName: string, // Nama koleksi yang akan dicari
  filter: FilterType // Filter untuk pencarian dokumen
) => {
  try {
    // Menghubungkan ke database MongoDB
    const db = await connectDatabase();
    // Mendapatkan koleksi MongoDB berdasarkan nama koleksi yang diberikan
    const collection = db.collection(collectionName);
    // console.log(collection);

    // Mencari dokumen dalam koleksi berdasarkan filter yang diberikan
    const result = await collection.findOne(filter);

    // Mengembalikan hasil pencarian
    return result;
  } catch (error) {
    // Menangkap dan menampilkan kesalahan jika terjadi kesalahan dalam pencarian
    console.error("Error while finding document:", error);
    throw error;
  }
};

export const registerUser = async (
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) => {
  try {
    // Menghubungkan ke database
    const db = await connectDatabase();
    // Nama koleksi
    const collectionName = "users";

    // Memeriksa apakah koleksi sudah ada, jika tidak, buat koleksi
    const collections = await db.collections();
    const collectionExists = collections.some(
      (collection) => collection.collectionName === collectionName
    );
    if (!collectionExists) {
      await db.createCollection(collectionName);
    }

    // Mendapatkan koleksi
    const collection = db.collection(collectionName);

    // Memeriksa apakah email sudah ada dalam database
    const data = await collection.findOne({ email: userData.email });
    if (data) {
      callback({ status: false, message: "Email already exists" });
      return;
    }

    // Jika email belum ada, melakukan hash password dan menetapkan role
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    const result = await collection.insertOne(userData);
    callback({ status: true, message: "Registered successfully" });
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error while registering user:", error);
    throw error;
  }
};

// export const getDb = () => {
//   if (!db) {
//     throw new Error("Db not initialized");
//   }
//   return db;
// };
