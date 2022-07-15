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
import Button from "react-bootstrap/Button";

import { Container as Conatainerb } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
        <Link href={`/games/${platform.url}`} key={platform._id}>
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
          <Navbar expand="lg">
            <Conatainerb>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/orders">
                    <Menu.Item>
                      <Icon name="game" />
                      Mis pedidos
                    </Menu.Item>
                  </Nav.Link>
                  <Nav.Link href="/wishlist">
                    <Menu.Item>
                      <Icon name="heart outline" />
                      Lista de Deseos
                    </Menu.Item>
                  </Nav.Link>
                  <Nav.Link href="/account">
                    <Menu.Item>
                      <Icon name="user outline" />
                      {user.name} {user.lastname}
                    </Menu.Item>
                  </Nav.Link>

                  <Nav.Link href="/cart">
                    <Menu.Item>
                      <Icon name="cart" />
                      Carrito
                      {productsCart > 0 && (
                        <Label color="red" floating circular>
                          {productsCart}
                        </Label>
                      )}
                    </Menu.Item>
                  </Nav.Link>

                  <Nav.Link onClick={logout}>
                    <Menu.Item>
                      <Icon name="sign out" />
                      Cerrar sesión
                    </Menu.Item>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Conatainerb>
          </Navbar>
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
