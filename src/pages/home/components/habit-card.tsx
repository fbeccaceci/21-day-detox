import { Text, View, ViewStyle } from "react-native";
import { useStyles } from "react-native-unistyles";
import { styleSheet } from "./habit-card.styles";
import { Habit } from "@/models/habit";

export interface HabitCardProps {
  habit: Habit;
}

export default function HabitCard({ habit }: HabitCardProps) {
  const { styles } = useStyles(styleSheet);

  function renderCompletionItem(label: string, completed: boolean) {
    const style: ViewStyle[] = [styles.completionItemContainer];
    if (completed) {
      style.push(styles.completionItemContainerCompleted);
    }
    return (
      <View style={style}>
        <Text style={styles.completionItemLabel}>{label}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{habit.title}</Text>
      <Text style={styles.description}>{habit.dailyGoal}</Text>

      <View style={styles.completionItemsContainer}>
        {new Array(21).fill(0).map((_, index) => {
          return renderCompletionItem((index + 1).toString(), index < 4);
        })}
      </View>
    </View>
  );
}
