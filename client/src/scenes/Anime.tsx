import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useContext } from "react";
import { Box, Typography, Button, TextField, FormControl } from "@mui/material";
import { useTheme } from "@mui/material";
import Loading from "../components/loading";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import Error from "../components/error";
import { StateContext, StateProviderType } from "../state/stateContext";
import { StyledRating } from "../components/styledRating";

interface AnimeType {
  id: number;
  name: string;
  image: string;
  description: string;
  episodes: string;
  rating: string;
  score: number;
  type: string;
  status: string;
  studios: [
    {
      mal_id: number;
      name: string;
    }
  ];
  genres: [
    {
      mal_id: number;
      name: string;
    }
  ];
  duration: string;
}

const Anime = () => {
  const theme = useTheme();
  const params: string | undefined = useParams().id;
  const id = params.slice(0, params.search("-"));
  const [loading, setLoading] = useState(false);
  const [anime, setAnime] = useState<AnimeType>({});

  const { state, addToArray, removeFromArray } = useContext(
    StateContext
  ) as StateProviderType;

  const [marked, setMarked] = useState({
    bookmarks: false,
    watchLater: false,
    watched: false,
  });

  // if this anime added to any array
  useMemo(() => {
    if (state.loggedUser !== "") {
      if (
        state.bookmarks.find((bookmark: string) => {
          return bookmark === id;
        })
      ) {
        setMarked({
          bookmarks: true,
          watchLater: marked.watchLater,
          watched: marked.watched,
        });
      }
      if (
        state.watchLater.find((watchLater: string) => {
          return watchLater === id;
        })
      ) {
        setMarked({
          bookmarks: marked.bookmarks,
          watchLater: true,
          watched: marked.watched,
        });
      }
      if (
        state.watched.find((watched: string) => {
          return watched === id;
        })
      ) {
        setMarked({
          bookmarks: marked.bookmarks,
          watchLater: marked.watchLater,
          watched: true,
        });
      }
    }
  }, [state]);

  // fetching anime info
  useMemo(() => {
    const animeListHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (response.ok) {
          const data = await response.json();

          const transformedData = () => {
            return {
              id: data.data.mal_id,
              name: data.data.title,
              image: data.data.images.jpg.large_image_url,
              description: data.data.synopsis,
              episodes: data.data.episodes,
              rating: data.data.rating,
              score: data.data.score,
              year: data.data.year,
              type: data.data.type,
              status: data.data.status,
              studios: data.data.studios,
              genres: data.data.genres,
              duration: data.data.durarion,
            };
          };

          setAnime(transformedData);

          setLoading(false);
        }
      } catch (err: any) {
        <Error message={err.message} />;
      }
    };
    animeListHandler();
  }, [id]);
  // adding or removing from bookmark arrays
  const bookmarksHandler = async (type: string) => {
    const user = {
      username: state.loggedUser,
      item: id,
      type: type,
    };
    let bookmarks = marked.bookmarks;
    let watched = marked.watched;
    let watchLater = marked.watchLater;
    let marker;
    if (type === "bookmarks") {
      bookmarks = !marked.bookmarks;
      marker = bookmarks;
    }
    if (type === "watched") {
      watched = !marked.watched;
      marker = watched;
    }
    if (type === "watchLater") {
      watchLater = !marked.watchLater;
      marker = watchLater;
    }
    setMarked({
      bookmarks: bookmarks,
      watched: watched,
      watchLater: watchLater,
    });
    if (marker) {
      addToArray(id, type);

      try {
        await axios.post("http://localhost:1337/addToArray", user);
      } catch (err: any) {
        <Error message={err.message} />;
      }
    }
    if (!marker) {
      removeFromArray(id, type);

      try {
        await axios.post("http://localhost:1337/removeFromArray", user);
      } catch (err: any) {
        <Error message={err.message} />;
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      minHeight="70vh"
      mb="20rem"
    >
      {loading && <Loading />}

      {!loading && (
        <Box
          display="grid"
          gridTemplateColumns="4fr 2fr"
          boxShadow="10px 5px 5px rgba(0, 0,0, 0.20)"
          borderRadius="1rem"
          mb="10px"
          sx={{
            [theme.breakpoints.down("largeDesktop")]: {
              width: "80%",
            },
            [theme.breakpoints.down("tablet")]: {
              display: "flex",
              flexDirection: "column-reverse",
            },
          }}
        >
          {/* left box with sinopsis and comments */}
          <Box
            p="20px"
            borderRadius="1rem 0 0 1rem"
            sx={{
              backgroundColor: theme.palette.background.dark,
              [theme.breakpoints.down("tablet")]: {
                borderRadius: "0 0 1rem 1rem ",
              },
            }}
          >
            <Typography variant="h4" sx={{ color: theme.palette.grey[100] }}>
              {anime.description
                ? anime.description
                : "there is no synopsis to this anime"}
            </Typography>

            <Box mt="5rem">
              <Typography variant="h3">Add a comment:</Typography>
              <FormControl sx={{ width: "100%", mt: "1rem", mb: "1rem" }}>
                <TextField
                  color="accent"
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                  defaultValue=""
                />
              </FormControl>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  color="inherit"
                  sx={{
                    backgroundColor: theme.palette.accent.main,
                    textTransform: "none",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(3px)",
                      backgroundColor: theme.palette.accent.main,
                    },
                  }}
                >
                  <Typography variant="h3">Add a comment</Typography>
                </Button>
              </Box>
            </Box>
            <Box textAlign="center" mt="2rem">
              <Typography variant="h3">
                Sorry, this API does't have comments
              </Typography>
            </Box>
          </Box>
          {/* right box */}
          <Box
            display="flex"
            flexDirection="column"
            color={theme.palette.grey[800]}
            borderRadius="0 1rem 1rem 0"
            sx={{
              backgroundColor: theme.palette.accent.main,
              [theme.breakpoints.down("tablet")]: {
                borderRadius: "1rem 1rem 0 0",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "20px",
                width: "20vw",
                height: "60vh",
                alignSelf: "center",
                // height: "100%",
                [theme.breakpoints.down("largeDesktop")]: {
                  width: "30vw",
                },
                [theme.breakpoints.down("desktop")]: {
                  height: "40vh",
                  width: "30vw",
                },
                [theme.breakpoints.down("tablet")]: {
                  height: "50vh",
                  width: "45vw",
                },
                [theme.breakpoints.down("mobile")]: {
                  // height: "60vh",
                  width: "60vw",
                },
              }}
            >
              <img
                src={anime.image}
                alt="poster of an anime"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Box m="0 1rem 0 1rem">
              <Typography variant="h2" sx={{ textAlign: "center" }}>
                {anime.name}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" width="100%">
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
            {/* anime description */}
            <Box p="20px">
              <Typography variant="h3" sx={{ textAlign: "left" }}>
                {`Type: ${anime.type ? anime.type : "unknown"}`}
              </Typography>
              <Typography variant="h3" sx={{ textAlign: "left" }}>
                {`Episodes: ${anime.episodes ? anime.episodes : "unknown"}`}
              </Typography>
              <Typography variant="h3" sx={{ textAlign: "left" }}>
                {`Status: ${anime.status ? anime.status : "unknown"}`}
              </Typography>
              <Typography variant="h3" sx={{ textAlign: "left" }}>
                {`Studios: ${
                  anime.studios
                    ? anime.studios.map((studio) => {
                        return studio.name;
                      })
                    : "unknown"
                }`}
              </Typography>
              <Box display="flex" gap="0.5rem">
                <Typography variant="h3" sx={{ textAlign: "left" }}>
                  Genres:
                  {anime.genres ? (
                    anime.genres.map((genre) => {
                      return (
                        <Link
                          key={genre.name}
                          to={`/genres/${genre.name
                            .replaceAll(" ", "_")
                            .replaceAll("-", "_")}-${genre.mal_id}/1`}
                        >
                          {`${genre.name} `}
                        </Link>
                      );
                    })
                  ) : (
                    <Typography variant="h3">unknown</Typography>
                  )}{" "}
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ textAlign: "left" }}>
                {`Duration: ${anime.duration ? anime.duration : "unknown"}`}
              </Typography>
              <Typography variant="h3" sx={{ textAlign: "left" }}>
                {`Rating: ${anime.rating ? anime.rating : "unknown"}`}
              </Typography>
            </Box>

            {/* buttons */}
            {state.loggedUser !== "" ? (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="left"
                gap="0.2rem"
                ml="1rem"
                mb="1rem"
              >
                <Box>
                  <Button
                    color="inherit"
                    sx={{
                      backgroundColor: `${
                        marked.bookmarks ? theme.palette.accent.dark : ""
                      }`,
                      textTransform: "none",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: theme.palette.accent.dark,
                        transform: "translateY(3px)",
                      },
                    }}
                    onClick={() => {
                      bookmarksHandler("bookmarks");
                    }}
                  >
                    <Typography variant="h3">
                      {marked.bookmarks
                        ? "Remove from bookmarks"
                        : "Add to bookmarks"}
                    </Typography>
                    {marked.bookmarks ? (
                      <BookmarkIcon />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </Button>
                </Box>
                <Box>
                  <Button
                    color="inherit"
                    sx={{
                      backgroundColor: `${
                        marked.watched ? theme.palette.accent.dark : ""
                      }`,
                      textTransform: "none",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: theme.palette.accent.dark,
                        transform: "translateY(3px)",
                      },
                    }}
                    onClick={() => {
                      bookmarksHandler("watched");
                    }}
                  >
                    <Typography variant="h3">
                      {marked.watched
                        ? "Remove from watched"
                        : "Mark as watched"}
                    </Typography>
                    {marked.watched ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </Button>
                </Box>
                <Box>
                  <Button
                    color="inherit"
                    sx={{
                      backgroundColor: `${
                        marked.watchLater ? theme.palette.accent.dark : ""
                      }`,
                      textTransform: "none",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: theme.palette.accent.dark,
                        transform: "translateY(3px)",
                      },
                    }}
                    onClick={() => {
                      bookmarksHandler("watchLater");
                    }}
                  >
                    <Typography variant="h3">
                      {marked.watchLater
                        ? "Remove from watch later"
                        : "Watch later"}
                    </Typography>
                    {marked.watchLater ? (
                      <BookmarkIcon />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </Button>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Anime;
