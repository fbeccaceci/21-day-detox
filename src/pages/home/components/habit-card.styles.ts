import { createStyleSheet } from "react-native-unistyles";
import type { HabitStatus } from "./habit-card";

export const styleSheet = createStyleSheet((theme) => ({
  container: (status: HabitStatus) => {
    const containerStatusColorMap: Record<HabitStatus, string> = {
      active: theme.colors.backgroundElevated,
      completed: "#395242",
      expired: "#E86D68",
    };

    return {
      backgroundColor: containerStatusColorMap[status],
      borderRadius: theme.radiuses.lg,
      borderWidth: 1,
      borderColor: theme.colors.borders,
      padding: theme.margins.lg,

      minHeight: 100,

      shadowColor: theme.colors.borders,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    };
  },

  title: {
    color: theme.colors.foreground,
    fontWeight: 600,
    fontSize: 20,
  },

  description: (status: HabitStatus) => ({
    color: status === "expired" ? theme.colors.foreground : theme.colors.foregroundSecondary,
  }),

  completionItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",

    marginTop: theme.margins.md,
    gap: theme.margins.sm,
  },

  completionItemContainer: {
    height: 34,
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: "#303030",
    alignItems: "center",
    justifyContent: "center",
  },

  completionItemContainerCompleted: {
    backgroundColor: theme.colors.foreground,
  },

  completionItemLabel: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.colors.foregroundSecondary,
  },
}));
