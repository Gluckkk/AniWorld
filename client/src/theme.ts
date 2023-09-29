import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// // black: {
//      100: "#cfd3d9",
//      200: "#9fa8b3",
//      300: "#707c8e",
//      400: "#405168",
//      500: "#102542",
//      600: "#0d1e35",
//      700: "#0a1628",
//      800: "#060f1a",
//      900: "#03070d"
// },
//   yellow: {
//           100: "#feeee1",
//           200: "#feddc2",
//           300: "#fdcca4",
//           400: "#fdbb85",
//           500: "#fcaa67",
//           600: "#ca8852",
//           700: "#97663e",
//           800: "#654429",
//           900: "#322215"
// },
// // gray: {
//      100: "#edf6ec",
//      200: "#dbeed9",
//      300: "#cae5c5",
//      400: "#b8ddb2",
//      500: "#a6d49f",
//      600: "#85aa7f",
//      700: "#647f5f",
//      800: "#425540",
//      900: "#212a20"
// },
// //red: {
//     100: "#fbd3dc",
//     200: "#f8a8b8",
//     300: "#f47c95",
//     400: "#f15171",
//     500: "#ed254e",
//     600: "#be1e3e",
//     700: "#8e162f",
//     800: "#5f0f1f",
//     900: "#2f0710"
// },
// grey: {
//   100: "#e0e0e0",
//   200: "#c2c2c2",
//   300: "#a3a3a3",
//   400: "#858585",
//   500: "#666666",
//   600: "#525252",
//   700: "#3d3d3d",
//   800: "#292929",
//   900: "#141414",
// },

// creating color palette
export const tokens = {
  primary: {
    100: "#cfd3d9",
    200: "#9fa8b3",
    300: "#707c8e",
    400: "#405168",
    500: "#102542",
    600: "#0d1e35",
    700: "#0a1628",
    800: "#060f1a",
    900: "#03070d",
  },

  accent: {
    100: "#fbd3dc",
    200: "#f8a8b8",
    300: "#f47c95",
    400: "#f15171",
    500: "#ed254e",
    600: "#be1e3e",
    700: "#8e162f",
    800: "#5f0f1f",
    900: "#2f0710",
  },

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
};

// theme settings
export const themeSettings = (mode: string) => {
  return {
    palette: {
      ...tokens,
      accent: {
        main: tokens.accent[500],
        light: tokens.accent[400],
        dark: tokens.accent[600],
      },
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: tokens.primary[500],
              light: tokens.primary[400],
              dark: tokens.primary[600],
            },

            background: {
              default: tokens.primary[600],
              dark: tokens.primary[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: tokens.white[500],
              light: tokens.primary[300],
              dark: tokens.primary[500],
            },

            background: {
              default: tokens.grey[100],
              dark: tokens.primary[200],
            },
          }),
    },
    typography: {
      fontFamily: ["Monomaniac One", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Monomaniac One", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Monomaniac One", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Monomaniac One", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Monomaniac One", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Monomaniac One", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Monomaniac One", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    transitions: {
      duration: {
        long: 5000,
      },
    },

    breakpoints: {
      values: {
        mobile: 640,
        tablet: 890,

        desktop: 1200,
        largeDesktop: 1900,
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
