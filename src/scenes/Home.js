import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { ColorModeContext } from "../theme";
import { useContext } from "react";

const Home = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box>
      <Typography color={theme.palette.font}>click to change theme</Typography>
      <Button onClick={colorMode.toggleColorMode}>Click</Button>
    </Box>
  );
};

export default Home;
