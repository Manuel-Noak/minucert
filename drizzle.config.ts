import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();
export default {
  schema: "./db/schema.ts", // path to your schema
  out: "./drizzle", // folder for migration files
  dialect: "mysql", // MySQL driver
  dbCredentials: {
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "minucert",
  },
} satisfies Config;
