import React, { useContext, useInsertionEffect } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import VoteBlock from "./VoteBlock";
const Vote = ({ ToResults, SendVote }) => {
  const { activePlayer, rounds, setPlayers, players } =
    useContext(LobbyContext);
  const { userSketches, card } = useContext(GameContext);

  return (
    <>
      <h2>Vote</h2>
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
              SendVote={SendVote}
            />
          );
        })}
    </>
  );
};

export default Vote;
