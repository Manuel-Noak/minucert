// src/db/index.ts
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: "46.202.140.213",
  user: "admin",
  password: "Mindz##0010", // your MySQL password
  database: "minucert_dev",
});

export const db = drizzle(poolConnection);
