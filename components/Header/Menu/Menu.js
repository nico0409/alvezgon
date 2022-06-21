import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";

const MenuWeb = () => {
  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatform />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuOption />
          </Grid.Column>
        </Grid>
      </Container>
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

const MenuOption = () => {
  return (
    <Menu>
      <Menu.Item>
        <Icon name="user outline" />
        Mi cuenta
      </Menu.Item>
    </Menu>
  );
};
