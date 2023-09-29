import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface dataType {
  name: string;
  mal_id: number;
}
const GenresDropdown = () => {
  const theme = useTheme();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/genres/anime`);
        if (response.ok) {
          const data = await response.json();
          const genres = data.data.map((data: dataType) => {
            return (
              <Box
                p="3px"
                borderRadius="4px"
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.accent.main,
                    cursor: "pointer",
                  },
                }}
                key={data.name}
              >
                <Link
                  to={`/genres/${data.name
                    .replaceAll(" ", "_")
                    .replaceAll("-", "_")}-${data.mal_id}/1`}
                >
                  <Typography variant="h4">{data.name}</Typography>
                </Link>
              </Box>
            );
          });

          setGenres(genres);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getGenres();
  }, []);

  return (
    <Box
      position="absolute"
      borderRadius="0 1rem 1rem 1rem"
      p="1rem"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(9, 1fr)",
        backgroundColor: theme.palette.background.dark,
        zIndex: "99999 !important",
        gap: "1rem",
        whiteSpace: "nowrap",
        boxShadow: "10px 5px 5px rgba(0, 0,0, 0.25)",
        [theme.breakpoints.down("largeDesktop")]: {
          gridTemplateColumns: "repeat(6, 1fr)",
        },
        [theme.breakpoints.down("desktop")]: {
          gridTemplateColumns: "repeat(4, 1fr)",
        },
        [theme.breakpoints.down("tablet")]: {
          gridTemplateColumns: "repeat(4, 1fr)",
          boxShadow: "none",
          borderRadius: "0",
          width: "100%",
          position: "relative",
        },
        [theme.breakpoints.down("mobile")]: {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
      }}
    >
      {genres}
    </Box>
  );
};

export default GenresDropdown;
