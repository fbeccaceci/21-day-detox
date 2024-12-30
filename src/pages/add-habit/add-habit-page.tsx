import "react-native-get-random-values";
import { View, TextInput } from "react-native";
import { useStyles } from "react-native-unistyles";
import { styleSheet } from "./add-habit-page.styles";
import { Observable } from "@/utils/observable";
import { Habit } from "@/models/habit";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { IconFile, IconLetterCaseToggle } from "@tabler/icons-react-native";

export const newHabit = new Observable<Habit | null>(null);

export default function AddHabitPage() {
  const { styles, theme } = useStyles(styleSheet);

  // Clean up the observable when the component mounts to avoid stale data
  useEffect(() => {
    newHabit.value = {
      id: uuidv4(),
      title: "",
      dailyGoal: "",
      completionDates: [],
      creationDate: new Date().toISOString(),
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <IconLetterCaseToggle size={24} color={theme.colors.foreground} />
        <TextInput
          placeholder="Habit name..."
          style={styles.textInput}
          placeholderTextColor={theme.colors.foregroundSecondary}
          autoFocus
          onChangeText={(title) => {
            newHabit.value = { ...newHabit.value!, title };
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <IconFile size={24} color={theme.colors.foreground} />
        <TextInput
          placeholder="What's a 1% improvement for you..."
          style={styles.textInput}
          placeholderTextColor={theme.colors.foregroundSecondary}
          autoFocus
          onChangeText={(dailyGoal) => {
            newHabit.value = { ...newHabit.value!, dailyGoal };
          }}
        />
      </View>
    </View>
  );
}
