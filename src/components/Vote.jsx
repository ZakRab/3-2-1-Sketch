import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";

const Vote = ({ ResetRound }) => {
  const { activePlayer } = useContext(LobbyContext);
  const { userSketches } = useContext(GameContext);
  console.log(userSketches);
  return (
    <>
      <h1>Voting</h1>
      {activePlayer.isHost && (
        <button onClick={() => ResetRound()}>start next round</button>
      )}
      {userSketches &&
        userSketches.map((userSketch, idx) => {
          return (
            <div key={idx}>
              <figure>
                <img
                  src={userSketch.sketch}
                  alt={`${userSketch.displayName}'s sketch`}
                />
                <figcaption>{userSketch.displayName}</figcaption>
              </figure>
            </div>
          );
        })}
    </>
  );
};

export default Vote;
