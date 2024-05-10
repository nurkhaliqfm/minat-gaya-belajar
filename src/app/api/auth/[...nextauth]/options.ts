import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const {
  OAUTH0_CLIENT_SECRET,
  OAUTH0_CLIENT_ID,
  OAUTH0_GRANT_TYPE,
  NEXT_PUBLIC_API_URL,
} = process.env;

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          type: "password",
          placeholder: "Masukkan Password",
        },
      },
      async authorize(credentials) {
        const res = await axios({
          url: `${NEXT_PUBLIC_API_URL}/oauth/token`,
          method: "POST",
          data: {
            username: credentials?.email,
            password: credentials?.password,
            client_id: OAUTH0_CLIENT_ID,
            client_secret: OAUTH0_CLIENT_SECRET,
            grant_type: OAUTH0_GRANT_TYPE,
          },
        });

        if (res.status === 200) {
          cookies().set("name", res.data.name);
          cookies().set("role", res.data.role);
          cookies().set("access_token_oauth0", res.data.access_token);
          cookies().set("access_token_oauth0_expired", res.data.expires_in);
          return res.data;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};
