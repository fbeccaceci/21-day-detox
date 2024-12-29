import { StyleSheet } from "react-native-unistyles";

import { breakpoints } from "./breakpoints";
import { darkTheme } from "./themes";

type AppBreakpoints = typeof breakpoints;

export const AppThemes = {
  dark: darkTheme,
};

type AppThemes = typeof AppThemes;

StyleSheet.configure({
  themes: AppThemes,
  breakpoints,
  settings: {
    initialTheme: "dark",
  },
});

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}
