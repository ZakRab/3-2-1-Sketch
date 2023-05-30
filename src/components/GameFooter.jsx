import React, { useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";

export default function GameFooter({ rounds, players }) {
  const { isSketching, isVoting, isResults } = useContext(GameContext);
  const { activePlayer } = useContext(LobbyContext);

  return (
    <>
      <div className="footer-filler"></div>
      <footer className="d-flex top-border space-between">
        <h2 className="margin-top-small">-{activePlayer.displayName}-</h2>
        {(isSketching || isResults || isVoting) && (
          <h2 className="margin-top-small">Round #{rounds}/7</h2>
        )}
        {rounds >= 2 && (
          <h2 className="d-block text-black padding-small">
            -
            {
              players.filter((player) => {
                return player.displayName == activePlayer.displayName;
              })[0].score
            }
            -
          </h2>
        )}
      </footer>
    </>
  );
}
