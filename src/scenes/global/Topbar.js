import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";

const Selector = styled(Box)`
  ${({ theme }) => `
  background-color: ${theme.palette.accent.main};
  transition: ${theme.transitions.create(["width"], {
    duration: theme.transitions.duration.long,
  })};
  &:hover {
    width: 20vw;
  }
  `}
`;

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* search bar */}
      <Typography variant="h1" color={theme.palette.accent.main}>
        AniWorld
      </Typography>
      <Box>
        <Collapse
          orientation="horizontal"
          in={checked}
          collapsedSize="10vw"
          sx={{ borderRadius: "3px" }}
        >
          <Box
            display="flex"
            backgroundColor={theme.palette.accent.main}
            borderRadius="3px"
            onClick={handleChange}
            width="20vw"
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Collapse>
      </Box>
      {/* icons section */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
