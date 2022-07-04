import React from "react";
import ReactPayer from "react-player";
import moment from "moment";
import "moment/locale/es";
import CarouselScreenShots from "../CarouselScreenShots";
const InfoGame = (props) => {
  const { game } = props;

  if (!game) return null;
  return (
    <div className="info-game">
      <ReactPayer
        className="info-game__video"
        url={game.video}
        controls={true}
      />
      <CarouselScreenShots title={game.title} screenshots={game.screenshots} />
      <div className="info-game__content">
        <div className="info-game__content-date">
          <h4> Fecha de lanzamiento:</h4>
          <p>{moment(game.releaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
};
export default InfoGame;
