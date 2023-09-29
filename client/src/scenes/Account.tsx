import { useContext, useState, useMemo } from "react";
import { StateContext } from "../state/stateContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useGetKpisQuery } from "../state/api";
import Loading from "../components/loading";
import AnimePagesBox from "../components/animePagesBox";
import { StateProviderType } from "../state/stateContext";
import Error from "../components/error";
interface AnimeType {
  id: number;
  name: string;
  image: string;
  description: string;
  score: number;
}

interface UserType {
  username: string;
  email: string;
  password: string;
  bookmarks: [string];
  watched: [string];
  watchLater: [string];
}

const Account: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tabIsLoading, setTabIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("bookmarks");
  const [user, setUser] = useState<UserType>();
  const { data } = useGetKpisQuery();
  const [activePageContent, setActivePageContent] = useState<
    Array<React.ReactNode>
  >([]);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const theme = useTheme();
  let resultsPerPage = 20;
  const { state, logOut } = useContext(StateContext) as StateProviderType;
  const isLessDesktop = useMediaQuery("(max-width: 1200px)");

  // console.log("🚀 ~ file: Account.tsx:13 ~ state:", state);
  if (state.loggedUser === "") {
    navigate("/");
  }
  //////////////////////////////

  if (isLessDesktop) {
    resultsPerPage = 18;
  }

  ///////////////////////////////
  // console.log(user);
  let fetchingArray: Array<string>;
  if (activeTab === "bookmarks") {
    fetchingArray = state.bookmarks;
  } else if (activeTab === "watched") {
    fetchingArray = state.watched;
  } else if (activeTab === "watchLater") {
    fetchingArray = state.watchLater;
  }

  const getContentResultsPage = (page: number) => {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    return fetchingArray.slice(start, end);
  };
  // fetching anime in bookmarks, watched or watch later
  useMemo(() => {
    setTabIsLoading(true);
    const newArray = getContentResultsPage(page);
    const contentArray: Array<AnimeType> = [];

    const fetchAnimeData = async (animeId: string) => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}`
        );
        if (response.ok) {
          const data = await response.json();
          const transformedData = {
            id: data.data.mal_id,
            name: data.data.title,
            image: data.data.images.jpg.large_image_url,
            description: data.data.synopsis,
            score: data.data.score,
          };
          contentArray.push(transformedData);
        }
      } catch (err: any) {
        <Error message={err.message} />;
      }
    };

    const promises = newArray?.map((animeId: string) =>
      fetchAnimeData(animeId)
    );

    Promise.all(promises).then(() => {
      const content: Array<React.ReactNode> = contentArray?.map((anime) => {
        return <AnimePagesBox anime={anime} key={anime.id} />;
      });
      setTabIsLoading(false);
      setActivePageContent(content);
    });
  }, [activeTab, page]);

  // finding user data
  useMemo(() => {
    setIsLoading(true);
    const findingUser = () => {
      if (data) {
        const user: UserType = data.find((user) => {
          if (user.username === state.loggedUser) {
            return user;
          }
        });
        setUser(user);
        setIsLoading(false);
      }
    };
    findingUser();
  }, [data, state.loggedUser]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      m="0 15rem 0 15rem "
      minHeight="80vh"
      borderRadius="1rem"
      boxShadow="10px 5px 5px rgba(0, 0,0, 0.20)"
      sx={{
        backgroundColor: theme.palette.background.dark,
        [theme.breakpoints.down("largeDesktop")]: {
          m: "0 8rem 1rem 8rem",
        },
        [theme.breakpoints.down("tablet")]: {
          m: "0 3rem 1rem 3rem",
        },
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Box width="100%">
          {/* username and logout button */}
          <Box
            display="flex"
            justifyContent="space-between"
            borderRadius="1rem"
            alignItems="center"
            sx={{ backgroundColor: theme.palette.accent.main }}
          >
            <Box display="flex" alignItems="center">
              <PersonOutlineIcon sx={{ width: "5rem", height: "5rem" }} />
              <Typography variant="h1">{`${user?.username}`}</Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  textTransform: "none",
                  color: "inherit",
                  transition: "all 0.2s",

                  "&:hover": {
                    transform: "translateY(2px)",
                    backgroundColor: "inherit",
                  },
                }}
                onClick={() =>
                  navigate(`/account/${state.loggedUser}/settings`)
                }
              >
                <Typography textAlign="center" variant="h2">
                  Settings
                </Typography>
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  color: "inherit",
                  transition: "all 0.2s",

                  "&:hover": {
                    transform: "translateY(2px)",
                    backgroundColor: "inherit",
                  },
                }}
                onClick={() => {
                  logOut();
                  navigate("/");
                }}
              >
                <Typography textAlign="center" variant="h2">
                  Log Out
                </Typography>
              </Button>
            </Box>
          </Box>

          {/* tabs */}
          <Box display="flex" width="100%" p="1rem" justifyContent="center">
            <Button
              sx={{
                textTransform: "none",
                color:
                  activeTab === "bookmarks"
                    ? theme.palette.accent.main
                    : "inherit",

                "&:hover": {
                  color: theme.palette.accent.main,
                  backgroundColor: "inherit",
                },
              }}
              onClick={() => {
                setActiveTab("bookmarks");
                setPage(1);
              }}
            >
              <Typography variant="h2">Bookmarks</Typography>
            </Button>
            <Button
              sx={{
                textTransform: "none",
                color:
                  activeTab === "watched"
                    ? theme.palette.accent.main
                    : "inherit",

                "&:hover": {
                  color: theme.palette.accent.main,
                  backgroundColor: "inherit",
                },
              }}
              onClick={() => {
                setActiveTab("watched");
                setPage(1);
              }}
            >
              <Typography variant="h2">Watched</Typography>
            </Button>
            <Button
              sx={{
                textTransform: "none",
                color:
                  activeTab === "watchLater"
                    ? theme.palette.accent.main
                    : "inherit",

                "&:hover": {
                  color: theme.palette.accent.main,
                  backgroundColor: "inherit",
                },
              }}
              onClick={() => {
                setActiveTab("watchLater");
                setPage(1);
              }}
            >
              <Typography variant="h2">Watch Later</Typography>
            </Button>
          </Box>

          {tabIsLoading ? (
            <Box display="flex" width="100%" p="1rem" justifyContent="center">
              <Loading />
            </Box>
          ) : (
            ""
          )}
          {/* content */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "20px",
              m: "20px",
              justifyItems: "center",
              [theme.breakpoints.down("largeDesktop")]: {
                gridTemplateColumns: "repeat(4, 1fr)",
              },
              [theme.breakpoints.down("desktop")]: {
                gridTemplateColumns: "repeat(3, 1fr)",
              },
              [theme.breakpoints.down("tablet")]: {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
              [theme.breakpoints.down("mobile")]: {
                gridTemplateColumns: "repeat(1, 1fr)",
              },
            }}
          >
            {activePageContent}
          </Box>
          <Box
            p="20px"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Button
              onClick={() => {
                if (page !== 1) {
                  setPage(page - 1);
                }
              }}
            >
              <ArrowCircleLeftIcon
                sx={{
                  color: theme.palette.accent.main,
                  height: "2.5rem",
                  width: "2.5rem",
                }}
              />
            </Button>
            <Box display="flex" alignSelf="center" gap="0.5rem">
              <Typography variant="h3">{page}</Typography>
            </Box>
            <Button
              onClick={() => {
                // console.log(activePageContent);
                if (Math.ceil(fetchingArray.length / resultsPerPage) !== page) {
                  setPage(page + 1);
                }
              }}
            >
              <ArrowCircleRightIcon
                sx={{
                  color: theme.palette.accent.main,
                  height: "2.5rem",
                  width: "2.5rem",
                }}
              />
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Account;
