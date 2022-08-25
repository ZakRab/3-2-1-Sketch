import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";

const Results = ({ ResetRound }) => {
  const { activePlayer } = useContext(LobbyContext);
  return (
    <>
      <h1>Results</h1>
      {activePlayer.isHost && (
        <button
          onClick={() => {
            ResetRound();
          }}
        >
          Start Next Round
        </button>
      )}
    </>
  );
};

export default Results;
