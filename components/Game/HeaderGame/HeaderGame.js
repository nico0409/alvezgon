import React, { useEffect, useState } from "react";
import { size } from "lodash";
import classNames from "classnames";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import {
  addFavoriteApi,
  deleteFavoriteApi,
  isFavoriteApi,
} from "../../../api/Favorite";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
const HeaderGame = (props) => {
  const { game } = props;
  const { poster, title } = game;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <ImfoGame game={game} />
      </Grid.Column>
    </Grid>
  );
};
export default HeaderGame;

const ImfoGame = (props) => {
  const { game } = props;
  const { title, sumary, price, discount, url } = game;
  const [isFavorite, setIsFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const [reloadFavorite, seTreloadFavorite] = useState(false);
  const { addProductCart } = useCart();
  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, game.id, logout);
      size(response) > 0
        ? setIsFavorite(true)
        : (setIsFavorite(false), seTreloadFavorite(false));
    })();
  }, [game, reloadFavorite]);

  const handleFavorite = async () => {
    if (isFavorite) {
      await deleteFavoriteApi(auth.idUser, game.id, logout);
      setIsFavorite(false);
    } else {
      await addFavoriteApi(auth.idUser, game.id, logout);
      setIsFavorite(true);
    }
    seTreloadFavorite(!reloadFavorite);
  };

  return (
    <>
      <div className="header-game__title">
        <div>{title}</div>
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          link
          className={classNames({
            like: true,
          })}
          onClick={handleFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48hs</div>
      <div className="header-game__summary">{sumary}</div>
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <div className="header-game__buy-price-old">
            <div className="header-game__buy-price-old-text">
              <span>Price:</span>
              <span>${price} </span>
            </div>
            <span className="space"></span>
          </div>
          <div className="header-game__buy-price-actions">
            <p>Discount: {discount}%</p>
            <p>${(price - Math.floor(price * discount)).toFixed(2) / 100}</p>
            <div className="header-game__buy-container-btn">
              <Button
                className="header-game__buy-btn"
                onClick={() => addProductCart(url)}
              >
                Buy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
