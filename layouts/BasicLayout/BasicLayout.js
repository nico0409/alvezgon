import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../../components/Header";
import classNmaes from "classnames";

export const BasicLayout = (props) => {
  const { children, className } = props;
  return (
    <Container
      fluid
      className={classNmaes("basic-layout", {
        [className]: className,
      })}
    >
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
};

export default BasicLayout;
