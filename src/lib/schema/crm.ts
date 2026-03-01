import { sqliteTable, text, integer, real, primaryKey } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fundingRoundId: integer("funding_round_id"),
  companyName: text("company_name").notNull(),
  companyWebsite: text("company_website"),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  contactTitle: text("contact_title"),
  stage: text("stage", {
    enum: ["new", "contacted", "meeting", "proposal", "closed_won", "closed_lost"],
  }).notNull().default("new"),
  priority: text("priority", {
    enum: ["low", "medium", "high", "urgent"],
  }).notNull().default("medium"),
  dealValue: real("deal_value"),
  source: text("source", {
    enum: ["scraper", "manual", "referral", "inbound"],
  }),
  lostReason: text("lost_reason"),
  nextFollowUp: text("next_follow_up"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const activities = sqliteTable("activities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leadId: integer("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  type: text("type", {
    enum: ["note", "email", "call", "meeting", "stage_change", "other"],
  }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  metadata: text("metadata"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  color: text("color").notNull().default("#2176FF"),
});

export const leadTags = sqliteTable("lead_tags", {
  leadId: integer("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (table) => [
  primaryKey({ columns: [table.leadId, table.tagId] }),
]);

export const followUps = sqliteTable("follow_ups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leadId: integer("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  dueDate: text("due_date").notNull(),
  title: text("title").notNull(),
  completed: integer("completed").notNull().default(0),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const fundingRounds = sqliteTable("funding_rounds", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  companyName: text("company_name").notNull(),
  companyNameNormalized: text("company_name_normalized").notNull(),
  roundType: text("round_type").notNull(),
  amountUsd: real("amount_usd"),
  date: text("date"),
  investors: text("investors").notNull().default("[]"),
  categoryTags: text("category_tags").notNull().default("[]"),
  source: text("source").notNull(),
  sourceUrl: text("source_url"),
  companyWebsite: text("company_website"),
  description: text("description"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const dailyReports = sqliteTable("daily_reports", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  date: text("date").notNull(),
  tasksCompleted: text("tasks_completed").notNull(),
  tasksInProgress: text("tasks_in_progress"),
  blockers: text("blockers"),
  hoursWorked: real("hours_worked").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type Activity = typeof activities.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type FollowUp = typeof followUps.$inferSelect;
export type FundingRoundRow = typeof fundingRounds.$inferSelect;
export type DailyReport = typeof dailyReports.$inferSelect;
