import React from "react";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import "animate.css";
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
  console.log(games);
  const getColumRender = () => {
    switch (true) {
      case width >= breakpointXXXl:
        return 5;
        break;

      case width >= breakpointXXl:
        return 4;
        break;
      case width >= breakpointLg:
        return 3;
        break;
      case width >= breakpointMd:
        return 2;
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
    <div className="list-games animate__fadeIn_animate__slow">
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
            <Image src={game.poster[0].url} alt={game.title} />
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
