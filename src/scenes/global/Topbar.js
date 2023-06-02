import { Box, IconButton, useTheme, Badge } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Notifications from "../notifications";
import { mockDataNotifications } from "../../data/mockData";
import LogoutDialog from "../logoutDialog";
import { mockDataUser } from "../../data/mockData";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* search bar */}
      <Box
        display="flex"
        backgroundColor={theme.palette.primary.main}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* icons section */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {" "}
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {mockDataUser.login && (
          <IconButton
            onClick={() => {
              setNotificationsIsOpen(true);
            }}
          >
            <Badge color="firstAccentColor" badgeContent={notificationsNumber}>
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        )}
        <IconButton onClick={openOptionsHandler}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setLogoutIsOpen(true);
          }}
        >
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
