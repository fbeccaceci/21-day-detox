import "@/styles/unistyles";
import HomeStackNavigator from "@/navigation/home-stack-navigator";
import { NavigationContainer } from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./drizzle/migrations";
import { db, expoDb } from "@/db";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

export default function App() {
  const { error } = useMigrations(db, migrations);

  if (process.env.NODE_ENV === "development") {
    useDrizzleStudio(expoDb);
  }

  if (error) {
    throw Error("Migrations failed: " + error);
  }

  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}
