import { Box, Button, Typography, useTheme } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link, useNavigate } from "react-router-dom";

interface PagesType {
  id: string;
  path: string;
  stopAt: boolean;
}

const PagesLine = ({ id, path, stopAt }: PagesType) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const idPage = parseInt(id);

  const decreasePage = () => {
    if (parseInt(id) <= 1) {
      return;
    }
    if (parseInt(id) !== 1) {
      navigate(`${path}${idPage - 1}`);
    }
  };
  const increasePage = () => {
    if (stopAt && idPage === 5) {
      return;
    }
    navigate(`${path}${idPage + 1}`);
  };
  const pages = () => {
    const pages = [];
    let pageOnList = idPage;

    if (idPage === 2) {
      pageOnList = pageOnList - 1;
    } else if (idPage === 1) {
      pageOnList = idPage;
    } else if (stopAt) {
      pageOnList = 1;
    } else {
      pageOnList = pageOnList - 2;
    }
    for (let i = 0; i < 5; i++) {
      if (pageOnList === idPage) {
        pages.push(
          <Link to={`${path}${pageOnList}`} key={i}>
            <Typography variant="h3" color={theme.palette.accent.main}>
              {pageOnList}
            </Typography>
          </Link>
        );
        pageOnList++;
        continue;
      }
      pages.push(
        <Link to={`${path}${pageOnList}`} key={i}>
          <Typography variant="h3">{pageOnList}</Typography>
        </Link>
      );
      pageOnList++;
    }
    return pages;
  };
  return (
    <Box
      p="20px"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Button onClick={decreasePage}>
        <ArrowCircleLeftIcon
          sx={{
            color: theme.palette.accent.main,
            height: "2.5rem",
            width: "2.5rem",
          }}
        />
      </Button>
      <Box display="flex" alignSelf="center" gap="0.5rem">
        {pages()}
      </Box>
      <Button onClick={increasePage}>
        <ArrowCircleRightIcon
          sx={{
            color: theme.palette.accent.main,
            height: "2.5rem",
            width: "2.5rem",
          }}
        />
      </Button>
    </Box>
  );
};

export default PagesLine;
