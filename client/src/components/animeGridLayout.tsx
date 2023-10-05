import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import AnimePagesBox from "./animePagesBox";
import PagesLine from "./pagesLine";
import Loading from "./loading";
import Error from "./error";

interface Props {
  id: string;
  params: string;
  stopAt: boolean;
  path: string;
}

interface AnimeDataType {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  synopsis: string;
  score: number;
}
interface AnimeType {
  id: number;
  name: string;
  image: string;
  description: string;
  score: number;
}

const AnimeGridLayout = ({ id, params, stopAt = false, path }: Props) => {
  const isLessLargeDesktop = useMediaQuery("(max-width: 1900px)");
  const isLessTable = useMediaQuery("(max-width: 890px)");
  let limit = 21;
  const theme = useTheme();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  if (isLessLargeDesktop) {
    limit = 20;
  }
  if (isLessTable) {
    limit = 21;
  }

  useMemo(() => {
    const animeListHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?${params}&limit=${limit}&page=${
            id ? id : 1
          }`
        );
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.data.map((animeData: AnimeDataType) => {
            return {
              id: animeData.mal_id,
              name: animeData.title,
              image: animeData.images.jpg.large_image_url,
              description: animeData.synopsis,
              score: animeData.score,
            };
          });
          setAnimeList(transformedData);
          setLoading(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          return <Error message={error.message} />;
        }
      }
    };
    animeListHandler();
  }, [id, params, limit]);

  return (
    <Box>
      {loading && (
        <Box display="flex" width="100%" justifyContent="center">
          <Loading />
        </Box>
      )}
      {!loading && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "20px",
            m: "20px",
            justifyItems: "center",
            [theme.breakpoints.down("largeDesktop")]: {
              gridTemplateColumns: "repeat(5, 1fr)",
            },
            [theme.breakpoints.down("desktop")]: {
              gridTemplateColumns: "repeat(4, 1fr)",
            },
            [theme.breakpoints.down("tablet")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
            [theme.breakpoints.down("mobile")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
              m: "0",
              gap: "10px",
            },
          }}
        >
          {animeList.map((anime: AnimeType) => {
            return <AnimePagesBox anime={anime} key={anime.id} />;
          })}
        </Box>
      )}

      <PagesLine id={id ? id : "1"} path={path} stopAt={stopAt} />
    </Box>
  );
};

export default AnimeGridLayout;
