export const darkTheme = {
  colors: {
    background: "#1A1A1A",
    backgroundElevated: "#282828",
    foreground: "#FFFFFF",
    foregroundSecondary: "#A8A8A8",
    borders: "#292929",
  },
  margins: {
    sm: 4,
    ms: 8,
    md: 12,
    lg: 18,
    xl: 24,
  },
  radiuses: {
    sm: 4,
    md: 12,
    lg: 18,
    xl: 24,
  },

  fontSizes: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
} as const;

export type ThemeType = typeof darkTheme;
