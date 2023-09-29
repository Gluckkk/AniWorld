import { useParams } from "react-router-dom";
import AnimeGridLayout from "../components/animeGridLayout";

const Top100 = () => {
  const { id } = useParams();
  const params = "order_by=popularity";

  return (
    <AnimeGridLayout id={id} params={params} stopAt={true} path="/top-100/" />
  );
};

export default Top100;
