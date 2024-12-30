import { UnistylesRegistry } from "react-native-unistyles";

import { breakpoints } from "./breakpoints";
import { darkTheme } from "./themes";

type AppBreakpoints = typeof breakpoints;

export const AppThemes = {
  dark: darkTheme,
};

type AppThemes = typeof AppThemes;

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    dark: darkTheme,
  })
  .addConfig({
    adaptiveThemes: true,
    initialTheme: "dark",
  });

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}
