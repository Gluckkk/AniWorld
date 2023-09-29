import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      color={theme.palette.grey[100]}
      sx={{ backgroundColor: theme.palette.background.dark }}
      p="2rem"
      left="0"
      bottom="0"
      width="100vw"
    >
      <Typography variant="h5">
        Created by Gluck. Based on Jikan API for 'My Anime List':
        https://jikan.moe/
      </Typography>
      <Typography variant="h5">
        Be careful. Jikan API allows only 3 requests per second. So it can cause
        some troubles. PLease, be patient and reload the page, if you have such
        a problem
      </Typography>
      <Typography variant="h5">
        Unfortunately Jikan API doesn't allow to search in the database, so
        search bar doesn't do anything
      </Typography>
      <Typography variant="h5">
        You can log in using created account:{" "}
      </Typography>
      <Typography variant="h5" color={theme.palette.accent.main}>
        justUser@gmail.com 1234567890
      </Typography>
    </Box>
  );
};

export default Footer;
