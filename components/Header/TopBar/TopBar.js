import { Container, Grid, Image, Input } from "semantic-ui-react";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="logo" />
      </a>
    </Link>
  );
};

const Search = () => {
  return (
    <Input id="search" icon={{ name: "search" }} placeholder="Search..." />
  );
};
export default TopBar;
