import { Habit } from "@/models/habit";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const habitsTable = sqliteTable("habits", {
  id: text().primaryKey(),
  title: text().notNull(),
  dailyGoal: text().notNull(),
  completionDates: text().notNull(),
  creationDate: text().notNull(),
});

export function habitToTableSchema(habit: Habit): typeof habitsTable.$inferInsert {
  return {
    ...habit,
    completionDates: JSON.stringify(habit.completionDates),
  };
}

export function tableSchemaToHabit(schema: typeof habitsTable.$inferInsert): Habit {
  return {
    ...schema,
    completionDates: JSON.parse(schema.completionDates),
  };
}
