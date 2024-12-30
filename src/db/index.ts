import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

export const expoDb = SQLite.openDatabaseSync("21_days_detox.db", { enableChangeListener: true });
export const db = drizzle(expoDb);
