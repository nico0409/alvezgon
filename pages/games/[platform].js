import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../../layouts/BasicLayout";
import ListGames from "../../components/ListGames/ListGames";
import { getGamesByPlatform, getTotalGamesByPlatform } from "../../api/game";
import Pagination from "../../components/Pagination";

const limit = 2;
export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);
  const [total, setTotal] = useState(null);

  const getStartItem = () => {
    const currentPage = query.page;
    if (currentPage === 1 || !currentPage) {
      return 0;
    } else {
      return currentPage * limit - limit;
    }
  };

  useEffect(() => {
    if (query.platform) {
      (async () => {
        const data = await getGamesByPlatform(
          query.platform,
          limit,
          getStartItem()
        );
        setGames(data);
      })();
    }
  }, [query]);

  useEffect(() => {
    (async () => {
      const data = await getTotalGamesByPlatform(query.platform);
      setTotal(data);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      {!games && <Loader active>Loading...</Loader>}
      {games && size(games) === 0 && <p>No games found</p>}
      {games && size(games) > 0 && <ListGames games={games} />}
      {total ? (
        <Pagination
          totalGames={total}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limit}
        />
      ) : null}
    </BasicLayout>
  );
}
