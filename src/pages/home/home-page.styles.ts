import { createStyleSheet } from "react-native-unistyles";

export const styleSheet = createStyleSheet((theme, runtime) => ({
  mainList: {
    flex: 1,
    width: "100%",

    backgroundColor: theme.colors.background,
  },

  mainListContainer: {
    padding: theme.margins.md,
    paddingBottom: runtime.insets.bottom + theme.margins.md,
  },

  listItemSeparator: {
    height: theme.margins.md,
  },
}));
