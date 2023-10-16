import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum("user_system_enum", ["system", "user"]);


export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  fileKey: text("file_key").notNull(), // s3 bucket id
});

export type DrizzleChat = typeof chats.$inferSelect

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .references(() => chats.id)
    .notNull(), //connecting the chat and messages table
  content: text("content").notNull(),
  role: userSystemEnum("role").notNull(),
});

export const userSubscriptions = pgTable('user_subscription',{
  id : serial('id').primaryKey(),
  userId : varchar('user_Id',{length: 256}).notNull().unique(),
  stripeCustomerId : varchar('stripe_customer_id' , {length : 256}).notNull().unique(),
  stripeSubscriptionId : varchar('stripe_subscription_id' , {length : 256}).notNull().unique(),
  stripePriceId : varchar('stripe_price_id' , {length : 256}),
  stripeCurrentPeriodEnd : timestamp("stripe_current_period_end")
})
