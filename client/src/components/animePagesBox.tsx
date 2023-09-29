import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledRating } from "./styledRating";

interface Anime {
  key: number;
  anime: {
    id: number;
    name: string;
    image: string;
    description: string;
    score: number;
  };
}

const AnimePagesBox = ({ anime }: Anime) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.accent.main,
        width: "12vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "0.7rem",
        boxShadow: "10px 5px 5px rgba(0, 0,0, 0.20)",
        transition: "all 0.3s",

        "&:hover": {
          transform: "translateY(-10px)",
        },
        [theme.breakpoints.down("largeDesktop")]: {
          width: "16vw",
          height: "40vh",
        },
        [theme.breakpoints.down("desktop")]: {
          width: "20vw",
        },
        [theme.breakpoints.down("tablet")]: {
          width: "100%",
        },
        [theme.breakpoints.down("mobile")]: {
          width: "80%",
        },
      }}
    >
      <Link
        to={`/anime/${anime.id}-${anime.name
          .replaceAll(":", "")
          .replaceAll(" ", "-")}`}
        style={{ height: "100%", width: "100%" }}
      >
        {/* anime poster with description on hover */}
        <Box
          sx={{
            position: "relative",
            height: "20rem",
            width: "inherit",
            [theme.breakpoints.down("largeDesktop")]: {
              height: "70%",
            },
            [theme.breakpoints.down("desktop")]: {
              height: "72%",
            },
            [theme.breakpoints.down("mobile")]: {
              height: "75%",
            },
          }}
        >
          <img
            src={anime.image}
            alt="anime poster"
            style={{
              borderRadius: "0.7rem 0.7rem 0 0 ",
              height: "100%",
              width: "100%",
            }}
          />
          {/* description of anime on hover */}
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

              "&:hover": { opacity: "100%", cursor: "pointer" },
            }}
          >
            <Typography variant="h4">{anime.name}</Typography>
            <Typography>
              {anime.description ? anime.description : "there is no synopsys"}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{
            flexDirection: "column",
            gap: "1rem",
            mb: "1rem",
          }}
        >
          <Box display="flex" justifyContent="center" width="100%" mt="0.5rem">
            <StyledRating
              size="large"
              name="half-rating-read"
              defaultValue={anime.score / 2}
              precision={0.5}
              readOnly
            />
            <Typography
              ml="0.5rem"
              variant="h4"
              sx={{ textAlign: "center", color: theme.palette.grey[100] }}
            >
              {anime.score}
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {anime.name}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default AnimePagesBox;
