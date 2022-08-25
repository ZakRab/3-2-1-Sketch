import React, { useContext, useInsertionEffect } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import VoteBlock from "./VoteBlock";
const Vote = ({ ToResults }) => {
  const { activePlayer, rounds, setPlayers, players } =
    useContext(LobbyContext);
  const { userSketches, card } = useContext(GameContext);

  return (
    <>
      <h1>Voting for round {rounds}</h1>
      {activePlayer.isHost && (
        <button onClick={() => ToResults()}>Round Results</button>
      )}
      {userSketches &&
        userSketches.map((userSketch, idx) => {
          return (
            <VoteBlock
              key={idx}
              userSketch={userSketch}
              activePlayer={activePlayer}
              card={card}
            />
          );
        })}
    </>
  );
};

export default Vote;
