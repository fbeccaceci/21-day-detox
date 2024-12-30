import AddHabitPage, { newHabit } from "@/pages/add-habit/add-habit-page";
import HomePage from "@/pages/home/home-page";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, PlatformColor, Pressable, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { IconPlus } from "@tabler/icons-react-native";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  const { styles, theme } = useStyles(styleSheet);

  function handleSaveHabit(): boolean {
    if (
      !newHabit.value ||
      newHabit.value.title.length === 0 ||
      newHabit.value.dailyGoal.length === 0
    ) {
      return false;
    }
    const habit = newHabit.value;
    console.log("New habit:", habit);
    return true;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={({ navigation }) => ({
          headerLargeTitle: true,
          headerTitle: "Habits",
          headerLargeTitleShadowVisible: false,
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerLargeStyle: {
            backgroundColor: "transparent",
          },
          headerRight: () => (
            <Pressable
              style={styles.headerRightContainer}
              onPress={() => navigation.navigate("AddHabit")}
            >
              <IconPlus size={24} color={PlatformColor("systemBlue")} />
              <Text style={styles.headerRightText}>Add new</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="AddHabit"
        component={AddHabitPage}
        options={({ navigation }) => ({
          presentation: "modal",
          headerShadowVisible: false,
          headerTitle: "New habit",
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.headerRightText}>Cancel</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                if (handleSaveHabit()) navigation.goBack();
              }}
            >
              <Text style={styles.headerRightText}>Save</Text>
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styleSheet = createStyleSheet((theme) => ({
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerRightText: {
    color: PlatformColor("systemBlue"),
    fontSize: 18,
    fontWeight: 500,
  },
}));
