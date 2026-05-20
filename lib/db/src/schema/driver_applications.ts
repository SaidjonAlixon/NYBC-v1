import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const driverApplicationsTable = pgTable("driver_applications", {
  id: serial("id").primaryKey(),
  position: text("position").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  cdlType: text("cdl_type").notNull(),
  experience: text("experience").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertDriverApplicationSchema = createInsertSchema(driverApplicationsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertDriverApplication = z.infer<typeof insertDriverApplicationSchema>;
export type DriverApplication = typeof driverApplicationsTable.$inferSelect;
