import React from "react";
import { Container } from "semantic-ui-react";

export const BasicLayout = (props) => {
  const { children } = props;
  return (
    <Container fuild className="basic-layout">
      <Container className="content">{children}</Container>
    </Container>
  );
};

export default BasicLayout;
