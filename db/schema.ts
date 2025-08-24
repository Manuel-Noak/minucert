// src/db/schema.ts
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const admin = mysqlTable("admin", {
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
});

export const paidUser = mysqlTable("paidUsers", {
  fullname: varchar("fullname", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  program: varchar("program", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).default("Unfulfilled"),
});
