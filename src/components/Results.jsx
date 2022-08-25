import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";

const Results = ({ ResetRound }) => {
  const { activePlayer, players } = useContext(LobbyContext);
  const { userSketches } = useContext(GameContext);

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
      <table>
        <thead>
          <tr>
            <th>player</th>
            <th>score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr>
                <td>{player.displayName}</td>
                <td>{player.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {userSketches.map((userSketch) => {
        return (
          <figure>
            <figcaption>
              {userSketch.displayName + " drew " + userSketch.userTopic}{" "}
            </figcaption>
            <img src={userSketch.sketch} alt={userSketches.displayName} />
          </figure>
        );
      })}
    </>
  );
};

export default Results;
