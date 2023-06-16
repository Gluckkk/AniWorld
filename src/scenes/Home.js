import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { ColorModeContext } from "../theme";
import { useContext, useEffect, useState } from "react";
import AnimeBoxMainPage from "../components/animeBoxMainPage";

const Home = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [animeList, setAnimeList] = useState([]);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const animeListHandler = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/anime");
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          const transformedData = data.data.map((animeData) => {
            return {
              name: animeData.title,
              image: animeData.images.jpg.large_image_url,
              description: animeData.synopsis,
            };
          });
          setAnimeList(transformedData);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    animeListHandler();
  }, []);

  return (
    <Box>
      <Typography color={theme.palette.font}>click to change theme</Typography>
      <Button
        onClick={() => {
          console.log(animeList);
        }}
      ></Button>
      {loading && <Typography>Loading</Typography>}
      {!loading && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "20px",
            m: " 0 20px ",
          }}
        >
          {animeList.map((anime) => {
            return <AnimeBoxMainPage anime={anime} />;
          })}
        </Box>
      )}
    </Box>
  );
};

export default Home;
