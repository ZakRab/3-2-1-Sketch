import React from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";

const Results = ({ ResetRound }) => {
  return(
<>
<h1>Results</h1>
<button onClick={()=> ResetRound()}>Start Next Round</button>
</>
  )
};

export default Results;
