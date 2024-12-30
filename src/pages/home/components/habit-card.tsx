import { Text, View, ViewStyle } from "react-native";
import * as ContextMenu from "zeego/context-menu";
import { useStyles } from "react-native-unistyles";
import { styleSheet } from "./habit-card.styles";
import { Habit } from "@/models/habit";
import { db } from "@/db";
import { eq, is } from "drizzle-orm";
import { habitsTable } from "@/db/schema";
import dayjs from "dayjs";
import { EventEmitter } from "@/utils/event-emitter";

export const habitCompletedEvent = new EventEmitter<Habit>();

export interface HabitCardProps {
  habit: Habit;
}

export type HabitStatus = "active" | "completed" | "expired";

export default function HabitCard({ habit }: HabitCardProps) {
  const { styles } = useStyles(styleSheet);
  const todayDateString = new Date().toISOString().split("T")[0];
  const startDate = dayjs(habit.creationDate);

  // const isCompletedToday = habit.completionDates.includes(todayDateString);
  const isCompletedToday = false;

  const status: HabitStatus = (() => {
    if (isCompleted(habit)) return "completed";
    if (isExpired(habit)) return "expired";
    return "active";
  })();

  function renderCompletionItem(label: string, completed: boolean) {
    const style: ViewStyle[] = [styles.completionItemContainer];
    if (completed) {
      style.push(styles.completionItemContainerCompleted);
    }
    return (
      <View key={label} style={style}>
        <Text style={styles.completionItemLabel}>{label}</Text>
      </View>
    );
  }

  async function deleteHabit() {
    await db.delete(habitsTable).where(eq(habitsTable.id, habit.id));
  }

  async function completeHabitToday() {
    if (isCompletedToday) {
      return;
    }

    const oldStatus = status;
    const completionDates = [...habit.completionDates, todayDateString];

    await db
      .update(habitsTable)
      .set({ completionDates: JSON.stringify(completionDates) })
      .where(eq(habitsTable.id, habit.id));

    const newHabit = { ...habit, completionDates };

    if (oldStatus === "active" && isCompleted(newHabit)) {
      habitCompletedEvent.emit(newHabit);
    }
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <View style={styles.container(status)}>
          <Text style={styles.title}>
            {habit.title} {status === "completed" ? "- Completed 🎉" : ""}{" "}
            {status === "expired" ? "- Failed 😔" : ""}
          </Text>
          <Text style={styles.description(status)}>{habit.dailyGoal}</Text>

          <View style={styles.completionItemsContainer}>
            {new Array(21).fill(0).map((_, index) => {
              const thisDate = startDate.add(index, "day").toISOString().split("T")[0];
              const isCompleted = habit.completionDates.includes(thisDate);
              return renderCompletionItem((index + 1).toString(), isCompleted);
            })}
          </View>
        </View>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        {!isCompletedToday && status === "active" && (
          <ContextMenu.Item key="complete" onSelect={completeHabitToday}>
            <ContextMenu.ItemTitle>Complete today</ContextMenu.ItemTitle>
          </ContextMenu.Item>
        )}
        <ContextMenu.Item key="delete" destructive onSelect={deleteHabit}>
          <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}

function isCompleted(habit: Habit) {
  return habit.completionDates.length >= 21;
}

function isExpired(habit: Habit) {
  const startDate = dayjs(habit.creationDate);
  const today = dayjs();

  const todayDateString = today.toISOString().split("T")[0];
  const isCompletedToday = habit.completionDates.includes(todayDateString);

  if (startDate.add(21, "day").isBefore(today) && habit.completionDates.length < 21) {
    return true;
  }

  const elapsedDays = today.diff(startDate, "day");
  if (elapsedDays > habit.completionDates.length - (isCompletedToday ? 1 : 0)) {
    return true;
  }

  return false;
}
