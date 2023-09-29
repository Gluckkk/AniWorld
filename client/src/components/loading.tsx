import { Box } from "@mui/material";

import { useTheme } from "@mui/material";

const Loading = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignContent="center"
      justifyContent="center"
      width="100%"
      m="3rem"
    >
      <Box
        sx={{
          width: "7rem",
          height: "7rem",
          border: `1rem solid ${theme.palette.accent.light}`,
          borderTop: `1rem solid ${theme.palette.accent.main}`,
          borderRadius: "50%",
          animation: "spinner 1.5s linear infinite",
        }}
      ></Box>
    </Box>
  );
};

export default Loading;
