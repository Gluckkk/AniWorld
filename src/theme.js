import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// #102542  #FCAA67
// #A6D49F
//#ED254E

// creating color palette
export const tokens = {
  white: {
    100: "#fcfcfc",
    200: "#faf9f9",
    300: "#f7f6f6",
    400: "#f5f3f3",
    500: "#f2f0f0",
    600: "#c2c0c0",
    700: "#919090",
    800: "#616060",
    900: "#303030",
  },
  grey: {
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
  },
  primary: {
    100: "#f2f0f0",
    200: "#a1a4ab",
    300: "#727681",
    400: "#1F2A40",
    500: "#141b2d",
    600: "#101624",
    700: "#0c101b",
    800: "#080b12",
    900: "#040509",
  },
  indigoAccent: {
    100: "#e1e2fe",
    200: "#c3c6fd",
    300: "#a4a9fc",
    400: "#868dfb",
    500: "#6870fa",
    600: "#535ac8",
    700: "#3e4396",
    800: "#2a2d64",
    900: "#151632",
  },
};

// theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: tokens.indigoAccent[500],
              light: tokens.primary[400],
              dark: tokens.primary[600],
              lighter: tokens.primary[300],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: "#f2f0f0",
              light: tokens.primary[100],
              dark: tokens.primary[600],
              lighter: tokens.primary[300],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
