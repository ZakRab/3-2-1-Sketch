import { useContext } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Sketch from "./Sketch";
import Vote from "./Vote";
import Results from "./Results";
const Lobby = () => {
  const { activePlayer } = useContext(LobbyContext);
  const { lobbyKey } = useParams();
  const { players, StartGame, SendSketch, ResetRound, ToResults, rounds} =
    useSocket(lobbyKey);
  const { RandCard, isSketching, isVoting, isResults } =
    useContext(GameContext);

  function ClickHandler() {
    RandCard();
    StartGame();
  }
  return (
    <>
<h1>Round #{rounds}</h1>
      {!isSketching && !isVoting && !isResults && (
        <>
          <h1>Lobby{lobbyKey}</h1>
          <h2>players</h2>
          {players &&
            players.map((player, idx) => {
              return <div key={idx}> {player.displayName}</div>;
            })}
          {activePlayer.isHost && (
            <button onClick={() => ClickHandler()}>start game</button>
          )}
        </>
      )}
      {isSketching && <Sketch SendSketch={SendSketch}></Sketch>}
      {isVoting && <Vote ToResults={ToResults}></Vote>}
      {isResults && <Results ResetRound={ResetRound}></Results>}
    </>
  );
};

export default Lobby;
