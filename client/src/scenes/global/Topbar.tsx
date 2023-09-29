import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  InputBase,
  Drawer,
} from "@mui/material";
import { useState, useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import { Link, useNavigate } from "react-router-dom";
import GenresDropdown from "../../components/genresDropdown";
import { StateContext } from "../../state/stateContext";
import { StateProviderType } from "../../state/stateContext";
import Error from "../../components/error";
const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { state } = useContext(StateContext) as StateProviderType;
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const isLessTablet = useMediaQuery("(max-width: 890px)");
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  // hovering over genres
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    if (isLessTablet) {
      return;
    }
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    if (isLessTablet) {
      return;
    }
    setIsHovering(false);
  };

  const linkSection = (
    <Box
      display="flex"
      alignContent="center"
      justifyContent="center"
      gap="2rem"
      sx={{
        [theme.breakpoints.down("tablet")]: {
          flexDirection: "column",
          p: "1rem",
          width: "100vw",

          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      {isLessTablet ? (
        <Box width="100%" display="flex" justifyContent="flex-end">
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "inherit",
                color: theme.palette.accent.main,
              },
            }}
            onClick={() => {
              setDrawerIsOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        ""
      )}
      <Box
        position="relative"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Typography
          variant="h2"
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: theme.palette.accent.main,
            },
            [theme.breakpoints.down("tablet")]: {
              "&:hover": {
                cursor: "auto",
                color: "inherit",
              },
            },
          }}
        >
          Genres
        </Typography>

        {!isLessTablet ? isHovering && <GenresDropdown /> : <GenresDropdown />}
      </Box>

      <Link to="/series/1">
        <Typography
          variant="h2"
          sx={{
            "&:hover": {
              color: theme.palette.accent.main,
            },
          }}
        >
          Series
        </Typography>
      </Link>
      <Link to="/movies/1">
        <Typography
          variant="h2"
          sx={{
            "&:hover": {
              color: theme.palette.accent.main,
            },
          }}
        >
          Movies
        </Typography>
      </Link>
      <Link to="/top-100/1">
        <Typography
          variant="h2"
          sx={{
            "&:hover": {
              color: theme.palette.accent.main,
            },
          }}
        >
          Top 100
        </Typography>
      </Link>
      <Box>
        <Button
          onClick={async () => {
            try {
              const response = await fetch(
                `https://api.jikan.moe/v4/random/anime`
              );
              if (response.ok) {
                const data = await response.json();

                navigate(
                  `/anime/${data.data.mal_id}-${data.data.title
                    .replaceAll(" ", "-")
                    .replaceAll(":", "")}`
                );
              }
            } catch (err: any) {
              return <Error message={err.message} />;
            }
          }}
          sx={{
            textTransform: "none",
            color: "inherit",
            padding: "0",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              "&:hover": {
                color: theme.palette.accent.main,
              },
            }}
          >
            Random
          </Typography>
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      p={2}
      mb="1rem"
      color={theme.palette.grey[100]}
      sx={{ backgroundColor: theme.palette.background.dark }}
    >
      <Box display="flex" mb="0.5rem" justifyContent="space-between">
        <Box>
          <Typography variant="h1" color={theme.palette.accent.main}>
            <Link to="/">AniWorld</Link>
          </Typography>
        </Box>

        {/* links section */}
        {isLessTablet ? "" : linkSection}

        {/* icons section */}
        <Box display="flex" justifySelf="end">
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{
              "&:hover": {
                backgroundColor: "inherit",
                color: theme.palette.accent.main,
              },
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "inherit",
                color: theme.palette.accent.main,
              },
            }}
            onClick={() => {
              navigate(
                `${
                  state.loggedUser ? `/account/${state.loggedUser}` : "/login"
                }`
              );
            }}
          >
            <PersonOutlinedIcon />
            <Typography variant="h3" p="0 0.25rem">
              {state.loggedUser ? state.loggedUser : ""}
            </Typography>
          </IconButton>
          {isLessTablet ? (
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "inherit",
                  color: theme.palette.accent.main,
                },
              }}
              onClick={() => {
                setDrawerIsOpen(true);
              }}
            >
              <DehazeIcon />
            </IconButton>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={drawerIsOpen}
        onClose={() => {
          setDrawerIsOpen(false);
        }}
      >
        {linkSection}
      </Drawer>
      {/* search bar */}
      <Box
        justifySelf="center"
        height="2.5rem"
        borderRadius="3px"
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <Collapse
          orientation="horizontal"
          in={checked}
          collapsedSize="10rem"
          sx={{ borderRadius: "3px", justifyContent: "center" }}
        >
          <Box
            height="2.5rem"
            display="flex"
            sx={{ backgroundColor: theme.palette.accent.main }}
            onClick={handleChange}
            width="20vw"
            borderRadius="3px"
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              {checked ? <SearchIcon /> : ""}
            </IconButton>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Topbar;
