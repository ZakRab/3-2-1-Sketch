import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Sketch from "./Sketch";
import Vote from "./Vote";
const Lobby = () => {
  const { activePlayer } = useContext(LobbyContext);
  const { lobbyKey } = useParams();
  const { players, StartGame } = useSocket(lobbyKey);
  const { RandCard, isSketching, isVoting } = useContext(GameContext);

  function ClickHandler() {
    RandCard();
    StartGame();
  }
  return (
    <>
      {!isSketching && !isVoting && (
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
      {isSketching && !isVoting && <Sketch></Sketch>}
      {isVoting && !isSketching && <Vote></Vote>}
    </>
  );
};

export default Lobby;
