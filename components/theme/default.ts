import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  borderRadius: {
    none: 0,
    base: 8,
    small: 4,
  },
  borderWidth: {
    none: 0,
    normal: 2,
  },
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
  },
  animation: {
    duration: {
      base: "250ms",
    },
  },
  fontSizes: {
    xxxl: 44,
    xxl: 35,
    xl: 32,
    l: 28,
    lg: 25,
    md: 23,
    base: 18,
    small: 15,
  },
  colors: {
    lightGray: "#EDEDEF",
    mediumGray: "#E7E7E7",
    darkGrey: "#080831",
    asphalt: "#47475B",
    stone: "#CCCCCC",
    gravel: "#A9A9B1",
    pebble: "#F9F9F9",
    white: "#FFFFFF",

    it: "#0000FF",
    darkIt: "#3333FF",
    martinique: "#2D2D50",
    purple: "#9999FF",
    violet: "#CCCCFF",
    lightViolet: "#E5E5FF",

    yellow: "#FFF6A3",
    orange: "#FF7247",
    darkRed: "#A82700",
  },
  contentSize: 1160,
  space: {
    none: 0,
    small: 4,
    base: 8,
    md: 16,
    outer: 20,
    lg: 32,
    xl: 64,
    xxl: 128,
    xxxl: 256,
  },
  fonts: {
    body: '"Cesko Digital", system-ui, sans-serif',
    heading: '"Cesko Digital", system-ui, sans-serif',
    monospace: '"Cesko Digital Mono", Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
    button: 600,
  },
  lineHeights: {
    text: 1.6,
    body: 1.5,
    heading: 1.3,
    button: 1.3,
  },
  shadows: {
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)",
  },
  variants: {},
  text: {},
  buttons: {
    primary: {
      color: "white",
      bg: "primary",
    },
  },
  controlHeights: {
    normal: 56,
  },
};
