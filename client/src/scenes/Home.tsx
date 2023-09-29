import { useParams } from "react-router-dom";
import AnimeGridLayout from "../components/animeGridLayout";

const Home = () => {
  const { id } = useParams();

  const params = "order_by=title";

  return <AnimeGridLayout id={id} params={params} path="/" />;
};

export default Home;
