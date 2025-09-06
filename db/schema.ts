import {
  bigint,
  timestamp,
  mysqlTable,
  varchar,
  text,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// Internal User Table
export const internalUser = mysqlTable(
  "internal_user",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    lastModifiedOn: timestamp("last_modified_on")
      .defaultNow()
      .onUpdateNow()
      .notNull(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    email: varchar("email", { length: 100 }).notNull(),
    username: varchar("username", { length: 100 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    roles: varchar("roles", { length: 255 }),
  },
  (table) => ({
    usernameIdx: uniqueIndex("UQ_internal_user_username").on(table.username),
    emailIdx: uniqueIndex("UQ_internal_user_email").on(table.email),
  })
);

// Certification Provider Table
export const certificationProvider = mysqlTable(
  "certification_provider",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    lastModifiedOn: timestamp("last_modified_on")
      .defaultNow()
      .onUpdateNow()
      .notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    website: varchar("website", { length: 255 }),
    apiBaseUrl: varchar("api_base_url", { length: 100 }),
  },
  (table) => ({
    nameIdx: uniqueIndex("UQ_certification_provider_name").on(table.name),
  })
);

// Certification Table
export const certification = mysqlTable(
  "certification",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    lastModifiedOn: timestamp("last_modified_on")
      .defaultNow()
      .onUpdateNow()
      .notNull(),
    providerId: bigint("provider_id", { mode: "number" })
      .notNull()
      .references(() => certificationProvider.id),
    courseId: bigint("course_id", { mode: "number" }),
    price: bigint("price", { mode: "number" }),
    currencyCode: varchar("currency_code", { length: 10 }),
    title: varchar("title", { length: 100 }),
    thumbnailLink: varchar("thumbnail_link", { length: 255 }),
    category: varchar("category", { length: 100 }),
  },
  (table) => ({
    providerCourseIdx: uniqueIndex("UQ_certification_provider_course_id").on(
      table.providerId,
      table.courseId
    ),
  })
);

// Customer Table
export const customer = mysqlTable(
  "customer",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    lastModifiedOn: timestamp("last_modified_on")
      .defaultNow()
      .onUpdateNow()
      .notNull(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    email: varchar("email", { length: 100 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }),
    address: text("address"),
  },
  (table) => ({
    emailIdx: uniqueIndex("UQ_customer_email").on(table.email),
  })
);

// Customer Certification Orders Table
export const customerCertificationOrders = mysqlTable(
  "customer_certification_orders",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    lastModifiedOn: timestamp("last_modified_on")
      .defaultNow()
      .onUpdateNow()
      .notNull(),
    customerId: bigint("customer_id", { mode: "number" })
      .notNull()
      .references(() => customer.id),
    certificationId: bigint("certification_id", { mode: "number" })
      .notNull()
      .references(() => certification.id),
    status: varchar("status", { length: 50 }).notNull(),
    reference: varchar("reference", { length: 100 }).notNull(),
  },
  (table) => ({
    referenceIdx: uniqueIndex("UQ_customer_certification_orders_reference").on(
      table.reference
    ),
  })
);

// Certification Purchase Transaction Table
export const certificationPurchaseTransaction = mysqlTable(
  "certification_purchase_transaction",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    lastModifiedOn: timestamp("last_modified_on")
      .defaultNow()
      .onUpdateNow()
      .notNull(),
    certificationOrderId: bigint("certification_order_id", { mode: "number" })
      .notNull()
      .references(() => customerCertificationOrders.id),
    amount: bigint("amount", { mode: "number" }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    paymentGatewayStatus: varchar("payment_gateway_status", { length: 50 }),
    transactionReference: varchar("transaction_reference", {
      length: 100,
    }).notNull(),
    paymentId: varchar("payment_id", { length: 100 }),
    paymentGateway: varchar("payment_gateway", { length: 50 }).notNull(),
    responseBody: text("response_body"),
  },
  (table) => ({
    orderIdIdx: uniqueIndex(
      "UQ_certification_purchase_transaction_order_id"
    ).on(table.certificationOrderId),
    referenceIdx: uniqueIndex(
      "UQ_certification_purchase_transaction_reference"
    ).on(table.transactionReference),
  })
);

// Certification Purchase Transaction Log Table
export const certificationPurchaseTransactionLog = mysqlTable(
  "certification_purchase_transaction_log",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    lastModifiedOn: timestamp("last_modified_on")
      .defaultNow()
      .onUpdateNow()
      .notNull(),
    certificationOrderId: bigint("certification_order_id", { mode: "number" })
      .notNull()
      .references(() => customerCertificationOrders.id),
    amount: bigint("amount", { mode: "number" }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    paymentGatewayStatus: varchar("payment_gateway_status", { length: 50 }),
    transactionReference: varchar("transaction_reference", {
      length: 100,
    }).notNull(),
    paymentId: varchar("payment_id", { length: 100 }),
    paymentGateway: varchar("payment_gateway", { length: 50 }).notNull(),
    responseBody: text("response_body"),
  }
);

// Customer Complaints Table
export const customerComplaints = mysqlTable("customer_complaints", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  createdOn: timestamp("created_on").defaultNow().notNull(),
  lastModifiedOn: timestamp("last_modified_on")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 100 }).notNull(),
  complaint: text("complaint"),
});

// Relations
export const certificationProviderRelations = relations(
  certificationProvider,
  ({ many }) => ({
    certifications: many(certification),
  })
);

export const certificationRelations = relations(
  certification,
  ({ one, many }) => ({
    provider: one(certificationProvider, {
      fields: [certification.providerId],
      references: [certificationProvider.id],
    }),
    orders: many(customerCertificationOrders),
  })
);

export const customerRelations = relations(customer, ({ many }) => ({
  orders: many(customerCertificationOrders),
}));

export const customerCertificationOrdersRelations = relations(
  customerCertificationOrders,
  ({ one, many }) => ({
    customer: one(customer, {
      fields: [customerCertificationOrders.customerId],
      references: [customer.id],
    }),
    certification: one(certification, {
      fields: [customerCertificationOrders.certificationId],
      references: [certification.id],
    }),
    transaction: one(certificationPurchaseTransaction),
    transactionLogs: many(certificationPurchaseTransactionLog),
  })
);

export const certificationPurchaseTransactionRelations = relations(
  certificationPurchaseTransaction,
  ({ one }) => ({
    order: one(customerCertificationOrders, {
      fields: [certificationPurchaseTransaction.certificationOrderId],
      references: [customerCertificationOrders.id],
    }),
  })
);

export const certificationPurchaseTransactionLogRelations = relations(
  certificationPurchaseTransactionLog,
  ({ one }) => ({
    order: one(customerCertificationOrders, {
      fields: [certificationPurchaseTransactionLog.certificationOrderId],
      references: [customerCertificationOrders.id],
    }),
  })
);
