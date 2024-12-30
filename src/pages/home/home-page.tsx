import { Dimensions, FlatList, View } from "react-native";
import { styleSheet } from "./home-page.styles";
import { useStyles } from "react-native-unistyles";
import HabitCard, { habitCompletedEvent } from "./components/habit-card";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { IconInbox } from "@tabler/icons-react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRef } from "react";
import { useEvent } from "@/hooks/use-event";

const { width } = Dimensions.get("window");

export default function HomePage() {
  const { styles, theme } = useStyles(styleSheet);
  const confettiRef = useRef<ConfettiCannon>(null);

  const { data } = useLiveQuery(db.select().from(schema.habitsTable));
  const habits = data?.map(schema.tableSchemaToHabit) ?? [];

  useEvent(habitCompletedEvent, () => confettiRef.current?.start());

  // const habits = [];

  return (
    <>
      <FlatList
        style={styles.mainList}
        contentContainerStyle={styles.mainListContainer}
        data={habits}
        renderItem={({ item }) => <HabitCard habit={item} />}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyListComponent}>
            <IconInbox size={120} color={theme.colors.foregroundSecondary} />
          </View>
        )}
      />
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: width / 2, y: -30 }}
        fadeOut
        autoStart={false}
      />
    </>
  );
}
