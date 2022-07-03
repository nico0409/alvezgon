import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";
import { getLastGame } from "../api/game";
import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames/ListGames";

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getLastGame(10);
      if (size(data) > 0) {
        setGames(data);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="home">
      {!games && <Loader active>Loading</Loader>}
      {games && size(games) === 0 && (
        <div className="no-games">
          <h1>No games found</h1>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
