import { useParams } from "react-router-dom";
import AnimeGridLayout from "../components/animeGridLayout";

const Movies = () => {
  const { id } = useParams();
  const params = "type=movie";
  return <AnimeGridLayout id={id} params={params} path="/movies/" />;
};

export default Movies;
