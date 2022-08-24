import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import useSocket from "../hooks/useSocket";
import { LobbyContext } from "../context/LobbyContext";

const Vote = () => {
  const { lobbyKey } = useParams()
  const { activePlayer } = useContext(LobbyContext);
  const { userSketches } = useContext(GameContext);
  const { ResetRound } = useSocket(lobbyKey);
  console.log(userSketches);
  return (
    <>
    <h1>Voting</h1>
      {activePlayer.isHost && <button onClick={()=>ResetRound()} >start next round</button>}
    {userSketches && userSketches.map((userSketch, idx)=>{
     return <div key={idx}>
      <figure>
      <img src={userSketch.sketch} alt={`${userSketch.displayName}'s sketch`} />
      <figcaption>{userSketch.displayName}</figcaption>
      </figure>
      </div>
    })}
    </>
  );
};

export default Vote;
