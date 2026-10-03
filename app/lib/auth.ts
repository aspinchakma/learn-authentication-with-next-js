import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

export const uri = process.env.BETTER_AUTH_DB;

if (!uri) {
  throw new Error("BETTER_AUTH_DB is not defined");
}

const client = new MongoClient(uri);
const db = client.db("better-auth");
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET!,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
