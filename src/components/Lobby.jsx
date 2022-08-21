import { useContext } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { LobbyContext } from "../context/LobbyContext";
const Lobby = () => {
  const { activePlayer } = useContext(LobbyContext);
  const { lobbyKey } = useParams();
  const { players } = useSocket(lobbyKey);
  console.log(players, activePlayer);
  return (
    <>
      <h1>Lobby{lobbyKey}</h1>
      <h2>players</h2>
      {players &&
        players.map((player) => {
          return <div> {player.displayName}</div>;
        })}
    </>
  );
};

export default Lobby;
