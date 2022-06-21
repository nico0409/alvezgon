import { useState } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";

const MenuWeb = () => {
  const [showModal, setshowModal] = useState(false);

  const omShowModal = () => setshowModal(true);
  const onCloseModal = () => setshowModal(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesion");

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatform />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuOption omShowModal={omShowModal} />
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

const MenuPlatform = () => {
  return (
    <Menu>
      <Link href="/playstation">
        <Menu.Item as="a">ps5</Menu.Item>
      </Link>
      <Link href="/xbox">
        <Menu.Item as="a">xbox</Menu.Item>
      </Link>
      <Link href="/switch">
        <Menu.Item as="a">switch</Menu.Item>
      </Link>
    </Menu>
  );
};

const MenuOption = ({ omShowModal }) => {
  return (
    <Menu>
      <Menu.Item onClick={omShowModal}>
        <Icon name="user outline" />
        Mi cuenta
      </Menu.Item>
    </Menu>
  );
};
