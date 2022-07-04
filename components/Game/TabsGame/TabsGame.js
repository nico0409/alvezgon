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
    {
      menuItem: "Screenshots",
      render: () => <Tab.Pane>game.screenshots</Tab.Pane>,
    },
    {
      menuItem: "Videos",
      render: () => <Tab.Pane>game.videos</Tab.Pane>,
    },
    {
      menuItem: "Reviews",
      render: () => <Tab.Pane>game.reviews</Tab.Pane>,
    },
  ];

  return <Tab className="tabs-game" panes={panes} />;
};

export default TabsGame;
