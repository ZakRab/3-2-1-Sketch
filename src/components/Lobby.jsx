import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Sketch from "./Sketch";
const Lobby = () => {
  const navigate = useNavigate();
  const { activePlayer } = useContext(LobbyContext);
  const { lobbyKey } = useParams();
  const { players, StartGame } = useSocket(lobbyKey);
  const { RandTopic, RandCard, card } = useContext(GameContext);

  function ClickHandler() {
    RandCard();
    StartGame();
  }
  return (
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
      <Sketch></Sketch>
    </>
  );
};

export default Lobby;
