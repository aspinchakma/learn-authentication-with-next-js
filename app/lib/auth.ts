import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

export const uri = process.env.BETTER_AUTH_DB;

if (!uri) {
  throw new Error("BETTER_AUTH_DB is not defined");
}

const client = new MongoClient(uri);
const db = client.db();
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
