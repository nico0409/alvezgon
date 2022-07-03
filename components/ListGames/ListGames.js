import React from "react";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointSm,
  breakpointMd,
  breakpointLg,
  breakpointXXl,
  breakpointXXXl,
} from "../../utils/breakpoint";
const ListGames = (props) => {
  const { games } = props;
  const { width } = useWindowSize();

  const getColumRender = () => {
    switch (true) {
      case width >= breakpointXXXl:
        return 8;
        break;

      case width >= breakpointXXl:
        return 7;
        break;
      case width >= breakpointLg:
        return 5;
        break;
      case width >= breakpointMd:
        return 3;
        break;
      case width >= breakpointSm:
        return 2;
        break;

      default:
        return 1;
        break;
    }
  };

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={getColumRender()}>
          {map(games, (game) => (
            <Game key={game.title} game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ListGames;

const Game = (props) => {
  const { game } = props;

  return (
    <Grid.Column className="list-games__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image src={game.poster.url} alt={game.title} />
            <div className="list-games__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}%</span>
              ) : (
                <span />
              )}
              <span className="price">{game.price}€</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
};
