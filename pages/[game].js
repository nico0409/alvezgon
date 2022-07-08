import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { gatGameByUrl } from "../api/game";
import HeaderGame from "../components/Game/HeaderGame";
import { Loader } from "semantic-ui-react";
import TabsGame from "../components/Game/TabsGame";
import Seo from "../components/Seo";

const Game = () => {
  const { query } = useRouter();

  const [game, setGame] = useState(null);

  useEffect(() => {
    (() => {
      if (query.game) {
        (async () => {
          const data = await gatGameByUrl(query.game);
          setGame(data);
        })();
      }
    })();
  }, [query]);

  if (!game) return <Loader active>Loading</Loader>;

  return (
    <BasicLayout>
      <Seo title={game.title} />
      {game ? <HeaderGame game={game} /> : <Loader active>Loading...</Loader>}
      <TabsGame game={game} />
    </BasicLayout>
  );
};

export default Game;
