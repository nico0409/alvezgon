import { useState, useEffect, useContext } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";
import useCart from "../../../hooks/useCart";
import CartContext from "../../../context/CartContext";

const MenuWeb = () => {
  const [showModal, setshowModal] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const omShowModal = () => setshowModal(true);
  const onCloseModal = () => setshowModal(false);
  const [titleModal, setTitleModal] = useState("Login");
  const [user, setUser] = useState(undefined);

  const { logout, auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const response = await getPlatformsApi();
      setPlatforms(response || []);
    })();
  }, []);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatform platforms={platforms} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOption
                omShowModal={omShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setshowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
};

export default MenuWeb;

const MenuPlatform = (props) => {
  const { platforms } = props;
  return (
    <Menu>
      {platforms.map((platform) => (
        <Link href={`/games/${platform.url}`} key={platform.id}>
          <Menu.Item as="a" name={platform.url}>
            {platform.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
};

const MenuOption = ({ omShowModal, user, logout }) => {
  const { productsCart } = useCart();

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Lista Deseados
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>

          <Link href="/cart">
            <Menu.Item as="a">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>

          <Menu.Item onClick={logout}>
            <Icon name="sign out" />
            Cerrar sesión
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={omShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
};
