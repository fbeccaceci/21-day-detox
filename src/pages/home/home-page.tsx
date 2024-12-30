import { FlatList, View } from "react-native";
import { styleSheet } from "./home-page.styles";
import { useStyles } from "react-native-unistyles";
import HabitCard from "./components/habit-card";
import { Habit } from "@/models/habit";

const mockHabits: Habit[] = [
  {
    id: "1",
    title: "Eat healthy",
    dailyGoal: "Eat at least 3 servings of fruits and vegetables per day",
    completionDates: ["2023-01-01", "2023-02-01", "2023-03-01"],
    creationDate: "2023-01-01",
  },
  {
    id: "2",
    title: "Exercise",
    dailyGoal: "Do at least 10 minutes of moderate-intensity exercise per day",
    completionDates: ["2023-01-01", "2023-02-01", "2023-03-01"],
    creationDate: "2023-01-01",
  },
];

export default function HomePage() {
  const { styles } = useStyles(styleSheet);

  return (
    <FlatList
      style={styles.mainList}
      contentContainerStyle={styles.mainListContainer}
      data={mockHabits}
      renderItem={({ item }) => <HabitCard habit={item} />}
      keyExtractor={(item) => item.id}
      contentInsetAdjustmentBehavior="automatic"
      ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
    />
  );
}
