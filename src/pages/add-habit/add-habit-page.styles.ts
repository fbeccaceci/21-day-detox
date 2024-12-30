import { createStyleSheet } from "react-native-unistyles";

export const styleSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },

  inputContainer: {
    padding: theme.margins.md,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.margins.md,
  },

  textInput: {
    flex: 1,
    color: theme.colors.foreground,
    fontSize: 16,
  },
}));
