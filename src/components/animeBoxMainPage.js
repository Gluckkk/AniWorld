import { Box, Typography, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const AnimeBoxMainPage = (anime) => {
  const theme = useTheme();
  console.log(anime);

  return (
    <Box
      sx={{
        width: "10vw",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "0.7rem",
      }}
      backgroundColor={theme.palette.accent.main}
    >
      <Box sx={{ position: "relative" }}>
        <img
          src={anime.anime.image}
          alt="photo"
          style={{
            borderRadius: "0.7rem 0.7rem 0 0 ",
            maxWidth: "100%",
            maxHeight: "40vh",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "0.7rem 0.7rem 0 0 ",
            width: "100%",
            height: " 100%",
            background: "rgba(0, 0, 0, 0.9)",
            color: "#fff",
            opacity: 0,
            overflow: "hidden",
            padding: "2px",

            "&:hover": { opacity: "100%" },
          }}
        >
          <Typography>{anime.anime.description}</Typography>
        </Box>
      </Box>
      <Box display="flex" sx={{ flexDirection: "column" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {anime.anime.name}
        </Typography>
        <Box display="flex" sx={{ gap: "1rem" }}>
          <Box>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarHalfIcon />
          </Box>
          <Box>
            <Typography variant="h5">4.5/5</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimeBoxMainPage;
