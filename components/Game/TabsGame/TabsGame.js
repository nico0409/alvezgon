import React from "react";
import { Tab } from "semantic-ui-react";
import InfoGame from "../InfoGame";

const TabsGame = (props) => {
  const { game } = props;
  const panes = [
    {
      menuItem: "Overview",
      render: () => (
        <Tab.Pane>
          <InfoGame game={game} />{" "}
        </Tab.Pane>
      ),
    },
  ];

  return <Tab className="tabs-game" panes={panes} />;
};

export default TabsGame;
