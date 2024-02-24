import { loginUser } from "@/lib/mongodb/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  // Konfigurasi sesi
  session: {
    strategy: "jwt", // Menggunakan JWT sebagai strategi sesi
  },
  // Secret untuk penandatanganan token JWT
  secret: process.env.NEXTAUTH_SECRET,
  // Penyedia autentikasi
  providers: [
    // Penyedia autentikasi berbasis kredensial
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        // Konfigurasi kredensial yang diperlukan
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Fungsi otorisasi untuk memeriksa kredensial yang diberikan
      async authorize(credentials) {
        // Mendapatkan email, password, dan fullname dari kredensial
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // Simulasi pengguna dari kredensial yang diberikan
        const user: any = await loginUser({ email });
        // Memeriksa apakah pengguna ditemukan
        if (user) {
          const passwordMatch = await compare(password, user.password);
          if (passwordMatch) {
            return user;
          }
          return null;
        } else {
          // Mengembalikan null jika pengguna tidak ditemukan
          return null;
        }
      },
    }),
  ],
  // Callbacks untuk manipulasi token JWT dan sesi
  callbacks: {
    // Callback untuk manipulasi token JWT
    jwt({ token, account, user }: any) {
      // Jika autentikasi menggunakan kredensial, menambahkan email dan fullname ke token
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      // Mengembalikan token yang telah dimodifikasi
      return token;
    },
    // Callback untuk manipulasi sesi
    async session({ session, token }: any) {
      // Jika email ada dalam token, menambahkannya ke sesi
      if ("email" in token) {
        session.user.email = token.email;
      }
      // Jika fullname ada dalam token, menambahkannya ke sesi
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      // Jika role ada dalam token, menambahkannya ke sesi
      if ("role" in token) {
        session.user.role = token.role;
      }
      // Mengembalikan sesi yang telah dimodifikasi
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
