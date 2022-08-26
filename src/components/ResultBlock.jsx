import React, { useContext, useMemo } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";

const ResultBlock = ({ userSketch }) => {
  const { activePlayer, players } = useContext(LobbyContext);
  const { userSketches, userVotes } = useContext(GameContext);
  return (
    <figure>
      <figcaption>
        {userSketch.displayName + " drew " + userSketch.userTopic}
      </figcaption>
      <img
        className="border"
        src={userSketch.sketch}
        alt={userSketches.displayName}
      />
    </figure>
  );
};

export default ResultBlock;
