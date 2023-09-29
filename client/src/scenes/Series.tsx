import { useParams } from "react-router-dom";
import AnimeGridLayout from "../components/animeGridLayout";

const Series = () => {
  const { id } = useParams();
  const params = "type=tv";
  return <AnimeGridLayout id={id} params={params} path="/series/" />;
};

export default Series;
