import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import { ColorModeContext } from "../theme";
import { useContext } from "react";

const Home = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box>
      <p>click to change theme</p>
      <Button onClick={colorMode.toggleColorMode}>Click</Button>
    </Box>
  );
};

export default Home;
