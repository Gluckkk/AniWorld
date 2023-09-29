import { useParams } from "react-router-dom";
import AnimeGridLayout from "../components/animeGridLayout";
const Genres = () => {
  const { genre, page } = useParams();
  const genreParam = genre.slice(genre.search("-") + 1, genre.length);
  const params = `genres=${genreParam}`;
  return (
    <AnimeGridLayout params={params} path={`/genres/${genre}/`} id={page} />
  );
};

export default Genres;
