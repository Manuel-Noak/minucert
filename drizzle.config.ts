import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();
export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
} as Config;
